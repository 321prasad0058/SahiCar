// The landing page's night drive: five body styles — each modelled on a popular Indian car, unnamed on the
// site — on an endless lit road, right in the hero. The page cycles through them in place: the old car
// drives off, the next rolls in, and the camera eases to an angle chosen per car. The camera frames the car
// inside a "stage" rectangle the page measures, so it never sits behind text on any screen size.
//
// Built to stay smooth anywhere:
// - no downloads: every car, texture and environment is procedural;
// - no post-processing: glows are additive sprites, so cheap GPUs never render a bloom pass;
// - only the hero car is built up front, the rest are built one per idle moment;
// - resolution adapts to the frame rate, and if the device still can't keep up the scene stops animating
//   and only re-renders when a car changes;
// - rendering stops when the hero is scrolled away or the tab is hidden, and a lost WebGL context hands over
//   to the static poster.
import * as THREE from 'three'
import { getTier, reducedMotion } from '../lib/perf'
import { gsap } from '../lib/scroll'
import { buildCar, type CarRig } from './cars/build'
import { MODEL_FILES, loadModel } from './cars/models'
import { SHOWCASE } from './cars/specs'
import { bakeEnvironment } from './env'

// camera framing per car (indexed like SHOWCASE): angle around the car (0 = side-on, + toward the nose),
// elevation in radians, look-at height, and a zoom factor (1 = the car just fills the stage)
const SHOTS: { theta: number; elev: number; look: number; zoom: number }[] = [
  { theta: 0.62, elev: 0.1, look: 0.8, zoom: 1 }, // electric SUV: front three-quarter, light bar and fin
  { theta: 0.5, elev: 0.12, look: 0.68, zoom: 0.96 }, // hatchback: three-quarter, the sloping roof and C-pillar
  { theta: 0.42, elev: 0.1, look: 0.7, zoom: 1.04 }, // sedan: longer profile, the fastback rear glass
  { theta: 0.72, elev: 0.06, look: 0.82, zoom: 0.98 }, // SUV: lower, the light bar and skid plate
  { theta: 0.46, elev: 0.13, look: 0.84, zoom: 1.06 }, // MPV: a touch higher, the length of three rows
]

export interface HeroEvents {
  onFirstFrame?: () => void
  onFail?: () => void
}

export class HeroWorld {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera = new THREE.PerspectiveCamera(30, 1, 0.1, 300)
  private cars: (CarRig | null)[] = SHOWCASE.map(() => null)
  private active: number
  private lines: THREE.InstancedMesh
  private poles: THREE.InstancedMesh
  private lamps: THREE.Sprite[] = []
  private streaks: THREE.InstancedMesh
  private streakData: { x: number; z: number; y: number; v: number }[] = []
  private sweep: THREE.PointLight | null = null
  private beams: THREE.Mesh
  private last = performance.now()
  private elapsed = 0
  private raf = 0
  private disposed = false
  private firstFrame = false
  private idleHandle = 0
  private tier = getTier()
  private dpr: number
  private maxDpr: number
  private frameTimes: number[] = []
  private staticMode = reducedMotion
  private needsRender = true
  private road = 0

  speed = 0
  lights = 0
  private cam: { theta: number; elev: number; look: number; zoom: number }
  /** where on the canvas the car should sit: centre and size as fractions of the canvas */
  private focus = { x: 0.7, y: 0.5, w: 0.45, h: 0.45 }
  private visible = true
  private pointer = { x: 0, y: 0, tx: 0, ty: 0 }

