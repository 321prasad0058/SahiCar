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

/** Maruti Suzuki Fronx (2023). 3995 × 1765 × 1550 (over the roof rails), wheelbase 2520, 195/60 R16.
 *  Side profile from a levelled side photo of a dark blue car (1.573 m with rails and antenna); the photo's axles sit
 *  6 % too far apart (a close camera), so the axles are at the official wheelbase with the overhangs split as in the
 *  photo (0.414 : 0.586) and the arches, doors and handles were moved with them. */
export const FRONX: CarSpec = {
  id: 'maruti-fronx',
  name: 'Maruti Suzuki Fronx',
  rakedEnds: true,
  L: 3.995, W: 1.765, H: 1.55,
  axles: [0.1527, 0.7835],
  tyreR: 0.32, tyreW: 0.195, rim: 0.635, wheel: { style: 'swirl', spokes: 5 },
  archGap: 0.08, archSquare: 0.55,
  sill: [[0, 0.38], [0.008, 0.34], [0.02, 0.32], [0.04, 0.31], [0.08, 0.305], [0.15, 0.3], [0.22, 0.29], [0.3, 0.285], [0.5, 0.285], [0.65, 0.28], [0.72, 0.27], [0.8, 0.26], [0.9, 0.25], [0.95, 0.245], [0.98, 0.245], [0.995, 0.235], [1, 0.23]],
  // the short tail up to the light bar, the belt falling from the quarter glass to the mirror, then the bonnet
  top: [[0, 1.08], [0.008, 1.1], [0.02, 1.122], [0.03, 1.14], [0.06, 1.18], [0.09, 1.22], [0.115, 1.25], [0.13, 1.26], [0.145, 1.245], [0.16, 1.215], [0.175, 1.185], [0.19, 1.165], [0.21, 1.15], [0.24, 1.134], [0.39, 1.115], [0.54, 1.1], [0.66, 1.096], [0.7, 1.105], [0.72, 1.11], [0.75, 1.085], [0.8, 1.065], [0.85, 1.045], [0.9, 1.015], [0.94, 0.985], [0.97, 0.958], [0.985, 0.94], [0.995, 0.925], [1, 0.91]],
  // round in plan: both ends taper hard into the corners
  width: [[0, 0.7], [0.006, 0.8], [0.015, 0.88], [0.035, 0.94], [0.07, 0.975], [0.13, 0.995], [0.17, 1], [0.45, 0.99], [0.75, 1], [0.8, 0.995], [0.86, 0.985], [0.92, 0.955], [0.955, 0.91], [0.978, 0.84], [0.992, 0.77], [1, 0.72]],
  crown: 0.012,
  bulge: 0.035,
  // the crease from the DRL along the front wing, rising over the doors onto the rear haunch
  shoulder: { y: [[0, 1.02], [0.15, 1.02], [0.3, 0.99], [0.6, 0.95], [0.8, 0.93], [1, 0.92]], inset: 0.035 },
  // the Fronx's muscular arches: the body swells over the wheels and pinches in along the doors
  haunch: 0.06,
  bonnetRidge: 0.01,
  topRadius: 0.1,
  noseSweep: 0.3,
  tailSweep: 0.22,
  greenhouse: {
    u0: 0.03, u1: 0.715, tumble: 0.68,
    // the steep tailgate glass under the big roof spoiler, the coupe roof, then the long raked screen
    top: [[0.03, 1.14], [0.05, 1.2], [0.07, 1.255], [0.09, 1.3], [0.11, 1.33], [0.12, 1.37], [0.125, 1.4], [0.135, 1.425], [0.15, 1.442], [0.16, 1.452], [0.18, 1.468], [0.2, 1.48], [0.25, 1.502], [0.3, 1.512], [0.35, 1.524], [0.4, 1.53], [0.45, 1.527], [0.5, 1.515], [0.53, 1.5], [0.55, 1.48], [0.57, 1.45], [0.6, 1.39], [0.62, 1.35], [0.65, 1.29], [0.68, 1.225], [0.7, 1.18], [0.715, 1.15]],
  },
  // body-coloured roof: the dual-tone paints bring their own black roof (cars.json colours)
  roof: { u0: 0.135, u1: 0.54, black: false },
  pillars: [
    // black B-pillar, body-coloured A-pillar; the D-pillar is the body itself, rising round the quarter glass (a
    // thin raked black C-pillar decal saw-toothed on this glasshouse, and black on the dark glass it isn't missed)
    { bottom: [0.379, 0.43], top: [0.379, 0.43], black: true },
    { bottom: [0.69, 0.715], top: [0.54, 0.56], black: false },
  ],
  // squared black arch flares, joined by a band along the lower doors, black lower bumpers
  cladding: { top: [[0, 0.56], [0.02, 0.58], [0.04, 0.74], [0.08, 0.82], [0.133, 0.853], [0.181, 0.85], [0.221, 0.79], [0.243, 0.64], [0.256, 0.46], [0.27, 0.45], [0.5, 0.45], [0.66, 0.45], [0.672, 0.5], [0.688, 0.63], [0.705, 0.79], [0.745, 0.85], [0.803, 0.86], [0.87, 0.81], [0.903, 0.69], [0.92, 0.5], [0.94, 0.46], [1, 0.46]], flare: 0.1, cut: true },
  doors: [[0.177, 0.172], [0.41, 0.41], [0.674, 0.662]],
  front: [
    // the gloss-black slot grille under the bonnet edge, the chrome bar across the top of the main grille
    { step: 0.005, mat: 'gloss', poly: [[-0.42, 0.855], [0.42, 0.855], [0.46, 0.868], [0.45, 0.895], [-0.45, 0.895], [-0.46, 0.868]] },
    { step: 0.005, mat: 'mesh', layer: 1, poly: [[-0.4, 0.862], [0.4, 0.862], [0.43, 0.872], [0.42, 0.888], [-0.42, 0.888], [-0.43, 0.872]] },
    { step: 0.005, mat: 'chrome', layer: 2, poly: [[-0.47, 0.834], [0.47, 0.834], [0.5, 0.842], [0.535, 0.862], [0.53, 0.876], [0.495, 0.857], [0.465, 0.851], [-0.465, 0.851], [-0.495, 0.857], [-0.53, 0.876], [-0.535, 0.862], [-0.5, 0.842]] },
    // the NEXA three-block LED DRLs: a slim lamp under the bonnet edge, rising towards the corner
    { step: 0.005, mat: 'gloss', mirror: true, poly: [[0.52, 0.862], [0.6, 0.872], [0.655, 0.884], [0.665, 0.898], [0.66, 0.918], [0.6, 0.91], [0.53, 0.898], [0.515, 0.88]] },
    { step: 0.005, mat: 'drl', mirror: true, layer: 1, poly: [[0.535, 0.874], [0.572, 0.879], [0.572, 0.899], [0.535, 0.894]] },
    { step: 0.005, mat: 'drl', mirror: true, layer: 1, poly: [[0.582, 0.88], [0.617, 0.885], [0.617, 0.904], [0.582, 0.9]] },
    { step: 0.005, mat: 'drl', mirror: true, layer: 1, poly: [[0.627, 0.887], [0.65, 0.891], [0.65, 0.909], [0.627, 0.906]] },
    // the big gloss-black grille with its chunky 3D pattern
    { step: 0.005, mat: 'gloss', poly: [[-0.45, 0.834], [0.45, 0.834], [0.48, 0.81], [0.49, 0.77], [0.47, 0.72], [0.42, 0.64], [0.37, 0.57], [0.33, 0.55], [-0.33, 0.55], [-0.37, 0.57], [-0.42, 0.64], [-0.47, 0.72], [-0.49, 0.77], [-0.48, 0.81]] },
    { step: 0.005, mat: 'mesh', layer: 1, poly: [[-0.43, 0.824], [0.43, 0.824], [0.465, 0.8], [0.47, 0.77], [0.452, 0.725], [0.405, 0.648], [0.36, 0.578], [-0.36, 0.578], [-0.405, 0.648], [-0.452, 0.725], [-0.47, 0.77], [-0.465, 0.8]] },
    // the headlamps: three projectors in a black pod low in each bumper corner
    { step: 0.005, mat: 'gloss', mirror: true, poly: [[0.49, 0.65], [0.5, 0.625], [0.53, 0.607], [0.6, 0.6], [0.64, 0.605], [0.66, 0.625], [0.665, 0.72], [0.655, 0.75], [0.63, 0.765], [0.57, 0.765], [0.53, 0.745], [0.5, 0.69]] },
    { step: 0.004, mat: 'head', mirror: true, layer: 1, poly: [[0.589, 0.7132], [0.6012, 0.701], [0.6188, 0.701], [0.631, 0.7132], [0.631, 0.7308], [0.6188, 0.743], [0.6012, 0.743], [0.589, 0.7308]] },
    { step: 0.004, mat: 'head', mirror: true, layer: 1, poly: [[0.532, 0.6632], [0.5442, 0.651], [0.5618, 0.651], [0.574, 0.6632], [0.574, 0.6808], [0.5618, 0.693], [0.5442, 0.693], [0.532, 0.6808]] },
    { step: 0.004, mat: 'head', mirror: true, layer: 1, poly: [[0.601, 0.6482], [0.6132, 0.636], [0.6308, 0.636], [0.643, 0.6482], [0.643, 0.6658], [0.6308, 0.678], [0.6132, 0.678], [0.601, 0.6658]] },
    // black lower bumper with a wide slatted intake and the silver skid lip along the bottom
    { step: 0.005, mat: 'trim', poly: [[-0.6, 0.26], [0.6, 0.26], [0.65, 0.28], [0.68, 0.32], [0.68, 0.46], [0.48, 0.47], [-0.48, 0.47], [-0.68, 0.46], [-0.68, 0.32], [-0.65, 0.28]] },
    { step: 0.005, mat: 'slats', layer: 1, poly: [[-0.42, 0.36], [0.42, 0.36], [0.46, 0.45], [-0.46, 0.45]] },
    { step: 0.005, mat: 'satin', layer: 1, poly: [[-0.5, 0.278], [0.5, 0.278], [0.54, 0.281], [0.565, 0.29], [0.575, 0.303], [0.565, 0.316], [0.53, 0.325], [-0.53, 0.325], [-0.565, 0.316], [-0.575, 0.303], [-0.565, 0.29], [-0.54, 0.281]] },
  ],
  rear: [
    // the gloss-black band across the tailgate: the "7"-block lamps at the corners, the red light bar between
    { step: 0.005, mat: 'gloss', poly: [[-0.66, 0.985], [0.66, 0.985], [0.685, 0.995], [0.69, 1.06], [0.67, 1.08], [-0.67, 1.08], [-0.69, 1.06], [-0.685, 0.995]] },
    { step: 0.005, mat: 'tail', layer: 1, poly: [[-0.42, 1.048], [0.42, 1.048], [0.42, 1.062], [-0.42, 1.062]] },
    { step: 0.004, mat: 'tail', mirror: true, layer: 1, poly: [[0.44, 1.052], [0.44, 1.072], [0.51, 1.072], [0.51, 1.056], [0.47, 1], [0.444, 1], [0.482, 1.052]] },
    { step: 0.004, mat: 'tail', mirror: true, layer: 1, poly: [[0.52, 1.052], [0.52, 1.072], [0.59, 1.072], [0.59, 1.056], [0.55, 1], [0.524, 1], [0.562, 1.052]] },
    { step: 0.004, mat: 'tail', mirror: true, layer: 1, poly: [[0.6, 1.052], [0.6, 1.072], [0.67, 1.072], [0.67, 1.056], [0.63, 1], [0.604, 1], [0.642, 1.052]] },
    { step: 0.005, mat: 'head', mirror: true, layer: 1, poly: [[0.47, 0.99], [0.66, 0.99], [0.66, 1.003], [0.47, 1.003]] },
    // black lower bumper: the satin skid plate with its dark insert, a red line along its top, upright reflectors
    { step: 0.005, mat: 'trim', poly: [[-0.68, 0.33], [0.68, 0.33], [0.72, 0.38], [0.72, 0.6], [0.62, 0.62], [-0.62, 0.62], [-0.72, 0.6], [-0.72, 0.38]] },
    { step: 0.005, mat: 'satin', layer: 1, poly: [[-0.5, 0.36], [0.5, 0.36], [0.535, 0.372], [0.56, 0.392], [0.572, 0.43], [0.575, 0.525], [0.565, 0.545], [0.545, 0.55], [0.525, 0.53], [0.505, 0.495], [0.48, 0.48], [-0.48, 0.48], [-0.505, 0.495], [-0.525, 0.53], [-0.545, 0.55], [-0.565, 0.545], [-0.575, 0.525], [-0.572, 0.43], [-0.56, 0.392], [-0.535, 0.372]] },
    { step: 0.005, mat: 'trim', layer: 2, depth: 0.012, poly: [[-0.44, 0.385], [0.44, 0.385], [0.48, 0.4], [0.5, 0.43], [0.47, 0.455], [-0.47, 0.455], [-0.5, 0.43], [-0.48, 0.4]] },
    { step: 0.005, mat: 'reflector', layer: 2, poly: [[-0.48, 0.48], [0.48, 0.48], [0.53, 0.5], [0.56, 0.55], [0.545, 0.55], [0.52, 0.512], [0.48, 0.494], [-0.48, 0.494], [-0.52, 0.512], [-0.545, 0.55], [-0.56, 0.55], [-0.53, 0.5]] },
    { step: 0.005, mat: 'reflector', mirror: true, layer: 1, poly: [[0.665, 0.5], [0.69, 0.5], [0.69, 0.62], [0.665, 0.62]] },
  ],
  side: [
    // door handles, the rear one higher on the rising crease
    { step: 0.005, mat: 'gloss', poly: [[0.2, 0.985], [0.25, 0.985], [0.25, 1.015], [0.2, 1.015]] },
    { step: 0.005, mat: 'gloss', poly: [[0.425, 0.93], [0.475, 0.93], [0.475, 0.96], [0.425, 0.96]] },
    // the silver strip along the bottom of the door cladding
    { step: 0.005, mat: 'satin', poly: [[0.3, 0.29], [0.64, 0.29], [0.65, 0.293], [0.656, 0.3], [0.655, 0.31], [0.648, 0.317], [0.64, 0.319], [0.3, 0.319], [0.292, 0.316], [0.288, 0.305], [0.292, 0.294]] },
  ],
  plates: { front: 0.5, rear: 0.86 },
  rails: 'silver',
  spoiler: { len: 0.1, thick: 0.03, tilt: 0.12 },
  mirrors: 'body',
  rimTone: 'dark',
  paint: '#07204f', // NEXA Blue (Celestial)
  plate: 'MH 12 FX 2026',
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

type P2 = [number, number]
/** a rounded rectangle outline (z0…z1 × y0…y1, corner radius r), for lamp bowls and bezels */
const rrect = (z0: number, y0: number, z1: number, y1: number, r: number): P2[] => {
  const out: P2[] = []
  const c: [number, number, number][] = [[z1 - r, y0 + r, -Math.PI / 2], [z1 - r, y1 - r, 0], [z0 + r, y1 - r, Math.PI / 2], [z0 + r, y0 + r, Math.PI]]
  for (const [cz, cy, a0] of c) for (let k = 0; k <= 4; k++) { const a = a0 + (k / 4) * (Math.PI / 2); out.push([+(cz + r * Math.cos(a)).toFixed(4), +(cy + r * Math.sin(a)).toFixed(4)]) }
  return out
}
/** a U-shaped light guide (bottom and both sides) of thickness t round a lamp bowl */
const uGuide = (z0: number, y0: number, z1: number, y1: number, t: number): P2[] => [
  [z0 - t, y1], [z0 - t, y0 + 0.01], [z0 + 0.01 - t * 0.3, y0 - t], [z1 - 0.01 + t * 0.3, y0 - t], [z1 + t, y0 + 0.01], [z1 + t, y1],
  [z1, y1], [z1, y0 + 0.012], [z1 - 0.012, y0], [z0 + 0.012, y0], [z0, y0 + 0.012], [z0, y1],
]

/** Mahindra Scorpio-N (2022). 4662 × 1917 × 1857 (with roof rails), wheelbase 2750, 255/60 R18. Side from the
 *  official launch side view; lamps, grille and bumpers from the gallery's front, rear and close-up shots. */
export const SCORPIO_N: CarSpec = {
  id: 'mahindra-scorpio-n',
  name: 'Mahindra Scorpio-N',
  rakedEnds: true,
  dropSlivers: true,
  L: 4.662, W: 1.917, H: 1.857,
  axles: [0.2267, 0.8166],
  tyreR: 0.382, tyreW: 0.255, rim: 0.598, wheel: { style: 'split', spokes: 5 },
  archGap: 0.05, archSquare: 0.6,
  sill: [[0, 0.45], [0.01, 0.39], [0.02, 0.3], [0.03, 0.285], [0.05, 0.275], [0.1, 0.255], [0.14, 0.24], [0.32, 0.3], [0.35, 0.32], [0.38, 0.36], [0.41, 0.4], [0.53, 0.405], [0.6, 0.4], [0.65, 0.39], [0.68, 0.34], [0.71, 0.31], [0.92, 0.28], [0.94, 0.3], [0.96, 0.32], [0.97, 0.33], [0.98, 0.345], [0.99, 0.37], [1, 0.42]],
  // the bumper, then the tailgate raked in one straight line (a single plane, so the lamps on it don't fray) up to
  // the roof as the lamps climb the D-pillars; the belt falling gently to the mirror, then the long flat bonnet
  top: [[0, 0.62], [0.006, 0.7], [0.011, 0.76], [0.0135, 0.99], [0.0145, 1.0049], [0.016, 1.0271], [0.02, 1.0865], [0.025, 1.1608], [0.03, 1.235], [0.035, 1.3093], [0.04, 1.3835], [0.045, 1.4578], [0.05, 1.532], [0.055, 1.6063], [0.06, 1.6805], [0.062, 1.7102], [0.068, 1.6], [0.075, 1.41], [0.085, 1.3], [0.13, 1.29], [0.3, 1.28], [0.5, 1.25], [0.62, 1.225], [0.68, 1.215], [0.715, 1.24], [0.75, 1.215], [0.8, 1.2], [0.85, 1.18], [0.9, 1.142], [0.94, 1.11], [0.96, 1.09], [0.97, 1.075], [0.98, 1.062], [0.99, 1.05], [0.996, 1.04], [1, 1.0]],
  width: [[0, 0.8], [0.008, 0.88], [0.02, 0.935], [0.05, 0.975], [0.1, 0.995], [0.5, 1], [0.9, 0.995], [0.94, 0.98], [0.97, 0.95], [0.99, 0.89], [1, 0.82]],
  crown: 0.015,
  bulge: 0.012,
  shoulder: { y: [[0, 1.17], [0.5, 1.13], [1, 1.05]], inset: 0.02 },
  haunch: 0.03,
  bonnetRidge: 0.012,
  topRadius: 0.08,
  noseSweep: 0.2,
  tailSweep: 0.12,
  greenhouse: {
    u0: 0.062, u1: 0.715, tumble: 0.9,
    top: [[0.062, 1.71], [0.08, 1.725], [0.1, 1.728], [0.13, 1.765], [0.2, 1.785], [0.3, 1.79], [0.45, 1.79], [0.5, 1.78], [0.53, 1.76], [0.55, 1.725], [0.57, 1.69], [0.6, 1.625], [0.63, 1.53], [0.65, 1.465], [0.67, 1.39], [0.69, 1.32], [0.715, 1.24]],
  },
  roof: { u0: 0.062, u1: 0.53, black: false },
  pillars: [
    { bottom: [0.06, 0.128], top: [0.06, 0.147], black: false },
    { bottom: [0.24, 0.267], top: [0.245, 0.265], black: true },
    { bottom: [0.432, 0.476], top: [0.435, 0.47], black: true },
    { bottom: [0.64, 0.715], top: [0.528, 0.548], black: false },
  ],
  // thin squared black arch flares, the black band along the lower doors, black bumper corners
  cladding: { top: [[0, 0.62], [0.03, 0.62], [0.08, 0.68], [0.12, 0.74], [0.32, 0.74], [0.35, 0.72], [0.4, 0.7], [0.6, 0.69], [0.66, 0.69], [0.7, 0.66], [0.74, 0.5], [0.9, 0.45], [0.95, 0.43], [1, 0.42]], flare: 0.06, cut: true },
  doors: [[0.7, 0.705], [0.455, 0.455], [0.25, 0.24]],
  front: [
    // chrome bar along the bonnet edge, the dark grille with horizontal louvres and six vertical chrome slats
    { mat: 'chrome', poly: [[-0.57, 1.03], [0.57, 1.03], [0.58, 1.047], [-0.58, 1.047]], depth: 0.008, step: 0.005 },
    { mat: 'slats', poly: [[-0.545, 1.03], [0.545, 1.03], [0.51, 0.83], [0.48, 0.805], [-0.48, 0.805], [-0.51, 0.83]], layer: 1 },
    ...[-0.4, -0.265, -0.125, 0.125, 0.265, 0.4].map((z) => ({ mat: 'chrome' as const, poly: [[z - 0.014, 1.012], [z + 0.014, 1.012], [z + 0.01, 0.855], [z, 0.842], [z - 0.01, 0.855]] as P2[], layer: 3, depth: 0.022, step: 0.005 })),
    // headlamps: black housings with two projector bowls, each in a U-shaped DRL, an LED line along the bottom
    { mat: 'gloss', mirror: true, poly: [[0.555, 0.89], [0.63, 0.892], [0.72, 0.91], [0.8, 0.93], [0.835, 0.95], [0.848, 0.99], [0.83, 1.033], [0.8, 1.047], [0.555, 1.047]], layer: 1, step: 0.005 },
    { mat: 'chrome', mirror: true, poly: rrect(0.598, 0.93, 0.688, 1.018, 0.02), layer: 2, depth: 0.004, step: 0.005 },
    { mat: 'chrome', mirror: true, poly: rrect(0.722, 0.948, 0.81, 1.026, 0.02), layer: 2, depth: 0.004, step: 0.005 },
    { mat: 'head', mirror: true, poly: rrect(0.622, 0.952, 0.664, 0.996, 0.018), layer: 3, depth: 0.006, step: 0.005 },
    { mat: 'head', mirror: true, poly: rrect(0.745, 0.966, 0.787, 1.008, 0.018), layer: 3, depth: 0.006, step: 0.005 },
    { mat: 'drl', mirror: true, poly: uGuide(0.598, 0.93, 0.688, 1.0, 0.013), layer: 3, depth: 0.006, step: 0.005 },
    { mat: 'drl', mirror: true, poly: uGuide(0.722, 0.948, 0.81, 1.01, 0.013), layer: 3, depth: 0.006, step: 0.005 },
    { mat: 'drl', mirror: true, poly: [[0.6, 0.9], [0.72, 0.918], [0.8, 0.938], [0.8, 0.951], [0.72, 0.931], [0.6, 0.913]], layer: 2, depth: 0.005, step: 0.005 },
    // fog lamps in chrome bezels at the bumper corners, a slim LED chevron over the lens
    { mat: 'chrome', mirror: true, poly: rrect(0.585, 0.55, 0.825, 0.725, 0.025), layer: 1, depth: 0.008, step: 0.005 },
    { mat: 'gloss', mirror: true, poly: rrect(0.6, 0.565, 0.81, 0.71, 0.015), layer: 2, step: 0.005 },
    { mat: 'drl', mirror: true, poly: [[0.63, 0.664], [0.7, 0.668], [0.775, 0.684], [0.775, 0.697], [0.7, 0.681], [0.63, 0.677]], layer: 3, depth: 0.004, step: 0.005 },
    { mat: 'head', mirror: true, poly: rrect(0.66, 0.61, 0.73, 0.652, 0.015), layer: 3, depth: 0.005, step: 0.005 },
    // honeycomb lower grille with a dark centre block
    { mat: 'mesh', poly: [[-0.43, 0.706], [0.43, 0.706], [0.5, 0.617], [-0.5, 0.617]] },
    { mat: 'gloss', poly: [[-0.2, 0.645], [0.2, 0.645], [0.2, 0.68], [-0.2, 0.68]], layer: 1, step: 0.005 },
    // black lower bumper round the plate, the satin skid plate with three dark notches
    { mat: 'trim', poly: [[-0.84, 0.34], [0.84, 0.34], [0.84, 0.47], [0.62, 0.48], [0.52, 0.617], [-0.52, 0.617], [-0.62, 0.48], [-0.84, 0.47]] },
    { mat: 'satin', poly: [[-0.6, 0.37], [0.6, 0.37], [0.64, 0.378], [0.662, 0.4], [0.658, 0.432], [0.64, 0.445], [-0.64, 0.445], [-0.658, 0.432], [-0.662, 0.4], [-0.64, 0.378]], layer: 1, step: 0.005 },
    ...[[-0.46, -0.3], [-0.09, 0.09], [0.3, 0.46]].map(([a, b]) => ({ mat: 'trim' as const, poly: [[a, 0.385], [b, 0.385], [b - 0.01, 0.42], [a + 0.01, 0.42]] as P2[], layer: 2, step: 0.005 })),
  ],
  rear: [
    // tall tail lamps climbing the D-pillars, wider at the bottom, with a clear reversing strip
    { mat: 'tail', mirror: true, poly: [[0.625, 1.69], [0.71, 1.7], [0.73, 1.62], [0.755, 1.48], [0.78, 1.32], [0.81, 1.29], [0.825, 1.27], [0.825, 1.06], [0.81, 1.045], [0.7, 1.04], [0.688, 1.06], [0.685, 1.2], [0.655, 1.45], [0.632, 1.62]], step: 0.005 },
    { mat: 'head', mirror: true, poly: [[0.7, 1.09], [0.82, 1.09], [0.82, 1.106], [0.7, 1.106]], layer: 1, step: 0.005 },
    // the tailgate glass and the black band under it, the high stop lamp
    { mat: 'gloss', poly: [[-0.7, 1.23], [0.7, 1.23], [0.69, 1.4], [0.66, 1.55], [0.62, 1.66], [-0.62, 1.66], [-0.66, 1.55], [-0.69, 1.4]], step: 0.005 },
    { mat: 'tail', poly: [[-0.24, 1.672], [0.24, 1.672], [0.24, 1.686], [-0.24, 1.686]], step: 0.005 },
    // the black plate garnish (the badge plate on the spare-wheel-style tailgate); no logos
    { mat: 'gloss', poly: rrect(-0.33, 0.835, 0.33, 0.985, 0.03), depth: 0.008, step: 0.005 },
    // black bumper with a thin silver lip and reflector pods in chrome frames
    { mat: 'trim', poly: [[-0.88, 0.36], [0.88, 0.36], [0.88, 0.71], [-0.88, 0.71]] },
    { mat: 'satin', poly: [[-0.66, 0.4], [0.66, 0.4], [0.7, 0.415], [0.7, 0.43], [-0.7, 0.43], [-0.7, 0.415]], layer: 1, step: 0.005 },
    { mat: 'chrome', mirror: true, poly: rrect(0.62, 0.48, 0.81, 0.55, 0.012), layer: 1, depth: 0.006, step: 0.005 },
    { mat: 'reflector', mirror: true, poly: [[0.635, 0.493], [0.68, 0.493], [0.68, 0.537], [0.635, 0.537]], layer: 2, step: 0.005 },
    { mat: 'gloss', mirror: true, poly: [[0.69, 0.493], [0.797, 0.493], [0.797, 0.537], [0.69, 0.537]], layer: 2, step: 0.005 },
  ],
  side: [
    // the silver insert on the lower-door cladding, kicking up in front of the rear arch
    { mat: 'satin', poly: [[0.345, 0.55], [0.672, 0.55], [0.678, 0.553], [0.68, 0.56], [0.68, 0.6], [0.678, 0.607], [0.672, 0.61], [0.41, 0.625], [0.37, 0.655], [0.345, 0.66], [0.338, 0.655], [0.335, 0.62], [0.337, 0.56]] },
  ],
  plates: { front: 0.527, rear: 0.91 },
  rails: 'silver',
    sunroof: [0.4, 0.5],
  mirrors: 'body',
  windowChrome: true,
  paint: '#002b3d', // Oceanic (the deep teal-blue of the gallery photos, darkened for the studio lights)
  plate: 'MH 14 SN 2026',
}

/** Chaikin corner-cutting on a closed outline: rounds its corners (n passes) */
function smooth(poly: [number, number][], n = 2): [number, number][] {
  let p = poly
  for (let k = 0; k < n; k++) {
    const q: [number, number][] = []
    for (let i = 0; i < p.length; i++) {
      const a = p[i], b = p[(i + 1) % p.length]
      q.push([a[0] * 0.75 + b[0] * 0.25, a[1] * 0.75 + b[1] * 0.25], [a[0] * 0.25 + b[0] * 0.75, a[1] * 0.25 + b[1] * 0.75])
    }
    p = q
  }
  return p.map(([a, b]) => [+a.toFixed(4), +b.toFixed(4)] as [number, number])
}
/** a thin band along a side path given as [u, y]: offsets are taken in metres (u scaled by the car's length) */
function sideBand(path: [number, number][], w: number, L: number): [number, number][] {
  return band(path.map(([u, y]) => [u * L, y] as [number, number]), w).map(([x, y]) => [+(x / L).toFixed(5), +y.toFixed(4)] as [number, number])
}
// the Seltos's "tiger nose": a row of tall faceted teeth, each with a silver cap over a slimmer lower blade
const seltosTooth = (z: number): Decal[] => [
  { step: 0.005, mat: 'satin', layer: 2, depth: 0.012, poly: [[z - 0.012, 0.856], [z, 0.842], [z + 0.012, 0.856], [z + 0.012, 0.893], [z - 0.012, 0.893]] },
  { step: 0.005, mat: 'chrome', layer: 2, depth: 0.01, poly: [[z - 0.008, 0.745], [z + 0.008, 0.745], [z + 0.008, 0.8], [z, 0.812], [z - 0.008, 0.8]] },
]
const SELTOS_L = 4.46
/** a rounded rectangle outline (corner radius r, in the outline's own units) */
function rrectS(x0: number, y0: number, x1: number, y1: number, r: number): [number, number][] {
  const out: [number, number][] = []
  const c: [number, number, number][] = [[x1 - r, y0 + r, -Math.PI / 2], [x1 - r, y1 - r, 0], [x0 + r, y1 - r, Math.PI / 2], [x0 + r, y0 + r, Math.PI]]
  for (const [cx, cy, a0] of c) for (let i = 0; i <= 4; i++) { const a = a0 + (i / 4) * (Math.PI / 2); out.push([+(cx + r * Math.cos(a)).toFixed(4), +(cy + r * Math.sin(a)).toFixed(4)]) }
  return out
}

/** Kia Seltos (2026, 2nd gen). 4460 × 1830 × 1635, wheelbase 2690, 215/55 R18.
 *  Side profile from a levelled gallery side photo (roof 1.65 m over slim rails; the close camera spreads the axles by
 *  3.7 %, so the axles sit at the official wheelbase and the lower-body lines are mapped onto them). Belt, cladding and
 *  shut lines read off the cut-out's pixel columns; lamps, grille and bumpers from the straight front and rear photos. */
export const SELTOS: CarSpec = {
  id: 'kia-seltos',
  name: 'Kia Seltos',
  L: SELTOS_L, W: 1.83, H: 1.635,
  axles: [0.1924, 0.7955],
  tyreR: 0.347, tyreW: 0.215, rim: 0.659, wheel: { style: 'swirl', spokes: 5 }, rimTone: 'dark',
  archGap: 0.08, archSquare: 0.45,
  sill: [[0, 0.4], [0.007, 0.39], [0.02, 0.375], [0.035, 0.365], [0.06, 0.345], [0.08, 0.32], [0.1, 0.27], [0.3, 0.265], [0.6, 0.265], [0.7, 0.265], [0.88, 0.25], [0.92, 0.24], [0.95, 0.25], [0.975, 0.25], [0.99, 0.25], [1, 0.27]],
  // the upright tail up to the light bar, the belt sweeping up round the rear quarter glass (the body-coloured kick),
  // the flat belt along the doors, then the long bonnet that rolls down to the upright nose
  top: [[0, 0.96], [0.006, 1.08], [0.012, 1.15], [0.02, 1.2], [0.03, 1.21], [0.047, 1.215], [0.06, 1.24], [0.08, 1.3], [0.1, 1.355], [0.12, 1.375], [0.14, 1.37], [0.16, 1.348], [0.18, 1.31], [0.2, 1.275], [0.227, 1.235], [0.253, 1.205], [0.28, 1.198], [0.333, 1.192], [0.4, 1.186], [0.467, 1.174], [0.52, 1.169], [0.56, 1.163], [0.6, 1.153], [0.65, 1.15], [0.7, 1.165], [0.725, 1.178], [0.74, 1.172], [0.76, 1.158], [0.8, 1.138], [0.84, 1.116], [0.88, 1.098], [0.9, 1.081], [0.92, 1.063], [0.94, 1.036], [0.96, 1.004], [0.97, 0.985], [0.98, 0.962], [0.99, 0.945], [1, 0.93]],
  // square-ish in plan, but the corners round off hard at both ends
  width: [[0, 0.86], [0.006, 0.92], [0.02, 0.96], [0.05, 0.985], [0.1, 0.997], [0.5, 1], [0.88, 0.997], [0.93, 0.985], [0.96, 0.96], [0.985, 0.92], [1, 0.86]],
  crown: 0.015,
  bulge: 0.02,
  shoulder: { y: [[0, 1.05], [0.5, 1.03], [1, 1.0]], inset: 0.02 },
  haunch: 0.035,
  bonnetRidge: 0.01,
  topRadius: 0.1,
  noseSweep: 0.22,
  tailSweep: 0.14,
  greenhouse: {
    u0: 0.03, u1: 0.725, tumble: 0.78,
    // the tailgate glass leaning back under the long roof spoiler, the flat roof, the raked screen
    top: [[0.03, 1.21], [0.04, 1.25], [0.05, 1.3], [0.06, 1.36], [0.07, 1.43], [0.08, 1.5], [0.09, 1.55], [0.1, 1.575], [0.12, 1.59], [0.16, 1.605], [0.2, 1.613], [0.28, 1.622], [0.4, 1.63], [0.48, 1.63], [0.5, 1.622], [0.52, 1.607], [0.55, 1.57], [0.57, 1.535], [0.6, 1.48], [0.65, 1.378], [0.7, 1.25], [0.725, 1.178]],
  },
  roof: { u0: 0.1107, u1: 0.5283, black: false },
  pillars: [
    // black C-pillar between the rear door and quarter glass (it leans forward at the top), B- and A-pillars
    { bottom: [0.222, 0.245], top: [0.252, 0.268], black: true },
    { bottom: [0.415, 0.437], top: [0.415, 0.437], black: true },
    { bottom: [0.7, 0.725], top: [0.552, 0.567], black: true },
  ],
  // squared black arch flares, a black band along the lower doors under the silver skirt, black bumper corners
  cladding: { top: [[0, 0.74], [0.02, 0.7], [0.04, 0.58], [0.06, 0.55], [0.072, 0.6], [0.085, 0.81], [0.106, 0.86], [0.127, 0.89], [0.148, 0.92], [0.17, 0.935], [0.191, 0.937], [0.21, 0.93], [0.236, 0.913], [0.261, 0.87], [0.287, 0.79], [0.297, 0.63], [0.31, 0.6], [0.4, 0.604], [0.52, 0.598], [0.56, 0.592], [0.596, 0.57], [0.63, 0.52], [0.66, 0.47], [0.688, 0.46], [0.698, 0.6], [0.705, 0.8], [0.724, 0.85], [0.75, 0.9], [0.776, 0.925], [0.802, 0.925], [0.83, 0.907], [0.859, 0.877], [0.887, 0.818], [0.905, 0.78], [0.915, 0.63], [0.93, 0.58], [1, 0.56]], flare: 0.13, cut: true },
  doors: [[0.689, 0.693], [0.4446, 0.4446], [0.227, 0.2145]],
  front: [
    // gloss-black band across the face: the square headlamps at its ends, the tiger-nose teeth between them
    { step: 0.005, mat: 'gloss', poly: both([[0, 0.652], [0.45, 0.654], [0.62, 0.662], [0.7, 0.676], [0.74, 0.697], [0.755, 0.722], [0.76, 0.76], [0.76, 0.9], [0.755, 0.918], [0.74, 0.928], [0.6, 0.928], [0.3, 0.914], [0, 0.91]]) },
    ...[-8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8].flatMap((k) => seltosTooth(k * 0.07)),
    { step: 0.005, mat: 'mesh', layer: 1, poly: both([[0, 0.665], [0.55, 0.668], [0.62, 0.676], [0.62, 0.72], [0, 0.72]]) },
    // headlamps: dark lens, an L of light along the top and outer edge, three thin vertical guides, the projector strip
    { step: 0.005, mat: 'gloss', layer: 1, mirror: true, depth: 0.004, poly: smooth([[0.6, 0.745], [0.75, 0.745], [0.75, 0.922], [0.6, 0.922]], 1) },
    { step: 0.005, mat: 'drl', layer: 2, mirror: true, poly: [[0.728, 0.77], [0.742, 0.77], [0.742, 0.914], [0.615, 0.914], [0.615, 0.9], [0.728, 0.9]] },
    ...[0.645, 0.675, 0.705].map((z): Decal => ({ step: 0.005, mat: 'drl', layer: 2, mirror: true, poly: [[z - 0.006, 0.815], [z + 0.006, 0.815], [z + 0.006, 0.885], [z - 0.006, 0.885]] })),
    { step: 0.005, mat: 'head', layer: 2, mirror: true, poly: [[0.62, 0.762], [0.72, 0.762], [0.72, 0.784], [0.62, 0.784]] },
    // black lower bumper, the satin pods round the fog lamps, the slatted lower grille and the satin skid plate
    { step: 0.005, mat: 'trim', poly: both([[0, 0.265], [0.6, 0.265], [0.72, 0.285], [0.77, 0.32], [0.785, 0.4], [0.785, 0.55], [0.75, 0.57], [0.6, 0.566], [0, 0.563]]) },
    { step: 0.005, mat: 'satin', layer: 1, mirror: true, poly: rrectS(0.6, 0.315, 0.775, 0.545, 0.035) },
    { step: 0.005, mat: 'gloss', layer: 2, mirror: true, depth: 0.004, poly: rrectS(0.635, 0.35, 0.765, 0.505, 0.025) },
    { step: 0.005, mat: 'silver', layer: 3, mirror: true, poly: smooth([[0.66, 0.36], [0.74, 0.36], [0.74, 0.385], [0.66, 0.385]], 1) },
    { step: 0.005, mat: 'slats', layer: 1, poly: smooth([[-0.555, 0.345], [0.555, 0.345], [0.555, 0.46], [-0.555, 0.46]], 1) },
    { step: 0.005, mat: 'satin', layer: 2, poly: smooth(both([[0, 0.27], [0.6, 0.27], [0.65, 0.285], [0.665, 0.31], [0.64, 0.33], [0.55, 0.325], [0, 0.325]]), 2) },
  ],
  rear: [
    // the full-width light bar along the top of the tailgate, brighter segments either side of the camera
    { step: 0.005, mat: 'gloss', poly: [[-0.76, 1.14], [0.76, 1.14], [0.765, 1.186], [-0.765, 1.186]] },
    { step: 0.005, mat: 'tail', layer: 1, poly: [[-0.74, 1.156], [0.74, 1.156], [0.74, 1.169], [-0.74, 1.169]] },
    { step: 0.005, mat: 'tail', layer: 2, mirror: true, poly: [[0.12, 1.15], [0.26, 1.153], [0.26, 1.172], [0.12, 1.172]] },
    // the boomerang lamps down the corners: a red bar down the outer edge, a wedge at the bottom
    { step: 0.005, mat: 'gloss', layer: 1, mirror: true, depth: 0.004, poly: [[0.696, 1.14], [0.765, 1.14], [0.765, 0.815], [0.75, 0.798], [0.64, 0.872], [0.66, 0.9], [0.696, 1.09]] },
    { step: 0.005, mat: 'tail', layer: 2, mirror: true, poly: [[0.665, 0.875], [0.73, 0.835], [0.73, 0.85], [0.68, 0.882]] },
    // the tailgate's lower shut line, dipping from the lamps to run straight across
    { step: 0.005, mat: 'gloss', depth: 0.001, poly: band([[-0.645, 0.815], [-0.6, 0.758], [-0.5, 0.752], [0, 0.75], [0.5, 0.752], [0.6, 0.758], [0.645, 0.815]], 0.012) },
    // black lower bumper with a gloss plate recess, satin pods with twin red reflectors, the grey skid bar
    { step: 0.005, mat: 'trim', poly: both([[0, 0.38], [0.76, 0.38], [0.785, 0.42], [0.785, 0.7], [0.74, 0.722], [0.6, 0.73], [0.55, 0.745], [0, 0.745]]) },
    { step: 0.005, mat: 'gloss', layer: 1, depth: 0.004, poly: smooth([[-0.37, 0.52], [0.37, 0.52], [0.38, 0.74], [-0.38, 0.74]], 1) },
    { step: 0.005, mat: 'satin', layer: 1, mirror: true, poly: rrectS(0.575, 0.45, 0.775, 0.72, 0.035) },
    { step: 0.005, mat: 'gloss', layer: 2, mirror: true, depth: 0.004, poly: rrectS(0.615, 0.48, 0.765, 0.69, 0.025) },
    { step: 0.005, mat: 'reflector', layer: 3, mirror: true, poly: [[0.655, 0.5], [0.672, 0.5], [0.672, 0.655], [0.655, 0.655]] },
    { step: 0.005, mat: 'reflector', layer: 3, mirror: true, poly: [[0.685, 0.5], [0.702, 0.5], [0.702, 0.655], [0.685, 0.655]] },
    { step: 0.005, mat: 'satin', layer: 2, poly: band([[-0.6, 0.52], [-0.58, 0.465], [-0.5, 0.44], [0, 0.44], [0.5, 0.44], [0.58, 0.465], [0.6, 0.52]], 0.03) },
    { step: 0.005, mat: 'satin', layer: 2, mirror: true, poly: smooth([[0.28, 0.395], [0.5, 0.395], [0.5, 0.418], [0.28, 0.418]], 1) },
  ],
  side: [
    // the star-map DRL: a light bar down the front corner, turning back along the bonnet's edge, on a black strip
    { step: 0.005, mat: 'gloss', depth: 0.004, poly: sideBand([[0.877, 1.05], [0.925, 1.03], [0.934, 1.015], [0.941, 0.8], [0.947, 0.655]], 0.05, SELTOS_L) },
    { step: 0.005, mat: 'drl', layer: 1, poly: sideBand([[0.88, 1.052], [0.925, 1.034], [0.933, 1.02], [0.94, 0.8], [0.945, 0.665]], 0.018, SELTOS_L) },
    // the tail lamp wrapping round the corner: a black wedge with the red bar at the back and along the top
    { step: 0.005, mat: 'gloss', depth: 0.004, poly: [[0.018, 0.79], [0.04, 0.79], [0.06, 0.95], [0.084, 1.13], [0.084, 1.185], [0.018, 1.19]] },
    { step: 0.005, mat: 'tail', layer: 1, poly: [[0.022, 0.81], [0.035, 0.81], [0.035, 1.155], [0.022, 1.155]] },
    { step: 0.005, mat: 'tail', layer: 1, poly: [[0.022, 1.157], [0.078, 1.162], [0.078, 1.175], [0.022, 1.172]] },
    // the satin skirt on the black band along the doors, and the body-coloured flush door handles
    { step: 0.005, mat: 'satin', poly: smooth([[0.315, 0.395], [0.6, 0.39], [0.645, 0.425], [0.635, 0.47], [0.5, 0.485], [0.355, 0.495], [0.33, 0.49], [0.315, 0.47]], 3) },
    { step: 0.005, mat: 'body', depth: 0.01, poly: smooth([[0.4565, 0.99], [0.5017, 0.99], [0.5017, 1.02], [0.4565, 1.02]], 1) },
    { step: 0.005, mat: 'body', depth: 0.01, poly: smooth([[0.2492, 1.015], [0.2934, 1.015], [0.2934, 1.045], [0.2492, 1.045]], 1) },
  ],
  plates: { front: 0.58, rear: 0.66 },
  rails: 'black',
  spoiler: { len: 0.2, thick: 0.045, tilt: 0.2 },
  sunroof: [0.16, 0.46],
  mirrors: 'black',
  paint: '#9fa89c', // the light sage of the reference photos, darkened for the studio lights
  plate: 'MH 12 KS 2026',
}

const THAR_L = 4.428
/** a circle outline (many points, so round lamps stay round) */
const tharCircle = (zc: number, yc: number, r: number, n = 48): P2[] =>
  Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return [+(zc + r * Math.cos(a)).toFixed(4), +(yc + r * Math.sin(a)).toFixed(4)] as P2 })
