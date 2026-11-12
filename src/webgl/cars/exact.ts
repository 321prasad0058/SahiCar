// Exact models traced from studio side, front and rear views of the current model, scaled to the official
// length and wheelbase (overhangs split in the photo's proportion). Heights in metres; u runs 0 (tail) … 1 (nose);
// front/rear decal x is across the width (−1 … 1). Each car is checked side by side against its photos.
import type { CarSpec, Decal } from './build'

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
  tyreR: 0.32, tyreW: 0.195, rim: 0.635, wheel: { style: 'split', spokes: 5 },
  archGap: 0.055, archSquare: 0.6,
  sill: [[0, 0.47], [0.02, 0.31], [0.05, 0.265], [0.1, 0.24], [0.26, 0.215], [0.5, 0.222], [0.7, 0.222], [0.86, 0.205], [0.92, 0.226], [0.96, 0.254], [0.985, 0.3], [1, 0.52]],
  // tailgate below the glass, the belt rising gently towards the rear with the body-coloured kick at the C-pillar,
  // then the cowl and the bonnet falling to the nose
  top: [[0, 1.0], [0.008, 1.05], [0.02, 1.07], [0.06, 1.062], [0.1, 1.05], [0.14, 1.05], [0.165, 1.12], [0.2, 1.13], [0.3, 1.117], [0.4, 1.101], [0.5, 1.084], [0.6, 1.068], [0.69, 1.07], [0.715, 1.13], [0.74, 1.128], [0.8, 1.098], [0.84, 1.083], [0.88, 1.06], [0.92, 1.018], [0.96, 0.951], [0.98, 0.845], [0.993, 0.72], [1, 0.62]],
  // rounded corners in plan: the nose and tail taper hard over their last few centimetres
  width: [[0, 0.8], [0.008, 0.88], [0.025, 0.94], [0.06, 0.975], [0.12, 0.995], [0.5, 1], [0.88, 0.993], [0.93, 0.975], [0.965, 0.93], [0.985, 0.86], [1, 0.76]],
  crown: 0.02,
  bulge: 0.012,
  // the character line from the headlamp, rising over the doors to the tail lamp
  shoulder: { y: [[0, 1.0], [0.5, 0.955], [0.9, 0.9], [1, 0.86]], inset: 0.03 },
  haunch: 0.03,
  bonnetRidge: 0.012,
  noseSweep: 0.2,
  tailSweep: 0.12,
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
    { mat: 'gloss', poly: [[-0.8, 0.875], [0.8, 0.875], [0.78, 0.945], [-0.78, 0.945]] },
    { mat: 'drl', mirror: true, poly: [[0.12, 0.918], [0.77, 0.918], [0.76, 0.934], [0.12, 0.934]], layer: 1 },
    // square LED headlamps in black pods at the top corners of the bumper, small fog lamps below
    { mat: 'gloss', mirror: true, poly: [[0.56, 0.6], [0.78, 0.6], [0.78, 0.815], [0.6, 0.815]] },
    { mat: 'head', mirror: true, poly: [[0.62, 0.71], [0.75, 0.71], [0.75, 0.785], [0.64, 0.785]], layer: 1 },
    { mat: 'head', mirror: true, poly: [[0.64, 0.63], [0.73, 0.63], [0.73, 0.665], [0.64, 0.665]], layer: 1 },
    // the black lower bumper with horizontal grille slats
    { mat: 'trim', poly: [[-0.8, 0.22], [0.8, 0.22], [0.8, 0.6], [0.56, 0.62], [-0.56, 0.62], [-0.8, 0.6]] },
    { mat: 'slats', poly: [[-0.5, 0.36], [0.5, 0.36], [0.5, 0.55], [-0.5, 0.55]], layer: 1 },
    // the bold silver skid plate: a U under the grille, wrapping up both corners
    { mat: 'silver', layer: 1, poly: [[-0.56, 0.225], [0.56, 0.225], [0.68, 0.28], [0.73, 0.47], [0.66, 0.49], [0.6, 0.34], [-0.6, 0.34], [-0.66, 0.49], [-0.73, 0.47], [-0.68, 0.28]] },
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

/** Hyundai Creta (2024 facelift). 4330 × 1790 × 1635, wheelbase 2610, 215/60 R17.
 *  Side profile from a levelled side photo (height 1.609 vs 1.635 official, wheelbase 2.613); the belt, window line and
 *  pillars were read off the photo on a pixel grid (the dark green paint fools the paint-run belt finder).
 *  Lamps, grille and skid plates from front and rear three-quarter photos. */