  constructor(private canvas: HTMLCanvasElement, private events: HeroEvents = {}, start = 0) {
    this.active = start
    this.cam = { ...SHOTS[start], theta: SHOTS[start].theta - 1.6, zoom: 1.9 }
    const high = this.tier === 'high'
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: high, powerPreference: 'default', alpha: false, stencil: false })
    this.maxDpr = Math.min(devicePixelRatio, high ? 1.75 : 1)
    this.dpr = this.maxDpr
    this.renderer.setPixelRatio(this.dpr)
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.1
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    canvas.addEventListener('webglcontextlost', this.onLost, false)

    const bg = new THREE.Color('#04070b')
    this.scene.background = bg
    this.scene.fog = new THREE.Fog(bg, 16, 62)
    this.scene.environment = bakeEnvironment(this.renderer, 'night')
    this.scene.environmentIntensity = 1.5
    // a night photo shoot: a cool key from above-front, a warm fill, and a cyan rim from behind
    const key = new THREE.DirectionalLight('#e6f3ff', 2.6)
    key.position.set(6, 9, 7)
    const fill = new THREE.DirectionalLight('#ffe2c0', 0.9)
    fill.position.set(2, 3, -8)
    const rim = new THREE.DirectionalLight('#5fd8ff', 1.6)
    rim.position.set(-9, 4, 0)
    this.scene.add(key, fill, rim, new THREE.HemisphereLight('#3a7896', '#000000', 0.8))
    if (high) {
      // a warm light that runs along the road with the street lamps, sweeping across the paint
      this.sweep = new THREE.PointLight('#ffd7a0', 22, 9, 1.6)
      this.sweep.position.set(0, 4.5, 4)
      this.scene.add(this.sweep)
    }

    // road
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), new THREE.MeshLambertMaterial({ color: '#05080b' }))
    ground.rotation.x = -Math.PI / 2
    this.scene.add(ground)
    const dash = new THREE.PlaneGeometry(2.4, 0.12)
    dash.rotateX(-Math.PI / 2)
    this.lines = new THREE.InstancedMesh(dash, new THREE.MeshBasicMaterial({ color: '#8d9aa3' }), 32)
    this.scene.add(this.lines)
    const kerb = new THREE.PlaneGeometry(300, 0.1)
    kerb.rotateX(-Math.PI / 2)
    for (const [z, c] of [[-5.8, '#2ad4ff'], [5.8, '#3cf06e']] as const) {
      const k = new THREE.Mesh(kerb, new THREE.MeshBasicMaterial({ color: c, toneMapped: false }))
      k.position.set(0, 0.012, z)
      this.scene.add(k)
    }

    // street lamps every 15 m on the far side
    const pole = new THREE.CylinderGeometry(0.06, 0.08, 6, 6)
    pole.translate(0, 3, 0)
    this.poles = new THREE.InstancedMesh(pole, new THREE.MeshStandardMaterial({ color: '#1a2026', metalness: 0.6, roughness: 0.5 }), 8)
    const glowTex = glowTexture()
    for (let i = 0; i < 8; i++) {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: '#ffd9a8', blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, fog: false, toneMapped: false }))
      s.scale.setScalar(1.1)
      s.position.set(0, 6.05, -6.8)
      this.scene.add(s)
      this.lamps.push(s)
    }
    this.scene.add(this.poles)

    // city-light streaks blurred by speed
    const n = high ? 60 : 24
    this.streaks = new THREE.InstancedMesh(new THREE.BoxGeometry(3.4, 0.03, 0.03), new THREE.MeshBasicMaterial({ toneMapped: false }), n)
    const palette = ['#2ad4ff', '#3cf06e', '#ff2a3d', '#e7f6ff', '#ffd9a8'].map((c) => new THREE.Color(c).multiplyScalar(2))
    for (let i = 0; i < n; i++) {
      const side = Math.random() < 0.5 ? -1 : 1
      this.streakData.push({ x: Math.random() * 120 - 60, z: side * (9 + Math.random() * 16), y: 0.5 + Math.random() * 7, v: 0.6 + Math.random() * 0.9 })
      this.streaks.setColorAt(i, palette[i % palette.length])
    }
    this.scene.add(this.streaks)

    // headlight pool on the road ahead of the car
    this.beams = new THREE.Mesh(
      new THREE.PlaneGeometry(9, 4.2),
      new THREE.MeshBasicMaterial({ map: beamTexture(), color: '#cfe9ff', blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, opacity: 0 }),
    )
    this.beams.rotation.x = -Math.PI / 2
    this.beams.position.set(6.6, 0.015, 0)
    this.scene.add(this.beams)

    // the first car now; the rest when the browser is idle
    this.ensure(start).group.visible = true
    this.queueBuilds()

    addEventListener('pointermove', this.onPointer, { passive: true })
    document.addEventListener('visibilitychange', this.onVisibility)
    this.layout()
    this.loop()
  }

  private ensure(i: number) {
    let car = this.cars[i]
    if (!car) {
      car = buildCar(SHOWCASE[i], { detail: this.tier === 'high' ? 'high' : 'low' })
      car.group.visible = false
      car.setLights(this.lights)
      this.scene.add(car.group)
      this.cars[i] = car
      // a licensed exact model, if one is registered, replaces the procedural body once it has downloaded
      if (MODEL_FILES[SHOWCASE[i].id]) {
        const rig = car
        loadModel(SHOWCASE[i].id, SHOWCASE[i].L)
          .then((model) => {
            if (!model || this.disposed) return
            rig.group.children.slice().forEach((c) => rig.group.remove(c))
            rig.group.add(model)
            this.needsRender = true
          })
          .catch(() => {})
      }
    }
    return car
  }

  private queueBuilds() {
    const next = this.cars.findIndex((c) => !c)
    if (next < 0 || this.disposed) return
    const run = () => {
      if (this.disposed) return
      const car = this.ensure(next)
      // compile while hidden so its first appearance never stutters
      car.group.visible = true
      this.renderer.compile(this.scene, this.camera)
      car.group.visible = next === this.active
      this.queueBuilds()
    }
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }
    this.idleHandle = w.requestIdleCallback ? w.requestIdleCallback(run, { timeout: 2500 }) : window.setTimeout(run, 400)
  }

  private onPointer = (e: PointerEvent) => {
    this.pointer.tx = (e.clientX / innerWidth) * 2 - 1
    this.pointer.ty = (e.clientY / innerHeight) * 2 - 1
  }
  private onVisibility = () => this.setRunning(!document.hidden && this.visible)

  /** Stop rendering entirely while the hero is off screen; pick up where it left off. */
  setVisible(v: boolean) {
    this.visible = v
    this.setRunning(v && !document.hidden)
  }
  private running = true
  private setRunning(on: boolean) {
    if (on === this.running || this.disposed) return
    this.running = on
    cancelAnimationFrame(this.raf)
    if (on) {
      this.last = performance.now()
      this.needsRender = true
      this.loop()
    }
  }

  /** Frame the car inside this rectangle of the canvas (fractions of its width and height). */
  setFocus(x: number, y: number, w: number, h: number) {
    this.focus = { x, y, w, h }
    this.layout()
  }
  private onLost = (e: Event) => {
    e.preventDefault()
    this.disposed = true
    cancelAnimationFrame(this.raf)
    this.events.onFail?.()
  }

  layout() {
    const w = this.canvas.clientWidth || innerWidth
    const h = this.canvas.clientHeight || innerHeight
    this.renderer.setSize(w, h, false)
    this.camera.aspect = w / h
    this.camera.fov = 30
    // shift the image so the car's centre lands on the stage's centre
    this.camera.setViewOffset(w, h, (0.5 - this.focus.x) * w, (0.5 - this.focus.y) * h, w, h)
    this.camera.updateProjectionMatrix()
    this.needsRender = true
  }

  /** The ignition and the opening camera sweep. */
  intro(skipSweep = false) {
    const tl = gsap.timeline()
    const s = SHOTS[this.active]
    if (reducedMotion || skipSweep) {
      Object.assign(this.cam, s)
      this.lights = 1
      this.speed = reducedMotion ? 0 : 0.8
      this.needsRender = true
      return tl
    }
    tl.to(this, { lights: 0.35, duration: 0.07, repeat: 3, yoyo: true, ease: 'none' }, 0.15)
    tl.to(this, { lights: 1, duration: 0.6, ease: 'power2.out' }, 0.5)
    tl.to(this.cam, { ...s, duration: 3, ease: 'power3.inOut' }, 0.2)
    tl.to(this, { speed: 1, duration: 2.6, ease: 'power2.inOut' }, 1)
    return tl
  }

  /**
   * Bring car i on stage. dir 1: the current car drives off ahead and the next follows; -1: the reverse.
   * Resolves once the new car has finished rolling in and is fully in view.
   */
  show(i: number, dir: 1 | -1 = 1): Promise<void> {
    const idx = ((i % SHOWCASE.length) + SHOWCASE.length) % SHOWCASE.length
    if (idx === this.active) return Promise.resolve()
    gsap.to(this.cam, { ...SHOTS[idx], duration: 1.1, ease: 'power3.inOut', overwrite: 'auto' })
    const from = this.cars[this.active]
    const to = this.ensure(idx)
    this.active = idx
    // quick clicking: anything that isn't leaving or arriving disappears at once
    this.cars.forEach((c) => c && c !== from && c !== to && (c.group.visible = false))
    to.setLights(this.lights)
    if (reducedMotion) {
      if (from) from.group.visible = false
      to.group.visible = true
      to.group.position.x = 0
      this.needsRender = true
      return Promise.resolve()
    }
    if (from) gsap.to(from.group.position, { x: 26 * dir, duration: 0.5, ease: 'power2.in', overwrite: true, onComplete: () => void (from.group.visible = false) })
    to.group.visible = true
    return new Promise((resolve) => {
      gsap.fromTo(to.group.position, { x: -24 * dir }, { x: 0, duration: 0.75, delay: 0.1, ease: 'power3.out', overwrite: true, onComplete: () => resolve() })
    })
  }

  get current() {
    return this.active
  }

  private adapt(dtMs: number) {
    if (this.staticMode || dtMs > 250) return
    this.frameTimes.push(dtMs)
    if (this.frameTimes.length < 45) return
    const avg = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length
    this.frameTimes = []
    if (avg > 24 && this.dpr > 0.6) this.setDpr(this.dpr - 0.2) // under ~40 fps: drop resolution
    else if (avg > 40) {
      // still under 25 fps at the lowest resolution: stop animating and render only when something changes
      this.staticMode = true
      this.speed = 0
    } else if (avg < 13 && this.dpr < this.maxDpr) this.setDpr(this.dpr + 0.1)
  }
  private setDpr(v: number) {
    this.dpr = Math.max(0.6, Math.min(this.maxDpr, v))
    this.renderer.setPixelRatio(this.dpr)
    this.layout()
  }

  private loop = () => {
    if (this.disposed) return
    this.raf = requestAnimationFrame(this.loop)
    const now = performance.now()
    const dt = Math.min(0.05, (now - this.last) / 1000)
    this.last = now
    this.elapsed += dt
    const animating = !this.staticMode && this.speed > 0.001
    const tweening = gsap.isTweening(this.cam) || gsap.isTweening(this) || this.cars.some((c) => c && gsap.isTweening(c.group.position))
    if (!animating && !tweening && !this.needsRender) return
    if (animating) this.adapt(dt * 1000)
    this.needsRender = false

    const v = (this.staticMode ? 0 : this.speed) * 20 * dt
    this.road += v
    for (const car of this.cars) {
      if (!car?.group.visible) continue
      car.spin(v)
      car.setLights(this.lights)
    }
    ;(this.beams.material as THREE.MeshBasicMaterial).opacity = 0.3 * this.lights
    this.beams.position.x = 6.6 + (this.cars[this.active]?.group.position.x ?? 0)

    // moving scenery
    const m = new THREE.Matrix4()
    const wrap = (x: number, span: number) => ((((x + span / 2) % span) + span) % span) - span / 2
    for (let i = 0; i < 32; i++) {
      m.makeTranslation(wrap((i >> 1) * 7.5 - this.road, 120), 0.01, i % 2 ? 2.2 : -2.2)
      this.lines.setMatrixAt(i, m)
    }
    this.lines.instanceMatrix.needsUpdate = true
    for (let i = 0; i < 8; i++) {
      const x = wrap(i * 15 - this.road, 120)
      m.makeTranslation(x, 0, -7.2)
      this.poles.setMatrixAt(i, m)
      this.lamps[i].position.x = x
    }
    this.poles.instanceMatrix.needsUpdate = true
    if (this.sweep) this.sweep.position.x = wrap(7.5 - this.road, 15)
    for (let i = 0; i < this.streakData.length; i++) {
      const s = this.streakData[i]
      s.x = wrap(s.x - v * 2.2 * s.v, 120)
      m.makeTranslation(s.x, s.y, s.z)
      this.streaks.setMatrixAt(i, m)
    }
    this.streaks.instanceMatrix.needsUpdate = true

    // camera: the shot, fitted so the car fills the stage, plus a little pointer parallax
    this.pointer.x += (this.pointer.tx - this.pointer.x) * 0.05
    this.pointer.y += (this.pointer.ty - this.pointer.y) * 0.05
    const c = this.cam
    const spec = SHOWCASE[this.active]
    const theta = c.theta + this.pointer.x * 0.06
    const elev = c.elev - this.pointer.y * 0.03
    const tanV = Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2))
    const tanH = tanV * this.camera.aspect
    // how wide and tall the car looks from this angle, against the room the stage gives it
    const spanW = spec.L * Math.abs(Math.cos(theta)) + spec.W * Math.abs(Math.sin(theta))
    const rW = spanW / (2 * tanH * this.focus.w * 1.0)
    const rH = (spec.H * 1.2) / (2 * tanV * this.focus.h * 0.95)
    const r = Math.max(rW, rH) * c.zoom
    this.camera.position.set(Math.sin(theta) * Math.cos(elev) * r, c.look + Math.sin(elev) * r, Math.cos(theta) * Math.cos(elev) * r)
    this.camera.lookAt(0, c.look, 0)

    this.renderer.render(this.scene, this.camera)
    if (!this.firstFrame) {
      this.firstFrame = true
      // the first frame renders inside the constructor; tell the page once it holds a reference to us
      queueMicrotask(() => this.events.onFirstFrame?.())
    }
  }

  dispose() {
    this.disposed = true
    cancelAnimationFrame(this.raf)
    const w = window as Window & { cancelIdleCallback?: (h: number) => void }
    if (w.cancelIdleCallback) w.cancelIdleCallback(this.idleHandle)
    else clearTimeout(this.idleHandle)
    removeEventListener('pointermove', this.onPointer)
    document.removeEventListener('visibilitychange', this.onVisibility)
    this.canvas.removeEventListener('webglcontextlost', this.onLost)
    gsap.killTweensOf([this, this.cam])
    this.cars.forEach((c) => c?.dispose())
    this.scene.traverse((o) => {
      const mesh = o as THREE.Mesh
      mesh.geometry?.dispose()
      const mat = mesh.material as THREE.Material | THREE.Material[] | undefined
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose())
      else mat?.dispose()
    })
    this.scene.environment?.dispose()
    this.renderer.dispose()
  }
}

function glowTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const g = c.getContext('2d')!
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(0.2, 'rgba(255,255,255,0.5)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(c)
}

/** A soft cone of light, brightest near the car and fading down the road. */
function beamTexture() {
  const c = document.createElement('canvas')
  c.width = 256
  c.height = 128
  const g = c.getContext('2d')!
  const grad = g.createLinearGradient(0, 0, 256, 0)
  grad.addColorStop(0, 'rgba(255,255,255,0.9)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grad
  g.beginPath()
  g.moveTo(0, 50)
  g.lineTo(256, 0)
  g.lineTo(256, 128)
  g.lineTo(0, 78)
  g.closePath()
  g.fill()
  return new THREE.CanvasTexture(c)
}