/** an open ring (C shape) of width w round (zc, yc), radius r, leaving a gap of ±gap rad round angle `at` */
const tharC = (zc: number, yc: number, r: number, w: number, at: number, gap: number): P2[] => {
  const n = 40, path: P2[] = []
  for (let i = 0; i <= n; i++) { const a = at + gap + ((Math.PI * 2 - 2 * gap) * i) / n; path.push([zc + r * Math.cos(a), yc + r * Math.sin(a)]) }
  return band(path, w).map(([z, y]) => [+z.toFixed(4), +y.toFixed(4)] as P2)
}
/** a side outline from a rounded rectangle given in u (0…1) and metres */
const tharRectU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  rrectS(u0 * THAR_L, y0, u1 * THAR_L, y1, r).map(([x, y]) => [+(x / THAR_L).toFixed(5), y] as P2)
// the six-slot grille: each slot a tall upper and a short lower mesh panel between body-coloured bars
const tharSlots: Decal[] = [-0.309, -0.185, -0.0625, 0.0625, 0.185, 0.309].flatMap((z): Decal[] => [
  { step: 0.005, mat: 'mesh', depth: 0.003, poly: rrect(z - 0.042, 0.866, z + 0.042, 1.006, 0.01) },
  { step: 0.005, mat: 'mesh', depth: 0.003, poly: rrect(z - 0.042, 0.752, z + 0.042, 0.846, 0.01) },
])

