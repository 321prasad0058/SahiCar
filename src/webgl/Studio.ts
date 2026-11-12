// The car page's 3D studio: a turntable you can drag through 360°, with paint, views and lights.
// Loading fast: the page shows a pre-rendered poster of this exact opening frame (public/3d, made by
// scripts/posters.cjs) while the studio builds. On capable devices a quick low-detail car goes up first, so it can
// be dragged at once, and the full-detail car is built and swapped in once the visitor isn't dragging. Shaders are
// compiled off the main thread where the browser allows (compileAsync), so the first frame doesn't stall.
// The five showcase cars are modelled exactly; any other car gets its body style's reference model,
// without the reference car's signature lights, stretched to its real length, width and height.
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { getTier, reducedMotion } from '../lib/perf'
import { buildCar, type BuildOptions, type CarRig, type CarSpec } from './cars/build'
import { bakeEnvironment } from './env'

export class Studio {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100)
  private controls: OrbitControls
  private rig: CarRig
  private raf = 0
  private ro: ResizeObserver
  private lights = 1
  private dirty = true
  private userMoved = false
  private idleFrames = 0
  private dragging = false
  private disposed = false
  private colour: [string, string | undefined] | null = null
  private upgradeTimer = 0

  constructor(
    private canvas: HTMLCanvasElement,
    private spec: CarSpec,
    private opt: Omit<BuildOptions, 'detail'> = {},
    /** called once the first frame is on screen (the page then fades its poster out) */
    private onReady?: () => void,
    /** quick low-detail car first, full detail swapped in when idle (the car page); off = full detail at once */
    progressive = false,
  ) {
    const high = getTier() === 'high'
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: high, alpha: true, powerPreference: 'default' })
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, high ? 2 : 1.25))
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.scene.environment = bakeEnvironment(this.renderer, 'daylight')
    this.scene.environmentIntensity = 1
    this.scene.add(new THREE.HemisphereLight('#cfeeff', '#0a0d12', 0.35))
    const key = new THREE.DirectionalLight('#ffffff', 0.9)
    key.position.set(5, 7, 4)
    this.scene.add(key)
    const ring = new THREE.Mesh(new THREE.RingGeometry(3.15, 3.2, 96), new THREE.MeshBasicMaterial({ color: '#b9b3a6', transparent: true, opacity: 0.5 }))
    ring.rotation.x = -Math.PI / 2
    this.scene.add(ring)

    // low detail first (several times quicker to build); the full car follows when the visitor is idle
    this.rig = buildCar(spec, { ...opt, detail: high && !progressive ? 'high' : 'low' })
    this.scene.add(this.rig.group)
    this.rig.setLights(1)

    this.camera.position.set(6.4, 2.0, 7.6)
    this.controls = new OrbitControls(this.camera, canvas)
    this.controls.target.set(0, 0.75, 0)
    this.controls.enableDamping = true
    this.controls.enablePan = false
    this.controls.minDistance = 5.5
    this.controls.maxDistance = 14
    this.controls.minPolarAngle = 0.35
    this.controls.maxPolarAngle = Math.PI / 2.04
    this.controls.autoRotate = !reducedMotion
    this.controls.autoRotateSpeed = 0.8
    this.controls.addEventListener('start', () => ((this.controls.autoRotate = false), (this.userMoved = true), (this.dragging = true)))
    this.controls.addEventListener('end', () => (this.dragging = false))
    this.controls.addEventListener('change', () => (this.dirty = true))

    this.ro = new ResizeObserver(() => this.layout())
    this.ro.observe(canvas)
    this.layout()
    void this.start(high && progressive)
  }

  private async start(upgrade: boolean) {
    // compile every shader before the first frame, in parallel where the browser supports it
    try { await this.renderer.compileAsync(this.scene, this.camera) } catch { /* falls back to compiling on first render */ }
    if (this.disposed) return
    this.renderer.render(this.scene, this.camera)
    this.loop()
    requestAnimationFrame(() => !this.disposed && this.onReady?.())
    if (upgrade) this.scheduleUpgrade()
  }

  /** Build the full-detail car when the main thread is free and nobody is dragging, then swap it in. */
  private scheduleUpgrade() {
    const idle = (fn: () => void) => ('requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 1200 }) : setTimeout(fn, 300)) as number
    const attempt = () => {
      if (this.disposed) return
      if (this.dragging) { this.upgradeTimer = window.setTimeout(() => (this.upgradeTimer = idle(attempt)), 400); return }
      const rig = buildCar(this.spec, { ...this.opt, detail: 'high' })
      if (this.disposed) { rig.dispose(); return }
      const swap = () => {
        if (this.disposed) { rig.dispose(); return }
        rig.group.rotation.copy(this.rig.group.rotation)
        this.scene.remove(this.rig.group)
        this.rig.dispose()
        this.rig = rig
        this.scene.add(rig.group)
        rig.setLights(this.lights)
        if (this.colour) this.setColor(this.colour[0], this.colour[1])
        this.dirty = true
      }
      // the full car's extra materials compile before it replaces the quick one
      const tmp = new THREE.Scene()
      tmp.environment = this.scene.environment
      tmp.add(rig.group)
      this.renderer.compileAsync(tmp, this.camera).catch(() => {}).then(() => { tmp.remove(rig.group); swap() })
    }
    this.upgradeTimer = idle(attempt)
  }

  private layout() {
    const w = this.canvas.clientWidth
    const h = this.canvas.clientHeight
    if (!w || !h) return
    this.renderer.setSize(w, h, false)
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    // the framing was set for a 16:10 stage; on a narrower one (phones) step back so the whole car fits,
    // whichever way it's turned
    const aspect = this.camera.aspect
    const target = this.controls.target
    const offset = this.camera.position.clone().sub(target)
    // just far enough that a ~4.5 m car fits the width with a margin, at any angle
    const want = aspect >= 1.6 ? 10.1 : 8.2 * Math.sqrt(1.6 / aspect)
    if (Math.abs(offset.length() - want) > 0.05 && !this.userMoved) offset.setLength(want)
    this.camera.position.copy(target).add(offset)
    if (!this.userMoved) this.controls.maxDistance = Math.max(14, want * 1.3)
    this.dirty = true
  }

  // render only when something moved: an idle studio costs nothing
  private loop = () => {
    this.raf = requestAnimationFrame(this.loop)
    const moving = this.controls.update() || this.controls.autoRotate
    if (moving) this.dirty = true
    if (!this.dirty && ++this.idleFrames > 2) return
    this.idleFrames = 0
    this.dirty = false
    this.renderer.render(this.scene, this.camera)
  }

  /** Body paint, and the roof: a dual-tone contrast, or otherwise the body colour (or black on black-roof models). */
  setColor(c: string, roof?: string) {
    this.colour = [c, roof]
    this.rig.paint.color.set(c)
    this.rig.roof.color.set(roof ?? (this.rig.spec.roof.black ? '#0d0e10' : c))
    this.dirty = true
  }
  toggleLights() {
    this.lights = this.lights ? 0 : 1
    this.rig.setLights(this.lights)
    this.dirty = true
    return this.lights === 1
  }
  view(name: 'front' | 'side' | 'rear' | 'top') {
    const d = this.camera.position.distanceTo(this.controls.target)
    const pos = { front: [d * 0.92, 1.3, d * 0.32], side: [0.01, 1.2, d], rear: [-d * 0.9, 1.5, d * 0.35], top: [0.01, d, 0.01] }[name]
    this.controls.autoRotate = false
    this.camera.position.set(pos[0], pos[1], pos[2])
    this.dirty = true
  }

  /** Dev: a photographer's long-lens shot from a named direction, for comparing against reference photos. */
  shoot(name: 'side' | 'front' | 'rear' | 'f34' | 'r34', fov = 14) {
    const dir = { side: [0, 0, -1], front: [1, 0.12, 0], rear: [-1, 0.16, 0], f34: [0.78, 0.22, -0.62], r34: [-0.75, 0.25, -0.62] }[name]
    const v = new THREE.Vector3(dir[0], dir[1], dir[2]).normalize()
    const d = (name === 'front' || name === 'rear' ? 1.25 : 1.75) / Math.tan(THREE.MathUtils.degToRad(fov / 2))
    this.camera.fov = fov
    this.camera.updateProjectionMatrix()
    this.controls.autoRotate = false
    this.userMoved = true // a fixed photo camera: don't refit it on resize
    this.controls.maxDistance = 200
    this.controls.target.set(0, 0.8, 0)
    this.camera.position.copy(v.multiplyScalar(d)).add(new THREE.Vector3(0, 0.8, 0))
    this.camera.lookAt(this.controls.target)
    this.dirty = true
  }

  /** Dev: a flat black silhouette of the car alone (glass included; glows, floor ring and ground shadow hidden),
   *  for scoring a traced model against the outline of its reference photo (scripts/trace/compare-side.cjs). */
  silhouette() {
    const black = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide })
    this.scene.environment = null
    this.scene.traverse((o) => {
      if (o === this.scene || o === this.rig.group) return
      if ((o as THREE.Sprite).isSprite || o.name === 'contact-shadow') { o.visible = false; return }
      if ((o as THREE.Mesh).isMesh) {
        if (!this.rig.group.getObjectById(o.id)) { o.visible = false; return } // the floor ring
        ;(o as THREE.Mesh).material = black
      }
    })
    this.renderer.toneMapping = THREE.NoToneMapping
    this.dirty = true
  }

  /** Dev: this exact opening frame as a transparent WebP, for the page's loading poster (scripts/posters.cjs). */
  poster(): string {
    this.renderer.render(this.scene, this.camera)
    return this.canvas.toDataURL('image/webp', 0.86)
  }

  /** Dev: build the full-detail car now (posters are made from it). */
  async upgradeNow() {
    const rig = buildCar(this.spec, { ...this.opt, detail: 'high' })
    this.scene.remove(this.rig.group)
    this.rig.dispose()
    this.rig = rig
    this.scene.add(rig.group)
    rig.setLights(this.lights)
    if (this.colour) this.setColor(this.colour[0], this.colour[1])
    await this.renderer.compileAsync(this.scene, this.camera)
    this.dirty = true
  }

  dispose() {
    this.disposed = true
    clearTimeout(this.upgradeTimer)
    if ('cancelIdleCallback' in window) cancelIdleCallback(this.upgradeTimer)
    cancelAnimationFrame(this.raf)
    this.ro.disconnect()
    this.controls.dispose()
    this.rig.dispose()
    this.scene.environment?.dispose()
    this.renderer.dispose()
  }
}
