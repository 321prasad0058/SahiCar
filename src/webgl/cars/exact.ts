// Exact models traced from studio side, front and rear views of the current model, scaled to the official
// length and wheelbase (overhangs split in the photo's proportion). Heights in metres; u runs 0 (tail) … 1 (nose);
// front/rear decal x is across the width (−1 … 1). Each car is checked side by side against its photos.
import type { CarSpec } from './build'

/** Tata Nexon (2023 facelift). 3995 × 1804 × 1620, wheelbase 2498, 215/60 R16. */
export const NEXON: CarSpec = {
  id: 'tata-nexon',
  name: 'Tata Nexon',
  L: 3.995, W: 1.804, H: 1.62,
  axles: [0.1454,0.824],
  tyreR: 0.345, tyreW: 0.215, rim: 0.61, wheel: { style: 'twin', spokes: 5 },
  archGap: 0.07, archSquare: 0.3,
  sill: [[0,0.44],[0.0086,0.41],[0.0601,0.39],[0.146,0.38],[0.287,0.37],[0.6886,0.37],[0.8188,0.37],[0.9314,0.35],[0.9786,0.34],[1,0.42]],
  // bonnet, belt and tailgate line: the bonnet rises from the light bar to the screen; the belt climbs to the tail
  top: [[0,0.92],[0.006,1.1],[0.0172,1.17],[0.0258,1.2],[0.0601,1.2],[0.2046,1.18],[0.3532,1.13],[0.4281,1.125],[0.6951,1.086],[0.7482,1.08],[0.8284,1.07],[0.9485,1.047],[0.9871,0.95],[1,0.81]],
  width: [[0, 0.84], [0.01, 0.9], [0.03, 0.95], [0.07, 0.985], [0.12, 0.997], [0.5, 1], [0.88, 0.997], [0.93, 0.985], [0.97, 0.95], [0.99, 0.9], [1, 0.84]],
  crown: 0.02,
  bulge: 0.01,
  // the strong shoulder crease that rises towards the tail
  shoulder: { y: [[0, 1.02], [0.5, 0.97], [1, 0.92]], inset: 0.05 },
  noseSweep: 0.16,
  tailSweep: 0.1,
  greenhouse: {
    u0: 0.0258, u1: 0.748, tumble: 0.72,
    // the spoiler ends well ahead of the tail and the tailgate glass drops steeply to the lamps
    top: [[0.0258,1.2],[0.0386,1.3],[0.0601,1.43],[0.073,1.47],[0.103,1.515],[0.2111,1.56],[0.3521,1.565],[0.4672,1.55],[0.5453,1.5],[0.6126,1.36],[0.6777,1.225],[0.748,1.08]],
  },
  roof: { u0: 0.1677, u1: 0.5366, black: false },
  pillars: [
    // behind the rear door glass: a black wedge, then the big body-coloured C-pillar running back to the spoiler
    { bottom: [0.0258,0.1622], top: [0.0644,0.1839], black: false },
    { bottom: [0.1622,0.2046], top: [0.1839,0.2165], black: true },
    { bottom: [0.4205,0.4324], top: [0.4238,0.4357], black: true },
    { bottom: [0.7374,0.7504], top: [0.5366,0.5529], black: true },
  ],
  cladding: { top: [[0,0.5],[0.0172,0.47],[0.0858,0.42],[0.287,0.385],[0.6994,0.385],[0.8799,0.45],[0.9743,0.55],[1,0.56]], flare: 0.12 },
  doors: [[0.1622,0.1677],[0.4281,0.4259],[0.6951,0.6972]],
  front: [
    // the full-width black band under the bonnet with the slim LED light bar
    { mat: 'gloss', poly: [[-0.88, 0.81], [0.88, 0.81], [0.9, 0.93], [-0.9, 0.93]] },
    { mat: 'drl', poly: [[-0.88, 0.9], [0.88, 0.9], [0.9, 0.92], [-0.9, 0.92]], layer: 1 },
    // headlamps low in the bumper corners
    { mat: 'gloss', mirror: true, poly: [[0.77, 0.63], [0.93, 0.63], [0.93, 0.745], [0.79, 0.745]] },
    { mat: 'head', mirror: true, poly: [[0.8, 0.65], [0.91, 0.65], [0.91, 0.72], [0.81, 0.72]], layer: 1 },
    // the big black lower bumper, rising in the middle, with the grille mesh and the silver corner fangs
    { mat: 'trim', poly: [[-0.9, 0.2], [0.9, 0.2], [0.9, 0.62], [0.7, 0.62], [0.4, 0.66], [-0.4, 0.66], [-0.7, 0.62], [-0.9, 0.62]] },
    { mat: 'mesh', poly: [[-0.6, 0.2], [0.6, 0.2], [0.6, 0.41], [-0.6, 0.41]], layer: 1 },
    { mat: 'silver', mirror: true, poly: [[0.62, 0.548], [0.905, 0.548], [0.79, 0.32]], layer: 1 },
  ],
  rear: [
    // the connected light bar across the tailgate, tail lamps wrapping the corners, black lower bumper
    { mat: 'gloss', poly: [[-0.9, 1.12], [0.9, 1.12], [0.9, 1.18], [-0.9, 1.18]] },
    { mat: 'tail', poly: [[-0.88, 1.14], [0.88, 1.14], [0.88, 1.16], [-0.88, 1.16]], layer: 1 },
    { mat: 'tail', mirror: true, poly: [[0.72, 1.0], [0.9, 1.0], [0.9, 1.14], [0.76, 1.14]], layer: 1 },
    { mat: 'trim', poly: [[-0.9, 0.38], [0.9, 0.38], [0.9, 0.6], [-0.9, 0.6]] },
    { mat: 'silver', poly: [[-0.55, 0.4], [0.55, 0.4], [0.5, 0.47], [-0.5, 0.47]], layer: 1 },
  ],
  side: [
    // the black insert on the lower doors, and the door handles
    { mat: 'trim', poly: [[0.6831,0.42],[0.6777,0.49],[0.6451,0.54],[0.5041,0.565],[0.3413,0.58],[0.3033,0.56],[0.3033,0.45],[0.3196,0.41]] },
    { mat: 'gloss', poly: [[0.4498,0.92],[0.5095,0.92],[0.5095,0.955],[0.4498,0.955]] },
    { mat: 'gloss', poly: [[0.1861,0.92],[0.2436,0.92],[0.2436,0.955],[0.1861,0.955]] },
  ],
  plates: { front: 0.5, rear: 0.55 },
  rails: 'black',
  spoiler: true,
  mirrors: 'black',
  paint: '#5b5f63', // Daytona Grey
  plate: 'MH 12 NX 2026',
}

export const EXACT: CarSpec[] = [NEXON]