/** Mahindra Thar Roxx (2024, 5-door). 4428 × 1870 × 1923 (length over the spare wheel), wheelbase 2850, 255/60 R19.
 *  Side profile from a levelled gallery side photo (roof 1.866 m against the official 1.923); axles at the official
 *  wheelbase, overhangs split as in the photo. Lamps, grille and bumpers from the straight front and rear photos and
 *  close-ups. Black hard top, body-coloured door frames, black squared flares, spare wheel on the tailgate. */
export const THAR_ROXX: CarSpec = {
  id: 'mahindra-thar-roxx',
  name: 'Mahindra Thar Roxx',
  rakedEnds: true,
  dropSlivers: true,
  L: THAR_L, W: 1.87, H: 1.923,
  axles: [0.204, 0.8476],
  tyreR: 0.394, tyreW: 0.255, rim: 0.612, wheel: { style: 'split', spokes: 5 },
  archGap: 0.04, archSquare: 0.6,
  // the rear bumper's lower face slopes in under the spare wheel; the body sits high, flat between the wheels
  sill: [[0, 0.69], [0.01, 0.62], [0.02, 0.5], [0.026, 0.455], [0.04, 0.45], [0.058, 0.43], [0.075, 0.4], [0.1, 0.39], [0.13, 0.38], [0.28, 0.31], [0.33, 0.29], [0.5, 0.29], [0.65, 0.295], [0.7, 0.3], [0.75, 0.32], [0.93, 0.35], [0.95, 0.385], [0.97, 0.4], [0.985, 0.42], [0.995, 0.45], [1, 0.5]],
  // the rear bumper under the spare, the upright tail face up to the belt, the flat belt, the flat bonnet and the
  // upright grille face, then the front bumper standing proud of it
  top: [[0, 0.745], [0.05, 0.745], [0.054, 0.76], [0.0565, 0.95], [0.059, 1.2], [0.062, 1.236], [0.1, 1.236], [0.2, 1.226], [0.3, 1.215], [0.4, 1.207], [0.5, 1.2], [0.6, 1.205], [0.672, 1.222], [0.7, 1.21], [0.75, 1.198], [0.8, 1.187], [0.84, 1.17], [0.88, 1.149], [0.9, 1.132], [0.92, 1.1], [0.935, 1.075], [0.94, 1.07], [0.944, 1.068], [0.946, 1.064], [0.9475, 0.95], [0.949, 0.8], [0.952, 0.745], [0.956, 0.715], [0.99, 0.71], [0.996, 0.7], [1, 0.67]],
  // boxy: straight flanks, the tail and nose faces only slightly rounded at the corners; both bumpers wider
  width: [[0, 0.82], [0.008, 0.9], [0.02, 0.935], [0.05, 0.945], [0.055, 0.94], [0.058, 0.9], [0.062, 0.905], [0.075, 0.915], [0.1, 0.92], [0.5, 0.92], [0.9, 0.92], [0.93, 0.915], [0.94, 0.905], [0.947, 0.89], [0.951, 0.93], [0.96, 0.945], [0.985, 0.94], [0.995, 0.9], [1, 0.84]],
  crown: 0.01,
  bulge: 0.004,
  topRadius: 0.06,
  noseSweep: 0.03,
  tailSweep: 0.03,
  greenhouse: {
    u0: 0.062, u1: 0.672, tumble: 0.94,
    // the hard top: upright rear face, a long roof falling gently to the near-upright windscreen
    top: [[0.062, 1.236], [0.064, 1.4], [0.066, 1.55], [0.069, 1.68], [0.073, 1.76], [0.078, 1.81], [0.085, 1.835], [0.095, 1.846], [0.11, 1.855], [0.13, 1.864], [0.2, 1.866], [0.27, 1.866], [0.35, 1.857], [0.4, 1.85], [0.45, 1.834], [0.5, 1.808], [0.55, 1.775], [0.59, 1.748], [0.605, 1.738], [0.615, 1.728], [0.621, 1.712], [0.626, 1.67], [0.63, 1.625], [0.64, 1.515], [0.65, 1.41], [0.66, 1.306], [0.672, 1.225]],
  },
  // the black hard top (the rear glass in its upright back face stays glass)
  roof: { u0: 0.07487, u1: 0.6214, black: true },
  pillars: [
    // the body-coloured C-pillar of the rear door frame (the dark quarter glass behind it), the black divider in the
    // rear door glass, the body-coloured B- and A-pillars (the door frames are body colour)
    { bottom: [0.1348, 0.2605], top: [0.243, 0.2605], black: false },
    { bottom: [0.31, 0.3165], top: [0.31, 0.3165], black: true },
    { bottom: [0.407, 0.457], top: [0.407, 0.457], black: false },
    { bottom: [0.6054, 0.662], top: [0.6054, 0.6175], black: false },
  ],
  // black bumpers (their tops too), black side steps along the doors, big squared flares standing 7.5 cm proud
  cladding: { top: [[0, 0.8], [0.05, 0.8], [0.055, 0.745], [0.1, 0.735], [0.115, 0.6], [0.14, 0.42], [0.2, 0.4], [0.7, 0.4], [0.73, 0.45], [0.93, 0.55], [0.944, 0.7], [0.953, 0.7], [0.956, 0.8], [1, 0.8]], flare: 0.17, flareOut: 0.075, flareU: [0.06, 0.944], cut: true, cover: true },
  doors: [[0.659, 0.659], [0.436, 0.436], [0.4228, 0.4228], [0.2255, 0.2255]],
  front: [
    ...tharSlots,
    // round headlamps in raised body-coloured pods: dark lens, C-shaped LED ring open towards the grille, projector
    { step: 0.005, mat: 'body', mirror: true, depth: 0.018, poly: tharCircle(0.483, 0.95, 0.105) },
    { step: 0.005, mat: 'gloss', mirror: true, layer: 1, depth: 0.022, poly: tharCircle(0.483, 0.95, 0.09) },
    { step: 0.005, mat: 'drl', mirror: true, layer: 2, depth: 0.024, poly: tharC(0.483, 0.95, 0.078, 0.022, Math.PI, 0.5) },
    { step: 0.005, mat: 'head', mirror: true, layer: 2, depth: 0.024, poly: rrect(0.448, 0.933, 0.518, 0.967, 0.01) },
    // the slim LED lamps in the front wings, outboard of the headlamps
    { step: 0.005, mat: 'gloss', mirror: true, depth: 0.012, poly: rrect(0.665, 0.875, 0.775, 0.955, 0.012) },
    { step: 0.005, mat: 'drl', mirror: true, layer: 1, depth: 0.013, poly: rrect(0.68, 0.902, 0.76, 0.928, 0.006) },
    // black bumper with its satin-grey centre round the plate and round fog lamps in the black ends
    { step: 0.005, mat: 'satin', depth: 0.005, poly: smooth(rrect(-0.53, 0.47, 0.53, 0.675, 0.035), 1) },
    { step: 0.005, mat: 'gloss', mirror: true, depth: 0.006, poly: tharCircle(0.7, 0.585, 0.058) },
    { step: 0.005, mat: 'head', mirror: true, layer: 1, depth: 0.008, poly: tharCircle(0.7, 0.585, 0.032) },
  ],
  rear: [
    // C-shaped tail lamps: a black box, a thick red frame, dark inner panes with the lit upper pane and amber bar
    { step: 0.005, mat: 'gloss', mirror: true, depth: 0.022, poly: rrect(0.615, 0.825, 0.815, 1.075, 0.02) },
    { step: 0.005, mat: 'tail', mirror: true, layer: 1, depth: 0.024, poly: rrect(0.64, 0.835, 0.805, 1.065, 0.016) },
    { step: 0.005, mat: 'gloss', mirror: true, layer: 2, depth: 0.024, poly: rrect(0.665, 0.857, 0.785, 1.043, 0.008) },
    { step: 0.005, mat: 'tail', mirror: true, layer: 3, depth: 0.024, poly: rrect(0.678, 0.975, 0.772, 1.032, 0.005) },
    { step: 0.005, mat: 'amber', mirror: true, layer: 3, depth: 0.024, poly: rrect(0.675, 0.946, 0.775, 0.962, 0.004) },
    { step: 0.005, mat: 'head', mirror: true, layer: 3, depth: 0.024, poly: rrect(0.712, 0.872, 0.738, 0.93, 0.004) },
    // the side-hinged tailgate's shut lines and its handle
    { step: 0.005, mat: 'gloss', mirror: true, depth: 0.001, poly: [[0.579, 0.66], [0.592, 0.66], [0.592, 1.222], [0.579, 1.222]] },
    { step: 0.005, mat: 'gloss', depth: 0.02, poly: rrect(-0.485, 0.855, -0.445, 1.06, 0.015) },
    // black bumper: the tailgate's body colour down to the satin-grey centre, red reflectors in the black ends
    { step: 0.005, mat: 'body', poly: rrect(-0.565, 0.645, 0.565, 0.735, 0.01) },
    { step: 0.005, mat: 'satin', poly: rrect(-0.575, 0.455, 0.575, 0.64, 0.025) },
    { step: 0.005, mat: 'reflector', mirror: true, poly: rrect(0.655, 0.575, 0.785, 0.635, 0.008) },
  ],
  side: [
    // the body-coloured window frames along the tops of both doors
    { step: 0.005, mat: 'body', poly: [[0.2605, 1.645], [0.6054, 1.645], [0.6054, 1.66], [0.6, 1.666], [0.55, 1.7], [0.5, 1.733], [0.45, 1.759], [0.4, 1.775], [0.35, 1.781], [0.3, 1.787], [0.2605, 1.79]] },
    // shut lines between the door frames
    { step: 0.005, mat: 'gloss', depth: 0.001, poly: [[0.4292, 1.21], [0.432, 1.21], [0.432, 1.765], [0.4292, 1.765]] },
    { step: 0.005, mat: 'gloss', depth: 0.001, poly: sideBand([[0.2255, 1.2], [0.2255, 1.68], [0.2285, 1.72], [0.236, 1.745]], 0.012, THAR_L) },
    // door handles: a dark recess on the front door, the upright handle on the rear door's C-pillar
    { step: 0.005, mat: 'gloss', poly: tharRectU(0.4575, 0.986, 0.4995, 1.033, 0.012) },
    { step: 0.005, mat: 'body', layer: 1, depth: 0.014, poly: tharRectU(0.2275, 1.26, 0.2385, 1.42, 0.012) },
    // the grey top edge of the side step
    { step: 0.005, mat: 'satin', poly: tharRectU(0.31, 0.384, 0.705, 0.4, 0.006) },
  ],
  plates: { front: 0.58, rear: 0.52 },
  spare: { y: 1.065 },
  mirrors: 'black',
  paint: '#cdd0d2', // Everest White, toned down for the studio lights
  plate: 'MH 12 TR 2026',
}

export const EXACT: CarSpec[] = [NEXON, PUNCH, CRETA, BREZZA, SWIFT, FRONX, DZIRE, SCORPIO_N, SELTOS, THAR_ROXX]