export const CRETA: CarSpec = {
  id: 'hyundai-creta',
  name: 'Hyundai Creta',
  L: 4.33, W: 1.79, H: 1.635,
  axles: [0.1999, 0.8027],
  tyreR: 0.345, tyreW: 0.215, rim: 0.626, wheel: { style: 'split', spokes: 5 }, rimTone: 'dark',
  archGap: 0.06, archSquare: 0.4,
  sill: [[0, 0.37], [0.01, 0.35], [0.02, 0.335], [0.04, 0.305], [0.07, 0.262], [0.1, 0.242], [0.28, 0.2], [0.4, 0.19], [0.6, 0.2], [0.7, 0.19], [0.9, 0.16], [0.95, 0.15], [0.97, 0.18], [0.99, 0.2], [1, 0.24]],
  // upright tailgate, the belt kicking up under the rear quarter glass, then the long flat bonnet
  top: [[0, 0.6], [0.006, 0.86], [0.012, 1.0], [0.02, 1.1], [0.035, 1.16], [0.07, 1.175], [0.12, 1.2], [0.2, 1.215], [0.3, 1.175], [0.413, 1.14], [0.5, 1.122], [0.6, 1.112], [0.7, 1.105], [0.715, 1.1], [0.75, 1.07], [0.8, 1.053], [0.85, 1.028], [0.9, 0.998], [0.95, 0.95], [0.97, 0.9], [0.98, 0.81], [0.99, 0.7], [1, 0.52]],
  width: [[0, 0.82], [0.008, 0.9], [0.025, 0.955], [0.06, 0.98], [0.12, 0.995], [0.5, 1], [0.88, 0.995], [0.93, 0.98], [0.965, 0.95], [0.985, 0.88], [1, 0.8]],
  crown: 0.02,
  bulge: 0.01,
  // the sharp crease along both doors
  shoulder: { y: [[0, 0.95], [0.3, 0.9], [0.7, 0.87], [1, 0.9]], inset: 0.03 },
  haunch: 0.025,
  bonnetRidge: 0.01,
  noseSweep: 0.18,
  tailSweep: 0.1,
  greenhouse: {
    u0: 0.04, u1: 0.715, tumble: 0.75,
    top: [[0.04, 1.165], [0.05, 1.185], [0.06, 1.21], [0.07, 1.245], [0.08, 1.3], [0.09, 1.44], [0.1, 1.465], [0.13, 1.487], [0.17, 1.505], [0.25, 1.527], [0.35, 1.548], [0.45, 1.552], [0.5, 1.537], [0.52, 1.53], [0.54, 1.51], [0.56, 1.49], [0.58, 1.46], [0.6, 1.42], [0.62, 1.36], [0.66, 1.243], [0.69, 1.16], [0.715, 1.1]],
  },
  roof: { u0: 0.12, u1: 0.53, black: false },
  pillars: [
    { bottom: [0.258, 0.268], top: [0.258, 0.268], black: true },
    { bottom: [0.413, 0.437], top: [0.413, 0.437], black: true },
    { bottom: [0.7, 0.715], top: [0.535, 0.55], black: true },
  ],
  cladding: { top: [[0, 0.67], [0.03, 0.67], [0.08, 0.72], [0.13, 0.785], [0.2, 0.79], [0.27, 0.75], [0.3, 0.4], [0.4, 0.38], [0.6, 0.38], [0.69, 0.4], [0.72, 0.78], [0.8, 0.83], [0.88, 0.79], [0.92, 0.6], [0.95, 0.5], [1, 0.48]], flare: 0.13 },
  doors: [[0.695, 0.699], [0.444, 0.444], [0.27, 0.19]],
  front: [
    // gloss band under the bonnet edge with the full-width light bar; thicker corner DRLs with a vertical drop (the "H")
    { mat: 'gloss', poly: [[-0.688, 0.86], [0.688, 0.86], [0.679, 0.92], [-0.679, 0.92]] },
    { mat: 'drl', poly: [[-0.671, 0.896], [0.671, 0.896], [0.671, 0.907], [-0.671, 0.907]], layer: 1 },
    { mat: 'drl', mirror: true, poly: [[0.43, 0.886], [0.671, 0.886], [0.671, 0.912], [0.43, 0.912]], layer: 1 },
    { mat: 'drl', mirror: true, poly: [[0.649, 0.82], [0.675, 0.82], [0.675, 0.912], [0.649, 0.912]], layer: 1 },
    // the big dark parametric grille
    { mat: 'gloss', poly: [[-0.482, 0.58], [0.482, 0.58], [0.516, 0.86], [-0.516, 0.86]] },
    { mat: 'mesh', poly: [[-0.447, 0.61], [0.447, 0.61], [0.473, 0.84], [-0.473, 0.84]], layer: 1 },
    // quad-LED headlamps in black housings low at the corners
    { mat: 'gloss', mirror: true, poly: [[0.516, 0.56], [0.688, 0.56], [0.688, 0.76], [0.533, 0.76]] },
    { mat: 'head', mirror: true, poly: [[0.542, 0.59], [0.662, 0.59], [0.662, 0.73], [0.559, 0.73]], layer: 1 },
    // black lower bumper and lower grille, framed by the silver skid plate and its corner fangs
    { mat: 'trim', poly: [[-0.649, 0.2], [0.649, 0.2], [0.649, 0.56], [0.475, 0.56], [0.443, 0.58], [-0.443, 0.58], [-0.475, 0.56], [-0.649, 0.56]] },
    { mat: 'mesh', poly: [[-0.499, 0.26], [0.499, 0.26], [0.516, 0.44], [-0.516, 0.44]], layer: 1 },
    { mat: 'satin', layer: 1, poly: [[-0.523, 0.24], [-0.507, 0.24], [-0.495, 0.253], [-0.483, 0.279], [-0.472, 0.319], [-0.463, 0.371], [-0.399, 0.411], [-0.283, 0.437], [-0.112, 0.45], [0.112, 0.45], [0.283, 0.437], [0.399, 0.411], [0.463, 0.371], [0.472, 0.319], [0.483, 0.279], [0.495, 0.253], [0.507, 0.24], [0.523, 0.24], [0.534, 0.254], [0.544, 0.283], [0.55, 0.326], [0.554, 0.384], [0.555, 0.429], [0.553, 0.463], [0.548, 0.485], [0.541, 0.495], [0.469, 0.502], [0.333, 0.508], [0.132, 0.51], [-0.132, 0.51], [-0.333, 0.508], [-0.469, 0.502], [-0.541, 0.495], [-0.548, 0.485], [-0.553, 0.463], [-0.555, 0.429], [-0.554, 0.384], [-0.55, 0.326], [-0.544, 0.283], [-0.534, 0.254]] },
    { mat: 'satin', layer: 1, poly: [[-0.228, 0.21], [0.228, 0.21], [0.459, 0.219], [0.467, 0.236], [0.236, 0.245], [-0.236, 0.245], [-0.467, 0.236], [-0.459, 0.219]] },
  ],
  rear: [
    // gloss band across the tailgate: the connected light bar and the lamp clusters at the corners
    { step: 0.005, mat: 'gloss', poly: [[-0.705, 0.95], [0.705, 0.95], [0.705, 1.07], [-0.705, 1.07]] },
    { step: 0.005, mat: 'tail', poly: [[-0.688, 1.045], [0.688, 1.045], [0.688, 1.056], [-0.688, 1.056]], layer: 1 },
    { step: 0.005, mat: 'tail', mirror: true, poly: [[0.499, 0.975], [0.688, 0.975], [0.688, 1.04], [0.499, 1.04]], layer: 1 },
    // dark recess round the number plate
    { step: 0.005, mat: 'gloss', poly: [[-0.43, 0.76], [0.43, 0.76], [0.482, 0.93], [-0.482, 0.93]] },
    // black lower bumper, silver skid plate with a dark insert, vertical reflectors at the corners
    { step: 0.005, mat: 'trim', poly: [[-0.722, 0.36], [0.722, 0.36], [0.722, 0.66], [-0.722, 0.66]] },
    { step: 0.005, mat: 'satin', layer: 1, poly: [[-0.133, 0.36], [0.133, 0.36], [0.337, 0.364], [0.479, 0.371], [0.559, 0.383], [0.576, 0.398], [0.587, 0.419], [0.591, 0.446], [0.589, 0.48], [0.581, 0.52], [0.503, 0.55], [0.357, 0.57], [0.142, 0.58], [-0.142, 0.58], [-0.357, 0.57], [-0.503, 0.55], [-0.581, 0.52], [-0.589, 0.48], [-0.591, 0.446], [-0.587, 0.419], [-0.576, 0.398], [-0.559, 0.383], [-0.479, 0.371], [-0.337, 0.364]] },
    { step: 0.005, mat: 'gloss', layer: 2, depth: 0.014, poly: [[-0.387, 0.49], [0.387, 0.49], [0.387, 0.55], [-0.387, 0.55]] },
    { step: 0.005, mat: 'tail', mirror: true, poly: [[0.619, 0.5], [0.671, 0.5], [0.671, 0.62], [0.619, 0.62]], layer: 1 },
  ],
  side: [
    // the silver strip on the black sill, and the chrome door handles
    // the tail lamps wrap round the corners
    { mat: 'gloss', poly: [[0.004, 0.945], [0.075, 0.95], [0.08, 1.07], [0.004, 1.07]] },
    { mat: 'tail', layer: 1, poly: [[0.008, 0.975], [0.065, 0.98], [0.07, 1.045], [0.008, 1.045]] },
    { mat: 'silver', poly: [[0.3, 0.285], [0.68, 0.285], [0.685, 0.305], [0.3, 0.31]] },
    { mat: 'chrome', poly: [[0.473, 0.955], [0.513, 0.955], [0.513, 0.985], [0.473, 0.985]] },
    { mat: 'chrome', poly: [[0.21, 1.0], [0.27, 1.0], [0.27, 1.03], [0.21, 1.03]] },
  ],
  plates: { front: 0.47, rear: 0.83 },
  rails: 'silver',
  spoiler: true,
  sunroof: [0.3, 0.45],
  mirrors: 'body',
  paint: '#0c2a2e', // Robust Emerald (the deep green of the reference photos, darkened for the studio lights)
  plate: 'MH 12 CR 2024',
}

