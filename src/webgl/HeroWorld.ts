// The landing hero: five body styles — each modelled on a popular Indian car, unnamed on the site — shown one
// at a time in a seamless daylight photo studio, the way carmakers' configurators present a car. The page
// cycles through them in place: the old car rolls off, the next rolls in, and the camera eases to an angle
// chosen per car. The camera frames the car inside a "stage" rectangle the page measures, so it never sits
// behind text on any screen size.
//
// Built to stay smooth anywhere:
// - no downloads: every car, texture and the studio lighting are procedural;
// - no post-processing; the road is one scrolling texture and the wheels spin with it;
// - only the first car is built up front, the rest one per idle moment;
// - resolution adapts to the frame rate; rendering stops when the hero is scrolled away or the tab is hidden;
//   a lost WebGL context hands over to the static poster.
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
  { theta: 0.62, elev: 0.1, look: 0.8, zoom: 1 }, // electric SUV
  { theta: 0.5, elev: 0.12, look: 0.68, zoom: 0.96 }, // hatchback
  { theta: 0.42, elev: 0.1, look: 0.7, zoom: 1.04 }, // sedan
  { theta: 0.72, elev: 0.07, look: 0.82, zoom: 0.98 }, // SUV
  { theta: 0.46, elev: 0.12, look: 0.84, zoom: 1.06 }, // MPV
]

/** A light concrete road, tiled every `len` metres: faint texture, edge lines and a dashed centre line. */
function roadTexture(len: number) {
  const c = document.createElement('canvas')
  c.width = 512
  c.height = 64
  const g = c.getContext('2d')!
  g.fillStyle = '#cdc7bb'
  g.fillRect(0, 0, 512, 64)
  // a little grain so the movement reads
  for (let i = 0; i < 900; i++) {
    g.fillStyle = Math.random() < 0.5 ? 'rgba(255,255,255,0.18)' : 'rgba(80,70,55,0.06)'
    g.fillRect(Math.random() * 512, Math.random() * 64, 2, 1)
  }
  g.fillStyle = '#faf8f3'
  g.fillRect(0, 3, 512, 3)
  g.fillRect(0, 58, 512, 3)
  for (let x = 0; x < 512; x += 128) g.fillRect(x + 16, 30, 64, 4)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.wrapS = THREE.RepeatWrapping
  t.repeat.set(160 / len, 1)
  t.anisotropy = 8
  return t
}

/** the studio colour: the wall and the floor melt into it at the horizon */
const STUDIO = new THREE.Color('#efece6')

export interface HeroEvents {
  onFirstFrame?: () => void
  onFail?: () => void
}

export class HeroWorld {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera = new THREE.PerspectiveCamera(30, 1, 0.1, 300)
  private cars: (CarRig | null)[] = SHOWCASE.map(() => null)
  private lastX: number[] = SHOWCASE.map(() => 0)
  private active: number
  private raf = 0
  private disposed = false
  private firstFrame = false
  private idleHandle = 0
  private tier = getTier()
  private dpr: number
  private maxDpr: number
  private frameTimes: number[] = []
  private needsRender = true
  private visible = true
  private running = true
  private last = performance.now()

  lights = 0
  /** driving speed, 0..1; the road scrolls and the wheels turn with it */
  speed = 0
  private road: THREE.Texture
  private roadLen = 12
  private elapsed = 0
  private cam: { theta: number; elev: number; look: number; zoom: number }
  /** where on the canvas the car should sit: centre and size as fractions of the canvas */
  private focus = { x: 0.7, y: 0.5, w: 0.45, h: 0.45 }
  private pointer = { x: 0, y: 0, tx: 0, ty: 0 }

