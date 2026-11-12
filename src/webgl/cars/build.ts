// Builds a car from a CarSpec traced from real photographs: a lofted body and glasshouse with raked
// pillars, cladding with its own traced top line, and "decals" — lamp, grille, skid-plate and trim outlines
// traced from front/rear/side photos and projected onto the curved body. Static parts are merged by material.
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { curve, loft, ring, ringZ, stationsU, type Pts, type Ring, type Tag } from './loft'

export type Mat = 'gloss' | 'trim' | 'clad' | 'chrome' | 'silver' | 'satin' | 'reflector' | 'drl' | 'head' | 'tail' | 'amber' | 'mesh' | 'hex' | 'slats' | 'body' | 'glass'
/** An outline traced from a photo. Front/rear: [z, y] in metres (z across the car, + = right); side: [u, y]. */
export interface Decal {
  mat: Mat
  poly: [number, number][]
  /** also place a mirror image on the other side */
  mirror?: boolean
  /** stacking: decals drawn on top of others sit a little further out */
  layer?: number
  /** relief in metres: how far the part stands proud of the body, with walls round its edge (0 = flat skin).
   *  Defaults by material give lamps a lens, housings a rim, grilles a lip and solid slats. */
  depth?: number
  /** projection grid size in metres (default 11 mm): finer for small parts on a curved nose, so edges don't stair-step */
  step?: number
}
/** default relief per material (metres) */
const RELIEF: Partial<Record<Mat, number>> = { head: 0.014, drl: 0.01, tail: 0.012, amber: 0.01, gloss: 0.006, silver: 0.01, satin: 0.008, reflector: 0.004, chrome: 0.006, mesh: 0.004, hex: 0.004, slats: 0.004 }
export type WheelStyle = 'turbine' | 'twin' | 'aero' | 'multi' | 'blade' | 'split' | 'swirl' | 'petal'

export interface CarSpec {
  id: string
  name: string
  L: number
  W: number
  H: number
  /** u (0 = tail … 1 = nose) of the rear and front axles, measured from a side photo */
  axles: [number, number]
  tyreR: number
  tyreW: number
  rim: number
  wheel: { style: WheelStyle; spokes: number }
  /** gap between tyre and arch opening, and how square the arch is (0 round … 1 square) */
  archGap: number
  archSquare: number
  /** black end walls in each wheel well this far (m) inside the arch edges, out to the skin: they hide the body's own
   *  paint-coloured wall at the arch edge (light paint speckling through the cladding in deep wheel gaps) */
  wellInset?: number
  sill: Pts
  top: Pts
  width: Pts
  crown?: number
  bulge?: number
  shoulder?: { y: Pts; inset: number }
  /** how far the corners of the nose / tail sweep back from the centre line (plan view), metres */
  noseSweep?: number
  tailSweep?: number
  greenhouse: { u0: number; u1: number; top: Pts; tumble: number; /** up to this u the glass's foot follows the body's
   *  own edge (leaning tail sides from `shoulder.inset`) instead of 0.955 × width, so no ledge sticks out under it */ followBody?: number }
  roof: { u0: number; u1: number; black: boolean }
  /** glass that wraps up into the roof edge */
  alpine?: [number, number]
  /** raked pillars: u range at the beltline and at the roof */
  pillars: { bottom: [number, number]; top: [number, number]; black: boolean; /** overrides black/body, e.g. a silver C-pillar panel */ mat?: Mat; /** extra points on the rear edge, roof → belt, as [u, f] with f = 1 at the roof, 0 at the belt */ rearEdge?: [number, number][]; /** decal grid step (m) for a pillar on a strongly curved glasshouse */ step?: number }[]
  /** black plastic over the lower body: its traced top line, and how far the arch flares reach */
  /** `cut`: take the cladding's section from the full body height, cut off at its top, so a low band along the
   *  doors shows at its traced height (otherwise the section's rounded top corner tucks a low band under the paint) */
  cladding?: { top: Pts; flare: number; cut?: boolean; /** where the traced top reaches the body's own top (black bumpers),
   *  cover the whole section instead of stopping 4 cm short, so the bumper's top surface is black too */ cover?: boolean
    /** how far the arch flares stand out from the body (m, default 0.026), and the u range they are kept inside (so a
     *  flare reaching past an upright nose doesn't lid the face) */ flareOut?: number; flareU?: [number, number]
    /** unpainted grey plastic instead of black (hex), e.g. the Punch.ev's grey cladding and bumpers */ color?: string }
  /** a spare wheel on the tailgate: its outer face at the tail (u = 0), its hub at height y (m) */
  spare?: { y: number }
  /** door shut lines: u at the sill and at the beltline */
  doors: [number, number][]
  front: Decal[]
  rear: Decal[]
  side?: Decal[]
  plates: { front: number; rear: number }
  rails?: 'silver' | 'black'
  /** a roof spoiler over the tailgate glass; optionally its reach back (m), thickness (m) and downward tilt (rad) */
  spoiler?: boolean | { len?: number; thick?: number; tilt?: number }
  sunroof?: [number, number]
  mirrors: 'black' | 'body'
  /** u of the door mirrors (default 0.04 behind the glasshouse's front end), for a long screen running into the bonnet */
  mirrorU?: number
  /** fender haunches: the body swells this fraction wider over each wheel and is pinched in between
   *  (width stays the official width at the haunch peak) */
  haunch?: number
  /** radius (m) of the body's upper side edge (shoulder roll, bonnet and tail edges); default 0.17. A boxy car
   *  with lamps tucked under the bonnet edge wants less, so the nose and tail faces stay flat up to the lamps */
  topRadius?: number
  /** strongly raked nose/tail (hatchbacks): end parts above the outermost section are placed on the lofted strip
   *  between sections, so lamps on a sloping tail don't stripe. Upright SUV ends look cleaner without it */
  rakedEnds?: boolean
  /** drop zero-area decal triangles (snapped edge slivers): their noisy normals fray slanted lamp edges into spikes
   *  on a raked end */
  dropSlivers?: boolean
  /** height (m) of the twin raised creases along the bonnet */
  bonnetRidge?: number
  /** dark gunmetal alloys (machined edges) instead of bright silver */
  rimTone?: 'dark'
  windowChrome?: boolean
  paint: string
  ev?: boolean
  plate: string
}

export interface CarRig {
  group: THREE.Group
  paint: THREE.MeshPhysicalMaterial
  /** the roof's own paint: body colour, black, or a dual-tone contrast */
  roof: THREE.MeshPhysicalMaterial
  spec: CarSpec
  setLights(v: number): void
  spin(dx: number): void
  dispose(): void
}

export interface BuildOptions {
  detail: 'high' | 'low'
  /** generic body-style mode: keep the shape, drop the reference car's lamp and grille signature */
  generic?: boolean
  paint?: string
  size?: { length?: number | null; width?: number | null; height?: number | null }
}

// ── shared resources, built once