/** Maruti Suzuki Brezza (2022 generation). 3995 × 1790 × 1685 (over the roof rails), wheelbase 2500, 215/60 R16.
 *  Side profile measured from a levelled side photo of a dark car (height 1.677 vs 1.685 official), so the belt,
 *  cladding and shut lines were read off a pixel grid; axles at the official wheelbase with the overhangs split as in
 *  the photo (0.487 : 0.513). Lamps, grille and skid plates from the straight front / rear and three-quarter views. */
export const BREZZA: CarSpec = {
  id: 'maruti-brezza',
  name: 'Maruti Suzuki Brezza',
  L: 3.995, W: 1.79, H: 1.685,
  axles: [0.1822, 0.808],
  tyreR: 0.332, tyreW: 0.215, rim: 0.612, wheel: { style: 'swirl', spokes: 5 },
  archGap: 0.06, archSquare: 0.6,
  sill: [[0, 0.3], [0.01, 0.31], [0.03, 0.33], [0.07, 0.32], [0.12, 0.3], [0.27, 0.262], [0.5, 0.258], [0.72, 0.258], [0.88, 0.258], [0.93, 0.258], [0.97, 0.27], [0.99, 0.293], [1, 0.4]],
  // the upright tail up to the lamps, the belt falling gently from the quarter glass to the mirror, then the long
  // flat bonnet that only drops at the very nose
  top: [[0, 1.175], [0.006, 1.183], [0.015, 1.19], [0.025, 1.2], [0.035, 1.21], [0.05, 1.225], [0.15, 1.228], [0.2, 1.222], [0.3, 1.21], [0.4, 1.198], [0.5, 1.178], [0.6, 1.162], [0.66, 1.152], [0.72, 1.13], [0.75, 1.126], [0.77, 1.115], [0.8, 1.11], [0.85, 1.095], [0.9, 1.068], [0.94, 1.04], [0.96, 1.012], [0.97, 0.99], [0.98, 0.98], [0.99, 0.972], [1, 0.965]],
  width: [[0, 0.82], [0.008, 0.9], [0.025, 0.95], [0.06, 0.98], [0.12, 0.996], [0.5, 1], [0.88, 0.995], [0.93, 0.98], [0.965, 0.94], [0.985, 0.88], [1, 0.8]],
  crown: 0.015,
  bulge: 0.01,
  // the crease through the door handles, rising slightly towards the tail lamps
  shoulder: { y: [[0, 1.04], [0.5, 1.0], [1, 0.97]], inset: 0.025 },
  haunch: 0.025,
  bonnetRidge: 0.01,
  topRadius: 0.08,
  noseSweep: 0.16,
  tailSweep: 0.1,
  greenhouse: {
    u0: 0.035, u1: 0.74, tumble: 0.8,
    // the tailgate glass leans back under the roof spoiler; a long flat roof; a fairly upright screen
    top: [[0.035, 1.21], [0.045, 1.255], [0.06, 1.335], [0.07, 1.39], [0.08, 1.445], [0.09, 1.5], [0.1, 1.56], [0.11, 1.598], [0.13, 1.6], [0.2, 1.61], [0.3, 1.615], [0.4, 1.615], [0.48, 1.613], [0.51, 1.608], [0.53, 1.6], [0.55, 1.585], [0.58, 1.548], [0.6, 1.51], [0.62, 1.462], [0.64, 1.414], [0.66, 1.366], [0.68, 1.314], [0.7, 1.261], [0.72, 1.203], [0.74, 1.15]],
  },
  roof: { u0: 0.12, u1: 0.52, black: true },
  pillars: [
    // floating roof: every pillar is black, the wide D-pillar running back to the tailgate glass
    { bottom: [0.043, 0.13], top: [0.106, 0.148], black: true },
    { bottom: [0.205, 0.234], top: [0.224, 0.236], black: true },
    { bottom: [0.414, 0.44], top: [0.41, 0.431], black: true },
    { bottom: [0.667, 0.74], top: [0.524, 0.548], black: true },
  ],
  // squared black arch flares, joined along the lower doors, black bumper ends
  cladding: { top: [[0, 0.65], [0.04, 0.65], [0.06, 0.7], [0.1, 0.77], [0.17, 0.785], [0.24, 0.75], [0.285, 0.6], [0.32, 0.56], [0.5, 0.56], [0.66, 0.56], [0.7, 0.62], [0.74, 0.77], [0.82, 0.805], [0.89, 0.77], [0.93, 0.68], [0.95, 0.62], [1, 0.62]], flare: 0.12, cut: true },
  doors: [[0.185, 0.18], [0.44, 0.44], [0.689, 0.707]],
  front: [
    // gloss-black grille between the headlamps, two silver bars ending at the lamps, a slatted slot below
    { mat: 'gloss', poly: [[-0.5, 0.8], [0.5, 0.8], [0.5, 0.95], [-0.5, 0.95]], depth: 0.003, step: 0.005 },
    { mat: 'silver', poly: [[-0.47, 0.875], [0.47, 0.875], [0.47, 0.905], [-0.47, 0.905]], layer: 1, depth: 0.003, step: 0.005 },
    { mat: 'silver', poly: [[-0.47, 0.928], [0.47, 0.928], [0.47, 0.938], [-0.47, 0.938]], layer: 1, depth: 0.002, step: 0.005 },
    { mat: 'slats', poly: [[-0.44, 0.812], [0.44, 0.812], [0.44, 0.858], [-0.44, 0.858]], layer: 1 },
    // headlamps under the bonnet edge, lower at the inner end, with the twin-L LED light guides
    { mat: 'gloss', mirror: true, poly: [[0.5, 0.825], [0.6, 0.845], [0.73, 0.89], [0.73, 0.96], [0.5, 0.955]], layer: 1, depth: 0.004, step: 0.005 },
    { mat: 'head', mirror: true, poly: [[0.54, 0.875], [0.7, 0.908], [0.7, 0.945], [0.54, 0.945]], layer: 2, depth: 0.004, step: 0.005 },
    { mat: 'drl', mirror: true, poly: [[0.51, 0.836], [0.72, 0.893], [0.72, 0.906], [0.51, 0.85]], layer: 3, depth: 0.003, step: 0.005 },
    { mat: 'drl', mirror: true, poly: [[0.56, 0.948], [0.72, 0.948], [0.72, 0.956], [0.56, 0.956]], layer: 3, depth: 0.003, step: 0.005 },
    { mat: 'drl', mirror: true, poly: [[0.705, 0.893], [0.72, 0.893], [0.72, 0.956], [0.705, 0.956]], layer: 3, depth: 0.003, step: 0.005 },
    // black lower bumper: a slatted intake, the silver skid plate round the number plate, the lower grille and lip
    { mat: 'trim', poly: [[-0.72, 0.3], [0.72, 0.3], [0.72, 0.5], [0.6, 0.7], [0.25, 0.7], [0.25, 0.49], [-0.25, 0.49], [-0.25, 0.7], [-0.6, 0.7], [-0.72, 0.5]] },
    { mat: 'trim', poly: [[-0.25, 0.6], [0.25, 0.6], [0.25, 0.7], [-0.25, 0.7]] },
    { mat: 'slats', poly: [[-0.52, 0.635], [0.52, 0.635], [0.55, 0.69], [-0.55, 0.69]], layer: 1 },
    // (the number plate sits in the notch)
    { mat: 'satin', poly: [[-0.5, 0.47], [0.5, 0.47], [0.545, 0.48], [0.56, 0.5], [0.52, 0.6], [0.5, 0.618], [0.47, 0.625], [0.25, 0.625], [0.25, 0.49], [-0.25, 0.49], [-0.25, 0.625], [-0.47, 0.625], [-0.5, 0.618], [-0.52, 0.6], [-0.56, 0.5], [-0.545, 0.48]], layer: 1, step: 0.005 },
    { mat: 'slats', poly: [[-0.48, 0.36], [0.48, 0.36], [0.5, 0.47], [-0.5, 0.47]], layer: 1 },
    { mat: 'satin', poly: [[-0.6, 0.31], [0.6, 0.31], [0.625, 0.318], [0.632, 0.33], [0.622, 0.343], [0.6, 0.35], [-0.6, 0.35], [-0.622, 0.343], [-0.632, 0.33], [-0.625, 0.318]], layer: 1, step: 0.005 },
    // fog lamps in tall black pods at the corners
    { mat: 'gloss', mirror: true, poly: [[0.57, 0.56], [0.68, 0.54], [0.68, 0.74], [0.6, 0.74]], layer: 1, depth: 0.004, step: 0.005 },
    { mat: 'head', mirror: true, poly: [[0.61, 0.63], [0.655, 0.63], [0.655, 0.67], [0.61, 0.67]], layer: 2, depth: 0.004, step: 0.005 },
  ],
  rear: [
    // the gloss-black band across the tailgate joining the split tail lamps
    { mat: 'gloss', poly: [[-0.75, 1.078], [0.75, 1.078], [0.75, 1.168], [-0.75, 1.168]], step: 0.005 },
    { mat: 'tail', mirror: true, poly: [[0.3, 1.125], [0.73, 1.125], [0.73, 1.155], [0.32, 1.155]], layer: 1 },
    { mat: 'tail', mirror: true, poly: [[0.63, 1.05], [0.73, 1.05], [0.73, 1.125], [0.65, 1.125]], layer: 1 },
    { mat: 'head', mirror: true, poly: [[0.47, 1.06], [0.66, 1.06], [0.66, 1.1], [0.49, 1.1]], layer: 1, step: 0.005 },
    // black lower bumper with reflectors and a silver skid plate framing a dark insert
    { mat: 'trim', poly: [[-0.72, 0.33], [0.72, 0.33], [0.72, 0.716], [-0.72, 0.716]] },
    { mat: 'reflector', mirror: true, poly: [[0.35, 0.574], [0.54, 0.574], [0.54, 0.598], [0.35, 0.598]], layer: 1, step: 0.005 },
    // the red reflector bar along the top of the skid plate
    { mat: 'reflector', poly: [[-0.56, 0.553], [0.56, 0.553], [0.58, 0.567], [-0.58, 0.567]], layer: 1, depth: 0.003, step: 0.005 },
    { mat: 'satin', poly: [[-0.56, 0.38], [0.56, 0.38], [0.595, 0.388], [0.612, 0.405], [0.645, 0.528], [0.635, 0.545], [0.605, 0.548], [0.588, 0.53], [0.555, 0.43], [0.53, 0.415], [-0.53, 0.415], [-0.555, 0.43], [-0.588, 0.53], [-0.605, 0.548], [-0.635, 0.545], [-0.645, 0.528], [-0.612, 0.405], [-0.595, 0.388]], layer: 1, step: 0.005 },
    { mat: 'mesh', poly: [[-0.53, 0.415], [0.53, 0.415], [0.57, 0.53], [-0.57, 0.53]], layer: 1 },
    // the shadow line over the number-plate recess
    { mat: 'gloss', poly: [[-0.33, 0.885], [0.33, 0.885], [0.31, 0.896], [-0.31, 0.896]], depth: 0.002, step: 0.005 },
  ],
  side: [
    // the silver insert on the black lower-door cladding
    { mat: 'silver', poly: [[0.345, 0.4], [0.66, 0.4], [0.69, 0.47], [0.63, 0.44], [0.35, 0.435]] },
  ],
  plates: { front: 0.54, rear: 0.82 },
  rails: 'silver',
  spoiler: { len: 0.16, thick: 0.018, tilt: 0.24 },
  sunroof: [0.38, 0.5],
  mirrors: 'black',
  rimTone: 'dark',
  paint: '#9c1219', // Sizzling Red, with the bluish-black roof
  plate: 'MH 12 BZ 2026',
}