  constructor(private canvas: HTMLCanvasElement, private events: HeroEvents = {}, start = 0) {
    this.active = start
    this.cam = { ...SHOTS[start], theta: SHOTS[start].theta - 0.5, elev: SHOTS[start].elev + 0.06, zoom: 1.25 }
    const high = this.tier === 'high'
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: high, powerPreference: 'default', alpha: false, stencil: false })
    this.maxDpr = Math.min(devicePixelRatio, high ? 2 : 1.25)
    this.dpr = this.maxDpr
    this.renderer.setPixelRatio(this.dpr)
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.05
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    canvas.addEventListener('webglcontextlost', this.onLost, false)

    // a seamless cyclorama: a matte floor that fades into the wall colour toward the horizon
    this.scene.background = STUDIO
    this.scene.fog = new THREE.Fog(STUDIO, 14, 46)
    this.scene.environment = bakeEnvironment(this.renderer, 'daylight')
    this.scene.environmentIntensity = 1
    const floor = new THREE.Mesh(new THREE.CircleGeometry(80, 64), new THREE.MeshStandardMaterial({ color: '#e6e1d8', roughness: 0.95, metalness: 0 }))
    floor.rotation.x = -Math.PI / 2
    this.scene.add(floor)

    // a pale road with dashed lane lines that flows under the car — the drive, in daylight
    this.road = roadTexture(this.roadLen)
    const road = new THREE.Mesh(new THREE.PlaneGeometry(160, 7.5), new THREE.MeshStandardMaterial({ map: this.road, roughness: 0.9, metalness: 0 }))
    road.rotation.x = -Math.PI / 2
    road.position.y = 0.002
    this.scene.add(road)
    const key = new THREE.DirectionalLight('#ffffff', 1.4)
    key.position.set(5, 10, 6)
    this.scene.add(key, new THREE.HemisphereLight('#ffffff', '#d6cfc2', 0.9))

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
    this.needsRender = true
  }
  private onVisibility = () => this.setRunning(!document.hidden && this.visible)
  private onLost = (e: Event) => {
    e.preventDefault()
    this.disposed = true
    cancelAnimationFrame(this.raf)
    this.events.onFail?.()
  }

  /** Stop rendering entirely while the hero is off screen; pick up where it left off. */
  setVisible(v: boolean) {
    this.visible = v
    this.setRunning(v && !document.hidden)
  }
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

  /** The opening: the camera settles on the first car and its lamps come on. */
  intro(skipSweep = false) {
    const tl = gsap.timeline()
    const s = SHOTS[this.active]
    if (reducedMotion || skipSweep) {
      Object.assign(this.cam, s)
      this.lights = 0.6
      this.speed = reducedMotion ? 0 : 1
      this.needsRender = true
      return tl
    }
    tl.to(this.cam, { ...s, duration: 1.6, ease: 'power3.out' }, 0)
    tl.to(this, { lights: 0.6, duration: 0.8, ease: 'power2.out' }, 0.4)
    tl.to(this, { speed: 1, duration: 1.4, ease: 'power2.inOut' }, 0.2)
    return tl
  }

  /**
   * Bring car i on stage. dir 1: the current car rolls off ahead and the next follows; -1: the reverse.
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
      this.lastX[idx] = 0
      this.needsRender = true
      return Promise.resolve()
    }
    if (from) gsap.to(from.group.position, { x: 22 * dir, duration: 0.55, ease: 'power2.in', overwrite: true, onComplete: () => void (from.group.visible = false) })
    to.group.visible = true
    to.group.position.x = -20 * dir
    this.lastX[idx] = to.group.position.x
    return new Promise((resolve) => {
      gsap.to(to.group.position, { x: 0, duration: 0.8, delay: 0.1, ease: 'power3.out', overwrite: true, onComplete: () => resolve() })
    })
  }

  get current() {
    return this.active
  }

  private adapt(dtMs: number) {
    if (dtMs > 250) return
    this.frameTimes.push(dtMs)
    if (this.frameTimes.length < 30) return
    const avg = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length
    this.frameTimes = []
    if (avg > 24 && this.dpr > 0.75) this.setDpr(this.dpr - 0.25)
  }
  private setDpr(v: number) {
    this.dpr = Math.max(0.75, Math.min(this.maxDpr, v))
    this.renderer.setPixelRatio(this.dpr)
    this.layout()
  }

  private loop = () => {
    if (this.disposed) return
    this.raf = requestAnimationFrame(this.loop)
    const now = performance.now()
    const dt = now - this.last
    this.last = now
    // parallax settles over a few frames after the pointer stops
    const settling = Math.abs(this.pointer.tx - this.pointer.x) + Math.abs(this.pointer.ty - this.pointer.y) > 0.002
    const driving = this.speed > 0.001
    const moving = driving || gsap.isTweening(this.cam) || gsap.isTweening(this) || this.cars.some((c) => c && gsap.isTweening(c.group.position))
    if (!moving && !settling && !this.needsRender) return
    if (moving) this.adapt(dt)
    this.needsRender = false

    // the road flows past at driving speed; the wheels turn with the road plus any roll-in / roll-off
    const sec = Math.min(0.05, dt / 1000)
    this.elapsed += sec
    const v = this.speed * 3.5 * sec
    this.road.offset.x = (this.road.offset.x + v / this.roadLen) % 1
    this.cars.forEach((car, i) => {
      if (!car?.group.visible) return
      car.spin(v + (car.group.position.x - this.lastX[i]))
      this.lastX[i] = car.group.position.x
      car.group.position.y = Math.sin(this.elapsed * 7.5 + i) * 0.004 * this.speed
      car.setLights(this.lights)
    })

    this.pointer.x += (this.pointer.tx - this.pointer.x) * 0.08
    this.pointer.y += (this.pointer.ty - this.pointer.y) * 0.08
    const c = this.cam
    const spec = SHOWCASE[this.active]
    const theta = c.theta + this.pointer.x * 0.05
    const elev = c.elev - this.pointer.y * 0.025
    const tanV = Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2))
    const tanH = tanV * this.camera.aspect
    // how wide and tall the car looks from this angle, against the room the stage gives it
    const spanW = spec.L * Math.abs(Math.cos(theta)) + spec.W * Math.abs(Math.sin(theta))
    const rW = spanW / (2 * tanH * this.focus.w)
    const rH = (spec.H * 1.2) / (2 * tanV * this.focus.h * 0.95)
    // phones: leave breathing room either side instead of filling the screen edge to edge
    const r = Math.max(rW, rH) * c.zoom * (this.camera.aspect < 1 ? 1.16 : 1)
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