let shared: ReturnType<typeof makeShared> | null = null
function canvasTex(w: number, h: number, draw: (g: CanvasRenderingContext2D) => void, repeat = false) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  draw(c.getContext('2d')!)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping
  return t
}
function makeShared() {
  const glow = canvasTex(64, 64, (g) => {
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32)
    grad.addColorStop(0, 'rgba(255,255,255,1)')
    grad.addColorStop(0.25, 'rgba(255,255,255,0.45)')
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    g.fillStyle = grad
    g.fillRect(0, 0, 64, 64)
  })
  const shadow = canvasTex(128, 128, (g) => {
    const grad = g.createRadialGradient(64, 64, 8, 64, 64, 64)
    grad.addColorStop(0, 'rgba(0,0,0,0.85)')
    grad.addColorStop(0.6, 'rgba(0,0,0,0.45)')
    grad.addColorStop(1, 'rgba(0,0,0,0)')
    g.fillStyle = grad
    g.fillRect(0, 0, 128, 128)
  })
  const pattern = (kind: 'mesh' | 'hex' | 'slats') =>
    canvasTex(
      128,
      128,
      (x) => {
        x.fillStyle = '#07090b'
        x.fillRect(0, 0, 128, 128)
        if (kind === 'slats') {
          x.fillStyle = '#22282d'
          for (let i = 6; i < 128; i += 21) x.fillRect(i, 0, 9, 128)
          return
        }
        x.strokeStyle = kind === 'hex' ? '#c9d1d8' : '#2c3238'
        x.lineWidth = kind === 'hex' ? 5 : 2.5
        const r = kind === 'hex' ? 15 : 8
        for (let row = -1; row < 12; row++)
          for (let col = -1; col < 12; col++) {
            const cx = col * r * 1.75 + (row % 2) * r * 0.87
            const cy = row * r * 1.5
            x.beginPath()
            for (let k = 0; k < 6; k++) {
              const a = (Math.PI / 3) * k + Math.PI / 6
              x.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a))
            }
            x.closePath()
            x.stroke()
          }
      },
      true,
    )
  return {
    glow,
    shadow,
    mesh: pattern('mesh'),
    hex: pattern('hex'),
    slats: pattern('slats'),
    glass: new THREE.MeshStandardMaterial({ color: '#020406', metalness: 0.2, roughness: 0.06, envMapIntensity: 0.045 }),
    trim: new THREE.MeshStandardMaterial({ color: '#111315', metalness: 0.1, roughness: 0.72, side: THREE.DoubleSide }),
    gloss: new THREE.MeshPhysicalMaterial({ color: '#050607', metalness: 0.5, roughness: 0.12, clearcoat: 1, side: THREE.DoubleSide }),
    chrome: new THREE.MeshStandardMaterial({ color: '#e4eaef', metalness: 1, roughness: 0.14, side: THREE.DoubleSide }),
    silver: new THREE.MeshStandardMaterial({ color: '#b3bbc2', metalness: 0.85, roughness: 0.3, side: THREE.DoubleSide }),
    // satin silver for big painted-silver panels (skid plates): some metal, soft highlights, never paper-white
    satin: new THREE.MeshStandardMaterial({ color: '#9da2a7', metalness: 0.5, roughness: 0.5, envMapIntensity: 0.45, side: THREE.DoubleSide }),
    // unlit red reflectors (bumper reflectors, reflector bars): red plastic with a faint glow, no lamp halo
    reflector: new THREE.MeshStandardMaterial({ color: '#9a0f1a', emissive: '#4a0008', metalness: 0.2, roughness: 0.35, side: THREE.DoubleSide }),
    tyre: new THREE.MeshStandardMaterial({ color: '#111214', roughness: 0.88 }),
    rimDark: new THREE.MeshStandardMaterial({ color: '#3a4147', metalness: 0.75, roughness: 0.32 }),
    rimFace: new THREE.MeshStandardMaterial({ color: '#d7dee4', metalness: 1, roughness: 0.2 }),
    rimGun: new THREE.MeshStandardMaterial({ color: '#4b5056', metalness: 0.85, roughness: 0.32 }),
    brake: new THREE.MeshStandardMaterial({ color: '#44484c', metalness: 0.8, roughness: 0.5 }),
    well: new THREE.MeshBasicMaterial({ color: '#020203' }),
  }
}

const plateCache = new Map<string, THREE.CanvasTexture>()
/** A blank number plate (no registration number or lettering): white, or green for electric cars. */
function plateTexture(_text: string, ev: boolean) {
  const key = `blank|${ev}`
  if (plateCache.has(key)) return plateCache.get(key)!
  const t = canvasTex(512, 120, (x) => {
    x.fillStyle = ev ? '#0f7a3a' : '#f4f4f0' // India: green plates for electric cars
    x.fillRect(0, 0, 512, 120)
    x.strokeStyle = ev ? '#e9f5ee' : '#2a2a2a'
    x.lineWidth = 5
    x.strokeRect(5, 5, 502, 110)
  })
  t.anisotropy = 4
  plateCache.set(key, t)
  return t
}

// ── polygon helpers

function inside(p: [number, number], poly: [number, number][]) {
  let c = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j]
    if (yi > p[1] !== yj > p[1] && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) c = !c
  }
  return c
}
function nearestOnPoly(p: [number, number], poly: [number, number][]): [number, number] {
  let best: [number, number] = poly[0]
  let bd = Infinity
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length]
    const dx = b[0] - a[0], dy = b[1] - a[1]
    const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)))
    const q: [number, number] = [a[0] + t * dx, a[1] + t * dy]
    const d = (q[0] - p[0]) ** 2 + (q[1] - p[1]) ** 2
    if (d < bd) { bd = d; best = q }
  }
  return best
}

/** ringZ of the cross-section part-way (t: 0 = a … 1 = b) along the lofted strip between rings a and b */
function ringZBlend(a: Ring, b: Ring, t: number, y: number) {
  let best = 0
  const p = a.pts, q = b.pts, n = p.length
  for (let i = 0; i < n; i++) {
    const k = (i + 1) % n
    const z1 = p[i][0] + (q[i][0] - p[i][0]) * t, y1 = p[i][1] + (q[i][1] - p[i][1]) * t
    const z2 = p[k][0] + (q[k][0] - p[k][0]) * t, y2 = p[k][1] + (q[k][1] - p[k][1]) * t
    if (z1 < 0 && z2 < 0) continue
    if ((y1 - y) * (y2 - y) <= 0 && y1 !== y2) {
      const z = z1 + ((y - y1) / (y2 - y1)) * (z2 - z1)
      if (z > best) best = z
    }
  }
  return best
}

// ── the builder