/** Maruti Suzuki Swift (4th generation, 2024). 3860 × 1735 × 1520, wheelbase 2450, 185/65 R15.
 *  Side profile measured from a levelled side photo (roof came out 1.47 m: the 1.52 m official height includes
 *  the mast antenna); axles set to the official wheelbase with the overhangs split as in the photo (0.455 : 0.545). */
export const SWIFT: CarSpec = {
  id: 'maruti-swift',
  name: 'Maruti Suzuki Swift',
  rakedEnds: true,
  L: 3.86, W: 1.735, H: 1.52,
  axles: [0.1661, 0.8008],
  tyreR: 0.31, tyreW: 0.185, rim: 0.614, wheel: { style: 'split', spokes: 5 },
  archGap: 0.045, archSquare: 0.15,
  sill: [[0, 0.42], [0.01, 0.31], [0.02, 0.285], [0.04, 0.262], [0.06, 0.25], [0.1, 0.23], [0.2, 0.2], [0.29, 0.185], [0.5, 0.183], [0.6, 0.16], [0.7, 0.152], [0.8, 0.15], [0.9, 0.151], [0.93, 0.167], [0.95, 0.177], [0.97, 0.193], [0.98, 0.204], [0.99, 0.245], [0.996, 0.3], [1, 0.4]],
  // the rounded tail under the tailgate glass, a level belt, then the short clamshell bonnet falling to the nose
  top: [[0, 0.485], [0.006, 0.645], [0.012, 0.745], [0.02, 0.855], [0.03, 0.92], [0.04, 0.97], [0.05, 1.003], [0.065, 1.035], [0.1, 1.045], [0.4, 1.047], [0.7, 1.047], [0.72, 1.043], [0.735, 1.022], [0.75, 0.999], [0.78, 0.976], [0.8, 0.964], [0.85, 0.928], [0.9, 0.879], [0.93, 0.85], [0.95, 0.821], [0.97, 0.786], [0.98, 0.752], [0.99, 0.685], [0.996, 0.6], [1, 0.5]],
  // round in plan: both ends taper hard into the corners
  width: [[0, 0.68], [0.005, 0.78], [0.015, 0.87], [0.035, 0.93], [0.07, 0.97], [0.13, 0.995], [0.17, 1], [0.45, 0.99], [0.8, 0.995], [0.86, 0.99], [0.92, 0.965], [0.955, 0.92], [0.978, 0.85], [0.992, 0.77], [1, 0.68]],
  crown: 0.02,
  bulge: 0.04,
  // the crease from the headlamp along the doors, rising onto the rear haunch
  shoulder: { y: [[0, 0.96], [0.15, 0.96], [0.5, 0.94], [0.9, 0.88], [1, 0.82]], inset: 0.045 },
  // the Swift's hips: the body swells over the wheels and pinches in along the doors
  haunch: 0.06,
  noseSweep: 0.32,
  tailSweep: 0.26,
  greenhouse: {
    u0: 0.065, u1: 0.715, tumble: 0.62,
    // the raked tailgate glass up to the roof spoiler, a gently domed roof, then the windscreen
    top: [[0.065, 1.035], [0.08, 1.095], [0.1, 1.195], [0.12, 1.24], [0.14, 1.32], [0.16, 1.35], [0.2, 1.395], [0.25, 1.415], [0.3, 1.427], [0.4, 1.437], [0.46, 1.441], [0.5, 1.433], [0.54, 1.42], [0.56, 1.393], [0.58, 1.369], [0.6, 1.341], [0.62, 1.296], [0.64, 1.251], [0.66, 1.2], [0.68, 1.155], [0.7, 1.103], [0.715, 1.055]],
  },
  // body-coloured roof: the dual-tone paints bring their own black roof (cars.json colours)
  roof: { u0: 0.14, u1: 0.555, black: false },
  pillars: [
    // floating roof: every pillar is black, and the wide C-pillar wraps the rear quarter glass
    { bottom: [0.065, 0.183], top: [0.135, 0.178], black: true },
    { bottom: [0.218, 0.226], top: [0.222, 0.23], black: true },
    { bottom: [0.386, 0.422], top: [0.381, 0.41], black: true },
    { bottom: [0.7, 0.715], top: [0.565, 0.585], black: true },
  ],
  doors: [[0.16, 0.148], [0.405, 0.4], [0.69, 0.7]],
  front: [
    // the bonnet's leading edge runs across the nose; the headlamps sit right under it
    { step: 0.005, mat: 'gloss', depth: 0.001, poly: [[-0.74, 0.788], [0.74, 0.788], [0.74, 0.8], [-0.74, 0.8]] },
    // wide swept-back headlamps, the LED light strip along their lower edge
    { step: 0.005, mat: 'gloss', mirror: true, poly: [[0.33, 0.66], [0.55, 0.665], [0.74, 0.69], [0.76, 0.785], [0.56, 0.785], [0.38, 0.73]] },
    { step: 0.005, mat: 'head', mirror: true, poly: [[0.48, 0.695], [0.72, 0.71], [0.73, 0.775], [0.56, 0.775]], layer: 1 },
    { step: 0.005, mat: 'drl', mirror: true, poly: [[0.35, 0.67], [0.55, 0.675], [0.74, 0.698], [0.74, 0.71], [0.55, 0.688], [0.37, 0.685]], layer: 1 },
    // the oval gloss-black grille with its honeycomb, low in the bumper
    { step: 0.005, mat: 'gloss', poly: [[-0.44, 0.41], [-0.32, 0.36], [0.32, 0.36], [0.44, 0.41], [0.49, 0.55], [0.42, 0.665], [-0.42, 0.665], [-0.49, 0.55]] },
    { step: 0.005, mat: 'mesh', poly: [[-0.41, 0.42], [-0.3, 0.38], [0.3, 0.38], [0.41, 0.42], [0.46, 0.55], [0.4, 0.645], [-0.4, 0.645], [-0.46, 0.55]], layer: 1 },
    // fog lamps in black pods at the corners
    { step: 0.005, mat: 'gloss', mirror: true, poly: [[0.5, 0.335], [0.64, 0.335], [0.66, 0.42], [0.52, 0.42]] },
    { step: 0.005, mat: 'head', mirror: true, poly: [[0.55, 0.36], [0.61, 0.36], [0.61, 0.395], [0.55, 0.395]], layer: 1 },
    // black lower lip with a wide slot
    { step: 0.005, mat: 'trim', poly: [[-0.64, 0.22], [0.64, 0.22], [0.66, 0.31], [0.5, 0.33], [-0.5, 0.33], [-0.66, 0.31]] },
    { step: 0.005, mat: 'slats', poly: [[-0.45, 0.26], [0.45, 0.26], [0.45, 0.31], [-0.45, 0.31]], layer: 1, depth: 0.004 },
  ],
  rear: [
    // tall dark-tinted lamp clusters wrapping the corners, a red light guide round their top, inner and lower edges
    { step: 0.005, mat: 'gloss', mirror: true, poly: [[0.42, 0.86], [0.5, 0.8], [0.74, 0.78], [0.76, 0.99], [0.6, 1.0], [0.44, 0.99]] },
    { step: 0.005, mat: 'tail', mirror: true, poly: [[0.46, 0.962], [0.74, 0.952], [0.74, 0.968], [0.46, 0.978]], layer: 1 },
    { step: 0.005, mat: 'tail', mirror: true, poly: [[0.46, 0.85], [0.485, 0.83], [0.485, 0.97], [0.46, 0.97]], layer: 1 },
    { step: 0.005, mat: 'tail', mirror: true, poly: [[0.485, 0.815], [0.73, 0.8], [0.73, 0.815], [0.485, 0.83]], layer: 1 },
    // black lower diffuser band across the bumper, with the reflectors set into it
    { step: 0.005, mat: 'trim', poly: [[-0.68, 0.25], [0.68, 0.25], [0.7, 0.38], [0.5, 0.39], [-0.5, 0.39], [-0.7, 0.38]] },
    { step: 0.005, mat: 'tail', mirror: true, poly: [[0.5, 0.335], [0.66, 0.335], [0.66, 0.36], [0.5, 0.36]], layer: 1, depth: 0.004 },
  ],
  side: [
    // door handles: the rear one is back on the door
    { step: 0.005, mat: 'gloss', poly: [[0.415, 0.935], [0.47, 0.935], [0.47, 0.96], [0.415, 0.96]] },
    { step: 0.005, mat: 'gloss', poly: [[0.178, 0.945], [0.232, 0.945], [0.232, 0.97], [0.178, 0.97]] },
    // the tail lamp wrapping round onto the flank, its red guide along the top
    { step: 0.005, mat: 'gloss', poly: [[0.085, 1.02], [0.06, 1.0], [0.045, 0.955], [0.03, 0.905], [0.022, 0.85], [0.035, 0.83], [0.06, 0.9]] },
    { step: 0.005, mat: 'tail', layer: 1, poly: [[0.085, 1.015], [0.06, 0.995], [0.045, 0.95], [0.05, 0.948], [0.065, 0.983], [0.085, 1.0]] },
    // the clamshell bonnet's shut line along the top of the front wing, down to the headlamp
    { step: 0.005, mat: 'gloss', depth: 0.001, poly: [[0.725, 1.005], [0.8, 0.94], [0.88, 0.87], [0.955, 0.78], [0.955, 0.792], [0.88, 0.882], [0.8, 0.952], [0.725, 1.017]] },
  ],
  plates: { front: 0.47, rear: 0.47 },
  mirrors: 'black',
  rimTone: 'dark',
  paint: '#0a45a2', // Luster Blue
  plate: 'MH 12 SW 2026',
}

