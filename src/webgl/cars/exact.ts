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


/** Tata Punch (2026 facelift). 3876 × 1742 × 1615, wheelbase 2445, 195/60 R16.
 *  Side profile measured with scripts/trace/extract-side.cjs from a levelled side photo (height came out 1.602 vs
 *  1.615 official); axles set to the official wheelbase with the overhangs split as in the photo (0.432 : 0.568).
 *  Lamps and lower grille from Tata's reveal images (front three-quarter, straight rear). */
export const PUNCH: CarSpec = {
  id: 'tata-punch',
  name: 'Tata Punch',
  L: 3.876, W: 1.742, H: 1.615,
  axles: [0.1596, 0.7904],
  tyreR: 0.32, tyreW: 0.195, rim: 0.635, wheel: { style: 'twin', spokes: 5 },
  archGap: 0.055, archSquare: 0.35,
  sill: [[0, 0.47], [0.02, 0.31], [0.05, 0.265], [0.1, 0.24], [0.26, 0.215], [0.5, 0.222], [0.7, 0.222], [0.86, 0.205], [0.92, 0.226], [0.96, 0.254], [0.985, 0.3], [1, 0.52]],
  // tailgate below the glass, the belt rising gently towards the rear with the body-coloured kick at the C-pillar,
  // then the cowl and the bonnet falling to the nose
  top: [[0, 1.0], [0.008, 1.05], [0.02, 1.07], [0.06, 1.062], [0.1, 1.05], [0.14, 1.05], [0.165, 1.12], [0.2, 1.13], [0.3, 1.117], [0.4, 1.101], [0.5, 1.084], [0.6, 1.068], [0.69, 1.07], [0.715, 1.13], [0.74, 1.128], [0.8, 1.098], [0.84, 1.083], [0.88, 1.06], [0.92, 1.018], [0.96, 0.951], [0.98, 0.845], [0.993, 0.72], [1, 0.62]],
  width: [[0, 0.86], [0.01, 0.92], [0.03, 0.96], [0.07, 0.985], [0.12, 0.997], [0.5, 1], [0.88, 0.995], [0.93, 0.98], [0.97, 0.94], [0.99, 0.89], [1, 0.84]],
  crown: 0.02,
  bulge: 0.012,
  noseSweep: 0.15,
  tailSweep: 0.09,
  greenhouse: {
    u0: 0.02, u1: 0.715, tumble: 0.76,
    // the tailgate glass rises steeply to the roof spoiler; the roof stays flat over both rows, then the screen falls
    top: [[0.02, 1.07], [0.03, 1.13], [0.06, 1.21], [0.085, 1.33], [0.1, 1.45], [0.13, 1.48], [0.16, 1.51], [0.2, 1.555], [0.3, 1.565], [0.4, 1.57], [0.48, 1.565], [0.52, 1.545], [0.56, 1.495], [0.6, 1.42], [0.64, 1.335], [0.68, 1.24], [0.715, 1.13]],
  },
  roof: { u0: 0.12, u1: 0.53, black: true },
  pillars: [
    // blacked-out pillars all round; the wide C-pillar carries the rear door handle
    { bottom: [0.02, 0.06], top: [0.09, 0.125], black: true },
    { bottom: [0.15, 0.205], top: [0.15, 0.19], black: true },
    { bottom: [0.425, 0.44], top: [0.425, 0.44], black: true },
    { bottom: [0.7, 0.715], top: [0.52, 0.535], black: true },
  ],
  cladding: { top: [[0, 0.6], [0.04, 0.6], [0.08, 0.75], [0.13, 0.775], [0.2, 0.745], [0.25, 0.55], [0.35, 0.58], [0.5, 0.55], [0.65, 0.49], [0.7, 0.63], [0.74, 0.78], [0.8, 0.795], [0.86, 0.76], [0.9, 0.6], [0.93, 0.55], [0.95, 0.74], [1, 0.74]], flare: 0.13 },
  doors: [[0.205, 0.205], [0.432, 0.432], [0.7, 0.69]],
  front: [
    // gloss-black band under the bonnet edge; the LED light bar runs from the centre badge out to each corner
    { mat: 'gloss', poly: [[-0.87, 0.875], [0.87, 0.875], [0.85, 0.945], [-0.85, 0.945]] },
    { mat: 'drl', mirror: true, poly: [[0.12, 0.918], [0.85, 0.918], [0.84, 0.934], [0.12, 0.934]], layer: 1 },
    // square LED headlamps in black pods at the top corners of the bumper, small fog lamps below
    { mat: 'gloss', mirror: true, poly: [[0.6, 0.6], [0.88, 0.6], [0.88, 0.815], [0.64, 0.815]] },
    { mat: 'head', mirror: true, poly: [[0.67, 0.71], [0.83, 0.71], [0.83, 0.785], [0.69, 0.785]], layer: 1 },
    { mat: 'head', mirror: true, poly: [[0.7, 0.63], [0.8, 0.63], [0.8, 0.665], [0.7, 0.665]], layer: 1 },
    // the black lower bumper with horizontal grille slats
    { mat: 'trim', poly: [[-0.88, 0.22], [0.88, 0.22], [0.88, 0.6], [0.6, 0.62], [-0.6, 0.62], [-0.88, 0.6]] },
    { mat: 'slats', poly: [[-0.5, 0.36], [0.5, 0.36], [0.5, 0.55], [-0.5, 0.55]], layer: 1 },
    // the bold silver skid plate: a U under the grille, wrapping up both corners
    { mat: 'silver', layer: 1, poly: [[-0.62, 0.225], [0.62, 0.225], [0.8, 0.29], [0.86, 0.5], [0.76, 0.52], [0.68, 0.34], [-0.68, 0.34], [-0.76, 0.52], [-0.86, 0.5], [-0.8, 0.29]] },
  ],
  rear: [
    // wedge-shaped black lamp clusters at the corners, joined by the light bar across the tailgate under the glass
    { mat: 'gloss', poly: [[-0.86, 1.015], [0.86, 1.015], [0.86, 1.055], [-0.86, 1.055]] },
    { mat: 'tail', poly: [[-0.84, 1.03], [0.84, 1.03], [0.84, 1.042], [-0.84, 1.042]], layer: 1 },
    { mat: 'gloss', mirror: true, poly: [[0.68, 0.95], [0.92, 0.95], [0.92, 1.1], [0.74, 1.09]] },
    { mat: 'tail', mirror: true, poly: [[0.72, 1.0], [0.9, 1.0], [0.9, 1.06], [0.74, 1.06]], layer: 1 },
    { mat: 'tail', mirror: true, poly: [[0.74, 0.97], [0.88, 0.97], [0.88, 0.985], [0.74, 0.985]], layer: 1 },
    // black lower bumper with a silver skid strip and small reflectors
    { mat: 'trim', poly: [[-0.9, 0.3], [0.9, 0.3], [0.9, 0.56], [-0.9, 0.56]] },
    { mat: 'silver', poly: [[-0.6, 0.32], [0.6, 0.32], [0.55, 0.4], [-0.55, 0.4]], layer: 1 },
    { mat: 'tail', mirror: true, poly: [[0.74, 0.5], [0.86, 0.5], [0.86, 0.52], [0.74, 0.52]], layer: 1 },
  ],
  side: [
    // front door handle; the rear one hides in the C-pillar
    { mat: 'gloss', poly: [[0.545, 0.95], [0.6, 0.95], [0.6, 0.98], [0.545, 0.98]] },
  ],
  plates: { front: 0.5, rear: 0.62 },
  rails: 'black',
  spoiler: true,
  sunroof: [0.3, 0.42],
  mirrors: 'black',
  rimTone: 'dark',
  paint: '#a8661f', // the copper-gold of the reference photos (it reads lighter under the studio lights)
  plate: 'MH 12 PN 2026',
}

export const EXACT: CarSpec[] = [NEXON, PUNCH]