export function buildCar(spec: CarSpec, opt: BuildOptions): CarRig {
  const S = (shared ??= makeShared())
  const hi = opt.detail === 'high'
  const { L, W } = spec
  const sill = curve(spec.sill), top = curve(spec.top), width = curve(spec.width), ghTop = curve(spec.greenhouse.top)
  const shoulderY = spec.shoulder ? curve(spec.shoulder.y) : null
  const cladTop = spec.cladding ? curve(spec.cladding.top) : null
  const xOf = (u: number) => (u - 0.5) * L
  const uOf = (x: number) => x / L + 0.5
  const axles = [xOf(spec.axles[1]), xOf(spec.axles[0])]
  const archR = spec.tyreR + spec.archGap
  const archY = spec.tyreR

  const archLine = (x: number) => {
    let y = -1
    for (const ax of axles) {
      const t = (x - ax) / archR
      if (Math.abs(t) >= 1) continue
      const p = 2 + spec.archSquare * 2.2
      y = Math.max(y, archY + archR * Math.pow(1 - Math.pow(Math.abs(t), p), 1 / p))
    }
    return y
  }

  // fender haunches: full width over the wheels, pinched in along the doors and at the ends
  const haunch = spec.haunch ?? 0
  const haunchK = (x: number) => {
    if (!haunch) return 1
    let b = 0
    for (const ax of axles) b = Math.max(b, Math.exp(-(((x - ax) / (archR * 1.35)) ** 2)))
    return 1 - haunch + haunch * b
  }

  // double-sided: body-coloured decals (pillars, fins) are wound either way on the glasshouse
  const paint = new THREE.MeshPhysicalMaterial({ color: opt.paint ?? spec.paint, metalness: 0.55, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.05, side: THREE.DoubleSide })
  // the roof has its own paint so dual-tone colours (contrasting roof) can be shown
  const roofPaint = paint.clone()
  // satin black: a glossy clearcoat turns a flat roof light grey at the grazing angles of a rear view
  if (spec.roof.black) { roofPaint.color.set('#0d0e10'); roofPaint.metalness = 0.2; roofPaint.roughness = 0.5; roofPaint.clearcoat = 0.35; roofPaint.clearcoatRoughness = 0.45; roofPaint.envMapIntensity = 0.6 }
  const disposables: { dispose(): void }[] = [paint, roofPaint]
  const parts = new Map<THREE.Material, THREE.BufferGeometry[]>()
  const add = (mat: THREE.Material, g: THREE.BufferGeometry, m?: THREE.Matrix4) => {
    if (m) g.applyMatrix4(m)
    if (!parts.has(mat)) parts.set(mat, [])
    parts.get(mat)!.push(g)
  }
  const group = new THREE.Group()

  // ── lower body
  const nSt = hi ? 160 : 100
  const seg = hi ? 40 : 26
  const stations = stationsU(nSt).map((u) => {
    const x = xOf(u)
    const yb = Math.max(sill(u), archLine(x))
    const yt = top(u)
    const hw = ((width(u) * W) / 2) * haunchK(x)
    return {
      x,
      ring: ring(hw, yb, yt, 0.07, spec.topRadius ?? 0.17, seg, {
        bulge: spec.bulge ?? 0.025,
        crown: u > spec.greenhouse.u1 ? spec.crown ?? 0.025 : 0,
        ridge: u > spec.greenhouse.u1 + 0.02 && u < 0.985 ? spec.bonnetRidge : undefined,
        shoulder: shoulderY ? shoulderY(u) : undefined,
        inset: spec.shoulder?.inset,
      }),
    }
  })
  const body = loft(stations, (_c, tag) => (tag === 'bottom' ? 1 : 0), 2)
  disposables.push(body.geometry)
  group.add(new THREE.Mesh(body.geometry, [paint, S.trim]))

  const rings = body.rings
  const bracket = (x: number) => {
    let lo = 0, hiI = rings.length - 1
    while (hiI - lo > 1) {
      const m = (lo + hiI) >> 1
      if (rings[m].x < x) lo = m
      else hiI = m
    }
    return [lo, hiI]
  }
  const zAt = (x: number, y: number) => {
    const [lo, hiI] = bracket(x)
    const a = rings[lo], b = rings[hiI]
    const t = Math.max(0, Math.min(1, (x - a.x) / (b.x - a.x || 1)))
    return ringZ(a.ring, y) * (1 - t) + ringZ(b.ring, y) * t
  }
  /** where the body surface is, seen from the nose (end 1) or tail (end -1), at lateral z and height y */
  // the rings within 0.3 m of each end (a front/rear outline may wrap round a corner, but never run back along the
  // flank over a wheel), and per height the z of each: a decal grid row asks the same height for every column
  const endZone = (end: 1 | -1) => {
    const n = rings.length, out: number[] = []
    for (let k = 0; k < n; k++) {
      const i = end > 0 ? n - 1 - k : k
      if (Math.abs(rings[i].x - rings[end > 0 ? n - 1 : 0].x) > 0.3) break
      out.push(i)
    }
    return out
  }
  const zone = { 1: endZone(1), [-1]: endZone(-1) } as Record<1 | -1, number[]>
  const zRows = { 1: new Map<number, Float64Array>(), [-1]: new Map<number, Float64Array>() } as Record<1 | -1, Map<number, Float64Array>>
  const endRow = (end: 1 | -1, y: number) => {
    let row = zRows[end].get(y)
    if (!row) {
      const zs = zone[end]
      row = new Float64Array(zs.length)
      for (let k = 0; k < zs.length; k++) row[k] = ringZ(rings[zs[k]].ring, y)
      zRows[end].set(y, row)
    }
    return row
  }
  const endPoint = (end: 1 | -1, z: number, y: number): THREE.Vector3 | null => {
    const az = Math.abs(z)
    const zs = zone[end], row = endRow(end, y)
    for (let k = 0; k < zs.length; k++) {
      const i = zs[k]
      const zi = row[k]
      // zi = 0 means the ring does not reach this height (matters on the centre line, where az = 0)
      if (zi > 0 && zi >= az) {
        if (k === 0) return new THREE.Vector3(rings[i].x, y, z)
        const j = end > 0 ? i + 1 : i - 1
        // find the crossing on the lofted strip between the two rings (their vertices blended), not by
        // blending the two rings' z: on a raked end the outer ring may not reach this height at all, and a
        // straight blend then puts each grid row on a different step
        const zj = ringZ(rings[j].ring, y)
        // the next ring reaches this height: blend the two rings' z. If it doesn't (a raked end, above the outer
        // ring), find the crossing on the lofted strip between them instead (their vertices blended), or each
        // grid row lands on a different step
        let t = (zi - az) / (zi - zj || 1)
        if (spec.rakedEnds && zj <= 0) {
          let lo = 0, hiT = 1
          for (let it = 0; it < 12; it++) {
            const m = (lo + hiT) / 2
            const zm = ringZBlend(rings[i].ring, rings[j].ring, m, y)
            if (zm > 0 && zm >= az) lo = m
            else hiT = m
          }
          t = (lo + hiT) / 2
        }
        return new THREE.Vector3(rings[i].x + t * (rings[j].x - rings[i].x), y, z)
      }
    }
    return null
  }
  let ghZRef: ((x: number, y: number) => number) | null = null
  const sidePoint = (u: number, y: number, side: 1 | -1) =>
    new THREE.Vector3(xOf(u), y, side * (ghZRef && y > top(u) - 0.01 ? ghZRef(xOf(u), y) : zAt(xOf(u), y)))

  // grey unpainted plastic when the spec asks for it (cladding.color), else black trim; decals use it as 'clad'
  let cladMat: THREE.Material = S.trim
  if (spec.cladding?.color) {
    cladMat = new THREE.MeshStandardMaterial({ color: spec.cladding.color, metalness: 0.1, roughness: 0.75, side: THREE.DoubleSide })
    disposables.push(cladMat)
  }
  // ── cladding: a thin black skin with its own traced top edge and flared arches
  if (spec.cladding && cladTop) {
    const flare = spec.cladding.flare
    const fu = spec.cladding.flareU ?? [0, 1]
    const inFlareU = (x: number) => uOf(x) >= fu[0] && uOf(x) <= fu[1]
    const cTop = (x: number) => {
      let y = cladTop(uOf(x))
      if (inFlareU(x)) for (const ax of axles) {
        const d = Math.abs(x - ax)
        const R = archR + flare
        // the flare follows the arch's own squareness (a superellipse), not a plain circle
        const pe = 2 + spec.archSquare * 2.2
        if (d < R) y = Math.max(y, archY + R * Math.pow(1 - Math.pow(d / R, pe), 1 / pe))
      }
      return y
    }
    const clad = loft(
      stations.map(({ x }, i) => {
        const u = uOf(x)
        const yb = Math.max(sill(u), archLine(x)) - 0.004
        const yt = Math.min(cTop(x), top(u) - 0.04)
        const xx = i === 0 ? x - 0.008 : i === stations.length - 1 ? x + 0.008 : x
        // the cladding follows the body's own cross-section (same corner radii, bulge and shoulder), offset
        // outward by its thickness, so the paint can never poke through it in patches
        let out = 0.012
        if (inFlareU(x)) for (const ax of axles) if (Math.abs(x - ax) < archR + flare) out = spec.cladding!.flareOut ?? 0.026
        const cut = !!spec.cladding!.cut
        const cover = !!spec.cladding!.cover && cTop(x) >= top(u) - 0.005
        const ytc = cover ? top(u) + 0.006 : Math.max(yb + 0.01, yt)
        const r = ring(((width(u) * W) / 2) * haunchK(x) + out, yb, cut || cover ? Math.max(ytc, top(u) + (cover ? 0.006 : 0)) : ytc, 0.07, spec.topRadius ?? 0.17, seg, {
          bulge: spec.bulge ?? 0.025,
          crown: cover && u > spec.greenhouse.u1 ? spec.crown ?? 0.025 : 0,
          shoulder: shoulderY ? shoulderY(u) : undefined,
          inset: spec.shoulder?.inset,
        })
        if (cut && !cover) r.pts = r.pts.map(([z, y]) => [z, Math.min(y, ytc)])
        return { x: xx, ring: r }
      }),
      () => 0,
      1,
    )
    disposables.push(clad.geometry)
    group.add(new THREE.Mesh(clad.geometry, cladMat))
  }

  // ── glasshouse with raked pillars
  const gh = spec.greenhouse
  const ghSt = stationsU(hi ? 140 : 60).map((t) => {
    const u = gh.u0 + (gh.u1 - gh.u0) * t
    const x = xOf(u)
    const yb = top(u) - 0.025
    const yt = Math.max(yb + 0.004, ghTop(u))
    let hwG = ((width(u) * W) / 2) * 0.955
    // opt-in: up to u = followBody the glasshouse foot sits on the body's own edge (a tail whose sides lean in leaves
    // no ledge under the glass), blending back to the plain width over the next 3 % of the length
    if (gh.followBody != null) {
      const zb = zAt(x, yb), k = Math.max(0, Math.min(1, (u - gh.followBody) / 0.03))
      if (zb > 0) hwG = zb * (1 - k) + hwG * k
    }
    return { x, yb, yt, ring: ring(hwG, yb, yt, 0.005, 0.11, hi ? 32 : 20, { tumble: gh.tumble }) }
  })
  const inRange = (u: number, r?: [number, number]) => !!r && u >= r[0] && u <= r[1]
  /** the glasshouse surface at (x, y), for drawing pillars on it */
  const ghZ = (x: number, y: number) => {
    let lo = 0, hiI = ghSt.length - 1
    while (hiI - lo > 1) {
      const m = (lo + hiI) >> 1
      if (ghSt[m].x < x) lo = m
      else hiI = m
    }
    const a = ghSt[lo], b = ghSt[hiI]
    const t = Math.max(0, Math.min(1, (x - a.x) / (b.x - a.x || 1)))
    return ringZ(a.ring, y) * (1 - t) + ringZ(b.ring, y) * t
  }
  ghZRef = ghZ

  const glassHouse = loft(
    ghSt,
    (c, tag: Tag) => {
      const u = uOf(c.x)
      const roofed = u >= spec.roof.u0 && u <= spec.roof.u1 && !inRange(u, spec.alpine)
      if (tag === 'top') return roofed ? 1 : 0
      if (tag === 'tarc') return roofed ? 1 : inRange(u, spec.alpine) ? 0 : 2
      if (tag === 'side') return 0 // pillars are drawn as traced outlines on top (below)
      return 2
    },
    4,
  )
  disposables.push(glassHouse.geometry)
  group.add(new THREE.Mesh(glassHouse.geometry, [S.glass, roofPaint, S.gloss, paint]))

  // ── lights and decals
  const lightMats: { mat: THREE.MeshBasicMaterial; base: THREE.Color; k: number }[] = []
  const lightMat = (hex: string, k: number) => {
    const base = new THREE.Color(hex)
    const mat = new THREE.MeshBasicMaterial({ color: base.clone(), toneMapped: false, side: THREE.DoubleSide })
    disposables.push(mat)
    lightMats.push({ mat, base, k })
    return mat
  }
  const glows: { sprite: THREE.Sprite; k: number }[] = []
  let lightsLevel = 0
  const glowDir = new THREE.Vector3(), glowPos = new THREE.Vector3(), glowCam = new THREE.Vector3()
  const glow = (p: THREE.Vector3, color: string, scale: number, k: number, facing?: THREE.Vector3) => {
    const m = new THREE.SpriteMaterial({ map: S.glow, color, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true })
    disposables.push(m)
    const sp = new THREE.Sprite(m)
    sp.position.copy(p)
    sp.scale.setScalar(scale)
    // a glow is a billboard: fade it out as its lamp turns away, or it shows as fuzz past the body's edge
    if (facing) {
      const f = facing.clone()
      sp.onBeforeRender = (_r, _s, camera) => {
        glowDir.copy(f).transformDirection(group.matrixWorld)
        sp.getWorldPosition(glowPos)
        glowCam.copy(camera.position).sub(glowPos).normalize()
        m.opacity = lightsLevel * k * THREE.MathUtils.clamp((glowDir.dot(glowCam) - 0.05) / 0.35, 0, 1)
      }
    }
    group.add(sp)
    glows.push({ sprite: sp, k })
  }
  const texMat = (t: THREE.Texture, metal: number) => {
    const m = new THREE.MeshStandardMaterial({ map: t, metalness: metal, roughness: 0.35, side: THREE.DoubleSide })
    disposables.push(m)
    return m
  }
  const mats: Record<Mat, THREE.Material> = {
    gloss: S.gloss,
    trim: S.trim,
    clad: cladMat,
    chrome: S.chrome,
    silver: S.silver,
    satin: S.satin,
    reflector: S.reflector,
    body: paint,
    glass: S.glass,
    drl: lightMat('#e2f6ff', 2.3),
    head: lightMat('#ffffff', 1.6),
    tail: lightMat('#ff1a2e', 2.4),
    amber: lightMat('#ffad33', 1.6),
    mesh: texMat(S.mesh, 0.5),
    hex: texMat(S.hex, 0.9),
    slats: texMat(S.slats, 0.4),
  }

  /** Rasterise a traced outline on a fine grid, snap edge vertices onto the outline, project onto the body. */
  const decal = (d: Decal, where: 'front' | 'rear' | 'left' | 'right' | 'ghLeft' | 'ghRight') => {
    if (opt.generic && d.mat !== 'trim' && d.mat !== 'silver' && d.mat !== 'satin') return
    const poly = d.poly
    const endOn = where === 'front' || where === 'rear'
    const step = hi ? d.step ?? 0.011 : 0.02
    const xs = poly.map((p) => p[0]), ys = poly.map((p) => p[1])
    const a0 = Math.min(...xs), a1 = Math.max(...xs), b0 = Math.min(...ys), b1 = Math.max(...ys)
    const sa = endOn ? step : step / L
    const na = Math.max(1, Math.ceil((a1 - a0) / sa)), nb = Math.max(1, Math.ceil((b1 - b0) / step))
    const da = (a1 - a0) / na, db = (b1 - b0) / nb
    // decals ride on the outermost skin: over the cladding where there is one
    const out = (spec.cladding ? 0.016 : 0.004) + (d.layer ?? 0) * 0.003
    const end: 1 | -1 = where === 'rear' ? -1 : 1
    const sideSign: 1 | -1 = where === 'left' || where === 'ghLeft' ? -1 : 1
    const onGlass = where === 'ghLeft' || where === 'ghRight'
    const project = (a: number, b: number) =>
      endOn ? endPoint(end, a, b) : onGlass ? new THREE.Vector3(xOf(a), b, sideSign * ghZ(xOf(a), b)) : sidePoint(a, b, sideSign)
    const cache = new Map<number, THREE.Vector3 | null>()
    const vert = (i: number, j: number) => {
      const key = i * 10007 + j
      if (cache.has(key)) return cache.get(key)!
      let p: [number, number] = [a0 + i * da, b0 + j * db]
      if (!corner[i * (nb + 1) + j]) p = nearestOnPoly(p, poly)
      const v = project(p[0], p[1])
      cache.set(key, v)
      return v
    }
    const pos: number[] = []
    const uv: number[] = []
    const uScale = endOn ? 1 : L
    // which grid corners lie inside the outline, worked out once per corner (each is shared by four cells)
    const corner = new Uint8Array((na + 1) * (nb + 1))
    for (let i = 0; i <= na; i++) for (let j = 0; j <= nb; j++) corner[i * (nb + 1) + j] = inside([a0 + i * da, b0 + j * db], poly) ? 1 : 0
    const inC = (ii: number, jj: number) => corner[ii * (nb + 1) + jj] === 1
    for (let i = 0; i < na; i++)
      for (let j = 0; j < nb; j++) {
        // edge cells count when their centre or any corner is inside: their outside corners snap onto the outline,
        // so the skin follows slanted and rounded edges instead of stepping along the grid
        if (!inC(i, j) && !inC(i + 1, j) && !inC(i + 1, j + 1) && !inC(i, j + 1) && !inside([a0 + (i + 0.5) * da, b0 + (j + 0.5) * db], poly)) continue
        const q = [vert(i, j), vert(i + 1, j), vert(i + 1, j + 1), vert(i, j + 1)]
        if (q.some((v) => !v)) continue
        const [p00, p10, p11, p01] = q as THREE.Vector3[]
        const tris: [THREE.Vector3, number, number][][] = [[[p00, i, j], [p10, i + 1, j], [p11, i + 1, j + 1]], [[p00, i, j], [p11, i + 1, j + 1], [p01, i, j + 1]]]
        for (const t of tris) {
          // snapped edge cells can leave three points on the outline: a zero-area sliver whose normal is noise,
          // which pushes its corner out sideways as a spike on a raked face
          if (spec.dropSlivers && t[1][0].clone().sub(t[0][0]).cross(t[2][0].clone().sub(t[0][0])).lengthSq() < 1e-14) continue
          for (const [p, ii, jj] of t) { pos.push(p.x, p.y, p.z); uv.push(((a0 + ii * da) * uScale) / 0.09, (b0 + jj * db) / 0.09) }
        }
      }
    if (!pos.length) return
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2))
    g.computeVertexNormals()
    // push the skin out along the surface normal so it sits on the paint, not in it
    const nrm = g.attributes.normal as THREE.BufferAttribute
    const P = g.attributes.position as THREE.BufferAttribute
    const outward = new THREE.Vector3(where === 'front' ? 1 : where === 'rear' ? -1 : 0, 0, endOn ? 0 : sideSign)
    const n = new THREE.Vector3()
    // average the facet normals over each shared grid vertex (oriented outward first), so every copy of a vertex
    // is pushed out by the same amount: per-facet offsets open cracks between grid rows that read as stripes
    {
      const sum = new Map<string, THREE.Vector3>()
      const keyOf = (k: number) => `${P.getX(k)},${P.getY(k)},${P.getZ(k)}`
      for (let k = 0; k < P.count; k++) {
        n.set(nrm.getX(k), nrm.getY(k), nrm.getZ(k))
        if (endOn && Math.abs(n.z) > 0.2) n.z = Math.sign(P.getZ(k)) * Math.abs(n.z)
        if (n.dot(outward) < 0 && !(endOn && Math.abs(n.z) > 0.6)) n.negate()
        const key = keyOf(k)
        const s = sum.get(key)
        if (s) s.add(n)
        else sum.set(key, n.clone())
      }
      for (let k = 0; k < P.count; k++) {
        const s = sum.get(keyOf(k))!
        if (s.lengthSq() > 1e-12) { n.copy(s).normalize(); nrm.setXYZ(k, n.x, n.y, n.z) }
      }
    }
    for (let k = 0; k < P.count; k++) {
      n.set(nrm.getX(k), nrm.getY(k), nrm.getZ(k))
      if (endOn && Math.abs(n.z) > 0.2) n.z = Math.sign(P.getZ(k)) * Math.abs(n.z)
      if (n.dot(outward) < 0 && !(endOn && Math.abs(n.z) > 0.6)) n.negate()
      P.setXYZ(k, P.getX(k) + n.x * out, P.getY(k) + n.y * out, P.getZ(k) + n.z * out)
    }
    // ── relief: lift the face along the surface normal and wall its outline, so lamps have lenses,
    // housings have rims and grilles have a lip that catches the light
    const relief = d.depth ?? RELIEF[d.mat] ?? 0
    if (relief > 0) {
      const e = endOn ? 0.004 : 0.004 / L
      const normalAt = (a: number, b: number) => {
        const p = project(a, b), pa = project(a + e, b), pb = project(a, b + e)
        if (!p || !pa || !pb) return null
        const nn = pa.clone().sub(p).cross(pb.clone().sub(p)).normalize()
        if (nn.dot(outward) < 0 && !(endOn && Math.abs(nn.z) > 0.6)) nn.negate()
        return { p, n: nn }
      }
      for (let k = 0; k < P.count; k++) {
        n.set(nrm.getX(k), nrm.getY(k), nrm.getZ(k))
        if (endOn && Math.abs(n.z) > 0.2) n.z = Math.sign(P.getZ(k)) * Math.abs(n.z)
        if (n.dot(outward) < 0 && !(endOn && Math.abs(n.z) > 0.6)) n.negate()
        P.setXYZ(k, P.getX(k) + n.x * relief, P.getY(k) + n.y * relief, P.getZ(k) + n.z * relief)
      }
      const wall: number[] = []
      const wstep = endOn ? 0.012 : 0.012 / L
      for (let k = 0; k < poly.length; k++) {
        const A = poly[k], B = poly[(k + 1) % poly.length]
        const len = Math.hypot((B[0] - A[0]) * (endOn ? 1 : L), B[1] - A[1])
        const m = Math.max(1, Math.ceil(len / 0.012))
        let prev: { b: THREE.Vector3; t: THREE.Vector3 } | null = null
        for (let t = 0; t <= m; t++) {
          const a = A[0] + ((B[0] - A[0]) * t) / m, b = A[1] + ((B[1] - A[1]) * t) / m
          const q = normalAt(a, b)
          if (!q) { prev = null; continue }
          const base = q.p.clone().addScaledVector(q.n, out), top = base.clone().addScaledVector(q.n, relief)
          if (prev) for (const v of [prev.b, base, top, prev.b, top, prev.t]) wall.push(v.x, v.y, v.z)
          prev = { b: base, t: top }
        }
      }
      void wstep
      if (wall.length) {
        const wg = new THREE.BufferGeometry()
        wg.setAttribute('position', new THREE.Float32BufferAttribute(wall, 3))
        wg.computeVertexNormals()
        // lamp lenses keep their own glow on the walls; everything else gets a gloss-black edge
        add(d.mat === 'head' || d.mat === 'drl' || d.mat === 'tail' || d.mat === 'amber' ? mats[d.mat] : d.mat === 'silver' || d.mat === 'satin' || d.mat === 'chrome' ? mats[d.mat] : S.gloss, wg)
      }
    }
    // shiny parts on the nose or tail (skid plates, chrome, gloss housings) reflect as one smooth panel:
    // the projection grid's small row-to-row tilts would otherwise show up as stripes in the reflection
    if (endOn && (d.mat === 'silver' || d.mat === 'satin' || d.mat === 'chrome' || d.mat === 'gloss')) {
      const N = g.attributes.normal as THREE.BufferAttribute
      for (let k = 0; k < N.count; k++) {
        n.set(N.getX(k), N.getY(k), N.getZ(k)).lerp(outward, 0.75).normalize()
        N.setXYZ(k, n.x, n.y, n.z)
      }
    }
    add(mats[d.mat], g)
    // solid slats across a slatted grille: raised gloss-black bars clipped to the grille's outline
    if (d.mat === 'slats' && !d.depth) {
      for (let y = b0 + 0.025; y < b1 - 0.012; y += 0.042) {
        let xa = Infinity, xb = -Infinity
        for (let a = a0; a <= a1; a += (a1 - a0) / 80) if (inside([a, y + 0.007], poly)) { xa = Math.min(xa, a); xb = Math.max(xb, a) }
        if (xb > xa) decal({ mat: 'gloss', poly: [[xa, y], [xb, y], [xb, y + 0.014], [xa, y + 0.014]], layer: (d.layer ?? 0) + 1, depth: 0.016 }, where)
      }
    }
    if (d.mat === 'drl' || d.mat === 'tail' || d.mat === 'head') {
      const color = d.mat === 'tail' ? '#ff3344' : '#cfefff'
      const midB = (b0 + b1) / 2
      const count = Math.max(1, Math.round((a1 - a0) / (endOn ? 0.3 : 0.3 / L)))
      for (let k = 0; k <= count; k++) {
        const a = a0 + ((a1 - a0) * k) / count
        if (!inside([a, midB], poly)) continue
        const p = project(a, midB)
        if (p) glow(p.add(outward.clone().multiplyScalar(0.03)), color, d.mat === 'head' ? 0.22 : 0.16, d.mat === 'tail' ? 0.55 : 0.42, outward)
      }
    }
  }
  const place = (list: Decal[] | undefined, where: 'front' | 'rear' | 'side') => {
    for (const d of list ?? []) {
      if (where === 'side') {
        decal(d, 'right')
        decal(d, 'left')
        continue
      }
      decal(d, where)
      if (d.mirror) decal({ ...d, poly: d.poly.map(([z, y]) => [-z, y] as [number, number]).reverse() }, where)
    }
  }
  place(spec.front, 'front')
  place(spec.rear, 'rear')
  place(spec.side, 'side')
  // raked pillars, traced as outlines from the belt to the roof edge so their edges stay clean
  for (const p of spec.pillars) {
    const yb = (u: number) => top(u) - 0.02
    const yt = (u: number) => ghTop(u) - 0.075
    const poly: [number, number][] = [
      [p.bottom[0], yb(p.bottom[0])],
      [p.bottom[1], yb(p.bottom[1])],
      [p.top[1], yt(p.top[1])],
      [p.top[0], yt(p.top[0])],
      ...(p.rearEdge ?? []).map(([u, f]) => [u, yb(u) + (yt(u) - yb(u)) * f] as [number, number]),
    ]
    for (const w of ['ghLeft', 'ghRight'] as const) decal({ mat: p.mat ?? (p.black ? 'gloss' : 'body'), poly, depth: p.mat ? 0 : undefined, layer: p.mat ? 3 : undefined, step: p.step }, w)
  }

  // number plates (India: white, green for EVs)
  const plateMat = new THREE.MeshStandardMaterial({ map: plateTexture(spec.plate, !!spec.ev), roughness: 0.5 })
  disposables.push(plateMat)
  for (const end of [1, -1] as const) {
    const y = end > 0 ? spec.plates.front : spec.plates.rear
    const p = endPoint(end, 0, y)
    if (!p) continue
    // stand the plate clear of the face across its whole height and width, not just at its centre
    for (const [dz, dy] of [[0, -0.055], [0, 0.055], [-0.25, 0], [0.25, 0], [-0.25, -0.055], [0.25, -0.055], [-0.25, 0.055], [0.25, 0.055]]) {
      const q = endPoint(end, dz, y + dy)
      if (q && (q.x - p.x) * end > 0) p.x = q.x
    }
    const g = new THREE.PlaneGeometry(0.5, 0.11)
    g.rotateY(end > 0 ? Math.PI / 2 : -Math.PI / 2)
    disposables.push(g)
    const m = new THREE.Mesh(g, plateMat)
    m.position.set(p.x + end * 0.048, y, 0)
    group.add(m)
  }

  // ── side details
  const tube = (pts: THREE.Vector3[], r: number, mat: THREE.Material) => {
    if (pts.length < 2) return
    add(mat, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, false, 'centripetal'), Math.max(8, pts.length * 3), r, hi ? 8 : 5, false))
  }
  {
    // door mirrors on a stalk at the base of the A-pillar
    const u = spec.mirrorU ?? gh.u1 - 0.04
    const x = xOf(u)
    const y = top(u) + 0.1
    const zBody = zAt(x, top(u) - 0.03)
    for (const side of [-1, 1]) {
      add(spec.mirrors === 'black' ? S.gloss : paint, new RoundedBoxGeometry(0.11, 0.095, 0.17, 2, 0.035), new THREE.Matrix4().makeTranslation(x - 0.01, y, side * (zBody + 0.085)))
      add(S.trim, new RoundedBoxGeometry(0.08, 0.04, 0.16, 2, 0.015), new THREE.Matrix4().makeTranslation(x + 0.01, y - 0.05, side * (zBody + 0.04)))
    }
  }
  for (const [ub, ut] of spec.doors) {
    for (const side of [-1, 1] as const) {
      const pts: THREE.Vector3[] = []
      for (let i = 0; i <= 8; i++) {
        const f = i / 8
        const u = ub + (ut - ub) * f
        const x = xOf(u)
        const y0 = Math.max(sill(u) + 0.04, archLine(x) + 0.02, cladTop ? Math.min(cladTop(u), top(u) - 0.05) + 0.01 : -1)
        const y = y0 + (top(u) - 0.02 - y0) * f
        pts.push(new THREE.Vector3(x, y, side * (zAt(x, y) + 0.0015)))
      }
      tube(pts, 0.0042, S.well)
    }
  }
  if (spec.windowChrome) {
    const us = Array.from({ length: 28 }, (_, i) => gh.u0 + 0.04 + ((gh.u1 - gh.u0 - 0.08) * i) / 27)
    for (const side of [-1, 1] as const) tube(us.map((u) => new THREE.Vector3(xOf(u), top(u) - 0.015, side * (zAt(xOf(u), top(u) - 0.015) + 0.004))), 0.007, S.chrome)
  }
  const roofY = (u: number) => ghTop(u)
  const roofHW = (u: number) => ((width(u) * W) / 2) * 0.955 * gh.tumble
  if (spec.rails) {
    const railMat = spec.rails === 'silver' ? S.silver : S.gloss
    const peak = Math.max(...spec.greenhouse.top.map((p) => p[1]))
    const flat = spec.greenhouse.top.filter((p) => p[1] > peak - 0.06).map((p) => p[0])
    const r0 = Math.min(...flat) + 0.01, r1 = Math.max(...flat) - 0.01
    const us = Array.from({ length: 18 }, (_, i) => r0 + ((r1 - r0) * i) / 17)
    for (const side of [-1, 1] as const) {
      tube(us.map((u) => new THREE.Vector3(xOf(u), roofY(u) + 0.028, side * (roofHW(u) - 0.09))), 0.013, railMat)
      for (const u of [us[0], us[us.length - 1]]) add(railMat, new THREE.BoxGeometry(0.09, 0.032, 0.036), new THREE.Matrix4().makeTranslation(xOf(u), roofY(u) + 0.014, side * (roofHW(u) - 0.09)))
    }
  }
  if (spec.spoiler) {
    // a lip at the back of the roof, over the tailgate glass
    let su = gh.u0
    let best = -1
    for (let u = gh.u0; u < spec.roof.u0 + 0.05; u += 0.002) if (ghTop(u) > best - 0.0005) { best = Math.max(best, ghTop(u)); su = u; if (ghTop(u) >= ghTop(spec.roof.u0) - 0.05) break }
    // a lip that kicks out and slightly down over the tailgate glass, with small fins at its ends
    const sp = typeof spec.spoiler === 'object' ? spec.spoiler : {}
    const sLen = sp.len ?? 0.2, sThick = sp.thick ?? 0.03
    const lip = new RoundedBoxGeometry(sLen, sThick, roofHW(su) * 1.92, 2, Math.min(0.012, sThick * 0.45))
    add(roofPaint, lip, new THREE.Matrix4().makeRotationZ(sp.tilt ?? 0.1).premultiply(new THREE.Matrix4().makeTranslation(xOf(su) - sLen * 0.35, roofY(su) - 0.004, 0)))
    for (const side of [-1, 1]) add(roofPaint, new RoundedBoxGeometry(0.16, 0.05, 0.03, 2, 0.01), new THREE.Matrix4().makeTranslation(xOf(su) - 0.06, roofY(su) - 0.03, side * (roofHW(su) * 0.96 - 0.015)))
  }
  if (spec.sunroof) {
    const [a, b] = spec.sunroof
    add(S.glass, new RoundedBoxGeometry((b - a) * L, 0.012, roofHW((a + b) / 2) * 1.3, 2, 0.005), new THREE.Matrix4().makeTranslation(xOf((a + b) / 2), roofY((a + b) / 2) + 0.004, 0))
  }

  // ── wheels
  const wheels: THREE.Group[] = []
  const tyreG = tyreGeometry(spec.tyreR, spec.tyreW, spec.rim, hi ? 44 : 24)
  const rimG = rimGeometry(spec, hi)
  disposables.push(tyreG, ...rimG.map((r) => r.g))
  // At speed a camera never sees spokes, it sees their average; this disc fades in as the wheels turn faster,
  // so a moving rim smears instead of strobing.
  const blurTex = rimBlurTexture(spec)
  const blurMat = new THREE.MeshStandardMaterial({ map: blurTex, metalness: 0.7, roughness: 0.38, transparent: true, opacity: 0, depthWrite: false })
  const blurG = new THREE.CircleGeometry(spec.tyreR * spec.rim * 0.96, hi ? 40 : 24)
  blurG.translate(0, 0, spec.tyreW / 2 - 0.012 + 0.004)
  disposables.push(blurTex, blurMat, blurG)
  let blur = 0
  for (const ax of axles) {
    add(S.well, new THREE.BoxGeometry(archR * 2, archR, W - 0.5), new THREE.Matrix4().makeTranslation(ax, archY + archR * 0.45, 0))
    // black end walls just inside the arch, out to the skin, over the body's own paint-coloured wall at the arch edge
    if (spec.wellInset) for (const s of [-1, 1]) add(S.well, new THREE.BoxGeometry(0.006, archR * 1.1, W * 0.96), new THREE.Matrix4().makeTranslation(ax + s * (archR - spec.wellInset), archY + archR * 0.4, 0))
    for (const side of [-1, 1]) {
      const w = new THREE.Group()
      w.add(new THREE.Mesh(tyreG, S.tyre))
      for (const r of rimG) w.add(new THREE.Mesh(r.g, r.mat === 'face' ? (spec.rimTone === 'dark' ? S.rimGun : S.rimFace) : r.mat === 'edge' ? S.rimFace : r.mat === 'dark' ? S.rimDark : S.brake))
      const bd = new THREE.Mesh(blurG, blurMat)
      bd.visible = false
      w.add(bd)
      if (side < 0) w.rotation.y = Math.PI
      w.position.set(ax, spec.tyreR, side * (W / 2 - spec.tyreW / 2 - 0.03))
      group.add(w)
      wheels.push(w)
    }
  }

  // spare wheel on the tailgate (not spun, not swept with the body)
  let spareG: THREE.Group | null = null
  if (spec.spare) {
    spareG = new THREE.Group()
    spareG.add(new THREE.Mesh(tyreG, S.tyre))
    for (const r of rimG) spareG.add(new THREE.Mesh(r.g, r.mat === 'face' ? (spec.rimTone === 'dark' ? S.rimGun : S.rimFace) : r.mat === 'edge' ? S.rimFace : r.mat === 'dark' ? S.rimDark : S.brake))
    spareG.rotation.y = -Math.PI / 2
    spareG.position.set(xOf(0) + spec.tyreW / 2, spec.spare.y, 0)
    group.add(spareG)
  }

  // contact shadow
  let shadowMesh: THREE.Mesh | null = null
  {
    const m = new THREE.MeshBasicMaterial({ map: S.shadow, transparent: true, depthWrite: false, opacity: 0.95 })
    const p = new THREE.PlaneGeometry(L * 1.25, W * 1.45)
    p.rotateX(-Math.PI / 2)
    disposables.push(m, p)
    shadowMesh = new THREE.Mesh(p, m)
    shadowMesh.name = 'contact-shadow'
    shadowMesh.position.y = 0.004
    shadowMesh.renderOrder = -1
    group.add(shadowMesh)
  }

  // merge static parts by material
  for (const [mat, list] of parts) {
    const geos = list.map((g) => {
      const n = g.index ? g.toNonIndexed() : g
      for (const k of Object.keys(n.attributes)) if (k !== 'position' && k !== 'normal' && k !== 'uv') n.deleteAttribute(k)
      if (!n.attributes.uv) n.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(n.attributes.position.count * 2), 2))
      if (!n.attributes.normal) n.computeVertexNormals()
      return n
    })
    const merged = mergeGeometries(geos, false)
    list.forEach((g) => g.dispose())
    geos.forEach((g) => g.dispose())
    if (!merged) continue
    disposables.push(merged)
    group.add(new THREE.Mesh(merged, mat))
  }

  // Plan-view curvature: real fascias curve back across their whole width, not just at the corners.
  // Sweep the nose and tail back by the square of the distance from the centre line — after everything is
  // built, so lamps, grilles and plates follow the body.
  {
    const zone = 0.55
    const nose = spec.noseSweep ?? 0.14
    const tail = spec.tailSweep ?? 0.09
    const beltFront = top(spec.greenhouse.u1)
    const beltRear = top(spec.greenhouse.u0)
    const smooth = (a: number, b: number, x: number) => {
      const t = Math.max(0, Math.min(1, (x - a) / (b - a)))
      return t * t * (3 - 2 * t)
    }
    const bend = (g: THREE.BufferGeometry, mx = 0) => {
      const P = g.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < P.count; i++) {
        const x = P.getX(i) + mx
        const zf = Math.min(1.15, (P.getZ(i) / (W / 2)) ** 2)
        // only the bumpers and fascia curve; the glasshouse above the belt stays as traced
        const y = P.getY(i)
        const keep = 1 - smooth(beltFront - 0.12, beltFront + 0.05, y)
        const keepR = 1 - smooth(beltRear - 0.12, beltRear + 0.05, y)
        const f = smooth(L / 2 - zone, L / 2, x) * nose * keep - smooth(-L / 2 + zone, -L / 2, x) * tail * keepR
        if (f) P.setX(i, P.getX(i) - f * zf)
      }
      P.needsUpdate = true
      g.computeVertexNormals()
    }
    group.traverse((o) => {
      const m = o as THREE.Mesh
      if (m.isMesh && !wheels.some((w) => w === m.parent) && m.parent !== spareG && m.geometry && m !== shadowMesh) bend(m.geometry, m.position.x)
      if ((o as THREE.Sprite).isSprite) {
        const zf = Math.min(1.15, (o.position.z / (W / 2)) ** 2)
        o.position.x -= (smooth(L / 2 - zone, L / 2, o.position.x) * nose - smooth(-L / 2 + zone, -L / 2, o.position.x) * tail) * zf
      }
    })
  }

  if (opt.size?.length && opt.size.width && opt.size.height) group.scale.set(opt.size.length / 1000 / L, opt.size.height / 1000 / spec.H, opt.size.width / 1000 / W)

  return {
    group,
    paint,
    roof: roofPaint,
    spec,
    setLights(v) {
      lightsLevel = v
      for (const l of lightMats) l.mat.color.copy(l.base).multiplyScalar(0.06 + v * l.k)
      for (const g of glows) (g.sprite.material as THREE.SpriteMaterial).opacity = v * g.k
    },
    spin(dx) {
      const a = dx / spec.tyreR
      for (const w of wheels) w.rotation.z += (w.rotation.y ? 1 : -1) * a
      // blur by angle per frame: spokes read sharply below ~0.22 rad a frame and strobe above ~0.45
      const t = Math.max(0, Math.min(1, (Math.abs(a) - 0.22) / 0.23))
      blur += (t * t * (3 - 2 * t) - blur) * 0.15
      blurMat.opacity = blur * 0.92
      for (const w of wheels) w.children[w.children.length - 1].visible = blur > 0.01
    },
    dispose() {
      disposables.forEach((d) => d.dispose())
    },
  }
}