/** A thin band along a path (shut lines, strips): each point offset by ±w/2 across the path. */
function band(path: [number, number][], w: number): [number, number][] {
  const off = path.map((_, i) => {
    const a = path[Math.max(0, i - 1)], b = path[Math.min(path.length - 1, i + 1)]
    const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1
    return [(-dy / l) * (w / 2), (dx / l) * (w / 2)]
  })
  return [
    ...path.map((p, i) => [p[0] + off[i][0], p[1] + off[i][1]] as [number, number]),
    ...path.map((p, i) => [p[0] - off[i][0], p[1] - off[i][1]] as [number, number]).reverse(),
  ]
}
/** a right-half outline (z ≥ 0, bottom → top) mirrored into a full outline across the centre line */
function both(half: [number, number][]): [number, number][] {
  return [...half, ...half.map(([z, y]) => [-z, y] as [number, number]).reverse()]
}
// the Dzire's grille: wide at the top, bulging at the sides, rounded into its lower corners
const DZIRE_GRILLE: [number, number][] = [[0.4, 0.316], [0.455, 0.328], [0.495, 0.36], [0.52, 0.42], [0.525, 0.5], [0.515, 0.58], [0.5, 0.635], [0.48, 0.662], [0.46, 0.668]]
const dzireSlat = (y: number, hw: number): Decal => ({
  step: 0.005, mat: 'chrome', layer: 1, depth: 0.012,
  poly: [[-hw, y], [hw, y], [hw + 0.005, y + 0.007], [hw, y + 0.014], [-hw, y + 0.014], [-hw - 0.005, y + 0.007]],
})

/** Maruti Suzuki Dzire (2024, 4th gen). 3995 × 1735 × 1525, wheelbase 2450, 185/65 R15.
 *  Side profile from a levelled gallery side photo (roof 1.45 m: the official height includes the shark-fin antenna);
 *  overhangs from the Swift's nose plus the longer boot. Belt, pillars and handles read off the photo on a pixel grid,
 *  lamps and grille from a straight front and a rear three-quarter photo. */
export const DZIRE: CarSpec = {
  id: 'maruti-dzire',
  name: 'Maruti Suzuki Dzire',
  rakedEnds: true,
  L: 3.995, W: 1.735, H: 1.525,
  axles: [0.194, 0.8075],
  tyreR: 0.31, tyreW: 0.185, rim: 0.614, wheel: { style: 'split', spokes: 5 },
  archGap: 0.045, archSquare: 0.15,
  sill: [[0, 0.34], [0.006, 0.29], [0.015, 0.28], [0.03, 0.275], [0.05, 0.265], [0.07, 0.24], [0.1, 0.201], [0.2, 0.176], [0.29, 0.166], [0.5, 0.166], [0.55, 0.158], [0.6, 0.142], [0.7, 0.133], [0.8, 0.129], [0.88, 0.122], [0.91, 0.121], [0.93, 0.136], [0.95, 0.15], [0.97, 0.158], [0.985, 0.166], [0.993, 0.18], [1, 0.25]],
  // the boot: a short ducktail lip and the flat boot lid; then the belt (rising to the C-pillar) and the bonnet
  top: [[0, 0.5], [0.003, 0.86], [0.007, 0.99], [0.012, 1.05], [0.02, 1.073], [0.035, 1.083], [0.06, 1.091], [0.08, 1.098], [0.1, 1.108], [0.15, 1.1], [0.2, 1.086], [0.3, 1.058], [0.4, 1.038], [0.5, 1.026], [0.6, 1.018], [0.7, 1.014], [0.735, 1.018], [0.76, 0.996], [0.8, 0.963], [0.85, 0.933], [0.9, 0.896], [0.93, 0.864], [0.95, 0.834], [0.965, 0.803], [0.975, 0.778], [0.983, 0.743], [0.99, 0.678], [0.996, 0.6], [1, 0.48]],
  // round in plan: both ends taper hard into the corners
  width: [[0, 0.7], [0.005, 0.79], [0.015, 0.875], [0.035, 0.935], [0.07, 0.972], [0.13, 0.995], [0.18, 1], [0.45, 0.99], [0.8, 0.995], [0.86, 0.99], [0.92, 0.965], [0.955, 0.92], [0.978, 0.85], [0.992, 0.77], [1, 0.68]],
  crown: 0.02,
  bulge: 0.04,
  shoulder: { y: [[0, 0.98], [0.2, 0.965], [0.5, 0.935], [0.8, 0.9], [1, 0.84]], inset: 0.035 },
  haunch: 0.06,
  topRadius: 0.08,
  noseSweep: 0.3,
  tailSweep: 0.22,
  greenhouse: {
    u0: 0.1, u1: 0.735, tumble: 0.62,
    // the rear glass rising off the boot lid, a long gently domed roof, then the windscreen
    top: [[0.1, 1.108], [0.12, 1.163], [0.15, 1.224], [0.2, 1.311], [0.25, 1.384], [0.28, 1.406], [0.32, 1.424], [0.36, 1.434], [0.4, 1.438], [0.45, 1.435], [0.49, 1.424], [0.52, 1.406], [0.55, 1.382], [0.58, 1.344], [0.62, 1.271], [0.66, 1.196], [0.7, 1.111], [0.735, 1.028]],
  },
  roof: { u0: 0.267, u1: 0.5488, black: false },
  pillars: [
    // body-coloured C-pillar behind the rear quarter glass; black B-pillar and quarter-glass divider; body A-pillar
    { bottom: [0.1, 0.192], top: [0.17, 0.235], black: false },
    { bottom: [0.253, 0.26], top: [0.253, 0.26], black: true },
    { bottom: [0.387, 0.418], top: [0.388, 0.42], black: true },
    { bottom: [0.64, 0.735], top: [0.545, 0.565], black: false },
  ],
  doors: [[0.215, 0.168], [0.436, 0.418], [0.686, 0.698]],
  windowChrome: true,
  front: [
    // gloss-black band under the bonnet edge carrying the badge, the chrome strip under it running lamp to lamp
    { step: 0.005, mat: 'gloss', poly: [[-0.475, 0.688], [0.475, 0.688], [0.475, 0.76], [-0.475, 0.76]] },
    { step: 0.005, mat: 'chrome', poly: [[-0.49, 0.672], [0.49, 0.672], [0.49, 0.688], [-0.49, 0.688]], layer: 1 },
    // wide, slim LED headlamps, the light strip along their lower edge running into the chrome strip
    { step: 0.005, depth: 0.002, mat: 'gloss', mirror: true, poly: [[0.48, 0.662], [0.48, 0.752], [0.6, 0.782], [0.68, 0.806], [0.715, 0.814], [0.73, 0.8], [0.733, 0.745], [0.72, 0.71], [0.67, 0.68]] },
    { step: 0.005, depth: 0.004, mat: 'head', mirror: true, poly: [[0.5, 0.708], [0.5, 0.742], [0.6, 0.768], [0.68, 0.793], [0.712, 0.8], [0.72, 0.765], [0.68, 0.742], [0.6, 0.724]], layer: 1 },
    { step: 0.005, depth: 0.004, mat: 'drl', mirror: true, poly: [[0.49, 0.684], [0.6, 0.692], [0.67, 0.702], [0.725, 0.72], [0.725, 0.736], [0.67, 0.718], [0.6, 0.708], [0.49, 0.7]], layer: 2 },
    // the wide grille: gloss black behind five chrome slats
    { step: 0.005, mat: 'gloss', poly: both(DZIRE_GRILLE) },
    dzireSlat(0.36, 0.47), dzireSlat(0.42, 0.495), dzireSlat(0.48, 0.5), dzireSlat(0.541, 0.495), dzireSlat(0.6, 0.48),
    // fog lamps in black pods
    { step: 0.005, depth: 0.003, mat: 'gloss', mirror: true, poly: [[0.575, 0.33], [0.64, 0.352], [0.685, 0.385], [0.7, 0.43], [0.698, 0.488], [0.6, 0.485], [0.585, 0.46]] },
    { step: 0.005, depth: 0.004, mat: 'silver', mirror: true, poly: [[0.65, 0.415], [0.672, 0.418], [0.684, 0.432], [0.682, 0.455], [0.662, 0.462], [0.645, 0.452], [0.642, 0.43]], layer: 1 },
    // black lower lip
    { step: 0.005, mat: 'trim', poly: [[-0.6, 0.2], [0.6, 0.2], [0.66, 0.24], [-0.66, 0.24]] },
  ],
  rear: [
    // the gloss-black lip spoiler along the boot lid's trailing edge
    { step: 0.005, mat: 'gloss', poly: [[-0.6, 1.035], [0.6, 1.035], [0.62, 1.05], [0.58, 1.068], [-0.58, 1.068], [-0.62, 1.05]] },
    // the boot lid's shut line round the plate recess
    { step: 0.005, mat: 'gloss', depth: 0.001, poly: band([[0.54, 0.83], [0.515, 0.74], [0.48, 0.66], [0.43, 0.622], [0.36, 0.612], [0, 0.61], [-0.36, 0.612], [-0.43, 0.622], [-0.48, 0.66], [-0.515, 0.74], [-0.54, 0.83]], 0.012) },
    // gloss-black strip across the boot lid joining the lamps, a chrome strip along its top
    { step: 0.005, mat: 'gloss', poly: [[-0.56, 0.925], [0.56, 0.925], [0.56, 0.96], [-0.56, 0.96]] },
    { step: 0.005, mat: 'chrome', poly: [[-0.56, 0.96], [0.56, 0.96], [0.56, 0.975], [-0.56, 0.975]], layer: 1 },
    // tail lamps: dark lenses with a Y of red light guides, a clear reversing lamp at the inner bottom
    { step: 0.005, depth: 0.002, mat: 'gloss', mirror: true, poly: [[0.545, 0.815], [0.53, 0.955], [0.6, 0.972], [0.73, 0.998], [0.76, 0.998], [0.765, 0.9], [0.758, 0.815]], layer: 1 },
    { step: 0.005, depth: 0.005, mat: 'tail', mirror: true, poly: [[0.55, 0.935], [0.64, 0.952], [0.73, 0.974], [0.755, 0.978], [0.755, 0.962], [0.73, 0.958], [0.64, 0.936], [0.55, 0.92]], layer: 2 },
    { step: 0.005, depth: 0.005, mat: 'tail', mirror: true, poly: [[0.622, 0.942], [0.665, 0.951], [0.75, 0.852], [0.717, 0.84]], layer: 3 },
    { step: 0.005, depth: 0.005, mat: 'tail', mirror: true, poly: [[0.685, 0.957], [0.72, 0.965], [0.756, 0.912], [0.755, 0.872]], layer: 3 },
    { step: 0.005, mat: 'silver', mirror: true, poly: [[0.555, 0.83], [0.63, 0.83], [0.6, 0.895], [0.553, 0.895]], layer: 2, depth: 0.004 },
    // black lower bumper
    { step: 0.005, mat: 'trim', poly: [[-0.64, 0.26], [0.64, 0.26], [0.7, 0.33], [0.71, 0.39], [-0.71, 0.39], [-0.7, 0.33]] },
  ],
  side: [
    // body-coloured door handles (the relief gives them a dark rim)
    { step: 0.005, mat: 'body', depth: 0.01, poly: [[0.437, 0.9], [0.495, 0.9], [0.495, 0.928], [0.437, 0.928]] },
    { step: 0.005, mat: 'body', depth: 0.01, poly: [[0.19, 0.926], [0.25, 0.926], [0.25, 0.954], [0.19, 0.954]] },
    // the headlamp wrapping back along the front wing, its light strip along the lower edge
    { step: 0.005, depth: 0.002, mat: 'gloss', poly: [[0.898, 0.828], [0.93, 0.826], [0.955, 0.808], [0.972, 0.77], [0.982, 0.725], [0.985, 0.69], [0.96, 0.684], [0.93, 0.694], [0.91, 0.76]] },
    { step: 0.005, depth: 0.004, mat: 'drl', layer: 1, poly: [[0.912, 0.75], [0.935, 0.705], [0.96, 0.697], [0.984, 0.7], [0.984, 0.714], [0.96, 0.711], [0.94, 0.719], [0.918, 0.762]] },
    // the tail lamp wrapping round onto the flank, its red guide along the top
    { step: 0.005, mat: 'gloss', poly: [[0.052, 0.995], [0.045, 1.012], [0.014, 1.012], [0.012, 0.815], [0.048, 0.815]] },
    { step: 0.005, depth: 0.005, mat: 'tail', layer: 1, poly: [[0.05, 0.99], [0.044, 1.003], [0.014, 1.003], [0.014, 0.989]] },
  ],
  plates: { front: 0.47, rear: 0.8 },
  mirrors: 'body',
  rimTone: 'dark',
  paint: '#213650', // Alluring Blue
  plate: 'MH 12 DZ 2026',
}

export const EXACT: CarSpec[] = [NEXON, PUNCH, CRETA, BREZZA, SWIFT, DZIRE]