// ── wheels

function tyreGeometry(R: number, w: number, rim: number, seg: number) {
  const r0 = R * rim
  const s = 0.035
  const prof = [
    [r0, -w / 2 + 0.01], [R - s, -w / 2], [R - s * 0.3, -w / 2 + s * 0.4], [R, -w / 2 + s],
    [R, w / 2 - s], [R - s * 0.3, w / 2 - s * 0.4], [R - s, w / 2], [r0, w / 2 - 0.01],
  ].map(([x, y]) => new THREE.Vector2(x, y))
  const g = new THREE.LatheGeometry(prof, seg)
  g.rotateX(Math.PI / 2)
  return g
}

/** The rim as a fast camera sees it: the spoke pattern averaged round one spoke's turn, plus faint smear rings. */
function rimBlurTexture(spec: CarSpec) {
  const N = 256
  const k = N / 2 / 0.98 // pixels per rim radius
  const src = document.createElement('canvas')
  src.width = src.height = N
  const g = src.getContext('2d')!
  g.translate(N / 2, N / 2)
  g.fillStyle = '#3a4147'
  g.beginPath()
  g.arc(0, 0, N / 2, 0, Math.PI * 2)
  g.fill()
  g.fillStyle = '#d7dee4'
  const n = spec.wheel.spokes
  const len = 0.78
  const bar = (a: number, w: number, l: number, off = 0) => {
    g.save()
    g.rotate(a)
    g.fillRect((off - w / 2) * k, -(0.18 + l) * k, w * k, l * k)
    g.restore()
  }
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2
    switch (spec.wheel.style) {
      case 'twin':
        bar(a - 0.09, 0.085, len)
        bar(a + 0.09, 0.085, len)
        break
      case 'turbine':
        bar(a, 0.32, len)
        break
      case 'split':
        bar(a - 0.05, 0.1, len)
        bar(a + 0.05, 0.1, len)
        break
      case 'swirl':
        bar(a - 0.1, 0.16, len)
        bar(a + 0.17, 0.08, len)
        break
      case 'aero':
        bar(a, 0.36, len)
        break
      case 'petal':
        for (const d of [-0.33, -0.11, 0.11, 0.33]) bar(a + d, 0.3, len)
        break
      case 'blade':
        bar(a, 0.14, len * 0.98, 0.02)
        bar(a, 0.14, len * 0.98, 0.2)
        g.save()
        g.rotate(a)
        g.beginPath()
        g.moveTo(0.14 * k - 0.17 * k, -0.9 * k)
        g.lineTo(0.14 * k + 0.17 * k, -0.9 * k)
        g.lineTo(0.14 * k, -0.7 * k)
        g.fill()
        g.restore()
        break
      default:
        bar(a, 0.065, len)
    }
  }
  g.beginPath()
  g.arc(0, 0, 0.18 * k, 0, Math.PI * 2)
  g.fill()

  // average over one spoke period: drawing copy j at alpha 1/(j+1) leaves the exact mean
  const c = document.createElement('canvas')
  c.width = c.height = N
  const o = c.getContext('2d')!
  const steps = 32
  for (let j = 0; j < steps; j++) {
    o.save()
    o.globalAlpha = 1 / (j + 1)
    o.translate(N / 2, N / 2)
    o.rotate(((j / steps) * Math.PI * 2) / n)
    o.drawImage(src, -N / 2, -N / 2)
    o.restore()
  }
  // a few thin concentric smears, the way machined faces streak in a photo
  o.translate(N / 2, N / 2)
  for (let j = 0; j < 14; j++) {
    o.strokeStyle = Math.random() < 0.5 ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'
    o.lineWidth = 1 + Math.random() * 2
    o.beginPath()
    o.arc(0, 0, (0.22 + Math.random() * 0.74) * k, 0, Math.PI * 2)
    o.stroke()
  }
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function rimGeometry(spec: CarSpec, hi: boolean) {
  const R = spec.tyreR * spec.rim
  const face = spec.tyreW / 2 - 0.012
  const out: { g: THREE.BufferGeometry; mat: 'face' | 'dark' | 'brake' | 'edge' }[] = []
  const cyl = (r: number, d: number, z: number, n: number) => {
    const g = new THREE.CylinderGeometry(r, r, d, n)
    g.rotateX(Math.PI / 2)
    g.translate(0, 0, z)
    return g
  }
  out.push({ g: cyl(R * 0.98, 0.03, face - 0.03, hi ? 40 : 22), mat: 'dark' })
  out.push({ g: cyl(R * 0.72, 0.03, face - 0.07, 24), mat: 'brake' })
  const lip = new THREE.TorusGeometry(R * 0.97, 0.011, 6, hi ? 48 : 24)
  lip.translate(0, 0, face)
  out.push({ g: lip, mat: 'face' })
  out.push({ g: cyl(R * 0.18, 0.04, face - 0.004, 20), mat: 'face' })
  const spokes: THREE.BufferGeometry[] = []
  const edges: THREE.BufferGeometry[] = []
  const n = spec.wheel.spokes
  const blade = (angle: number, w: number, len: number, z: number, sweep = 0, off = 0, into = spokes) => {
    const b = new THREE.BoxGeometry(w, len, 0.022, 1, 6, 1)
    b.translate(off, R * 0.18 + len / 2, z)
    if (sweep) {
      // bend the blade round as it goes out, like a turbine
      const pos = b.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i), y = pos.getY(i)
        const a = sweep * ((y - R * 0.18) / len)
        pos.setXY(i, x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a))
      }
    }
    b.rotateZ(angle)
    into.push(b)
  }
  const len = R * 0.78
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2
    switch (spec.wheel.style) {
      case 'twin':
        blade(a - 0.09, R * 0.085, len, face - 0.008)
        blade(a + 0.09, R * 0.085, len, face - 0.008)
        break
      case 'turbine':
        blade(a, R * 0.32, len, face - 0.008, 0.6)
        break
      case 'blade': {
        // off-centre spokes, two machined faces split by a dark groove, a wedge where each meets the rim
        blade(a, R * 0.14, len * 0.98, face - 0.006, 0.06, R * 0.02)
        blade(a, R * 0.14, len * 0.98, face - 0.006, 0.06, R * 0.2)
        const t = new THREE.CylinderGeometry(R * 0.2, R * 0.2, 0.02, 3)
        t.rotateX(Math.PI / 2)
        t.rotateZ(Math.PI)
        t.translate(R * 0.14, R * 0.8, face - 0.008)
        t.rotateZ(a + 0.08)
        spokes.push(t)
        break
      }
      case 'split':
        // a pair of arms forking towards the rim, each with a machined silver outer edge
        blade(a - 0.05, R * 0.1, len, face - 0.008, -0.22)
        blade(a + 0.05, R * 0.1, len, face - 0.008, 0.22)
        blade(a - 0.1, R * 0.022, len, face - 0.002, -0.22, 0, edges)
        blade(a + 0.1, R * 0.022, len, face - 0.002, 0.22, 0, edges)
        break
      case 'aero':
        blade(a, R * 0.36, len, face - 0.006, 0.25)
        break
      case 'petal':
        // a near-solid silver face: wide petals of overlapping swept blades, leaving narrow slots between them
        for (const d of [-0.33, -0.11, 0.11, 0.33]) blade(a + d, R * 0.3, len, face - 0.006, 0.2)
        break
      case 'swirl':
        // a wide machined-silver blade and a slim one in the rim's own tone, both curling the same way, with
        // dark pockets between (with rimTone 'dark' the rim reads two-tone: silver faces on gunmetal)
        blade(a - 0.1, R * 0.15, len, face - 0.004, 0.38, 0, edges)
        blade(a + 0.17, R * 0.08, len, face - 0.008, 0.38)
        break
      default:
        blade(a, R * 0.065, len, face - 0.008)
    }
  }
  const merged = mergeGeometries(spokes.map((s) => s.toNonIndexed()), false)
  spokes.forEach((s) => s.dispose())
  if (merged) out.push({ g: merged, mat: 'face' })
  if (edges.length) {
    const me = mergeGeometries(edges.map((s) => s.toNonIndexed()), false)
    edges.forEach((s) => s.dispose())
    if (me) out.push({ g: me, mat: 'edge' })
  }
  return out
}
