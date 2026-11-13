// Exact models traced from studio side, front and rear views of the current model, scaled to the official
// length and wheelbase (overhangs split in the photo's proportion). Heights in metres; u runs 0 (tail) … 1 (nose);
// front/rear decal x is across the width (−1 … 1). Each car is checked side by side against its photos.
import type { CarSpec, Decal } from './build'

/** Tata Nexon (Sept 2023 facelift). 3995 × 1804 × 1620 (with roof rails), wheelbase 2498, 215/60 R16.
 *  Side profile from a levelled gallery side photo (tyre bottoms hidden in grass were patched; roof 1.63 m over the
 *  rails, the photo's axles 3 % too far apart, so the axles sit at the official wheelbase with the overhangs split as
 *  in the photo). Belt, shoulder, cladding and shut lines read off a metric grid of the levelled cut-out; the split
 *  headlamps, light bar, grilles and skid plate from a straight front photo; the Y-shaped tail lamps and the rear
 *  bumper from the rear three-quarters and close-ups. */
export const NEXON: CarSpec = {
  id: 'tata-nexon',
  name: 'Tata Nexon',
  L: 3.995, W: 1.804, H: 1.62,
  axles: [0.1768, 0.8021],
  tyreR: 0.332, tyreW: 0.215, rim: 0.612, wheel: { style: 'swirl', spokes: 5 }, rimTone: 'dark',
  archGap: 0.08, archSquare: 0.3,
  sill: [[0, 0.38], [0.01, 0.37], [0.02, 0.36], [0.03, 0.35], [0.04, 0.34], [0.06, 0.315], [0.08, 0.3], [0.27, 0.285], [0.67, 0.285], [0.9, 0.29], [0.93, 0.296], [0.95, 0.302], [0.97, 0.305], [0.985, 0.3], [1, 0.31]],
  // the tail up to the light bar, the belt rising gently to the rear under the black C-pillar, the sail at the
  // mirror, then the bonnet falling to the light bar along its leading edge
  top: [[0, 1.17], [0.005, 1.19], [0.012, 1.2], [0.02, 1.2], [0.1, 1.2], [0.2, 1.197], [0.26, 1.19], [0.3, 1.177], [0.44, 1.143], [0.5, 1.121], [0.6, 1.088], [0.65, 1.075], [0.7, 1.078], [0.73, 1.098], [0.755, 1.122], [0.78, 1.112], [0.8, 1.109], [0.82, 1.102], [0.84, 1.094], [0.86, 1.086], [0.88, 1.074], [0.9, 1.061], [0.92, 1.039], [0.94, 1.017], [0.95, 1.0], [0.96, 0.986], [0.97, 0.976], [0.98, 0.969], [0.99, 0.965], [1, 0.962]],
  // rounded corners in plan at both ends
  width: [[0, 0.86], [0.006, 0.91], [0.02, 0.955], [0.05, 0.982], [0.1, 0.997], [0.5, 1], [0.9, 0.995], [0.94, 0.98], [0.97, 0.955], [0.99, 0.915], [1, 0.88]],
  crown: 0.015,
  bulge: 0.03,
  // the sharp crease rising from the front door to the tail lamp
  shoulder: { y: [[0, 1.04], [0.25, 0.99], [0.7, 0.87], [1, 0.9]], inset: 0.03 },
  haunch: 0.05,
  bonnetRidge: 0.012,
  topRadius: 0.12,
  noseSweep: 0.26,
  tailSweep: 0.2,
  greenhouse: {
    u0: 0.02, u1: 0.755, tumble: 0.66,
    // the raked tailgate glass under the big roof spoiler, the roof falling gently to the rear, the raked screen
    top: [[0.02, 1.2], [0.03, 1.228], [0.04, 1.258], [0.05, 1.29], [0.06, 1.36], [0.065, 1.45], [0.07, 1.47], [0.09, 1.48], [0.13, 1.49], [0.16, 1.513], [0.2, 1.535], [0.25, 1.545], [0.3, 1.557], [0.35, 1.567], [0.4, 1.573], [0.45, 1.57], [0.5, 1.555], [0.53, 1.538], [0.55, 1.52], [0.58, 1.4875], [0.6, 1.45], [0.62, 1.409], [0.65, 1.353], [0.68, 1.293], [0.7, 1.255], [0.72, 1.214], [0.74, 1.155], [0.755, 1.122]],
  },
  roof: { u0: 0.0601, u1: 0.5319, black: false },
  pillars: [
    // the wide body-coloured C-pillar behind a black quarter-glass divider (black on the dual-tone paints), the
    // B-pillar and the A-pillar
    { bottom: [0.02, 0.202], top: [0.0601, 0.21], black: false },
    { bottom: [0.202, 0.224], top: [0.21, 0.226], black: true },
    { bottom: [0.425, 0.445], top: [0.415, 0.445], black: true },
    { bottom: [0.735, 0.755], top: [0.532, 0.548], black: true },
  ],
  // black arch flares, the black sill along the doors, the black bumper corners
  cladding: { top: [[0, 0.86], [0.022, 0.86], [0.04, 0.64], [0.06, 0.6], [0.08, 0.55], [0.12, 0.42], [0.3, 0.4], [0.66, 0.4], [0.7, 0.42], [0.9, 0.45], [0.94, 0.48], [0.96, 0.6], [0.975, 0.83], [1, 0.83]], flare: 0.075, cut: true },
  doors: [[0.69, 0.705], [0.437, 0.441], [0.197, 0.186]],
  front: [
    // the bonnet's leading edge: a gloss-black band carrying the full-width LED light bar, brighter towards the ends
    { step: 0.005, mat: 'gloss', poly: both([[0, 0.866], [0.45, 0.868], [0.62, 0.875], [0.69, 0.886], [0.725, 0.9], [0.73, 0.925], [0.7, 0.94], [0.45, 0.95], [0, 0.95]]) },
    { step: 0.005, mat: 'drl', layer: 1, poly: both([[0, 0.932], [0.45, 0.932], [0.68, 0.926], [0.71, 0.92], [0.712, 0.927], [0.71, 0.932], [0.68, 0.938], [0.45, 0.944], [0, 0.944]]) },
    { step: 0.005, mat: 'drl', layer: 2, mirror: true, poly: [[0.43, 0.931], [0.68, 0.925], [0.705, 0.92], [0.712, 0.927], [0.705, 0.934], [0.68, 0.94], [0.43, 0.946]] },
    // the black lower face: the headlamp pods at the corners, the slatted upper grille between them
    { step: 0.005, mat: 'trim', poly: both([[0, 0.31], [0.55, 0.31], [0.66, 0.33], [0.73, 0.37], [0.75, 0.45], [0.75, 0.83], [0.68, 0.84], [0.61, 0.815], [0.56, 0.74], [0.5, 0.728], [0, 0.728]]) },
    { step: 0.005, mat: 'gloss', layer: 1, mirror: true, depth: 0.004, poly: smooth([[0.57, 0.66], [0.74, 0.66], [0.745, 0.825], [0.68, 0.835], [0.59, 0.81], [0.57, 0.78]], 1) },
    { step: 0.005, mat: 'head', layer: 2, mirror: true, poly: rrectS(0.635, 0.738, 0.715, 0.798, 0.012) },
    { step: 0.005, mat: 'head', layer: 2, mirror: true, poly: rrectS(0.63, 0.68, 0.71, 0.708, 0.008) },
    { step: 0.005, mat: 'slats', layer: 1, poly: both([[0, 0.645], [0.5, 0.645], [0.45, 0.715], [0, 0.715]]) },
    // body-coloured fangs in the bumper corners, the honeycomb lower grille, the satin skid plate
    { step: 0.005, mat: 'body', layer: 2, mirror: true, depth: 0.01, poly: [[0.49, 0.615], [0.5, 0.622], [0.64, 0.642], [0.652, 0.636], [0.722, 0.515], [0.718, 0.505], [0.618, 0.437], [0.608, 0.44]] },
    { step: 0.005, mat: 'mesh', layer: 1, poly: both([[0, 0.395], [0.42, 0.395], [0.5, 0.42], [0.53, 0.52], [0, 0.52]]) },
    { step: 0.005, mat: 'satin', layer: 1, poly: smooth(both([[0, 0.35], [0.48, 0.35], [0.53, 0.358], [0.545, 0.375], [0.53, 0.392], [0.48, 0.4], [0, 0.4]]), 2) },
  ],
  rear: [
    // the connected light bar under the tailgate glass, splitting into a Y at each corner
    { step: 0.005, mat: 'gloss', depth: 0.004, poly: both([[0, 1.125], [0.46, 1.122], [0.6, 1.098], [0.74, 1.03], [0.76, 1.035], [0.765, 1.165], [0.745, 1.18], [0.65, 1.172], [0.58, 1.16], [0, 1.158]]) },
    { step: 0.005, mat: 'tail', layer: 1, poly: [[-0.6, 1.136], [0.6, 1.136], [0.6, 1.148], [-0.6, 1.148]] },
    { step: 0.005, mat: 'tail', layer: 1, mirror: true, poly: [[0.58, 1.137], [0.75, 1.142], [0.755, 1.17], [0.66, 1.162], [0.58, 1.149]] },
    { step: 0.005, mat: 'tail', layer: 1, mirror: true, poly: [[0.48, 1.118], [0.6, 1.106], [0.75, 1.068], [0.755, 1.042], [0.7, 1.05], [0.6, 1.094], [0.48, 1.108]] },
    // the tailgate's shut line round the body-coloured panel
    { step: 0.005, mat: 'gloss', depth: 0.001, poly: band([[-0.62, 1.095], [-0.62, 0.83], [-0.58, 0.795], [0, 0.79], [0.58, 0.795], [0.62, 0.83], [0.62, 1.095]], 0.012) },
    // black bumper rising round the corner lamps, body-coloured fangs, the satin skid plate
    { step: 0.005, mat: 'trim', poly: both([[0, 0.4], [0.62, 0.4], [0.72, 0.43], [0.755, 0.5], [0.76, 0.87], [0.72, 0.875], [0.67, 0.85], [0.64, 0.8], [0.58, 0.785], [0, 0.785]]) },
    { step: 0.005, mat: 'reflector', layer: 1, mirror: true, poly: rrectS(0.665, 0.7, 0.735, 0.84, 0.012) },
    { step: 0.005, mat: 'body', layer: 1, mirror: true, depth: 0.01, poly: [[0.45, 0.677], [0.458, 0.685], [0.672, 0.685], [0.68, 0.678], [0.716, 0.583], [0.71, 0.575], [0.518, 0.575], [0.51, 0.582]] },
    { step: 0.005, mat: 'satin', layer: 1, poly: smooth(both([[0, 0.45], [0.52, 0.45], [0.575, 0.465], [0.585, 0.49], [0.47, 0.555], [0, 0.56]]), 1) },
  ],
  side: [
    // the tail lamp wrapping onto the flank: the upper bar and the lower wedge of the Y in a black housing
    { step: 0.005, mat: 'gloss', depth: 0.004, poly: [[0.004, 1.02], [0.03, 1.03], [0.06, 1.14], [0.066, 1.175], [0.004, 1.178]] },
    { step: 0.005, mat: 'tail', layer: 1, poly: [[0.006, 1.152], [0.06, 1.155], [0.062, 1.168], [0.006, 1.168]] },
    { step: 0.005, mat: 'tail', layer: 1, poly: [[0.008, 1.035], [0.03, 1.042], [0.05, 1.075], [0.008, 1.075]] },
    // body-coloured door handles
    { step: 0.005, mat: 'body', depth: 0.01, poly: smooth([[0.457, 0.94], [0.513, 0.94], [0.513, 0.975], [0.457, 0.975]], 1) },
    { step: 0.005, mat: 'body', depth: 0.01, poly: smooth([[0.205, 1.045], [0.26, 1.045], [0.26, 1.08], [0.205, 1.08]], 1) },
  ],
  plates: { front: 0.57, rear: 0.645 },
  rails: 'black',
  sunroof: [0.35, 0.47],
  mirrors: 'black',
  paint: '#071a45', // Royal Blue, darkened for the studio lights
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
    // black lower bumper: a slatted intake, the silver skid plate, the lower grille and lip
    { mat: 'trim', poly: [[-0.72, 0.3], [0.72, 0.3], [0.72, 0.5], [0.6, 0.7], [-0.6, 0.7], [-0.72, 0.5]] },
    { mat: 'trim', poly: [[-0.25, 0.6], [0.25, 0.6], [0.25, 0.7], [-0.25, 0.7]] },
    { mat: 'slats', poly: [[-0.52, 0.635], [0.52, 0.635], [0.55, 0.69], [-0.55, 0.69]], layer: 1 },
    { mat: 'satin', poly: [[-0.5, 0.47], [0.5, 0.47], [0.545, 0.48], [0.56, 0.5], [0.52, 0.6], [0.5, 0.618], [0.47, 0.625], [-0.47, 0.625], [-0.5, 0.618], [-0.52, 0.6], [-0.56, 0.5], [-0.545, 0.48]], layer: 1, step: 0.005 },
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
  tyreR: 0.347, tyreW: 0.215, rim: 0.659, wheel: { style: 'blade', spokes: 5 },
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

// one of the facelift grille's three chrome bars: slim across the middle, a flared blade at each end
const balenoBar = (y: number, hw: number): Decal => ({
  step: 0.004, mat: 'chrome', layer: 2, depth: 0.01,
  poly: both([[0, y], [hw - 0.1, y], [hw - 0.03, y - 0.003], [hw + 0.006, y - 0.002], [hw + 0.016, y + 0.008], [hw + 0.006, y + 0.02], [hw - 0.03, y + 0.019], [hw - 0.1, y + 0.012], [0, y + 0.012]]),
})
// one of the three L-shaped DRL elements along the headlamp's lower edge: a short upright at its inner end
const balenoDrl = (z: number, y: number): Decal => ({
  step: 0.004, mat: 'drl', mirror: true, layer: 2, depth: 0.004,
  poly: [[z, y], [z + 0.046, y + 0.003], [z + 0.046, y + 0.014], [z + 0.013, y + 0.012], [z + 0.016, y + 0.032], [z + 0.004, y + 0.032]],
})

/** Maruti Suzuki Baleno (2026 facelift of the 2022 3rd gen). 3990 × 1745 × 1530, wheelbase 2520, 195/55 R16.
 *  Side profile from a levelled gallery side photo (roof 1.50 m with the shark-fin); the photo's axles sit 2 % too far
 *  apart, so the axles are at the official wheelbase with the overhangs split as in the photo. Belt, pillars, doors and
 *  lamps read off a metric grid of the levelled photo; tail lamps from a straight rear photo; the facelift's three-bar
 *  grille, headlamps and black lower bumper from a straight front photo and a front three-quarter. */
export const BALENO: CarSpec = {
  id: 'maruti-baleno',
  name: 'Maruti Suzuki Baleno',
  rakedEnds: true,
  L: 3.99, W: 1.745, H: 1.53,
  axles: [0.1629, 0.7945],
  tyreR: 0.31, tyreW: 0.195, rim: 0.655, wheel: { style: 'swirl', spokes: 5 },
  archGap: 0.06, archSquare: 0.15,
  sill: [[0, 0.42], [0.006, 0.34], [0.015, 0.285], [0.03, 0.267], [0.05, 0.247], [0.08, 0.23], [0.12, 0.22], [0.2, 0.222], [0.3, 0.22], [0.5, 0.22], [0.6, 0.205], [0.7, 0.18], [0.75, 0.17], [0.85, 0.157], [0.9, 0.153], [0.93, 0.161], [0.95, 0.171], [0.97, 0.187], [0.985, 0.203], [0.995, 0.235], [1, 0.28]],
  // the tail rounding up to the lamps, the belt rising round the quarter glass, falling along the doors to the
  // mirror, then the long bonnet curving down to the nose
  top: [[0, 0.8], [0.004, 0.95], [0.01, 1.05], [0.018, 1.09], [0.025, 1.095], [0.05, 1.13], [0.08, 1.19], [0.11, 1.225], [0.13, 1.235], [0.15, 1.2], [0.16, 1.155], [0.168, 1.115], [0.2, 1.1], [0.3, 1.073], [0.4, 1.05], [0.5, 1.022], [0.6, 0.993], [0.7, 0.98], [0.73, 0.99], [0.76, 1.025], [0.78, 1.009], [0.8, 0.997], [0.82, 0.979], [0.85, 0.953], [0.88, 0.928], [0.9, 0.91], [0.92, 0.891], [0.94, 0.865], [0.96, 0.865], [0.975, 0.858], [0.985, 0.852], [0.993, 0.845], [1, 0.83]],
  // round in plan: both ends taper hard into the corners
  width: [[0, 0.7], [0.005, 0.79], [0.015, 0.875], [0.035, 0.935], [0.07, 0.972], [0.13, 0.995], [0.17, 1], [0.45, 0.99], [0.8, 0.995], [0.86, 0.99], [0.92, 0.965], [0.955, 0.93], [0.972, 0.89], [0.986, 0.845], [0.996, 0.805], [1, 0.79]],
  crown: 0.02,
  bulge: 0.04,
  // the crease from the headlamp along the doors, rising over the handles onto the rear haunch
  shoulder: { y: [[0, 1.0], [0.2, 0.975], [0.5, 0.935], [0.8, 0.9], [1, 0.86]], inset: 0.035 },
  haunch: 0.06,
  topRadius: 0.1,
  noseSweep: 0.26,
  tailSweep: 0.3,
  greenhouse: {
    u0: 0.025, u1: 0.76, tumble: 0.62,
    // the raked tailgate glass under the roof spoiler, a long gently domed roof, then the raked windscreen
    top: [[0.025, 1.095], [0.04, 1.135], [0.06, 1.19], [0.08, 1.24], [0.1, 1.28], [0.12, 1.33], [0.13, 1.36], [0.14, 1.385], [0.15, 1.4], [0.2, 1.425], [0.25, 1.445], [0.3, 1.46], [0.35, 1.47], [0.4, 1.475], [0.45, 1.472], [0.5, 1.458], [0.55, 1.436], [0.57, 1.424], [0.6, 1.385], [0.62, 1.347], [0.65, 1.288], [0.68, 1.224], [0.7, 1.181], [0.72, 1.133], [0.74, 1.09], [0.76, 1.03]],
  },
  roof: { u0: 0.1212, u1: 0.5593, black: false },
  pillars: [
    // body-coloured C-pillar round the pointed quarter glass, a black divider, the black B-pillar, body A-pillar
    { bottom: [0.218, 0.228], top: [0.218, 0.228], black: true },
    { bottom: [0.386, 0.421], top: [0.386, 0.421], black: true },
    { bottom: [0.7, 0.76], top: [0.555, 0.572], black: false },
  ],
  doors: [[0.274, 0.215], [0.425, 0.42], [0.694, 0.69]],
  windowChrome: true,
  front: [
    // the wide gloss-black grille under the bonnet edge, narrowing downwards, its 3D pattern and three chrome bars
    { step: 0.004, mat: 'gloss', poly: both([[0, 0.495], [0.4, 0.495], [0.43, 0.512], [0.465, 0.59], [0.5, 0.655], [0.53, 0.695], [0.55, 0.73], [0.545, 0.762], [0, 0.768]]) },
    { step: 0.004, mat: 'mesh', layer: 1, poly: both([[0, 0.51], [0.39, 0.51], [0.45, 0.59], [0.485, 0.655], [0.515, 0.7], [0.525, 0.745], [0, 0.752]]) },
    balenoBar(0.69, 0.52), balenoBar(0.595, 0.46), balenoBar(0.5, 0.405),
    // big swept headlamps from the grille's top corners, rising back along the bonnet edge: a dark housing, the
    // projector lens high on the outside, a chrome eyebrow and three L-shaped DRLs along the lower edge
    { step: 0.004, mat: 'gloss', mirror: true, depth: 0.004, poly: [[0.535, 0.712], [0.55, 0.69], [0.58, 0.668], [0.63, 0.658], [0.7, 0.654], [0.75, 0.656], [0.775, 0.668], [0.79, 0.7], [0.785, 0.75], [0.78, 0.8], [0.765, 0.822], [0.74, 0.815], [0.7, 0.8], [0.64, 0.778], [0.58, 0.756], [0.548, 0.74]] },
    { step: 0.004, mat: 'head', mirror: true, layer: 1, depth: 0.006, poly: [[0.685, 0.738], [0.69, 0.726], [0.7, 0.721], [0.71, 0.726], [0.715, 0.738], [0.71, 0.75], [0.7, 0.755], [0.69, 0.75]] },
    balenoDrl(0.575, 0.672), balenoDrl(0.635, 0.666), balenoDrl(0.7, 0.664),
    // the black lower bumper: a wide band under the grille carrying the plate, its ends sweeping out to the fog lamps
    { step: 0.004, mat: 'trim', poly: both([[0, 0.285], [0.38, 0.285], [0.46, 0.3], [0.54, 0.322], [0.62, 0.318], [0.69, 0.33], [0.72, 0.36], [0.72, 0.4], [0.69, 0.42], [0.55, 0.45], [0.44, 0.478], [0.4, 0.485], [0, 0.485]]) },
    { step: 0.004, mat: 'slats', layer: 1, depth: 0.004, poly: both([[0, 0.297], [0.36, 0.297], [0.41, 0.31], [0.36, 0.33], [0, 0.33]]) },
    { step: 0.004, mat: 'silver', mirror: true, layer: 1, depth: 0.008, poly: [[0.62, 0.345], [0.69, 0.345], [0.7, 0.355], [0.7, 0.378], [0.69, 0.388], [0.62, 0.388], [0.61, 0.378], [0.61, 0.355]] },
    // the black lip under the bumper
    { step: 0.005, mat: 'trim', poly: both([[0, 0.2], [0.55, 0.2], [0.62, 0.225], [0.6, 0.245], [0, 0.245]]) },
  ],
  rear: [
    // the chrome strip across the tailgate under the glass
    { step: 0.004, mat: 'chrome', depth: 0.006, poly: both([[0, 1.072], [0.5, 1.072], [0.55, 1.076], [0.56, 1.084], [0.55, 1.09], [0, 1.09]]) },
    // C-shaped tail lamps: a red frame round a clear reversing panel, the lower arm running in across the tailgate
    { step: 0.004, mat: 'gloss', mirror: true, depth: 0.004, poly: [[0.34, 0.925], [0.36, 0.905], [0.45, 0.898], [0.55, 0.892], [0.65, 0.882], [0.7, 0.878], [0.722, 0.89], [0.725, 1.05], [0.71, 1.066], [0.6, 1.068], [0.55, 1.064], [0.53, 1.045], [0.525, 0.952], [0.45, 0.948], [0.36, 0.942]] },
    { step: 0.004, mat: 'tail', mirror: true, layer: 1, poly: [[0.545, 1.04], [0.56, 1.052], [0.6, 1.055], [0.705, 1.054], [0.716, 1.042], [0.716, 0.97], [0.7, 0.962], [0.54, 0.965], [0.54, 0.978], [0.69, 0.976], [0.702, 0.982], [0.702, 1.035], [0.695, 1.04], [0.56, 1.04]] },
    { step: 0.004, mat: 'silver', mirror: true, layer: 1, depth: 0.008, poly: [[0.552, 0.992], [0.56, 0.984], [0.684, 0.982], [0.692, 0.99], [0.692, 1.022], [0.684, 1.03], [0.56, 1.03], [0.552, 1.022]] },
    { step: 0.004, mat: 'tail', mirror: true, layer: 1, poly: [[0.36, 0.926], [0.375, 0.912], [0.45, 0.908], [0.55, 0.902], [0.65, 0.893], [0.7, 0.89], [0.712, 0.9], [0.712, 0.948], [0.53, 0.95], [0.45, 0.937], [0.375, 0.934]] },
    // the tailgate's shut line under the lamps, round the bottom of the panel
    { step: 0.005, mat: 'gloss', depth: 0.001, poly: band([[-0.4, 0.9], [-0.38, 0.86], [-0.3, 0.832], [0, 0.825], [0.3, 0.832], [0.38, 0.86], [0.4, 0.9]], 0.012) },
    // reflectors in the bumper corners, the black lip along the bottom
    { step: 0.004, mat: 'reflector', mirror: true, poly: [[0.55, 0.668], [0.7, 0.665], [0.71, 0.676], [0.7, 0.705], [0.55, 0.708], [0.545, 0.69]] },
    { step: 0.005, mat: 'trim', poly: both([[0, 0.32], [0.6, 0.32], [0.68, 0.34], [0.69, 0.37], [0, 0.37]]) },
  ],
  side: [
    // chrome door handles, the rear one higher on the rising belt
    { step: 0.004, mat: 'chrome', depth: 0.01, poly: [[0.43, 0.887], [0.494, 0.887], [0.494, 0.915], [0.43, 0.915]] },
    { step: 0.004, mat: 'chrome', depth: 0.01, poly: [[0.196, 0.928], [0.254, 0.928], [0.254, 0.956], [0.196, 0.956]] },
    // the tail lamp wrapping round onto the flank, narrowing forwards
    { step: 0.004, mat: 'gloss', depth: 0.004, poly: [[0.085, 1.035], [0.07, 1.056], [0.04, 1.066], [0.014, 1.066], [0.01, 0.91], [0.025, 0.912], [0.05, 0.952], [0.072, 0.995], [0.087, 1.02]] },
    { step: 0.004, mat: 'tail', layer: 1, poly: [[0.08, 1.036], [0.068, 1.05], [0.04, 1.058], [0.014, 1.058], [0.014, 1.044], [0.04, 1.044], [0.062, 1.037], [0.075, 1.024]] },
  ],
  plates: { front: 0.435, rear: 0.6 },
  mirrors: 'body',
  paint: '#04294f', // Nexa Blue (Celestial)
  plate: 'MH 12 BL 2026',
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

/** Hyundai Venue (2025, 2nd gen). 3995 × 1800 × 1665 (over the roof rails), wheelbase 2520, 215/60 R16.
 *  Side profile from a levelled gallery side photo (1.675 m measured; the close camera spreads the axles by 3 %, so the
 *  axles sit at the official wheelbase with the overhangs split as in the photo and the arch cladding, shut lines and
 *  handles mapped onto them). Dark paint: belt, cladding and the silver door strip read off the cut-out's pixel columns.
 *  Lamps, grille and skid plates from the straight front and rear photos and the close-ups. */
const VENUE_L = 3.995
const venueU = (x0: number, y0: number, x1: number, y1: number, r: number): P2[] =>
  rrectS(x0 * VENUE_L, y0, x1 * VENUE_L, y1, r).map(([x, y]) => [+(x / VENUE_L).toFixed(5), y] as P2)
export const VENUE: CarSpec = {
  id: 'hyundai-venue',
  name: 'Hyundai Venue',
  rakedEnds: true,
  dropSlivers: true,
  L: VENUE_L, W: 1.8, H: 1.665,
  axles: [0.1786, 0.8093],
  tyreR: 0.332, tyreW: 0.215, rim: 0.612, wheel: { style: 'blade', spokes: 5 },
  archGap: 0.065, archSquare: 0.5,
  sill: [[0, 0.34], [0.01, 0.35], [0.02, 0.355], [0.04, 0.335], [0.06, 0.31], [0.08, 0.3], [0.12, 0.29], [0.27, 0.245], [0.5, 0.235], [0.72, 0.225], [0.88, 0.22], [0.93, 0.205], [0.96, 0.215], [0.98, 0.235], [0.99, 0.245], [1, 0.26]],
  // the raked tailgate up to the light bar, the belt kicking up under the quarter glass, the long flat bonnet and the
  // upright nose face with the light bar along the bonnet's leading edge
  top: [[0, 0.66], [0.005, 0.84], [0.01, 0.97], [0.015, 1.06], [0.02, 1.12], [0.027, 1.17], [0.035, 1.21], [0.05, 1.235], [0.1, 1.245], [0.14, 1.235], [0.17, 1.205], [0.2, 1.18], [0.25, 1.165], [0.35, 1.155], [0.5, 1.14], [0.6, 1.13], [0.7, 1.11], [0.725, 1.1], [0.75, 1.085], [0.8, 1.072], [0.85, 1.055], [0.9, 1.032], [0.93, 1.008], [0.95, 0.982], [0.96, 0.973], [0.97, 0.968], [0.98, 0.967], [0.99, 0.966], [1, 0.965]],
  width: [[0, 0.84], [0.008, 0.9], [0.025, 0.955], [0.06, 0.98], [0.12, 0.996], [0.5, 1], [0.88, 0.995], [0.93, 0.98], [0.965, 0.955], [0.985, 0.91], [1, 0.86]],
  crown: 0.015,
  bulge: 0.012,
  // the crease through the door handles, rising towards the tail lamps
  shoulder: { y: [[0, 1.04], [0.3, 1.0], [0.7, 0.955], [1, 0.93]], inset: 0.022 },
  haunch: 0.03,
  bonnetRidge: 0.01,
  topRadius: 0.09,
  noseSweep: 0.18,
  tailSweep: 0.11,
  greenhouse: {
    u0: 0.035, u1: 0.725, tumble: 0.78,
    // the raked tailgate glass under the long roof spoiler, a flat roof, a fairly upright screen
    top: [[0.035, 1.215], [0.04, 1.245], [0.05, 1.305], [0.06, 1.365], [0.07, 1.425], [0.08, 1.478], [0.09, 1.522], [0.1, 1.552], [0.115, 1.575], [0.13, 1.588], [0.16, 1.6], [0.2, 1.607], [0.3, 1.612], [0.4, 1.613], [0.47, 1.61], [0.5, 1.602], [0.52, 1.592], [0.54, 1.575], [0.56, 1.548], [0.58, 1.51], [0.6, 1.462], [0.62, 1.41], [0.64, 1.358], [0.66, 1.303], [0.68, 1.248], [0.7, 1.19], [0.725, 1.12]],
  },
  roof: { u0: 0.1009, u1: 0.53, black: false },
  pillars: [
    { bottom: [0.232, 0.248], top: [0.245, 0.258], black: true },
    { bottom: [0.418, 0.448], top: [0.412, 0.445], black: true },
  ],
  // squared black arch flares joined along the lower doors, black bumper ends
  cladding: { top: [[0, 0.62], [0.02, 0.66], [0.05, 0.71], [0.085, 0.8], [0.109, 0.872], [0.16, 0.868], [0.208, 0.868], [0.237, 0.85], [0.26, 0.82], [0.267, 0.7], [0.276, 0.56], [0.3, 0.55], [0.67, 0.55], [0.684, 0.65], [0.694, 0.78], [0.742, 0.815], [0.791, 0.82], [0.835, 0.82], [0.888, 0.77], [0.923, 0.69], [0.95, 0.6], [0.97, 0.54], [1, 0.5]], flare: 0.13, cut: true },
  doors: [[0.193, 0.193], [0.445, 0.448], [0.694, 0.705]],
  front: [
    // the full-width light bar along the bonnet's leading edge: a thin DRL between the two lamp heads
    { step: 0.005, mat: 'gloss', poly: rrect(-0.715, 0.885, 0.715, 0.95, 0.014) },
    { step: 0.005, mat: 'drl', layer: 1, depth: 0.004, poly: [[-0.505, 0.906], [0.505, 0.906], [0.505, 0.92], [-0.505, 0.92]] },
    { step: 0.005, mat: 'drl', layer: 1, mirror: true, depth: 0.004, poly: [[0.515, 0.928], [0.703, 0.928], [0.703, 0.943], [0.515, 0.943]] },
    { step: 0.005, mat: 'head', layer: 1, mirror: true, poly: [[0.53, 0.895], [0.698, 0.895], [0.698, 0.92], [0.53, 0.92]] },
    // the dark grille: three rows of boxes in silver frames
    { step: 0.005, mat: 'gloss', poly: [[-0.508, 0.62], [0.508, 0.62], [0.508, 0.812], [-0.508, 0.812]] },
    { step: 0.005, mat: 'slats', layer: 1, poly: [[-0.495, 0.632], [0.495, 0.632], [0.495, 0.8], [-0.495, 0.8]] },
    ...[0.632, 0.688, 0.744, 0.8].map((y): Decal => ({ step: 0.005, mat: 'silver', layer: 2, depth: 0.008, poly: [[-0.495, y - 0.007], [0.495, y - 0.007], [0.495, y + 0.007], [-0.495, y + 0.007]] })),
    ...[-0.305, -0.102, 0.102, 0.305].map((z): Decal => ({ step: 0.005, mat: 'silver', layer: 2, depth: 0.008, poly: [[z - 0.007, 0.632], [z + 0.007, 0.632], [z + 0.007, 0.8], [z - 0.007, 0.8]] })),
    // tall headlamps at the corners: an L-shaped light guide down the outer edge and along the foot, quad LEDs inside
    { step: 0.005, mat: 'gloss', mirror: true, poly: smooth([[0.514, 0.6], [0.6, 0.567], [0.73, 0.567], [0.73, 0.836], [0.514, 0.836]], 1) },
    { step: 0.005, mat: 'drl', mirror: true, layer: 1, poly: [[0.69, 0.828], [0.722, 0.828], [0.722, 0.578], [0.61, 0.578], [0.69, 0.612]] },
    { step: 0.005, mat: 'head', mirror: true, layer: 1, poly: rrect(0.535, 0.745, 0.675, 0.81, 0.008) },
    { step: 0.005, mat: 'head', mirror: true, layer: 1, poly: rrect(0.535, 0.665, 0.675, 0.728, 0.008) },
    // black lower bumper; the silver skid plate rising under the grille, black pods, the lower grille
    { step: 0.005, mat: 'trim', poly: [[-0.76, 0.26], [0.76, 0.26], [0.76, 0.6], [0.6, 0.567], [0.514, 0.6], [0.514, 0.62], [-0.514, 0.62], [-0.514, 0.6], [-0.6, 0.567], [-0.76, 0.6]] },
    { step: 0.005, mat: 'satin', layer: 1, poly: smooth(both([[0, 0.3], [0.68, 0.3], [0.73, 0.33], [0.745, 0.38], [0.748, 0.515], [0.515, 0.616], [0, 0.616]]), 2) },
    { step: 0.005, mat: 'gloss', layer: 2, depth: 0.012, mirror: true, poly: rrect(0.423, 0.345, 0.523, 0.565, 0.012) },
    { step: 0.005, mat: 'gloss', layer: 2, depth: 0.012, poly: rrect(-0.39, 0.39, 0.39, 0.487, 0.008) },
    { step: 0.005, mat: 'slats', layer: 3, depth: 0.016, poly: rrect(-0.37, 0.4, -0.03, 0.477, 0.006) },
    { step: 0.005, mat: 'slats', layer: 3, depth: 0.016, poly: rrect(0.03, 0.4, 0.37, 0.477, 0.006) },
  ],
  rear: [
    // the light bar across the tailgate: a red line over the full width, lamp blocks at both ends
    { step: 0.005, mat: 'gloss', layer: 1, depth: 0.008, poly: rrect(-0.72, 1.039, 0.72, 1.122, 0.01) },
    { step: 0.005, mat: 'tail', layer: 2, poly: [[-0.712, 1.098], [0.712, 1.098], [0.712, 1.113], [-0.712, 1.113]] },
    { step: 0.005, mat: 'tail', layer: 2, mirror: true, poly: [[0.59, 1.048], [0.712, 1.048], [0.712, 1.09], [0.59, 1.09]] },
    { step: 0.005, mat: 'tail', layer: 2, mirror: true, poly: [[0.505, 1.05], [0.575, 1.05], [0.575, 1.085], [0.505, 1.085]] },
    { step: 0.005, mat: 'tail', layer: 2, mirror: true, poly: [[0.425, 1.05], [0.49, 1.05], [0.49, 1.085], [0.425, 1.085]] },
    // black lower tailgate edge and bumper, the corner housings with the vertical L-shaped lamps
    { step: 0.005, mat: 'trim', poly: [[-0.73, 0.385], [0.73, 0.385], [0.73, 0.76], [-0.73, 0.76]] },
    { step: 0.005, mat: 'gloss', poly: [[-0.58, 0.758], [0.58, 0.758], [0.58, 0.848], [-0.58, 0.848]] },
    { step: 0.005, mat: 'gloss', mirror: true, poly: rrect(0.455, 0.566, 0.728, 0.848, 0.01) },
    { step: 0.005, mat: 'tail', layer: 1, mirror: true, poly: [[0.66, 0.836], [0.718, 0.836], [0.718, 0.627], [0.602, 0.627], [0.66, 0.69]] },
    { step: 0.005, mat: 'gloss', layer: 1, poly: [[-0.325, 0.613], [0.325, 0.613], [0.325, 0.758], [-0.325, 0.758]] },
    // the silver skid plate wrapping round the plate recess, with tall black pods holding the reversing lamps
    { step: 0.005, mat: 'satin', layer: 1, poly: smooth(both([[0, 0.39], [0.67, 0.39], [0.708, 0.405], [0.72, 0.44], [0.72, 0.555], [0.36, 0.685], [0.325, 0.685], [0.325, 0.613], [0, 0.613]]), 2) },
    { step: 0.005, mat: 'gloss', layer: 2, mirror: true, poly: rrect(0.371, 0.42, 0.464, 0.63, 0.01) },
    { step: 0.005, mat: 'silver', layer: 3, mirror: true, poly: rrect(0.387, 0.44, 0.448, 0.505, 0.008) },
  ],
  side: [
    // the silver strip on the black lower doors
    { mat: 'satin', poly: smooth([[0.285, 0.41], [0.69, 0.392], [0.7, 0.4], [0.69, 0.45], [0.55, 0.488], [0.42, 0.503], [0.33, 0.508], [0.3, 0.49]], 2) },
    // flush door handles
    { step: 0.005, mat: 'chrome', poly: venueU(0.4825, 0.965, 0.526, 0.99, 0.01) },
    { step: 0.005, mat: 'chrome', poly: venueU(0.2131, 0.975, 0.2568, 1.0, 0.01) },
  ],
  plates: { front: 0.545, rear: 0.694 },
  rails: 'silver',
  sunroof: [0.36, 0.48],
  mirrors: 'body',
  paint: '#0c1048', // Mystic Sapphire, darkened for the studio lights
  plate: 'MH 12 VN 2026',
}

const SONET_L = 3.995
// the tiger-nose grille's hex cells, each with a dark-chrome bar across it, in four staggered rows
const sonetCells: Decal[] = [[0.862, 0, 0.5], [0.82, 0.056, 0.52], [0.778, 0, 0.5], [0.738, 0.056, 0.42]].flatMap(([y, off, max]) => {
  const zs: number[] = []
  for (let z = off; z <= max + 1e-6; z += 0.112) { zs.push(z); if (z > 0) zs.push(-z) }
  return zs.map((z): Decal => ({ step: 0.005, mat: 'satin', layer: 2, depth: 0.008, poly: rrect(z - 0.03, y - 0.006, z + 0.03, y + 0.006, 0.005) }))
})

/** Kia Sonet (2024 facelift, X-Line in Matte Graphite). 3995 × 1790 × 1642 (with roof rails), wheelbase 2500,
 *  215/60 R16. Side profile from the gallery's levelled side photo (height 1.615 over the rails); axles at the
 *  official wheelbase (overhangs as in the photo); lamps, grille and bumpers from the straight front and rear photos. */
export const SONET: CarSpec = {
  id: 'kia-sonet',
  name: 'Kia Sonet',
  dropSlivers: true,
  L: SONET_L, W: 1.79, H: 1.642,
  axles: [0.1876, 0.8134],
  tyreR: 0.332, tyreW: 0.215, rim: 0.612, wheel: { style: 'swirl', spokes: 5 }, rimTone: 'dark',
  archGap: 0.045, archSquare: 0.35,
  sill: [[0, 0.42], [0.01, 0.36], [0.02, 0.335], [0.04, 0.315], [0.07, 0.295], [0.1, 0.29], [0.28, 0.24], [0.7, 0.24], [0.9, 0.22], [0.95, 0.22], [0.975, 0.24], [0.99, 0.28], [1, 0.33]],
  // the tail up to the light bar, the belt rising gently to the C-pillar, the dip under the mirror sail, the
  // bonnet rolling down to the raked face
  top: [[0, 1.06], [0.006, 1.1], [0.012, 1.115], [0.02, 1.125], [0.04, 1.13], [0.1, 1.135], [0.2, 1.14], [0.234, 1.14], [0.3, 1.12], [0.45, 1.09], [0.6, 1.06], [0.66, 1.05], [0.7, 1.062], [0.71, 1.078], [0.72, 1.098], [0.73, 1.11], [0.76, 1.095], [0.8, 1.075], [0.85, 1.05], [0.9, 1.015], [0.93, 0.983], [0.95, 0.958], [0.97, 0.95], [0.98, 0.947], [0.99, 0.945], [1, 0.94]],
  width: [[0, 0.86], [0.006, 0.9], [0.02, 0.945], [0.05, 0.98], [0.1, 0.996], [0.5, 1], [0.88, 0.996], [0.93, 0.98], [0.96, 0.96], [0.985, 0.93], [1, 0.9]],
  crown: 0.015,
  bulge: 0.02,
  shoulder: { y: [[0, 0.8], [0.12, 0.97], [0.5, 0.97], [1, 0.95]], inset: 0.02 },
  haunch: 0.04,
  bonnetRidge: 0.01,
  topRadius: 0.1,
  noseSweep: 0.1,
  tailSweep: 0.14,
  greenhouse: {
    u0: 0.02, u1: 0.73, tumble: 0.68,
    top: [[0.02, 1.13], [0.03, 1.2], [0.04, 1.245], [0.05, 1.295], [0.06, 1.34], [0.07, 1.38], [0.08, 1.43], [0.09, 1.48], [0.1, 1.52], [0.12, 1.522], [0.16, 1.54], [0.2, 1.548], [0.3, 1.553], [0.42, 1.553], [0.48, 1.548], [0.5, 1.54], [0.52, 1.524], [0.55, 1.5], [0.6, 1.415], [0.65, 1.315], [0.7, 1.2], [0.73, 1.13]],
  },
  roof: { u0: 0.0878, u1: 0.52181, black: false },
  pillars: [
    // the big body-coloured D-pillar between the quarter glass and the black wrap-round tailgate glass
    { bottom: [0.12, 0.234], top: [0.118, 0.155], black: false },
    { bottom: [0.441, 0.459], top: [0.436, 0.452], black: true },
    { bottom: [0.71, 0.73], top: [0.525, 0.54], black: true },
  ],
  // black arch flares, the black rocker under the doors, black lower bumpers
  cladding: { top: [[0, 0.47], [0.04, 0.44], [0.08, 0.36], [0.12, 0.31], [0.3, 0.31], [0.7, 0.31], [0.88, 0.31], [0.93, 0.33], [0.97, 0.34], [1, 0.34]], flare: 0.14, cut: true },
  doors: [[0.707, 0.713], [0.459, 0.449], [0.222, 0.198]],
  front: [
    // the tiger-nose grille: gloss black, a row of dark-chrome bars in each row of hex cells
    { step: 0.005, mat: 'gloss', poly: smooth(both([[0, 0.66], [0.47, 0.665], [0.52, 0.7], [0.565, 0.8], [0.55, 0.88], [0.53, 0.905], [0, 0.905]]), 1) },
    ...sonetCells,
    // headlamps: dark lens wedge under the bonnet edge, an LED line along its top and down the outer edge, the turn pocket
    { step: 0.005, mat: 'gloss', layer: 1, mirror: true, depth: 0.006, poly: smooth([[0.4, 0.885], [0.735, 0.942], [0.735, 0.69], [0.69, 0.69], [0.69, 0.82], [0.42, 0.85]], 1) },
    { step: 0.005, mat: 'drl', layer: 3, mirror: true, poly: [[0.41, 0.872], [0.712, 0.924], [0.712, 0.7], [0.727, 0.7], [0.727, 0.937], [0.405, 0.887]] },
    { step: 0.005, mat: 'satin', layer: 2, mirror: true, poly: smooth([[0.48, 0.852], [0.7, 0.83], [0.7, 0.912], [0.48, 0.876]], 1) },
    ...[0.56, 0.615, 0.67].map((z): Decal => ({ step: 0.005, mat: 'head', layer: 3, mirror: true, poly: rrect(z - 0.02, 0.857, z + 0.02, 0.885, 0.008) })),
    { step: 0.005, mat: 'gloss', layer: 1, mirror: true, depth: 0.004, poly: rrect(0.67, 0.6, 0.735, 0.68, 0.012) },
    // lower grille, LED fog strips, the black lip
    { step: 0.005, mat: 'gloss', poly: smooth(both([[0, 0.355], [0.45, 0.355], [0.46, 0.51], [0, 0.51]]), 1) },
    { step: 0.005, mat: 'mesh', layer: 1, poly: smooth(both([[0, 0.37], [0.43, 0.37], [0.44, 0.495], [0, 0.495]]), 1) },
    { step: 0.005, mat: 'drl', mirror: true, poly: rrect(0.55, 0.39, 0.72, 0.405, 0.006) },
    { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.24], [0.68, 0.24], [0.76, 0.27], [0.76, 0.35], [0.47, 0.355], [0, 0.355]]), 1) },
  ],
  rear: [
    // the full-width light bar and the tail lamps at its ends
    { step: 0.005, mat: 'gloss', poly: both([[0, 1.035], [0.6, 1.035], [0.6, 1.1], [0, 1.1]]) },
    { step: 0.005, mat: 'tail', layer: 1, poly: [[-0.6, 1.055], [0.6, 1.055], [0.6, 1.088], [-0.6, 1.088]] },
    { step: 0.005, mat: 'gloss', layer: 1, mirror: true, depth: 0.006, poly: smooth([[0.6, 1.1], [0.738, 1.1], [0.738, 0.82], [0.61, 0.82], [0.6, 0.84]], 1) },
    { step: 0.005, mat: 'tail', layer: 2, mirror: true, poly: [[0.61, 1.088], [0.73, 1.088], [0.73, 1.07], [0.626, 1.07], [0.626, 0.84], [0.61, 0.84]] },
    ...[0.92, 0.95, 0.98, 1.01, 1.04].map((y): Decal => ({ step: 0.005, mat: 'tail', layer: 2, mirror: true, poly: [[0.64, y], [0.722, y + 0.012], [0.722, y + 0.026], [0.64, y + 0.014]] })),
    { step: 0.005, mat: 'amber', layer: 2, mirror: true, poly: rrect(0.64, 0.845, 0.722, 0.9, 0.006) },
    // the gloss-black tailgate garnish between the lamps
    { step: 0.005, mat: 'gloss', depth: 0.004, poly: smooth(both([[0, 0.78], [0.55, 0.78], [0.6, 0.8], [0.61, 0.84], [0.61, 1.035], [0, 1.035]]), 2) },
    // black bumper with the plate recess, reflectors and the gloss diffuser
    { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.32], [0.7, 0.32], [0.76, 0.36], [0.765, 0.66], [0, 0.668]]), 1) },
    { step: 0.005, mat: 'gloss', layer: 1, depth: 0.004, poly: smooth(both([[0, 0.5], [0.35, 0.5], [0.36, 0.65], [0, 0.65]]), 1) },
    { step: 0.005, mat: 'reflector', layer: 1, mirror: true, poly: rrect(0.44, 0.447, 0.72, 0.48, 0.008) },
    { step: 0.005, mat: 'trim', layer: 1, depth: 0.006, poly: smooth(both([[0, 0.32], [0.68, 0.32], [0.72, 0.36], [0.72, 0.43], [0, 0.43]]), 1) },
    { step: 0.005, mat: 'satin', layer: 2, poly: rrect(-0.09, 0.35, 0.09, 0.372, 0.006) },
  ],
  side: [
    // the tail lamp wrapping round the corner: a black wedge with the red bar along its top
    { step: 0.004, mat: 'gloss', depth: 0.004, poly: smooth([[0.014, 1.098], [0.0995, 1.074], [0.074, 1.005], [0.05, 0.976], [0.036, 0.85], [0.03, 0.82], [0.014, 0.82]], 1) },
    { step: 0.004, mat: 'tail', layer: 1, poly: [[0.016, 1.09], [0.092, 1.071], [0.086, 1.057], [0.016, 1.074]] },
    // body-coloured door handles
    { step: 0.005, mat: 'body', depth: 0.01, poly: smooth([[0.475, 0.9], [0.54, 0.9], [0.54, 0.945], [0.475, 0.945]], 1) },
    { step: 0.005, mat: 'body', depth: 0.01, poly: smooth([[0.216, 0.925], [0.276, 0.925], [0.276, 0.97], [0.216, 0.97]], 1) },
  ],
  plates: { front: 0.56, rear: 0.575 },
  rails: 'black',
  sunroof: [0.22, 0.42],
  mirrors: 'black',
  windowChrome: true,
  paint: '#2b3039', // Matte Graphite (the blue-grey of the gallery photos, darkened for the studio lights)
  plate: 'MH 12 SN 2026',
}

const WAGON_R_L = 3.655
/** a circle outline for the Wagon R's fog lamps and headlamp bulb */
const wagonRCircle = (zc: number, yc: number, r: number, n = 40): P2[] =>
  Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return [+(zc + r * Math.cos(a)).toFixed(4), +(yc + r * Math.sin(a)).toFixed(4)] as P2 })
/** a side outline from a rounded rectangle given in u (0…1) and metres */
const wagonRRectU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  rrectS(u0 * WAGON_R_L, y0, u1 * WAGON_R_L, y1, r).map(([x, y]) => [+(x / WAGON_R_L).toFixed(5), y] as P2)

/** Maruti Suzuki Wagon R (2019 3rd gen, 2022 update). 3655 × 1620 × 1675, wheelbase 2435, 165/70 R14 (ZXi Plus).
 *  Side profile from a levelled long-lens side photo (roof 1.677 m); axles at the official wheelbase with the overhangs
 *  split as in the photo. The tall-boy shape: the near-vertical tailgate raked in above the lamps, the tail lamps
 *  climbing the D-pillars beside the glass, a high flat roof, the short bonnet. Lamps, grille and bumpers from straight
 *  front and rear studio photos. */
export const WAGON_R: CarSpec = {
  id: 'maruti-wagon-r',
  name: 'Maruti Suzuki Wagon R',
  rakedEnds: true,
  dropSlivers: true,
  L: WAGON_R_L, W: 1.62, H: 1.675,
  axles: [0.1545, 0.8207],
  tyreR: 0.2933, tyreW: 0.165, rim: 0.606, wheel: { style: 'twin', spokes: 7 },
  archGap: 0.04, archSquare: 0.15,
  sill: [[0, 0.355], [0.005, 0.342], [0.015, 0.335], [0.03, 0.322], [0.05, 0.3], [0.08, 0.28], [0.12, 0.26], [0.2, 0.235], [0.25, 0.222], [0.4, 0.217], [0.55, 0.211], [0.65, 0.2], [0.72, 0.186], [0.8, 0.178], [0.88, 0.172], [0.93, 0.166], [0.96, 0.165], [0.98, 0.168], [0.99, 0.175], [0.996, 0.195], [1, 0.24]],
  // the rear bumper, the upright tailgate up to the lamps' feet, then raked in beside the glass up to the roof; the
  // D-pillar falls to the belt, the belt rises gently towards the tail; the short bonnet rounding down to the nose
  top: [[0, 0.64], [0.005, 0.78], [0.01, 0.9], [0.014, 0.97], [0.018, 1.02], [0.023, 1.1], [0.028, 1.18], [0.036, 1.255], [0.045, 1.32], [0.055, 1.385], [0.065, 1.44], [0.075, 1.49], [0.085, 1.53], [0.09, 1.552], [0.095, 1.575], [0.1, 1.596], [0.11, 1.614], [0.13, 1.641], [0.147, 1.648], [0.151, 1.6], [0.155, 1.48], [0.16, 1.34], [0.164, 1.26], [0.168, 1.235], [0.18, 1.228], [0.2, 1.222], [0.3, 1.2], [0.43, 1.175], [0.6, 1.14], [0.72, 1.105], [0.76, 1.085], [0.81, 1.05], [0.83, 1.025], [0.85, 1.0], [0.87, 0.983], [0.9, 0.955], [0.93, 0.915], [0.95, 0.88], [0.96, 0.858], [0.97, 0.83], [0.98, 0.79], [0.99, 0.7], [0.996, 0.62], [1, 0.555]],
  // boxy in plan, but the corners at both ends are rounded
  width: [[0, 0.86], [0.006, 0.915], [0.015, 0.95], [0.03, 0.972], [0.06, 0.988], [0.12, 1], [0.5, 1], [0.86, 1], [0.9, 0.99], [0.94, 0.972], [0.965, 0.95], [0.982, 0.92], [0.993, 0.885], [1, 0.84]],
  crown: 0.015,
  bulge: 0.02,
  // the D-pillars lean in above the tail lamps' feet (tumblehome at the tail only: the shoulder sits above the belt elsewhere)
  shoulder: { y: [[0, 1.15], [0.152, 1.15], [0.168, 1.3], [0.18, 1.4], [1, 1.4]], inset: 0.2 },
  haunch: 0.045,
  topRadius: 0.1,
  noseSweep: 0.2,
  tailSweep: 0.12,
  greenhouse: {
    u0: 0.147, u1: 0.81, tumble: 0.74, followBody: 0.17,
    // the short roof overhang over the tailgate, the long flat roof, then the steep windscreen
    top: [[0.147, 1.645], [0.17, 1.647], [0.2, 1.648], [0.3, 1.645], [0.4, 1.621], [0.5, 1.596], [0.55, 1.574], [0.6, 1.536], [0.62, 1.51], [0.64, 1.487], [0.65, 1.472], [0.66, 1.45], [0.68, 1.401], [0.7, 1.348], [0.72, 1.298], [0.74, 1.245], [0.76, 1.189], [0.78, 1.13], [0.8, 1.07], [0.81, 1.05]],
  },
  roof: { u0: 0.147, u1: 0.63559, black: false },
  pillars: [
    // the black quarter panel and C-pillar behind the rear door (the body itself forms the D-pillar), the black
    // B-pillar; the A-pillar is left as dark glass (a raked pillar decal saw-toothed on the steep windscreen)
    { bottom: [0.165, 0.216], top: [0.147, 0.214], black: true },
    { bottom: [0.428, 0.447], top: [0.428, 0.447], black: true },
  ],
  doors: [[0.736, 0.733], [0.438, 0.437], [0.236, 0.196]],
  front: [
    // the gloss-black grille between the headlamps with its dark hexagon pattern and one chrome bar (no badge)
    { step: 0.005, mat: 'gloss', poly: both([[0, 0.672], [0.45, 0.672], [0.466, 0.685], [0.47, 0.8], [0.478, 0.826], [0, 0.83]]) },
    { step: 0.005, mat: 'mesh', layer: 1, poly: both([[0, 0.684], [0.44, 0.684], [0.455, 0.695], [0.458, 0.8], [0.462, 0.816], [0, 0.818]]) },
    { step: 0.004, mat: 'chrome', layer: 2, depth: 0.01, poly: both([[0, 0.738], [0.4, 0.738], [0.432, 0.742], [0.446, 0.75], [0.432, 0.758], [0.4, 0.762], [0, 0.762]]) },
    // tall headlamps in dark bezels: the chrome reflector bowl above, the clear indicator strip with amber below
    { step: 0.004, mat: 'gloss', mirror: true, depth: 0.004, poly: smooth([[0.489, 0.655], [0.615, 0.648], [0.722, 0.645], [0.733, 0.665], [0.736, 0.721], [0.733, 0.824], [0.725, 0.882], [0.7, 0.9], [0.594, 0.894], [0.499, 0.88], [0.482, 0.855], [0.472, 0.804], [0.468, 0.683]], 1) },
    { step: 0.004, mat: 'silver', mirror: true, layer: 1, depth: 0.006, poly: smooth([[0.497, 0.716], [0.72, 0.714], [0.724, 0.8], [0.716, 0.864], [0.695, 0.88], [0.6, 0.876], [0.512, 0.864], [0.497, 0.83], [0.492, 0.75]], 1) },
    { step: 0.004, mat: 'head', mirror: true, layer: 2, depth: 0.008, poly: wagonRCircle(0.625, 0.795, 0.03) },
    { step: 0.004, mat: 'silver', mirror: true, layer: 1, depth: 0.006, poly: rrect(0.495, 0.664, 0.722, 0.704, 0.008) },
    { step: 0.004, mat: 'amber', mirror: true, layer: 2, depth: 0.007, poly: rrect(0.56, 0.668, 0.635, 0.7, 0.005) },
    // the black lower grille: a wide trapezoid with four slats, its bottom lip running out to the corners
    { step: 0.005, mat: 'trim', poly: both([[0, 0.185], [0.56, 0.185], [0.575, 0.2], [0.57, 0.23], [0.55, 0.25], [0.4, 0.43], [0.37, 0.454], [0, 0.454]]) },
    ...[0.3, 0.34, 0.38, 0.415].map((y): Decal => ({ step: 0.004, mat: 'gloss', layer: 1, depth: 0.004, poly: both([[0, y], [0.52 - (y - 0.25) * 0.85, y], [0.52 - (y - 0.25) * 0.85 - 0.01, y + 0.014], [0, y + 0.014]]) })),
    // fog lamps in black pods at the bumper corners
    { step: 0.004, mat: 'trim', mirror: true, depth: 0.006, poly: smooth([[0.585, 0.408], [0.58, 0.47], [0.6, 0.486], [0.698, 0.486], [0.71, 0.47], [0.71, 0.37], [0.695, 0.347], [0.638, 0.33]], 2) },
    { step: 0.004, mat: 'chrome', mirror: true, layer: 1, depth: 0.008, poly: wagonRCircle(0.652, 0.412, 0.042) },
    { step: 0.004, mat: 'head', mirror: true, layer: 2, depth: 0.01, poly: wagonRCircle(0.652, 0.412, 0.03) },
  ],
  rear: [
    // the tailgate glass between the lamps, under the roof's short overhang
    { step: 0.005, mat: 'gloss', depth: 0.003, poly: both([[0, 1.24], [0.57, 1.24], [0.585, 1.255], [0.555, 1.33], [0.535, 1.42], [0.524, 1.48], [0.51, 1.5], [0.49, 1.505], [0, 1.505]]) },
    // tall tail lamps along the D-pillars: red lens, the clear block with the amber indicator and reversing lamp
    { step: 0.004, mat: 'tail', mirror: true, depth: 0.008, poly: smooth([[0.65, 0.965], [0.762, 0.965], [0.772, 0.985], [0.772, 1.05], [0.765, 1.188], [0.735, 1.26], [0.68, 1.36], [0.628, 1.44], [0.585, 1.49], [0.56, 1.5], [0.535, 1.5], [0.527, 1.48], [0.527, 1.343], [0.579, 1.24], [0.622, 1.2], [0.638, 1.1], [0.642, 0.98]], 1) },
    { step: 0.004, mat: 'reflector', mirror: true, layer: 1, depth: 0.009, poly: smooth([[0.6, 1.27], [0.69, 1.27], [0.645, 1.36], [0.6, 1.44], [0.56, 1.44], [0.562, 1.35]], 1) },
    { step: 0.004, mat: 'silver', mirror: true, layer: 1, depth: 0.009, poly: smooth([[0.648, 1.002], [0.758, 1.002], [0.762, 1.06], [0.758, 1.19], [0.648, 1.2], [0.645, 1.1]], 1) },
    { step: 0.004, mat: 'amber', mirror: true, layer: 2, depth: 0.01, poly: smooth([[0.652, 1.14], [0.756, 1.14], [0.755, 1.186], [0.652, 1.194]], 1) },
    // the chrome garnish across the tailgate (no lettering)
    { step: 0.004, mat: 'chrome', depth: 0.008, poly: both([[0, 1.035], [0.4, 1.035], [0.43, 1.042], [0.442, 1.06], [0.442, 1.088], [0.43, 1.104], [0.4, 1.11], [0, 1.11]]) },
    // the tailgate's shut line round the bottom of the panel
    { step: 0.005, mat: 'gloss', depth: 0.001, poly: band([[-0.632, 0.96], [-0.625, 0.864], [-0.602, 0.802], [-0.556, 0.748], [-0.465, 0.712], [-0.3, 0.702], [0, 0.7], [0.3, 0.702], [0.465, 0.712], [0.556, 0.748], [0.602, 0.802], [0.625, 0.864], [0.632, 0.96]], 0.012) },
    // reflectors low in the bumper corners, the black diffuser along the bottom
    { step: 0.004, mat: 'reflector', mirror: true, poly: rrect(0.57, 0.495, 0.745, 0.528, 0.008) },
    { step: 0.005, mat: 'trim', poly: both([[0, 0.36], [0.5, 0.36], [0.545, 0.372], [0.56, 0.4], [0.55, 0.425], [0.52, 0.432], [0, 0.432]]) },
  ],
  side: [
    // the tail lamp wrapping onto the flank beside the D-pillar
    { step: 0.004, mat: 'tail', depth: 0.006, poly: [[0.082, 1.495], [0.078, 1.46], [0.074, 1.4], [0.07, 1.33], [0.069, 1.2], [0.066, 1.05], [0.062, 0.975], [0.024, 0.975], [0.021, 1.0], [0.025, 1.08], [0.03, 1.165], [0.038, 1.24], [0.047, 1.305], [0.057, 1.37], [0.067, 1.425], [0.074, 1.46], [0.079, 1.485]] },
    // body-coloured door handles in dark recesses
    { step: 0.004, mat: 'gloss', poly: wagonRRectU(0.47, 0.955, 0.505, 0.992, 0.012) },
    { step: 0.004, mat: 'body', layer: 1, depth: 0.012, poly: wagonRRectU(0.472, 0.96, 0.503, 0.978, 0.008) },
    { step: 0.004, mat: 'gloss', poly: wagonRRectU(0.212, 0.993, 0.247, 1.03, 0.012) },
    { step: 0.004, mat: 'body', layer: 1, depth: 0.012, poly: wagonRRectU(0.214, 0.998, 0.245, 1.016, 0.008) },
  ],
  plates: { front: 0.563, rear: 0.94 },
  mirrors: 'black',
  rimTone: 'dark',
  paint: '#8e0f17', // Gallant Red, darkened for the studio lights
  plate: 'MH 12 WR 2026',
}

const GRAND_VITARA_L = 4.345
/** a side outline from a rounded rectangle given in u (0…1) and metres */
const grandVitaraRectU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  rrectS(u0 * GRAND_VITARA_L, y0, u1 * GRAND_VITARA_L, y1, r).map(([x, y]) => [+(x / GRAND_VITARA_L).toFixed(5), y] as P2)

/** Maruti Suzuki Grand Vitara (2022). 4345 × 1795 × 1645 (with roof rails), wheelbase 2600, 215/60 R17 (Alpha / Zeta+).
 *  Side profile from a levelled gallery side photo (1.661 m measured; the photo's axles 2.6 % too far apart, so the axles
 *  sit at the official wheelbase with the overhangs split as in the photo). Belt, pillars, shut lines and cladding read off
 *  a metric grid of the levelled cut-out; the split headlamps, chrome-barred grille, light bar and bumpers from the
 *  straight front and rear photos and the three-quarter views. */
export const GRAND_VITARA: CarSpec = {
  id: 'maruti-grand-vitara',
  name: 'Maruti Suzuki Grand Vitara',
  L: GRAND_VITARA_L, W: 1.795, H: 1.645,
  axles: [0.1952, 0.7936],
  tyreR: 0.345, tyreW: 0.215, rim: 0.626, wheel: { style: 'split', spokes: 5 },
  archGap: 0.07, archSquare: 0.35,
  sill: [[0, 0.34], [0.01, 0.34], [0.02, 0.35], [0.04, 0.36], [0.06, 0.35], [0.08, 0.33], [0.1, 0.3], [0.12, 0.27], [0.3, 0.245], [0.7, 0.235], [0.86, 0.23], [0.9, 0.225], [0.93, 0.235], [0.96, 0.24], [0.98, 0.245], [1, 0.24]],
  // the upright tailgate up to the light bar, the raked tailgate glass with the body-coloured D-pillar beside it up to
  // the spoiler, the belt dropping round the quarter glass, the near-flat belt, then the long bonnet
  top: [[0, 0.98], [0.006, 1.1], [0.012, 1.15], [0.02, 1.175], [0.03, 1.195], [0.045, 1.235], [0.06, 1.3], [0.075, 1.365], [0.09, 1.43], [0.1, 1.455], [0.115, 1.465], [0.128, 1.455], [0.138, 1.42], [0.146, 1.36], [0.153, 1.29], [0.163, 1.24], [0.18, 1.222], [0.22, 1.212], [0.27, 1.2], [0.35, 1.19], [0.45, 1.18], [0.55, 1.17], [0.65, 1.16], [0.7, 1.153], [0.72, 1.143], [0.74, 1.118], [0.77, 1.105], [0.8, 1.1], [0.84, 1.085], [0.88, 1.066], [0.9, 1.055], [0.92, 1.04], [0.94, 1.02], [0.955, 1.006], [0.965, 0.998], [0.975, 0.991], [0.985, 0.986], [0.993, 0.983], [1, 0.981]],
  width: [[0, 0.87], [0.006, 0.92], [0.02, 0.96], [0.05, 0.985], [0.1, 0.997], [0.5, 1], [0.86, 0.997], [0.91, 0.985], [0.945, 0.965], [0.97, 0.94], [0.988, 0.905], [1, 0.87]],
  crown: 0.015,
  bulge: 0.03,
  // the character line through the door handles, rising to the tail lamps
  shoulder: { y: [[0, 1.075], [0.5, 1.04], [1, 1.0]], inset: 0.03 },
  haunch: 0.05,
  bonnetRidge: 0.01,
  topRadius: 0.11,
  dropSlivers: true,
  noseSweep: 0.08,
  tailSweep: 0.1,
  greenhouse: {
    u0: 0.03, u1: 0.72, tumble: 0.68, followBody: 0.16,
    // the raked tailgate glass under the long roof spoiler, the flat roof, the raked screen
    top: [[0.03, 1.195], [0.04, 1.225], [0.05, 1.265], [0.06, 1.31], [0.07, 1.355], [0.08, 1.4], [0.09, 1.445], [0.1, 1.49], [0.11, 1.53], [0.12, 1.55], [0.135, 1.563], [0.16, 1.575], [0.2, 1.584], [0.3, 1.591], [0.4, 1.597], [0.45, 1.598], [0.5, 1.587], [0.52, 1.577], [0.545, 1.556], [0.57, 1.522], [0.6, 1.47], [0.63, 1.41], [0.66, 1.34], [0.69, 1.26], [0.72, 1.145]],
  },
  roof: { u0: 0.0914, u1: 0.5453, black: false },
  pillars: [
    // the wide black C-pillar ahead of the quarter glass and the B-pillar (the A-pillar is left as plain glass)
    { bottom: [0.218, 0.258], top: [0.235, 0.256], black: true },
    { bottom: [0.418, 0.441], top: [0.418, 0.441], black: true },
  ],
  // slim black arch flares, a black band along the bottom of the doors, black lower bumpers
  cladding: { top: [[0, 0.47], [0.03, 0.47], [0.06, 0.45], [0.09, 0.4], [0.11, 0.33], [0.3, 0.33], [0.7, 0.33], [0.9, 0.34], [0.93, 0.36], [1, 0.36]], flare: 0.05, cut: true },
  doors: [[0.703, 0.7], [0.44, 0.44], [0.205, 0.214]],
  front: [
    // the black slot under the bonnet's edge between the headlamps
    { step: 0.005, mat: 'gloss', poly: both([[0, 0.888], [0.5, 0.888], [0.5, 0.918], [0, 0.918]]) },
    // slim upper headlamps: a gloss housing, three LED cubes and a thin light line under them
    { step: 0.005, mat: 'gloss', mirror: true, depth: 0.006, poly: smooth([[0.48, 0.87], [0.62, 0.878], [0.7, 0.886], [0.728, 0.898], [0.732, 0.928], [0.72, 0.95], [0.64, 0.946], [0.55, 0.933], [0.48, 0.924]], 1) },
    ...[[0.56, 0.6], [0.618, 0.658], [0.676, 0.714]].map(([a, b]): Decal => ({ step: 0.005, mat: 'drl', layer: 1, mirror: true, poly: smooth([[a, 0.899 + (a - 0.56) * 0.12], [b, 0.902 + (b - 0.56) * 0.12], [b, 0.932 + (b - 0.56) * 0.12], [a, 0.929 + (a - 0.56) * 0.12]], 1) })),
    { step: 0.005, mat: 'drl', layer: 1, mirror: true, poly: [[0.5, 0.884], [0.62, 0.891], [0.7, 0.898], [0.7, 0.886], [0.62, 0.879], [0.5, 0.872]] },
    // the thick chrome bar joining the headlamps over the grille
    { step: 0.005, mat: 'chrome', layer: 1, depth: 0.01, poly: both([[0, 0.846], [0.38, 0.85], [0.45, 0.859], [0.492, 0.87], [0.488, 0.885], [0.44, 0.889], [0, 0.889]]) },
    // the shield grille: a chrome surround round a dark patterned insert
    { step: 0.005, mat: 'chrome', depth: 0.008, poly: both([[0, 0.545], [0.345, 0.548], [0.405, 0.572], [0.46, 0.66], [0.485, 0.74], [0.472, 0.79], [0.445, 0.83], [0.41, 0.85], [0, 0.85]]) },
    { step: 0.005, mat: 'gloss', layer: 1, depth: 0.004, poly: both([[0, 0.562], [0.338, 0.565], [0.394, 0.588], [0.447, 0.668], [0.47, 0.74], [0.458, 0.788], [0.432, 0.825], [0.4, 0.838], [0, 0.838]]) },
    { step: 0.005, mat: 'mesh', layer: 2, poly: both([[0, 0.572], [0.333, 0.575], [0.386, 0.596], [0.437, 0.672], [0.459, 0.74], [0.448, 0.783], [0.424, 0.817], [0.394, 0.829], [0, 0.829]]) },
    // the main lamps low in the bumper corners: black square pods with a projector
    { step: 0.005, mat: 'gloss', mirror: true, depth: 0.008, poly: rrectS(0.595, 0.6, 0.755, 0.78, 0.025) },
    { step: 0.005, mat: 'trim', layer: 1, mirror: true, depth: 0.006, poly: rrectS(0.632, 0.635, 0.727, 0.745, 0.035) },
    { step: 0.005, mat: 'gloss', layer: 2, mirror: true, depth: 0.008, poly: rrectS(0.642, 0.645, 0.717, 0.735, 0.03) },
    { step: 0.005, mat: 'head', layer: 3, mirror: true, poly: rrectS(0.662, 0.665, 0.697, 0.715, 0.017) },
    // the black lower bumper, its lower grille and the satin lip along the bottom
    { step: 0.005, mat: 'trim', poly: both([[0, 0.245], [0.68, 0.248], [0.74, 0.265], [0.765, 0.295], [0.77, 0.34], [0, 0.34]]) },
    { step: 0.005, mat: 'trim', poly: both([[0, 0.335], [0.425, 0.335], [0.405, 0.38], [0.37, 0.455], [0, 0.455]]) },
    { step: 0.005, mat: 'slats', layer: 1, poly: both([[0, 0.352], [0.395, 0.352], [0.38, 0.385], [0.35, 0.44], [0, 0.44]]) },
    { step: 0.005, mat: 'satin', layer: 2, poly: smooth(both([[0, 0.3], [0.7, 0.302], [0.745, 0.31], [0.755, 0.322], [0.74, 0.334], [0.7, 0.338], [0, 0.338]]), 2) },
  ],
  rear: [
    // the slim connected light bar across the top of the tailgate: a smoked housing, a silver strip and red light lines
    { step: 0.005, mat: 'gloss', depth: 0.004, poly: smooth(both([[0, 1.087], [0.6, 1.087], [0.7, 1.084], [0.745, 1.083], [0.755, 1.095], [0.755, 1.128], [0.745, 1.142], [0.7, 1.141], [0, 1.139]]), 1) },
    { step: 0.005, mat: 'silver', layer: 1, poly: both([[0, 1.125], [0.735, 1.126], [0.735, 1.137], [0, 1.137]]) },
    { step: 0.005, mat: 'tail', layer: 1, mirror: true, poly: [[0.13, 1.106], [0.62, 1.108], [0.62, 1.119], [0.13, 1.118]] },
    { step: 0.005, mat: 'tail', layer: 1, mirror: true, poly: [[0.63, 1.092], [0.745, 1.092], [0.745, 1.106], [0.63, 1.106]] },
    // the tailgate's shut line down its sides and across below the plate recess
    { step: 0.005, mat: 'gloss', depth: 0.001, poly: band([[-0.665, 1.075], [-0.665, 0.72], [-0.63, 0.692], [0, 0.686], [0.63, 0.692], [0.665, 0.72], [0.665, 1.075]], 0.012) },
    // the vertical lamps in the bumper corners: red below, clear above
    { step: 0.005, mat: 'gloss', mirror: true, depth: 0.006, poly: rrectS(0.69, 0.6, 0.76, 0.86, 0.02) },
    { step: 0.005, mat: 'tail', layer: 1, mirror: true, poly: rrectS(0.7, 0.615, 0.75, 0.69, 0.01) },
    { step: 0.005, mat: 'silver', layer: 1, mirror: true, poly: rrectS(0.7, 0.705, 0.75, 0.845, 0.01) },
    // the black lower bumper, the big satin skid plate with its dark groove
    { step: 0.005, mat: 'trim', poly: both([[0, 0.33], [0.7, 0.33], [0.75, 0.36], [0.765, 0.42], [0.76, 0.47], [0.7, 0.52], [0.64, 0.575], [0.6, 0.6], [0, 0.6]]) },
    { step: 0.005, mat: 'satin', layer: 1, poly: smooth(both([[0, 0.39], [0.66, 0.39], [0.715, 0.405], [0.73, 0.445], [0.67, 0.515], [0.61, 0.553], [0, 0.553]]), 2) },
    { step: 0.005, mat: 'gloss', layer: 2, depth: 0.012, poly: smooth(both([[0, 0.432], [0.5, 0.432], [0.52, 0.45], [0.5, 0.468], [0, 0.468]]), 1) },
  ],
  side: [
    // body-coloured door handles
    { step: 0.005, mat: 'body', depth: 0.01, poly: grandVitaraRectU(0.457, 1.015, 0.505, 1.043, 0.012) },
    { step: 0.005, mat: 'body', depth: 0.01, poly: grandVitaraRectU(0.232, 1.04, 0.28, 1.068, 0.012) },
  ],
  plates: { front: 0.45, rear: 0.88 },
  rails: 'silver',
  sunroof: [0.2, 0.5],
  mirrors: 'body',
  windowChrome: true,
  paint: '#001a5c', // NEXA Blue (the deep blue of the gallery photos, darkened for the studio lights, blue kept up)
  plate: 'MH 12 GV 2026',
}

const XUV3XO_L = 3.99
/** a side outline from a rounded rectangle given in u (0…1) and metres */
const xuv3xoU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  rrectS(u0 * XUV3XO_L, y0, u1 * XUV3XO_L, y1, r).map(([x, y]) => [+(x / XUV3XO_L).toFixed(5), y] as P2)
/** a circle outline (projector lamps) */
const xuv3xoCircle = (zc: number, yc: number, r: number, n = 40): P2[] =>
  Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return [+(zc + r * Math.cos(a)).toFixed(4), +(yc + r * Math.sin(a)).toFixed(4)] as P2 })

/** Mahindra XUV 3XO (2024). 3990 × 1821 × 1647 (with roof rails), wheelbase 2600, 215/55 R17 (AX7 L).
 *  Side profile from a levelled gallery side photo (1.631 m measured over the rails); axles at the official wheelbase
 *  with the overhangs split as in the photo. Belt, cladding, shut lines and handles read off a metric grid of the
 *  levelled cut-out; the C-shaped headlamps, slatted grille band and bumpers from the straight front photo and close-ups;
 *  the connected tail light bar and the rear bumper from the rear photos. */
export const XUV_3XO: CarSpec = {
  id: 'mahindra-xuv-3xo',
  name: 'Mahindra XUV 3XO',
  dropSlivers: true,
  L: XUV3XO_L, W: 1.821, H: 1.647,
  axles: [0.1467, 0.7982],
  tyreR: 0.334, tyreW: 0.215, rim: 0.646, wheel: { style: 'swirl', spokes: 5 }, rimTone: 'dark',
  archGap: 0.04, archSquare: 0.35,
  sill: [[0, 0.3], [0.01, 0.29], [0.02, 0.285], [0.04, 0.275], [0.07, 0.26], [0.1, 0.25], [0.25, 0.215], [0.5, 0.2], [0.69, 0.195], [0.85, 0.17], [0.9, 0.15], [0.93, 0.152], [0.96, 0.165], [0.98, 0.18], [0.99, 0.19], [1, 0.2]],
  // the upright tail up to the light bar, the belt rising gently to the black C-pillar panel, the belt falling to
  // the mirror, then the bonnet rolling down to the upright grille face
  top: [[0, 1.13], [0.006, 1.145], [0.012, 1.155], [0.02, 1.163], [0.03, 1.17], [0.05, 1.18], [0.07, 1.188], [0.1, 1.196], [0.14, 1.202], [0.17, 1.2], [0.19, 1.195], [0.21, 1.19], [0.25, 1.165], [0.3, 1.15], [0.35, 1.14], [0.4, 1.133], [0.45, 1.124], [0.5, 1.115], [0.55, 1.107], [0.6, 1.098], [0.65, 1.088], [0.7, 1.078], [0.72, 1.075], [0.75, 1.058], [0.8, 1.04], [0.85, 1.017], [0.9, 0.993], [0.93, 0.968], [0.95, 0.947], [0.96, 0.934], [0.97, 0.926], [0.98, 0.919], [0.99, 0.915], [1, 0.912]],
  width: [[0, 0.88], [0.008, 0.92], [0.02, 0.955], [0.05, 0.98], [0.1, 0.995], [0.5, 1], [0.88, 0.995], [0.93, 0.98], [0.96, 0.96], [0.985, 0.935], [1, 0.91]],
  crown: 0.015,
  bulge: 0.02,
  // the crease through the door handles, rising to the rear fender; kept under the tail lamp wedge at the tail
  shoulder: { y: [[0, 0.85], [0.12, 1.02], [0.4, 0.99], [1, 0.93]], inset: 0.02 },
  haunch: 0.04,
  bonnetRidge: 0.01,
  topRadius: 0.07,
  noseSweep: 0.12,
  tailSweep: 0.12,
  greenhouse: {
    u0: 0.02, u1: 0.72, tumble: 0.7,
    // the raked tailgate glass under the roof spoiler, a flat roof under the rails, a fairly raked screen
    top: [[0.02, 1.165], [0.03, 1.225], [0.04, 1.285], [0.05, 1.345], [0.06, 1.4], [0.07, 1.45], [0.08, 1.49], [0.09, 1.512], [0.1, 1.522], [0.13, 1.528], [0.15, 1.54], [0.17, 1.552], [0.2, 1.562], [0.25, 1.574], [0.3, 1.582], [0.4, 1.59], [0.44, 1.585], [0.46, 1.576], [0.47, 1.568], [0.49, 1.55], [0.5, 1.54], [0.52, 1.524], [0.55, 1.49], [0.58, 1.445], [0.6, 1.405], [0.65, 1.285], [0.7, 1.15], [0.72, 1.098]],
  },
  roof: { u0: 0.10132, u1: 0.5003, black: false },
  pillars: [
    { bottom: [0.383, 0.414], top: [0.386, 0.416], black: true },
  ],
  // thick black arch flares joined by the black rocker, black bumper corners
  cladding: { top: [[0, 0.64], [0.015, 0.64], [0.03, 0.62], [0.045, 0.66], [0.06, 0.72], [0.075, 0.775], [0.09, 0.805], [0.11, 0.822], [0.15, 0.83], [0.19, 0.818], [0.215, 0.795], [0.23, 0.765], [0.245, 0.71], [0.255, 0.65], [0.265, 0.575], [0.275, 0.525], [0.29, 0.505], [0.4, 0.47], [0.5, 0.447], [0.6, 0.43], [0.672, 0.418], [0.686, 0.5], [0.696, 0.6], [0.716, 0.7], [0.736, 0.766], [0.756, 0.81], [0.776, 0.82], [0.82, 0.8], [0.86, 0.808], [0.875, 0.79], [0.888, 0.75], [0.9, 0.705], [0.91, 0.65], [0.92, 0.58], [0.935, 0.48], [0.95, 0.43], [0.97, 0.415], [1, 0.41]], flare: 0.11, cut: true },
  doors: [[0.692, 0.696], [0.411, 0.409], [0.149, 0.163]],
  front: [
    // the gloss-black grille band under the bonnet edge, dotted ends running into the lamps, slanted chrome slats
    { step: 0.005, mat: 'gloss', poly: smooth(both([[0, 0.745], [0.45, 0.745], [0.52, 0.76], [0.6, 0.83], [0.625, 0.875], [0.625, 0.895], [0, 0.895]]), 1) },
    { step: 0.005, mat: 'mesh', layer: 1, mirror: true, poly: [[0.47, 0.886], [0.615, 0.886], [0.535, 0.79]] },
    ...[0.134, 0.267, 0.405].map((z): Decal => ({ step: 0.005, mat: 'chrome', layer: 2, depth: 0.01, mirror: true, poly: [[z - 0.008, 0.772], [z + 0.007, 0.772], [z + 0.027, 0.868], [z + 0.012, 0.868]] })),
    { step: 0.005, mat: 'gloss', layer: 1, poly: rrect(-0.33, 0.695, 0.33, 0.73, 0.01) },
    // headlamps: the clear upper lens and the black projector pocket pointing down, the C-shaped DRL round the outside
    { step: 0.005, mat: 'gloss', mirror: true, poly: smooth([[0.6, 0.895], [0.73, 0.893], [0.778, 0.876], [0.8, 0.845], [0.805, 0.62], [0.72, 0.548], [0.69, 0.56], [0.565, 0.75], [0.6, 0.83]], 1) },
    { step: 0.005, mat: 'silver', layer: 1, mirror: true, depth: 0.006, poly: smooth([[0.635, 0.775], [0.785, 0.775], [0.785, 0.835], [0.765, 0.862], [0.72, 0.874], [0.625, 0.874], [0.615, 0.83]], 1) },
    { step: 0.005, mat: 'drl', layer: 2, mirror: true, poly: band([[0.6, 0.884], [0.73, 0.882], [0.756, 0.876], [0.776, 0.864], [0.789, 0.847], [0.795, 0.825], [0.796, 0.62], [0.775, 0.592], [0.72, 0.556], [0.69, 0.566]], 0.014) },
    { step: 0.005, mat: 'drl', layer: 2, mirror: true, poly: band([[0.64, 0.772], [0.785, 0.772]], 0.012) },
    { step: 0.005, mat: 'chrome', layer: 1, mirror: true, depth: 0.006, poly: xuv3xoCircle(0.715, 0.68, 0.048) },
    { step: 0.005, mat: 'head', layer: 2, mirror: true, poly: xuv3xoCircle(0.715, 0.68, 0.036) },
    // the trapezoid lower grille with silver diagonal bars, the black lower bumper and its satin skid strip
    { step: 0.005, mat: 'gloss', poly: smooth(both([[0, 0.385], [0.6, 0.385], [0.625, 0.4], [0.39, 0.6], [0, 0.6]]), 1) },
    { step: 0.005, mat: 'mesh', layer: 1, poly: smooth(both([[0, 0.4], [0.56, 0.4], [0.37, 0.585], [0, 0.585]]), 1) },
    ...[0.2, 0.32].map((z): Decal => ({ step: 0.005, mat: 'satin', layer: 2, depth: 0.008, mirror: true, poly: band([[z, 0.585], [z + 0.12, 0.41]], 0.014) })),
    { step: 0.005, mat: 'satin', layer: 2, depth: 0.008, mirror: true, poly: band([[0.38, 0.588], [0.6, 0.4]], 0.014) },
    { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.17], [0.7, 0.17], [0.78, 0.2], [0.8, 0.25], [0.8, 0.41], [0.62, 0.395], [0, 0.385]]), 1) },
    { step: 0.005, mat: 'satin', layer: 1, poly: smooth(both([[0, 0.256], [0.47, 0.256], [0.51, 0.272], [0.49, 0.294], [0, 0.294]]), 2) },
  ],
  rear: [
    // the connected light bar: a thin red line across the tailgate, C-shaped lamps at both ends with clear inners
    { step: 0.005, mat: 'gloss', layer: 1, depth: 0.006, poly: rrect(-0.67, 1.082, 0.67, 1.117, 0.008) },
    { step: 0.005, mat: 'tail', layer: 2, poly: [[-0.67, 1.092], [0.67, 1.092], [0.67, 1.106], [-0.67, 1.106]] },
    { step: 0.005, mat: 'gloss', layer: 1, mirror: true, depth: 0.006, poly: smooth([[0.655, 1.117], [0.785, 1.117], [0.785, 0.925], [0.69, 0.925], [0.655, 0.96]], 1) },
    { step: 0.005, mat: 'silver', layer: 2, mirror: true, poly: rrect(0.69, 0.955, 0.755, 1.082, 0.008) },
    { step: 0.005, mat: 'tail', layer: 3, mirror: true, poly: band([[0.66, 1.099], [0.762, 1.099], [0.771, 1.088], [0.771, 0.945], [0.7, 0.945]], 0.016) },
    // the black bumper with the plate recess, reflectors, dotted pods, silver brackets and the satin skid plate
    { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.3], [0.7, 0.3], [0.77, 0.33], [0.785, 0.4], [0.785, 0.65], [0, 0.625]]), 1) },
    { step: 0.005, mat: 'gloss', layer: 1, depth: 0.004, poly: rrect(-0.36, 0.45, 0.36, 0.6, 0.02) },
    { step: 0.005, mat: 'reflector', layer: 1, mirror: true, poly: rrect(0.43, 0.56, 0.72, 0.588, 0.006) },
    { step: 0.005, mat: 'mesh', layer: 1, mirror: true, poly: smooth([[0.4, 0.41], [0.72, 0.41], [0.745, 0.535], [0.4, 0.535]], 1) },
    { step: 0.005, mat: 'satin', layer: 2, mirror: true, poly: [[0.48, 0.378], [0.775, 0.378], [0.775, 0.48], [0.755, 0.48], [0.755, 0.398], [0.48, 0.398]] },
    { step: 0.005, mat: 'satin', layer: 1, poly: smooth(both([[0, 0.335], [0.5, 0.335], [0.56, 0.35], [0.58, 0.405], [0, 0.405]]), 2) },
  ],
  side: [
    // the headlamp's wrap onto the flank: its black pocket
    { step: 0.004, mat: 'gloss', depth: 0.004, poly: smooth([[0.993, 0.87], [0.962, 0.89], [0.958, 0.86], [0.962, 0.6], [0.966, 0.56], [0.98, 0.6], [0.993, 0.7]], 1) },
    // the smoked tail lamp wedge on the rear fender
    { step: 0.004, mat: 'gloss', depth: 0.004, poly: smooth([[0.087, 1.14], [0.06, 1.152], [0.032, 1.155], [0.028, 1.0], [0.034, 0.97], [0.06, 1.05]], 1) },
    // body-coloured door handles
    { step: 0.005, mat: 'body', depth: 0.01, poly: xuv3xoU(0.422, 0.902, 0.486, 0.936, 0.012) },
    { step: 0.005, mat: 'body', depth: 0.01, poly: xuv3xoU(0.163, 0.998, 0.222, 1.032, 0.012) },
  ],
  plates: { front: 0.475, rear: 0.52 },
  rails: 'black',
  sunroof: [0.2, 0.44],
  mirrors: 'black',
  paint: '#c09a00', // Citrine Yellow, darkened for the studio lights
  plate: 'MH 12 XO 2026',
}

const ERTIGA_L = 4.435
/** a circle outline for the Ertiga's fog lamps and headlamp bowls */
const ertigaCircle = (zc: number, yc: number, r: number, n = 40): P2[] =>
  Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return [+(zc + r * Math.cos(a)).toFixed(4), +(yc + r * Math.sin(a)).toFixed(4)] as P2 })
/** one chrome "wing" of the grille: a slim bar from zi out to zo whose outer end bends down */
const ertigaWing = (zi: number, zo: number, y: number): Decal => ({
  step: 0.004, mat: 'chrome', mirror: true, layer: 2, depth: 0.01,
  poly: [[zi, y + 0.006], [zo - 0.03, y + 0.002], [zo - 0.006, y - 0.016], [zo + 0.004, y - 0.012], [zo - 0.016, y + 0.016], [zi, y + 0.02]],
})

/** Maruti Suzuki Ertiga (2022 facelift, 2025 update with the roof spoiler). 4435 × 1735 × 1690, wheelbase 2740,
 *  185/65 R15 (ZXi Plus). Side profile from a levelled gallery side photo (rod antenna removed; the close camera spreads
 *  the axles by 3.4 % and stands the roof 3 % tall, so heights are scaled to the official height and the axles sit at the
 *  official wheelbase with the overhangs split as in the photo; doors, handles and pillars are mapped onto them). The
 *  long MPV body: a near-upright tail with the boomerang lamps climbing the D-pillars, a body-coloured D-pillar panel under
 *  a black glass band (floating roof), the long rear quarter glass, the belt falling forwards, the crease from the tail
 *  lamps down the doors. Grille, headlamps and bumpers from a straight front photo; the tail from the rear
 *  three-quarters and close-ups. */
export const ERTIGA_X: CarSpec = {
  id: 'maruti-ertiga',
  name: 'Maruti Suzuki Ertiga',
  rakedEnds: true,
  dropSlivers: true,
  L: ERTIGA_L, W: 1.735, H: 1.69,
  axles: [0.2009, 0.8187],
  tyreR: 0.3108, tyreW: 0.185, rim: 0.613, wheel: { style: 'split', spokes: 5 },
  archGap: 0.08, archSquare: 0.1,
  sill: [[0, 0.4875], [0.004, 0.4193], [0.01, 0.39], [0.02, 0.3754], [0.04, 0.3559], [0.06, 0.3217], [0.08, 0.3023], [0.1, 0.273], [0.12, 0.2632], [0.2, 0.2555], [0.3, 0.2496], [0.4, 0.2437], [0.5, 0.2359], [0.6, 0.2311], [0.7, 0.2233], [0.74, 0.2096], [0.8, 0.2047], [0.88, 0.2047], [0.91, 0.2165], [0.93, 0.2262], [0.95, 0.2418], [0.97, 0.2681], [0.98, 0.2905], [0.99, 0.3217], [0.996, 0.3705], [1, 0.4387]],
  top: [[0, 0.6825], [0.002, 0.8775], [0.005, 1.0237], [0.008, 1.1212], [0.011, 1.17], [0.015, 1.1944], [0.02, 1.2383], [0.03, 1.3065], [0.04, 1.3699], [0.05, 1.4284], [0.06, 1.4723], [0.07, 1.5015], [0.078, 1.5112], [0.085, 1.5034], [0.093, 1.4723], [0.1, 1.443], [0.11, 1.3991], [0.12, 1.3601], [0.13, 1.3211], [0.14, 1.2821], [0.15, 1.248], [0.16, 1.2236], [0.17, 1.209], [0.19, 1.1973], [0.22, 1.1895], [0.3, 1.17], [0.4, 1.1534], [0.5, 1.1339], [0.6, 1.1115], [0.7, 1.0891], [0.74, 1.0774], [0.76, 1.0852], [0.78, 1.0998], [0.8, 1.1134], [0.82, 1.1066], [0.85, 1.0725], [0.88, 1.0433], [0.9, 1.0208], [0.92, 0.9945], [0.94, 0.9682], [0.96, 0.9389], [0.975, 0.9116], [0.985, 0.897], [0.993, 0.8872], [1, 0.8775]],
  width: [[0, 0.82], [0.005, 0.88], [0.015, 0.93], [0.035, 0.968], [0.07, 0.99], [0.12, 1], [0.85, 1], [0.9, 0.99], [0.94, 0.972], [0.965, 0.95], [0.98, 0.928], [0.992, 0.9], [1, 0.875]],
  crown: 0.02,
  bulge: 0.03,
  shoulder: { y: [[0, 1.1017], [0.1, 1.0823], [0.25, 1.0335], [0.5, 0.975], [0.7, 0.8921], [0.8, 0.8531], [1, 0.8287]], inset: 0.035 },
  haunch: 0.04,
  topRadius: 0.07,
  noseSweep: 0.12,
  tailSweep: 0.12,
  greenhouse: {
    u0: 0.057, u1: 0.8, tumble: 0.72, followBody: 0.1,
    top: [[0.057, 1.599], [0.06, 1.6263], [0.07, 1.6477], [0.08, 1.6594], [0.1, 1.6692], [0.13, 1.6789], [0.2, 1.6985], [0.3, 1.7111], [0.38, 1.7131], [0.45, 1.6985], [0.5, 1.6789], [0.55, 1.6536], [0.58, 1.6263], [0.6, 1.6019], [0.62, 1.5746], [0.64, 1.5405], [0.66, 1.4986], [0.68, 1.4508], [0.7, 1.4021], [0.72, 1.3504], [0.74, 1.3007], [0.76, 1.2499], [0.78, 1.1992], [0.8, 1.1388]],
  },
  roof: { u0: 0.057, u1: 0.58214, black: false },
  pillars: [
    { bottom: [0.232, 0.2765], top: [0.2475, 0.2765], black: true },
    { bottom: [0.4892, 0.5066], top: [0.4892, 0.5066], black: true },
  ],
  doors: [[0.7309, 0.7377], [0.4979, 0.4979], [0.2707, 0.2765]],
  front: [
    // the chrome surround from under the headlamps round the grille, the black grille and its three rows of chrome wings
    { step: 0.004, mat: 'chrome', depth: 0.008, poly: both([[0, 0.68], [0.3, 0.68], [0.34, 0.694], [0.38, 0.733], [0.41, 0.775], [0.44, 0.806], [0.452, 0.828], [0.432, 0.866], [0, 0.87]]) },
    { step: 0.004, mat: 'gloss', layer: 1, poly: both([[0, 0.697], [0.29, 0.697], [0.322, 0.71], [0.357, 0.742], [0.387, 0.786], [0.408, 0.818], [0.414, 0.848], [0, 0.852]]) },
    ...[[0.015, 0.105], [0.125, 0.215], [0.235, 0.318], [0.335, 0.392]].map(([a, b]) => ertigaWing(a, b, 0.812)),
    ...[[0.015, 0.095], [0.11, 0.2], [0.22, 0.31], [0.325, 0.37]].map(([a, b]) => ertigaWing(a, b, 0.762)),
    ...[[0.015, 0.12], [0.14, 0.245], [0.262, 0.33]].map(([a, b]) => ertigaWing(a, b, 0.712)),
    // swept headlamps: dark housing, two chrome bowls with bulbs, the amber indicator at the inner end, a chrome lower lip
    { step: 0.004, mat: 'gloss', mirror: true, depth: 0.004, poly: smooth([[0.41, 0.862], [0.432, 0.814], [0.52, 0.806], [0.6, 0.796], [0.7, 0.805], [0.745, 0.815], [0.772, 0.835], [0.782, 0.865], [0.774, 0.895], [0.745, 0.912], [0.67, 0.912], [0.56, 0.9], [0.46, 0.878]], 1) },
    { step: 0.004, mat: 'silver', mirror: true, layer: 1, depth: 0.006, poly: ertigaCircle(0.688, 0.866, 0.04) },
    { step: 0.004, mat: 'silver', mirror: true, layer: 1, depth: 0.006, poly: ertigaCircle(0.588, 0.85, 0.034) },
    { step: 0.004, mat: 'head', mirror: true, layer: 2, depth: 0.008, poly: ertigaCircle(0.688, 0.866, 0.017) },
    { step: 0.004, mat: 'head', mirror: true, layer: 2, depth: 0.008, poly: ertigaCircle(0.588, 0.85, 0.013) },
    { step: 0.004, mat: 'amber', mirror: true, layer: 1, depth: 0.006, poly: smooth([[0.445, 0.836], [0.515, 0.83], [0.52, 0.86], [0.455, 0.866]], 1) },
    { step: 0.004, mat: 'chrome', mirror: true, layer: 1, depth: 0.007, poly: band([[0.44, 0.82], [0.52, 0.813], [0.6, 0.803], [0.7, 0.812], [0.745, 0.826]], 0.012) },
    // the black lower grille with its slats, running out under the body-coloured blades to the corners
    { step: 0.004, mat: 'trim', poly: both([[0, 0.36], [0.6, 0.36], [0.71, 0.352], [0.75, 0.372], [0.755, 0.402], [0.71, 0.408], [0.55, 0.452], [0.42, 0.49], [0.38, 0.505], [0, 0.505]]) },
    ...[0.38, 0.415, 0.45].map((y): Decal => ({ step: 0.004, mat: 'gloss', layer: 1, depth: 0.004, poly: both([[0, y], [0.335 + (y - 0.36) * 0.3, y], [0.335 + (y - 0.36) * 0.3, y + 0.014], [0, y + 0.014]]) })),
    // fog lamps in black pods under a slanting black brow
    { step: 0.004, mat: 'trim', mirror: true, layer: 1, depth: 0.006, poly: smooth([[0.58, 0.47], [0.72, 0.452], [0.748, 0.472], [0.758, 0.55], [0.758, 0.63], [0.745, 0.658], [0.7, 0.65], [0.6, 0.628], [0.5, 0.606], [0.49, 0.594], [0.58, 0.588]], 1) },
    { step: 0.004, mat: 'chrome', mirror: true, layer: 2, depth: 0.008, poly: ertigaCircle(0.675, 0.55, 0.044) },
    { step: 0.004, mat: 'head', mirror: true, layer: 3, depth: 0.01, poly: ertigaCircle(0.675, 0.55, 0.031) },
  ],
  rear: [
    // the tailgate glass between the lamps, under the spoiler
    { step: 0.005, mat: 'gloss', depth: 0.003, poly: both([[0, 1.235], [0.56, 1.235], [0.59, 1.25], [0.6, 1.3], [0.585, 1.4], [0.565, 1.48], [0.545, 1.52], [0, 1.52]]) },
    // the boomerang tail lamps: the tall wedge up each D-pillar, the main lens round the corner, the inner arm on the
    // tailgate with its clear reversing lamp
    { step: 0.003, mat: 'reflector', mirror: true, depth: 0.002, poly: smooth([[0.605, 1.2], [0.745, 1.2], [0.737, 1.3], [0.725, 1.4], [0.715, 1.47], [0.7, 1.505], [0.688, 1.515], [0.676, 1.5], [0.65, 1.38], [0.62, 1.26]], 1) },
    { step: 0.004, mat: 'gloss', mirror: true, depth: 0.004, poly: smooth([[0.37, 0.995], [0.8, 0.995], [0.818, 1.02], [0.82, 1.1], [0.815, 1.18], [0.79, 1.205], [0.7, 1.19], [0.6, 1.15], [0.58, 1.09], [0.4, 1.085], [0.37, 1.06]], 1) },
    { step: 0.004, mat: 'reflector', mirror: true, layer: 1, depth: 0.003, poly: smooth([[0.59, 1.005], [0.79, 1.005], [0.808, 1.03], [0.81, 1.1], [0.805, 1.17], [0.785, 1.19], [0.7, 1.176], [0.61, 1.14], [0.6, 1.1]], 1) },
    { step: 0.004, mat: 'tail', mirror: true, layer: 1, depth: 0.006, poly: [[0.375, 1.002], [0.585, 1.002], [0.585, 1.034], [0.395, 1.034], [0.378, 1.022]] },
    { step: 0.004, mat: 'silver', mirror: true, layer: 2, depth: 0.008, poly: smooth([[0.42, 1.04], [0.582, 1.04], [0.582, 1.082], [0.44, 1.078], [0.42, 1.06]], 1) },
    { step: 0.004, mat: 'silver', mirror: true, layer: 2, depth: 0.008, poly: smooth([[0.6, 1.03], [0.72, 1.03], [0.72, 1.08], [0.6, 1.085]], 1) },
    // the chrome strip under the glass and the tailgate's shut line round the plate
    { step: 0.004, mat: 'chrome', depth: 0.006, poly: band([[-0.56, 1.205], [0.56, 1.205]], 0.012) },
    { step: 0.005, mat: 'gloss', depth: 0.001, poly: band([[-0.59, 0.995], [-0.59, 0.72], [-0.575, 0.67], [-0.53, 0.65], [-0.4, 0.645], [0, 0.645], [0.4, 0.645], [0.53, 0.65], [0.575, 0.67], [0.59, 0.72], [0.59, 0.995]], 0.012) },
    // reflectors in the bumper corners, the black lower bumper
    { step: 0.004, mat: 'reflector', mirror: true, poly: rrect(0.56, 0.465, 0.72, 0.5, 0.008) },
    { step: 0.005, mat: 'trim', poly: both([[0, 0.36], [0.62, 0.36], [0.7, 0.375], [0.71, 0.4], [0.68, 0.41], [0, 0.41]]) },
  ],
  side: [
    // chrome door handles
    { step: 0.004, mat: 'chrome', depth: 0.01, poly: [[0.56385, 0.9652], [0.56488, 0.9662], [0.56576, 0.9688], [0.56635, 0.9727], [0.56655, 0.9772], [0.56655, 0.9806], [0.56635, 0.9851], [0.56576, 0.989], [0.56488, 0.9916], [0.56385, 0.9926], [0.52285, 0.9926], [0.52182, 0.9916], [0.52094, 0.989], [0.52035, 0.9851], [0.52015, 0.9806], [0.52015, 0.9772], [0.52035, 0.9727], [0.52094, 0.9688], [0.52182, 0.9662], [0.52285, 0.9652]] },
    { step: 0.004, mat: 'chrome', depth: 0.01, poly: [[0.30861, 1.0433], [0.30964, 1.0442], [0.31052, 1.0468], [0.31111, 1.0507], [0.31131, 1.0553], [0.31131, 1.0586], [0.31111, 1.0631], [0.31052, 1.067], [0.30964, 1.0696], [0.30861, 1.0706], [0.26954, 1.0706], [0.26851, 1.0696], [0.26763, 1.067], [0.26704, 1.0631], [0.26684, 1.0586], [0.26684, 1.0553], [0.26704, 1.0507], [0.26763, 1.0468], [0.26851, 1.0442], [0.26954, 1.0433]] },
    // the tail lamp wrapping onto the flank, narrowing forwards into the crease
    { step: 0.004, mat: 'gloss', depth: 0.004, poly: [[0.106, 1.0901], [0.09, 1.1212], [0.07, 1.1583], [0.05, 1.17], [0.02, 1.17], [0.012, 1.1212], [0.012, 0.9945], [0.04, 0.9828], [0.07, 0.9945], [0.09, 1.0433]] },
    { step: 0.004, mat: 'reflector', layer: 1, depth: 0.006, poly: [[0.096, 1.0901], [0.084, 1.1134], [0.068, 1.1427], [0.05, 1.1524], [0.02, 1.1524], [0.016, 1.1212], [0.016, 1.0043], [0.04, 0.9964], [0.066, 1.0062], [0.084, 1.0481]] },
    // the headlamp sweeping back along the front wing
    { step: 0.003, mat: 'gloss', depth: 0.002, poly: smooth([[0.88, 0.918], [0.9, 0.915], [0.925, 0.908], [0.95, 0.898], [0.966, 0.888], [0.97, 0.835], [0.95, 0.826], [0.93, 0.822], [0.91, 0.845], [0.893, 0.88]], 1) },
    { step: 0.003, mat: 'chrome', layer: 1, depth: 0.004, poly: sideBand([[0.968, 0.84], [0.95, 0.832], [0.93, 0.829], [0.91, 0.852], [0.893, 0.885]], 0.012, ERTIGA_L) },
  ],
  plates: { front: 0.59, rear: 0.93 },
  mirrors: 'body',
  paint: '#520716', // Auburn Red / Dignity Brown maroon of the photos, darkened for the studio lights
  plate: 'MH 12 ER 2026',
}

const TIAGO_L = 3.813
/** a side outline from a rounded rectangle given in u (0…1) and metres */
const tiagoRectU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  rrectS(u0 * TIAGO_L, y0, u1 * TIAGO_L, y1, r).map(([x, y]) => [+(x / TIAGO_L).toFixed(5), y] as P2)
/** a horizontal grille slat from z0 to z1 at height y */
const tiagoSlat = (z0: number, z1: number, y: number): Decal => ({
  step: 0.004, mat: 'trim', layer: 2, depth: 0.005, poly: rrect(z0, y, z1, y + 0.013, 0.004),
})

/** Tata Tiago (2026 facelift). 3813 × 1684 × 1535, wheelbase 2400, 175/60 R15 (top trim, as on the gallery car).
 *  Side profile from a levelled gallery side photo (height 1.536; the close camera spreads the axles by 2 %, so the axles
 *  sit at the official wheelbase with the overhangs split as in the photo). Belt, pillars, handles and shut lines read
 *  off a metric grid of the cut-out; the slim headlamps joined by the gloss-black band, the trapezoid lower grille, the
 *  full-width tail light bar and the black rear bumper from the straight front and rear photos and close-ups. */
export const TIAGO: CarSpec = {
  id: 'tata-tiago',
  name: 'Tata Tiago',
  dropSlivers: true,
  L: TIAGO_L, W: 1.684, H: 1.535,
  axles: [0.1523, 0.7817],
  tyreR: 0.2955, tyreW: 0.175, rim: 0.645, wheel: { style: 'swirl', spokes: 5 }, rimTone: 'dark',
  archGap: 0.05, archSquare: 0.2,
  sill: [[0, 0.36], [0.005, 0.3], [0.015, 0.28], [0.03, 0.265], [0.05, 0.258], [0.1, 0.25], [0.2, 0.245], [0.3, 0.244], [0.5, 0.244], [0.6, 0.24], [0.7, 0.225], [0.8, 0.22], [0.9, 0.221], [0.94, 0.228], [0.97, 0.248], [0.985, 0.268], [0.995, 0.285], [1, 0.3]],
  // the tail up to the light bar; the belt kicking up under the tailgate and quarter glass (the body forms the lower
  // D-pillar), the window line sweeping up towards the rear; the cowl, then the bonnet falling to the headlamps' band
  top: [[0, 1.05], [0.008, 1.06], [0.02, 1.066], [0.03, 1.072], [0.045, 1.085], [0.06, 1.105], [0.08, 1.15], [0.1, 1.19], [0.12, 1.22], [0.14, 1.236], [0.16, 1.238], [0.175, 1.226], [0.19, 1.19], [0.2, 1.16], [0.25, 1.105], [0.3, 1.08], [0.35, 1.065], [0.42, 1.045], [0.5, 1.02], [0.6, 0.995], [0.68, 0.99], [0.71, 1.0], [0.735, 1.016], [0.755, 1.036], [0.77, 1.042], [0.785, 1.04], [0.8, 1.034], [0.82, 1.017], [0.84, 1.003], [0.86, 0.985], [0.88, 0.97], [0.9, 0.952], [0.92, 0.93], [0.94, 0.903], [0.955, 0.884], [0.965, 0.878], [0.975, 0.874], [0.985, 0.871], [0.993, 0.869], [1, 0.867]],
  // round in plan: both ends taper into the corners
  width: [[0, 0.84], [0.006, 0.9], [0.018, 0.945], [0.04, 0.972], [0.08, 0.99], [0.15, 1], [0.5, 0.995], [0.8, 0.995], [0.86, 0.985], [0.92, 0.965], [0.955, 0.94], [0.978, 0.91], [0.992, 0.885], [1, 0.86]],
  crown: 0.015,
  bulge: 0.035,
  topRadius: 0.09,
  noseSweep: 0.1,
  tailSweep: 0.08,
  greenhouse: {
    u0: 0.03, u1: 0.755, tumble: 0.62,
    // the raked tailgate glass up to the roof spoiler, the roof falling gently to the rear, the raked windscreen
    top: [[0.03, 1.07], [0.04, 1.1], [0.05, 1.138], [0.06, 1.178], [0.07, 1.216], [0.08, 1.25], [0.09, 1.283], [0.1, 1.316], [0.11, 1.352], [0.12, 1.392], [0.13, 1.428], [0.14, 1.452], [0.15, 1.466], [0.17, 1.481], [0.2, 1.499], [0.25, 1.513], [0.3, 1.523], [0.35, 1.531], [0.4, 1.53], [0.45, 1.519], [0.5, 1.5], [0.53, 1.477], [0.55, 1.457], [0.57, 1.425], [0.6, 1.373], [0.63, 1.321], [0.66, 1.256], [0.69, 1.198], [0.72, 1.135], [0.74, 1.085], [0.755, 1.045]],
  },
  // body-coloured roof: the dual-tone paints bring their own black roof (cars.json colours)
  roof: { u0: 0.13617, u1: 0.54978, black: false },
  pillars: [
    // the upper body-coloured D-pillar, only where the glasshouse still faces sideways (further back it crumpled); the
    // piano-black quarter reads as the dark glass; the black B-pillar and the body-coloured A-pillar
    { bottom: [0.13, 0.17], top: [0.15, 0.205], black: false },
    { bottom: [0.397, 0.42], top: [0.395, 0.418], black: true },
    { bottom: [0.728, 0.755], top: [0.54978, 0.575], black: false },
  ],
  // black arch flares only; the black lip under the nose and the black lower rear bumper's corners
  cladding: { top: [[0, 0.37], [0.025, 0.34], [0.05, 0.15], [0.95, 0.15], [0.975, 0.3], [0.99, 0.33], [1, 0.33]], flare: 0.045, cut: true },
  doors: [[0.678, 0.68], [0.419, 0.42]],
  front: [
    // the slim swept headlamps joined by the gloss-black band under the bonnet's leading edge (no badge)
    { step: 0.004, mat: 'gloss', poly: both([[0, 0.7], [0.3, 0.7], [0.47, 0.705], [0.58, 0.722], [0.635, 0.738], [0.66, 0.752], [0.67, 0.78], [0.668, 0.815], [0.65, 0.832], [0.58, 0.818], [0.48, 0.795], [0.3, 0.79], [0, 0.79]]) },
    { step: 0.004, mat: 'silver', mirror: true, layer: 1, depth: 0.006, poly: rrect(0.515, 0.744, 0.592, 0.783, 0.008) },
    { step: 0.004, mat: 'silver', mirror: true, layer: 1, depth: 0.006, poly: rrect(0.598, 0.756, 0.652, 0.796, 0.008) },
    { step: 0.004, mat: 'head', mirror: true, layer: 2, depth: 0.008, poly: rrect(0.53, 0.752, 0.578, 0.775, 0.005) },
    { step: 0.004, mat: 'head', mirror: true, layer: 2, depth: 0.008, poly: rrect(0.608, 0.764, 0.642, 0.788, 0.005) },
    { step: 0.004, mat: 'drl', mirror: true, layer: 2, depth: 0.008, poly: band([[0.49, 0.788], [0.58, 0.808], [0.63, 0.818], [0.65, 0.821]], 0.012) },
    // the trapezoid lower grille: a dark frame running out to the corner lamp pods, the gloss grille with grey slats
    { step: 0.005, mat: 'trim', poly: both(smooth([[0, 0.34], [0.58, 0.34], [0.66, 0.35], [0.705, 0.37], [0.715, 0.4], [0.71, 0.44], [0.63, 0.45], [0.57, 0.49], [0.5, 0.55], [0.45, 0.578], [0.4, 0.584], [0, 0.584]], 1)) },
    { step: 0.004, mat: 'gloss', layer: 1, poly: both(smooth([[0, 0.365], [0.55, 0.365], [0.575, 0.375], [0.58, 0.41], [0.54, 0.45], [0.48, 0.51], [0.43, 0.548], [0.38, 0.556], [0, 0.556]], 1)) },
    ...[0.38, 0.41, 0.44].map((y) => tiagoSlat(-0.53 + (y - 0.38) * 0.6, 0.53 - (y - 0.38) * 0.6, y)),
    ...[0.47, 0.5].flatMap((y) => [tiagoSlat(0.27, 0.5 - (y - 0.47) * 1.4, y), tiagoSlat(-0.5 + (y - 0.47) * 1.4, -0.27, y)]),
    // the lamp pods in the grille's outer corners
    { step: 0.004, mat: 'gloss', mirror: true, layer: 1, depth: 0.006, poly: rrect(0.6, 0.375, 0.7, 0.43, 0.01) },
    { step: 0.004, mat: 'head', mirror: true, layer: 2, depth: 0.008, poly: rrect(0.625, 0.39, 0.675, 0.414, 0.005) },
  ],
  rear: [
    // the light bar across the tailgate: lamps at the corners, a smoked red bar between, a red guide along its top
    { step: 0.004, mat: 'gloss', poly: both(smooth([[0, 0.93], [0.5, 0.93], [0.6, 0.924], [0.64, 0.91], [0.66, 0.906], [0.672, 0.925], [0.674, 0.98], [0.67, 1.03], [0.652, 1.043], [0.6, 1.044], [0.5, 1.036], [0, 1.036]], 1)) },
    { step: 0.004, mat: 'reflector', layer: 1, depth: 0.006, poly: both([[0, 0.942], [0.53, 0.942], [0.53, 1.024], [0, 1.024]]) },
    { step: 0.004, mat: 'reflector', mirror: true, layer: 1, depth: 0.006, poly: smooth([[0.545, 0.94], [0.61, 0.932], [0.645, 0.92], [0.66, 0.925], [0.662, 0.98], [0.657, 1.026], [0.61, 1.032], [0.545, 1.028]], 1) },
    { step: 0.004, mat: 'tail', layer: 2, depth: 0.008, poly: both([[0, 1.003], [0.6, 1.006], [0.656, 1.01], [0.656, 1.022], [0.6, 1.019], [0, 1.016]]) },
    { step: 0.004, mat: 'tail', mirror: true, layer: 2, depth: 0.008, poly: rrect(0.6, 0.945, 0.65, 0.988, 0.006) },
    { step: 0.004, mat: 'amber', mirror: true, layer: 2, depth: 0.008, poly: rrect(0.55, 0.95, 0.59, 0.985, 0.006) },
    // the tailgate panel's shut line round its lower edge, the red notch under it
    { step: 0.005, mat: 'gloss', depth: 0.001, poly: band([[-0.545, 0.925], [-0.545, 0.74], [-0.535, 0.705], [-0.5, 0.69], [-0.3, 0.686], [0, 0.685], [0.3, 0.686], [0.5, 0.69], [0.535, 0.705], [0.545, 0.74], [0.545, 0.925]], 0.012) },
    { step: 0.004, mat: 'reflector', poly: rrect(-0.1, 0.652, 0.1, 0.676, 0.008) },
    // the black lower bumper with the reversing lamp, and the slim red reflectors at its corners
    { step: 0.005, mat: 'trim', poly: both(smooth([[0, 0.33], [0.6, 0.33], [0.65, 0.345], [0.672, 0.38], [0.645, 0.42], [0.55, 0.52], [0.48, 0.575], [0.42, 0.592], [0, 0.592]], 1)) },
    { step: 0.004, mat: 'silver', layer: 1, depth: 0.006, poly: rrect(-0.1, 0.36, 0.1, 0.405, 0.01) },
    { step: 0.004, mat: 'reflector', mirror: true, layer: 1, poly: rrect(0.64, 0.44, 0.66, 0.62, 0.006) },
  ],
  side: [
    // chrome door handles
    { step: 0.004, mat: 'chrome', depth: 0.008, poly: tiagoRectU(0.435, 0.905, 0.49, 0.928, 0.01) },
    { step: 0.004, mat: 'chrome', depth: 0.008, poly: tiagoRectU(0.175, 0.94, 0.232, 0.963, 0.01) },
    // the rear door's curved rear edge (the doors' own lines are straight)
    { step: 0.004, mat: 'gloss', depth: 0.001, poly: sideBand([[0.27, 0.3], [0.245, 0.34], [0.222, 0.42], [0.21, 0.55], [0.203, 0.7], [0.192, 0.88], [0.18, 1.0], [0.17, 1.12]], 0.012, TIAGO_L) },
    // the tail lamp wrapping onto the flank
    { step: 0.006, mat: 'reflector', depth: 0, poly: [[0.02, 0.928], [0.09, 0.928], [0.104, 0.95], [0.122, 0.988], [0.11, 1.022], [0.08, 1.04], [0.05, 1.045], [0.02, 1.045]] },
    { step: 0.004, mat: 'tail', layer: 1, depth: 0.003, poly: [[0.025, 1.018], [0.07, 1.015], [0.11, 1.0], [0.112, 1.012], [0.07, 1.028], [0.025, 1.031]] },
    // the clamshell bonnet's shut line down the front wing to the headlamp
    { step: 0.004, mat: 'gloss', depth: 0.001, poly: sideBand([[0.765, 1.04], [0.79, 1.0], [0.83, 0.935], [0.855, 0.905], [0.872, 0.892]], 0.012, TIAGO_L) },
    // the headlamp sweeping back along the wing (its front part is on the nose)
    { step: 0.004, mat: 'gloss', depth: 0.005, poly: smooth([[0.977, 0.768], [0.96, 0.776], [0.94, 0.786], [0.91, 0.802], [0.885, 0.83], [0.866, 0.876], [0.876, 0.886], [0.91, 0.876], [0.94, 0.865], [0.96, 0.855], [0.977, 0.846]], 1) },
    { step: 0.004, mat: 'drl', layer: 1, depth: 0.008, poly: sideBand([[0.972, 0.836], [0.94, 0.851], [0.905, 0.864], [0.882, 0.874]], 0.012, TIAGO_L) },
    // the slim vertical vent at the front bumper's corner
    { step: 0.004, mat: 'gloss', poly: [[0.924, 0.37], [0.932, 0.37], [0.947, 0.6], [0.939, 0.6]] },
  ],
  plates: { front: 0.527, rear: 0.51 },
  mirrors: 'black',
  paint: '#c44d22', // the orange of the gallery car, darkened for the studio lights
  plate: 'MH 12 TG 2026',
}

const HARRIER_L = 4.605
/** a side outline from a rounded rectangle given in u (0…1) and metres */
const harrierRectU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  rrectS(u0 * HARRIER_L, y0, u1 * HARRIER_L, y1, r).map(([x, y]) => [+(x / HARRIER_L).toFixed(5), y] as P2)
/** the parametric grille's staggered rows of short silver bars: rows at heights ys, kept inside half-width hw(y) and off
 *  the number plate */
const harrierBricks = (ys: number[], hw: (y: number) => number, skip?: (z: number, y: number) => boolean): Decal[] =>
  ys.flatMap((y, i) => {
    const out: Decal[] = []
    const pitch = 0.108, w = 0.056, h = 0.012
    for (let z = (i % 2 ? pitch / 2 : 0) - 1.2; z < 1.2; z += pitch) {
      if (Math.abs(z) + w / 2 > hw(y) || skip?.(z, y)) continue
      out.push({ step: 0.004, mat: 'satin', layer: 2, depth: 0.008, poly: rrectS(z - w / 2, y - h / 2, z + w / 2, y + h / 2, 0.004) })
    }
    return out
  })

/** Tata Harrier (2023 facelift, petrol/diesel). 4605 × 1922 × 1718, wheelbase 2741, 245/55 R19 (top trim).
 *  Side profile from a levelled gallery side photo (1.75 m measured from the close camera, so heights scaled by 0.982;
 *  the photo's axles 2 % too far apart, so the axles sit at the official wheelbase with the overhangs split as in the
 *  photo). Belt, cladding, handles and shut lines read off a metric grid of the cut-out; the light bar on the bonnet's
 *  edge, the split headlamp pods, the parametric grilles and the skid plates from the straight front and rear photos,
 *  the connected tail lamp bar from the rear photos and close-ups. */
export const HARRIER: CarSpec = {
  id: 'tata-harrier',
  name: 'Tata Harrier',
  L: HARRIER_L, W: 1.922, H: 1.718,
  axles: [0.2159, 0.8111],
  tyreR: 0.376, tyreW: 0.245, rim: 0.642, wheel: { style: 'twin', spokes: 5 }, rimTone: 'dark',
  archGap: 0.09, archSquare: 0.3,
  sill: [[0, 0.33], [0.01, 0.33], [0.02, 0.34], [0.04, 0.35], [0.06, 0.34], [0.08, 0.31], [0.12, 0.3], [0.3, 0.27], [0.4, 0.265], [0.6, 0.262], [0.68, 0.262], [0.72, 0.245], [0.9, 0.245], [0.94, 0.245], [0.96, 0.27], [0.98, 0.285], [0.99, 0.285], [1, 0.29]],
  // the tail face up to the light bar, the body-coloured D-pillar climbing beside the tailgate glass, the belt falling
  // gently to the front under the windows, the long bonnet falling to the light bar on its leading edge
  top: [[0, 1.22], [0.006, 1.24], [0.012, 1.255], [0.02, 1.268], [0.03, 1.28], [0.06, 1.3], [0.1, 1.315], [0.15, 1.322], [0.2, 1.316], [0.25, 1.302], [0.3, 1.285], [0.4, 1.258], [0.5, 1.238], [0.6, 1.222], [0.66, 1.212], [0.7, 1.206], [0.72, 1.2], [0.74, 1.197], [0.76, 1.183], [0.78, 1.174], [0.8, 1.167], [0.82, 1.16], [0.84, 1.153], [0.86, 1.145], [0.88, 1.125], [0.9, 1.11], [0.92, 1.088], [0.94, 1.06], [0.95, 1.045], [0.96, 1.026], [0.97, 1.006], [0.98, 0.99], [0.99, 0.98], [1, 0.975]],
  width: [[0, 0.86], [0.006, 0.91], [0.02, 0.955], [0.05, 0.982], [0.1, 0.997], [0.5, 1], [0.88, 0.997], [0.92, 0.985], [0.95, 0.965], [0.975, 0.935], [0.99, 0.9], [1, 0.87]],
  crown: 0.012,
  bulge: 0.03,
  haunch: 0.045,
  topRadius: 0.1,
  dropSlivers: true,
  rakedEnds: true,
  noseSweep: 0.12,
  tailSweep: 0.12,
  greenhouse: {
    u0: 0.02, u1: 0.72, tumble: 0.68,
    // the raked tailgate glass under the big roof spoiler, the roof (rails left out) and the raked screen
    top: [[0.02, 1.268], [0.03, 1.3], [0.045, 1.345], [0.06, 1.375], [0.07, 1.405], [0.08, 1.45], [0.085, 1.53], [0.09, 1.6], [0.1, 1.613], [0.12, 1.625], [0.15, 1.64], [0.2, 1.665], [0.25, 1.675], [0.3, 1.68], [0.36, 1.683], [0.45, 1.678], [0.5, 1.662], [0.52, 1.65], [0.55, 1.622], [0.57, 1.59], [0.6, 1.53], [0.65, 1.404], [0.7, 1.263], [0.72, 1.2]],
  },
  roof: { u0: 0.0915, u1: 0.5562, black: false },
  pillars: [
    // the black B-pillar (the thin C-pillar and the A-pillar are left as plain glass)
    { bottom: [0.445, 0.468], top: [0.448, 0.468], black: true },
  ],
  // black arch flares, the black band along the doors, the black bumpers
  cladding: { top: [[0, 0.62], [0.05, 0.62], [0.08, 0.56], [0.12, 0.53], [0.3, 0.53], [0.5, 0.51], [0.7, 0.49], [0.9, 0.47], [0.94, 0.47], [1, 0.47]], flare: 0.055, cut: true },
  doors: [[0.712, 0.705], [0.462, 0.457], [0.28, 0.24]],
  front: [
    // the gloss-black band along the bonnet's leading edge carrying the full-width LED light bar
    { step: 0.005, mat: 'gloss', poly: both([[0, 0.9], [0.55, 0.9], [0.7, 0.906], [0.755, 0.918], [0.772, 0.935], [0.762, 0.952], [0.7, 0.955], [0, 0.952]]) },
    { step: 0.005, mat: 'drl', layer: 1, poly: both([[0, 0.928], [0.6, 0.928], [0.72, 0.933], [0.762, 0.94], [0.766, 0.947], [0.72, 0.945], [0.6, 0.942], [0, 0.942]]) },
    // the upper grille: gloss black with staggered silver bars, and the gloss strip joining the headlamp pods
    { step: 0.005, mat: 'gloss', poly: both([[0, 0.745], [0.55, 0.745], [0.585, 0.8], [0.59, 0.9], [0, 0.9]]) },
    ...harrierBricks([0.885, 0.857, 0.829, 0.801, 0.773], (y) => 0.55 + (y - 0.745) * 0.25),
    { step: 0.005, mat: 'gloss', poly: both([[0, 0.705], [0.72, 0.705], [0.74, 0.74], [0, 0.74]]) },
    // the split headlamp pods in the bumper corners: projector on top, fog lamp, slatted pocket below
    { step: 0.005, mat: 'gloss', mirror: true, depth: 0.008, poly: smooth([[0.69, 0.8], [0.705, 0.83], [0.8, 0.84], [0.805, 0.5], [0.775, 0.5], [0.72, 0.665], [0.69, 0.71]], 1) },
    { step: 0.005, mat: 'head', layer: 1, mirror: true, poly: rrectS(0.715, 0.765, 0.79, 0.815, 0.014) },
    { step: 0.005, mat: 'head', layer: 1, mirror: true, poly: rrectS(0.735, 0.68, 0.79, 0.702, 0.006) },
    { step: 0.005, mat: 'slats', layer: 1, mirror: true, poly: [[0.775, 0.52], [0.792, 0.52], [0.792, 0.662], [0.735, 0.662]] },
    // the lower grille between the body-coloured bumper corners, and the satin skid plate
    { step: 0.005, mat: 'gloss', poly: both([[0, 0.445], [0.6, 0.445], [0.68, 0.6], [0.7, 0.655], [0, 0.655]]) },
    ...harrierBricks([0.635, 0.607, 0.579, 0.551, 0.523, 0.495, 0.467], (y) => 0.6 + (y - 0.445) * 0.42, (z, y) => Math.abs(z) < 0.29 && Math.abs(y - 0.62) < 0.072),
    { step: 0.005, mat: 'satin', layer: 1, poly: smooth(both([[0, 0.34], [0.52, 0.34], [0.6, 0.36], [0.66, 0.42], [0.66, 0.44], [0, 0.44]]), 2) },
  ],
  rear: [
    // the connected light bar: a smoked band, a red line along its top, and the corner units with a red chevron
    { step: 0.005, mat: 'gloss', depth: 0.004, poly: both([[0, 1.12], [0.6, 1.12], [0.7, 1.112], [0.775, 1.12], [0.788, 1.14], [0.788, 1.2], [0.7, 1.207], [0, 1.205]]) },
    { step: 0.005, mat: 'tail', layer: 1, poly: both([[0, 1.18], [0.6, 1.18], [0.775, 1.185], [0.775, 1.195], [0.6, 1.192], [0, 1.192]]) },
    { step: 0.005, mat: 'tail', layer: 1, mirror: true, poly: [[0.6, 1.15], [0.68, 1.135], [0.775, 1.135], [0.775, 1.158], [0.68, 1.16], [0.6, 1.16]] },
    // the tailgate's shut line round the plate recess
    { step: 0.005, mat: 'gloss', depth: 0.001, poly: band([[-0.69, 1.11], [-0.69, 0.77], [-0.65, 0.74], [0, 0.735], [0.65, 0.74], [0.69, 0.77], [0.69, 1.11]], 0.012) },
    // the black bumper, higher in the middle, and the satin skid plate
    { step: 0.005, mat: 'trim', poly: both([[0, 0.6], [0.7, 0.6], [0.79, 0.615], [0.7, 0.67], [0.6, 0.715], [0, 0.73]]) },
    { step: 0.005, mat: 'satin', layer: 1, poly: smooth(both([[0, 0.38], [0.6, 0.38], [0.64, 0.4], [0.645, 0.55], [0.62, 0.565], [0, 0.565]]), 2) },
  ],
  side: [
    // the tail lamp wedge on the flank: smoked housing, the red line along its top and the chevron below
    { step: 0.004, mat: 'gloss', depth: 0.002, poly: [[0.02, 1.13], [0.06, 1.15], [0.15, 1.2], [0.12, 1.235], [0.06, 1.245], [0.02, 1.25]] },
    { step: 0.004, mat: 'tail', layer: 1, depth: 0.004, poly: [[0.02, 1.215], [0.13, 1.212], [0.12, 1.224], [0.02, 1.228]] },
    { step: 0.004, mat: 'tail', layer: 1, depth: 0.004, poly: [[0.02, 1.145], [0.05, 1.145], [0.062, 1.172], [0.02, 1.172]] },
    // the vertical slit with a reflector at the rear bumper's corner
    { step: 0.005, mat: 'gloss', poly: [[0.042, 0.63], [0.056, 0.63], [0.062, 0.9], [0.05, 0.92]] },
    { step: 0.005, mat: 'reflector', layer: 1, poly: [[0.046, 0.76], [0.056, 0.76], [0.059, 0.885], [0.05, 0.895]] },
    // body-coloured door handles
    { step: 0.005, mat: 'body', depth: 0.01, poly: harrierRectU(0.48, 1.035, 0.53, 1.065, 0.012) },
    { step: 0.005, mat: 'body', depth: 0.01, poly: harrierRectU(0.248, 1.075, 0.298, 1.105, 0.012) },
  ],
  plates: { front: 0.62, rear: 1.04 },
  rails: 'black',
  sunroof: [0.22, 0.5],
  mirrors: 'black',
  paint: '#760705', // Fearless Red, darkened for the studio lights
  plate: 'MH 12 HR 2026',
}

const HYCROSS_L = 4.755
/** a side outline from a rounded rectangle given in u (0…1) and metres */
const hycrossU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  rrectS(u0 * HYCROSS_L, y0, u1 * HYCROSS_L, y1, r).map(([x, y]) => [+(x / HYCROSS_L).toFixed(5), y] as P2)
/** a circle outline (fog lamps, projectors) */
const hycrossCircle = (zc: number, yc: number, r: number, n = 40): P2[] =>
  Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return [+(zc + r * Math.cos(a)).toFixed(4), +(yc + r * Math.sin(a)).toFixed(4)] as P2 })

/** Toyota Innova Hycross (2022). 4755 × 1845 × 1790, wheelbase 2850, 225/50 R18 (ZX (O)).
 *  Side profile from a levelled gallery side photo (1.786 m measured over the roof antenna; the photo's axles 1.9 % too
 *  far apart, so the axles sit at the official wheelbase with the overhangs split as in the photo). Belt, pillars, shut
 *  lines and cladding read off a metric grid of the levelled cut-out; the hexagonal chrome-ringed grille, slim headlamps
 *  and the C-framed corner pockets from the straight front photo; the wraparound tail lamps and the grey lower bumper
 *  from the straight rear and three-quarter photos. */
export const INNOVA_HYCROSS: CarSpec = {
  id: 'toyota-innova-hycross',
  name: 'Toyota Innova Hycross',
  rakedEnds: true,
  dropSlivers: true,
  L: HYCROSS_L, W: 1.845, H: 1.79,
  axles: [0.2094, 0.8088],
  tyreR: 0.3411, tyreW: 0.225, rim: 0.67, wheel: { style: 'split', spokes: 5 },
  archGap: 0.09, archSquare: 0.25,
  sill: [[0, 0.36], [0.02, 0.37], [0.04, 0.36], [0.06, 0.345], [0.08, 0.33], [0.1, 0.315], [0.13, 0.3], [0.2, 0.28], [0.3, 0.272], [0.5, 0.268], [0.7, 0.258], [0.8, 0.25], [0.88, 0.24], [0.9, 0.222], [0.93, 0.21], [0.95, 0.22], [0.97, 0.26], [0.98, 0.28], [0.99, 0.295], [1, 0.31]],
  // the upright tail up to the lamps, the D-pillar body rising to the quarter glass's upturned tip, the belt falling
  // forwards to the cowl, then the long bonnet down to the upright grille face
  top: [[0, 1.285], [0.005, 1.295], [0.012, 1.31], [0.02, 1.335], [0.03, 1.375], [0.04, 1.425], [0.05, 1.475], [0.06, 1.53], [0.066, 1.58], [0.072, 1.665], [0.078, 1.708], [0.09, 1.728], [0.1, 1.734], [0.12, 1.741], [0.15, 1.747], [0.178, 1.748], [0.186, 1.748], [0.19, 1.45], [0.194, 1.375], [0.2, 1.352], [0.21, 1.325], [0.25, 1.295], [0.3, 1.282], [0.4, 1.258], [0.5, 1.235], [0.6, 1.208], [0.65, 1.195], [0.7, 1.183], [0.74, 1.178], [0.76, 1.192], [0.78, 1.215], [0.8, 1.207], [0.85, 1.173], [0.9, 1.135], [0.93, 1.103], [0.95, 1.077], [0.96, 1.062], [0.97, 1.049], [0.98, 1.04], [0.99, 1.034], [1, 1.03]],
  width: [[0, 0.9], [0.005, 0.93], [0.015, 0.955], [0.04, 0.978], [0.08, 0.993], [0.15, 1], [0.85, 1], [0.9, 0.992], [0.94, 0.978], [0.965, 0.96], [0.985, 0.94], [1, 0.92]],
  crown: 0.015,
  bulge: 0.03,
  // the tail's tumblehome above the lamps only (the line sits above the belt elsewhere, so the inset is off there)
  shoulder: { y: [[0, 1.3], [0.17, 1.35], [0.2, 1.5], [1, 1.5]], inset: 0.13 },
  haunch: 0.04,
  bonnetRidge: 0.01,
  topRadius: 0.07,
  noseSweep: 0.1,
  tailSweep: 0.1,
  greenhouse: {
    u0: 0.18, u1: 0.78, tumble: 0.88, followBody: 0.2,
    // the raked tailgate glass up under the roof spoiler, the long flat roof, the raked screen
    top: [[0.18, 1.744], [0.2, 1.746], [0.3, 1.749], [0.4, 1.746], [0.44, 1.743], [0.47, 1.738], [0.5, 1.728], [0.53, 1.711], [0.56, 1.69], [0.58, 1.674], [0.6, 1.653], [0.62, 1.626], [0.65, 1.565], [0.68, 1.5], [0.7, 1.442], [0.72, 1.36], [0.74, 1.3], [0.76, 1.248], [0.78, 1.215]],
  },
  roof: { u0: 0.18, u1: 0.59169, black: false },
  pillars: [
    // the thin black C- and B-pillars
    { bottom: [0.278, 0.296], top: [0.278, 0.296], black: true },
    { bottom: [0.495, 0.515], top: [0.495, 0.515], black: true },
  ],
  // black arch flares joined by the black rocker, black lower bumpers
  cladding: { top: [[0, 0.5], [0.04, 0.5], [0.07, 0.45], [0.1, 0.38], [0.13, 0.355], [0.3, 0.355], [0.7, 0.35], [0.9, 0.345], [0.94, 0.37], [0.97, 0.4], [1, 0.4]], flare: 0.07, cut: true },
  doors: [[0.738, 0.745], [0.5, 0.5], [0.24, 0.247]],
  front: [
    // the big hexagonal grille: a chrome surround round a black honeycomb, wider at the bottom than at the top
    { step: 0.005, mat: 'chrome', depth: 0.008, poly: both([[0, 0.728], [0.49, 0.73], [0.515, 0.742], [0.573, 0.832], [0.571, 0.848], [0.482, 1.006], [0.465, 1.013], [0, 1.013]]) },
    { step: 0.005, mat: 'gloss', layer: 1, depth: 0.004, poly: both([[0, 0.744], [0.483, 0.746], [0.503, 0.756], [0.556, 0.836], [0.554, 0.848], [0.472, 0.995], [0, 0.997]]) },
    { step: 0.005, mat: 'mesh', layer: 2, poly: both([[0, 0.754], [0.477, 0.756], [0.494, 0.765], [0.543, 0.838], [0.541, 0.849], [0.464, 0.985], [0, 0.987]]) },
    // slim headlamps: a dark housing, the DRL along the bottom and up the outer end, two projector lenses
    { step: 0.005, mat: 'gloss', mirror: true, depth: 0.006, poly: smooth([[0.47, 0.958], [0.62, 0.94], [0.77, 0.924], [0.802, 0.928], [0.815, 0.95], [0.815, 0.995], [0.805, 1.018], [0.77, 1.024], [0.62, 1.01], [0.47, 0.992]], 1) },
    { step: 0.005, mat: 'drl', layer: 1, mirror: true, poly: band([[0.5, 0.962], [0.62, 0.95], [0.76, 0.936], [0.795, 0.938], [0.805, 0.955], [0.805, 1.0]], 0.012) },
    { step: 0.005, mat: 'head', layer: 1, mirror: true, poly: rrect(0.665, 0.962, 0.735, 0.998, 0.012) },
    { step: 0.005, mat: 'head', layer: 1, mirror: true, poly: rrect(0.57, 0.97, 0.635, 1.0, 0.012) },
    // the C-framed corner pockets: black mesh, a horizontal LED bar, the chrome frame down the outer edge and along the bottom
    { step: 0.005, mat: 'gloss', mirror: true, depth: 0.006, poly: smooth([[0.48, 0.655], [0.6, 0.605], [0.74, 0.545], [0.775, 0.55], [0.782, 0.6], [0.782, 0.79], [0.765, 0.8], [0.6, 0.77], [0.48, 0.728]], 1) },
    { step: 0.005, mat: 'mesh', layer: 1, mirror: true, poly: smooth([[0.5, 0.665], [0.6, 0.623], [0.745, 0.565], [0.765, 0.575], [0.768, 0.6], [0.768, 0.775], [0.6, 0.755], [0.5, 0.72]], 1) },
    { step: 0.005, mat: 'drl', layer: 2, mirror: true, poly: band([[0.49, 0.685], [0.775, 0.685]], 0.014) },
    { step: 0.004, mat: 'chrome', layer: 2, mirror: true, depth: 0.01, poly: band([[0.78, 0.805], [0.795, 0.79], [0.797, 0.57], [0.785, 0.533], [0.755, 0.525], [0.6, 0.588], [0.475, 0.642]], 0.016) },
    // the black lower grille with its fog lamps, the black chin
    { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.39], [0.58, 0.39], [0.62, 0.41], [0.6, 0.49], [0, 0.49]]), 1) },
    { step: 0.005, mat: 'slats', layer: 1, poly: both([[0, 0.405], [0.45, 0.405], [0.45, 0.475], [0, 0.475]]) },
    { step: 0.005, mat: 'head', layer: 1, mirror: true, depth: 0.008, poly: hycrossCircle(0.525, 0.44, 0.02) },
    { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.33], [0.74, 0.33], [0.78, 0.35], [0.79, 0.385], [0, 0.39]]), 1) },
  ],
  rear: [
    // the tailgate glass on the raked tail, under the roof spoiler
    { step: 0.004, mat: 'gloss', depth: 0.003, poly: smooth(both([[0, 1.296], [0.66, 1.296], [0.665, 1.33], [0.63, 1.48], [0.6, 1.58], [0.57, 1.61], [0, 1.61]]), 1) },
    // the connected chrome strip under the tailgate glass
    { step: 0.005, mat: 'chrome', depth: 0.006, poly: band([[-0.66, 1.278], [0.66, 1.278]], 0.012) },
    // the wraparound tail lamps: a smoked housing, the red upper lens (taller on the body corner), a clear strip under it
    { step: 0.005, mat: 'gloss', mirror: true, depth: 0.006, poly: smooth([[0.385, 1.232], [0.42, 1.2], [0.47, 1.128], [0.785, 1.126], [0.8, 1.14], [0.8, 1.255], [0.785, 1.27], [0.69, 1.27], [0.66, 1.252], [0.45, 1.25]], 1) },
    { step: 0.005, mat: 'tail', layer: 1, mirror: true, poly: [[0.395, 1.232], [0.43, 1.204], [0.66, 1.2], [0.69, 1.203], [0.79, 1.203], [0.792, 1.258], [0.69, 1.262], [0.66, 1.244], [0.45, 1.243]] },
    { step: 0.005, mat: 'silver', layer: 1, mirror: true, poly: [[0.475, 1.136], [0.785, 1.136], [0.785, 1.192], [0.45, 1.192], [0.44, 1.185]] },
    // the tailgate's shut line down its sides and across above the bumper
    { step: 0.005, mat: 'gloss', depth: 0.001, poly: band([[-0.69, 1.125], [-0.69, 0.63], [-0.67, 0.6], [-0.6, 0.592], [0, 0.59], [0.6, 0.592], [0.67, 0.6], [0.69, 0.63], [0.69, 1.125]], 0.012) },
    // the grey lower bumper: red reflectors, mesh pockets in the corners, a satin edge along its top
    { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.37], [0.72, 0.37], [0.78, 0.39], [0.8, 0.43], [0.8, 0.565], [0.78, 0.575], [0.7, 0.55], [0.5, 0.535], [0, 0.53]]), 1) },
    { step: 0.005, mat: 'satin', layer: 1, depth: 0.004, poly: band([[-0.795, 0.56], [-0.7, 0.54], [-0.5, 0.527], [0, 0.523], [0.5, 0.527], [0.7, 0.54], [0.795, 0.56]], 0.016) },
    { step: 0.005, mat: 'reflector', layer: 1, mirror: true, poly: rrect(0.55, 0.49, 0.755, 0.512, 0.006) },
    { step: 0.005, mat: 'mesh', layer: 1, mirror: true, poly: smooth([[0.55, 0.405], [0.76, 0.405], [0.775, 0.475], [0.55, 0.478]], 1) },
  ],
  side: [
    // chrome door handles
    { step: 0.004, mat: 'chrome', depth: 0.01, poly: hycrossU(0.555, 1.094, 0.6, 1.118, 0.01) },
    { step: 0.004, mat: 'chrome', depth: 0.01, poly: hycrossU(0.257, 1.168, 0.302, 1.192, 0.01) },
    // the slim headlamp sweeping back along the front wing
    { step: 0.003, mat: 'gloss', depth: 0.003, poly: smooth([[0.996, 0.932], [0.96, 0.925], [0.93, 0.935], [0.905, 0.975], [0.882, 1.04], [0.886, 1.052], [0.92, 1.04], [0.95, 1.025], [0.975, 1.012], [0.996, 1.004]], 1) },
    { step: 0.003, mat: 'drl', layer: 1, depth: 0.004, poly: sideBand([[0.994, 0.94], [0.96, 0.932], [0.932, 0.942], [0.908, 0.98], [0.89, 1.035]], 0.01, HYCROSS_L) },
    // the tail lamp wrapping onto the flank, tapering forwards
    { step: 0.004, mat: 'gloss', depth: 0.004, poly: [[0.106, 1.231], [0.06, 1.258], [0.01, 1.27], [0.01, 1.19], [0.05, 1.205], [0.08, 1.217]] },
    { step: 0.004, mat: 'tail', layer: 1, depth: 0.005, poly: [[0.098, 1.232], [0.06, 1.252], [0.016, 1.262], [0.016, 1.205], [0.05, 1.212], [0.08, 1.222]] },
  ],
  plates: { front: 0.55, rear: 1.0 },
  mirrors: 'body',
  windowChrome: true,
  paint: '#03163f', // Blackish Ageha Glass Flake (deep navy in the gallery photos), darkened, blue kept up
  plate: 'MH 12 HX 2026',
}

const XUV7XO_L = 4.695
/** a side outline from a rounded rectangle given in u (0…1) and metres */
const xuv7xoU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  rrectS(u0 * XUV7XO_L, y0, u1 * XUV7XO_L, y1, r).map(([x, y]) => [+(x / XUV7XO_L).toFixed(5), y] as P2)
/** one of the grille's raked chrome blades: from its foot (z at the bottom) to its head (z at the top) */
const xuv7xoBlade = (zb: number, zt: number): Decal => ({
  step: 0.004, mat: 'chrome', layer: 2, depth: 0.012, mirror: true,
  poly: [[zb - 0.008, 0.728], [zb + 0.008, 0.724], [zt + 0.012, 0.922], [zt + 0.004, 0.93], [zt - 0.011, 0.928]],
})

/** Mahindra XUV 7XO (2026, the XUV700's update). 4695 × 1890 × 1755 (with roof rails), wheelbase 2750, 235/55 R19 (AX7 L).
 *  Side profile from a levelled gallery side photo (1.751 m measured over the rails; the photo's axles 1.5 % too close,
 *  so the axles sit at the official wheelbase with the overhangs split as in the photo). Belt, pillars, cladding, handles
 *  and shut lines read off a metric grid of the levelled cut-out; the L-shaped DRL headlamps, the grille's raked chrome
 *  blades and the bumper intakes from the straight front photo and close-ups (heights from the side); the tail lamps
 *  joined by the gloss-black band, the tailgate and the black rear bumper from the straight rear photo. */
export const XUV_7XO: CarSpec = {
  id: 'mahindra-xuv-7xo',
  name: 'Mahindra XUV 7XO',
  dropSlivers: true,
  L: XUV7XO_L, W: 1.89, H: 1.755,
  axles: [0.2116, 0.7973],
  tyreR: 0.371, tyreW: 0.235, rim: 0.651, wheel: { style: 'split', spokes: 5 }, rimTone: 'dark',
  archGap: 0.05, archSquare: 0.3,
  sill: [[0, 0.34], [0.01, 0.335], [0.02, 0.33], [0.04, 0.33], [0.07, 0.32], [0.1, 0.3], [0.13, 0.29], [0.3, 0.33], [0.33, 0.345], [0.45, 0.335], [0.55, 0.325], [0.65, 0.305], [0.7, 0.3], [0.89, 0.23], [0.92, 0.25], [0.94, 0.265], [0.96, 0.28], [0.98, 0.295], [0.99, 0.3], [1, 0.305]],
  // the near-upright tailgate up to the light band, the belt rising to the quarter glass and dropping in a kick to the
  // rear door, falling gently to the mirror; the cowl, then the long bonnet down to the upright grille face
  top: [[0, 1.265], [0.01, 1.268], [0.02, 1.27], [0.05, 1.272], [0.08, 1.275], [0.11, 1.285], [0.15, 1.292], [0.2, 1.295], [0.25, 1.29], [0.27, 1.27], [0.29, 1.237], [0.31, 1.215], [0.35, 1.2], [0.4, 1.19], [0.45, 1.176], [0.5, 1.164], [0.55, 1.153], [0.6, 1.143], [0.65, 1.133], [0.69, 1.126], [0.71, 1.138], [0.725, 1.156], [0.74, 1.17], [0.76, 1.154], [0.8, 1.138], [0.85, 1.114], [0.9, 1.088], [0.93, 1.066], [0.95, 1.046], [0.96, 1.033], [0.97, 1.018], [0.98, 1.012], [0.99, 1.0], [1, 0.99]],
  // round in plan: both ends taper into the corners, the blunt nose stays wide for the lamps
  width: [[0, 0.93], [0.008, 0.952], [0.02, 0.97], [0.05, 0.982], [0.1, 0.995], [0.5, 1], [0.9, 0.996], [0.94, 0.985], [0.97, 0.965], [0.99, 0.935], [1, 0.9]],
  crown: 0.015,
  bulge: 0.025,
  shoulder: { y: [[0, 0.85], [0.07, 0.9], [0.14, 1.1], [0.3, 1.08], [0.7, 1.03], [0.9, 0.98], [1, 0.95]], inset: 0.015 },
  haunch: 0.04,
  bonnetRidge: 0.008,
  topRadius: 0.08,
  noseSweep: 0.15,
  tailSweep: 0.12,
  greenhouse: {
    u0: 0.02, u1: 0.74, tumble: 0.75,
    // the raked tailgate glass up under the big roof spoiler, the roof under the rails, the raked windscreen
    top: [[0.02, 1.27], [0.03, 1.3], [0.04, 1.34], [0.05, 1.4], [0.06, 1.45], [0.07, 1.51], [0.075, 1.565], [0.08, 1.612], [0.09, 1.623], [0.1, 1.635], [0.13, 1.647], [0.16, 1.657], [0.2, 1.667], [0.3, 1.675], [0.4, 1.675], [0.45, 1.672], [0.5, 1.663], [0.53, 1.649], [0.55, 1.641], [0.57, 1.618], [0.59, 1.588], [0.6, 1.564], [0.62, 1.517], [0.64, 1.463], [0.66, 1.41], [0.68, 1.351], [0.7, 1.291], [0.72, 1.24], [0.74, 1.17]],
  },
  // body-coloured roof: the dual-tone paints bring their own black roof (cars.json colours)
  roof: { u0: 0.07873, u1: 0.52903, black: false },
  pillars: [
    { bottom: [0.445, 0.468], top: [0.448, 0.47], black: true },
  ],
  // slim black arch flares joined by the black rocker, the black rear bumper, the black lip under the nose
  cladding: { top: [[0, 0.52], [0.09, 0.52], [0.1151, 0.514], [0.1222, 0.593], [0.1321, 0.665], [0.1447, 0.727], [0.1594, 0.778], [0.1758, 0.815], [0.1934, 0.838], [0.2116, 0.846], [0.2298, 0.838], [0.2474, 0.815], [0.2638, 0.778], [0.2785, 0.727], [0.2911, 0.665], [0.301, 0.593], [0.3081, 0.514], [0.312, 0.435], [0.4, 0.43], [0.6, 0.43], [0.6969, 0.431], [0.7008, 0.514], [0.7079, 0.593], [0.7178, 0.665], [0.7304, 0.727], [0.7451, 0.778], [0.7615, 0.815], [0.7791, 0.838], [0.7973, 0.846], [0.8155, 0.838], [0.8331, 0.815], [0.8495, 0.778], [0.8642, 0.727], [0.8768, 0.665], [0.8867, 0.593], [0.8938, 0.514], [0.8977, 0.44], [0.92, 0.4], [0.95, 0.37], [1, 0.36]], flare: 0.05, cut: true },
  doors: [[0.677, 0.69], [0.455, 0.455], [0.236, 0.236]],
  front: [
    // the grille: a gloss-black trapezoid between the lamps with four raked chrome blades a side (no badge)
    { step: 0.004, mat: 'gloss', poly: smooth(both([[0, 0.705], [0.465, 0.705], [0.5, 0.72], [0.545, 0.8], [0.572, 0.87], [0.582, 0.915], [0.572, 0.955], [0.5, 0.96], [0, 0.962]]), 1) },
    { step: 0.004, mat: 'mesh', layer: 1, poly: both([[0, 0.712], [0.46, 0.712], [0.49, 0.758], [0, 0.758]]) },
    xuv7xoBlade(0.062, 0.115), xuv7xoBlade(0.2, 0.248), xuv7xoBlade(0.336, 0.384), xuv7xoBlade(0.472, 0.528),
    // headlamps: the black housing with two projector modules, the L-shaped DRL along the top and down the outside,
    // its foot turning in under the lamp
    { step: 0.004, mat: 'gloss', mirror: true, poly: smooth([[0.575, 0.95], [0.65, 0.956], [0.75, 0.958], [0.78, 0.956], [0.796, 0.948], [0.806, 0.932], [0.81, 0.91], [0.81, 0.85], [0.795, 0.805], [0.72, 0.748], [0.675, 0.715], [0.655, 0.712], [0.658, 0.74], [0.675, 0.79], [0.672, 0.832], [0.62, 0.852], [0.585, 0.872], [0.568, 0.91]], 1) },
    { step: 0.004, mat: 'silver', mirror: true, layer: 1, depth: 0.004, poly: rrect(0.592, 0.868, 0.684, 0.925, 0.012) },
    { step: 0.004, mat: 'silver', mirror: true, layer: 1, depth: 0.004, poly: rrect(0.694, 0.87, 0.79, 0.928, 0.012) },
    { step: 0.004, mat: 'gloss', mirror: true, layer: 2, poly: rrect(0.6, 0.876, 0.676, 0.917, 0.008) },
    { step: 0.004, mat: 'gloss', mirror: true, layer: 2, poly: rrect(0.702, 0.878, 0.782, 0.92, 0.008) },
    { step: 0.004, mat: 'head', mirror: true, layer: 3, depth: 0.008, poly: rrect(0.615, 0.884, 0.66, 0.909, 0.006) },
    { step: 0.004, mat: 'head', mirror: true, layer: 3, depth: 0.008, poly: rrect(0.722, 0.886, 0.765, 0.912, 0.006) },
    { step: 0.004, mat: 'drl', mirror: true, layer: 2, depth: 0.008, poly: band([[0.58, 0.94], [0.7, 0.944], [0.772, 0.945], [0.788, 0.937], [0.797, 0.922], [0.8, 0.9], [0.8, 0.84], [0.787, 0.815], [0.72, 0.762], [0.668, 0.727]], 0.013) },
    // the lower intake across the bumper: gloss black with a mesh band, its outer wings carrying the fog lamps,
    // a satin lip under it and the black lower bumper
    { step: 0.004, mat: 'gloss', poly: smooth(both([[0, 0.412], [0.42, 0.412], [0.5, 0.45], [0.585, 0.53], [0.6, 0.575], [0.59, 0.602], [0.55, 0.608], [0, 0.608]]), 1) },
    { step: 0.004, mat: 'mesh', layer: 1, poly: both([[0, 0.42], [0.42, 0.42], [0.47, 0.445], [0.49, 0.47], [0, 0.47]]) },
    { step: 0.004, mat: 'gloss', mirror: true, poly: smooth([[0.53, 0.4], [0.775, 0.398], [0.785, 0.41], [0.66, 0.5], [0.635, 0.5]], 1) },
    { step: 0.004, mat: 'satin', mirror: true, layer: 1, depth: 0.006, poly: band([[0.635, 0.492], [0.765, 0.404]], 0.012) },
    { step: 0.004, mat: 'head', mirror: true, layer: 1, depth: 0.008, poly: rrect(0.572, 0.415, 0.6, 0.44, 0.005) },
    { step: 0.004, mat: 'head', mirror: true, layer: 1, depth: 0.008, poly: rrect(0.662, 0.415, 0.69, 0.44, 0.005) },
    { step: 0.004, mat: 'satin', poly: smooth(both([[0, 0.362], [0.68, 0.362], [0.76, 0.372], [0.79, 0.384], [0.78, 0.396], [0, 0.398]]), 1) },
  ],
  rear: [
    // the gloss-black band across the tailgate joining the tail lamps (no badge)
    { step: 0.004, mat: 'gloss', poly: both([[0, 1.088], [0.72, 1.088], [0.72, 1.235], [0, 1.235]]) },
    // tail lamps: a wedge running in along the band and a column down the corner; red lenses, a red light guide along
    // the top and down the outer edge, a lit hex field inside the column
    { step: 0.004, mat: 'reflector', mirror: true, layer: 1, depth: 0.006, poly: smooth([[0.4, 1.198], [0.6, 1.206], [0.8, 1.21], [0.815, 1.2], [0.82, 1.18], [0.822, 0.96], [0.812, 0.94], [0.8, 0.952], [0.77, 1.02], [0.725, 1.07], [0.68, 1.092], [0.55, 1.12], [0.42, 1.185]], 1) },
    { step: 0.004, mat: 'tail', mirror: true, layer: 2, depth: 0.008, poly: band([[0.43, 1.194], [0.6, 1.199], [0.795, 1.2], [0.808, 1.19], [0.811, 1.17], [0.811, 0.97]], 0.014) },
    { step: 0.004, mat: 'hex', mirror: true, layer: 2, depth: 0.006, poly: smooth([[0.755, 1.148], [0.795, 1.148], [0.795, 1.0], [0.782, 1.0], [0.735, 1.07]], 1) },
    // the tailgate's shut line round its lower part
    { step: 0.004, mat: 'gloss', depth: 0.001, poly: band([[-0.73, 0.94], [-0.73, 0.68], [-0.71, 0.635], [-0.66, 0.62], [0, 0.618], [0.66, 0.62], [0.71, 0.635], [0.73, 0.68], [0.73, 0.94]], 0.012) },
    // the black bumper: a dark mesh band, L-shaped red reflectors at the corners, the satin skid plate with two recesses
    { step: 0.004, mat: 'mesh', layer: 1, poly: both([[0, 0.43], [0.6, 0.43], [0.6, 0.488], [0, 0.488]]) },
    { step: 0.004, mat: 'reflector', mirror: true, layer: 1, poly: [[0.6, 0.49], [0.775, 0.49], [0.775, 0.448], [0.798, 0.448], [0.798, 0.51], [0.6, 0.51]] },
    { step: 0.004, mat: 'satin', layer: 1, poly: smooth(both([[0, 0.358], [0.5, 0.358], [0.53, 0.368], [0.55, 0.4], [0.548, 0.418], [0, 0.418]]), 1) },
    { step: 0.004, mat: 'trim', layer: 2, poly: rrect(-0.38, 0.37, -0.06, 0.398, 0.008) },
    { step: 0.004, mat: 'trim', layer: 2, poly: rrect(0.06, 0.37, 0.38, 0.398, 0.008) },
  ],
  side: [
    // the black D-pillar panel running down the rear fender to the tail lamp, and the tail lamp wrapping onto the flank
    { step: 0.004, mat: 'gloss', depth: 0.003, poly: smooth([[0.008, 1.2], [0.02, 1.215], [0.05, 1.238], [0.08, 1.252], [0.112, 1.262], [0.111, 1.22], [0.104, 1.14], [0.092, 1.05], [0.079, 0.97], [0.068, 0.935], [0.045, 0.93], [0.012, 0.94], [0.008, 1.0]], 1) },
    { step: 0.004, mat: 'reflector', layer: 1, depth: 0.003, poly: smooth([[0.007, 1.195], [0.035, 1.205], [0.06, 1.2], [0.06, 1.17], [0.058, 1.0], [0.054, 0.95], [0.045, 0.96], [0.025, 1.05], [0.008, 1.12]], 1) },
    { step: 0.004, mat: 'tail', layer: 2, depth: 0.004, poly: sideBand([[0.009, 1.19], [0.05, 1.193], [0.052, 1.1], [0.05, 0.98]], 0.014, XUV7XO_L) },
    // body-coloured door handles
    { step: 0.004, mat: 'body', depth: 0.008, poly: xuv7xoU(0.481, 0.975, 0.529, 1.002, 0.01) },
    { step: 0.004, mat: 'body', depth: 0.008, poly: xuv7xoU(0.26, 1.032, 0.309, 1.059, 0.01) },
  ],
  plates: { front: 0.513, rear: 0.94 },
  rails: 'black',
  sunroof: [0.28, 0.5],
  mirrors: 'black',
  windowChrome: true,
  paint: '#7b766c', // Desert Myst, the warm silver-beige of the gallery car, darkened for the studio lights
  plate: 'MH 01 XO 2026',
}

const EXTER_L = 3.83
/** a side outline from a rounded rectangle given in u (0…1) and metres */
const exterU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  rrectS(u0 * EXTER_L, y0, u1 * EXTER_L, y1, r).map(([x, y]) => [+(x / EXTER_L).toFixed(5), y] as P2)
/** a circle outline for the Exter's projector lamps */
const exterCircle = (zc: number, yc: number, r: number, n = 40): P2[] =>
  Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return [+(zc + r * Math.cos(a)).toFixed(4), +(yc + r * Math.sin(a)).toFixed(4)] as P2 })

/** Hyundai Exter (2026 facelift). 3830 × 1723 × 1643 (with roof rails), wheelbase 2450, 175/65 R15 (top trim).
 *  Side profile from a levelled studio side render (1.69 m over the rails, axles 4.5 % too far apart: heights scaled by
 *  0.972, the axles at the official wheelbase with the overhangs split as in the photo, arches, doors and cladding mapped
 *  with them). The boxy micro-SUV: upright nose with the H-shaped DRLs at the bonnet's corners joined by a black band,
 *  the parametric grille with square projector pods, silver corner pieces; the raked tailgate glass under a long roof
 *  spoiler, the body-coloured D-pillar, H-pattern tail lamps joined by a black strip. */
export const EXTER: CarSpec = {
  id: 'hyundai-exter',
  name: 'Hyundai Exter',
  dropSlivers: true,
  L: EXTER_L, W: 1.723, H: 1.643,
  axles: [0.1758, 0.8154],
  tyreR: 0.304, tyreW: 0.175, rim: 0.627, wheel: { style: 'blade', spokes: 5 },
  archGap: 0.06, archSquare: 0.55,
  sill: [[0, 0.3], [0.01, 0.29], [0.022, 0.29], [0.044, 0.29], [0.065, 0.285], [0.1, 0.28], [0.26, 0.255], [0.29, 0.244], [0.5, 0.241], [0.7, 0.232], [0.88, 0.225], [0.92, 0.214], [0.956, 0.218], [0.978, 0.22], [0.99, 0.215], [1, 0.215]],
  // the tail up to the lamps, the belt rising gently towards the rear, the cowl, the flat bonnet and the upright nose
  // face lifted to the DRLs' tops
  top: [[0, 1.1], [0.006, 1.115], [0.012, 1.125], [0.02, 1.135], [0.05, 1.15], [0.1, 1.155], [0.17, 1.145], [0.3, 1.13], [0.45, 1.115], [0.6, 1.1], [0.7, 1.09], [0.765, 1.088], [0.8, 1.068], [0.85, 1.05], [0.9, 1.024], [0.93, 1.0], [0.95, 0.982], [0.965, 0.968], [0.975, 0.96], [0.985, 0.955], [0.993, 0.952], [1, 0.95]],
  // boxy, but rounded into the corners in plan
  width: [[0, 0.88], [0.008, 0.92], [0.025, 0.96], [0.06, 0.982], [0.12, 0.996], [0.5, 1], [0.88, 0.996], [0.93, 0.984], [0.965, 0.96], [0.985, 0.93], [1, 0.9]],
  crown: 0.012,
  bulge: 0.01,
  // the crease from the DRLs back along the doors, rising towards the tail and dropping under the tail lamps
  shoulder: { y: [[0, 0.86], [0.06, 0.9], [0.13, 1.03], [0.25, 1.03], [0.5, 0.99], [0.8, 0.96], [1, 0.93]], inset: 0.018 },
  haunch: 0.03,
  topRadius: 0.08,
  noseSweep: 0.12,
  tailSweep: 0.1,
  greenhouse: {
    u0: 0.02, u1: 0.765, tumble: 0.74,
    // the raked tailgate glass under the spoiler, the flat roof, the fairly upright windscreen
    top: [[0.02, 1.13], [0.03, 1.18], [0.04, 1.24], [0.05, 1.298], [0.06, 1.355], [0.07, 1.41], [0.08, 1.465], [0.09, 1.51], [0.1, 1.535], [0.115, 1.556], [0.15, 1.578], [0.2, 1.597], [0.25, 1.607], [0.3, 1.605], [0.4, 1.599], [0.45, 1.588], [0.48, 1.577], [0.5, 1.565], [0.52, 1.548], [0.54, 1.527], [0.56, 1.506], [0.58, 1.478], [0.6, 1.446], [0.62, 1.408], [0.64, 1.37], [0.66, 1.332], [0.68, 1.291], [0.7, 1.246], [0.72, 1.201], [0.74, 1.149], [0.765, 1.09]],
  },
  // body-coloured roof running back over the tailgate glass as the spoiler (a separate spoiler floated as a plank)
  roof: { u0: 0.0816, u1: 0.5234, black: false },
  pillars: [
    // the body-coloured D-pillar sweeping down from the spoiler over the dark tailgate-glass wrap
    { bottom: [0.168, 0.18], top: [0.0816, 0.18], black: false, rearEdge: [[0.105, 0.8], [0.125, 0.6], [0.145, 0.4], [0.163, 0.2]] },
    { bottom: [0.442, 0.458], top: [0.436, 0.452], black: true },
  ],
  // squared black arch flares joined along the lower doors, black bumper corners
  cladding: { top: [[0, 0.486], [0.0218, 0.544], [0.0381, 0.729], [0.0653, 0.816], [0.1088, 0.875], [0.1741, 0.88], [0.2317, 0.846], [0.2603, 0.787], [0.2718, 0.603], [0.2795, 0.4], [0.7146, 0.4], [0.7203, 0.583], [0.727, 0.739], [0.7481, 0.787], [0.8258, 0.826], [0.8912, 0.778], [0.9184, 0.7], [0.9293, 0.437], [0.9673, 0.408], [1, 0.408]], flare: 0.13, cut: true },
  doors: [[0.2795, 0.2603], [0.444, 0.4468], [0.7146, 0.7261]],
  front: [
    // the black band under the bonnet's leading edge joining the H-shaped DRLs at the corners
    { step: 0.005, mat: 'gloss', poly: rrect(-0.53, 0.83, 0.53, 0.895, 0.01) },
    { step: 0.005, mat: 'gloss', mirror: true, poly: smooth([[0.515, 0.812], [0.7, 0.812], [0.724, 0.822], [0.735, 0.85], [0.733, 0.895], [0.725, 0.915], [0.7, 0.922], [0.515, 0.922]], 1) },
    { step: 0.005, mat: 'drl', mirror: true, layer: 1, poly: rrect(0.53, 0.826, 0.551, 0.907, 0.004) },
    { step: 0.005, mat: 'drl', mirror: true, layer: 1, poly: rrect(0.676, 0.826, 0.697, 0.907, 0.004) },
    { step: 0.005, mat: 'drl', mirror: true, layer: 1, poly: [[0.551, 0.857], [0.676, 0.857], [0.676, 0.876], [0.551, 0.876]] },
    // the black frame holding the parametric grille and the square projector pods
    { step: 0.005, mat: 'gloss', poly: rrect(-0.745, 0.555, 0.745, 0.775, 0.012) },
    { step: 0.005, mat: 'gloss', poly: rrect(-0.53, 0.33, 0.53, 0.6, 0.01) },
    // the grille's blocks: three rows of five above the plate, two rows of shallow ones below it
    ...[0.71, 0.645, 0.58].flatMap((y) => [-0.4, -0.2, 0, 0.2, 0.4].map((z): Decal => ({ step: 0.005, mat: 'trim', layer: 1, depth: 0.01, poly: rrect(z - 0.088, y - 0.026, z + 0.088, y + 0.026, 0.006) }))),
    ...[0.51, 0.455, 0.4, 0.355].flatMap((y) => [-0.4, -0.2, 0, 0.2, 0.4].map((z): Decal => ({ step: 0.005, mat: 'trim', layer: 1, depth: 0.01, poly: rrect(z - 0.088, y - 0.016, z + 0.088, y + 0.016, 0.005) }))),
    // the square projector pods: a silver bezel, the black bowl, the projector
    { step: 0.005, mat: 'silver', mirror: true, layer: 1, depth: 0.008, poly: rrect(0.54, 0.565, 0.732, 0.75, 0.016) },
    { step: 0.005, mat: 'gloss', mirror: true, layer: 2, depth: 0.012, poly: rrect(0.552, 0.577, 0.72, 0.738, 0.012) },
    { step: 0.005, mat: 'silver', mirror: true, layer: 3, depth: 0.014, poly: exterCircle(0.648, 0.657, 0.05) },
    { step: 0.005, mat: 'head', mirror: true, layer: 4, depth: 0.016, poly: exterCircle(0.648, 0.657, 0.034) },
    // the silver corner pieces under the pods, each with a black slash
    { step: 0.005, mat: 'satin', mirror: true, layer: 1, poly: smooth([[0.535, 0.552], [0.735, 0.552], [0.735, 0.44], [0.69, 0.4], [0.58, 0.37], [0.54, 0.37], [0.535, 0.4]], 1) },
    { step: 0.005, mat: 'gloss', mirror: true, layer: 2, depth: 0.01, poly: [[0.6, 0.39], [0.62, 0.39], [0.655, 0.535], [0.635, 0.535]] },
    // the black lower bumper with a thin silver bar
    { step: 0.005, mat: 'trim', poly: both([[0, 0.22], [0.72, 0.22], [0.745, 0.25], [0.745, 0.42], [0.69, 0.4], [0.58, 0.37], [0.53, 0.37], [0, 0.37]]) },
    { step: 0.005, mat: 'satin', layer: 1, depth: 0.008, poly: rrect(-0.55, 0.243, 0.55, 0.263, 0.008) },
  ],
  rear: [
    // the black strip across the tailgate joining the H-pattern tail lamps
    { step: 0.005, mat: 'gloss', poly: both([[0, 0.985], [0.53, 0.985], [0.55, 0.97], [0.55, 1.085], [0, 1.085]]) },
    { step: 0.005, mat: 'gloss', mirror: true, layer: 1, poly: smooth([[0.54, 0.895], [0.705, 0.895], [0.725, 0.912], [0.73, 0.97], [0.728, 1.075], [0.712, 1.095], [0.54, 1.095]], 1) },
    { step: 0.005, mat: 'reflector', mirror: true, layer: 2, depth: 0.006, poly: [[0.552, 0.975], [0.72, 0.975], [0.72, 1.083], [0.552, 1.083]] },
    { step: 0.005, mat: 'tail', mirror: true, layer: 3, depth: 0.01, poly: rrect(0.56, 0.982, 0.576, 1.078, 0.004) },
    { step: 0.005, mat: 'tail', mirror: true, layer: 3, depth: 0.01, poly: rrect(0.698, 0.982, 0.713, 1.078, 0.004) },
    { step: 0.005, mat: 'tail', mirror: true, layer: 3, depth: 0.01, poly: [[0.576, 1.02], [0.698, 1.02], [0.698, 1.036], [0.576, 1.036]] },
    { step: 0.005, mat: 'silver', mirror: true, layer: 2, depth: 0.006, poly: [[0.56, 0.905], [0.71, 0.905], [0.718, 0.92], [0.718, 0.963], [0.56, 0.963]] },
    { step: 0.005, mat: 'amber', mirror: true, layer: 3, depth: 0.008, poly: exterCircle(0.655, 0.934, 0.013, 24) },
    // the tailgate's shut line under the lamps and round the plate recess
    { step: 0.005, mat: 'gloss', depth: 0.001, poly: band([[-0.585, 0.895], [-0.585, 0.73], [-0.57, 0.695], [-0.53, 0.685], [0, 0.683], [0.53, 0.685], [0.57, 0.695], [0.585, 0.73], [0.585, 0.895]], 0.012) },
    // the silver bumper panel with tall red reflectors at its ends
    { step: 0.005, mat: 'satin', poly: rrect(-0.665, 0.49, 0.665, 0.65, 0.01) },
    { step: 0.005, mat: 'reflector', mirror: true, poly: rrect(0.668, 0.495, 0.735, 0.645, 0.006) },
    // the black diffuser framed by a thin silver U
    { step: 0.005, mat: 'trim', layer: 1, poly: smooth(both([[0, 0.22], [0.6, 0.22], [0.615, 0.25], [0.615, 0.46], [0.47, 0.565], [0, 0.585]]), 1) },
    { step: 0.005, mat: 'trim', poly: both([[0, 0.22], [0.82, 0.22], [0.82, 0.48], [0.62, 0.48], [0.6, 0.3], [0, 0.3]]) },
    { step: 0.005, mat: 'satin', layer: 2, depth: 0.008, poly: band([[-0.585, 0.29], [-0.585, 0.45], [-0.45, 0.535], [0, 0.545], [0.45, 0.535], [0.585, 0.45], [0.585, 0.29]], 0.022) },
  ],
  side: [
    // the silver strip along the black lower doors
    { step: 0.005, mat: 'satin', poly: exterU(0.29, 0.356, 0.705, 0.374, 0.008) },
    // door handles
    { step: 0.004, mat: 'gloss', depth: 0.004, poly: exterU(0.466, 0.948, 0.531, 0.97, 0.01) },
    { step: 0.004, mat: 'gloss', depth: 0.004, poly: exterU(0.201, 0.955, 0.263, 0.977, 0.01) },
  ],
  plates: { front: 0.485, rear: 0.82 },
  rails: 'black',
  sunroof: [0.3, 0.42],
  mirrors: 'body',
  paint: '#665c53', // Golden Bronze (a warm taupe), darkened for the studio lights
  plate: 'MH 12 EX 2026',
}

const CLAVIS_L = 4.55
/** a side outline from a rounded rectangle given in u (0…1) and metres */
const clavisU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  rrectS(u0 * CLAVIS_L, y0, u1 * CLAVIS_L, y1, r).map(([x, y]) => [+(x / CLAVIS_L).toFixed(5), y] as P2)

/** Kia Carens Clavis (2025). 4550 × 1800 × 1708, wheelbase 2780, 215/55 R17 (HTX Plus).
 *  Side profile from the gallery's levelled long-lens side photo (1.714 m measured, the axles within 0.5 % of the official
 *  wheelbase; axles at the official wheelbase with the overhangs split as in the photo). Belt, quarter-glass kick, cladding,
 *  shut lines and the side tail lamp read off a metric grid of the cut-out; the triangular star-map headlamps under the
 *  black bonnet-edge band, the U-shaped black lower bumper with its silver corner brackets from the straight front photo;
 *  the connected light bar, the T-shaped tail lamps and the silver lower bumper from the straight rear and close-ups. */
export const CARENS_CLAVIS: CarSpec = {
  id: 'kia-carens-clavis',
  name: 'Kia Carens Clavis',
  rakedEnds: true,
  dropSlivers: true,
  L: CLAVIS_L, W: 1.8, H: 1.708,
  axles: [0.206, 0.817],
  tyreR: 0.3342, tyreW: 0.215, rim: 0.646, wheel: { style: 'split', spokes: 5 }, rimTone: 'dark',
  archGap: 0.08, archSquare: 0.3,
  sill: [[0, 0.37], [0.01, 0.355], [0.02, 0.345], [0.04, 0.33], [0.06, 0.315], [0.08, 0.3], [0.1, 0.28], [0.13, 0.255], [0.2, 0.24], [0.29, 0.225], [0.32, 0.21], [0.7, 0.205], [0.73, 0.2], [0.9, 0.19], [0.93, 0.18], [0.95, 0.18], [0.97, 0.185], [0.98, 0.195], [0.99, 0.21], [1, 0.24]],
  // the tail face up to the light bar, the body climbing the raked tailgate glass to the roof spoiler, the flat roof block
  // over the D-pillar, the kick down the quarter glass's rear edge, the belt falling gently forwards, the bonnet
  top: [[0, 1.19], [0.008, 1.195], [0.015, 1.2], [0.02, 1.235], [0.03, 1.305], [0.04, 1.375], [0.05, 1.445], [0.06, 1.515], [0.064, 1.54], [0.068, 1.558], [0.074, 1.572], [0.08, 1.583], [0.1, 1.605], [0.12, 1.627], [0.14, 1.646], [0.148, 1.653], [0.15, 1.578], [0.152, 1.478], [0.155, 1.378], [0.16, 1.323], [0.17, 1.283], [0.185, 1.253], [0.2, 1.233], [0.22, 1.213], [0.25, 1.2], [0.3, 1.188], [0.35, 1.176], [0.4, 1.166], [0.5, 1.145], [0.6, 1.126], [0.65, 1.115], [0.7, 1.108], [0.75, 1.113], [0.76, 1.104], [0.78, 1.09], [0.8, 1.078], [0.82, 1.067], [0.84, 1.057], [0.86, 1.047], [0.88, 1.036], [0.9, 1.024], [0.92, 1.01], [0.94, 0.994], [0.95, 0.985], [0.96, 0.976], [0.97, 0.968], [0.98, 0.962], [0.99, 0.957], [1, 0.954]],
  width: [[0, 0.92], [0.006, 0.945], [0.02, 0.97], [0.05, 0.988], [0.1, 0.997], [0.15, 1], [0.85, 1], [0.9, 0.993], [0.94, 0.982], [0.965, 0.968], [0.985, 0.948], [1, 0.92]],
  crown: 0.015,
  bulge: 0.03,
  // tumblehome on the tail's roof block only (the line sits above the belt elsewhere)
  shoulder: { y: [[0, 1.25], [0.1, 1.27], [0.135, 1.31], [0.155, 1.4], [0.18, 1.5], [1, 1.5]], inset: 0.12 },
  haunch: 0.04,
  topRadius: 0.08,
  noseSweep: 0.15,
  tailSweep: 0.1,
  greenhouse: {
    u0: 0.15, u1: 0.75, tumble: 0.84, followBody: 0.17,
    top: [[0.15, 1.65], [0.16, 1.658], [0.18, 1.666], [0.2, 1.672], [0.24, 1.681], [0.3, 1.683], [0.44, 1.683], [0.47, 1.677], [0.5, 1.67], [0.52, 1.664], [0.54, 1.651], [0.55, 1.637], [0.56, 1.624], [0.57, 1.603], [0.58, 1.584], [0.6, 1.544], [0.62, 1.498], [0.64, 1.446], [0.66, 1.389], [0.68, 1.337], [0.7, 1.278], [0.72, 1.216], [0.74, 1.148], [0.75, 1.113]],
  },
  roof: { u0: 0.15, u1: 0.55539, black: false },
  pillars: [
    { bottom: [0.27, 0.298], top: [0.282, 0.3], black: true },
    { bottom: [0.462, 0.497], top: [0.462, 0.497], black: true },
  ],
  // black arch flares joined by the black band along the doors, the black lower bumpers
  cladding: { top: [[0, 0.5], [0.03, 0.48], [0.06, 0.47], [0.09, 0.47], [0.1, 0.48], [0.3, 0.5], [0.72, 0.5], [0.93, 0.43], [0.97, 0.41], [1, 0.42]], flare: 0.09, cut: true },
  doors: [[0.73, 0.723], [0.495, 0.493], [0.234, 0.234]],
  front: [
    // the black band along the bonnet's leading edge, its LED line running out into the headlamps
    { step: 0.005, mat: 'gloss', depth: 0.004, poly: both([[0, 0.888], [0.5, 0.888], [0.66, 0.893], [0.76, 0.9], [0.8, 0.905], [0.805, 0.932], [0.7, 0.932], [0.5, 0.93], [0, 0.93]]) },
    { step: 0.005, mat: 'drl', layer: 1, mirror: true, poly: [[0.42, 0.912], [0.6, 0.914], [0.7, 0.917], [0.795, 0.92], [0.795, 0.932], [0.7, 0.929], [0.6, 0.926], [0.42, 0.924]] },
    { step: 0.005, mat: 'satin', layer: 1, depth: 0.004, poly: [[-0.42, 0.897], [0.42, 0.897], [0.42, 0.909], [-0.42, 0.909]] },
    // the triangular star-map headlamps: a dark lens pointing inwards, the vertical DRL bar down its outer edge, three LED cubes
    { step: 0.005, mat: 'gloss', mirror: true, depth: 0.006, poly: smooth([[0.605, 0.775], [0.625, 0.79], [0.79, 0.9], [0.805, 0.9], [0.805, 0.655], [0.79, 0.64], [0.77, 0.645], [0.625, 0.765]], 1) },
    { step: 0.005, mat: 'drl', layer: 1, mirror: true, poly: [[0.787, 0.66], [0.802, 0.665], [0.802, 0.9], [0.787, 0.9]] },
    { step: 0.005, mat: 'head', layer: 1, mirror: true, poly: rrect(0.735, 0.81, 0.775, 0.845, 0.006) },
    { step: 0.005, mat: 'head', layer: 1, mirror: true, poly: rrect(0.735, 0.71, 0.775, 0.745, 0.006) },
    { step: 0.005, mat: 'head', layer: 1, mirror: true, poly: rrect(0.68, 0.76, 0.72, 0.795, 0.006) },
    // the U-shaped black lower bumper: the slatted upper intake, the lower grille between two dark pockets
    { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.27], [0.7, 0.27], [0.78, 0.29], [0.8, 0.33], [0.8, 0.44], [0.78, 0.475], [0.66, 0.58], [0.6, 0.64], [0.55, 0.69], [0.5, 0.7], [0, 0.7]]), 1) },
    { step: 0.005, mat: 'slats', layer: 1, poly: rrect(-0.5, 0.625, 0.5, 0.68, 0.01) },
    { step: 0.005, mat: 'slats', layer: 1, poly: rrect(-0.33, 0.37, 0.33, 0.465, 0.01) },
    { step: 0.005, mat: 'gloss', layer: 1, mirror: true, depth: 0.004, poly: rrect(0.36, 0.385, 0.52, 0.465, 0.012) },
    // silver brackets in the corners round dark pockets with an LED strip, joined by the silver bar along the bottom
    { step: 0.005, mat: 'satin', layer: 1, mirror: true, poly: rrect(0.56, 0.31, 0.785, 0.52, 0.04) },
    { step: 0.005, mat: 'gloss', layer: 2, mirror: true, depth: 0.012, poly: smooth([[0.54, 0.355], [0.745, 0.355], [0.75, 0.48], [0.54, 0.48]], 2) },
    { step: 0.005, mat: 'drl', layer: 3, mirror: true, depth: 0.014, poly: rrect(0.6, 0.37, 0.73, 0.384, 0.005) },
    { step: 0.005, mat: 'satin', layer: 1, poly: smooth(both([[0, 0.3], [0.6, 0.3], [0.6, 0.345], [0, 0.345]]), 1) },
  ],
  rear: [
    // the tailgate glass on the raked tail, under the roof spoiler
    { step: 0.004, mat: 'gloss', depth: 0.003, poly: smooth(both([[0, 1.18], [0.66, 1.18], [0.665, 1.21], [0.64, 1.35], [0.6, 1.5], [0.57, 1.535], [0, 1.535]]), 1) },
    // the connected light bar under the glass
    { step: 0.005, mat: 'gloss', depth: 0.004, poly: [[-0.66, 1.12], [0.66, 1.12], [0.66, 1.17], [-0.66, 1.17]] },
    { step: 0.005, mat: 'tail', layer: 1, poly: [[-0.66, 1.142], [0.66, 1.142], [0.66, 1.155], [-0.66, 1.155]] },
    // the T-shaped tail lamps: a smoked pod, the red guide along the top and down the outer edge, chevrons inside
    { step: 0.005, mat: 'gloss', layer: 1, mirror: true, depth: 0.006, poly: smooth([[0.655, 1.17], [0.805, 1.17], [0.805, 0.975], [0.77, 0.885], [0.74, 0.885], [0.715, 0.95], [0.685, 1.1], [0.655, 1.12]], 1) },
    { step: 0.005, mat: 'tail', layer: 2, mirror: true, poly: [[0.66, 1.142], [0.795, 1.142], [0.795, 0.98], [0.758, 0.9], [0.745, 0.905], [0.78, 0.985], [0.78, 1.128], [0.66, 1.128]] },
    ...[0.96, 0.995, 1.03, 1.065, 1.1].map((y): Decal => ({ step: 0.005, mat: 'tail', layer: 2, mirror: true, poly: [[0.715, y - 0.02], [0.77, y], [0.77, y + 0.014], [0.715, y - 0.006]] })),
    // the tailgate's shut line round the body-coloured panel
    { step: 0.005, mat: 'gloss', depth: 0.001, poly: band([[-0.69, 1.11], [-0.69, 0.635], [-0.67, 0.612], [-0.6, 0.607], [0, 0.605], [0.6, 0.607], [0.67, 0.612], [0.69, 0.635], [0.69, 1.11]], 0.012) },
    // the black lower bumper, red reflectors, silver brackets in the corners joined by a silver bar along the bottom
    { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.37], [0.74, 0.37], [0.8, 0.39], [0.815, 0.45], [0.815, 0.6], [0.78, 0.605], [0, 0.6]]), 1) },
    { step: 0.005, mat: 'reflector', layer: 1, mirror: true, poly: rrect(0.6, 0.47, 0.625, 0.565, 0.005) },
    { step: 0.005, mat: 'satin', layer: 1, mirror: true, poly: smooth([[0.635, 0.4], [0.805, 0.4], [0.81, 0.57], [0.64, 0.57], [0.64, 0.535], [0.77, 0.535], [0.77, 0.45], [0.635, 0.45]], 1) },
    { step: 0.005, mat: 'satin', layer: 1, poly: smooth(both([[0, 0.4], [0.66, 0.4], [0.66, 0.45], [0, 0.45]]), 1) },
  ],
  side: [
    // the side of the T tail lamp: a black wedge, the slim blade along the shoulder with a red line at its back
    { step: 0.004, mat: 'gloss', depth: 0.004, poly: smooth([[0.108, 1.155], [0.08, 1.172], [0.03, 1.18], [0.006, 1.18], [0.004, 0.9], [0.015, 0.95], [0.03, 1.04], [0.055, 1.125], [0.08, 1.14]], 1) },
    { step: 0.004, mat: 'tail', layer: 1, poly: [[0.012, 1.152], [0.06, 1.156], [0.06, 1.17], [0.012, 1.168]] },
    // chrome door handles
    { step: 0.004, mat: 'chrome', depth: 0.01, poly: clavisU(0.514, 0.975, 0.566, 1.0, 0.01) },
    { step: 0.004, mat: 'chrome', depth: 0.01, poly: clavisU(0.238, 1.035, 0.29, 1.06, 0.01) },
    // the silver blade along the black band under the doors
    { step: 0.004, mat: 'satin', depth: 0.006, poly: smooth([[0.69, 0.345], [0.322, 0.345], [0.322, 0.37], [0.335, 0.393], [0.66, 0.4], [0.68, 0.38]], 1) },
    // the bonnet-edge band running back along the top of the wing
    { step: 0.004, mat: 'gloss', depth: 0.003, poly: smooth([[0.992, 0.888], [0.97, 0.9], [0.94, 0.925], [0.91, 0.948], [0.886, 0.958], [0.89, 0.968], [0.92, 0.962], [0.95, 0.948], [0.975, 0.935], [0.992, 0.93]], 1) },
  ],
  plates: { front: 0.54, rear: 0.7 },
  mirrors: 'body',
  windowChrome: true,
  paint: '#8f8c84', // Ivory Silver Gloss (the warm silver of the gallery photos), darkened for the studio lights
  plate: 'MH 12 KC 2026',
}

const HYRYDER_L = 4.365
/** a side outline from a rounded rectangle given in u (0…1) and metres */
const hyryderRectU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  rrectS(u0 * HYRYDER_L, y0, u1 * HYRYDER_L, y1, r).map(([x, y]) => [+(x / HYRYDER_L).toFixed(5), y] as P2)
/** a circle outline (projector lenses) */
const hyryderCircle = (zc: number, yc: number, r: number, n = 36): P2[] =>
  Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return [+(zc + r * Math.cos(a)).toFixed(4), +(yc + r * Math.sin(a)).toFixed(4)] as P2 })

/** Toyota Urban Cruiser Hyryder (2022, 2025 update). 4365 × 1795 × 1645 (with roof rails), wheelbase 2600, 215/60 R17 (V).
 *  The Grand Vitara's body (same platform and dimensions) with Toyota's own nose and tail. Side profile from a studio
 *  side render (squeezed sideways: stretched × 1.061 to the official height; the close camera spreads the axles 7 %, so
 *  the axles sit at the official wheelbase with the overhangs split as in the photo and the doors, pillars and handles
 *  mapped with them). Twin-strip DRLs over a dark upper grille with its swept chrome bar, the main lamps in angular
 *  black pods with a chrome chevron, the trapezoid hex lower grille and the satin lip from the straight front render;
 *  the slim split tail lamps, the chrome bar between them and the rear bumper from the straight rear render. */
export const HYRYDER: CarSpec = {
  id: 'toyota-urban-cruiser-hyryder',
  name: 'Toyota Urban Cruiser Hyryder',
  L: HYRYDER_L, W: 1.795, H: 1.645,
  axles: [0.1805, 0.7761],
  tyreR: 0.345, tyreW: 0.215, rim: 0.626, wheel: { style: 'split', spokes: 5 },
  archGap: 0.07, archSquare: 0.35,
  sill: [[0, 0.36], [0.01, 0.37], [0.02, 0.375], [0.04, 0.37], [0.06, 0.355], [0.08, 0.33], [0.1, 0.3], [0.12, 0.28], [0.3, 0.272], [0.7, 0.27], [0.86, 0.27], [0.9, 0.28], [0.93, 0.29], [0.96, 0.3], [0.98, 0.29], [1, 0.28]],
  // the upright tailgate up to the tail lamps, the raked tailgate glass with the body-coloured D-pillar beside it, the
  // belt dropping round the quarter glass, the near-flat belt, then the long bonnet down to the upright nose
  top: [[0, 1.152], [0.006, 1.158], [0.012, 1.162], [0.02, 1.168], [0.03, 1.18], [0.045, 1.21], [0.06, 1.275], [0.075, 1.34], [0.09, 1.405], [0.1, 1.43], [0.115, 1.44], [0.128, 1.43], [0.138, 1.4], [0.146, 1.345], [0.153, 1.28], [0.163, 1.235], [0.18, 1.222], [0.22, 1.212], [0.27, 1.2], [0.35, 1.19], [0.45, 1.18], [0.55, 1.17], [0.65, 1.16], [0.7, 1.153], [0.72, 1.15], [0.74, 1.142], [0.77, 1.14], [0.8, 1.138], [0.84, 1.122], [0.88, 1.103], [0.9, 1.092], [0.92, 1.078], [0.94, 1.062], [0.955, 1.052], [0.965, 1.046], [0.975, 1.041], [0.985, 1.036], [0.993, 1.033], [1, 1.031]],
  width: [[0, 0.87], [0.006, 0.92], [0.02, 0.96], [0.05, 0.985], [0.1, 0.997], [0.5, 1], [0.86, 0.997], [0.91, 0.985], [0.945, 0.967], [0.97, 0.945], [0.988, 0.915], [1, 0.89]],
  crown: 0.015,
  bulge: 0.03,
  // the character line through the door handles, rising to the tail lamps
  shoulder: { y: [[0, 1.075], [0.5, 1.04], [1, 1.02]], inset: 0.03 },
  haunch: 0.05,
  bonnetRidge: 0.01,
  topRadius: 0.08,
  dropSlivers: true,
  noseSweep: 0.08,
  tailSweep: 0.1,
  greenhouse: {
    u0: 0.03, u1: 0.72, tumble: 0.68, followBody: 0.16,
    // the raked tailgate glass under the roof spoiler, the flat roof, the raked screen
    top: [[0.03, 1.18], [0.04, 1.205], [0.05, 1.24], [0.06, 1.28], [0.07, 1.325], [0.08, 1.37], [0.09, 1.42], [0.1, 1.465], [0.11, 1.5], [0.12, 1.52], [0.135, 1.535], [0.16, 1.548], [0.2, 1.558], [0.3, 1.572], [0.4, 1.588], [0.45, 1.592], [0.5, 1.582], [0.52, 1.572], [0.545, 1.552], [0.57, 1.518], [0.6, 1.462], [0.63, 1.395], [0.66, 1.318], [0.69, 1.232], [0.705, 1.19], [0.72, 1.148]],
  },
  roof: { u0: 0.0914, u1: 0.5453, black: false },
  pillars: [
    // the wide black C-pillar ahead of the quarter glass and the B-pillar (the A-pillar is left as plain glass)
    { bottom: [0.203, 0.243], top: [0.22, 0.241], black: true },
    { bottom: [0.402, 0.425], top: [0.402, 0.425], black: true },
  ],
  // slim black arch flares, a black band along the bottom of the doors, black lower bumper corners
  cladding: { top: [[0, 0.5], [0.03, 0.5], [0.06, 0.47], [0.09, 0.42], [0.11, 0.36], [0.3, 0.36], [0.7, 0.36], [0.9, 0.37], [0.93, 0.36], [1, 0.34]], flare: 0.05, cut: true },
  doors: [[0.686, 0.684], [0.4243, 0.4243], [0.19, 0.199]],
  front: [
    // the dark upper grille right under the bonnet's edge (a fine carbon-look pattern above the chrome bar)
    { step: 0.005, mat: 'gloss', depth: 0.004, poly: smooth(both([[0, 0.772], [0.36, 0.774], [0.44, 0.795], [0.5, 0.835], [0.545, 0.88], [0.562, 0.915], [0.552, 0.945], [0.45, 0.952], [0, 0.955]]), 1) },
    { step: 0.005, mat: 'mesh', layer: 1, poly: smooth(both([[0, 0.845], [0.38, 0.855], [0.47, 0.88], [0.525, 0.912], [0.528, 0.935], [0.44, 0.942], [0, 0.944]]), 1) },
    // the chrome bar sweeping down from the DRLs' lower strips across the grille
    { step: 0.005, mat: 'chrome', layer: 2, depth: 0.008, poly: smooth(both([[0, 0.834], [0.2, 0.841], [0.4, 0.86], [0.5, 0.883], [0.555, 0.902], [0.572, 0.914], [0.556, 0.922], [0.49, 0.904], [0.39, 0.882], [0.2, 0.864], [0, 0.862]]), 1) },
    // twin-strip DRL heads at the bonnet's corners: a gloss housing with two thin light strips
    { step: 0.005, mat: 'gloss', mirror: true, depth: 0.006, poly: smooth([[0.55, 0.9], [0.62, 0.91], [0.69, 0.924], [0.74, 0.938], [0.752, 0.952], [0.75, 0.976], [0.73, 0.981], [0.66, 0.97], [0.58, 0.957], [0.54, 0.95]], 1) },
    { step: 0.005, mat: 'drl', layer: 1, mirror: true, poly: band([[0.548, 0.944], [0.62, 0.954], [0.69, 0.963], [0.742, 0.97]], 0.012) },
    { step: 0.005, mat: 'drl', layer: 1, mirror: true, poly: band([[0.57, 0.912], [0.63, 0.921], [0.69, 0.933], [0.742, 0.947]], 0.012) },
    // the main lamps in angular black pods with a chrome chevron and a projector
    { step: 0.005, mat: 'gloss', mirror: true, depth: 0.008, poly: smooth([[0.555, 0.794], [0.765, 0.796], [0.772, 0.785], [0.772, 0.735], [0.76, 0.72], [0.62, 0.656], [0.6, 0.66], [0.585, 0.7]], 1) },
    { step: 0.005, mat: 'chrome', layer: 1, mirror: true, depth: 0.006, poly: band([[0.765, 0.782], [0.585, 0.782], [0.625, 0.678], [0.76, 0.728]], 0.012) },
    { step: 0.005, mat: 'head', layer: 2, mirror: true, poly: hyryderCircle(0.705, 0.748, 0.026) },
    // the trapezoid lower grille: a gloss surround with a dark hex mesh
    { step: 0.005, mat: 'gloss', depth: 0.006, poly: smooth(both([[0, 0.395], [0.55, 0.398], [0.585, 0.43], [0.565, 0.5], [0.525, 0.6], [0.49, 0.64], [0.45, 0.65], [0, 0.65]]), 1) },
    { step: 0.005, mat: 'mesh', layer: 1, poly: smooth(both([[0, 0.41], [0.53, 0.413], [0.56, 0.435], [0.545, 0.5], [0.508, 0.59], [0.478, 0.627], [0.44, 0.636], [0, 0.636]]), 1) },
    // the satin lip along the bottom, rising at the corners, with a black edge under it
    { step: 0.005, mat: 'trim', poly: both([[0, 0.27], [0.7, 0.275], [0.75, 0.3], [0.765, 0.34], [0, 0.34]]) },
    { step: 0.005, mat: 'satin', layer: 2, poly: smooth(both([[0, 0.338], [0.62, 0.34], [0.7, 0.35], [0.755, 0.375], [0.768, 0.425], [0.752, 0.44], [0.725, 0.41], [0.68, 0.39], [0.6, 0.388], [0, 0.39]]), 2) },
  ],
  rear: [
    // the chrome bar between the tail lamps over a black gloss band
    { step: 0.005, mat: 'gloss', depth: 0.004, poly: smooth(both([[0, 1.058], [0.36, 1.056], [0.44, 1.07], [0.5, 1.1], [0.52, 1.12], [0, 1.12]]), 1) },
    { step: 0.005, mat: 'chrome', layer: 2, depth: 0.008, poly: smooth(both([[0, 1.117], [0.45, 1.119], [0.515, 1.126], [0.545, 1.136], [0.52, 1.145], [0, 1.147]]), 1) },
    // the slim tail lamps: the inner part on the tailgate (a smoked housing with a red hook-shaped light guide)…
    { step: 0.005, mat: 'gloss', mirror: true, depth: 0.006, poly: smooth([[0.37, 1.042], [0.6, 1.068], [0.632, 1.085], [0.632, 1.143], [0.5, 1.148], [0.49, 1.13], [0.43, 1.07]], 1) },
    { step: 0.005, mat: 'tail', layer: 1, mirror: true, poly: band([[0.38, 1.049], [0.6, 1.077], [0.618, 1.093], [0.616, 1.133], [0.51, 1.137]], 0.013) },
    // …and the outer part on the body, mostly red, with clear light lines
    { step: 0.005, mat: 'gloss', mirror: true, depth: 0.006, poly: rrectS(0.643, 1.05, 0.756, 1.15, 0.015) },
    { step: 0.005, mat: 'tail', layer: 1, mirror: true, poly: rrectS(0.652, 1.062, 0.746, 1.138, 0.012) },
    { step: 0.005, mat: 'silver', layer: 2, mirror: true, poly: band([[0.655, 1.1], [0.742, 1.1]], 0.012) },
    // the tailgate's shut line down its sides and across above the bumper
    { step: 0.005, mat: 'gloss', depth: 0.001, poly: band([[-0.638, 1.04], [-0.638, 0.68], [-0.6, 0.625], [0, 0.615], [0.6, 0.625], [0.638, 0.68], [0.638, 1.04]], 0.012) },
    // the vertical lamps in the bumper corners: red below, clear above
    { step: 0.005, mat: 'gloss', mirror: true, depth: 0.006, poly: rrectS(0.69, 0.6, 0.762, 0.845, 0.02) },
    { step: 0.005, mat: 'tail', layer: 1, mirror: true, poly: rrectS(0.7, 0.612, 0.752, 0.69, 0.01) },
    { step: 0.005, mat: 'silver', layer: 1, mirror: true, poly: rrectS(0.7, 0.705, 0.752, 0.83, 0.01) },
    // the black strip above the bumper, the black lower corners and the big satin skid plate with its dark recesses
    { step: 0.005, mat: 'trim', poly: both([[0, 0.33], [0.7, 0.33], [0.75, 0.36], [0.765, 0.42], [0.76, 0.47], [0.7, 0.5], [0.6, 0.53], [0.55, 0.575], [0, 0.575]]) },
    { step: 0.005, mat: 'satin', layer: 1, poly: smooth(both([[0, 0.39], [0.56, 0.39], [0.58, 0.41], [0.565, 0.45], [0.5, 0.495], [0.44, 0.53], [0, 0.53]]), 2) },
    { step: 0.005, mat: 'gloss', layer: 2, depth: 0.012, poly: rrectS(0.035, 0.415, 0.49, 0.485, 0.015), mirror: true },
  ],
  side: [
    // body-coloured door handles
    { step: 0.005, mat: 'body', depth: 0.01, poly: hyryderRectU(0.441, 1.015, 0.489, 1.043, 0.012) },
    { step: 0.005, mat: 'body', depth: 0.01, poly: hyryderRectU(0.217, 1.04, 0.265, 1.068, 0.012) },
  ],
  plates: { front: 0.5, rear: 0.87 },
  rails: 'silver',
  sunroof: [0.2, 0.5],
  mirrors: 'body',
  windowChrome: true,
  paint: '#86060f', // Sportin Red, darkened for the studio lights
  plate: 'MH 12 HY 2026',
}

const CURVV_L = 4.308
/** a side outline from a rounded rectangle given in u (0…1) and metres */
const curvvU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  rrectS(u0 * CURVV_L, y0, u1 * CURVV_L, y1, r).map(([x, y]) => [+(x / CURVV_L).toFixed(5), y] as P2)
/** the Curvv's grilles: staggered rows of short silver dashes at heights ys, kept inside half-width hw(y), off the plate */
const curvvDashes = (ys: number[], hw: (y: number) => number, skip?: (z: number, y: number) => boolean): Decal[] =>
  ys.flatMap((y, i) => {
    const out: Decal[] = []
    const pitch = 0.085, w = 0.046, h = 0.011
    for (let z = (i % 2 ? pitch / 2 : 0) - 1.2; z < 1.2; z += pitch) {
      if (Math.abs(z) + w / 2 > hw(y) || skip?.(z, y)) continue
      out.push({ step: 0.004, mat: 'satin', layer: 2, depth: 0.008, poly: rrectS(z - w / 2, y - h / 2, z + w / 2, y + h / 2, 0.004) })
    }
    return out
  })

/** Tata Curvv (2024, petrol/diesel). 4308 × 1810 × 1630, wheelbase 2560, 215/55 R18 (top trim).
 *  Side profile from a levelled road photo of a red Curvv (shark fin erased; 1.648 m measured, heights scaled by 0.989;
 *  the axles 2 % too far apart, so they sit at the official wheelbase with the overhangs split as in the photo, arches,
 *  doors and handles mapped with them, the silhouette kept in photo u). The listing's studio side render read 1.72 m
 *  (5.5 % tall) and was not used for heights. The SUV-coupe: the long roof running into a raked tailgate glass with a
 *  ducktail lip, the body-coloured sail behind the rear door glass; the light bar along the bonnet's edge over the
 *  split headlamp pods, the dashed parametric grilles from the straight front; the connected tail light bar, tall black
 *  rear bumper and corner lamps from a straight rear photo. */
export const CURVV: CarSpec = {
  id: 'tata-curvv',
  name: 'Tata Curvv',
  dropSlivers: true,
  rakedEnds: true,
  L: CURVV_L, W: 1.81, H: 1.63,
  axles: [0.2208, 0.815],
  tyreR: 0.347, tyreW: 0.215, rim: 0.659, wheel: { style: 'split', spokes: 5 }, rimTone: 'dark',
  archGap: 0.12, archSquare: 0.3,
  sill: [[0, 0.37], [0.01, 0.36], [0.02, 0.36], [0.05, 0.355], [0.07, 0.35], [0.1, 0.335], [0.12, 0.33], [0.32, 0.303], [0.5, 0.3], [0.6, 0.3], [0.68, 0.287], [0.72, 0.28], [0.93, 0.28], [0.95, 0.29], [0.97, 0.3], [0.99, 0.3], [1, 0.29]],
  // the tail face up to the light bar and the ducktail lip, the belt under the sail and falling gently forward under
  // the windows, the cowl, the bonnet falling to the light bar along its leading edge
  top: [[0, 1.262], [0.006, 1.264], [0.012, 1.265], [0.02, 1.265], [0.06, 1.264], [0.12, 1.265], [0.187, 1.265], [0.2, 1.261], [0.25, 1.247], [0.3, 1.234], [0.35, 1.22], [0.4, 1.207], [0.45, 1.193], [0.5, 1.179], [0.55, 1.165], [0.6, 1.152], [0.65, 1.138], [0.7, 1.13], [0.725, 1.136], [0.735, 1.142], [0.745, 1.15], [0.76, 1.154], [0.78, 1.145], [0.8, 1.133], [0.82, 1.121], [0.84, 1.112], [0.86, 1.103], [0.88, 1.09], [0.9, 1.073], [0.92, 1.053], [0.94, 1.031], [0.95, 1.019], [0.96, 1.009], [0.97, 1.001], [0.98, 0.996], [0.99, 0.993], [1, 0.991]],
  width: [[0, 0.9], [0.006, 0.93], [0.02, 0.955], [0.05, 0.978], [0.1, 0.993], [0.2, 1], [0.5, 1], [0.85, 0.997], [0.9, 0.986], [0.94, 0.966], [0.97, 0.935], [0.99, 0.9], [1, 0.88]],
  crown: 0.012,
  bulge: 0.03,
  haunch: 0.045,
  topRadius: 0.06,
  noseSweep: 0.15,
  tailSweep: 0.12,
  greenhouse: {
    u0: 0.02, u1: 0.745, tumble: 0.7,
    // the ducktail lip, the long raked tailgate glass flowing into the coupe roof, the raked windscreen
    top: [[0.02, 1.265], [0.03, 1.271], [0.04, 1.277], [0.05, 1.283], [0.06, 1.29], [0.07, 1.302], [0.08, 1.318], [0.09, 1.335], [0.1, 1.35], [0.12, 1.38], [0.14, 1.41], [0.16, 1.44], [0.18, 1.475], [0.2, 1.512], [0.22, 1.537], [0.24, 1.556], [0.26, 1.571], [0.28, 1.586], [0.3, 1.596], [0.33, 1.613], [0.36, 1.624], [0.4, 1.63], [0.45, 1.628], [0.48, 1.626], [0.5, 1.62], [0.52, 1.607], [0.54, 1.588], [0.56, 1.568], [0.58, 1.538], [0.6, 1.5], [0.62, 1.465], [0.64, 1.424], [0.66, 1.38], [0.68, 1.334], [0.7, 1.284], [0.72, 1.238], [0.735, 1.2], [0.745, 1.152]],
  },
  roof: { u0: 0.2036, u1: 0.5614, black: false },
  pillars: [
    // the body-coloured sail behind the rear door glass, under the dark strip of the tailgate glass
    { bottom: [0.095, 0.187], top: [0.2036, 0.269], black: false, rearEdge: [[0.185, 0.75], [0.16, 0.62], [0.13, 0.55], [0.1, 0.4]], step: 0.004 },
    // the black B-pillar (the A-pillar is left as plain glass)
    { bottom: [0.453, 0.472], top: [0.455, 0.47], black: true },
  ],
  // black arch flares joined by a band along the doors, the black lower bumpers
  cladding: { top: [[0, 0.55], [0.06, 0.55], [0.09, 0.53], [0.099, 0.514], [0.1105, 0.589], [0.1226, 0.745], [0.1453, 0.852], [0.1801, 0.914], [0.2384, 0.914], [0.2823, 0.852], [0.3043, 0.733], [0.3238, 0.491], [0.34, 0.49], [0.4, 0.505], [0.5, 0.51], [0.6, 0.505], [0.69, 0.49], [0.7114, 0.445], [0.7143, 0.564], [0.725, 0.708], [0.7476, 0.814], [0.7915, 0.883], [0.8486, 0.877], [0.9016, 0.78], [0.9244, 0.658], [0.9364, 0.445], [0.96, 0.46], [1, 0.46]], flare: 0.07, cut: true },
  doors: [[0.2412, 0.2354], [0.4705, 0.4705], [0.7143, 0.7086]],
  front: [
    // the gloss-black band along the bonnet's leading edge, the light bar in it kicking up into the DRL chevrons
    { step: 0.005, mat: 'gloss', poly: both([[0, 0.775], [0.36, 0.775], [0.45, 0.8], [0.58, 0.872], [0.66, 0.905], [0.712, 0.932], [0.722, 0.95], [0.712, 0.966], [0.6, 0.963], [0, 0.961]]) },
    { step: 0.005, mat: 'drl', layer: 1, poly: both([[0, 0.943], [0.55, 0.944], [0.64, 0.948], [0.7, 0.952], [0.716, 0.955], [0.712, 0.962], [0.64, 0.959], [0.55, 0.956], [0, 0.955]]) },
    { step: 0.005, mat: 'drl', layer: 2, mirror: true, poly: [[0.6, 0.936], [0.66, 0.938], [0.705, 0.944], [0.714, 0.953], [0.66, 0.951], [0.6, 0.949]] },
    // the upper grille's silver dashes
    ...curvvDashes([0.857, 0.834, 0.811, 0.788], (y) => 0.36 + (y - 0.775) * 2.2),
    // the split headlamp pods at the bumper corners: projector, LED lamp, slatted pocket tapering down
    { step: 0.005, mat: 'gloss', mirror: true, depth: 0.008, poly: smooth([[0.665, 0.835], [0.7, 0.845], [0.765, 0.845], [0.772, 0.82], [0.775, 0.45], [0.755, 0.44], [0.725, 0.52], [0.68, 0.64], [0.665, 0.68]], 1) },
    { step: 0.005, mat: 'head', layer: 1, mirror: true, poly: rrectS(0.69, 0.75, 0.762, 0.825, 0.016) },
    { step: 0.005, mat: 'head', layer: 1, mirror: true, poly: rrectS(0.695, 0.668, 0.762, 0.7, 0.008) },
    { step: 0.005, mat: 'slats', layer: 1, mirror: true, poly: [[0.755, 0.47], [0.767, 0.47], [0.767, 0.645], [0.7, 0.645]] },
    // the dark recess under the upper grille, a black crease running out to the pods
    { step: 0.005, mat: 'gloss', poly: both([[0, 0.655], [0.42, 0.655], [0.5, 0.668], [0.55, 0.705], [0.5, 0.722], [0, 0.722]]) },
    { step: 0.005, mat: 'gloss', mirror: true, poly: band([[0.5, 0.664], [0.6, 0.671], [0.67, 0.686]], 0.012) },
    // the black lower bumper, the big lower grille with its dashes, the satin skid plate
    { step: 0.005, mat: 'trim', poly: both([[0, 0.28], [0.68, 0.28], [0.755, 0.32], [0.77, 0.41], [0.6, 0.39], [0, 0.39]]) },
    { step: 0.005, mat: 'gloss', layer: 1, poly: smooth(both([[0, 0.375], [0.66, 0.375], [0.74, 0.43], [0.7, 0.47], [0.6, 0.55], [0.55, 0.575], [0, 0.575]]), 1) },
    ...curvvDashes([0.552, 0.529, 0.506, 0.483, 0.46, 0.437, 0.414, 0.391], (y) => Math.min(0.71, 0.56 + (0.575 - y) * 0.9), (z, y) => Math.abs(z) < 0.29 && y > 0.51),
    { step: 0.005, mat: 'satin', layer: 2, poly: smooth(both([[0, 0.3], [0.52, 0.3], [0.58, 0.31], [0.6, 0.33], [0.56, 0.348], [0, 0.352]]), 2) },
  ],
  rear: [
    // the connected light bar under the ducktail lip: a smoked band, its red line dipping into the corner units
    { step: 0.005, mat: 'gloss', layer: 2, depth: 0.012, poly: both([[0, 1.138], [0.6, 1.138], [0.7, 1.128], [0.742, 1.105], [0.756, 1.11], [0.762, 1.14], [0.756, 1.18], [0.6, 1.185], [0, 1.185]]) },
    { step: 0.005, mat: 'tail', layer: 3, depth: 0.016, poly: both([[0, 1.158], [0.6, 1.159], [0.66, 1.153], [0.72, 1.14], [0.75, 1.132], [0.752, 1.145], [0.72, 1.153], [0.66, 1.165], [0.6, 1.171], [0, 1.17]]) },
    // the tailgate's lower shut line over a body-coloured band
    { step: 0.005, mat: 'gloss', depth: 0.001, poly: band([[-0.72, 0.8], [0.72, 0.8]], 0.012) },
    // the tall black bumper round the plate, rising round the vertical corner lamps, the satin skid plate
    { step: 0.005, mat: 'trim', poly: both([[0, 0.36], [0.7, 0.36], [0.77, 0.4], [0.775, 0.89], [0.718, 0.895], [0.71, 0.74], [0.68, 0.685], [0.6, 0.665], [0, 0.66]]) },
    { step: 0.005, mat: 'reflector', layer: 1, mirror: true, poly: rrectS(0.726, 0.69, 0.765, 0.875, 0.01) },
    { step: 0.005, mat: 'satin', layer: 1, poly: smooth(both([[0, 0.385], [0.55, 0.385], [0.62, 0.395], [0.632, 0.425], [0.58, 0.442], [0, 0.445]]), 2) },
  ],
  side: [
    // the tail lamp wedge on the flank: smoked housing and the red line along its top
    { step: 0.004, mat: 'gloss', depth: 0.002, poly: [[0.012, 1.175], [0.03, 1.16], [0.0878, 1.093], [0.0636, 1.084], [0.03, 1.115], [0.012, 1.128]] },
    { step: 0.004, mat: 'tail', layer: 1, depth: 0.004, poly: [[0.012, 1.166], [0.03, 1.152], [0.08, 1.097], [0.074, 1.093], [0.03, 1.14], [0.012, 1.154]] },
    // the chrome strip along the bottom of the side glass
    { step: 0.004, mat: 'chrome', depth: 0.003, poly: sideBand([[0.19, 1.244], [0.3, 1.215], [0.4, 1.188], [0.5, 1.16], [0.6, 1.133], [0.7, 1.111], [0.722, 1.115]], 0.012, CURVV_L) },
    // flush door handles
    { step: 0.005, mat: 'body', depth: 0.006, poly: curvvU(0.5038, 1.015, 0.5499, 1.058, 0.012) },
    { step: 0.005, mat: 'body', depth: 0.006, poly: curvvU(0.2713, 1.08, 0.3184, 1.123, 0.012) },
  ],
  plates: { front: 0.582, rear: 0.56 },
  mirrors: 'black',
  paint: '#cfd0d2', // Pristine White, darkened for the studio lights
  plate: 'MH 12 CV 2026',
}

const I20_L = 3.995
/** a side outline from a rounded rectangle given in u (0…1) and metres */
const i20U = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  rrectS(u0 * I20_L, y0, u1 * I20_L, y1, r).map(([x, y]) => [+(x / I20_L).toFixed(5), y] as P2)
/** the grille's half-width at height y: narrowing from under the headlamps to its lower corners */
const i20GrilleHW = (y: number) => (y < 0.6 ? 0.39 + ((y - 0.37) * 0.13) / 0.23 : 0.52 - (y - 0.6) * 1.6)
// the parametric grille: rows of upward-pointing chevrons, every other row offset half a pitch, kept off the plate
const i20Chevrons: Decal[] = [0.612, 0.552, 0.492, 0.432, 0.385].flatMap((y, row) => {
  const out: Decal[] = []
  for (let k = -6; k <= 6; k++) {
    const zc = k * 0.105 + (row % 2) * 0.0525
    if (Math.abs(zc) + 0.055 > Math.min(i20GrilleHW(y), i20GrilleHW(y + 0.034)) - 0.015) continue
    if (Math.abs(zc) < 0.31 && y > 0.38 && y < 0.55) continue
    out.push({ step: 0.004, mat: 'trim', layer: 1, depth: 0.012, poly: [[zc - 0.05, y], [zc - 0.034, y], [zc, y + 0.02], [zc + 0.034, y], [zc + 0.05, y], [zc, y + 0.034]] })
  }
  return out
})

/** Hyundai i20 (Sept 2023 facelift of the 2020 3rd gen). 3995 × 1775 × 1505, wheelbase 2580, 195/55 R16 (top trim).
 *  Side profile from a levelled gallery side photo (1.498 m with the shark-fin, axles 0.6 % apart, so the axles sit at
 *  the official wheelbase with the overhangs split as in the photo). Belt, quarter glass, shut lines, handles and the
 *  black side skirt read off a metric grid of the cut-out; the wide parametric grille, the boomerang headlamps and the
 *  lower bumper from a straight front photo; the Z-shaped tail lamps joined by a chrome strip, the black lower bumper and
 *  the silver diffuser from a straight rear photo. */
export const I20: CarSpec = {
  id: 'hyundai-i20',
  name: 'Hyundai i20',
  rakedEnds: true,
  dropSlivers: true,
  L: I20_L, W: 1.775, H: 1.505,
  axles: [0.157, 0.8028],
  tyreR: 0.3105, tyreW: 0.195, rim: 0.654, wheel: { style: 'swirl', spokes: 5 },
  archGap: 0.06, archSquare: 0.15,
  sill: [[0, 0.25], [0.006, 0.27], [0.015, 0.285], [0.03, 0.273], [0.05, 0.262], [0.08, 0.255], [0.12, 0.24], [0.2, 0.215], [0.26, 0.2], [0.5, 0.2], [0.7, 0.198], [0.75, 0.19], [0.85, 0.172], [0.9, 0.162], [0.93, 0.172], [0.96, 0.185], [0.98, 0.2], [0.99, 0.208], [0.996, 0.215], [1, 0.23]],
  // the tail up to the lamps and the tailgate glass, the belt kicking up under the pointed quarter glass, falling along
  // the doors to the mirror, then the bonnet curving down to the nose, lifted at the face to the headlamp tops
  top: [[0, 1.035], [0.006, 1.058], [0.015, 1.075], [0.03, 1.09], [0.05, 1.105], [0.07, 1.12], [0.09, 1.14], [0.104, 1.155], [0.12, 1.15], [0.15, 1.138], [0.18, 1.125], [0.196, 1.118], [0.22, 1.105], [0.3, 1.078], [0.4, 1.05], [0.5, 1.022], [0.6, 0.99], [0.68, 0.972], [0.72, 0.985], [0.76, 1.0], [0.78, 0.994], [0.8, 0.985], [0.82, 0.974], [0.84, 0.958], [0.86, 0.94], [0.88, 0.917], [0.9, 0.891], [0.92, 0.862], [0.94, 0.833], [0.96, 0.808], [0.975, 0.8], [0.988, 0.797], [1, 0.794]],
  // round in plan: both ends taper hard into the corners
  width: [[0, 0.92], [0.005, 0.94], [0.015, 0.955], [0.035, 0.97], [0.07, 0.982], [0.13, 0.995], [0.17, 1], [0.45, 0.99], [0.8, 0.995], [0.86, 0.99], [0.92, 0.97], [0.955, 0.945], [0.972, 0.925], [0.986, 0.9], [0.996, 0.875], [1, 0.86]],
  crown: 0.02,
  bulge: 0.04,
  bonnetRidge: 0.01,
  haunch: 0.06,
  topRadius: 0.08,
  noseSweep: 0.18,
  tailSweep: 0.24,
  greenhouse: {
    u0: 0.03, u1: 0.76, tumble: 0.64,
    // the raked tailgate glass under the roof spoiler, the long roof (shark-fin left out), the raked windscreen
    top: [[0.03, 1.092], [0.05, 1.137], [0.07, 1.205], [0.09, 1.268], [0.1, 1.303], [0.108, 1.36], [0.115, 1.395], [0.13, 1.411], [0.16, 1.428], [0.2, 1.445], [0.25, 1.46], [0.3, 1.472], [0.35, 1.478], [0.4, 1.481], [0.44, 1.477], [0.47, 1.471], [0.5, 1.459], [0.52, 1.448], [0.54, 1.426], [0.56, 1.398], [0.58, 1.364], [0.6, 1.33], [0.62, 1.296], [0.64, 1.256], [0.66, 1.203], [0.68, 1.161], [0.7, 1.115], [0.72, 1.068], [0.74, 1.028], [0.76, 1.0]],
  },
  roof: { u0: 0.1148, u1: 0.5534, black: false },
  pillars: [
    // the black divider ahead of the quarter glass, the black B-pillar
    { bottom: [0.205, 0.217], top: [0.205, 0.217], black: true },
    { bottom: [0.405, 0.425], top: [0.4, 0.419], black: true },
  ],
  doors: [[0.282, 0.173], [0.425, 0.422], [0.694, 0.702]],
  windowChrome: true,
  front: [
    // the bonnet's leading edge over the grille, between the headlamps
    { step: 0.004, mat: 'gloss', depth: 0.001, poly: band([[-0.46, 0.69], [-0.3, 0.735], [0, 0.752], [0.3, 0.735], [0.46, 0.69]], 0.012) },
    // boomerang headlamps under the bonnet edge: a dark housing, the LED strip along the top, the LED projector
    { step: 0.004, mat: 'trim', mirror: true, depth: 0.004, poly: smooth([[0.44, 0.668], [0.5, 0.628], [0.59, 0.596], [0.65, 0.604], [0.7, 0.616], [0.72, 0.628], [0.726, 0.69], [0.722, 0.735], [0.71, 0.756], [0.69, 0.758], [0.62, 0.737], [0.54, 0.71], [0.47, 0.684]], 1) },
    { step: 0.004, mat: 'drl', mirror: true, layer: 1, poly: [[0.47, 0.672], [0.54, 0.697], [0.62, 0.723], [0.69, 0.742], [0.705, 0.745], [0.705, 0.756], [0.69, 0.754], [0.62, 0.736], [0.54, 0.71], [0.47, 0.685]] },
    { step: 0.004, mat: 'head', mirror: true, layer: 1, depth: 0.008, poly: rrect(0.615, 0.645, 0.7, 0.7, 0.008) },
    { step: 0.004, mat: 'silver', mirror: true, layer: 1, depth: 0.006, poly: rrect(0.55, 0.648, 0.605, 0.672, 0.006) },
    // the wide gloss-black grille, narrowing down to its lower corners, with its parametric chevrons
    { step: 0.004, mat: 'gloss', poly: smooth(both([[0, 0.37], [0.36, 0.37], [0.39, 0.38], [0.47, 0.52], [0.515, 0.58], [0.52, 0.605], [0.47, 0.64], [0.43, 0.665], [0.41, 0.672], [0, 0.672]]), 1) },
    ...i20Chevrons,
    // the black slots with horizontal fins at the bumper corners
    { step: 0.004, mat: 'gloss', mirror: true, poly: smooth([[0.6, 0.35], [0.69, 0.33], [0.7, 0.4], [0.7, 0.58], [0.66, 0.585], [0.62, 0.48]], 1) },
    ...[0.39, 0.43, 0.47, 0.51].map((y): Decal => ({ step: 0.004, mat: 'trim', mirror: true, layer: 1, depth: 0.008, poly: [[0.635 + (y - 0.39) * 0.15, y], [0.688, y - 0.006], [0.688, y + 0.008], [0.637 + (y - 0.39) * 0.15, y + 0.014]] })),
    // the black lower intake with its fins and the silver lip under it
    { step: 0.004, mat: 'gloss', poly: smooth(both([[0, 0.25], [0.64, 0.25], [0.69, 0.27], [0.7, 0.315], [0.6, 0.335], [0, 0.335]]), 1) },
    { step: 0.004, mat: 'slats', layer: 1, depth: 0.004, poly: both([[0, 0.268], [0.55, 0.268], [0.6, 0.29], [0.55, 0.318], [0, 0.318]]) },
    { step: 0.004, mat: 'satin', layer: 1, depth: 0.006, poly: rrect(-0.62, 0.236, 0.62, 0.25, 0.006) },
  ],
  rear: [
    // the gloss-black band across the tailgate between the lamps, under the glass
    { step: 0.004, mat: 'gloss', poly: both([[0, 0.968], [0.405, 0.968], [0.405, 1.026], [0.3, 1.04], [0, 1.045]]) },
    // Z-shaped tail lamps: smoked housings, a red guide along the lower edge and the outer top joined by a link, the
    // reversing lamp near the corner
    { step: 0.004, mat: 'reflector', mirror: true, layer: 1, depth: 0.004, poly: smooth([[0.4, 0.935], [0.61, 0.887], [0.79, 0.82], [0.802, 0.835], [0.802, 0.985], [0.79, 0.995], [0.4, 1.03]], 1) },
    { step: 0.004, mat: 'tail', mirror: true, layer: 2, poly: [[0.42, 0.938], [0.61, 0.895], [0.792, 0.828], [0.792, 0.844], [0.61, 0.909], [0.42, 0.952]] },
    { step: 0.004, mat: 'tail', mirror: true, layer: 2, poly: [[0.56, 1.003], [0.792, 0.98], [0.792, 0.994], [0.56, 1.017]] },
    { step: 0.004, mat: 'tail', mirror: true, layer: 2, poly: [[0.5, 0.93], [0.514, 0.927], [0.574, 1.012], [0.56, 1.014]] },
    { step: 0.004, mat: 'silver', mirror: true, layer: 2, depth: 0.006, poly: rrect(0.735, 0.875, 0.755, 0.96, 0.006) },
    // the chrome strip joining the lamps, a red line under it
    { step: 0.004, mat: 'chrome', layer: 3, depth: 0.008, poly: rrect(-0.6, 0.958, 0.6, 0.972, 0.005) },
    { step: 0.004, mat: 'reflector', layer: 2, poly: [[-0.42, 0.944], [0.42, 0.944], [0.42, 0.956], [-0.42, 0.956]] },
    // the tailgate's shut line round its lower panel
    { step: 0.004, mat: 'gloss', depth: 0.001, poly: band([[-0.6, 0.905], [-0.585, 0.78], [-0.55, 0.745], [-0.46, 0.733], [0, 0.73], [0.46, 0.733], [0.55, 0.745], [0.585, 0.78], [0.6, 0.905]], 0.012) },
    // the black lower bumper with red reflector strips along its top corners
    { step: 0.004, mat: 'trim', poly: smooth(both([[0, 0.31], [0.76, 0.31], [0.795, 0.34], [0.8, 0.4], [0.8, 0.565], [0.41, 0.585], [0.34, 0.63], [0, 0.632]]), 1) },
    { step: 0.004, mat: 'reflector', mirror: true, layer: 1, poly: [[0.41, 0.588], [0.79, 0.568], [0.8, 0.58], [0.798, 0.622], [0.41, 0.605]] },
    // the silver diffuser: a satin panel with a chrome top edge and dark fins
    { step: 0.004, mat: 'satin', layer: 1, poly: smooth(both([[0, 0.335], [0.66, 0.335], [0.705, 0.345], [0.62, 0.43], [0.58, 0.448], [0, 0.448]]), 1) },
    { step: 0.004, mat: 'chrome', layer: 2, depth: 0.008, poly: band([[-0.705, 0.345], [-0.62, 0.43], [-0.58, 0.448], [0, 0.45], [0.58, 0.448], [0.62, 0.43], [0.705, 0.345]], 0.012) },
    ...[-0.33, -0.02, 0.02, 0.33].map((z): Decal => ({ step: 0.004, mat: 'gloss', layer: 2, depth: 0.01, poly: rrect(z - 0.007, 0.342, z + 0.007, 0.44, 0.004) })),
  ],
  side: [
    // chrome door handles, the rear one high on the rising belt
    { step: 0.004, mat: 'chrome', depth: 0.01, poly: i20U(0.431, 0.83, 0.496, 0.858, 0.012) },
    { step: 0.004, mat: 'chrome', depth: 0.01, poly: i20U(0.186, 0.94, 0.253, 0.968, 0.012) },
    // the headlamp sweeping back along the wing to a point
    { step: 0.004, mat: 'trim', depth: 0.004, poly: [[0.999, 0.61], [0.999, 0.7], [0.975, 0.708], [0.96, 0.72], [0.92, 0.762], [0.878, 0.806], [0.886, 0.788], [0.92, 0.732], [0.955, 0.665], [0.98, 0.618]] },
    // the tail lamp wrapping onto the flank to a point, its red guide along the top
    { step: 0.004, mat: 'reflector', depth: 0.004, poly: [[0.127, 0.935], [0.127, 0.99], [0.08, 1.005], [0.03, 1.018], [0.005, 1.02], [0.005, 0.85], [0.03, 0.81], [0.05, 0.8], [0.09, 0.87]] },
    { step: 0.004, mat: 'tail', layer: 1, poly: [[0.12, 0.975], [0.08, 0.99], [0.03, 1.003], [0.005, 1.005], [0.005, 0.99], [0.03, 0.989], [0.08, 0.976], [0.12, 0.962]] },
    // the black side skirt along the doors with a chrome line
    { step: 0.004, mat: 'trim', depth: 0.004, poly: [[0.265, 0.222], [0.698, 0.222], [0.703, 0.25], [0.7, 0.32], [0.275, 0.32], [0.265, 0.27]] },
    { step: 0.004, mat: 'chrome', layer: 1, depth: 0.004, poly: i20U(0.29, 0.294, 0.69, 0.307, 0.005) },
  ],
  plates: { front: 0.465, rear: 0.55 },
  mirrors: 'body',
  paint: '#878b92', // the gallery car's light silver, darkened for the studio lights
  plate: 'MH 12 IT 2026',
}

const KYLAQ_L = 3.995
/** a side outline from a rounded rectangle given in u (0…1) and metres */
const kylaqU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  rrectS(u0 * KYLAQ_L, y0, u1 * KYLAQ_L, y1, r).map(([x, y]) => [+(x / KYLAQ_L).toFixed(5), y] as P2)
/** a circle outline (projector lamps) */
const kylaqCircle = (zc: number, yc: number, r: number, n = 36): P2[] =>
  Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return [+(zc + r * Math.cos(a)).toFixed(4), +(yc + r * Math.sin(a)).toFixed(4)] as P2 })
/** the butterfly grille's upright ribs: one dark-chrome rib per slot, each as tall as the grille at its z */
const kylaqGrilleBot = (z: number) => (z < 0.42 ? 0.728 + (z / 0.42) * 0.012 : 0.74 + ((z - 0.42) / 0.12) * 0.06)
const kylaqRibs: Decal[] = [0.029, 0.087, 0.145, 0.203, 0.261, 0.319, 0.377, 0.435, 0.493].map((z): Decal => ({
  step: 0.004, mat: 'trim', layer: 2, depth: 0.014, mirror: true,
  poly: rrect(z - 0.011, kylaqGrilleBot(z + 0.011) + 0.012, z + 0.011, 0.928 - z * 0.012, 0.004),
}))

/** Skoda Kylaq (2025). 3995 × 1783 × 1619 (with roof rails), wheelbase 2566, 205/55 R17 (Prestige).
 *  Side profile from the gallery's levelled side photo (1.627 m measured over the rails, wheelbase within 0.3 %); axles at
 *  the official wheelbase with the overhangs split as in the photo. Belt, cladding, shut lines and handles read off a
 *  metric grid of the levelled cut-out; the split headlamps under slim DRLs, the butterfly grille and the bumpers from
 *  the straight front photo and close-ups; the tail lamps joined by the black strip and the rear bumper from the rear
 *  photos. */
export const KYLAQ: CarSpec = {
  id: 'skoda-kylaq',
  name: 'Skoda Kylaq',
  dropSlivers: true,
  L: KYLAQ_L, W: 1.783, H: 1.619,
  axles: [0.1625, 0.8048],
  tyreR: 0.3287, tyreW: 0.205, rim: 0.657, wheel: { style: 'split', spokes: 5 },
  archGap: 0.08, archSquare: 0.65,
  sill: [[0, 0.37], [0.01, 0.335], [0.02, 0.315], [0.04, 0.293], [0.07, 0.27], [0.1, 0.255], [0.28, 0.24], [0.5, 0.236], [0.7, 0.232], [0.9, 0.225], [0.95, 0.222], [0.97, 0.232], [0.98, 0.245], [0.99, 0.255], [1, 0.27]],
  // the upright tail up to the lamp tops, the belt falling gently from the D-pillar to the mirror, the bonnet rolling
  // down to the upright grille face
  top: [[0, 1.225], [0.006, 1.232], [0.012, 1.236], [0.02, 1.238], [0.05, 1.236], [0.1, 1.228], [0.15, 1.217], [0.2, 1.203], [0.25, 1.192], [0.3, 1.182], [0.4, 1.167], [0.45, 1.16], [0.5, 1.152], [0.6, 1.138], [0.68, 1.128], [0.72, 1.122], [0.75, 1.097], [0.8, 1.063], [0.85, 1.036], [0.9, 1.01], [0.92, 0.998], [0.94, 0.984], [0.96, 0.969], [0.97, 0.962], [0.98, 0.957], [0.99, 0.953], [1, 0.951]],
  width: [[0, 0.92], [0.008, 0.95], [0.02, 0.97], [0.05, 0.985], [0.1, 0.996], [0.5, 1], [0.88, 0.996], [0.93, 0.98], [0.96, 0.96], [0.985, 0.935], [1, 0.91]],
  crown: 0.012,
  bulge: 0.02,
  // the crease through the door handles, kept under the tail lamps at the tail
  shoulder: { y: [[0, 0.9], [0.1, 0.98], [0.2, 1.02], [0.5, 0.99], [1, 0.93]], inset: 0.018 },
  haunch: 0.04,
  bonnetRidge: 0.01,
  topRadius: 0.06,
  noseSweep: 0.07,
  tailSweep: 0.09,
  greenhouse: {
    u0: 0.02, u1: 0.72, tumble: 0.75,
    // the raked tailgate glass under the roof spoiler, a near-flat roof under the rails, the screen
    top: [[0.02, 1.15], [0.03, 1.214], [0.04, 1.258], [0.05, 1.29], [0.06, 1.327], [0.07, 1.362], [0.08, 1.398], [0.09, 1.442], [0.095, 1.475], [0.1, 1.505], [0.105, 1.522], [0.11, 1.53], [0.12, 1.538], [0.15, 1.55], [0.2, 1.562], [0.3, 1.572], [0.4, 1.57], [0.45, 1.564], [0.5, 1.552], [0.52, 1.54], [0.53, 1.53], [0.55, 1.512], [0.6, 1.43], [0.65, 1.306], [0.7, 1.18], [0.72, 1.124]],
  },
  roof: { u0: 0.09153, u1: 0.52186, black: false },
  pillars: [
    // the big body-coloured D-pillar from the tail to the leaning rear edge of the door glass
    { bottom: [0.075, 0.205], top: [0.09153, 0.238], black: false, step: 0.004 },
    { bottom: [0.267, 0.275], top: [0.267, 0.275], black: true },
    { bottom: [0.432, 0.455], top: [0.434, 0.455], black: true },
  ],
  // squared black arch flares, the grey rocker under the doors, the black rear bumper
  cladding: { top: [[0, 0.74], [0.04, 0.74], [0.055, 0.68], [0.07, 0.56], [0.09, 0.49], [0.12, 0.47], [0.3, 0.47], [0.5, 0.465], [0.7, 0.455], [0.9, 0.45], [0.95, 0.45], [1, 0.45]], flare: 0.07, cut: true },
  doors: [[0.706, 0.698], [0.448, 0.445], [0.232, 0.207]],
  front: [
    // the butterfly grille: gloss black, a dark-chrome top frame and an upright rib in every slot
    { step: 0.004, mat: 'gloss', poly: smooth(both([[0, 0.726], [0.4, 0.736], [0.43, 0.742], [0.53, 0.792], [0.552, 0.815], [0.556, 0.84], [0.556, 0.912], [0.55, 0.924], [0.53, 0.929], [0.3, 0.94], [0, 0.948]]), 1) },
    { step: 0.004, mat: 'trim', layer: 1, depth: 0.01, poly: band([[-0.54, 0.921], [-0.3, 0.932], [0, 0.94], [0.3, 0.932], [0.54, 0.921]], 0.014) },
    ...kylaqRibs,
    // slim LED DRLs on top, in a black slit, running out from the grille's top corners
    { step: 0.004, mat: 'gloss', layer: 1, mirror: true, depth: 0.004, poly: smooth([[0.565, 0.9], [0.728, 0.912], [0.742, 0.926], [0.73, 0.94], [0.57, 0.928]], 1) },
    { step: 0.004, mat: 'drl', layer: 2, mirror: true, poly: band([[0.575, 0.914], [0.73, 0.926]], 0.014) },
    // headlamps below: a black-framed pocket, the hex LED unit inboard and the projector outboard
    { step: 0.004, mat: 'trim', mirror: true, depth: 0.004, poly: smooth([[0.55, 0.745], [0.58, 0.692], [0.775, 0.692], [0.785, 0.71], [0.785, 0.8], [0.765, 0.815], [0.6, 0.802]], 1) },
    { step: 0.004, mat: 'gloss', layer: 1, mirror: true, poly: smooth([[0.57, 0.745], [0.592, 0.705], [0.765, 0.705], [0.772, 0.718], [0.772, 0.792], [0.76, 0.8], [0.61, 0.79]], 1) },
    { step: 0.004, mat: 'silver', layer: 2, mirror: true, poly: [[0.6, 0.748], [0.618, 0.722], [0.675, 0.722], [0.685, 0.748], [0.675, 0.775], [0.618, 0.775]] },
    { step: 0.004, mat: 'chrome', layer: 3, mirror: true, poly: [[0.61, 0.748], [0.624, 0.729], [0.668, 0.729], [0.676, 0.748], [0.668, 0.768], [0.624, 0.768]] },
    { step: 0.004, mat: 'silver', layer: 2, mirror: true, depth: 0.006, poly: kylaqCircle(0.73, 0.752, 0.03) },
    { step: 0.004, mat: 'head', layer: 3, mirror: true, poly: kylaqCircle(0.73, 0.752, 0.013) },
    // the grey bumper rising between the blue corner pockets, the black slot under the grille
    { step: 0.004, mat: 'trim', poly: smooth(both([[0, 0.27], [0.7, 0.27], [0.79, 0.31], [0.8, 0.42], [0.69, 0.435], [0.62, 0.64], [0.6, 0.668], [0, 0.668]]), 1) },
    { step: 0.004, mat: 'gloss', layer: 1, poly: rrect(-0.43, 0.632, 0.43, 0.655, 0.008) },
    // the trapezoid lower grille (dark hex mesh) and the satin skid lip under it
    { step: 0.004, mat: 'gloss', layer: 1, poly: smooth(both([[0, 0.345], [0.57, 0.345], [0.62, 0.485], [0, 0.485]]), 1) },
    { step: 0.004, mat: 'mesh', layer: 2, poly: smooth(both([[0, 0.355], [0.555, 0.355], [0.6, 0.474], [0, 0.474]]), 1) },
    { step: 0.004, mat: 'satin', layer: 2, poly: smooth(both([[0, 0.3], [0.62, 0.3], [0.69, 0.318], [0.7, 0.34], [0.6, 0.345], [0, 0.345]]), 2) },
  ],
  rear: [
    // the tail lamps: smoked housings, a red guide along the top and down the outer half, the clear reversing inner
    { step: 0.004, mat: 'reflector', layer: 1, mirror: true, depth: 0.008, poly: smooth([[0.6, 1.0], [0.735, 1.0], [0.785, 1.04], [0.8, 1.12], [0.792, 1.168], [0.765, 1.196], [0.72, 1.206], [0.6, 1.208]], 1) },
    { step: 0.004, mat: 'tail', layer: 2, mirror: true, poly: [[0.605, 1.183], [0.73, 1.183], [0.752, 1.174], [0.758, 1.186], [0.735, 1.196], [0.605, 1.197]] },
    { step: 0.004, mat: 'tail', layer: 2, mirror: true, poly: [[0.69, 1.08], [0.705, 1.08], [0.71, 1.183], [0.695, 1.183]] },
    { step: 0.004, mat: 'tail', layer: 2, mirror: true, poly: [[0.715, 1.12], [0.778, 1.12], [0.779, 1.134], [0.715, 1.134]] },
    { step: 0.004, mat: 'silver', layer: 2, mirror: true, poly: rrect(0.612, 1.07, 0.682, 1.178, 0.006) },
    { step: 0.004, mat: 'satin', layer: 3, mirror: true, poly: rrect(0.614, 1.118, 0.68, 1.128, 0.003) },
    { step: 0.004, mat: 'gloss', layer: 2, mirror: true, poly: rrect(0.606, 1.04, 0.69, 1.065, 0.004) },
    // the gloss-black strip joining them
    { step: 0.004, mat: 'gloss', depth: 0.006, poly: smooth(both([[0, 1.09], [0.6, 1.09], [0.61, 1.1], [0.61, 1.212], [0, 1.212]]), 1) },
    // black bumper with corner reflectors, the satin U-shaped skid plate round a finned diffuser
    { step: 0.004, mat: 'trim', poly: smooth(both([[0, 0.36], [0.7, 0.36], [0.79, 0.4], [0.8, 0.5], [0.8, 0.745], [0, 0.745]]), 1) },
    { step: 0.004, mat: 'reflector', layer: 1, mirror: true, poly: rrect(0.65, 0.7, 0.745, 0.73, 0.006) },
    { step: 0.004, mat: 'satin', layer: 1, poly: smooth(both([[0, 0.4], [0.66, 0.4], [0.69, 0.42], [0.69, 0.56], [0.65, 0.585], [0, 0.585]]), 2) },
    { step: 0.004, mat: 'trim', layer: 2, depth: 0.012, poly: smooth(both([[0, 0.39], [0.6, 0.39], [0.6, 0.48], [0.55, 0.52], [0, 0.52]]), 1) },
    ...[0.075, 0.225, 0.375, 0.5].map((z): Decal => ({ step: 0.004, mat: 'gloss', layer: 3, depth: 0.016, mirror: true, poly: rrect(z - 0.012, 0.4, z + 0.012, 0.49, 0.004) })),
  ],
  side: [
    // the tail lamp wrapping onto the rear fender: a smoked wedge with the red guide along its top
    { step: 0.004, mat: 'reflector', depth: 0.004, poly: smooth([[0.001, 1.212], [0.062, 1.203], [0.05, 1.16], [0.025, 1.06], [0.012, 1.0], [0.001, 1.0]], 1) },
    { step: 0.004, mat: 'tail', layer: 1, poly: [[0.005, 1.2], [0.055, 1.195], [0.052, 1.183], [0.005, 1.188]] },
    // satin door handles
    { step: 0.004, mat: 'satin', depth: 0.01, poly: kylaqU(0.472, 0.99, 0.532, 1.018, 0.012) },
    { step: 0.004, mat: 'satin', depth: 0.01, poly: kylaqU(0.212, 1.045, 0.268, 1.073, 0.012) },
  ],
  plates: { front: 0.54, rear: 0.985 },
  rails: 'black',
  mirrors: 'body',
  paint: '#00395c', // Lava Blue, darkened for the studio lights
  plate: 'MH 12 KQ 2026',
}

const FORTUNER_L = 4.795
/** a side outline from a rounded rectangle given in u (0…1) and metres */
const fortunerU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  rrectS(u0 * FORTUNER_L, y0, u1 * FORTUNER_L, y1, r).map(([x, y]) => [+(x / FORTUNER_L).toFixed(5), y] as P2)
/** a circle outline (fog lamps) */
const fortunerCircle = (zc: number, yc: number, r: number, n = 36): P2[] =>
  Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return [+(zc + r * Math.cos(a)).toFixed(4), +(yc + r * Math.sin(a)).toFixed(4)] as P2 })
/** a glasshouse station (u0 0.02 … u1 0.72), for the roof's paint boundaries */
const fortunerSt = (i: number) => +(0.02 + 0.7 * (0.5 - 0.5 * Math.cos((Math.PI * i) / 140))).toFixed(5)
/** one of the grille's three chrome bars: a straight bar with raised trapezoid "hats" at the given centres */
const fortunerBar = (y: number, hw: number, hats: number[]): Decal => {
  const path: P2[] = [[-hw, y]]
  for (const c of [...hats.map((h) => -h), ...hats].sort((a, b) => a - b)) path.push([c - 0.05, y], [c - 0.03, y + 0.024], [c + 0.03, y + 0.024], [c + 0.05, y])
  path.push([hw, y])
  return { step: 0.004, mat: 'chrome', layer: 2, depth: 0.012, poly: band(path, 0.013) }
}

/** Toyota Fortuner (2021 facelift, 2025 update). 4795 × 1855 × 1835, wheelbase 2745, 265/60 R18 (top trims).
 *  Side profile from the gallery's levelled road side photo (1.788 m measured over the low roof rails; the photo's axles
 *  1.7 % too far apart, so the axles sit at the official wheelbase with the overhangs split as in the photo). Belt kink,
 *  pillars, shut lines, flares and the side step read off a metric grid of the cut-out; the trapezoid grille with its
 *  chrome side fangs and wavy bars, the slim headlamps, fog pockets and skid plate from the straight front photo; the split
 *  tail lamps joined by the chrome strip, the tailgate and the bumper from the straight rear photo. */
export const FORTUNER: CarSpec = {
  id: 'toyota-fortuner',
  name: 'Toyota Fortuner',
  rakedEnds: true,
  dropSlivers: true,
  L: FORTUNER_L, W: 1.855, H: 1.835,
  axles: [0.215, 0.7875],
  tyreR: 0.3876, tyreW: 0.265, rim: 0.59, wheel: { style: 'split', spokes: 6 },
  archGap: 0.13, archSquare: 0.3, wellInset: 0.05,
  sill: [[0, 0.47], [0.008, 0.45], [0.02, 0.43], [0.03, 0.415], [0.05, 0.4], [0.08, 0.388], [0.1, 0.37], [0.13, 0.35], [0.2, 0.34], [0.3, 0.33], [0.33, 0.3], [0.36, 0.29], [0.5, 0.29], [0.64, 0.29], [0.67, 0.305], [0.7, 0.33], [0.8, 0.34], [0.9, 0.34], [0.92, 0.36], [0.94, 0.39], [0.96, 0.412], [0.97, 0.425], [0.98, 0.436], [0.99, 0.443], [1, 0.45]],
  // the upright tail up to the tailgate glass, the belt along the quarter glass with its kink down at the C-pillar, the
  // front doors, the cowl, then the long high bonnet down to the upright grille face
  top: [[0, 1.3], [0.01, 1.305], [0.02, 1.31], [0.05, 1.315], [0.1, 1.318], [0.2, 1.318], [0.28, 1.316], [0.295, 1.31], [0.31, 1.285], [0.325, 1.264], [0.34, 1.257], [0.4, 1.252], [0.5, 1.248], [0.6, 1.248], [0.66, 1.255], [0.69, 1.27], [0.72, 1.288], [0.74, 1.268], [0.76, 1.254], [0.8, 1.231], [0.84, 1.21], [0.88, 1.183], [0.9, 1.168], [0.92, 1.151], [0.94, 1.136], [0.96, 1.126], [0.97, 1.122], [0.98, 1.119], [0.99, 1.117], [1, 1.116]],
  width: [[0, 0.93], [0.006, 0.948], [0.02, 0.965], [0.05, 0.985], [0.1, 0.997], [0.2, 1], [0.8, 1], [0.88, 0.99], [0.93, 0.97], [0.96, 0.945], [0.98, 0.915], [0.993, 0.89], [1, 0.87]],
  crown: 0.012,
  bulge: 0.02,
  haunch: 0.03,
  bonnetRidge: 0.01,
  topRadius: 0.07,
  noseSweep: 0.15,
  tailSweep: 0.1,
  greenhouse: {
    u0: 0.02, u1: 0.72, tumble: 0.82,
    // the raked tailgate glass, the roof spoiler's back face, the long roof (rails left out) and the raked screen
    top: [[0.02, 1.31], [0.03, 1.385], [0.04, 1.435], [0.044, 1.46], [0.047, 1.58], [0.05, 1.675], [0.06, 1.688], [0.08, 1.702], [0.1, 1.702], [0.12, 1.709], [0.15, 1.719], [0.2, 1.726], [0.25, 1.736], [0.3, 1.738], [0.4, 1.739], [0.43, 1.738], [0.46, 1.728], [0.5, 1.716], [0.52, 1.707], [0.54, 1.684], [0.56, 1.664], [0.58, 1.645], [0.6, 1.62], [0.62, 1.57], [0.64, 1.522], [0.66, 1.467], [0.68, 1.404], [0.7, 1.335], [0.72, 1.288]],
  },
  roof: { u0: fortunerSt(18), u1: fortunerSt(91), black: false },
  pillars: [
    // the thin black C- and B-pillars (the D-pillar is blacked out behind the quarter glass)
    { bottom: [0.303, 0.316], top: [0.305, 0.318], black: true },
    { bottom: [0.454, 0.478], top: [0.456, 0.478], black: true },
  ],
  // the thin black arch flares, the black side step under the doors, the black lower rear bumper
  cladding: { top: [[0, 0.52], [0.03, 0.5], [0.06, 0.46], [0.1, 0.45], [0.3, 0.445], [0.7, 0.445], [0.9, 0.46], [0.96, 0.47], [1, 0.47]], flare: 0.045, cut: true },
  doors: [[0.69, 0.688], [0.458, 0.46], [0.24, 0.227]],
  front: [
    // the trapezoid grille: gloss black, the chrome fangs down its sides from the headlamps, three wavy chrome bars
    { step: 0.004, mat: 'gloss', poly: both([[0, 0.815], [0.325, 0.815], [0.425, 1.075], [0, 1.075]]) },
    { step: 0.004, mat: 'satin', layer: 1, mirror: true, depth: 0.012, poly: [[0.316, 0.815], [0.348, 0.818], [0.45, 1.07], [0.398, 1.075]] },
    fortunerBar(0.995, 0.37, [0.12, 0.27]),
    fortunerBar(0.932, 0.345, [0.06, 0.2]),
    fortunerBar(0.868, 0.32, [0.12, 0.26]),
    // slim headlamps: smoked housing under a chrome brow, the hockey-stick DRL, a projector
    { step: 0.004, mat: 'trim', mirror: true, depth: 0.006, poly: smooth([[0.43, 1.075], [0.6, 1.08], [0.72, 1.076], [0.775, 1.068], [0.79, 1.05], [0.785, 1.022], [0.76, 0.996], [0.68, 0.984], [0.55, 0.982], [0.47, 0.99], [0.43, 1.02]], 1) },
    { step: 0.004, mat: 'chrome', layer: 1, mirror: true, depth: 0.008, poly: band([[0.43, 1.079], [0.6, 1.083], [0.72, 1.079], [0.768, 1.07]], 0.012) },
    { step: 0.004, mat: 'drl', layer: 1, mirror: true, poly: band([[0.455, 1.035], [0.49, 1.006], [0.55, 0.998], [0.66, 0.998], [0.72, 1.008], [0.752, 1.04]], 0.012) },
    { step: 0.004, mat: 'head', layer: 1, mirror: true, poly: rrect(0.57, 1.02, 0.64, 1.055, 0.014) },
    // the black slot under the grille
    { step: 0.005, mat: 'gloss', poly: smooth(both([[0, 0.725], [0.4, 0.725], [0.43, 0.76], [0, 0.76]]), 1) },
    // honeycomb fog pockets with the round fog lamp, a chrome accent strip under each
    { step: 0.004, mat: 'gloss', mirror: true, depth: 0.006, poly: smooth([[0.59, 0.835], [0.765, 0.835], [0.778, 0.82], [0.778, 0.7], [0.765, 0.682], [0.62, 0.682], [0.54, 0.735], [0.54, 0.795], [0.555, 0.825]], 1) },
    { step: 0.004, mat: 'mesh', layer: 1, mirror: true, poly: smooth([[0.6, 0.823], [0.762, 0.823], [0.766, 0.81], [0.766, 0.705], [0.755, 0.694], [0.625, 0.694], [0.553, 0.74], [0.553, 0.79], [0.565, 0.815]], 1) },
    { step: 0.004, mat: 'head', layer: 2, mirror: true, depth: 0.008, poly: fortunerCircle(0.615, 0.745, 0.021) },
    { step: 0.004, mat: 'satin', mirror: true, depth: 0.006, poly: band([[0.585, 0.604], [0.68, 0.606], [0.765, 0.612]], 0.014) },
    // the satin skid plate with its two slotted vents beside the plate, the black edges down its sides, black chin
    { step: 0.005, mat: 'satin', poly: smooth(both([[0, 0.49], [0.47, 0.49], [0.5, 0.5], [0.62, 0.635], [0.62, 0.66], [0.58, 0.688], [0, 0.69]]), 2) },
    { step: 0.004, mat: 'gloss', layer: 1, mirror: true, poly: rrect(0.26, 0.622, 0.37, 0.655, 0.012) },
    { step: 0.004, mat: 'chrome', layer: 2, mirror: true, depth: 0.008, poly: band([[0.265, 0.638], [0.365, 0.638]], 0.012) },
    { step: 0.004, mat: 'gloss', layer: 1, mirror: true, depth: 0.002, poly: band([[0.5, 0.495], [0.625, 0.638]], 0.014) },
  ],
  rear: [
    // the split tail lamps (outer part on the body corner, inner part on the tailgate): smoked housing, red upper lens,
    // a grey light-guide strip, the dark lower section
    { step: 0.004, mat: 'gloss', layer: 1, mirror: true, depth: 0.006, poly: smooth([[0.33, 1.205], [0.4, 1.232], [0.6, 1.24], [0.78, 1.245], [0.828, 1.24], [0.84, 1.22], [0.84, 1.13], [0.825, 1.105], [0.72, 1.1], [0.68, 1.115], [0.62, 1.163], [0.45, 1.19]], 1) },
    { step: 0.004, mat: 'tail', layer: 2, mirror: true, poly: smooth([[0.36, 1.21], [0.45, 1.226], [0.6, 1.232], [0.78, 1.237], [0.826, 1.232], [0.832, 1.17], [0.7, 1.163], [0.62, 1.176], [0.45, 1.198]], 1) },
    { step: 0.004, mat: 'silver', layer: 3, mirror: true, depth: 0.004, poly: band([[0.48, 1.212], [0.62, 1.216], [0.81, 1.218]], 0.012) },
    // the tailgate's shut line splitting the lamps
    { step: 0.004, mat: 'gloss', layer: 3, mirror: true, depth: 0.001, poly: band([[0.672, 1.11], [0.672, 1.245]], 0.012) },
    // the chrome strip joining the lamps (no lettering)
    { step: 0.004, mat: 'satin', depth: 0.008, poly: smooth(both([[0, 1.163], [0.5, 1.163], [0.6, 1.158], [0.6, 1.178], [0.5, 1.19], [0, 1.19]]), 1) },
    // the tailgate's shut line down its sides and across above the bumper
    { step: 0.005, mat: 'gloss', depth: 0.001, poly: band([[-0.672, 1.1], [-0.675, 0.95], [-0.672, 0.86], [-0.665, 0.82], [-0.652, 0.788], [-0.632, 0.762], [-0.605, 0.744], [-0.57, 0.731], [-0.52, 0.724], [-0.45, 0.72], [-0.3, 0.717], [0, 0.716], [0.3, 0.717], [0.45, 0.72], [0.52, 0.724], [0.57, 0.731], [0.605, 0.744], [0.632, 0.762], [0.652, 0.788], [0.665, 0.82], [0.672, 0.86], [0.675, 0.95], [0.672, 1.1]], 0.012) },
    // red reflectors in the bumper corners, the black lower bumper
    { step: 0.004, mat: 'reflector', mirror: true, poly: rrect(0.6, 0.572, 0.78, 0.618, 0.008) },
    { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.47], [0.76, 0.47], [0.82, 0.49], [0.83, 0.53], [0.6, 0.538], [0, 0.538]]), 1) },
  ],
  side: [
    // chrome door handles
    { step: 0.004, mat: 'chrome', depth: 0.01, poly: fortunerU(0.472, 1.108, 0.518, 1.136, 0.012) },
    { step: 0.004, mat: 'chrome', depth: 0.01, poly: fortunerU(0.247, 1.112, 0.293, 1.14, 0.012) },
    // the headlamp's wedge sweeping back along the wing
    { step: 0.003, mat: 'gloss', depth: 0.003, poly: smooth([[0.999, 0.998], [0.975, 1.0], [0.95, 1.012], [0.925, 1.04], [0.905, 1.075], [0.91, 1.085], [0.94, 1.075], [0.97, 1.068], [0.999, 1.066]], 1) },
    { step: 0.003, mat: 'drl', layer: 1, depth: 0.004, poly: sideBand([[0.994, 1.008], [0.972, 1.009], [0.95, 1.02], [0.93, 1.042]], 0.01, FORTUNER_L) },
    // the tail lamp wrapping onto the flank, tapering forwards
    { step: 0.004, mat: 'gloss', depth: 0.004, poly: [[0.001, 1.245], [0.03, 1.24], [0.058, 1.212], [0.05, 1.195], [0.03, 1.15], [0.02, 1.115], [0.001, 1.112]] },
    { step: 0.004, mat: 'tail', layer: 1, depth: 0.005, poly: [[0.002, 1.238], [0.03, 1.234], [0.052, 1.212], [0.045, 1.2], [0.028, 1.17], [0.002, 1.17]] },
  ],
  plates: { front: 0.63, rear: 1.03 },
  rails: 'black',
  mirrors: 'body',
  windowChrome: true,
  paint: '#cfd0cf', // Platinum White Pearl, toned down for the studio lights
  plate: 'MH 12 FT 2026',
}

const SAFARI_L = 4.668
/** a side outline from a rounded rectangle given in u (0…1) and metres */
const safariRectU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  rrectS(u0 * SAFARI_L, y0, u1 * SAFARI_L, y1, r).map(([x, y]) => [+(x / SAFARI_L).toFixed(5), y] as P2)

/** Tata Safari (2023 facelift). 4668 × 1922 × 1795 (with roof rails), wheelbase 2741, 245/55 R19 (top trim).
 *  Side profile from a long-lens gallery side photo (1.798 m measured over the rails with the roof antenna erased; the
 *  photo's axles 1.5 % too far apart, so the axles sit at the official wheelbase with the overhangs split as in the
 *  photo). Belt, pillars, handles, shut lines and cladding read off a metric grid of the cut-out. The front end is the
 *  Harrier's (light bar on the bonnet edge, split headlamp pods, parametric grilles), re-measured from the straight
 *  front photo; the stepped roof over the third row, the body-coloured D-pillar round the raked tailgate glass, the
 *  connected tail light bar and the vertical lamps in the bumper corners from the side, straight rear and close-ups. */
export const SAFARI: CarSpec = {
  id: 'tata-safari',
  name: 'Tata Safari',
  L: SAFARI_L, W: 1.922, H: 1.795,
  axles: [0.2264, 0.8136],
  tyreR: 0.376, tyreW: 0.245, rim: 0.642, wheel: { style: 'blade', spokes: 5 },
  archGap: 0.1, archSquare: 0.3,
  sill: [[0, 0.3], [0.01, 0.32], [0.02, 0.35], [0.04, 0.36], [0.06, 0.346], [0.08, 0.326], [0.1, 0.315], [0.12, 0.303], [0.3, 0.258], [0.4, 0.256], [0.5, 0.27], [0.65, 0.27], [0.7, 0.25], [0.88, 0.255], [0.92, 0.255], [0.95, 0.29], [0.97, 0.318], [0.98, 0.33], [0.99, 0.32], [1, 0.3]],
  // the tail face up to the light bar, the body climbing the raked tailgate to the roof spoiler, the wide D-pillar
  // block over the third row, its leaning front edge down to the belt, the belt falling to the mirror, the long bonnet
  // down to the light bar on its leading edge
  top: [[0, 1.245], [0.005, 1.25], [0.01, 1.256], [0.02, 1.285], [0.03, 1.345], [0.04, 1.445], [0.045, 1.545], [0.05, 1.635], [0.055, 1.69], [0.065, 1.715], [0.08, 1.727], [0.1, 1.735], [0.12, 1.74], [0.127, 1.742], [0.132, 1.7], [0.137, 1.62], [0.143, 1.52], [0.15, 1.4], [0.155, 1.31], [0.16, 1.29], [0.2, 1.28], [0.25, 1.27], [0.3, 1.255], [0.35, 1.24], [0.4, 1.23], [0.45, 1.22], [0.5, 1.21], [0.55, 1.195], [0.6, 1.185], [0.64, 1.181], [0.7, 1.19], [0.75, 1.2], [0.78, 1.197], [0.8, 1.192], [0.84, 1.175], [0.88, 1.152], [0.9, 1.138], [0.92, 1.12], [0.94, 1.099], [0.95, 1.087], [0.96, 1.09], [0.97, 1.084], [0.98, 1.08], [0.99, 1.078], [1, 1.075]],
  width: [[0, 0.88], [0.006, 0.92], [0.02, 0.955], [0.05, 0.982], [0.1, 0.997], [0.5, 1], [0.88, 0.997], [0.92, 0.985], [0.95, 0.965], [0.975, 0.935], [0.99, 0.9], [1, 0.87]],
  crown: 0.012,
  bulge: 0.03,
  // tumblehome over the third row only (the line sits above the belt elsewhere, so the inset is off there)
  shoulder: { y: [[0, 1.26], [0.12, 1.29], [0.16, 1.45], [0.2, 1.6], [1, 1.6]], inset: 0.3 },
  haunch: 0.045,
  topRadius: 0.1,
  dropSlivers: true,
  rakedEnds: true,
  noseSweep: 0.12,
  tailSweep: 0.12,
  greenhouse: {
    u0: 0.125, u1: 0.75, tumble: 0.7, followBody: 0.14,
    // the stepped roof over the third row (rails left out), the roof falling gently forwards, the raked screen
    top: [[0.125, 1.7], [0.13, 1.715], [0.135, 1.735], [0.14, 1.745], [0.15, 1.752], [0.16, 1.755], [0.2, 1.757], [0.22, 1.751], [0.25, 1.746], [0.3, 1.742], [0.35, 1.737], [0.4, 1.73], [0.45, 1.722], [0.48, 1.716], [0.5, 1.709], [0.52, 1.694], [0.54, 1.672], [0.56, 1.649], [0.58, 1.616], [0.6, 1.577], [0.62, 1.54], [0.64, 1.492], [0.66, 1.437], [0.68, 1.387], [0.7, 1.333], [0.72, 1.282], [0.74, 1.228], [0.75, 1.203]],
  },
  roof: { u0: 0.125, u1: 0.5473, black: false },
  pillars: [
    // the black B-pillar (the thin C-pillar and the A-pillar are left as plain glass)
    { bottom: [0.448, 0.475], top: [0.452, 0.475], black: true },
    // the black trim along the D-pillar's leaning front edge, over the joint with the third-row roof block
    { bottom: [0.126, 0.162], top: [0.125, 0.15], black: true, step: 0.004 },
  ],
  // black arch flares, the black band along the doors, the black bumpers
  cladding: { top: [[0, 0.6], [0.05, 0.6], [0.08, 0.56], [0.11, 0.53], [0.3, 0.518], [0.5, 0.505], [0.7, 0.49], [0.9, 0.5], [0.93, 0.52], [1, 0.52]], flare: 0.055, cut: true },
  doors: [[0.71, 0.712], [0.476, 0.462], [0.236, 0.242]],
  front: [
    // the gloss-black band along the bonnet's leading edge carrying the full-width LED light bar, rising at its ends
    { step: 0.005, mat: 'trim', layer: 1, depth: 0.006, poly: both([[0, 0.9], [0.5, 0.9], [0.6, 0.935], [0.68, 0.985], [0.735, 1.02], [0.742, 1.045], [0.725, 1.05], [0.67, 1.025], [0.5, 1.012], [0, 1.01]]) },
    { step: 0.005, mat: 'drl', layer: 2, poly: both([[0, 0.989], [0.5, 0.991], [0.67, 1.003], [0.725, 1.028], [0.734, 1.04], [0.72, 1.041], [0.665, 1.016], [0.5, 1.004], [0, 1.003]]) },
    // the upper grille: gloss black with staggered satin bars, wider at the top
    { step: 0.005, mat: 'gloss', poly: both([[0, 0.755], [0.5, 0.755], [0.53, 0.8], [0.548, 0.9], [0.55, 0.94], [0, 0.94]]) },
    ...harrierBricks([0.922, 0.896, 0.87, 0.844, 0.818, 0.792, 0.768], (y) => 0.49 + (y - 0.755) * 0.3),
    // the gloss strip under the grille joining the headlamp pods
    { step: 0.005, mat: 'gloss', poly: both([[0, 0.71], [0.68, 0.71], [0.69, 0.724], [0, 0.724]]) },
    // the split headlamp pods in the bumper corners: projector on top, a DRL line, a second lamp, a slatted pocket below
    { step: 0.005, mat: 'gloss', mirror: true, depth: 0.008, poly: smooth([[0.685, 0.62], [0.805, 0.62], [0.81, 0.89], [0.7, 0.89], [0.685, 0.86]], 1) },
    { step: 0.005, mat: 'head', layer: 1, mirror: true, poly: rrectS(0.705, 0.805, 0.79, 0.868, 0.012) },
    { step: 0.005, mat: 'drl', layer: 1, mirror: true, poly: rrectS(0.7, 0.787, 0.797, 0.799, 0.004) },
    { step: 0.005, mat: 'head', layer: 1, mirror: true, poly: rrectS(0.715, 0.728, 0.785, 0.772, 0.008) },
    { step: 0.005, mat: 'slats', layer: 1, mirror: true, poly: [[0.71, 0.635], [0.795, 0.635], [0.795, 0.705], [0.71, 0.705]] },
    // the black lower bumper, the lower grille with its bars and the satin skid strip along its foot
    { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.33], [0.72, 0.33], [0.79, 0.38], [0.8, 0.52], [0.7, 0.56], [0.62, 0.61], [0, 0.61]]), 1) },
    { step: 0.005, mat: 'gloss', layer: 1, poly: both([[0, 0.452], [0.53, 0.452], [0.57, 0.6], [0, 0.6]]) },
    ...harrierBricks([0.582, 0.556, 0.53, 0.504, 0.478], (y) => 0.52 + (y - 0.452) * 0.25, (z, y) => Math.abs(z) < 0.07 && y < 0.55),
    { step: 0.005, mat: 'satin', layer: 2, depth: 0.01, poly: smooth(both([[0, 0.4], [0.56, 0.4], [0.61, 0.412], [0.62, 0.43], [0.6, 0.448], [0, 0.448]]), 2) },
  ],
  rear: [
    // the tailgate glass on the raked tail, under the roof spoiler, and the high stop lamp in the spoiler
    { step: 0.004, mat: 'gloss', depth: 0.003, poly: smooth(both([[0, 1.3], [0.56, 1.3], [0.6, 1.33], [0.56, 1.52], [0.51, 1.62], [0, 1.62]]), 2) },
    { step: 0.004, mat: 'tail', layer: 1, poly: rrectS(-0.15, 1.645, 0.15, 1.662, 0.005) },
    // the connected light bar: a smoked band, the red line along its top, and the corner units with a brighter red strip
    { step: 0.005, mat: 'gloss', layer: 1, depth: 0.012, poly: smooth(both([[0, 1.095], [0.62, 1.095], [0.775, 1.09], [0.8, 1.1], [0.805, 1.2], [0.785, 1.225], [0, 1.228]]), 1) },
    { step: 0.005, mat: 'tail', layer: 2, depth: 0.016, poly: both([[0, 1.176], [0.62, 1.176], [0.795, 1.172], [0.795, 1.188], [0.62, 1.19], [0, 1.19]]) },
    { step: 0.005, mat: 'tail', layer: 2, mirror: true, depth: 0.016, poly: [[0.6, 1.11], [0.795, 1.106], [0.795, 1.13], [0.66, 1.132], [0.6, 1.124]] },
    // the tailgate's shut line round the plate
    { step: 0.005, mat: 'gloss', depth: 0.001, poly: band([[-0.69, 1.09], [-0.69, 0.74], [-0.64, 0.683], [0, 0.683], [0.64, 0.683], [0.69, 0.74], [0.69, 1.09]], 0.012) },
    // the vertical lamps in the bumper corners
    { step: 0.005, mat: 'gloss', mirror: true, depth: 0.006, poly: rrectS(0.762, 0.68, 0.828, 0.935, 0.01) },
    { step: 0.005, mat: 'tail', layer: 1, mirror: true, poly: rrectS(0.775, 0.7, 0.818, 0.915, 0.008) },
    // the black lower bumper and the satin skid plate
    { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.3], [0.72, 0.3], [0.8, 0.34], [0.82, 0.42], [0.82, 0.6], [0, 0.61]]), 1) },
    { step: 0.005, mat: 'satin', layer: 1, poly: smooth(both([[0, 0.34], [0.6, 0.34], [0.655, 0.37], [0.668, 0.517], [0, 0.517]]), 2) },
  ],
  side: [
    // the tail lamp wedge on the flank: smoked housing round the red lens
    { step: 0.004, mat: 'gloss', depth: 0.002, poly: [[0.005, 1.1], [0.06, 1.108], [0.1, 1.115], [0.106, 1.128], [0.088, 1.2], [0.06, 1.222], [0.005, 1.232]] },
    { step: 0.004, mat: 'tail', layer: 1, depth: 0.004, poly: [[0.005, 1.12], [0.06, 1.124], [0.096, 1.128], [0.086, 1.185], [0.06, 1.19], [0.005, 1.195]] },
    // the dark pocket round the vertical bumper lamp at the tail corner
    { step: 0.005, mat: 'gloss', poly: [[0.004, 0.66], [0.03, 0.66], [0.033, 0.9], [0.004, 0.91]] },
    // body-coloured door handles
    { step: 0.005, mat: 'body', depth: 0.01, poly: safariRectU(0.483, 1.04, 0.542, 1.072, 0.012) },
    { step: 0.005, mat: 'body', depth: 0.01, poly: safariRectU(0.26, 1.087, 0.318, 1.118, 0.012) },
  ],
  plates: { front: 0.64, rear: 1.0 },
  rails: 'silver',
  mirrors: 'black',
  paint: '#a47a5a', // Cosmic Gold, darkened for the studio lights
  plate: 'MH 12 SF 2026',
}

const WINDSOR_L = 4.295
/** a side outline from a rounded rectangle given in u (0…1) and metres */
const windsorU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  rrectS(u0 * WINDSOR_L, y0, u1 * WINDSOR_L, y1, r).map(([x, y]) => [+(x / WINDSOR_L).toFixed(5), y] as P2)
/** the lower grille's gloss-black diamonds, staggered rows kept inside its tapering outline */
const windsorDiamonds: Decal[] = [0.318, 0.348, 0.378, 0.408].flatMap((y, row) => {
  const out: Decal[] = []
  const pitch = 0.056, hw = 0.5 + (y - 0.295) * 0.55
  for (let z = (row % 2 ? pitch / 2 : 0) - 0.7; z < 0.7; z += pitch) {
    if (Math.abs(z) + 0.026 > hw) continue
    out.push({ step: 0.004, mat: 'gloss', layer: 2, depth: 0.01, poly: [[z - 0.025, y], [z, y + 0.0135], [z + 0.025, y], [z, y - 0.0135]] })
  }
  return out
})

/** MG Windsor EV (2024). 4295 × 1850 × 1677, wheelbase 2700, 215/55 R18 (Essence).
 *  Side profile from the gallery's levelled side photo (1.718 m measured from the close camera, so heights scaled by 0.976;
 *  the axles 1.3 % too far apart, so they sit at the official wheelbase with the overhangs split as in the photo). Belt,
 *  pillars, handles and trim strips read off the cut-out's pixel columns; the light bar under the bonnet lip, the low
 *  headlamp pods and the diamond lower grille from the straight front photo, the connected tail lamps from the rear. */
export const WINDSOR_EV: CarSpec = {
  id: 'mg-windsor-ev',
  name: 'MG Windsor EV',
  ev: true,
  rakedEnds: true,
  dropSlivers: true,
  L: WINDSOR_L, W: 1.85, H: 1.677,
  axles: [0.1937, 0.8223],
  tyreR: 0.3469, tyreW: 0.215, rim: 0.659, wheel: { style: 'petal', spokes: 4 },
  archGap: 0.12, archSquare: 0.15,
  sill: [[0, 0.33], [0.01, 0.32], [0.03, 0.31], [0.06, 0.3], [0.1, 0.29], [0.3, 0.285], [0.5, 0.28], [0.7, 0.272], [0.8, 0.262], [0.88, 0.245], [0.93, 0.225], [0.96, 0.215], [0.98, 0.222], [0.99, 0.235], [1, 0.26]],
  // the tail climbing to the black lip under the tailgate glass, the belt falling gently forwards to the mirror, the
  // front quarter glass's foot rising to the windscreen base, then one smooth curve down the bonnet on the windscreen's
  // line, over the light bar and down the raked face to the headlamp pods (a stepped bonnet lip rippled the wings)
  top: [[0, 1.1], [0.008, 1.13], [0.016, 1.16], [0.024, 1.185], [0.03, 1.2], [0.05, 1.205], [0.1, 1.205], [0.2, 1.205], [0.28, 1.2], [0.35, 1.19], [0.42, 1.172], [0.48, 1.16], [0.52, 1.15], [0.58, 1.142], [0.62, 1.132], [0.66, 1.12], [0.7, 1.115], [0.74, 1.113], [0.78, 1.115], [0.805, 1.12], [0.82, 1.126], [0.835, 1.13], [0.845, 1.126], [0.86, 1.112], [0.875, 1.094], [0.89, 1.074], [0.905, 1.052], [0.92, 1.027], [0.932, 1.0], [0.942, 0.968], [0.952, 0.928], [0.962, 0.888], [0.972, 0.851], [0.982, 0.816], [0.991, 0.786], [1, 0.758]],
  // round in plan: both ends taper hard into the corners
  width: [[0, 0.86], [0.006, 0.9], [0.015, 0.93], [0.03, 0.955], [0.06, 0.975], [0.1, 0.99], [0.16, 1], [0.75, 1], [0.85, 0.99], [0.9, 0.977], [0.94, 0.958], [0.965, 0.938], [0.985, 0.912], [1, 0.885]],
  crown: 0.01,
  bulge: 0.04,
  haunch: 0.035,
  topRadius: 0.09,
  noseSweep: 0.14,
  tailSweep: 0.12,
  greenhouse: {
    u0: 0.03, u1: 0.835, tumble: 0.64, followBody: 0.12,
    // the raked tailgate glass under the roof spoiler, the long roof, the long raked screen
    top: [[0.03, 1.2], [0.04, 1.222], [0.06, 1.28], [0.08, 1.345], [0.1, 1.4], [0.11, 1.428], [0.115, 1.46], [0.12, 1.555], [0.13, 1.568], [0.14, 1.578], [0.16, 1.586], [0.18, 1.6], [0.2, 1.61], [0.22, 1.625], [0.24, 1.635], [0.28, 1.648], [0.32, 1.658], [0.36, 1.666], [0.4, 1.672], [0.44, 1.674], [0.47, 1.668], [0.5, 1.657], [0.52, 1.648], [0.54, 1.63], [0.56, 1.608], [0.58, 1.58], [0.6, 1.55], [0.62, 1.518], [0.64, 1.485], [0.66, 1.45], [0.68, 1.415], [0.7, 1.38], [0.72, 1.346], [0.74, 1.306], [0.76, 1.262], [0.78, 1.222], [0.8, 1.19], [0.82, 1.161], [0.835, 1.13]],
  },
  // the Essence's full glass roof reads black on every paint
  roof: { u0: 0.1218, u1: 0.5471, black: true },
  pillars: [
    // the black C-pillar between the rear door glass and the quarter glass, the black B-pillar
    { bottom: [0.268, 0.288], top: [0.27, 0.29], black: true },
    { bottom: [0.448, 0.478], top: [0.45, 0.478], black: true },
  ],
  doors: [[0.215, 0.212], [0.478, 0.48], [0.732, 0.725]],
  windowChrome: true,
  front: [
    // the full-width light bar under the bonnet lip: a dark band, the chrome bar between the DRL blades at its ends
    { step: 0.005, mat: 'gloss', depth: 0.004, poly: smooth(both([[0, 0.888], [0.5, 0.888], [0.66, 0.892], [0.75, 0.9], [0.758, 0.915], [0.75, 0.935], [0.6, 0.935], [0, 0.935]]), 1) },
    { step: 0.005, mat: 'chrome', layer: 1, depth: 0.008, poly: rrect(-0.52, 0.902, 0.52, 0.916, 0.005) },
    { step: 0.005, mat: 'drl', layer: 1, mirror: true, poly: [[0.5, 0.902], [0.66, 0.904], [0.742, 0.909], [0.742, 0.926], [0.66, 0.922], [0.5, 0.917]] },
    // the low headlamp pods: a dark rounded bowl, the projector lens on top, an LED line, the reflector below
    { step: 0.005, mat: 'trim', mirror: true, depth: 0.006, poly: smooth([[0.53, 0.53], [0.56, 0.495], [0.74, 0.495], [0.795, 0.52], [0.8, 0.6], [0.8, 0.71], [0.78, 0.738], [0.56, 0.742], [0.53, 0.72]], 1) },
    { step: 0.005, mat: 'drl', mirror: true, layer: 1, poly: band([[0.585, 0.64], [0.75, 0.64], [0.765, 0.655], [0.765, 0.695], [0.75, 0.71], [0.585, 0.71], [0.57, 0.695], [0.57, 0.655], [0.585, 0.64]], 0.012) },
    { step: 0.005, mat: 'head', mirror: true, layer: 2, depth: 0.012, poly: rrect(0.635, 0.66, 0.7, 0.69, 0.012) },
    { step: 0.005, mat: 'silver', mirror: true, layer: 1, depth: 0.004, poly: rrect(0.575, 0.607, 0.77, 0.619, 0.005) },
    { step: 0.005, mat: 'silver', mirror: true, layer: 1, depth: 0.006, poly: smooth([[0.555, 0.52], [0.76, 0.52], [0.782, 0.54], [0.782, 0.592], [0.555, 0.592]], 1) },
    // the diamond-mesh lower grille, its silver lip along the bottom
    { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.27], [0.56, 0.27], [0.6, 0.285], [0.64, 0.39], [0.63, 0.435], [0.58, 0.448], [0, 0.45]]), 1) },
    { step: 0.005, mat: 'mesh', layer: 1, poly: smooth(both([[0, 0.295], [0.53, 0.295], [0.57, 0.31], [0.6, 0.39], [0.59, 0.42], [0.55, 0.428], [0, 0.43]]), 1) },
    ...windsorDiamonds,
    { step: 0.005, mat: 'satin', layer: 2, depth: 0.01, poly: smooth(both([[0, 0.262], [0.6, 0.262], [0.68, 0.274], [0.685, 0.288], [0.6, 0.28], [0, 0.279]]), 1) },
  ],
  rear: [
    // the black lip along the tailgate under the glass
    { step: 0.004, mat: 'gloss', depth: 0.004, poly: smooth(both([[0, 1.12], [0.69, 1.12], [0.74, 1.13], [0.74, 1.18], [0.7, 1.186], [0, 1.188]]), 1) },
    // the tail lamps: smoked housings with an L-shaped red guide along the bottom and up the outer edge, two red bars inside
    { step: 0.004, mat: 'gloss', mirror: true, layer: 1, depth: 0.006, poly: smooth([[0.64, 0.95], [0.775, 0.95], [0.782, 0.975], [0.78, 1.1], [0.75, 1.112], [0.69, 1.09], [0.648, 1.0]], 1) },
    { step: 0.004, mat: 'tail', mirror: true, layer: 2, poly: [[0.64, 0.958], [0.768, 0.958], [0.774, 0.972], [0.774, 1.09], [0.758, 1.096], [0.758, 0.974], [0.645, 0.973]] },
    ...[1.015, 1.05].map((y): Decal => ({ step: 0.004, mat: 'tail', mirror: true, layer: 2, poly: [[0.675 + (y - 1.015) * 0.5, y], [0.745, y], [0.745, y + 0.013], [0.68 + (y - 1.015) * 0.5, y + 0.013]] })),
    // the connected light bar: a red line over a chrome strip
    { step: 0.004, mat: 'gloss', depth: 0.004, poly: rrect(-0.66, 0.942, 0.66, 0.975, 0.006) },
    { step: 0.004, mat: 'tail', layer: 1, poly: [[-0.66, 0.958], [0.66, 0.958], [0.66, 0.971], [-0.66, 0.971]] },
    { step: 0.004, mat: 'chrome', layer: 1, depth: 0.008, poly: rrect(-0.645, 0.944, 0.645, 0.956, 0.004) },
    // the black lower bumper, red reflectors at its corners, the chrome strip along its top
    { step: 0.004, mat: 'trim', poly: smooth(both([[0, 0.335], [0.66, 0.335], [0.74, 0.36], [0.775, 0.41], [0.7, 0.44], [0, 0.445]]), 1) },
    { step: 0.004, mat: 'reflector', mirror: true, layer: 1, poly: [[0.66, 0.39], [0.69, 0.39], [0.745, 0.455], [0.725, 0.47]] },
    { step: 0.004, mat: 'chrome', layer: 1, depth: 0.008, poly: rrect(-0.56, 0.445, 0.56, 0.459, 0.005) },
  ],
  side: [
    // the tail lamp's wrap onto the flank: a wedge pointing forwards, its red guide along the lower edge
    { step: 0.004, mat: 'gloss', depth: 0.004, poly: smooth([[0.005, 0.95], [0.03, 0.955], [0.05, 0.99], [0.07, 1.04], [0.092, 1.085], [0.088, 1.1], [0.005, 1.1]], 1) },
    { step: 0.004, mat: 'tail', layer: 1, poly: [[0.005, 0.958], [0.028, 0.962], [0.048, 0.996], [0.068, 1.045], [0.086, 1.085], [0.075, 1.085], [0.058, 1.05], [0.04, 1.005], [0.022, 0.975], [0.005, 0.973]] },
    // the rear side marker
    { step: 0.004, mat: 'silver', depth: 0.004, poly: windsorU(0.04, 0.595, 0.06, 0.612, 0.006) },
    // flush door handles
    { step: 0.004, mat: 'chrome', depth: 0.006, poly: windsorU(0.505, 0.93, 0.55, 0.948, 0.008) },
    { step: 0.004, mat: 'chrome', depth: 0.006, poly: windsorU(0.233, 0.965, 0.278, 0.983, 0.008) },
    // chrome strips low on the doors, the silver blade along the side skirt
    { step: 0.004, mat: 'chrome', depth: 0.004, poly: windsorU(0.3, 0.572, 0.452, 0.594, 0.008) },
    { step: 0.004, mat: 'chrome', depth: 0.004, poly: windsorU(0.462, 0.572, 0.48, 0.594, 0.006) },
    { step: 0.004, mat: 'satin', depth: 0.004, poly: smooth([[0.33, 0.283], [0.67, 0.283], [0.68, 0.296], [0.66, 0.303], [0.34, 0.303], [0.325, 0.296]], 1) },
  ],
  plates: { front: 0.525, rear: 0.64 },
  mirrors: 'body',
  mirrorU: 0.735,
  paint: '#05070a', // Starry Black (the gallery car), kept very dark for the studio lights
  plate: 'MH 12 WE 2026',
}

const CITY_L = 4.594
/** the side photo reads 1.7 % tall (close camera): its heights are scaled down by this */
const CITY_K = 0.983
const cityK = (pts: P2[]): P2[] => pts.map(([u, y]) => [u, +(y * CITY_K).toFixed(4)] as P2)
/** a side outline from a rounded rectangle given in u (0…1) and metres */
const cityU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  rrectS(u0 * CITY_L, y0, u1 * CITY_L, y1, r).map(([x, y]) => [+(x / CITY_L).toFixed(5), y] as P2)
/** the honeycomb: rows of small dark cells, every other row offset half a cell, inside a half-width hw(y) */
const cityHoney = (ys: number[], hw: (y: number) => number, mat: Decal['mat'], layer: number, skip?: (z: number, y: number) => boolean): Decal[] =>
  ys.flatMap((y, row) => {
    const out: Decal[] = []
    for (let k = -12; k <= 12; k++) {
      const zc = k * 0.07 + (row % 2) * 0.035
      if (Math.abs(zc) + 0.03 > Math.min(hw(y), hw(y + 0.022)) - 0.01) continue
      if (skip?.(zc, y)) continue
      out.push({ step: 0.004, mat, layer, depth: 0.01, poly: [[zc - 0.03, y + 0.011], [zc - 0.018, y], [zc + 0.018, y], [zc + 0.03, y + 0.011], [zc + 0.018, y + 0.022], [zc - 0.018, y + 0.022]] })
    }
    return out
  })
const cityUpperHW = (y: number) => 0.66 - Math.max(0, 0.7 - y) * 1.2
const cityLowerHW = (y: number) => 0.5 + (y - 0.33) * 0.35

/** Honda City (2026 "New City" facelift of the 5th gen). 4594 × 1748 × 1489, wheelbase 2600, 185/55 R16 (top trim).
 *  Side profile from a levelled gallery side photo (1.514 m, axles 3 % apart: heights × 0.983, axles at the official
 *  wheelbase with the overhangs split as in the photo). Belt, glass, shut lines and handles read off a metric grid of the
 *  cut-out; the full-width light bar, slim headlamps, honeycomb grilles and corner vents from a straight front photo and
 *  the white studio render; the Z tail lamps and the black diffuser from a straight rear photo. */
export const CITY_X: CarSpec = {
  id: 'honda-city',
  name: 'Honda City',
  rakedEnds: true,
  dropSlivers: true,
  L: CITY_L, W: 1.748, H: 1.489,
  axles: [0.2217, 0.7877],
  tyreR: 0.305, tyreW: 0.185, rim: 0.666, wheel: { style: 'split', spokes: 5 }, rimTone: 'dark',
  archGap: 0.06, archSquare: 0.12,
  sill: cityK([[0, 0.29], [0.006, 0.3], [0.015, 0.31], [0.03, 0.32], [0.05, 0.322], [0.08, 0.31], [0.11, 0.29], [0.15, 0.275], [0.3, 0.268], [0.5, 0.272], [0.65, 0.268], [0.72, 0.262], [0.85, 0.225], [0.9, 0.215], [0.94, 0.21], [0.97, 0.222], [0.985, 0.23], [0.995, 0.24], [1, 0.26]]),
  // the boot: lamp tops at the tail face, the ducktail lip and the flat boot lid; the belt under the glass rising to the
  // C-pillar; the bonnet falling to the nose
  top: cityK([[0, 1.03], [0.004, 1.075], [0.01, 1.105], [0.02, 1.124], [0.03, 1.13], [0.05, 1.128], [0.07, 1.134], [0.09, 1.145], [0.1, 1.152], [0.13, 1.135], [0.17, 1.115], [0.22, 1.1], [0.3, 1.096], [0.4, 1.088], [0.5, 1.072], [0.6, 1.056], [0.68, 1.05], [0.72, 1.05], [0.745, 1.055], [0.76, 1.05], [0.78, 1.03], [0.8, 1.005], [0.82, 0.988], [0.84, 0.974], [0.86, 0.958], [0.88, 0.94], [0.9, 0.923], [0.92, 0.902], [0.94, 0.88], [0.95, 0.868], [0.96, 0.866], [0.97, 0.863], [0.98, 0.86], [0.99, 0.857], [1, 0.854]]),
  // round in plan: both ends taper into the corners
  width: [[0, 0.92], [0.005, 0.935], [0.015, 0.955], [0.035, 0.972], [0.07, 0.985], [0.13, 0.997], [0.2, 1], [0.45, 0.99], [0.8, 0.997], [0.86, 0.99], [0.92, 0.968], [0.955, 0.94], [0.975, 0.91], [0.99, 0.875], [1, 0.84]],
  crown: 0.02,
  bulge: 0.04,
  haunch: 0.05,
  topRadius: 0.08,
  noseSweep: 0.25,
  tailSweep: 0.2,
  greenhouse: {
    u0: 0.1, u1: 0.745, tumble: 0.62,
    // the long rear glass rising off the boot lid, the domed roof (shark-fin left out), the raked windscreen
    top: cityK([[0.1, 1.153], [0.11, 1.17], [0.12, 1.186], [0.14, 1.23], [0.16, 1.268], [0.18, 1.306], [0.2, 1.339], [0.22, 1.377], [0.24, 1.41], [0.26, 1.442], [0.28, 1.464], [0.3, 1.48], [0.32, 1.49], [0.35, 1.5], [0.38, 1.507], [0.41, 1.51], [0.44, 1.509], [0.47, 1.504], [0.5, 1.497], [0.52, 1.487], [0.54, 1.474], [0.56, 1.46], [0.58, 1.433], [0.6, 1.399], [0.62, 1.364], [0.64, 1.328], [0.66, 1.282], [0.68, 1.237], [0.7, 1.191], [0.72, 1.132], [0.745, 1.06]]),
  },
  roof: { u0: 0.2826, u1: 0.5559, black: false },
  pillars: [
    // body-coloured C-pillar behind the small quarter glass; black quarter-glass divider and B-pillar
    { bottom: [0.1, 0.218], top: [0.2, 0.3], black: false },
    { bottom: [0.279, 0.287], top: [0.283, 0.291], black: true },
    { bottom: [0.425, 0.458], top: [0.428, 0.456], black: true },
  ],
  doors: [[0.3, 0.224], [0.466, 0.456], [0.712, 0.712]],
  windowChrome: true,
  front: [
    // the full-width light bar under the bonnet lip, running into the slim headlamps
    { step: 0.004, mat: 'drl', layer: 2, poly: rrect(-0.43, 0.762, 0.43, 0.776, 0.006) },
    // slim headlamps: a dark housing rising to the corners, the LED strip along its lower edge, a small projector
    { step: 0.004, mat: 'trim', mirror: true, depth: 0.004, poly: smooth([[0.41, 0.756], [0.5, 0.758], [0.6, 0.766], [0.65, 0.772], [0.685, 0.78], [0.695, 0.79], [0.695, 0.82], [0.685, 0.828], [0.62, 0.818], [0.52, 0.795], [0.42, 0.782]], 1) },
    { step: 0.004, mat: 'drl', mirror: true, layer: 1, poly: [[0.44, 0.762], [0.52, 0.764], [0.6, 0.771], [0.65, 0.777], [0.69, 0.786], [0.69, 0.8], [0.65, 0.791], [0.6, 0.785], [0.52, 0.778], [0.44, 0.776]] },
    { step: 0.004, mat: 'head', mirror: true, layer: 1, depth: 0.008, poly: rrect(0.62, 0.795, 0.665, 0.815, 0.008) },
    // the black honeycomb band under the bar, narrowing to the lamps' lower corners
    { step: 0.004, mat: 'gloss', poly: smooth(both([[0, 0.665], [0.45, 0.67], [0.56, 0.69], [0.64, 0.72], [0.67, 0.745], [0.64, 0.758], [0.5, 0.756], [0.42, 0.755], [0, 0.755]]), 1) },
    ...cityHoney([0.678, 0.705, 0.732], cityUpperHW, 'trim', 1),
    // the lower intake: a wide black trapezoid of honeycomb with a satin lip under it, the plate on its top
    { step: 0.004, mat: 'gloss', poly: smooth(both([[0, 0.33], [0.5, 0.33], [0.56, 0.36], [0.6, 0.47], [0.64, 0.49], [0.66, 0.5], [0.6, 0.505], [0, 0.505]]), 1) },
    ...cityHoney([0.345, 0.375, 0.405, 0.435, 0.465], cityLowerHW, 'trim', 1, (z, y) => Math.abs(z) < 0.27 && y > 0.43),
    { step: 0.004, mat: 'satin', layer: 1, depth: 0.008, poly: rrect(-0.54, 0.312, 0.54, 0.328, 0.006) },
    // the tall black vents at the bumper corners (apex up)
    { step: 0.004, mat: 'gloss', mirror: true, depth: 0.008, poly: [[0.64, 0.42], [0.705, 0.42], [0.708, 0.62], [0.695, 0.625], [0.665, 0.5]] },
  ],
  rear: [
    // Z tail lamps: smoked housings (outer part on the wing, inner part on the boot lid), the red guide along the lower
    // edge rising to the outer top, a clear reversing lamp
    { step: 0.004, mat: 'trim', mirror: true, layer: 1, depth: 0.004, poly: smooth([[0.4, 0.905], [0.55, 0.895], [0.68, 0.875], [0.78, 0.86], [0.795, 0.875], [0.795, 0.995], [0.775, 1.008], [0.62, 0.985], [0.5, 0.97], [0.4, 0.962]], 1) },
    { step: 0.004, mat: 'tail', mirror: true, layer: 2, poly: [[0.42, 0.91], [0.55, 0.902], [0.68, 0.883], [0.765, 0.871], [0.785, 0.88], [0.785, 0.99], [0.772, 0.99], [0.772, 0.89], [0.68, 0.897], [0.55, 0.916], [0.42, 0.924]] },
    { step: 0.004, mat: 'silver', mirror: true, layer: 2, depth: 0.006, poly: rrect(0.5, 0.93, 0.6, 0.955, 0.008) },
    // the chrome line joining the lamps along the top of the plate recess
    { step: 0.004, mat: 'chrome', layer: 1, depth: 0.006, poly: rrect(-0.43, 0.893, 0.43, 0.906, 0.005) },
    // the boot lid's shut line round the plate recess
    { step: 0.004, mat: 'gloss', depth: 0.001, poly: band([[-0.6, 0.89], [-0.59, 0.75], [-0.56, 0.69], [-0.48, 0.655], [0, 0.65], [0.48, 0.655], [0.56, 0.69], [0.59, 0.75], [0.6, 0.89]], 0.012) },
    // red reflectors in black slots at the bumper corners
    { step: 0.004, mat: 'gloss', mirror: true, poly: rrect(0.735, 0.34, 0.775, 0.52, 0.01) },
    { step: 0.004, mat: 'tail', mirror: true, layer: 1, depth: 0.004, poly: rrect(0.745, 0.355, 0.765, 0.505, 0.006) },
    // the black lower bumper with its honeycomb diffuser
    { step: 0.004, mat: 'trim', poly: smooth(both([[0, 0.31], [0.66, 0.31], [0.71, 0.33], [0.72, 0.36], [0.62, 0.43], [0, 0.43]]), 1) },
    { step: 0.004, mat: 'mesh', layer: 1, poly: smooth(both([[0, 0.335], [0.56, 0.335], [0.6, 0.35], [0.54, 0.41], [0, 0.41]]), 1) },
  ],
  side: [
    // body-coloured door handles (the relief gives them a dark rim)
    { step: 0.004, mat: 'body', depth: 0.01, poly: cityU(0.47, 0.875, 0.52, 0.903, 0.012) },
    { step: 0.004, mat: 'body', depth: 0.01, poly: cityU(0.246, 0.89, 0.296, 0.918, 0.012) },
    // the headlamp sweeping back along the wing to a point
    { step: 0.004, mat: 'trim', depth: 0.004, poly: [[0.999, 0.758], [0.999, 0.82], [0.975, 0.83], [0.945, 0.842], [0.915, 0.853], [0.892, 0.86], [0.91, 0.84], [0.94, 0.81], [0.965, 0.783], [0.985, 0.762]] },
    { step: 0.004, mat: 'drl', layer: 1, poly: [[0.999, 0.762], [0.999, 0.776], [0.98, 0.78], [0.955, 0.797], [0.93, 0.818], [0.905, 0.845], [0.912, 0.828], [0.94, 0.802], [0.965, 0.781], [0.985, 0.765]] },
    // the tail lamp wrapping onto the flank to a point, its red guide along the top
    { step: 0.004, mat: 'trim', depth: 0.004, poly: [[0.005, 0.85], [0.005, 0.995], [0.04, 1.01], [0.08, 1.02], [0.105, 1.025], [0.07, 0.96], [0.035, 0.885]] },
    { step: 0.004, mat: 'tail', layer: 1, poly: [[0.005, 0.975], [0.04, 0.99], [0.08, 1.0], [0.1, 1.012], [0.08, 1.012], [0.04, 1.002], [0.005, 0.988]] },
  ],
  plates: { front: 0.535, rear: 0.74 },
  mirrors: 'body',
  paint: '#08307a', // Obsidian Blue Pearl, darkened for the studio lights
  plate: 'MH 12 HC 2026',
}

const SYROS_L = 3.995
// the side photo's axles (u 0.1623 / 0.8223) sit 3.5 % too far apart (close studio camera): everything traced off it is
// mapped piecewise-linearly so its axles land on the official wheelbase, the overhangs split as in the photo
const syrosU = (u: number): number => {
  const pa = [0, 0.1623, 0.8223, 1], ma = [0, 0.1727, 0.811, 1]
  for (let i = 0; i < 3; i++) if (u <= pa[i + 1] || i === 2) return +(ma[i] + ((u - pa[i]) * (ma[i + 1] - ma[i])) / (pa[i + 1] - pa[i])).toFixed(5)
  return u
}
const syrosP = (pts: P2[]): P2[] => pts.map(([u, y]) => [syrosU(u), y] as P2)
/** a side outline from a rounded rectangle given in photo u and metres */
const syrosRectU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  syrosP(rrectS(u0 * SYROS_L, y0, u1 * SYROS_L, y1, r).map(([x, y]) => [x / SYROS_L, y] as P2))
const SYROS_GH: [number, number] = [syrosU(0.014), syrosU(0.762)]
/** the glasshouse station nearest u (roof paint edges must sit on one) */
const syrosStation = (u: number): number => {
  const [a, b] = SYROS_GH
  let best = a
  for (let i = 0; i <= 140; i++) { const s = a + (b - a) * (0.5 - 0.5 * Math.cos((Math.PI * i) / 140)); if (Math.abs(s - u) < Math.abs(best - u)) best = s }
  return +best.toFixed(5)
}

/** Kia Syros (2025, petrol/diesel). 3995 × 1805 × 1680 (with roof rails), wheelbase 2550, 215/55 R17 (HTX+).
 *  Side profile from the maker's 360° studio frame at 90° (Frost Blue), squeezed 2.6 % to the official height and its
 *  axles mapped onto the official wheelbase. The tall boxy body: a flat upright face with the stacked headlamps and tall
 *  DRL bars on chamfered corners, square black arch cladding, the belt kicking up into a body-coloured quarter, dark
 *  glass wrapping the tail with L-shaped lamps up the D-pillars, and the black bumpers with body-coloured L-frames.
 *  Lamps, grilles and bumpers from the straight front and rear frames. */
export const SYROS: CarSpec = {
  id: 'kia-syros',
  name: 'Kia Syros',
  dropSlivers: true,
  L: SYROS_L, W: 1.805, H: 1.68,
  axles: [0.1727, 0.811],
  tyreR: 0.334, tyreW: 0.215, rim: 0.646, wheel: { style: 'split', spokes: 5 }, rimTone: 'dark',
  archGap: 0.06, archSquare: 0.4,
  sill: syrosP([[0, 0.25], [0.004, 0.27], [0.012, 0.31], [0.02, 0.335], [0.03, 0.338], [0.06, 0.33], [0.1, 0.3], [0.15, 0.27], [0.3, 0.265], [0.7, 0.265], [0.85, 0.262], [0.92, 0.262], [0.95, 0.272], [0.975, 0.27], [0.99, 0.255], [0.997, 0.245], [1, 0.24]]),
  // the flat tail up to the lamp line, the quarter kicking up behind the rear door, the long level belt, the bonnet
  // falling gently to a flat upright face
  top: syrosP([[0, 1.185], [0.014, 1.19], [0.04, 1.19], [0.05, 1.225], [0.06, 1.262], [0.07, 1.274], [0.13, 1.275], [0.15, 1.262], [0.17, 1.215], [0.19, 1.155], [0.21, 1.122], [0.25, 1.11], [0.45, 1.108], [0.7, 1.108], [0.73, 1.125], [0.762, 1.145], [0.78, 1.135], [0.8, 1.125], [0.85, 1.105], [0.9, 1.075], [0.93, 1.045], [0.95, 1.01], [0.96, 0.985], [0.97, 0.968], [0.98, 0.958], [0.99, 0.953], [1, 0.95]]),
  // boxy: the flat face and tail run nearly the full width, with tight corners
  width: [[0, 0.95], [0.006, 0.97], [0.015, 0.985], [0.03, 0.995], [0.06, 1], [0.88, 1], [0.93, 0.998], [0.96, 0.993], [0.975, 0.988], [0.99, 0.976], [1, 0.96]],
  crown: 0.012,
  bulge: 0.02,
  haunch: 0.03,
  topRadius: 0.08,
  noseSweep: 0.1,
  tailSweep: 0.1,
  greenhouse: {
    u0: SYROS_GH[0], u1: SYROS_GH[1], tumble: 0.8,
    // dark glass wrapping round the tail under the roof's spoiler lip, the long flat roof, the upright windscreen
    top: syrosP([[0.014, 1.19], [0.02, 1.215], [0.028, 1.3], [0.035, 1.42], [0.04, 1.52], [0.05, 1.556], [0.06, 1.572], [0.08, 1.59], [0.1, 1.602], [0.14, 1.612], [0.3, 1.62], [0.5, 1.62], [0.55, 1.615], [0.58, 1.602], [0.6, 1.585], [0.62, 1.56], [0.65, 1.49], [0.7, 1.345], [0.72, 1.28], [0.74, 1.218], [0.75, 1.188], [0.762, 1.145]]),
  },
  roof: { u0: syrosStation(syrosU(0.05)), u1: syrosStation(syrosU(0.6)), black: false },
  pillars: [
    // the body-coloured B-pillar, the black divider at the rear door glass
    { bottom: [syrosU(0.4), syrosU(0.452)], top: [syrosU(0.4), syrosU(0.452)], black: false },
    { bottom: [syrosU(0.248), syrosU(0.257)], top: [syrosU(0.248), syrosU(0.257)], black: true },
  ],
  // square black arch cladding (front reaching up round the headlamps), the black rocker along the doors,
  // the black bumpers
  cladding: {
    top: syrosP([[0, 0.68], [0.008, 0.7], [0.016, 0.84], [0.06, 0.845], [0.1, 0.836], [0.2, 0.836], [0.23, 0.82], [0.25, 0.79], [0.262, 0.75], [0.27, 0.69], [0.275, 0.6], [0.28, 0.49], [0.69, 0.49], [0.698, 0.6], [0.706, 0.67], [0.72, 0.725], [0.74, 0.795], [0.76, 0.83], [0.78, 0.84], [0.86, 0.836], [0.92, 0.84], [0.94, 0.87], [0.955, 0.9], [0.978, 0.9], [0.988, 0.6], [1, 0.52]]),
    flare: 0.1, cut: true,
  },
  doors: [[syrosU(0.712), syrosU(0.706)], [syrosU(0.434), syrosU(0.434)], [syrosU(0.168), syrosU(0.182)]],
  front: [
    // the slim black strip under the bonnet lip, its ends kinking up
    { step: 0.004, mat: 'gloss', depth: 0.004, poly: both([[0, 0.925], [0.6, 0.925], [0.66, 0.935], [0.7, 0.945], [0.7, 0.948], [0.655, 0.944], [0.6, 0.94], [0, 0.94]]) },
    // the black lower face: the upper grille slot, dropping to the corners under the headlamps
    { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.26], [0.74, 0.26], [0.785, 0.29], [0.79, 0.5], [0.74, 0.535], [0.5, 0.71], [0.47, 0.73], [0, 0.73]]), 1) },
    { step: 0.005, mat: 'gloss', layer: 1, depth: 0.004, poly: smooth(both([[0, 0.606], [0.45, 0.606], [0.473, 0.625], [0.473, 0.7], [0.455, 0.716], [0, 0.716]]), 1) },
    ...[0.632, 0.66, 0.688].map((y): Decal => ({ step: 0.004, mat: 'trim', layer: 2, depth: 0.008, poly: rrect(-0.44, y - 0.006, 0.44, y + 0.006, 0.004) })),
    // the lower grille with two rows of bars
    { step: 0.005, mat: 'gloss', layer: 1, depth: 0.004, poly: smooth(both([[0, 0.33], [0.5, 0.33], [0.52, 0.35], [0.52, 0.47], [0.5, 0.484], [0, 0.484]]), 1) },
    ...[0.372, 0.41, 0.448].map((y): Decal => ({ step: 0.004, mat: 'trim', layer: 2, depth: 0.008, poly: rrect(-0.49, y - 0.006, 0.49, y + 0.006, 0.004) })),
    // body-coloured wedge frames round the corner intakes: the dark pocket, the LED strip at its foot
    { step: 0.004, mat: 'body', layer: 1, mirror: true, depth: 0.01, poly: smooth([[0.533, 0.55], [0.62, 0.55], [0.775, 0.37], [0.775, 0.32], [0.755, 0.3], [0.55, 0.3], [0.533, 0.315]], 1) },
    { step: 0.004, mat: 'gloss', layer: 2, mirror: true, depth: 0.012, poly: smooth([[0.597, 0.52], [0.615, 0.52], [0.752, 0.36], [0.752, 0.33], [0.597, 0.33]], 1) },
    { step: 0.004, mat: 'drl', layer: 3, mirror: true, depth: 0.014, poly: rrect(0.62, 0.334, 0.742, 0.356, 0.006) },
    // stacked headlamps: three cubes in a dark housing, the tall DRL bar down its outer edge
    { step: 0.004, mat: 'trim', layer: 1, mirror: true, depth: 0.006, poly: smooth([[0.7, 0.905], [0.838, 0.905], [0.838, 0.5], [0.775, 0.5], [0.722, 0.56], [0.7, 0.66], [0.693, 0.8]], 1) },
    ...[0.78, 0.686, 0.596].map((y): Decal => ({ step: 0.004, mat: 'head', layer: 2, mirror: true, depth: 0.01, poly: rrect(0.72, y - 0.027, 0.798, y + 0.027, 0.008) })),
    { step: 0.004, mat: 'drl', layer: 3, mirror: true, depth: 0.012, poly: [[0.81, 0.535], [0.828, 0.535], [0.828, 0.89], [0.785, 0.89], [0.785, 0.874], [0.81, 0.874]] },
  ],
  rear: [
    // the black strip at the foot of the tailgate glass with the lamps' red feet
    { step: 0.004, mat: 'gloss', depth: 0.004, poly: both([[0, 1.14], [0.7, 1.14], [0.72, 1.16], [0.72, 1.185], [0, 1.185]]) },
    { step: 0.004, mat: 'tail', layer: 1, mirror: true, poly: [[0.47, 1.152], [0.705, 1.152], [0.705, 1.168], [0.47, 1.168]] },
    // the tailgate's shut line
    { step: 0.005, mat: 'gloss', depth: 0.001, poly: band([[-0.69, 1.14], [-0.69, 0.78], [-0.67, 0.73], [-0.62, 0.7], [-0.55, 0.69], [0.55, 0.69], [0.62, 0.7], [0.67, 0.73], [0.69, 0.78], [0.69, 1.14]], 0.012) },
    // the black bumper, the lamp pods at its corners
    { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.3], [0.8, 0.3], [0.845, 0.34], [0.85, 0.86], [0.75, 0.86], [0.745, 0.7], [0.72, 0.675], [0, 0.675]]), 1) },
    // the lower tail lamps: red bars over a dark lens, the reversing lamp
    { step: 0.004, mat: 'gloss', layer: 1, mirror: true, depth: 0.006, poly: rrect(0.76, 0.55, 0.85, 0.84, 0.012) },
    ...[0.668, 0.696, 0.724, 0.752, 0.78].map((y): Decal => ({ step: 0.004, mat: 'tail', layer: 2, mirror: true, depth: 0.01, poly: rrect(0.775, y - 0.007, 0.835, y + 0.007, 0.003) })),
    { step: 0.004, mat: 'silver', layer: 2, mirror: true, depth: 0.01, poly: rrect(0.785, 0.565, 0.83, 0.625, 0.006) },
    // body-coloured wedge frames with a dark pocket, the plate recess
    { step: 0.004, mat: 'body', layer: 1, mirror: true, depth: 0.01, poly: smooth([[0.48, 0.585], [0.62, 0.585], [0.765, 0.41], [0.765, 0.37], [0.745, 0.355], [0.58, 0.32], [0.48, 0.32]], 1) },
    { step: 0.004, mat: 'gloss', layer: 2, mirror: true, depth: 0.012, poly: smooth([[0.545, 0.55], [0.605, 0.55], [0.728, 0.4], [0.728, 0.375], [0.585, 0.348], [0.545, 0.348]], 1) },
    { step: 0.005, mat: 'gloss', layer: 1, depth: 0.004, poly: smooth(both([[0, 0.47], [0.36, 0.47], [0.37, 0.64], [0, 0.64]]), 1) },
  ],
  side: [
    // the L-lamp running up the D-pillar's edge
    { step: 0.004, mat: 'tail', poly: syrosP([[0.034, 1.17], [0.042, 1.17], [0.063, 1.5], [0.056, 1.5]]) },
    // the lower tail lamp on the bumper corner
    { step: 0.004, mat: 'trim', depth: 0.004, poly: syrosP([[0.002, 0.58], [0.026, 0.58], [0.028, 0.86], [0.002, 0.86]]) },
    ...[0.668, 0.696, 0.724, 0.752, 0.78].map((y): Decal => ({ step: 0.004, mat: 'tail', layer: 1, poly: syrosRectU(0.004, y - 0.007, 0.02, y + 0.007, 0.003) })),
    // the body-coloured insert on the black side skirt
    { step: 0.004, mat: 'body', depth: 0.006, poly: syrosP(smooth([[0.31, 0.395], [0.33, 0.42], [0.66, 0.42], [0.685, 0.4], [0.68, 0.335], [0.32, 0.335]], 1)) },
    // flush door handles
    ...[[0.459, 0.513], [0.202, 0.261]].flatMap(([a, b]): Decal[] => [
      { step: 0.004, mat: 'gloss', depth: 0.002, poly: syrosRectU(a, 0.927, b, 0.957, 0.012) },
      { step: 0.004, mat: 'body', layer: 1, depth: 0.004, poly: syrosRectU(a + 0.002, 0.933, b - 0.002, 0.951, 0.008) },
    ]),
  ],
  plates: { front: 0.535, rear: 0.571 },
  rails: 'black',
  mirrors: 'black',
  paint: '#42697e', // Frost Blue, darkened for the studio lights
  plate: 'MH 12 SY 2026',
}

const ALCAZAR_L = 4.56
/** a chrome grille bar at height y from z0 to z1 (both sides) */
const alcazarBar = (y: number, z0: number, z1: number): Decal => ({
  step: 0.005, mat: 'chrome', layer: 2, depth: 0.012, mirror: true,
  poly: [[z0, y], [z1, y], [z1 + 0.006, y + 0.007], [z1, y + 0.014], [z0, y + 0.014]],
})

/** Hyundai Alcazar (Sept 2024 facelift). 4560 × 1800 × 1710 (with roof rails), wheelbase 2760, 215/55 R18.
 *  Side profile from the gallery's levelled side photo (tyres in grass patched; it read 1.78 m tall with the axles 2.9 %
 *  apart from the close camera, so heights are × 0.965 — which also gives the official tyre size — and the axles sit at
 *  the official wheelbase). Belt, cladding, shut lines and lamps read off a pixel grid of the cut-out; the light bar,
 *  quad headlamps, grille, connected tail bar and the skid plates from the straight front / rear photos and close-ups. */
export const ALCAZAR: CarSpec = {
  id: 'hyundai-alcazar',
  name: 'Hyundai Alcazar',
  dropSlivers: true,
  L: ALCAZAR_L, W: 1.8, H: 1.71,
  axles: [0.2027, 0.808],
  tyreR: 0.347, tyreW: 0.215, rim: 0.659, wheel: { style: 'swirl', spokes: 5 }, rimTone: 'dark',
  archGap: 0.05, archSquare: 0.4,
  sill: [[0, 0.31], [0.01, 0.33], [0.02, 0.35], [0.04, 0.345], [0.07, 0.325], [0.1, 0.3], [0.2, 0.27], [0.3, 0.262], [0.45, 0.283], [0.6, 0.285], [0.7, 0.275], [0.8, 0.25], [0.9, 0.22], [0.95, 0.24], [0.97, 0.27], [0.99, 0.29], [1, 0.3]],
  // upright tail up to the lamps, the belt rising gently along the doors and kicking up under the big quarter glass,
  // then the long bonnet with an upright face up to the light bar
  top: [[0, 1.17], [0.006, 1.18], [0.015, 1.198], [0.025, 1.218], [0.032, 1.229], [0.045, 1.234], [0.06, 1.235], [0.12, 1.237], [0.2, 1.24], [0.228, 1.241], [0.25, 1.232], [0.277, 1.219], [0.3, 1.208], [0.375, 1.182], [0.472, 1.163], [0.584, 1.147], [0.66, 1.141], [0.741, 1.137], [0.76, 1.132], [0.8, 1.12], [0.85, 1.093], [0.9, 1.062], [0.94, 1.032], [0.96, 1.015], [0.975, 1.01], [0.99, 1.007], [1, 1.004]],
  width: [[0, 0.93], [0.008, 0.95], [0.025, 0.965], [0.06, 0.985], [0.12, 0.995], [0.5, 1], [0.88, 0.995], [0.93, 0.98], [0.965, 0.955], [0.985, 0.915], [1, 0.88]],
  crown: 0.02,
  topRadius: 0.09,
  bulge: 0.01,
  shoulder: { y: [[0, 0.98], [0.3, 0.95], [0.7, 0.92], [1, 0.93]], inset: 0.03 },
  haunch: 0.025,
  bonnetRidge: 0.01,
  noseSweep: 0.15,
  tailSweep: 0.1,
  greenhouse: {
    u0: 0.03, u1: 0.741, tumble: 0.75,
    top: [[0.03, 1.21], [0.04, 1.28], [0.05, 1.35], [0.06, 1.41], [0.07, 1.465], [0.08, 1.535], [0.09, 1.585], [0.1, 1.593], [0.128, 1.61], [0.2, 1.635], [0.3, 1.648], [0.4, 1.65], [0.5, 1.646], [0.535, 1.635], [0.55, 1.612], [0.56, 1.595], [0.57, 1.576], [0.58, 1.542], [0.6, 1.5], [0.62, 1.447], [0.64, 1.398], [0.66, 1.362], [0.68, 1.314], [0.7, 1.261], [0.72, 1.206], [0.741, 1.14]],
  },
  roof: { u0: 0.0888, u1: 0.5469, black: false },
  pillars: [
    { bottom: [0.444, 0.469], top: [0.444, 0.469], black: true },
    { bottom: [0.722, 0.741], top: [0.539, 0.556], black: true },
  ],
  cladding: { top: [[0, 0.73], [0.05, 0.72], [0.09, 0.66], [0.13, 0.47], [0.3, 0.456], [0.6, 0.456], [0.7, 0.456], [0.86, 0.5], [0.92, 0.58], [0.96, 0.6], [1, 0.6]], flare: 0.13, cut: true },
  doors: [[0.7145, 0.717], [0.4666, 0.469], [0.2549, 0.2131]],
  front: [
    // gloss band under the bonnet lip: thin centre light bar, the stacked LED corner lamps (the "H" ends)
    { step: 0.005, mat: 'gloss', poly: smooth([[-0.745, 0.881], [0.745, 0.881], [0.745, 0.956], [0.73, 0.962], [-0.73, 0.962], [-0.745, 0.956]], 1) },
    { step: 0.005, mat: 'drl', layer: 1, poly: [[-0.44, 0.922], [0.44, 0.922], [0.44, 0.936], [-0.44, 0.936]] },
    { step: 0.005, mat: 'drl', layer: 1, mirror: true, poly: [[0.46, 0.942], [0.715, 0.942], [0.715, 0.954], [0.46, 0.954]] },
    { step: 0.005, mat: 'drl', layer: 1, mirror: true, poly: [[0.5, 0.918], [0.725, 0.918], [0.725, 0.93], [0.5, 0.93]] },
    { step: 0.005, mat: 'drl', layer: 1, mirror: true, poly: [[0.46, 0.893], [0.725, 0.893], [0.725, 0.905], [0.46, 0.905]] },
    // the wide dark grille with chrome bars at its sides, quad-LED headlamps in black pods at the corners
    { step: 0.005, mat: 'trim', poly: smooth([[-0.76, 0.58], [0.76, 0.58], [0.765, 0.835], [-0.765, 0.835]], 1) },
    { step: 0.005, mat: 'mesh', layer: 1, poly: [[-0.45, 0.6], [0.45, 0.6], [0.45, 0.815], [-0.45, 0.815]] },
    alcazarBar(0.79, 0.46, 0.6),
    alcazarBar(0.722, 0.46, 0.6),
    alcazarBar(0.652, 0.46, 0.6),
    { step: 0.005, mat: 'head', layer: 1, mirror: true, poly: rrect(0.635, 0.715, 0.745, 0.795, 0.01) },
    { step: 0.005, mat: 'head', layer: 1, mirror: true, poly: rrect(0.635, 0.632, 0.745, 0.705, 0.01) },
    // black lower bumper, the big silver skid plate with the dark lower grille in it
    { step: 0.005, mat: 'trim', poly: [[-0.76, 0.3], [0.76, 0.3], [0.76, 0.58], [-0.76, 0.58]] },
    { step: 0.005, mat: 'satin', layer: 1, poly: smooth([[-0.74, 0.35], [0.74, 0.35], [0.745, 0.6], [0.66, 0.612], [-0.66, 0.612], [-0.745, 0.6]], 2) },
    { step: 0.005, mat: 'gloss', layer: 2, depth: 0.012, poly: rrect(-0.63, 0.4, 0.63, 0.535, 0.03) },
    { step: 0.005, mat: 'mesh', layer: 3, depth: 0.014, poly: rrect(-0.6, 0.415, 0.6, 0.52, 0.02) },
  ],
  rear: [
    // the connected tail bar: a silver strip over a dark band with a thin red line, red lamp columns at the corners
    { step: 0.005, mat: 'trim', layer: 1, depth: 0.012, poly: [[-0.785, 0.985], [0.785, 0.985], [0.785, 1.118], [0.765, 1.137], [-0.765, 1.137], [-0.785, 1.118]] },
    { step: 0.005, mat: 'satin', layer: 2, depth: 0.014, poly: [[-0.62, 1.097], [0.62, 1.097], [0.62, 1.135], [-0.62, 1.135]] },
    { step: 0.005, mat: 'tail', layer: 3, depth: 0.016, poly: [[-0.6, 1.048], [0.6, 1.048], [0.6, 1.062], [-0.6, 1.062]] },
    { step: 0.005, mat: 'gloss', layer: 1, mirror: true, poly: [[0.5, 0.985], [0.64, 0.985], [0.64, 0.862], [0.56, 0.875]] },
    { step: 0.005, mat: 'gloss', layer: 1, depth: 0.012, mirror: true, poly: [[0.64, 0.862], [0.785, 0.862], [0.785, 0.985], [0.64, 0.985]] },
    { step: 0.005, mat: 'tail', layer: 3, depth: 0.016, mirror: true, poly: [[0.655, 1.04], [0.69, 1.04], [0.69, 1.125], [0.655, 1.125]] },
    { step: 0.005, mat: 'tail', layer: 3, depth: 0.016, mirror: true, poly: [[0.71, 1.04], [0.745, 1.04], [0.745, 1.125], [0.71, 1.125]] },
    { step: 0.005, mat: 'silver', layer: 3, depth: 0.014, mirror: true, poly: [[0.65, 1.012], [0.76, 1.012], [0.76, 1.025], [0.65, 1.025]] },
    { step: 0.005, mat: 'tail', layer: 2, depth: 0.014, mirror: true, poly: [[0.655, 0.88], [0.69, 0.88], [0.69, 0.985], [0.655, 0.985]] },
    { step: 0.005, mat: 'tail', layer: 2, depth: 0.014, mirror: true, poly: [[0.71, 0.88], [0.745, 0.88], [0.745, 0.985], [0.71, 0.985]] },
    // black band at the foot of the tailgate, the silver skid plate with a dark insert and red reflectors at its ends
    { step: 0.005, mat: 'trim', poly: [[-0.79, 0.3], [0.79, 0.3], [0.79, 0.73], [-0.79, 0.73]] },
    { step: 0.005, mat: 'satin', layer: 1, poly: rrect(-0.78, 0.35, 0.78, 0.655, 0.05) },
    { step: 0.005, mat: 'gloss', layer: 2, depth: 0.012, poly: rrect(-0.62, 0.45, 0.62, 0.605, 0.015) },
    { step: 0.005, mat: 'reflector', layer: 2, depth: 0.012, mirror: true, poly: rrect(0.66, 0.455, 0.735, 0.59, 0.012) },
    { step: 0.005, mat: 'gloss', layer: 2, depth: 0.012, poly: rrect(-0.4, 0.405, 0.4, 0.42, 0.006) },
  ],
  side: [
    // the tail lamps wrap round the corners as a wedge
    { mat: 'gloss', step: 0.005, poly: [[0.0005, 0.88], [0.03, 0.88], [0.066, 1.095], [0.074, 1.12], [0.0005, 1.135]] },
    { mat: 'tail', step: 0.005, layer: 1, poly: [[0.002, 1.105], [0.045, 1.105], [0.045, 1.128], [0.002, 1.13]] },
    { mat: 'tail', step: 0.005, layer: 1, poly: [[0.002, 0.905], [0.016, 0.905], [0.016, 1.02], [0.002, 1.02]] },
    // the silver strip on the black sill, and the door handles
    { mat: 'satin', poly: smooth([[0.311, 0.335], [0.7, 0.335], [0.705, 0.35], [0.69, 0.392], [0.32, 0.388]], 1) },
    { mat: 'chrome', poly: [[0.483, 1.01], [0.542, 1.01], [0.542, 1.035], [0.483, 1.035]] },
    { mat: 'chrome', poly: [[0.241, 1.035], [0.296, 1.035], [0.296, 1.06], [0.241, 1.06]] },
  ],
  plates: { front: 0.57, rear: 0.88 },
  rails: 'silver',
  sunroof: [0.25, 0.5],
  mirrors: 'body',
  paint: '#00302a', // Robust Emerald Pearl (the gallery car's deep green, darkened and kept saturated for the studio lights)
  plate: 'MH 12 AZ 2024',
}

const ALTROZ_L = 3.99
/** a side outline from a rounded rectangle given in u (0…1) and metres */
const altrozRectU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  rrectS(u0 * ALTROZ_L, y0, u1 * ALTROZ_L, y1, r).map(([x, y]) => [+(x / ALTROZ_L).toFixed(5), y] as P2)
/** the upper grille's staggered rows of short dark slots, kept inside half-width hw */
const altrozSlots = (ys: number[], hw: number): Decal[] =>
  ys.flatMap((y, i) => {
    const out: Decal[] = []
    const pitch = 0.07, w = 0.05, h = 0.012
    for (let z = (i % 2 ? pitch / 2 : 0) - 1; z < 1; z += pitch) {
      if (Math.abs(z) + w / 2 > hw) continue
      out.push({ step: 0.004, mat: 'trim', layer: 2, depth: 0.009, poly: rrect(z - w / 2, y - h / 2, z + w / 2, y + h / 2, 0.003) })
    }
    return out
  })

/** Tata Altroz (May 2025 facelift). 3990 × 1755 × 1523 (with the shark-fin), wheelbase 2501, 185/60 R16 (top trim).
 *  Side profile from a levelled gallery side photo (the shark-fin erased from the cut-out: roof 1.509 m, the close camera's
 *  axles 2 % too far apart, so heights × 0.99 and the axles at the official wheelbase with the overhangs split as in the
 *  photo). Belt, quarter glass, D-pillar, shut lines, fuel lid and handle read off a metric grid of the cut-out; the slim
 *  headlamps with their LED DRLs and the wide grille between them, the black lower bumper with its silver corners, the
 *  piano-black tail panel joining the tail lamps and the black rear bumper from the straight front and rear photos. */
export const ALTROZ_X: CarSpec = {
  id: 'tata-altroz',
  name: 'Tata Altroz',
  dropSlivers: true,
  L: ALTROZ_L, W: 1.755, H: 1.523,
  axles: [0.1594, 0.7862],
  tyreR: 0.3142, tyreW: 0.185, rim: 0.647, wheel: { style: 'twin', spokes: 5 }, rimTone: 'dark',
  archGap: 0.05, archSquare: 0.15,
  sill: [[0, 0.36], [0.005, 0.33], [0.015, 0.315], [0.03, 0.305], [0.045, 0.293], [0.06, 0.282], [0.08, 0.27], [0.12, 0.25], [0.18, 0.225], [0.25, 0.205], [0.3, 0.204], [0.4, 0.198], [0.5, 0.193], [0.6, 0.184], [0.7, 0.175], [0.75, 0.176], [0.8, 0.181], [0.88, 0.188], [0.92, 0.185], [0.95, 0.198], [0.97, 0.21], [0.985, 0.222], [0.995, 0.232], [1, 0.24]],
  // the tail up to the lamp band; the belt kicking up under the pointed quarter glass (the body forms the lower D-pillar),
  // falling along the doors to the black mirror sail; the cowl, then the bonnet curving down, lifted at the face over
  // the headlamps
  top: [[0, 1.062], [0.008, 1.068], [0.015, 1.072], [0.03, 1.09], [0.045, 1.11], [0.06, 1.13], [0.08, 1.163], [0.1, 1.195], [0.12, 1.222], [0.135, 1.233], [0.148, 1.23], [0.158, 1.21], [0.17, 1.185], [0.19, 1.15], [0.215, 1.12], [0.25, 1.1], [0.3, 1.072], [0.35, 1.052], [0.4, 1.032], [0.45, 1.008], [0.5, 0.985], [0.55, 0.962], [0.6, 0.948], [0.65, 0.944], [0.69, 0.952], [0.71, 0.968], [0.725, 0.99], [0.74, 1.018], [0.75, 1.033], [0.762, 1.034], [0.775, 1.026], [0.79, 1.014], [0.81, 1.0], [0.83, 0.982], [0.85, 0.962], [0.87, 0.94], [0.89, 0.916], [0.91, 0.893], [0.93, 0.874], [0.945, 0.863], [0.96, 0.856], [0.975, 0.851], [0.988, 0.848], [1, 0.846]],
  // round in plan: both ends taper into the corners
  width: [[0, 0.92], [0.006, 0.94], [0.018, 0.958], [0.04, 0.975], [0.08, 0.99], [0.15, 1], [0.5, 0.995], [0.8, 0.995], [0.86, 0.985], [0.92, 0.965], [0.955, 0.945], [0.978, 0.925], [0.992, 0.91], [1, 0.9]],
  crown: 0.015,
  bulge: 0.04,
  haunch: 0.03,
  topRadius: 0.08,
  noseSweep: 0.15,
  tailSweep: 0.12,
  greenhouse: {
    u0: 0.015, u1: 0.75, tumble: 0.58,
    // the raked tailgate glass up under the roof spoiler, the long roof (shark-fin left out), the raked windscreen
    top: [[0.015, 1.074], [0.02, 1.08], [0.03, 1.108], [0.04, 1.153], [0.05, 1.186], [0.06, 1.219], [0.07, 1.251], [0.08, 1.278], [0.09, 1.311], [0.1, 1.34], [0.11, 1.38], [0.115, 1.405], [0.12, 1.43], [0.13, 1.444], [0.15, 1.451], [0.17, 1.457], [0.2, 1.463], [0.23, 1.47], [0.25, 1.478], [0.3, 1.487], [0.35, 1.493], [0.4, 1.494], [0.43, 1.493], [0.45, 1.484], [0.47, 1.475], [0.5, 1.464], [0.53, 1.451], [0.55, 1.428], [0.57, 1.4], [0.6, 1.347], [0.63, 1.289], [0.66, 1.236], [0.69, 1.171], [0.72, 1.098], [0.74, 1.06], [0.75, 1.036]],
  },
  roof: { u0: 0.12264, u1: 0.55665, black: false },
  pillars: [
    // the body-coloured D-pillar behind the quarter glass, only where the glasshouse still faces sideways; the black
    // B-pillar (the A-pillar and the quarter glass's black frame read as glass)
    { bottom: [0.13, 0.155], top: [0.152, 0.185], black: false },
    { bottom: [0.393, 0.416], top: [0.397, 0.423], black: true },
  ],
  doors: [[0.677, 0.683], [0.42, 0.42]],
  front: [
    // the slim headlamps: a dark housing, the LED DRL along the top, the LED projector rows
    { step: 0.004, mat: 'trim', mirror: true, depth: 0.004, poly: smooth([[0.455, 0.645], [0.56, 0.652], [0.66, 0.664], [0.72, 0.674], [0.745, 0.684], [0.748, 0.73], [0.745, 0.79], [0.73, 0.798], [0.64, 0.786], [0.55, 0.772], [0.455, 0.762]], 1) },
    { step: 0.004, mat: 'drl', mirror: true, layer: 1, depth: 0.008, poly: band([[0.465, 0.748], [0.55, 0.758], [0.64, 0.771], [0.72, 0.782], [0.742, 0.784]], 0.014) },
    { step: 0.004, mat: 'head', mirror: true, layer: 1, depth: 0.008, poly: rrect(0.5, 0.672, 0.6, 0.7, 0.006) },
    { step: 0.004, mat: 'head', mirror: true, layer: 1, depth: 0.008, poly: rrect(0.625, 0.69, 0.7, 0.718, 0.006) },
    // the wide upper grille between the headlamps: a gloss-black band over rows of staggered dark slots
    { step: 0.004, mat: 'gloss', poly: both([[0, 0.638], [0.43, 0.638], [0.452, 0.645], [0.452, 0.762], [0, 0.762]]) },
    ...altrozSlots([0.664, 0.69, 0.716], 0.42),
    // the slim black slot in the body-coloured band under it
    { step: 0.004, mat: 'gloss', poly: rrect(-0.38, 0.548, 0.38, 0.582, 0.01) },
    // the black lower bumper running up into the fog-lamp pods at the corners
    { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.27], [0.64, 0.27], [0.7, 0.28], [0.745, 0.31], [0.758, 0.4], [0.758, 0.58], [0.745, 0.612], [0.7, 0.62], [0.655, 0.6], [0.63, 0.515], [0, 0.515]]), 1) },
    { step: 0.004, mat: 'silver', mirror: true, layer: 1, depth: 0.008, poly: rrect(0.672, 0.552, 0.722, 0.573, 0.005) },
    // the lower grille: gloss panel with staggered dark slots
    { step: 0.004, mat: 'gloss', layer: 1, poly: smooth(both([[0, 0.29], [0.56, 0.29], [0.6, 0.31], [0.6, 0.4], [0.57, 0.415], [0, 0.415]]), 1) },
    ...altrozSlots([0.31, 0.338, 0.366, 0.394], 0.56).map((d): Decal => ({ ...d, layer: 3, depth: 0.012 })),
    // the satin corner panels low on the bumper
    { step: 0.004, mat: 'satin', mirror: true, layer: 2, depth: 0.01, poly: smooth([[0.6, 0.39], [0.755, 0.41], [0.758, 0.31], [0.73, 0.292], [0.64, 0.295]], 1) },
  ],
  rear: [
    // the piano-black panel across the tailgate joining the tail lamps, a red line along its top
    { step: 0.004, mat: 'gloss', poly: both(smooth([[0, 0.895], [0.55, 0.895], [0.6, 0.9], [0.62, 0.91], [0.62, 1.062], [0, 1.062]], 1)) },
    { step: 0.004, mat: 'reflector', layer: 2, depth: 0.008, poly: both([[0, 1.038], [0.6, 1.038], [0.6, 1.05], [0, 1.05]]) },
    // the tail lamps at the corners: smoked housings, red guides along the top and down the outer edge
    { step: 0.004, mat: 'gloss', mirror: true, layer: 1, depth: 0.006, poly: smooth([[0.6, 0.9], [0.72, 0.905], [0.765, 0.92], [0.775, 0.96], [0.775, 1.045], [0.76, 1.062], [0.6, 1.062]], 1) },
    { step: 0.004, mat: 'tail', mirror: true, layer: 2, depth: 0.01, poly: [[0.6, 1.05], [0.75, 1.05], [0.765, 1.037], [0.765, 0.94], [0.752, 0.94], [0.752, 1.032], [0.745, 1.038], [0.6, 1.038]] },
    // the tailgate's lower panel shut line
    { step: 0.004, mat: 'gloss', depth: 0.001, poly: band([[-0.6, 0.895], [-0.6, 0.75], [-0.585, 0.715], [-0.55, 0.703], [0, 0.7], [0.55, 0.703], [0.585, 0.715], [0.6, 0.75], [0.6, 0.895]], 0.012) },
    // the black rear bumper, body-coloured below at its corners, red reflectors along its top corners
    { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.37], [0.6, 0.37], [0.635, 0.39], [0.645, 0.47], [0.7, 0.48], [0.74, 0.5], [0.755, 0.56], [0.748, 0.64], [0.72, 0.66], [0, 0.66]]), 1) },
    { step: 0.004, mat: 'reflector', mirror: true, layer: 1, poly: rrect(0.52, 0.628, 0.67, 0.645, 0.005) },
    { step: 0.004, mat: 'silver', layer: 1, depth: 0.006, poly: rrect(-0.1, 0.38, 0.1, 0.41, 0.008) },
  ],
  side: [
    // the door handle, body-coloured in a dark recess
    { step: 0.004, mat: 'gloss', depth: 0.002, poly: altrozRectU(0.451, 0.828, 0.502, 0.872, 0.014) },
    { step: 0.004, mat: 'body', layer: 1, depth: 0.008, poly: altrozRectU(0.454, 0.834, 0.499, 0.866, 0.01) },
    // the rear door's curved rear edge
    { step: 0.004, mat: 'gloss', depth: 0.001, poly: sideBand([[0.308, 0.277], [0.291, 0.294], [0.268, 0.365], [0.242, 0.525], [0.215, 0.72], [0.198, 0.847], [0.187, 0.99], [0.182, 1.097]], 0.012, ALTROZ_L) },
    // the fuel lid
    { step: 0.004, mat: 'gloss', depth: 0.001, poly: sideBand([...altrozRectU(0.091, 0.745, 0.142, 0.89, 0.03)].concat([altrozRectU(0.091, 0.745, 0.142, 0.89, 0.03)[0]]), 0.012, ALTROZ_L) },
    // the tail lamp wrapping onto the flank to a point
    { step: 0.003, mat: 'gloss', depth: 0.002, poly: smooth([[0.004, 0.905], [0.03, 0.915], [0.06, 0.94], [0.1, 0.985], [0.142, 1.02], [0.1, 1.034], [0.05, 1.042], [0.02, 1.042], [0.004, 1.04]], 1) },
    { step: 0.004, mat: 'tail', layer: 1, depth: 0.006, poly: [[0.054, 0.955], [0.066, 0.965], [0.068, 1.025], [0.056, 1.028]] },
    // the black rear bumper wrapping round the corner
    { step: 0.004, mat: 'trim', depth: 0.004, poly: [[0.002, 0.38], [0.02, 0.38], [0.028, 0.45], [0.028, 0.62], [0.015, 0.655], [0.002, 0.66]] },
    // the headlamp sweeping back along the wing, its DRL along the top
    { step: 0.004, mat: 'trim', depth: 0.004, poly: smooth([[0.999, 0.672], [0.999, 0.795], [0.975, 0.806], [0.95, 0.818], [0.925, 0.83], [0.912, 0.826], [0.93, 0.79], [0.955, 0.73], [0.977, 0.688]], 1) },
    { step: 0.004, mat: 'drl', layer: 1, depth: 0.008, poly: sideBand([[0.996, 0.786], [0.97, 0.798], [0.945, 0.81], [0.925, 0.82]], 0.012, ALTROZ_L) },
    // the black bumper corner with the fog-lamp pod, the satin panel under it
    { step: 0.003, mat: 'trim', depth: 0.002, poly: smooth([[0.999, 0.6], [0.975, 0.59], [0.95, 0.56], [0.935, 0.5], [0.932, 0.42], [0.999, 0.41]], 1) },
    { step: 0.004, mat: 'satin', layer: 1, depth: 0.008, poly: smooth([[0.999, 0.41], [0.94, 0.4], [0.923, 0.35], [0.95, 0.29], [0.999, 0.285]], 1) },
  ],
  plates: { front: 0.48, rear: 0.55 },
  mirrors: 'black',
  paint: '#685c53', // Dune Glow, the gallery car's taupe, darkened for the studio lights
  plate: 'MH 12 AZ 2026',
}

const VERNA_L = 4.565
/** a side outline from a rounded rectangle given in u (0…1) and metres */
const vernaU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  rrectS(u0 * VERNA_L, y0, u1 * VERNA_L, y1, r).map(([x, y]) => [+(x / VERNA_L).toFixed(5), y] as P2)
/** the parametric grille: rows of silver darts pointing outwards, every other row offset half a pitch, inside hw(y) */
const vernaDarts = (ys: number[], hw: (y: number) => number, skip?: (z: number, y: number) => boolean): Decal[] =>
  ys.flatMap((y, row) => {
    const out: Decal[] = []
    for (let k = -8; k <= 8; k++) {
      const zc = k * 0.095 + (row % 2) * 0.0475
      if (Math.abs(zc) < 0.03 || Math.abs(zc) + 0.05 > hw(y + 0.013) - 0.012) continue
      if (skip?.(zc, y)) continue
      const s = zc < 0 ? -1 : 1
      out.push({ step: 0.004, mat: 'satin', layer: 1, depth: 0.012, poly: [[zc - s * 0.045, y], [zc + s * 0.03, y + 0.01], [zc + s * 0.05, y + 0.032], [zc - s * 0.02, y + 0.014]].map(([z, yy]) => [+z.toFixed(4), +yy.toFixed(4)] as P2) })
    }
    return out
  })
const vernaGrilleHW = (y: number) => 0.475 + (Math.min(y, 0.59) - 0.27) * 0.2
/** the gallery camera stood close: the overlay shows a uniform 2 cm band (model high over roof and bonnet, photo low under
 *  the sill), so every traced height comes down by this */
const VERNA_DY = 0.02
const vernaY = (pts: P2[]): P2[] => pts.map(([u, y]) => [u, +(y - VERNA_DY).toFixed(4)] as P2)
const vernaD = (ds: Decal[]): Decal[] => ds.map((d) => ({ ...d, poly: vernaY(d.poly) }))

/** Hyundai Verna (2026 facelift of the 6th gen). 4565 × 1765 × 1475, wheelbase 2670, 205/55 R16 (top trim).
 *  Side profile from a levelled gallery side photo (1.470 m, axles 0.2 % apart: no scaling; axles at the official
 *  wheelbase with the overhangs split as in the photo). Belt, glass, shut lines and handles read off a brightened metric
 *  grid of the black car's cut-out; the full-width light bar, lamp clusters and parametric grille from a straight front
 *  photo, the light bar, lamps, boot wing and the silver diffuser from a straight rear photo. */
export const VERNA: CarSpec = {
  id: 'hyundai-verna',
  name: 'Hyundai Verna',
  rakedEnds: true,
  dropSlivers: true,
  L: VERNA_L, W: 1.765, H: 1.475,
  axles: [0.2238, 0.8087],
  tyreR: 0.316, tyreW: 0.205, rim: 0.643, wheel: { style: 'swirl', spokes: 5 },
  archGap: 0.09, archSquare: 0.1,
  sill: vernaY([[0, 0.29], [0.008, 0.3], [0.02, 0.31], [0.05, 0.3], [0.08, 0.285], [0.1, 0.27], [0.12, 0.25], [0.15, 0.23], [0.25, 0.215], [0.3, 0.205], [0.5, 0.205], [0.7, 0.2], [0.75, 0.195], [0.85, 0.185], [0.9, 0.178], [0.95, 0.19], [0.97, 0.2], [0.98, 0.215], [0.99, 0.232], [1, 0.26]]),
  // the tail face up to the boot wing, the short boot deck, the belt under the glass rising to the C-pillar, the bonnet
  // (lowered by the crown) and the nose raised to just over the light bar
  top: vernaY([[0, 0.98], [0.006, 1.055], [0.012, 1.088], [0.02, 1.098], [0.035, 1.09], [0.05, 1.088], [0.065, 1.1], [0.075, 1.115], [0.09, 1.113], [0.12, 1.103], [0.16, 1.092], [0.2, 1.08], [0.3, 1.05], [0.4, 1.03], [0.5, 1.013], [0.6, 0.998], [0.7, 0.982], [0.73, 0.98], [0.75, 0.985], [0.77, 0.978], [0.8, 0.966], [0.82, 0.952], [0.85, 0.93], [0.88, 0.898], [0.9, 0.874], [0.92, 0.845], [0.94, 0.815], [0.96, 0.783], [0.97, 0.765], [0.98, 0.75], [0.99, 0.74], [1, 0.735]]),
  // round in plan: both ends taper into the corners
  width: [[0, 0.9], [0.005, 0.915], [0.015, 0.94], [0.035, 0.965], [0.07, 0.985], [0.13, 0.997], [0.2, 1], [0.45, 0.99], [0.8, 0.997], [0.86, 0.99], [0.92, 0.97], [0.955, 0.95], [0.975, 0.935], [0.99, 0.915], [1, 0.895]],
  crown: 0.015,
  bulge: 0.04,
  haunch: 0.05,
  bonnetRidge: 0.008,
  topRadius: 0.08,
  noseSweep: 0.12,
  tailSweep: 0.2,
  greenhouse: {
    u0: 0.075, u1: 0.75, tumble: 0.62,
    // the long fastback rear glass rising off the short boot deck, the domed roof, the raked windscreen
    top: vernaY([[0.075, 1.115], [0.08, 1.122], [0.09, 1.133], [0.1, 1.145], [0.11, 1.161], [0.12, 1.176], [0.14, 1.21], [0.16, 1.245], [0.18, 1.276], [0.2, 1.305], [0.22, 1.332], [0.24, 1.36], [0.26, 1.387], [0.28, 1.405], [0.3, 1.421], [0.32, 1.434], [0.34, 1.444], [0.36, 1.453], [0.38, 1.46], [0.4, 1.466], [0.43, 1.469], [0.46, 1.466], [0.48, 1.461], [0.5, 1.455], [0.52, 1.445], [0.54, 1.432], [0.56, 1.412], [0.58, 1.385], [0.6, 1.353], [0.62, 1.31], [0.64, 1.262], [0.66, 1.216], [0.68, 1.166], [0.7, 1.114], [0.72, 1.06], [0.74, 1.012], [0.75, 0.988]]),
  },
  roof: { u0: 0.2869, u1: 0.5521, black: false },
  pillars: [
    // body-coloured C-pillar behind the triangular quarter glass; black quarter-glass divider and B-pillar
    { bottom: [0.27, 0.278], top: [0.282, 0.29], black: true },
    { bottom: [0.456, 0.478], top: [0.435, 0.459], black: true },
  ],
  doors: [[0.295, 0.232], [0.467, 0.47], [0.72, 0.716]],
  windowChrome: true,
  front: vernaD([
    // the full-width "horizon" light bar along the bonnet's leading edge
    { step: 0.004, mat: 'drl', layer: 2, poly: band([[-0.755, 0.713], [-0.7, 0.706], [-0.6, 0.702], [-0.3, 0.701], [0.3, 0.701], [0.6, 0.702], [0.7, 0.706], [0.755, 0.713]], 0.016) },
    // lamp clusters at the bumper corners: dark housing, the indicator/DRL strip on top, the projector strip, the low strip
    { step: 0.004, mat: 'trim', mirror: true, depth: 0.004, poly: smooth([[0.555, 0.42], [0.7, 0.42], [0.76, 0.47], [0.763, 0.6], [0.56, 0.602]], 1) },
    { step: 0.004, mat: 'drl', mirror: true, layer: 1, poly: rrect(0.575, 0.566, 0.748, 0.584, 0.004) },
    { step: 0.004, mat: 'head', mirror: true, layer: 1, depth: 0.008, poly: rrect(0.59, 0.515, 0.7, 0.533, 0.004) },
    { step: 0.004, mat: 'drl', mirror: true, layer: 1, poly: rrect(0.59, 0.462, 0.705, 0.476, 0.004) },
    // the wide trapezoid grille: gloss black with rows of silver darts, a satin sliver along its sides
    { step: 0.004, mat: 'gloss', poly: smooth(both([[0, 0.27], [0.46, 0.27], [0.49, 0.29], [0.535, 0.57], [0.53, 0.59], [0, 0.59]]), 1) },
    ...vernaDarts([0.29, 0.34, 0.39, 0.44, 0.49, 0.54], vernaGrilleHW, (z, y) => Math.abs(z) < 0.3 && y > 0.37 && y < 0.5),
    { step: 0.004, mat: 'satin', mirror: true, layer: 1, depth: 0.008, poly: [[0.523, 0.43], [0.533, 0.43], [0.565, 0.6], [0.535, 0.6]] },
    // slatted black vents under the lamps
    { step: 0.004, mat: 'gloss', mirror: true, depth: 0.006, poly: smooth([[0.55, 0.27], [0.71, 0.27], [0.755, 0.3], [0.755, 0.39], [0.56, 0.39]], 1) },
    ...[0.3, 0.33, 0.36].map((y): Decal => ({ step: 0.004, mat: 'trim', mirror: true, layer: 1, depth: 0.012, poly: rrect(0.575, y, 0.74, y + 0.014, 0.004) })),
    // black lower lip
    { step: 0.004, mat: 'trim', poly: smooth(both([[0, 0.225], [0.66, 0.225], [0.74, 0.24], [0.74, 0.262], [0, 0.262]]), 1) },
  ]),
  rear: vernaD([
    // the boot wing over the lid's trailing edge
    { step: 0.004, mat: 'gloss', depth: 0.01, poly: smooth([[-0.64, 1.048], [0.64, 1.048], [0.7, 1.07], [0.71, 1.098], [0.64, 1.09], [-0.64, 1.09], [-0.71, 1.098], [-0.7, 1.07]], 1) },
    // the black band carrying the tail-lamp units, the red light bar across it, crystal red blocks under it
    { step: 0.004, mat: 'gloss', layer: 1, depth: 0.012, poly: smooth(both([[0, 0.83], [0.74, 0.83], [0.76, 0.85], [0.765, 0.932], [0, 0.932]]), 1) },
    { step: 0.004, mat: 'tail', layer: 3, depth: 0.016, poly: rrect(-0.75, 0.894, 0.75, 0.906, 0.005) },
    { step: 0.004, mat: 'tail', mirror: true, layer: 2, depth: 0.014, poly: smooth([[0.585, 0.848], [0.745, 0.848], [0.745, 0.884], [0.6, 0.884]], 1) },
    { step: 0.004, mat: 'tail', mirror: true, layer: 2, depth: 0.014, poly: smooth([[0.44, 0.852], [0.57, 0.852], [0.57, 0.882], [0.455, 0.882]], 1) },
    // the red line running down the outer edge, the reversing lamps under the units
    { step: 0.004, mat: 'tail', mirror: true, layer: 3, depth: 0.016, poly: rrect(0.748, 0.71, 0.76, 0.9, 0.005) },
    { step: 0.004, mat: 'gloss', mirror: true, layer: 1, depth: 0.006, poly: rrect(0.6, 0.755, 0.742, 0.81, 0.008) },
    ...[0.762, 0.778, 0.794].map((y): Decal => ({ step: 0.004, mat: 'silver', mirror: true, layer: 2, depth: 0.008, poly: rrect(0.61, y, 0.732, y + 0.011, 0.003) })),
    // the satin U round the black diffuser, red reflectors and fins in it
    { step: 0.004, mat: 'satin', depth: 0.008, poly: smooth(both([[0, 0.305], [0.7, 0.305], [0.765, 0.33], [0.77, 0.47], [0.74, 0.492], [0, 0.492]]), 1) },
    { step: 0.004, mat: 'trim', layer: 1, depth: 0.01, poly: smooth(both([[0, 0.305], [0.67, 0.305], [0.67, 0.457], [0, 0.457]]), 1) },
    { step: 0.004, mat: 'reflector', mirror: true, layer: 2, depth: 0.012, poly: rrect(0.45, 0.42, 0.66, 0.438, 0.004) },
    ...[0.1, 0.27].map((z): Decal => ({ step: 0.004, mat: 'gloss', mirror: true, layer: 2, depth: 0.014, poly: [[z - 0.012, 0.31], [z + 0.012, 0.31], [z + 0.012, 0.415], [z - 0.012, 0.415]] })),
  ]),
  side: vernaD([
    // body-coloured door handles (the relief gives them a dark rim)
    { step: 0.004, mat: 'body', depth: 0.01, poly: vernaU(0.48, 0.88, 0.535, 0.91, 0.012) },
    { step: 0.004, mat: 'body', depth: 0.01, poly: vernaU(0.255, 0.915, 0.31, 0.945, 0.012) },
    // the light bar running back along the top of the wing
    { step: 0.004, mat: 'drl', depth: 0.006, poly: sideBand([[0.999, 0.701], [0.975, 0.712], [0.95, 0.724], [0.925, 0.736]], 0.014, VERNA_L) },
    // the tail lamp's wedge on the flank: black housing, the red light bar ending in it
    { step: 0.003, mat: 'gloss', depth: 0.002, poly: smooth([[0.004, 0.72], [0.004, 0.95], [0.03, 0.952], [0.07, 0.94], [0.05, 0.86], [0.025, 0.76]], 1) },
    { step: 0.003, mat: 'tail', layer: 1, depth: 0.004, poly: [[0.004, 0.845], [0.004, 0.905], [0.04, 0.912], [0.035, 0.85]] },
    // the satin diffuser running forward along the bumper's lower edge
    { step: 0.004, mat: 'satin', depth: 0.006, poly: sideBand([[0.004, 0.47], [0.03, 0.41], [0.06, 0.35], [0.09, 0.31]], 0.035, VERNA_L) },
  ]),
  plates: { front: 0.42, rear: 0.735 },
  mirrors: 'body',
  mirrorU: 0.69,
  paint: '#030406', // Titanium Black (the gallery car), kept very dark for the studio lights
  plate: 'MH 12 HV 2026',
}

const VICTORIS_L = 4.36
// the gallery side photo reads 1.673 m over the rails with its axles (u 0.1849 / 0.8105) 4.9 % too far apart (close
// camera): heights × 0.989, and every traced u mapped piecewise-linearly so the axles land on the official wheelbase
const VICTORIS_K = 0.989
const victorisU = (u: number): number => {
  const pa = [0, 0.1849, 0.8105, 1], ma = [0, 0.1994, 0.7957, 1]
  for (let i = 0; i < 3; i++) if (u <= pa[i + 1] || i === 2) return +(ma[i] + ((u - pa[i]) * (ma[i + 1] - ma[i])) / (pa[i + 1] - pa[i])).toFixed(5)
  return u
}
/** photo [u, y] → model [u, y] */
const victorisP = (pts: P2[]): P2[] => pts.map(([u, y]) => [victorisU(u), +(y * VICTORIS_K).toFixed(4)] as P2)
/** end-face [z, y] traced at photo heights → model heights */
const victorisY = (pts: P2[]): P2[] => pts.map(([z, y]) => [z, +(y * VICTORIS_K).toFixed(4)] as P2)
const victorisD = (d: Decal): Decal => ({ ...d, poly: victorisY(d.poly) })
/** a side outline from a rounded rectangle given in photo u and metres */
const victorisRectU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  victorisP(rrectS(u0 * VICTORIS_L, y0, u1 * VICTORIS_L, y1, r).map(([x, y]) => [x / VICTORIS_L, y] as P2))
const VICTORIS_GH: [number, number] = [victorisU(0.02), victorisU(0.735)]
/** the glasshouse station nearest photo u (roof paint edges must sit on one) */
const victorisStation = (u: number): number => {
  const [a, b] = VICTORIS_GH
  const m = victorisU(u)
  let best = a
  for (let i = 0; i <= 140; i++) { const s = a + (b - a) * (0.5 - 0.5 * Math.cos((Math.PI * i) / 140)); if (Math.abs(s - m) < Math.abs(best - m)) best = s }
  return +best.toFixed(5)
}
/** the tail light bar's red segments, z ±hw */
const victorisBar = (hw: number): Decal[] => {
  const out: Decal[] = []
  const n = 18, pitch = (2 * hw) / n
  for (let i = 0; i < n; i++) {
    const z0 = -hw + i * pitch + 0.012, z1 = -hw + (i + 1) * pitch - 0.012
    out.push({ step: 0.004, mat: 'tail', layer: 2, depth: 0.01, poly: rrect(z0, 1.166, z1, 1.182, 0.003) })
  }
  return out
}

/** Maruti Suzuki Victoris (2025). 4360 × 1795 × 1655 (with roof rails), wheelbase 2600, 215/60 R17 (top trim).
 *  Side profile from a levelled gallery side photo (tyre bottoms in grass patched with dark discs; 1.673 m measured, the
 *  close camera's axles 4.9 % apart, so heights × 0.989 and the axles at the official wheelbase with the overhangs split as
 *  in the photo). Belt, pillars, shut lines, handles, tail-lamp wedge and the black cladding read off a metric grid of the
 *  cut-out; the slim headlamps joined by a chrome bar, the slatted mid grille with its corner pods, the black lower bumper
 *  with the satin skid plate, the segmented tail light bar and the rear bumper from the straight front and rear photos. */
export const VICTORIS_X: CarSpec = {
  id: 'maruti-victoris',
  name: 'Maruti Suzuki Victoris',
  L: VICTORIS_L, W: 1.795, H: 1.655,
  axles: [0.1994, 0.7957],
  tyreR: 0.345, tyreW: 0.215, rim: 0.626, wheel: { style: 'swirl', spokes: 5 }, rimTone: 'dark',
  archGap: 0.1, archSquare: 0.35,
  sill: victorisP([[0, 0.36], [0.01, 0.37], [0.03, 0.385], [0.05, 0.38], [0.07, 0.371], [0.085, 0.355], [0.1, 0.33], [0.12, 0.3], [0.2, 0.28], [0.3, 0.271], [0.5, 0.285], [0.7, 0.28], [0.85, 0.278], [0.92, 0.278], [0.95, 0.28], [0.97, 0.285], [0.985, 0.28], [1, 0.27]]),
  // the tail face up to the light bar, the near-flat belt under the glass, the cowl, the bonnet falling to the nose and
  // lifted at the face over the headlamps
  top: victorisP([[0, 1.205], [0.006, 1.212], [0.015, 1.215], [0.03, 1.215], [0.1, 1.212], [0.2, 1.207], [0.3, 1.203], [0.4, 1.2], [0.5, 1.198], [0.6, 1.195], [0.68, 1.192], [0.72, 1.188], [0.735, 1.186], [0.75, 1.18], [0.8, 1.17], [0.85, 1.152], [0.88, 1.138], [0.91, 1.12], [0.93, 1.104], [0.95, 1.085], [0.965, 1.07], [0.975, 1.058], [0.985, 1.05], [0.993, 1.046], [1, 1.044]]),
  // round in plan: both ends taper into the corners
  width: [[0, 0.92], [0.006, 0.945], [0.02, 0.97], [0.05, 0.988], [0.1, 0.997], [0.5, 1], [0.86, 0.997], [0.91, 0.985], [0.945, 0.97], [0.97, 0.955], [0.988, 0.935], [1, 0.92]],
  crown: 0.012,
  bulge: 0.03,
  haunch: 0.05,
  topRadius: 0.075,
  dropSlivers: true,
  noseSweep: 0.08,
  tailSweep: 0.06,
  greenhouse: {
    u0: VICTORIS_GH[0], u1: VICTORIS_GH[1], tumble: 0.68, followBody: 0.1,
    // the raked tailgate glass up under the roof spoiler, the long roof (under the rails), the raked windscreen
    top: victorisP([[0.02, 1.215], [0.03, 1.232], [0.04, 1.258], [0.05, 1.291], [0.06, 1.335], [0.07, 1.378], [0.08, 1.425], [0.09, 1.478], [0.1, 1.528], [0.11, 1.552], [0.125, 1.565], [0.15, 1.577], [0.2, 1.596], [0.25, 1.611], [0.3, 1.623], [0.35, 1.632], [0.4, 1.638], [0.45, 1.641], [0.5, 1.635], [0.52, 1.616], [0.54, 1.6], [0.56, 1.58], [0.58, 1.56], [0.6, 1.533], [0.62, 1.494], [0.64, 1.451], [0.66, 1.402], [0.68, 1.346], [0.7, 1.291], [0.71, 1.263], [0.72, 1.235], [0.73, 1.205], [0.735, 1.186]]),
  },
  roof: { u0: victorisStation(0.1), u1: victorisStation(0.55), black: false },
  pillars: [
    // the black C-pillar between the rear door glass and the quarter glass, and the wide black B-pillar
    { bottom: [victorisU(0.245), victorisU(0.268)], top: [victorisU(0.232), victorisU(0.252)], black: true },
    { bottom: [victorisU(0.418), victorisU(0.452)], top: [victorisU(0.42), victorisU(0.447)], black: true },
  ],
  // black arch flares, the black side skirt along the doors, the black bumpers wrapping the corners
  cladding: { top: victorisP([[0, 0.61], [0.04, 0.61], [0.07, 0.59], [0.085, 0.53], [0.1, 0.42], [0.12, 0.4], [0.3, 0.4], [0.7, 0.4], [0.9, 0.405], [0.93, 0.45], [0.95, 0.48], [1, 0.48]]), flare: 0.08, cut: true },
  doors: [[victorisU(0.71), victorisU(0.705)], [victorisU(0.45), victorisU(0.452)], [victorisU(0.245), victorisU(0.25)]],
  front: ([
    // the slim headlamps: a dark housing, five LED DRL blocks stepping up along the top, the projector at the outer end
    { step: 0.004, mat: 'gloss', mirror: true, depth: 0.006, poly: smooth([[0.47, 0.9], [0.56, 0.886], [0.65, 0.87], [0.72, 0.857], [0.775, 0.853], [0.8, 0.862], [0.808, 0.9], [0.808, 0.96], [0.8, 0.985], [0.78, 0.992], [0.7, 0.981], [0.6, 0.964], [0.5, 0.948], [0.47, 0.943]], 1) },
    ...[0.53, 0.58, 0.63, 0.68, 0.73].map((z): Decal => {
      const y = 0.936 + (z - 0.5) * 0.15
      return { step: 0.004, mat: 'drl', mirror: true, layer: 1, depth: 0.01, poly: [[z, y - 0.008], [z + 0.04, y - 0.002], [z + 0.048, y + 0.021], [z + 0.008, y + 0.015]] }
    }),
    { step: 0.004, mat: 'head', mirror: true, layer: 1, depth: 0.01, poly: rrect(0.7, 0.874, 0.765, 0.914, 0.01) },
    // the black band joining the headlamps and the chrome bar along it
    { step: 0.004, mat: 'gloss', poly: both([[0, 0.886], [0.48, 0.894], [0.48, 0.944], [0, 0.95]]) },
    { step: 0.004, mat: 'chrome', layer: 1, depth: 0.008, poly: both([[0, 0.913], [0.5, 0.913], [0.5, 0.924], [0, 0.924]]) },
    // the slatted black band across the bumper rising into the black corner pods, a fog lamp in each
    { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.66], [0.6, 0.66], [0.68, 0.64], [0.7, 0.52], [0.72, 0.5], [0.79, 0.5], [0.795, 0.6], [0.79, 0.775], [0.74, 0.78], [0.65, 0.76], [0, 0.755]]), 1) },
    { step: 0.004, mat: 'slats', layer: 1, poly: both([[0, 0.683], [0.56, 0.683], [0.56, 0.733], [0, 0.733]]) },
    { step: 0.004, mat: 'slats', mirror: true, layer: 1, poly: [[0.745, 0.52], [0.78, 0.52], [0.783, 0.68], [0.755, 0.68]] },
    { step: 0.004, mat: 'head', mirror: true, layer: 1, depth: 0.01, poly: rrect(0.715, 0.705, 0.75, 0.737, 0.016) },
    // the body-coloured lip under it is the body itself; the black lower bumper with its grille and the satin skid plate
    { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.27], [0.7, 0.27], [0.78, 0.3], [0.795, 0.38], [0.79, 0.48], [0.72, 0.5], [0.66, 0.56], [0.6, 0.595], [0, 0.598]]), 1) },
    { step: 0.004, mat: 'slats', layer: 1, poly: smooth(both([[0, 0.385], [0.5, 0.385], [0.55, 0.42], [0.56, 0.47], [0.5, 0.48], [0, 0.48]]), 1) },
    { step: 0.004, mat: 'satin', layer: 2, depth: 0.01, poly: smooth(both([[0, 0.292], [0.62, 0.292], [0.69, 0.3], [0.73, 0.322], [0.738, 0.345], [0.72, 0.366], [0.66, 0.372], [0, 0.374]]), 2) },
  ] as Decal[]).map(victorisD),
  rear: ([
    // the light bar across the top of the tailgate: a smoked housing with segmented red lines, boomerang lamps at the corners
    { step: 0.004, mat: 'gloss', depth: 0.006, poly: both([[0, 1.152], [0.69, 1.152], [0.69, 1.196], [0, 1.196]]) },
    ...victorisBar(0.67),
    { step: 0.004, mat: 'gloss', mirror: true, layer: 1, depth: 0.008, poly: smooth([[0.68, 1.15], [0.74, 1.145], [0.775, 1.1], [0.8, 1.06], [0.812, 1.065], [0.812, 1.15], [0.805, 1.185], [0.785, 1.198], [0.68, 1.198]], 1) },
    { step: 0.004, mat: 'tail', mirror: true, layer: 2, depth: 0.012, poly: [[0.69, 1.172], [0.765, 1.172], [0.785, 1.14], [0.8, 1.09], [0.81, 1.094], [0.8, 1.15], [0.782, 1.186], [0.69, 1.186]] },
    // the tailgate's shut lines down its sides
    { step: 0.004, mat: 'gloss', depth: 0.001, mirror: true, poly: band([[0.69, 1.15], [0.69, 0.66]], 0.012) },
    // the black rear bumper with red reflectors and the big satin skid plate
    { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.39], [0.72, 0.39], [0.78, 0.42], [0.795, 0.5], [0.79, 0.62], [0.7, 0.632], [0, 0.635]]), 1) },
    { step: 0.004, mat: 'reflector', mirror: true, layer: 1, depth: 0.006, poly: rrect(0.43, 0.545, 0.58, 0.565, 0.005) },
    { step: 0.004, mat: 'satin', layer: 1, depth: 0.01, poly: smooth(both([[0, 0.402], [0.66, 0.402], [0.71, 0.415], [0.728, 0.46], [0.72, 0.515], [0.68, 0.528], [0, 0.53]]), 2) },
  ] as Decal[]).map(victorisD),
  side: [
    // body-coloured door handles in dark recesses
    { step: 0.004, mat: 'gloss', depth: 0.002, poly: victorisRectU(0.495, 1.018, 0.545, 1.052, 0.012) },
    { step: 0.004, mat: 'body', layer: 1, depth: 0.008, poly: victorisRectU(0.498, 1.024, 0.542, 1.046, 0.009) },
    { step: 0.004, mat: 'gloss', depth: 0.002, poly: victorisRectU(0.272, 1.072, 0.322, 1.106, 0.012) },
    { step: 0.004, mat: 'body', layer: 1, depth: 0.008, poly: victorisRectU(0.275, 1.078, 0.319, 1.1, 0.009) },
    // the smoked tail-lamp wedge on the rear quarter with its red guide
    { step: 0.003, mat: 'gloss', depth: 0.002, poly: victorisP(smooth([[0.004, 1.06], [0.02, 1.045], [0.05, 1.02], [0.085, 0.995], [0.07, 1.04], [0.05, 1.1], [0.035, 1.155], [0.025, 1.175], [0.004, 1.175]], 1)) },
    { step: 0.003, mat: 'tail', layer: 1, depth: 0.004, poly: victorisP(sideBand([[0.003, 1.163], [0.022, 1.158], [0.034, 1.128], [0.05, 1.082], [0.068, 1.03]], 0.016, VICTORIS_L)) },
    // the headlamp wrapping onto the wing
    { step: 0.004, mat: 'gloss', depth: 0.004, poly: victorisP(smooth([[0.999, 0.9], [0.985, 0.912], [0.965, 0.935], [0.945, 0.965], [0.935, 0.99], [0.96, 0.995], [0.985, 1.0], [0.999, 1.0]], 1)) },
  ],
  plates: { front: 0.515 * VICTORIS_K, rear: 0.86 * VICTORIS_K },
  rails: 'silver',
  mirrors: 'black',
  paint: '#8c0008', // Sizzling Red, the gallery car's red darkened for the studio lights
  plate: 'MH 12 VX 2026',
}

const SIERRA_L = 4.34
/** photo u → model u: the gallery camera spreads the axles 2.9 %, so lower-body lines (doors, handles, cladding, B-pillar)
 *  are mapped piecewise-linearly onto the official wheelbase; the silhouette stays in photo u */
const sierraU = (u: number): number => {
  const pa = 0.1787, pb = 0.8257, ma = 0.1878, mb = 0.8168
  const v = u <= pa ? (u * ma) / pa : u <= pb ? ma + ((u - pa) * (mb - ma)) / (pb - pa) : mb + ((u - pb) * (1 - mb)) / (1 - pb)
  return +v.toFixed(5)
}
const sierraP = (pts: P2[]): P2[] => pts.map(([u, y]) => [sierraU(u), y] as P2)
/** a side outline from a rounded rectangle given in u (0…1) and metres */
const sierraRectU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  rrectS(u0 * SIERRA_L, y0, u1 * SIERRA_L, y1, r).map(([x, y]) => [+(x / SIERRA_L).toFixed(5), y] as P2)

/** all heights × k: each gallery photo's overlay sat ~2 cm low over roof and bonnet (the ICE car is also 3.5 cm lower) */
const sierraK = (s: CarSpec, k: number): CarSpec => {
  const ys = (pts: P2[]): P2[] => pts.map(([a, y]) => [a, +(y * k).toFixed(4)] as P2)
  const ds = (list: Decal[] | undefined) => list?.map((d) => ({ ...d, poly: ys(d.poly) }))
  return {
    ...s, sill: ys(s.sill), top: ys(s.top), greenhouse: { ...s.greenhouse, top: ys(s.greenhouse.top) },
    cladding: s.cladding && { ...s.cladding, top: ys(s.cladding.top) },
    front: ds(s.front)!, rear: ds(s.rear)!, side: ds(s.side),
    plates: { front: +(s.plates.front * k).toFixed(3), rear: +(s.plates.rear * k).toFixed(3) },
  }
}
// the tail (shared by both): the connected light bar, the black bumper with red reflectors, the satin skid plate
const SIERRA_REAR: Decal[] = [
  { step: 0.005, mat: 'gloss', layer: 2, depth: 0.012, poly: smooth(both([[0, 1.152], [0.77, 1.152], [0.8, 1.162], [0.805, 1.2], [0.8, 1.228], [0.77, 1.236], [0, 1.236]]), 1) },
  { step: 0.005, mat: 'tail', layer: 3, depth: 0.016, poly: both([[0, 1.206], [0.77, 1.206], [0.792, 1.21], [0.792, 1.222], [0.77, 1.224], [0, 1.224]]) },
  { step: 0.005, mat: 'tail', layer: 3, mirror: true, depth: 0.016, poly: rrect(0.56, 1.172, 0.785, 1.192, 0.005) },
  { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.3], [0.72, 0.3], [0.77, 0.33], [0.785, 0.42], [0.785, 0.62], [0.765, 0.715], [0.7, 0.752], [0.55, 0.775], [0, 0.785]]), 1) },
  { step: 0.004, mat: 'reflector', layer: 1, mirror: true, poly: rrect(0.36, 0.655, 0.64, 0.675, 0.005) },
  { step: 0.005, mat: 'satin', layer: 1, depth: 0.01, poly: smooth(both([[0, 0.375], [0.69, 0.375], [0.735, 0.395], [0.745, 0.45], [0.705, 0.548], [0.63, 0.57], [0.47, 0.565], [0.415, 0.52], [0, 0.52]]), 1) },
]
// the flank (shared): the body-coloured "ear" of the roof spoiler on the quarter glass, the handles, the fuel/charge lid,
// the satin strip along the cladding, the light bar's wrap at the tail corner
const SIERRA_SIDE: Decal[] = [
  { step: 0.004, mat: 'body', depth: 0.004, poly: smooth([[0.026, 1.625], [0.06, 1.638], [0.1, 1.648], [0.134, 1.655], [0.1, 1.592], [0.07, 1.532], [0.046, 1.475], [0.038, 1.52], [0.03, 1.59]], 1) },
  { step: 0.005, mat: 'gloss', depth: 0.002, poly: sierraRectU(sierraU(0.5), 1.032, sierraU(0.548), 1.076, 0.016) },
  { step: 0.005, mat: 'body', layer: 1, depth: 0.008, poly: sierraRectU(sierraU(0.503), 1.037, sierraU(0.545), 1.071, 0.012) },
  { step: 0.005, mat: 'gloss', depth: 0.002, poly: sierraRectU(sierraU(0.249), 1.063, sierraU(0.297), 1.103, 0.016) },
  { step: 0.005, mat: 'body', layer: 1, depth: 0.008, poly: sierraRectU(sierraU(0.252), 1.068, sierraU(0.294), 1.098, 0.012) },
  { step: 0.004, mat: 'satin', layer: 1, depth: 0.004, poly: sideBand(sierraP([[0.355, 0.463], [0.45, 0.452], [0.55, 0.44], [0.65, 0.43], [0.7, 0.425]]), 0.014, SIERRA_L) },
  { step: 0.003, mat: 'gloss', depth: 0.002, poly: [[0.002, 1.152], [0.03, 1.158], [0.036, 1.19], [0.03, 1.232], [0.002, 1.236]] },
  { step: 0.003, mat: 'tail', layer: 1, depth: 0.004, poly: [[0.002, 1.204], [0.03, 1.206], [0.032, 1.222], [0.002, 1.224]] },
]
const SIERRA_BODY = {
  L: SIERRA_L, W: 1.841,
  axles: [0.1878, 0.8168] as [number, number],
  tyreR: 0.365, tyreW: 0.225, rim: 0.661,
  archGap: 0.11, archSquare: 0.35, wellInset: 0.06,
  sill: [[0, 0.33], [0.02, 0.33], [0.04, 0.32], [0.08, 0.3], [0.12, 0.28], [0.18, 0.26], [0.3, 0.245], [0.45, 0.235], [0.6, 0.225], [0.72, 0.232], [0.85, 0.24], [0.92, 0.25], [0.95, 0.25], [0.97, 0.24], [0.985, 0.235], [1, 0.235]] as P2[],
  // the tail face up to the glass, the belt falling gently to the cowl, the long flat bonnet curving down to the light bar
  top: [[0, 1.285], [0.012, 1.287], [0.03, 1.283], [0.1, 1.27], [0.2, 1.255], [0.29, 1.243], [0.38, 1.235], [0.45, 1.225], [0.5, 1.218], [0.6, 1.208], [0.7, 1.203], [0.755, 1.198], [0.77, 1.186], [0.8, 1.176], [0.85, 1.161], [0.88, 1.146], [0.9, 1.132], [0.92, 1.112], [0.94, 1.089], [0.96, 1.066], [0.97, 1.055], [0.98, 1.047], [0.99, 1.041], [1, 1.037]] as P2[],
  width: [[0, 0.92], [0.008, 0.945], [0.02, 0.968], [0.05, 0.988], [0.1, 0.998], [0.5, 1], [0.88, 0.997], [0.93, 0.988], [0.965, 0.972], [0.99, 0.952], [1, 0.935]] as P2[],
  crown: 0.012,
  bulge: 0.02,
  haunch: 0.03,
  topRadius: 0.08,
  noseSweep: 0.1,
  tailSweep: 0.08,
  greenhouse: {
    u0: 0.012, u1: 0.755, tumble: 0.86,
    // the upright tailgate glass, the long flat roof (rails left out), the raked windscreen
    top: [[0.012, 1.287], [0.018, 1.33], [0.022, 1.4], [0.026, 1.52], [0.029, 1.615], [0.032, 1.645], [0.04, 1.658], [0.06, 1.667], [0.1, 1.683], [0.15, 1.694], [0.2, 1.7], [0.3, 1.703], [0.4, 1.7], [0.47, 1.696], [0.5, 1.69], [0.52, 1.676], [0.54, 1.66], [0.56, 1.64], [0.58, 1.625], [0.6, 1.585], [0.62, 1.545], [0.64, 1.496], [0.66, 1.443], [0.68, 1.394], [0.7, 1.345], [0.72, 1.291], [0.74, 1.235], [0.755, 1.198]] as P2[],
  },
  roof: { u0: 0.03018, u1: 0.52951, black: true },
  pillars: [
    // the wide body-coloured fin behind the front door glass, the black B-pillar strip ahead of it
    { bottom: [sierraU(0.377), sierraU(0.455)] as [number, number], top: [sierraU(0.404), sierraU(0.455)] as [number, number], black: false, step: 0.005 },
    { bottom: [sierraU(0.455), sierraU(0.465)] as [number, number], top: [sierraU(0.455), sierraU(0.465)] as [number, number], black: true },
  ],
  doors: [[sierraU(0.721), sierraU(0.709)], [sierraU(0.472), sierraU(0.464)], [sierraU(0.212), sierraU(0.218)]] as [number, number][],
  rear: SIERRA_REAR,
  plates: { front: 0.6, rear: 0.59 },
  rails: 'black' as const,
  mirrors: 'black' as const,
  dropSlivers: true,
}

/** Tata Sierra (Nov 2025 relaunch, petrol/diesel). 4340 × 1841 × 1715, wheelbase 2730, 225/55 R19 (top trim).
 *  Shares its body with the Sierra.ev: the side profile traced from the EV's gallery side photo (cleaner, on tarmac) and
 *  checked against this car's own (sand hides its sill). The near-upright tailgate glass, the long flat roof with the
 *  alpine quarter glass and the spoiler's body-coloured "ears", the wide body-coloured fin behind the front doors; the
 *  gloss-black grille band under the full-width light bar with the headlamps at its ends, the body-coloured band with the
 *  corner lamp pods, the black lower bumper with its satin skid plate, from the straight front and close-up photos. */
export const SIERRA_X: CarSpec = sierraK({
  ...SIERRA_BODY,
  id: 'tata-sierra',
  name: 'Tata Sierra',
  H: 1.715,
  wheel: { style: 'blade', spokes: 4 },
  cladding: { top: sierraP([[0, 0.68], [0.02, 0.64], [0.05, 0.62], [0.08, 0.6], [0.28, 0.52], [0.3, 0.5], [0.33, 0.56], [0.36, 0.59], [0.5, 0.595], [0.6, 0.585], [0.65, 0.57], [0.7, 0.52], [0.72, 0.49], [0.75, 0.48], [0.93, 0.47], [0.955, 0.47], [0.975, 0.46], [1, 0.45]]), flare: 0.045, cut: true },
  front: [
    // the gloss-black grille band under the light bar, the headlamps along its foot
    { step: 0.005, mat: 'gloss', depth: 0.006, poly: smooth(both([[0, 0.778], [0.79, 0.778], [0.815, 0.79], [0.822, 0.83], [0.822, 0.975], [0.81, 0.988], [0, 0.99]]), 1) },
    { step: 0.005, mat: 'trim', layer: 1, depth: 0.006, poly: both([[0, 0.985], [0.8, 0.985], [0.82, 0.99], [0.825, 1.0], [0.815, 1.016], [0, 1.018]]) },
    { step: 0.005, mat: 'drl', layer: 2, poly: both([[0, 0.996], [0.79, 0.996], [0.812, 1.0], [0.79, 1.008], [0, 1.008]]) },
    { step: 0.005, mat: 'head', layer: 1, mirror: true, poly: rrect(0.63, 0.795, 0.805, 0.83, 0.008) },
    // the corner lamp pods in the body-coloured band
    { step: 0.004, mat: 'gloss', mirror: true, depth: 0.006, poly: rrect(0.765, 0.55, 0.812, 0.685, 0.008) },
    { step: 0.004, mat: 'drl', layer: 1, mirror: true, poly: rrect(0.776, 0.6, 0.8, 0.672, 0.004) },
    // the black lower bumper (its top flat across the middle, falling to the corners), a satin line on the slope
    { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.265], [0.7, 0.265], [0.78, 0.3], [0.815, 0.36], [0.822, 0.45], [0.76, 0.49], [0.66, 0.57], [0.56, 0.645], [0.5, 0.655], [0, 0.655]]), 1) },
    { step: 0.004, mat: 'satin', layer: 1, mirror: true, depth: 0.004, poly: band([[0.79, 0.47], [0.72, 0.51], [0.65, 0.565]], 0.014) },
    // the lower grille between the skid plate's fangs, the skid plate
    { step: 0.005, mat: 'mesh', layer: 1, depth: 0.012, poly: both([[0, 0.368], [0.445, 0.368], [0.495, 0.515], [0, 0.515]]) },
    { step: 0.005, mat: 'satin', layer: 2, depth: 0.01, poly: smooth(both([[0, 0.3], [0.64, 0.3], [0.69, 0.315], [0.7, 0.36], [0.64, 0.368], [0.55, 0.5], [0.5, 0.5], [0.45, 0.368], [0, 0.368]]), 1) },
  ],
  side: SIERRA_SIDE,
  paint: '#d69c00', // Andaman Adventure (the gallery car's yellow), darkened for the studio lights
  plate: 'MH 12 SR 2026',
}, 0.978)

/** Tata Sierra.ev (2026). 4340 × 1841 × 1750, wheelbase 2730, 225/55 R19 (top trim). The Sierra's body traced from its own
 *  gallery side photo; the closed front: the light bar over a body-coloured panel, the headlamps in its lower corners,
 *  the black band and lower bumper with the corner lamps, the lower grille and satin skid plate, from the straight front
 *  photo and close-ups. */
export const SIERRA_EV_X: CarSpec = sierraK({
  ...SIERRA_BODY,
  id: 'tata-sierra-ev',
  name: 'Tata Sierra.ev',
  H: 1.75,
  wheel: { style: 'blade', spokes: 5 },
  cladding: { top: sierraP([[0, 0.68], [0.02, 0.64], [0.05, 0.62], [0.08, 0.6], [0.28, 0.52], [0.3, 0.5], [0.33, 0.56], [0.36, 0.59], [0.5, 0.595], [0.6, 0.585], [0.65, 0.57], [0.7, 0.52], [0.72, 0.49], [0.75, 0.48], [0.93, 0.47], [0.955, 0.48], [0.975, 0.62], [1, 0.655]]), flare: 0.045, cut: true },
  front: [
    // the full-width light bar on the bonnet's leading edge
    { step: 0.005, mat: 'trim', layer: 1, depth: 0.006, poly: both([[0, 0.985], [0.8, 0.985], [0.82, 0.99], [0.825, 1.0], [0.815, 1.016], [0, 1.018]]) },
    { step: 0.005, mat: 'drl', layer: 2, poly: both([[0, 0.996], [0.79, 0.996], [0.812, 1.0], [0.79, 1.008], [0, 1.008]]) },
    // the headlamps in the panel's lower corners
    { step: 0.004, mat: 'gloss', mirror: true, depth: 0.006, poly: smooth([[0.63, 0.8], [0.66, 0.772], [0.815, 0.772], [0.822, 0.8], [0.818, 0.862], [0.645, 0.862]], 1) },
    { step: 0.004, mat: 'head', layer: 1, mirror: true, poly: rrect(0.67, 0.79, 0.805, 0.83, 0.008) },
    // the black band across the face (gloss along its top) and the black lower bumper
    { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.265], [0.7, 0.265], [0.78, 0.3], [0.815, 0.36], [0.822, 0.5], [0.822, 0.762], [0.62, 0.745], [0, 0.716]]), 1) },
    { step: 0.005, mat: 'gloss', layer: 1, poly: both([[0, 0.668], [0.82, 0.675], [0.82, 0.757], [0.62, 0.741], [0, 0.712]]) },
    // the corner lamps
    { step: 0.004, mat: 'gloss', layer: 1, mirror: true, depth: 0.006, poly: rrect(0.755, 0.5, 0.805, 0.64, 0.008) },
    { step: 0.004, mat: 'drl', layer: 2, mirror: true, poly: rrect(0.772, 0.52, 0.79, 0.62, 0.004) },
    // the lower grille between the skid plate's fangs, the skid plate
    { step: 0.005, mat: 'mesh', layer: 1, depth: 0.012, poly: both([[0, 0.368], [0.445, 0.368], [0.495, 0.515], [0, 0.515]]) },
    { step: 0.005, mat: 'satin', layer: 2, depth: 0.01, poly: smooth(both([[0, 0.3], [0.64, 0.3], [0.69, 0.315], [0.7, 0.36], [0.64, 0.368], [0.55, 0.5], [0.5, 0.5], [0.45, 0.368], [0, 0.368]]), 1) },
  ],
  side: SIERRA_SIDE,
  paint: '#6f9893', // Rishikesh Rapids (the gallery car's mint teal), darkened for the studio lights
  ev: true,
  plate: 'MH 12 EV 2026',
}, 0.988)

const NIOS_L = 3.815
/** the gallery side photo reads 1.554 m over the low roof rails against the official 1.52: heights × 0.978 */
const NIOS_K = 0.978
const niosK = (pts: P2[]): P2[] => pts.map(([u, y]) => [u, +(y * NIOS_K).toFixed(4)] as P2)
/** the close camera spreads the photo's axles (0.1538, 0.8267) 4.8 % too far apart: map a photo u so they land on the
 *  official wheelbase (overhangs split as in the photo) */
const niosU = (u: number): number => {
  const a = 0.1538, b = 0.8267, A = 0.1682, B = 0.8104
  const m = u < a ? (u / a) * A : u > b ? B + ((u - b) / (1 - b)) * (1 - B) : A + ((u - a) / (b - a)) * (B - A)
  return +m.toFixed(5)
}
/** side features traced in photo u / photo metres → model u / metres */
const niosS = (pts: P2[]): P2[] => pts.map(([u, y]) => [niosU(u), +(y * NIOS_K).toFixed(4)] as P2)
const niosRectU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  rrectS(u0 * NIOS_L, y0, u1 * NIOS_L, y1, r).map(([x, y]) => [+(x / NIOS_L).toFixed(5), y] as P2)
/** the sideways Y of the LED DRL in each bumper pod: a short inner arm and two arms opening outwards */
const niosY = (cz: number, cy: number, s: number): P2[] => [
  [cz - 0.07 * s, cy - 0.009], [cz - 0.012, cy - 0.011], [cz + 0.045 * s, cy - 0.118 * s], [cz + 0.066 * s, cy - 0.108 * s],
  [cz + 0.018, cy], [cz + 0.066 * s, cy + 0.108 * s], [cz + 0.045 * s, cy + 0.118 * s], [cz - 0.012, cy + 0.011], [cz - 0.07 * s, cy + 0.009],
]

/** the grille's big honeycomb: rows of dark hexagon cells (pitch 0.1 m, every other row offset half a pitch) inside
 *  half-width hw, skipping the number plate */
const niosHoney = (ys: number[], hw: (y: number) => number): Decal[] =>
  ys.flatMap((y, row) => {
    const out: Decal[] = []
    for (let k = -8; k <= 8; k++) {
      const zc = k * 0.1 + (row % 2) * 0.05
      if (Math.abs(zc) + 0.042 > Math.min(hw(y), hw(y + 0.042))) continue
      if (Math.abs(zc) < 0.29 && y + 0.042 > 0.375 && y < 0.51) continue
      out.push({ step: 0.004, mat: 'trim', layer: 2, depth: 0.012, poly: [[zc - 0.042, y + 0.021], [zc - 0.024, y], [zc + 0.024, y], [zc + 0.042, y + 0.021], [zc + 0.024, y + 0.042], [zc - 0.024, y + 0.042]] })
    }
    return out
  })

/** Hyundai Grand i10 Nios (Jan 2023 facelift). 3815 × 1680 × 1520 (over the low roof rails), wheelbase 2450, 175/60 R15.
 *  Side profile from a levelled gallery side photo (1.554 m over the rails, the close camera's axles 4.8 % too far apart:
 *  heights × 0.978, the axles at the official wheelbase with the overhangs split as in the photo, and the doors, handles,
 *  fuel lid and lamp wraps mapped with them; the silhouette kept in photo u). Belt kick, tailgate-glass wrap, shut lines
 *  and lamps read off a metric grid of the cut-out; the swept headlamps, the wide honeycomb grille with its body-coloured
 *  DRL pods, the wrap-around tail lamps and the bumpers from the straight front and rear photos. */
export const GRAND_I10_NIOS: CarSpec = {
  id: 'hyundai-grand-i10-nios',
  name: 'Hyundai Grand i10 Nios',
  rakedEnds: true,
  dropSlivers: true,
  L: NIOS_L, W: 1.68, H: 1.52,
  axles: [0.1682, 0.8104],
  tyreR: 0.2955, tyreW: 0.175, rim: 0.645, wheel: { style: 'blade', spokes: 5 },
  archGap: 0.045, archSquare: 0.15,
  sill: niosK([[0, 0.33], [0.005, 0.29], [0.01, 0.275], [0.02, 0.265], [0.03, 0.258], [0.05, 0.245], [0.08, 0.235], [0.15, 0.22], [0.25, 0.202], [0.4, 0.205], [0.6, 0.21], [0.72, 0.205], [0.8, 0.2], [0.9, 0.2], [0.95, 0.2], [0.97, 0.212], [0.98, 0.22], [0.99, 0.235], [0.996, 0.26], [1, 0.32]]),
  // the raked tail under the tailgate glass; the body rising under the glass's wrap to the C-pillar, the belt falling
  // along the doors, the cowl, then the bonnet curving down to the nose (lowered by the crown)
  top: niosK([[0, 1.045], [0.01, 1.05], [0.02, 1.054], [0.03, 1.058], [0.04, 1.062], [0.06, 1.076], [0.08, 1.098], [0.1, 1.125], [0.12, 1.15], [0.14, 1.168], [0.16, 1.178], [0.175, 1.178], [0.19, 1.163], [0.2, 1.14], [0.21, 1.112], [0.22, 1.088], [0.24, 1.06], [0.27, 1.042], [0.3, 1.034], [0.4, 1.025], [0.5, 1.015], [0.6, 1.003], [0.68, 0.994], [0.71, 0.995], [0.725, 1.008], [0.74, 1.04], [0.755, 1.062], [0.77, 1.064], [0.79, 1.054], [0.81, 1.042], [0.83, 1.033], [0.85, 1.018], [0.87, 0.998], [0.89, 0.976], [0.91, 0.951], [0.93, 0.92], [0.95, 0.88], [0.96, 0.855], [0.97, 0.845], [0.98, 0.83], [0.99, 0.812], [0.996, 0.797], [1, 0.78]]),
  // round in plan: both ends taper hard into the corners
  width: [[0, 0.9], [0.006, 0.925], [0.018, 0.95], [0.04, 0.973], [0.08, 0.99], [0.15, 1], [0.45, 0.99], [0.8, 0.995], [0.86, 0.99], [0.92, 0.97], [0.955, 0.945], [0.978, 0.91], [0.992, 0.875], [1, 0.85]],
  crown: 0.015,
  bulge: 0.04,
  haunch: 0.06,
  topRadius: 0.06,
  noseSweep: 0.3,
  tailSweep: 0.24,
  greenhouse: {
    u0: 0.03, u1: 0.75, tumble: 0.62,
    // the tailgate glass wrapping round the tail up under the roof spoiler, the roof (rails left out), the windscreen
    top: niosK([[0.03, 1.06], [0.04, 1.08], [0.05, 1.11], [0.06, 1.15], [0.07, 1.195], [0.08, 1.237], [0.09, 1.278], [0.1, 1.318], [0.11, 1.37], [0.115, 1.408], [0.12, 1.432], [0.13, 1.443], [0.14, 1.45], [0.16, 1.464], [0.18, 1.479], [0.2, 1.493], [0.25, 1.505], [0.3, 1.516], [0.35, 1.524], [0.4, 1.528], [0.45, 1.526], [0.48, 1.52], [0.5, 1.511], [0.52, 1.5], [0.54, 1.486], [0.56, 1.469], [0.58, 1.444], [0.6, 1.414], [0.62, 1.374], [0.64, 1.333], [0.66, 1.292], [0.68, 1.247], [0.7, 1.205], [0.72, 1.163], [0.735, 1.125], [0.75, 1.07]]),
  },
  // the body-coloured roof spoiler overhangs the tailgate glass
  roof: { u0: 0.11889, u1: 0.55344, black: false },
  pillars: [
    // the black B-pillar (the black C-pillar panel and A-pillar read as glass)
    { bottom: [niosU(0.4125), niosU(0.435)], top: [niosU(0.4025), niosU(0.425)], black: true },
  ],
  doors: [[niosU(0.715), niosU(0.728)], [niosU(0.4375), niosU(0.4325)]],
  front: [
    // the swept headlamps up on the corners: dark housing, projector, amber indicator at the inner end
    { step: 0.004, mat: 'trim', mirror: true, depth: 0.004, poly: smooth([[0.52, 0.692], [0.62, 0.7], [0.69, 0.71], [0.725, 0.73], [0.735, 0.79], [0.73, 0.86], [0.712, 0.888], [0.68, 0.872], [0.63, 0.82], [0.57, 0.745]], 1) },
    { step: 0.004, mat: 'head', mirror: true, layer: 1, depth: 0.008, poly: rrect(0.64, 0.765, 0.712, 0.837, 0.034) },
    { step: 0.004, mat: 'amber', mirror: true, layer: 1, depth: 0.006, poly: smooth([[0.57, 0.712], [0.635, 0.716], [0.64, 0.736], [0.6, 0.738]], 1) },
    { step: 0.004, mat: 'drl', mirror: true, layer: 1, depth: 0.006, poly: band([[0.545, 0.703], [0.62, 0.709], [0.7, 0.719], [0.738, 0.735]], 0.012) },
    // the wide gloss-black honeycomb grille across the bumper, out round the DRL pods
    { step: 0.004, mat: 'gloss', poly: smooth(both([[0, 0.232], [0.55, 0.236], [0.64, 0.256], [0.7, 0.3], [0.724, 0.38], [0.73, 0.5], [0.722, 0.565], [0.7, 0.59], [0, 0.59]]), 1) },
    ...niosHoney([0.252, 0.302, 0.352, 0.402, 0.452, 0.502], (y) => (y < 0.3 ? 0.46 + (y - 0.25) * 1.2 : 0.53)),
    // the body-coloured pods at the grille's corners carrying the sideways-Y LED DRLs
    { step: 0.004, mat: 'body', mirror: true, layer: 2, depth: 0.01, poly: smooth([[0.53, 0.3], [0.6, 0.285], [0.68, 0.29], [0.69, 0.33], [0.69, 0.545], [0.67, 0.558], [0.53, 0.558], [0.53, 0.3]], 1) },
    { step: 0.004, mat: 'drl', mirror: true, layer: 3, depth: 0.014, poly: niosY(0.615, 0.42, 0.75) },
    // the black lower lip
    { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.205], [0.58, 0.205], [0.64, 0.22], [0.66, 0.24], [0, 0.24]]), 1) },
  ],
  rear: [
    // the tail lamps: red lens, a red light guide round the top and outer edge, the clear reversing lamp low inside
    { step: 0.004, mat: 'trim', mirror: true, depth: 0.006, poly: smooth([[0.6, 0.99], [0.728, 1.0], [0.744, 0.95], [0.744, 0.86], [0.725, 0.805], [0.65, 0.8], [0.615, 0.855]], 1) },
    { step: 0.004, mat: 'tail', mirror: true, layer: 1, depth: 0.01, poly: smooth([[0.612, 0.982], [0.726, 0.991], [0.738, 0.95], [0.738, 0.885], [0.632, 0.882], [0.615, 0.92]], 1) },
    { step: 0.004, mat: 'silver', mirror: true, layer: 1, depth: 0.008, poly: rrect(0.645, 0.818, 0.735, 0.87, 0.012) },
    // the dark garnish along the tailgate's top edge between the lamps
    { step: 0.004, mat: 'gloss', poly: both([[0, 0.97], [0.6, 0.975], [0.6, 0.99], [0, 0.985]]) },
    // the lower tailgate panel's shut line, dipping under the lamps
    { step: 0.004, mat: 'gloss', depth: 0.001, poly: band([[-0.612, 0.83], [-0.6, 0.762], [-0.565, 0.705], [-0.5, 0.677], [-0.3, 0.666], [0, 0.664], [0.3, 0.666], [0.5, 0.677], [0.565, 0.705], [0.6, 0.762], [0.612, 0.83]], 0.012) },
    // slanted reflectors in the bumper corners, the black lower bumper
    { step: 0.004, mat: 'reflector', mirror: true, depth: 0.004, poly: [[0.64, 0.37], [0.695, 0.362], [0.715, 0.49], [0.66, 0.505]] },
    { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.24], [0.58, 0.24], [0.64, 0.255], [0.66, 0.29], [0.6, 0.305], [0, 0.305]]), 1) },
  ],
  side: [
    // chrome door handles in dark recesses
    { step: 0.004, mat: 'gloss', depth: 0.002, poly: niosRectU(niosU(0.448), 0.872, niosU(0.5), 0.906, 0.012) },
    { step: 0.004, mat: 'chrome', layer: 1, depth: 0.008, poly: niosRectU(niosU(0.452), 0.878, niosU(0.497), 0.898, 0.008) },
    { step: 0.004, mat: 'gloss', depth: 0.002, poly: niosRectU(niosU(0.18), 0.872, niosU(0.248), 0.906, 0.012) },
    { step: 0.004, mat: 'chrome', layer: 1, depth: 0.008, poly: niosRectU(niosU(0.184), 0.878, niosU(0.244), 0.898, 0.008) },
    // the rear door's curved rear edge, from under the C-pillar round over the arch
    { step: 0.004, mat: 'gloss', depth: 0.001, poly: sideBand(niosS([[0.287, 0.3], [0.265, 0.365], [0.22, 0.48], [0.18, 0.655], [0.16, 0.77], [0.152, 0.92], [0.155, 1.06], [0.162, 1.12]]), 0.012, NIOS_L) },
    // the round fuel lid
    { step: 0.004, mat: 'gloss', depth: 0.001, poly: sideBand([...Array.from({ length: 33 }, (_, i) => { const a = (i / 32) * Math.PI * 2; return [niosU(0.11) + (0.085 * Math.cos(a)) / NIOS_L, 0.83 * NIOS_K + 0.085 * Math.sin(a)] as P2 })], 0.012, NIOS_L) },
    // the tail lamp wrapping onto the flank to a point
    { step: 0.003, mat: 'trim', depth: 0.002, poly: smooth(niosS([[0.002, 0.83], [0.02, 0.815], [0.04, 0.85], [0.06, 0.888], [0.085, 0.94], [0.103, 0.99], [0.09, 1.002], [0.06, 1.004], [0.03, 1.0], [0.002, 0.99]]), 1) },
    { step: 0.003, mat: 'tail', layer: 1, depth: 0.006, poly: smooth(niosS([[0.002, 0.9], [0.05, 0.9], [0.065, 0.91], [0.085, 0.948], [0.095, 0.988], [0.06, 0.994], [0.03, 0.99], [0.002, 0.982]]), 1) },
    { step: 0.003, mat: 'silver', layer: 1, depth: 0.006, poly: smooth(niosS([[0.002, 0.835], [0.018, 0.828], [0.04, 0.86], [0.05, 0.888], [0.002, 0.888]]), 1) },
    // the headlamp sweeping back along the wing
    { step: 0.004, mat: 'trim', depth: 0.004, poly: smooth(niosS([[0.985, 0.73], [0.983, 0.79], [0.97, 0.84], [0.94, 0.892], [0.9, 0.92], [0.868, 0.925], [0.885, 0.894], [0.92, 0.818], [0.95, 0.752], [0.972, 0.73]]), 1) },
    { step: 0.004, mat: 'drl', layer: 1, depth: 0.006, poly: sideBand(niosS([[0.982, 0.742], [0.968, 0.742], [0.948, 0.772], [0.925, 0.822]]), 0.012, NIOS_L) },
  ],
  plates: { front: 0.44, rear: 0.445 },
  mirrors: 'body',
  paint: '#860010', // Fiery Red, darkened for the studio lights
  plate: 'MH 12 GN 2026',
}

const AURA_L = 3.995
/** the gallery side photo reads 1.562 m against the official 1.52: heights × 0.973 */
const AURA_K = 0.973
const auraK = (pts: P2[]): P2[] => pts.map(([u, y]) => [u, +(y * AURA_K).toFixed(4)] as P2)
/** the close camera spreads the photo's axles (0.1965, 0.8346) 4 % too far apart: map a photo u so they land on the
 *  official wheelbase (overhangs split as in the photo) */
const auraU = (u: number): number => {
  const a = 0.1965, b = 0.8346, A = 0.21, B = 0.8233
  const m = u < a ? (u / a) * A : u > b ? B + ((u - b) / (1 - b)) * (1 - B) : A + ((u - a) / (b - a)) * (B - A)
  return +m.toFixed(5)
}
const auraS = (pts: P2[]): P2[] => pts.map(([u, y]) => [auraU(u), +(y * AURA_K).toFixed(4)] as P2)
const auraRectU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  rrectS(u0 * AURA_L, y0, u1 * AURA_L, y1, r).map(([x, y]) => [+(x / AURA_L).toFixed(5), y] as P2)

/** Hyundai Aura (Jan 2023 facelift), the Grand i10 Nios's sedan. 3995 × 1680 × 1520, wheelbase 2450, 175/60 R15.
 *  Built from the Nios: the same headlamps, plan rounding and sections, with the Aura's own side profile (a levelled
 *  gallery side photo: 1.562 m, axles 4 % too far apart, so heights × 0.973 and the axles at the official wheelbase,
 *  doors, handles and lamps mapped with them), the rear glass running down to a short boot with its lip, the wide
 *  hexagon grille with L-shaped DRLs under a slim upper grille, and the wide tail lamps joined by a chrome strip, from
 *  the straight front and rear photos. */
export const AURA: CarSpec = {
  ...GRAND_I10_NIOS,
  id: 'hyundai-aura',
  name: 'Hyundai Aura',
  L: AURA_L, W: 1.68, H: 1.52,
  axles: [0.21, 0.8233],
  wheel: { style: 'split', spokes: 4 }, rimTone: 'dark',
  sill: auraK([[0, 0.36], [0.005, 0.34], [0.01, 0.33], [0.02, 0.31], [0.03, 0.298], [0.05, 0.279], [0.08, 0.261], [0.11, 0.245], [0.2, 0.225], [0.28, 0.21], [0.35, 0.222], [0.5, 0.228], [0.7, 0.23], [0.75, 0.224], [0.85, 0.21], [0.93, 0.198], [0.95, 0.2], [0.97, 0.212], [0.98, 0.22], [0.99, 0.235], [0.996, 0.255], [1, 0.3]]),
  // the boot: its upright tail face and lip, the flat deck to the rear glass; the belt rising along the rear glass's
  // foot to the C-pillar, falling along the doors, the cowl, then the Nios's bonnet line (lowered by the crown)
  top: auraK([[0, 1.0], [0.004, 1.1], [0.01, 1.148], [0.02, 1.163], [0.04, 1.168], [0.07, 1.172], [0.1, 1.18], [0.15, 1.183], [0.2, 1.176], [0.215, 1.162], [0.23, 1.135], [0.25, 1.11], [0.28, 1.09], [0.3, 1.077], [0.35, 1.066], [0.42, 1.056], [0.5, 1.046], [0.6, 1.036], [0.7, 1.027], [0.72, 1.028], [0.735, 1.05], [0.75, 1.083], [0.765, 1.093], [0.78, 1.087], [0.8, 1.066], [0.82, 1.054], [0.84, 1.046], [0.86, 1.028], [0.88, 1.009], [0.9, 0.986], [0.92, 0.952], [0.94, 0.922], [0.95, 0.9], [0.96, 0.878], [0.97, 0.86], [0.98, 0.845], [0.99, 0.83], [0.996, 0.815], [1, 0.8]]),
  width: [[0, 0.88], [0.006, 0.91], [0.018, 0.94], [0.04, 0.965], [0.08, 0.985], [0.15, 1], [0.45, 0.99], [0.8, 0.995], [0.86, 0.99], [0.92, 0.97], [0.955, 0.945], [0.978, 0.91], [0.992, 0.875], [1, 0.85]],
  greenhouse: {
    u0: 0.1, u1: 0.755, tumble: 0.62,
    // the rear glass rising off the boot deck, the roof (shark-fin left out), the windscreen
    top: auraK([[0.1, 1.18], [0.11, 1.212], [0.12, 1.238], [0.13, 1.263], [0.14, 1.286], [0.15, 1.309], [0.16, 1.331], [0.17, 1.353], [0.18, 1.372], [0.19, 1.39], [0.2, 1.408], [0.21, 1.425], [0.22, 1.442], [0.23, 1.459], [0.24, 1.474], [0.25, 1.488], [0.27, 1.506], [0.3, 1.523], [0.35, 1.546], [0.4, 1.556], [0.43, 1.559], [0.46, 1.556], [0.5, 1.549], [0.52, 1.539], [0.55, 1.524], [0.58, 1.501], [0.6, 1.476], [0.62, 1.442], [0.64, 1.405], [0.66, 1.364], [0.68, 1.322], [0.7, 1.28], [0.72, 1.24], [0.74, 1.198], [0.755, 1.14]]),
  },
  roof: { u0: 0.25326, u1: 0.55622, black: false },
  pillars: [
    // the black B-pillar (the black C-pillar panel and A-pillar read as glass)
    { bottom: [auraU(0.435), auraU(0.461)], top: [auraU(0.44), auraU(0.466)], black: true },
  ],
  doors: [[auraU(0.729), auraU(0.745)], [auraU(0.466), auraU(0.465)]],
  front: [
    // the Nios's swept headlamps
    ...GRAND_I10_NIOS.front.slice(0, 4),
    // the slim gloss-black upper grille between the headlamps' inner tips
    { step: 0.004, mat: 'gloss', poly: smooth(both([[0, 0.722], [0.47, 0.722], [0.53, 0.73], [0.535, 0.745], [0.5, 0.768], [0, 0.77]]), 1) },
    // the wide hexagon grille, its lower corners cut away by body-coloured wedges, the L-shaped DRLs at its outer ends
    { step: 0.004, mat: 'gloss', poly: smooth(both([[0, 0.252], [0.43, 0.252], [0.52, 0.326], [0.6, 0.452], [0.635, 0.53], [0.665, 0.545], [0.7, 0.545], [0.725, 0.58], [0.72, 0.614], [0, 0.614]]), 1) },
    ...niosHoney([0.27, 0.32, 0.37, 0.42, 0.47, 0.52, 0.565], (y) => Math.min(0.66, 0.4 + (y - 0.252) * 1.2)),
    { step: 0.004, mat: 'drl', mirror: true, layer: 2, depth: 0.012, poly: [[0.67, 0.37], [0.692, 0.37], [0.692, 0.566], [0.6, 0.566], [0.6, 0.548], [0.67, 0.548]] },
    // the black lower lip
    { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.205], [0.58, 0.205], [0.64, 0.22], [0.66, 0.24], [0, 0.24]]), 1) },
  ],
  rear: [
    // the boot lid's shut line round the lamps and plate panel
    { step: 0.004, mat: 'gloss', depth: 0.001, poly: band([[-0.64, 0.97], [-0.634, 0.86], [-0.625, 0.77], [-0.6, 0.725], [-0.52, 0.708], [0, 0.705], [0.52, 0.708], [0.6, 0.725], [0.625, 0.77], [0.634, 0.86], [0.64, 0.97]], 0.012) },
    // the wide tail lamps: smoked housing, red light guides along the top and the bottom, a clear lamp inside
    { step: 0.004, mat: 'trim', mirror: true, layer: 1, depth: 0.006, poly: smooth([[0.38, 0.82], [0.47, 0.848], [0.57, 0.905], [0.7, 0.935], [0.735, 0.925], [0.735, 0.845], [0.71, 0.81], [0.52, 0.8]], 1) },
    { step: 0.004, mat: 'tail', mirror: true, layer: 2, depth: 0.01, poly: band([[0.47, 0.84], [0.57, 0.893], [0.7, 0.922], [0.725, 0.915]], 0.014) },
    { step: 0.004, mat: 'tail', mirror: true, layer: 2, depth: 0.01, poly: band([[0.33, 0.792], [0.52, 0.808], [0.7, 0.82], [0.725, 0.83]], 0.013) },
    { step: 0.004, mat: 'silver', mirror: true, layer: 2, depth: 0.008, poly: smooth([[0.6, 0.85], [0.7, 0.86], [0.715, 0.9], [0.66, 0.895], [0.6, 0.875]], 1) },
    // the chrome strip across the boot lid joining the lamps' lower guides
    { step: 0.004, mat: 'chrome', layer: 1, depth: 0.006, poly: both([[0, 0.772], [0.33, 0.775], [0.36, 0.788], [0, 0.786]]) },
    // the black wedges round the bumper's corner reflectors, the black lower bumper
    { step: 0.004, mat: 'trim', mirror: true, depth: 0.004, poly: smooth([[0.52, 0.53], [0.722, 0.53], [0.722, 0.39], [0.68, 0.39]], 1) },
    { step: 0.004, mat: 'reflector', mirror: true, layer: 1, depth: 0.006, poly: rrect(0.682, 0.4, 0.712, 0.515, 0.008) },
    { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.3], [0.6, 0.3], [0.68, 0.31], [0.72, 0.34], [0.72, 0.37], [0, 0.37]]), 1) },
  ],
  side: [
    // chrome door handles in dark recesses
    { step: 0.004, mat: 'gloss', depth: 0.002, poly: auraRectU(auraU(0.484), 0.873, auraU(0.547), 0.91, 0.012) },
    { step: 0.004, mat: 'chrome', layer: 1, depth: 0.008, poly: auraRectU(auraU(0.488), 0.879, auraU(0.543), 0.9, 0.008) },
    { step: 0.004, mat: 'gloss', depth: 0.002, poly: auraRectU(auraU(0.222), 0.873, auraU(0.29), 0.91, 0.012) },
    { step: 0.004, mat: 'chrome', layer: 1, depth: 0.008, poly: auraRectU(auraU(0.226), 0.879, auraU(0.286), 0.9, 0.008) },
    // the rear door's curved rear edge, from under the C-pillar round over the arch
    { step: 0.004, mat: 'gloss', depth: 0.001, poly: sideBand(auraS([[0.344, 0.3], [0.3125, 0.32], [0.281, 0.38], [0.24, 0.5], [0.208, 0.67], [0.195, 0.86], [0.198, 1.0], [0.212, 1.12]]), 0.012, AURA_L) },
    // the round fuel lid
    { step: 0.004, mat: 'gloss', depth: 0.001, poly: sideBand([...Array.from({ length: 33 }, (_, i) => { const a = (i / 32) * Math.PI * 2; return [auraU(0.159) + (0.085 * Math.cos(a)) / AURA_L, 0.84 * AURA_K + 0.085 * Math.sin(a)] as P2 })], 0.012, AURA_L) },
    // the tail lamp wrapping round the corner, a dark slot running forward from it
    { step: 0.003, mat: 'trim', depth: 0.002, poly: smooth(auraS([[0.002, 0.85], [0.03, 0.85], [0.06, 0.87], [0.085, 0.94], [0.09, 0.965], [0.06, 0.968], [0.03, 0.97], [0.002, 0.97]]), 1) },
    { step: 0.003, mat: 'tail', layer: 1, depth: 0.006, poly: smooth(auraS([[0.002, 0.9], [0.03, 0.905], [0.035, 0.955], [0.002, 0.958]]), 1) },
    // the headlamp sweeping back along the wing
    { step: 0.004, mat: 'trim', depth: 0.004, poly: smooth(auraS([[0.985, 0.76], [0.983, 0.81], [0.97, 0.855], [0.94, 0.905], [0.9, 0.932], [0.875, 0.94], [0.89, 0.91], [0.915, 0.84], [0.95, 0.78], [0.972, 0.76]]), 1) },
    { step: 0.004, mat: 'drl', layer: 1, depth: 0.006, poly: sideBand(auraS([[0.982, 0.77], [0.968, 0.77], [0.948, 0.795], [0.93, 0.83]]), 0.012, AURA_L) },
  ],
  plates: { front: 0.46, rear: 0.46 },
  mirrors: 'body',
  paint: '#8d9093', // Typhoon Silver, darkened for the studio lights
  plate: 'MH 12 AU 2026',
}

const CELERIO_L = 3.695
/** a side outline from a rounded rectangle given in u (0…1) and metres */
const celerioU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  rrectS(u0 * CELERIO_L, y0, u1 * CELERIO_L, y1, r).map(([x, y]) => [+(x / CELERIO_L).toFixed(5), y] as P2)
/** a circle outline (fog lamps) */
const celerioCircle = (zc: number, yc: number, r: number, n = 36): P2[] =>
  Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return [+(zc + r * Math.cos(a)).toFixed(4), +(yc + r * Math.sin(a)).toFixed(4)] as P2 })
/** glasshouse station i (of 140) between u0 0.172 and u1 0.738: the roof boundary sits exactly on one */
const celerioSt = (i: number) => +(0.172 + 0.566 * (0.5 - 0.5 * Math.cos((Math.PI * i) / 140))).toFixed(5)

/** Maruti Suzuki Celerio (2021, 2nd gen). 3695 × 1655 × 1555, wheelbase 2435, 175/60 R15 (ZXi Plus).
 *  Side profile from another portal's long-lens side photo (1.571 m measured, axles 1.6 % apart): heights × 0.99, axles
 *  at the official wheelbase with the overhangs split as in the photo. The round hatch: a raked tailgate glass between
 *  big body-coloured D-pillars, the teardrop tail lamps on the corners, the domed roof and the short round bonnet.
 *  Lamps, grille and bumpers from the straight front and rear photos and the close-ups. */
export const CELERIO: CarSpec = {
  id: 'maruti-celerio',
  name: 'Maruti Suzuki Celerio',
  rakedEnds: true,
  dropSlivers: true,
  // the tailgate glass is a rear decal reaching 0.43 m in from the tail
  endReach: [0.46, 0.3],
  L: CELERIO_L, W: 1.655, H: 1.555,
  axles: [0.1579, 0.8169],
  tyreR: 0.2955, tyreW: 0.175, rim: 0.645, wheel: { style: 'twin', spokes: 8 },
  archGap: 0.055, archSquare: 0.1,
  sill: [[0, 0.42], [0.01, 0.38], [0.02, 0.355], [0.03, 0.343], [0.05, 0.338], [0.08, 0.318], [0.12, 0.29], [0.2, 0.255], [0.25, 0.24], [0.45, 0.234], [0.6, 0.224], [0.7, 0.21], [0.73, 0.2], [0.8, 0.19], [0.9, 0.19], [0.93, 0.196], [0.96, 0.2], [0.98, 0.214], [0.99, 0.232], [0.996, 0.27], [1, 0.33]],
  // the rear bumper rounding up beside the lamps, the raked tailgate up to the roof spoiler (the body forms the D-pillar),
  // a short flat run to the pillar's front edge, the cliff down to the belt; the belt falling
  // gently forward under the windows, the cowl, then the short round bonnet down to the nose
  top: [[0, 0.745], [0.004, 0.79], [0.008, 0.85], [0.012, 0.93], [0.016, 1.0], [0.02, 1.06], [0.025, 1.11], [0.03, 1.15], [0.035, 1.18], [0.04, 1.205], [0.05, 1.226], [0.06, 1.25], [0.07, 1.281], [0.08, 1.314], [0.09, 1.35], [0.1, 1.384], [0.11, 1.42], [0.12, 1.46], [0.13, 1.487], [0.14, 1.498], [0.155, 1.507], [0.172, 1.516], [0.175, 1.45], [0.178, 1.36], [0.181, 1.27], [0.185, 1.205], [0.19, 1.185], [0.22, 1.172], [0.3, 1.142], [0.36, 1.125], [0.445, 1.105], [0.55, 1.085], [0.645, 1.07], [0.7, 1.078], [0.738, 1.09], [0.75, 1.083], [0.76, 1.068], [0.78, 1.045], [0.8, 1.028], [0.82, 1.015], [0.84, 1.003], [0.86, 0.99], [0.88, 0.976], [0.9, 0.958], [0.92, 0.94], [0.94, 0.917], [0.96, 0.893], [0.97, 0.876], [0.98, 0.862], [0.99, 0.848], [0.995, 0.832], [0.998, 0.8], [1, 0.74]],
  // round in plan: both ends taper into the corners
  width: [[0, 0.78], [0.006, 0.85], [0.015, 0.9], [0.035, 0.945], [0.07, 0.975], [0.13, 0.995], [0.17, 1], [0.45, 0.99], [0.8, 0.995], [0.86, 0.99], [0.92, 0.975], [0.955, 0.955], [0.978, 0.925], [0.992, 0.885], [1, 0.85]],
  crown: 0.015,
  bulge: 0.04,
  // the D-pillars lean in above the tail lamps (tumblehome at the tail only: the shoulder sits above the belt elsewhere)
  shoulder: { y: [[0, 1.21], [0.165, 1.21], [0.18, 1.35], [0.195, 1.6], [1, 1.6]], inset: 0.22 },
  haunch: 0.05,
  topRadius: 0.1,
  noseSweep: 0.12,
  tailSweep: 0.12,
  greenhouse: {
    u0: 0.172, u1: 0.738, tumble: 0.68, followBody: 0.19,
    // the domed roof from the D-pillar's front edge, the windscreen down to the cowl
    top: [[0.172, 1.513], [0.18, 1.517], [0.2, 1.527], [0.25, 1.543], [0.3, 1.551], [0.4, 1.553], [0.45, 1.547], [0.5, 1.532], [0.55, 1.51], [0.58, 1.482], [0.6, 1.454], [0.62, 1.41], [0.64, 1.358], [0.66, 1.31], [0.68, 1.267], [0.7, 1.224], [0.72, 1.165], [0.738, 1.1]],
  },
  roof: { u0: 0.172, u1: celerioSt(90), black: false },
  pillars: [
    // the black B-pillar (the body itself forms the D-pillar); the A-pillar is left as dark glass
    { bottom: [0.407, 0.443], top: [0.407, 0.443], black: true },
  ],
  doors: [[0.716, 0.724], [0.435, 0.44]],
  front: [
    // the gloss-black grille between the headlamps with its dark mesh, the chrome bar running into the lamps
    { step: 0.004, mat: 'gloss', poly: smooth(both([[0, 0.662], [0.22, 0.665], [0.36, 0.688], [0.42, 0.725], [0.45, 0.765], [0.44, 0.782], [0, 0.785]]), 1) },
    { step: 0.004, mat: 'mesh', layer: 1, poly: smooth(both([[0, 0.674], [0.22, 0.677], [0.35, 0.698], [0.405, 0.73], [0.42, 0.755], [0, 0.758]]), 1) },
    { step: 0.004, mat: 'chrome', layer: 2, depth: 0.01, poly: both([[0, 0.756], [0.3, 0.758], [0.45, 0.762], [0.5, 0.766], [0.5, 0.78], [0.45, 0.776], [0.3, 0.772], [0, 0.77]]) },
    // the headlamps on the corners: a dark bezel, the chrome reflector bowl and the clear lens
    { step: 0.004, mat: 'gloss', mirror: true, depth: 0.004, poly: smooth([[0.5, 0.775], [0.53, 0.738], [0.6, 0.705], [0.67, 0.71], [0.705, 0.74], [0.712, 0.8], [0.703, 0.84], [0.65, 0.856], [0.57, 0.84]], 1) },
    { step: 0.004, mat: 'silver', mirror: true, layer: 1, depth: 0.006, poly: smooth([[0.53, 0.775], [0.56, 0.745], [0.62, 0.722], [0.67, 0.727], [0.695, 0.75], [0.7, 0.8], [0.69, 0.83], [0.65, 0.84], [0.58, 0.825]], 1) },
    { step: 0.004, mat: 'head', mirror: true, layer: 2, depth: 0.008, poly: celerioCircle(0.63, 0.778, 0.034) },
    // the black lower intake across the bumper with the round fog lamps at its ends and a slatted centre
    { step: 0.004, mat: 'trim', poly: smooth(both([[0, 0.36], [0.5, 0.36], [0.6, 0.372], [0.65, 0.41], [0.668, 0.48], [0.66, 0.56], [0.635, 0.6], [0.55, 0.61], [0, 0.61]]), 1) },
    { step: 0.004, mat: 'slats', layer: 1, depth: 0.004, poly: rrect(-0.4, 0.39, 0.4, 0.47, 0.01) },
    { step: 0.004, mat: 'gloss', mirror: true, layer: 1, depth: 0.006, poly: celerioCircle(0.585, 0.475, 0.05) },
    { step: 0.004, mat: 'chrome', mirror: true, layer: 2, depth: 0.008, poly: celerioCircle(0.585, 0.475, 0.032) },
    { step: 0.004, mat: 'silver', mirror: true, layer: 3, depth: 0.01, poly: celerioCircle(0.585, 0.475, 0.02) },
    // the slot low in the lip
    { step: 0.004, mat: 'trim', poly: rrect(-0.38, 0.29, 0.38, 0.318, 0.01) },
  ],
  rear: [
    // the tailgate glass between the D-pillars, under the roof spoiler
    { step: 0.005, mat: 'gloss', depth: 0.003, poly: smooth(both([[0, 1.19], [0.57, 1.19], [0.6, 1.205], [0.595, 1.25], [0.57, 1.35], [0.535, 1.425], [0.5, 1.45], [0, 1.455]]), 1) },
    // teardrop tail lamps on the corners: red above, the clear reversing block with the amber indicator below
    { step: 0.004, mat: 'tail', mirror: true, layer: 1, depth: 0.008, poly: smooth([[0.6, 1.195], [0.545, 1.175], [0.5, 1.11], [0.5, 1.01], [0.523, 0.94], [0.62, 0.922], [0.74, 0.94], [0.758, 1.03], [0.74, 1.09], [0.672, 1.15]], 1) },
    { step: 0.004, mat: 'silver', mirror: true, layer: 2, depth: 0.009, poly: smooth([[0.53, 0.955], [0.62, 0.94], [0.7, 0.952], [0.71, 1.02], [0.6, 1.03], [0.525, 1.025]], 1) },
    { step: 0.004, mat: 'amber', mirror: true, layer: 3, depth: 0.01, poly: smooth([[0.64, 0.955], [0.7, 0.958], [0.705, 1.015], [0.64, 1.02]], 1) },
    // the tailgate's shut line round the lower panel, from lamp to lamp
    { step: 0.004, mat: 'gloss', depth: 0.001, poly: band([[-0.52, 0.94], [-0.5, 0.86], [-0.46, 0.8], [-0.4, 0.778], [0, 0.772], [0.4, 0.778], [0.46, 0.8], [0.5, 0.86], [0.52, 0.94]], 0.012) },
    // the reflectors either side of the plate recess, the black lower edge of the bumper
    { step: 0.004, mat: 'reflector', mirror: true, depth: 0.006, poly: rrect(0.45, 0.57, 0.63, 0.6, 0.01) },
    { step: 0.004, mat: 'trim', poly: smooth(both([[0, 0.36], [0.62, 0.36], [0.68, 0.38], [0.66, 0.4], [0, 0.4]]), 1) },
  ],
  side: [
    // body-coloured pull handles in dark recesses
    { step: 0.004, mat: 'gloss', poly: celerioU(0.465, 0.912, 0.51, 0.968, 0.012) },
    { step: 0.004, mat: 'body', layer: 1, depth: 0.012, poly: celerioU(0.468, 0.918, 0.507, 0.945, 0.008) },
    { step: 0.004, mat: 'gloss', poly: celerioU(0.19, 0.985, 0.235, 1.045, 0.012) },
    { step: 0.004, mat: 'body', layer: 1, depth: 0.012, poly: celerioU(0.193, 0.991, 0.232, 1.018, 0.008) },
    // the rear door's rear edge, running down round the arch
    { step: 0.004, mat: 'gloss', depth: 0.001, poly: sideBand([[0.155, 1.165], [0.155, 1.0], [0.159, 0.92], [0.167, 0.85], [0.181, 0.77], [0.197, 0.7], [0.212, 0.6], [0.225, 0.5], [0.233, 0.42]], 0.012, CELERIO_L) },
    // the fuel lid
    { step: 0.004, mat: 'gloss', depth: 0.001, poly: sideBand([...celerioU(0.079, 0.876, 0.134, 1.052, 0.03), celerioU(0.079, 0.876, 0.134, 1.052, 0.03)[0]], 0.012, CELERIO_L) },
    // the tail lamp wrapping onto the flank
    { step: 0.003, mat: 'tail', depth: 0.002, poly: smooth([[0.015, 0.95], [0.03, 0.93], [0.05, 0.93], [0.06, 0.97], [0.066, 1.06], [0.07, 1.15], [0.062, 1.15], [0.045, 1.1], [0.03, 1.07], [0.02, 1.02]], 1) },
    // the headlamp sweeping back along the wing
    { step: 0.005, mat: 'trim', layer: 1, depth: 0.008, poly: smooth([[0.996, 0.74], [0.996, 0.8], [0.985, 0.83], [0.965, 0.858], [0.94, 0.885], [0.915, 0.905], [0.905, 0.9], [0.92, 0.85], [0.94, 0.78], [0.96, 0.72], [0.98, 0.71]], 1) },
    { step: 0.004, mat: 'gloss', layer: 2, depth: 0.01, poly: smooth([[0.99, 0.75], [0.99, 0.8], [0.975, 0.83], [0.95, 0.86], [0.93, 0.87], [0.94, 0.82], [0.955, 0.77], [0.97, 0.735]], 1) },
  ],
  plates: { front: 0.575, rear: 0.57 },
  mirrors: 'body',
  rimTone: 'dark',
  paint: '#0043a8', // Metallic Speedy Blue, darkened for the studio lights
  plate: 'MH 12 CL 2026',
}

const ALTO_L = 3.53
/** the gallery render reads 1.552 m against 1.52: every traced height × 0.979 */
const altoK = (pts: P2[]): P2[] => pts.map(([u, y]) => [u, +(y * 0.979).toFixed(4)] as P2)
/** the render's axles sit 3.6 % too far apart: photo u → model u, piecewise so its axles land on the official ones */
const altoU = (u: number): number =>
  +(u <= 0.1326 ? (u * 0.1431) / 0.1326 : u <= 0.8308 ? 0.1431 + ((u - 0.1326) * 0.6742) / 0.6982 : 0.8173 + ((u - 0.8308) * 0.1827) / 0.1692).toFixed(5)
const altoP = (pts: P2[]): P2[] => altoK(pts).map(([u, y]) => [altoU(u), y] as P2)
/** a side outline from a rounded rectangle given in photo u and photo metres */
const altoRectU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  altoP(rrectS(u0 * ALTO_L, y0, u1 * ALTO_L, y1, r).map(([x, y]) => [x / ALTO_L, y] as P2))
const altoCircle = (zc: number, yc: number, r: number, n = 32): P2[] =>
  Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return [+(zc + r * Math.cos(a)).toFixed(4), +(yc + r * Math.sin(a)).toFixed(4)] as P2 })
/** glasshouse station i (of 140) between u0 0.16 and u1 0.75 */
const altoSt = (i: number) => +(0.16 + 0.59 * (0.5 - 0.5 * Math.cos((Math.PI * i) / 140))).toFixed(5)
/** the honeycomb grille: rows of small dark hexagon cells over the gloss panel, inside its outline */
const altoHoney: Decal[] = [0.33, 0.39, 0.45, 0.51, 0.57, 0.63].flatMap((y, row) => {
  const hw = 0.44 - Math.max(0, 0.42 - y) * 0.9
  const out: Decal[] = []
  for (let z = (row % 2 ? 0.033 : 0) - Math.floor(hw / 0.066) * 0.066; z <= hw - 0.03; z += 0.066) {
    if (z < -hw + 0.03) continue
    out.push({ step: 0.004, mat: 'trim', layer: 1, depth: 0.01, poly: Array.from({ length: 6 }, (_, i) => { const a = (i / 6) * Math.PI * 2 + Math.PI / 6; return [+(z + 0.027 * Math.cos(a)).toFixed(4), +(y + 0.024 * Math.sin(a)).toFixed(4)] as P2 }) })
  }
  return out
})

/** Maruti Suzuki Alto K10 (2022, 3rd gen). 3530 × 1490 × 1520, wheelbase 2380, 145/80 R13 (VXi Plus, full wheel covers).
 *  Side profile from the gallery's studio side render (1.552 m measured once the antenna was erased, axles 3.6 % apart):
 *  heights × 0.979, the silhouette kept in the photo's u, axles at the official wheelbase and doors, pillars and handles
 *  mapped onto them. A small rounded hatch: the raked tailgate between body-coloured D-pillars, the upright nose with the
 *  big honeycomb grille under eye-shaped lamps. Lamps, grille and bumpers from the straight front and rear renders. */
export const ALTO_K10: CarSpec = {
  id: 'maruti-alto-k10',
  name: 'Maruti Suzuki Alto K10',
  rakedEnds: true,
  dropSlivers: true,
  // the tailgate glass is a rear decal reaching 0.36 m in from the tail
  endReach: [0.4, 0.3],
  L: ALTO_L, W: 1.49, H: 1.52,
  axles: [0.1431, 0.8173],
  tyreR: 0.2811, tyreW: 0.145, rim: 0.587, wheel: { style: 'petal', spokes: 5 },
  archGap: 0.085, archSquare: 0.1,
  sill: altoK([[0, 0.4], [0.01, 0.28], [0.02, 0.262], [0.035, 0.255], [0.06, 0.25], [0.1, 0.235], [0.16, 0.215], [0.22, 0.205], [0.5, 0.204], [0.7, 0.205], [0.75, 0.22], [0.8, 0.225], [0.9, 0.23], [0.95, 0.232], [0.97, 0.244], [0.98, 0.254], [0.99, 0.265], [0.996, 0.29], [1, 0.33]]),
  // the upright tail up to the lamps, the raked tailgate to the roof spoiler (the body forms the D-pillar), the cliff to
  // the belt, the low belt under the windows rising into the cowl, the bonnet rounding down to the upright grille face
  top: altoK([[0, 0.76], [0.005, 0.9], [0.01, 0.99], [0.02, 1.044], [0.03, 1.083], [0.04, 1.127], [0.05, 1.175], [0.06, 1.215], [0.07, 1.25], [0.08, 1.289], [0.09, 1.335], [0.095, 1.37], [0.1, 1.405], [0.105, 1.43], [0.11, 1.442], [0.12, 1.453], [0.14, 1.466], [0.16, 1.478], [0.163, 1.4], [0.166, 1.3], [0.169, 1.2], [0.172, 1.1], [0.176, 1.068], [0.2, 1.05], [0.3, 1.035], [0.4, 1.018], [0.45, 1.006], [0.6, 1.0], [0.68, 1.0], [0.7, 1.012], [0.72, 1.05], [0.75, 1.11], [0.76, 1.098], [0.78, 1.087], [0.8, 1.079], [0.82, 1.071], [0.84, 1.061], [0.86, 1.046], [0.88, 1.029], [0.9, 1.011], [0.92, 0.988], [0.94, 0.961], [0.96, 0.928], [0.97, 0.914], [0.98, 0.9], [0.99, 0.888], [0.995, 0.875], [0.998, 0.85], [1, 0.79]]),
  // rounded corners in plan at both ends
  width: [[0, 0.88], [0.006, 0.925], [0.015, 0.955], [0.035, 0.975], [0.07, 0.99], [0.13, 1], [0.5, 1], [0.85, 0.995], [0.92, 0.98], [0.955, 0.96], [0.978, 0.93], [0.992, 0.895], [1, 0.86]],
  crown: 0.012,
  bulge: 0.035,
  // the D-pillars lean in above the tail lamps (tumblehome at the tail only)
  shoulder: { y: [[0, 1.03], [0.15, 1.03], [0.165, 1.2], [0.18, 1.6], [1, 1.6]], inset: 0.17 },
  haunch: 0.04,
  topRadius: 0.09,
  noseSweep: 0.12,
  tailSweep: 0.12,
  greenhouse: {
    u0: 0.16, u1: 0.75, tumble: 0.72, followBody: 0.175,
    top: altoK([[0.16, 1.474], [0.18, 1.492], [0.2, 1.507], [0.25, 1.526], [0.3, 1.541], [0.35, 1.548], [0.4, 1.551], [0.45, 1.549], [0.48, 1.544], [0.5, 1.534], [0.53, 1.516], [0.55, 1.498], [0.58, 1.46], [0.6, 1.428], [0.62, 1.394], [0.64, 1.356], [0.66, 1.318], [0.68, 1.276], [0.7, 1.231], [0.72, 1.187], [0.74, 1.14], [0.75, 1.115]]),
  },
  roof: { u0: 0.16, u1: altoSt(85), black: false },
  pillars: [
    // body-coloured B-pillar between the black door frames; the A-pillar is left as glass
    { bottom: [altoU(0.372), altoU(0.4)], top: [altoU(0.367), altoU(0.398)], black: false, step: 0.004 },
  ],
  doors: [[altoU(0.699), altoU(0.709)], [altoU(0.408), altoU(0.394)]],
  front: [
    // the big honeycomb grille filling the upright nose, its dark lower lip below
    { step: 0.004, mat: 'gloss', poly: smooth(both([[0, 0.285], [0.34, 0.288], [0.43, 0.31], [0.47, 0.38], [0.485, 0.55], [0.48, 0.63], [0.45, 0.66], [0, 0.662]]), 1) },
    ...altoHoney,
    { step: 0.004, mat: 'trim', poly: smooth(both([[0, 0.22], [0.38, 0.22], [0.42, 0.235], [0.4, 0.262], [0, 0.262]]), 1) },
    // eye-shaped headlamps: the black bezel, the chrome reflector, the bulb and the amber indicator at the inner end
    { step: 0.004, mat: 'gloss', mirror: true, depth: 0.004, poly: smooth([[0.38, 0.725], [0.48, 0.727], [0.58, 0.74], [0.66, 0.775], [0.675, 0.84], [0.63, 0.857], [0.51, 0.852], [0.42, 0.82], [0.37, 0.76]], 1) },
    { step: 0.004, mat: 'silver', mirror: true, layer: 1, depth: 0.006, poly: smooth([[0.45, 0.74], [0.58, 0.752], [0.64, 0.78], [0.65, 0.83], [0.61, 0.843], [0.52, 0.838], [0.46, 0.81], [0.43, 0.77]], 1) },
    { step: 0.004, mat: 'head', mirror: true, layer: 2, depth: 0.008, poly: altoCircle(0.56, 0.795, 0.03) },
    { step: 0.004, mat: 'amber', mirror: true, layer: 2, depth: 0.008, poly: smooth([[0.4, 0.738], [0.46, 0.742], [0.47, 0.775], [0.43, 0.778], [0.395, 0.76]], 1) },
  ],
  rear: [
    // the tailgate glass between the D-pillars, under the roof spoiler
    { step: 0.004, mat: 'gloss', depth: 0.002, poly: smooth(both([[0, 1.035], [0.52, 1.035], [0.54, 1.055], [0.53, 1.2], [0.515, 1.31], [0.49, 1.34], [0, 1.345]]), 1) },
    // tail lamps on the corners: red lens, the clear reversing lamp with its chrome bowl in the middle
    { step: 0.004, mat: 'tail', mirror: true, layer: 1, depth: 0.008, poly: smooth([[0.49, 0.75], [0.67, 0.745], [0.69, 0.77], [0.69, 0.98], [0.67, 1.0], [0.53, 1.0], [0.49, 0.97]], 1) },
    { step: 0.004, mat: 'silver', mirror: true, layer: 2, depth: 0.014, poly: smooth([[0.5, 0.835], [0.68, 0.835], [0.68, 0.915], [0.5, 0.915]], 1) },
    { step: 0.004, mat: 'chrome', mirror: true, layer: 3, depth: 0.018, poly: altoCircle(0.6, 0.875, 0.032) },
    // the tailgate's shut line round its lower panel
    { step: 0.004, mat: 'gloss', depth: 0.001, poly: band([[-0.48, 0.97], [-0.48, 0.66], [-0.46, 0.612], [-0.42, 0.6], [0, 0.598], [0.42, 0.6], [0.46, 0.612], [0.48, 0.66], [0.48, 0.97]], 0.012) },
    // the black lower edge of the bumper
    { step: 0.004, mat: 'trim', poly: smooth(both([[0, 0.25], [0.6, 0.25], [0.66, 0.27], [0.64, 0.29], [0, 0.29]]), 1) },
  ],
  side: [
    // body-coloured pull handles in dark recesses
    { step: 0.004, mat: 'gloss', poly: altoRectU(0.432, 0.85, 0.477, 0.912, 0.012) },
    { step: 0.004, mat: 'body', layer: 1, depth: 0.012, poly: altoRectU(0.435, 0.856, 0.474, 0.885, 0.008) },
    { step: 0.004, mat: 'gloss', poly: altoRectU(0.171, 0.85, 0.213, 0.905, 0.012) },
    { step: 0.004, mat: 'body', layer: 1, depth: 0.012, poly: altoRectU(0.174, 0.856, 0.21, 0.882, 0.008) },
    // the rear door's rear edge, down round the arch
    { step: 0.004, mat: 'gloss', depth: 0.001, poly: sideBand(altoP([[0.122, 1.03], [0.122, 1.0], [0.124, 0.943], [0.13, 0.86], [0.138, 0.786], [0.158, 0.671], [0.166, 0.6]]), 0.012, ALTO_L) },
    // the fuel lid
    { step: 0.004, mat: 'gloss', depth: 0.001, poly: sideBand([...altoRectU(0.055, 0.72, 0.104, 0.862, 0.025), altoRectU(0.055, 0.72, 0.104, 0.862, 0.025)[0]], 0.012, ALTO_L) },
    // the amber side indicator on the front wing
    { step: 0.004, mat: 'amber', depth: 0.004, poly: altoRectU(0.743, 0.703, 0.761, 0.73, 0.01) },
    // the tail lamp wrapping onto the flank
    { step: 0.003, mat: 'tail', depth: 0.002, poly: smooth(altoP([[0.02, 0.77], [0.035, 0.8], [0.046, 0.88], [0.045, 0.95], [0.035, 0.995], [0.02, 0.99]]), 1) },
    // the headlamp sweeping back along the wing, smoked
    { step: 0.004, mat: 'trim', layer: 1, depth: 0.008, poly: smooth(altoP([[0.998, 0.75], [0.998, 0.84], [0.98, 0.865], [0.955, 0.875], [0.925, 0.878], [0.912, 0.872], [0.93, 0.82], [0.955, 0.77], [0.98, 0.745]]), 1) },
    { step: 0.004, mat: 'gloss', layer: 2, depth: 0.01, poly: smooth(altoP([[0.996, 0.765], [0.996, 0.83], [0.975, 0.85], [0.95, 0.86], [0.932, 0.858], [0.945, 0.82], [0.965, 0.78]]), 1) },
  ],
  plates: { front: 0.44, rear: 0.435 },
  mirrors: 'black',
  paint: '#9c0610', // Metallic Sizzling Red, darkened for the studio lights
  plate: 'MH 12 AK 2026',
}

/** the Glanza's lower honeycomb: rows of wide dark hexagon cells (every other row offset half a cell) inside half-width hw(y) */
const glanzaHoney = (ys: number[], hw: (y: number) => number): Decal[] =>
  ys.flatMap((y, row) => {
    const out: Decal[] = []
    for (let k = -8; k <= 8; k++) {
      const zc = k * 0.094 + (row % 2) * 0.047
      if (Math.abs(zc) + 0.045 > Math.min(hw(y), hw(y + 0.03)) - 0.006) continue
      // none behind the number plate
      if (Math.abs(zc) - 0.045 < 0.27 && y + 0.03 > 0.54) continue
      out.push({ step: 0.004, mat: 'trim', layer: 2, depth: 0.008, poly: [[zc - 0.042, y + 0.015], [zc - 0.03, y], [zc + 0.03, y], [zc + 0.042, y + 0.015], [zc + 0.03, y + 0.03], [zc - 0.03, y + 0.03]] })
    }
    return out
  })
/** the honeycomb's half-width: out to the chrome bracket's inner edge, narrowing along its upper arm */
const glanzaHoneyHW = (y: number) => (y < 0.53 ? 0.605 : 0.605 - ((y - 0.53) * 0.14) / 0.135)

/** Toyota Glanza (2026 facelift of the Baleno twin). 3990 × 1745 × 1530, wheelbase 2520, 195/55 R16 (V).
 *  The body is the Baleno's. Side profile from the gallery's studio side render (a close camera: tyres 10 % big, axles
 *  7 % apart, 1.549 m tall), squeezed to the official height; axles at the official wheelbase as on the Baleno, the
 *  silhouette kept in photo u. Toyota's own front (chrome bonnet bar, black face with an X-shaped chrome frame round
 *  a honeycomb, slim lamps, red lip) from a straight front photo and close-ups; the black side skirts. */
export const GLANZA: CarSpec = {
  ...BALENO,
  id: 'toyota-glanza',
  name: 'Toyota Glanza',
  dropSlivers: true,
  sill: [[0, 0.42], [0.006, 0.34], [0.015, 0.285], [0.03, 0.267], [0.05, 0.247], [0.08, 0.235], [0.12, 0.232], [0.2, 0.235], [0.3, 0.24], [0.4, 0.245], [0.5, 0.25], [0.6, 0.245], [0.7, 0.23], [0.75, 0.22], [0.85, 0.215], [0.9, 0.225], [0.93, 0.24], [0.96, 0.25], [0.985, 0.25], [1, 0.25]],
  // the Baleno's tail and belt; a higher bonnet falling to a raked face over the jutting lip
  top: [[0, 0.8], [0.004, 0.95], [0.01, 1.05], [0.018, 1.09], [0.025, 1.095], [0.05, 1.13], [0.08, 1.19], [0.11, 1.225], [0.13, 1.235], [0.15, 1.2], [0.16, 1.155], [0.168, 1.115], [0.2, 1.1], [0.3, 1.073], [0.4, 1.05], [0.5, 1.022], [0.6, 0.993], [0.7, 0.985], [0.73, 1.0], [0.76, 1.052], [0.78, 1.042], [0.8, 1.035], [0.82, 1.026], [0.85, 1.008], [0.88, 0.988], [0.9, 0.97], [0.92, 0.945], [0.94, 0.925], [0.955, 0.912], [0.97, 0.9], [0.98, 0.89], [0.99, 0.876], [0.996, 0.862], [1, 0.845]],
  width: [[0, 0.7], [0.005, 0.79], [0.015, 0.875], [0.035, 0.935], [0.07, 0.972], [0.13, 0.995], [0.17, 1], [0.45, 0.99], [0.8, 0.995], [0.86, 0.99], [0.92, 0.97], [0.955, 0.945], [0.972, 0.92], [0.986, 0.895], [0.996, 0.87], [1, 0.86]],
  greenhouse: {
    u0: 0.025, u1: 0.76, tumble: 0.62,
    top: [[0.025, 1.095], [0.04, 1.15], [0.06, 1.202], [0.08, 1.258], [0.1, 1.3], [0.12, 1.355], [0.13, 1.385], [0.14, 1.41], [0.15, 1.425], [0.2, 1.455], [0.25, 1.475], [0.3, 1.49], [0.35, 1.5], [0.4, 1.505], [0.45, 1.5], [0.5, 1.486], [0.55, 1.458], [0.57, 1.436], [0.6, 1.385], [0.62, 1.343], [0.65, 1.28], [0.68, 1.214], [0.7, 1.17], [0.72, 1.12], [0.74, 1.085], [0.76, 1.05]],
  },
  // the black bumper corners round the fog lamps
  cladding: { top: [[0, 0.1], [0.955, 0.1], [0.966, 0.6], [0.984, 0.62], [0.992, 0.1], [1, 0.1]], flare: 0, cut: true },
  front: [
    // the black face under the chrome bonnet bar, out to the lamps and down to the red lip
    { step: 0.004, mat: 'trim', depth: 0.004, poly: smooth(both([[0, 0.385], [0.62, 0.385], [0.68, 0.39], [0.705, 0.42], [0.71, 0.6], [0.69, 0.645], [0.66, 0.67], [0.62, 0.7], [0.565, 0.725], [0.548, 0.76], [0.542, 0.866], [0, 0.871]]), 1) },
    // the chrome bar along the bonnet's leading edge, lamp to lamp
    { step: 0.004, mat: 'satin', layer: 1, depth: 0.008, poly: both([[0, 0.872], [0.45, 0.869], [0.54, 0.866], [0.6, 0.874], [0.66, 0.89], [0.69, 0.903], [0.67, 0.912], [0.6, 0.9], [0.54, 0.897], [0.45, 0.903], [0, 0.906]]) },
    // the slatted upper grille
    { step: 0.004, mat: 'gloss', layer: 1, poly: smooth(both([[0, 0.7], [0.3, 0.7], [0.345, 0.725], [0.365, 0.79], [0.355, 0.826], [0, 0.828]]), 1) },
    { step: 0.004, mat: 'slats', layer: 2, depth: 0.006, poly: both([[0, 0.712], [0.29, 0.712], [0.33, 0.732], [0.348, 0.79], [0.34, 0.814], [0, 0.816]]) },
    // the lower grille: a gloss-black field of wide honeycomb cells
    { step: 0.004, mat: 'gloss', layer: 1, poly: both([[0, 0.395], [0.585, 0.395], [0.605, 0.415], [0.612, 0.53], [0.47, 0.665], [0, 0.665]]) },
    ...glanzaHoney([0.405, 0.445, 0.485, 0.525, 0.565, 0.605], glanzaHoneyHW),
    // the chrome brackets framing it: an arm from the upper grille down and out, a wider foot back in along the lip
    { step: 0.004, mat: 'satin', mirror: true, layer: 3, depth: 0.01, poly: [[0.357, 0.799], [0.384, 0.808], [0.673, 0.538], [0.667, 0.42], [0.648, 0.358], [0.62, 0.338], [0.36, 0.338], [0.36, 0.374], [0.593, 0.385], [0.618, 0.41], [0.634, 0.53]] },
    // slim swept headlamps: a dark housing, the projector, the DRL along the lower edge
    { step: 0.004, mat: 'trim', mirror: true, layer: 1, depth: 0.004, poly: [[0.552, 0.738], [0.62, 0.756], [0.7, 0.785], [0.712, 0.8], [0.712, 0.9], [0.695, 0.918], [0.62, 0.902], [0.546, 0.884], [0.54, 0.862], [0.542, 0.752]] },
    { step: 0.004, mat: 'head', mirror: true, layer: 2, depth: 0.006, poly: rrect(0.635, 0.832, 0.68, 0.876, 0.02) },
    { step: 0.004, mat: 'drl', mirror: true, layer: 2, depth: 0.008, poly: band([[0.56, 0.75], [0.63, 0.768], [0.704, 0.796]], 0.014) },
    // fog lamps in chrome bezels in the black bumper corners
    { step: 0.004, mat: 'chrome', mirror: true, layer: 1, depth: 0.006, poly: rrect(0.684, 0.425, 0.75, 0.5, 0.012) },
    { step: 0.004, mat: 'head', mirror: true, layer: 2, depth: 0.008, poly: rrect(0.695, 0.436, 0.74, 0.488, 0.008) },
    // the black lip under the red one
    { step: 0.004, mat: 'trim', poly: smooth(both([[0, 0.258], [0.62, 0.258], [0.72, 0.272], [0.745, 0.3], [0.73, 0.332], [0, 0.332]]), 1) },
  ],
  // the Baleno's tail, without its black lower lip (the Glanza's bumper is body colour to the bottom)
  rear: BALENO.rear.filter((d) => !(d.mat === 'trim' && d.poly.some(([, y]) => y < 0.33))),
  side: [
    ...(BALENO.side ?? []),
    // black skirts along the sills between the arches
    { step: 0.004, mat: 'trim', depth: 0.004, poly: rrectS(0.262, 0.252, 0.696, 0.345, 0.008) },
    // the headlamp sweeping back along the wing
    { step: 0.004, mat: 'trim', depth: 0.004, poly: smooth([[0.997, 0.728], [0.984, 0.73], [0.95, 0.8], [0.925, 0.85], [0.912, 0.876], [0.92, 0.884], [0.95, 0.866], [0.975, 0.85], [0.997, 0.84]], 1) },
    { step: 0.004, mat: 'drl', layer: 1, depth: 0.008, poly: sideBand([[0.996, 0.742], [0.97, 0.775], [0.945, 0.815], [0.925, 0.85]], 0.012, 3.99) },
  ],
  plates: { front: 0.6, rear: 0.6 },
  paint: '#850f17', // Sportin Red, the gallery car's, darkened for the studio lights
  plate: 'MH 12 GZ 2026',
}

/** the Taisor's side photo puts the axles 1.06 % of the length further forward than the Fronx trace: the arch cladding,
 *  doors and handles move with them (the ends stay put) */
const taisorS = (pts: P2[]): P2[] => pts.map(([u, y]) => [u <= 0.02 || u >= 0.985 ? u : +(u + 0.0106).toFixed(4), y] as P2)
/** a circle outline (projector lenses) */
const taisorCircle = (zc: number, yc: number, r: number, n = 28): P2[] =>
  Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return [+(zc + r * Math.cos(a)).toFixed(4), +(yc + r * Math.sin(a)).toFixed(4)] as P2 })

/** the Taisor's honeycomb: rows of small dark hexagon cells (every other row offset half a cell) inside the grille */
const taisorHoneyHW = (y: number) => (y < 0.62 ? 0.4 + (y - 0.565) * 1.6 : y < 0.735 ? 0.49 - (y - 0.62) * 0.4 : 0.44)
const taisorHoney = (ys: number[]): Decal[] =>
  ys.flatMap((y, row) => {
    const out: Decal[] = []
    for (let k = -9; k <= 9; k++) {
      const zc = k * 0.058 + (row % 2) * 0.029
      if (Math.abs(zc) + 0.027 > Math.min(taisorHoneyHW(y), taisorHoneyHW(y + 0.024)) - 0.012) continue
      out.push({ step: 0.004, mat: 'trim', layer: 1, depth: 0.008, poly: [[zc - 0.026, y + 0.012], [zc - 0.016, y], [zc + 0.016, y], [zc + 0.026, y + 0.012], [zc + 0.016, y + 0.024], [zc - 0.016, y + 0.024]] })
    }
    return out
  })

/** the front photo's heights sit 3 cm low against the side photo's DRL: lift the upper face parts by that */
const taisorUp = (ds: Decal[]): Decal[] => ds.map((d) => ({ ...d, poly: d.poly.map(([z, y]) => [z, +(y + 0.03).toFixed(4)] as P2) }))
/** Toyota Urban Cruiser Taisor (2024; the Fronx's twin). 3995 × 1765 × 1550 (over the roof rails), wheelbase 2520,
 *  195/60 R16 (V). The body is the Fronx's, re-fitted to a long-lens road side photo of an orange car (1.557 m over the
 *  rails, axles within 1 % of the wheelbase): axles 4 cm further forward, a lower roof and bonnet. Toyota's own front
 *  (chrome bar joining slim DRLs over a honeycomb grille, triple projectors in black pods, slatted intake and silver
 *  skid plate) from a straight front photo; the tail lamps' internals and the big rear skid plate from a straight rear. */
export const TAISOR: CarSpec = {
  ...FRONX,
  id: 'toyota-urban-cruiser-taisor',
  name: 'Toyota Urban Cruiser Taisor',
  dropSlivers: true,
  axles: [0.1633, 0.7941],
  // paired machined spokes over black pockets
  wheel: { style: 'blade', spokes: 5 },
  // the swept corners read as bright bands down the nose and tail in the side view at the Fronx's sweep
  noseSweep: 0.15,
  tailSweep: 0.14,
  rimTone: undefined,
  sill: [[0, 0.38], [0.008, 0.34], [0.02, 0.32], [0.04, 0.31], [0.08, 0.305], [0.15, 0.3], [0.22, 0.28], [0.3, 0.265], [0.5, 0.262], [0.6, 0.25], [0.65, 0.24], [0.72, 0.23], [0.8, 0.225], [0.9, 0.215], [0.95, 0.21], [0.98, 0.2], [0.995, 0.178], [1, 0.17]],
  // the Fronx's tail and belt; the bonnet lower, falling to a nose that just clears the DRLs
  top: [[0, 1.08], [0.008, 1.1], [0.02, 1.122], [0.03, 1.14], [0.06, 1.18], [0.09, 1.22], [0.115, 1.25], [0.13, 1.26], [0.145, 1.245], [0.16, 1.215], [0.175, 1.185], [0.19, 1.165], [0.21, 1.15], [0.24, 1.134], [0.39, 1.115], [0.54, 1.1], [0.66, 1.096], [0.7, 1.1], [0.72, 1.098], [0.75, 1.06], [0.8, 1.025], [0.85, 0.997], [0.9, 0.963], [0.94, 0.937], [0.97, 0.914], [0.985, 0.902], [0.995, 0.894], [1, 0.888]],
  greenhouse: {
    ...FRONX.greenhouse,
    top: [[0.03, 1.14], [0.05, 1.2], [0.07, 1.255], [0.09, 1.3], [0.11, 1.33], [0.12, 1.37], [0.125, 1.4], [0.135, 1.425], [0.15, 1.44], [0.16, 1.448], [0.18, 1.458], [0.2, 1.462], [0.25, 1.474], [0.3, 1.482], [0.35, 1.492], [0.4, 1.498], [0.45, 1.494], [0.5, 1.48], [0.53, 1.465], [0.55, 1.452], [0.57, 1.436], [0.6, 1.39], [0.62, 1.35], [0.65, 1.29], [0.68, 1.225], [0.7, 1.18], [0.715, 1.15]],
  },
  cladding: { ...FRONX.cladding!, top: taisorS(FRONX.cladding!.top) },
  doors: FRONX.doors.map(([a, b]) => [+(a + 0.0106).toFixed(4), +(b + 0.0106).toFixed(4)] as [number, number]),
  front: [
    ...taisorUp([
    // the chrome bar under the bonnet edge, joining the DRLs across the top of the grille
    { step: 0.004, mat: 'satin', layer: 2, depth: 0.008, poly: both([[0, 0.764], [0.5, 0.764], [0.512, 0.772], [0.5, 0.788], [0, 0.788]]) },
    // slim DRLs rising towards the corners: a dark lens with a light line along it
    { step: 0.004, mat: 'trim', mirror: true, layer: 1, depth: 0.004, poly: smooth([[0.5, 0.762], [0.58, 0.774], [0.625, 0.786], [0.645, 0.8], [0.645, 0.82], [0.632, 0.826], [0.6, 0.816], [0.54, 0.804], [0.5, 0.8]], 1) },
    { step: 0.004, mat: 'drl', mirror: true, layer: 2, depth: 0.008, poly: band([[0.515, 0.782], [0.58, 0.792], [0.615, 0.8], [0.632, 0.808]], 0.014) },
    // the gloss-black honeycomb grille under the bar
    { step: 0.004, mat: 'gloss', poly: smooth(both([[0, 0.565], [0.4, 0.565], [0.47, 0.585], [0.5, 0.62], [0.445, 0.735], [0.43, 0.768], [0, 0.768]]), 1) },
    ...taisorHoney([0.578, 0.612, 0.646, 0.68, 0.714, 0.748]),
    // triple projectors in a black pod low in each bumper corner
    { step: 0.004, mat: 'gloss', mirror: true, layer: 1, poly: smooth([[0.52, 0.565], [0.535, 0.5], [0.57, 0.462], [0.63, 0.448], [0.68, 0.455], [0.7, 0.485], [0.705, 0.6], [0.69, 0.64], [0.65, 0.652], [0.59, 0.646], [0.545, 0.618]], 1) },
    { step: 0.004, mat: 'head', mirror: true, layer: 2, poly: taisorCircle(0.635, 0.6, 0.018) },
    { step: 0.004, mat: 'head', mirror: true, layer: 2, poly: taisorCircle(0.585, 0.54, 0.018) },
    { step: 0.004, mat: 'head', mirror: true, layer: 2, poly: taisorCircle(0.645, 0.535, 0.018) },
    ]),
    // black lower bumper with the wide slatted intake, the silver skid plate along the bottom
    { step: 0.004, mat: 'trim', poly: smooth(both([[0, 0.19], [0.62, 0.19], [0.68, 0.21], [0.7, 0.26], [0.7, 0.3], [0.6, 0.31], [0.56, 0.36], [0.52, 0.405], [0, 0.405]]), 1) },
    { step: 0.004, mat: 'slats', layer: 1, depth: 0.006, poly: both([[0, 0.29], [0.4, 0.29], [0.47, 0.32], [0.42, 0.37], [0, 0.37]]) },
    { step: 0.004, mat: 'satin', layer: 2, depth: 0.01, poly: smooth(both([[0, 0.192], [0.52, 0.192], [0.575, 0.2], [0.605, 0.218], [0.59, 0.236], [0.54, 0.248], [0, 0.25]]), 1) },
  ],
  rear: [
    // the gloss-black band across the tailgate: the red light bar along its top, the lamps at the corners
    FRONX.rear[0],
    { step: 0.005, mat: 'tail', layer: 1, poly: [[-0.46, 1.058], [0.46, 1.058], [0.46, 1.068], [-0.46, 1.068]] },
    // smoked lamps with red guides: a line along the top, a chevron at the inner end, the outer edge
    { step: 0.004, mat: 'tail', mirror: true, layer: 1, poly: [[0.47, 1.06], [0.67, 1.06], [0.67, 1.072], [0.47, 1.072]] },
    { step: 0.004, mat: 'tail', mirror: true, layer: 1, poly: [[0.47, 1.048], [0.5, 1.0], [0.522, 1.0], [0.494, 1.048]] },
    { step: 0.004, mat: 'tail', mirror: true, layer: 1, poly: [[0.655, 1.0], [0.672, 1.0], [0.672, 1.055], [0.655, 1.055]] },
    { step: 0.004, mat: 'silver', mirror: true, layer: 1, depth: 0.006, poly: [[0.54, 1.012], [0.64, 1.012], [0.64, 1.024], [0.54, 1.024]] },
    // the black lower bumper filled by a big silver skid plate, upright reflectors at the corners
    FRONX.rear[6],
    { step: 0.005, mat: 'satin', layer: 1, poly: smooth(both([[0, 0.355], [0.52, 0.355], [0.56, 0.37], [0.585, 0.41], [0.59, 0.52], [0.57, 0.565], [0.5, 0.58], [0.16, 0.58], [0.12, 0.55], [0, 0.545]]), 1) },
    { step: 0.005, mat: 'reflector', mirror: true, layer: 1, poly: rrect(0.665, 0.5, 0.69, 0.615, 0.008) },
  ],
  side: [
    { step: 0.005, mat: 'gloss', poly: taisorS([[0.2, 0.985], [0.25, 0.985], [0.25, 1.015], [0.2, 1.015]]) },
    { step: 0.005, mat: 'gloss', poly: taisorS([[0.425, 0.93], [0.475, 0.93], [0.475, 0.96], [0.425, 0.96]]) },
    { step: 0.005, mat: 'satin', poly: taisorS([[0.3, 0.27], [0.64, 0.27], [0.65, 0.273], [0.656, 0.28], [0.655, 0.29], [0.648, 0.297], [0.64, 0.299], [0.3, 0.299], [0.292, 0.296], [0.288, 0.285], [0.292, 0.274]]) },
  ],
  plates: { front: 0.5, rear: 0.86 },
  paint: '#9c2500', // Lucent Orange, the gallery car's, darkened for the studio lights
  plate: 'MH 12 TS 2026',
}

const NEO_L = 4.169
/** photo u → model u: the gallery photo's axles land on the official wheelbase (overhangs in the photo's ratio) */
const neoU = (u: number): number => {
  const a0 = 0.1795, a1 = 0.8363, b0 = 0.1867, b1 = 0.8295
  const v = u < a0 ? (u * b0) / a0 : u > a1 ? 1 - ((1 - u) * (1 - b1)) / (1 - a1) : b0 + ((u - a0) * (b1 - b0)) / (a1 - a0)
  return +v.toFixed(5)
}
/** photo [u, y] → model: u mapped onto the official axles, heights × 0.985 (the close camera reads 1.844 m) */
const neoP = (pts: P2[]): P2[] => pts.map(([u, y]) => [neoU(u), +(y * 0.985).toFixed(4)] as P2)
const NEO_GH: [number, number] = [neoU(0.057), neoU(0.74)]
/** a glasshouse station (roof and pillar edges sit on them) */
const neoSt = (i: number) => +(NEO_GH[0] + (NEO_GH[1] - NEO_GH[0]) * (0.5 - 0.5 * Math.cos((Math.PI * i) / 140))).toFixed(5)
const neoRectU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  neoP(rrectS(u0 * NEO_L, y0, u1 * NEO_L, y1, r).map(([x, y]) => [x / NEO_L, y] as P2))
const neoCircle = (zc: number, yc: number, r: number, n = 40): P2[] =>
  Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return [+(zc + r * Math.cos(a)).toFixed(4), +(yc + r * Math.sin(a)).toFixed(4)] as P2 })
/** the black moulding along the flanks (photo u range), falling gently towards the nose like the roof */
const neoStrip = (u0: number, u1: number): P2[] => {
  const yc = (u: number) => 0.955 + (0.93 - u) * 0.17
  const pts: P2[] = []
  for (let k = 0; k <= 6; k++) { const u = u0 + ((u1 - u0) * k) / 6; pts.push([u, +(yc(u) - 0.017).toFixed(4)]) }
  for (let k = 6; k >= 0; k--) { const u = u0 + ((u1 - u0) * k) / 6; pts.push([u, +(yc(u) + 0.017).toFixed(4)]) }
  return neoP(pts)
}
/** a row of chrome grille bars across ±hw at height y, split where the grille's dark dividers are */
const neoSlats = (y: number, hw: number, h = 0.014): Decal[] =>
  [[-hw, -0.31], [-0.29, -0.13], [-0.11, 0.11], [0.13, 0.29], [0.31, hw]].map(([a, b]): Decal => ({
    step: 0.005, mat: 'chrome', layer: 2, depth: 0.012, poly: rrect(a, y - h / 2, b, y + h / 2, 0.004),
  }))

/** Mahindra Bolero Neo (2025 update). 3995 × 1795 × 1817, wheelbase 2680, 215/70 R16. The official length is to the
 *  rear bumper; over the tailgate spare wheel it is 4.17 m (read off the side photo at the official scale). Side
 *  profile from a levelled gallery side photo (1.844 m measured, axles 2 % apart: heights × 0.985, axles at the
 *  official wheelbase, everything traced mapped with them). Lamps, grilles and bumpers from the straight front and
 *  rear photos and the close-ups. Black pillars, black arch flares, black lower bumpers and side steps. */
export const BOLERO_NEO: CarSpec = {
  id: 'mahindra-bolero-neo',
  name: 'Mahindra Bolero Neo',
  rakedEnds: true,
  dropSlivers: true,
  L: NEO_L, W: 1.795, H: 1.817,
  axles: [neoU(0.1795), neoU(0.8363)],
  tyreR: 0.354, tyreW: 0.215, rim: 0.574, wheel: { style: 'split', spokes: 5 },
  archGap: 0.1, archSquare: 0.45, wellInset: 0.05,
  // the tow step under the spare, the rear bumper's lower lip, the running boards between the wheels, the front lip
  sill: neoP([[0, 0.39], [0.035, 0.39], [0.042, 0.42], [0.05, 0.38], [0.085, 0.36], [0.1, 0.36], [0.27, 0.27], [0.3, 0.262], [0.5, 0.255], [0.7, 0.245], [0.73, 0.25], [0.93, 0.29], [0.96, 0.285], [0.98, 0.3], [0.99, 0.31], [1, 0.35]]),
  // the step under the spare, the near-upright tail face (one plane) up to the belt, the belt stepping down under the
  // rear door glass, the cowl, the long bonnet falling to the raked grille face
  top: neoP([[0, 0.47], [0.035, 0.47], [0.04, 0.5], [0.0436, 0.7], [0.0472, 0.9], [0.0508, 1.1], [0.0544, 1.3], [0.0554, 1.355], [0.1, 1.358], [0.2, 1.355], [0.23, 1.345], [0.26, 1.322], [0.3, 1.316], [0.4, 1.31], [0.5, 1.302], [0.6, 1.295], [0.68, 1.285], [0.74, 1.25], [0.76, 1.215], [0.8, 1.196], [0.85, 1.163], [0.88, 1.143], [0.91, 1.118], [0.93, 1.1], [0.95, 1.1], [0.965, 1.1], [0.98, 1.098], [0.99, 1.095], [0.996, 1.09], [1, 1.08]]),
  // boxy: flat flanks, the corners of both faces rounded; the narrow step under the spare
  width: [[0, 0.26], [0.034, 0.26], [0.04, 0.86], [0.046, 0.92], [0.06, 0.95], [0.1, 0.965], [0.3, 0.975], [0.7, 0.975], [0.85, 0.972], [0.92, 0.968], [0.96, 0.958], [0.985, 0.94], [1, 0.91]],
  crown: 0.01,
  bulge: 0.006,
  topRadius: 0.06,
  noseSweep: 0.12,
  haunch: 0.015,
  tailSweep: 0.03,
  greenhouse: {
    u0: NEO_GH[0], u1: NEO_GH[1], tumble: 0.92,
    // the black D-pillar raked back from the upright tail glass up to the spoiler, the long roof falling gently to
    // the windscreen
    top: neoP([[0.057, 1.355], [0.062, 1.45], [0.07, 1.58], [0.08, 1.7], [0.09, 1.77], [0.1, 1.815], [0.11, 1.835], [0.12, 1.84], [0.2, 1.844], [0.3, 1.838], [0.4, 1.827], [0.5, 1.805], [0.55, 1.792], [0.58, 1.778], [0.6, 1.757], [0.61, 1.737], [0.62, 1.71], [0.63, 1.669], [0.65, 1.6], [0.67, 1.533], [0.69, 1.454], [0.71, 1.381], [0.73, 1.305], [0.74, 1.25]]),
  },
  roof: { u0: neoSt(25), u1: neoSt(99), black: false },
  pillars: [
    // black C- and B-pillars (the dark glass alone carries the black D-pillar); the A-pillar stays glass
    { bottom: [neoU(0.214), neoU(0.288)], top: [neoU(0.21), neoU(0.297)], black: true, mat: 'trim' },
    { bottom: [neoU(0.43), neoU(0.473)], top: [neoU(0.41), neoU(0.455)], black: true, mat: 'trim' },
  ],
  // black lower bumpers, the black rocker and running boards, thin black arch flares
  cladding: { top: neoP([[0, 0.5], [0.04, 0.5], [0.046, 0.47], [0.09, 0.48], [0.3, 0.48], [0.5, 0.47], [0.73, 0.45], [0.93, 0.43], [0.97, 0.42], [1, 0.42]]), flare: 0.045, flareOut: 0.02, flareU: [neoU(0.06), neoU(0.97)], cut: true },
  doors: [[neoU(0.726), neoU(0.72)], [neoU(0.475), neoU(0.47)], [neoU(0.29), neoU(0.25)]],
  front: [
    // the upper grille: a black panel with five rows of split chrome bars (no badge)
    { step: 0.005, mat: 'gloss', poly: rrect(-0.49, 0.835, 0.49, 1.035, 0.015) },
    ...[0.865, 0.9, 0.935, 0.97, 1.005].flatMap((y) => neoSlats(y, 0.465)),
    // headlamps: a clear lens over chrome reflectors, the bulb, an LED strip along the top edge
    { step: 0.005, mat: 'gloss', mirror: true, poly: smooth([[0.5, 0.875], [0.74, 0.89], [0.775, 0.905], [0.795, 0.94], [0.8, 0.99], [0.795, 1.04], [0.77, 1.055], [0.5, 1.03]], 1) },
    { step: 0.005, mat: 'chrome', mirror: true, layer: 1, depth: 0.008, poly: rrect(0.53, 0.9, 0.695, 0.995, 0.02) },
    { step: 0.005, mat: 'chrome', mirror: true, layer: 1, depth: 0.008, poly: rrect(0.71, 0.91, 0.78, 1.015, 0.02) },
    { step: 0.005, mat: 'head', mirror: true, layer: 2, depth: 0.01, poly: neoCircle(0.6, 0.95, 0.028) },
    { step: 0.005, mat: 'drl', mirror: true, layer: 2, depth: 0.01, poly: [[0.53, 1.005], [0.765, 1.027], [0.765, 1.041], [0.53, 1.019]] },
    // the lower grille: a black trapezoid with four chrome bars
    { step: 0.005, mat: 'gloss', poly: [[-0.5, 0.7], [0.5, 0.7], [0.43, 0.52], [-0.43, 0.52]] },
    ...[[0.555, 0.44], [0.595, 0.455], [0.635, 0.47], [0.675, 0.485]].flatMap(([y, hw]) => neoSlats(y, hw, 0.013)),
    // fog lamps in black pods at the bumper corners
    { step: 0.005, mat: 'gloss', mirror: true, depth: 0.008, poly: rrect(0.57, 0.555, 0.77, 0.665, 0.03) },
    { step: 0.005, mat: 'chrome', mirror: true, layer: 1, depth: 0.01, poly: neoCircle(0.665, 0.61, 0.036) },
    { step: 0.005, mat: 'head', mirror: true, layer: 2, depth: 0.012, poly: neoCircle(0.665, 0.61, 0.024) },
    // the satin skid plate round the number plate
    { step: 0.005, mat: 'satin', mirror: true, poly: [[0.265, 0.36], [0.44, 0.36], [0.52, 0.51], [0.265, 0.51]] },
    { step: 0.005, mat: 'satin', poly: [[-0.27, 0.49], [0.27, 0.49], [0.27, 0.51], [-0.27, 0.51]] },
  ],
  rear: [
    // tall tail lamps at the corners: red lens, the clear reversing band, the lit red guide at the top
    { step: 0.005, mat: 'reflector', mirror: true, depth: 0.014, poly: rrect(0.655, 0.93, 0.83, 1.32, 0.015) },
    { step: 0.005, mat: 'tail', mirror: true, layer: 1, depth: 0.016, poly: rrect(0.675, 1.2, 0.815, 1.3, 0.01) },
    { step: 0.005, mat: 'silver', mirror: true, layer: 1, depth: 0.016, poly: rrect(0.675, 1.0, 0.815, 1.08, 0.006) },
    // the side-hinged tailgate: its shut lines and handle
    { step: 0.005, mat: 'gloss', mirror: true, depth: 0.001, poly: [[0.628, 0.7], [0.641, 0.7], [0.641, 1.33], [0.628, 1.33]] },
    { step: 0.005, mat: 'gloss', depth: 0.001, poly: [[-0.641, 0.7], [0.641, 0.7], [0.641, 0.713], [-0.641, 0.713]] },
    { step: 0.005, mat: 'gloss', depth: 0.016, poly: rrect(-0.6, 1.065, -0.4, 1.1, 0.012) },
    // the black lower bumper with the plate recess and red reflectors
    { step: 0.005, mat: 'trim', poly: rrect(-0.84, 0.38, 0.84, 0.615, 0.03) },
    { step: 0.005, mat: 'reflector', mirror: true, layer: 1, poly: rrect(0.52, 0.53, 0.7, 0.57, 0.006) },
  ],
  side: [
    // the black moulding along both doors and the rear quarter, the amber side repeater above it
    ...[[0.945, 0.733], [0.718, 0.478], [0.467, 0.258], [0.245, 0.062]].map(([a, b]): Decal => ({ step: 0.005, mat: 'trim', depth: 0.006, poly: neoStrip(b, a) })),
    { step: 0.005, mat: 'amber', layer: 1, poly: neoRectU(0.73, 1.025, 0.755, 1.05, 0.006) },
    // black door handles
    { step: 0.005, mat: 'gloss', layer: 1, depth: 0.012, poly: neoRectU(0.495, 1.035, 0.54, 1.065, 0.012) },
    { step: 0.005, mat: 'gloss', layer: 1, depth: 0.012, poly: neoRectU(0.262, 1.075, 0.307, 1.105, 0.012) },
  ],
  plates: { front: 0.425, rear: 0.535 },
  spare: { y: 1.085 },
  rimTone: 'dark',
  mirrors: 'body',
  paint: '#033856', // Jeans Blue, darkened for the studio lights
  plate: 'MH 12 BN 2026',
}

const BOLERO_L = 4.25
const BOLERO_GH: [number, number] = [0.069, 0.7]
/** a glasshouse station (roof and pillar edges sit on them) */
const boleroSt = (i: number) => +(BOLERO_GH[0] + (BOLERO_GH[1] - BOLERO_GH[0]) * (0.5 - 0.5 * Math.cos((Math.PI * i) / 140))).toFixed(5)
const boleroRectU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  rrectS(u0 * BOLERO_L, y0, u1 * BOLERO_L, y1, r).map(([x, y]) => [+(x / BOLERO_L).toFixed(5), y] as P2)
const boleroCircle = (zc: number, yc: number, r: number, n = 40): P2[] =>
  Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return [+(zc + r * Math.cos(a)).toFixed(4), +(yc + r * Math.sin(a)).toFixed(4)] as P2 })
/** the satin side strip (u range), rising gently towards the tail */
const boleroStrip = (u0: number, u1: number): P2[] => {
  const yc = (u: number) => 0.945 + (0.95 - u) * 0.09
  const pts: P2[] = []
  for (let k = 0; k <= 6; k++) { const u = u0 + ((u1 - u0) * k) / 6; pts.push([+u.toFixed(5), +(yc(u) - 0.021).toFixed(4)]) }
  for (let k = 6; k >= 0; k--) { const u = u0 + ((u1 - u0) * k) / 6; pts.push([+u.toFixed(5), +(yc(u) + 0.021).toFixed(4)]) }
  return smooth(pts, 1)
}

/** Mahindra Bolero (2025 update). 3995 × 1745 × 1880, wheelbase 2680, 215/75 R15. The official length is to the rear
 *  bumper; over the tailgate spare wheel it is 4.25 m (read off the side photo at the official scale, which then gives
 *  the official wheelbase and height within 0.7 %). Side profile from a levelled gallery side photo; lamps, grille and
 *  bumpers from the straight front and rear photos and the close-ups. Upright slab sides, a satin strip along the
 *  flanks, black flares and bumpers, the spare wheel off-centre on the side-hinged tailgate. */
export const BOLERO: CarSpec = {
  id: 'mahindra-bolero',
  name: 'Mahindra Bolero',
  rakedEnds: true,
  dropSlivers: true,
  L: BOLERO_L, W: 1.745, H: 1.88,
  axles: [0.2445, 0.8751],
  tyreR: 0.352, tyreW: 0.215, rim: 0.541, wheel: { style: 'split', spokes: 5 },
  archGap: 0.11, archSquare: 0.35,
  // a sliver hidden behind the spare, the rear bumper, the running boards between the wheels, the front bumper
  sill: [[0, 0.985], [0.057, 0.985], [0.062, 0.6], [0.1, 0.6], [0.14, 0.58], [0.34, 0.28], [0.5, 0.28], [0.62, 0.31], [0.68, 0.3], [0.76, 0.35], [0.97, 0.33], [0.99, 0.34], [1, 0.36]],
  // the sliver behind the spare, the bumper, the upright tailgate up to the belt, the belt falling a little to the cowl, the bonnet
  // stepped below the belt, the upright grille face over the bumper
  top: [[0, 1.0], [0.057, 1.0], [0.061, 0.74], [0.0675, 0.75], [0.0678, 0.9], [0.0682, 1.1], [0.0686, 1.3], [0.075, 1.305], [0.2, 1.305], [0.3, 1.295], [0.45, 1.285], [0.6, 1.275], [0.69, 1.27], [0.7, 1.26], [0.705, 1.21], [0.712, 1.18], [0.72, 1.16], [0.75, 1.148], [0.8, 1.126], [0.85, 1.093], [0.9, 1.06], [0.93, 1.04], [0.95, 1.024], [0.97, 1.0], [0.985, 0.985], [0.992, 0.975], [1, 0.71]],
  // a slab-sided box: flat flanks, barely rounded corners; the narrow sliver behind the spare
  width: [[0, 0.025], [0.057, 0.025], [0.062, 0.93], [0.07, 0.95], [0.09, 0.97], [0.15, 0.975], [0.85, 0.975], [0.95, 0.97], [0.98, 0.955], [0.993, 0.94], [1, 0.95]],
  crown: 0.008,
  bulge: 0.003,
  topRadius: 0.05,
  noseSweep: 0.04,
  tailSweep: 0.02,
  greenhouse: {
    u0: BOLERO_GH[0], u1: BOLERO_GH[1], tumble: 0.95,
    // the upright tail glass under the roof's drip rail, the long flat roof falling a little to the windscreen
    top: [[0.069, 1.305], [0.073, 1.4], [0.079, 1.5], [0.087, 1.6], [0.095, 1.68], [0.103, 1.74], [0.11, 1.78], [0.117, 1.81], [0.124, 1.83], [0.14, 1.85], [0.16, 1.86], [0.2, 1.865], [0.25, 1.859], [0.3, 1.85], [0.35, 1.84], [0.4, 1.835], [0.45, 1.822], [0.5, 1.812], [0.55, 1.787], [0.6, 1.763], [0.62, 1.743], [0.63, 1.717], [0.64, 1.671], [0.65, 1.595], [0.66, 1.529], [0.67, 1.463], [0.68, 1.392], [0.69, 1.325], [0.7, 1.26]],
  },
  roof: { u0: boleroSt(23), u1: boleroSt(110), black: false },
  pillars: [
    // black B- and C-pillars and the rear door's sliding-glass divider
    { bottom: [0.455, 0.49], top: [0.455, 0.49], black: true, mat: 'trim' },
    { bottom: [0.338, 0.345], top: [0.338, 0.345], black: true, mat: 'trim' },
    { bottom: [0.27, 0.3], top: [0.27, 0.3], black: true, mat: 'trim' },
  ],
  // black bumpers (their tops too), the black rocker and running boards, squared black arch flares
  cladding: { top: [[0, 0.76], [0.085, 0.76], [0.1, 0.62], [0.14, 0.55], [0.35, 0.5], [0.7, 0.5], [0.77, 0.55], [0.975, 0.62], [0.985, 0.71], [1, 0.71]], flare: 0.06, flareOut: 0.03, flareU: [0.08, 0.98], cut: true, cover: true },
  doors: [[0.668, 0.665], [0.472, 0.472], [0.29, 0.29]],
  front: [
    // the grille: five slots of black mesh between body-coloured bars, a chrome bar down four of them (no badge)
    { step: 0.005, mat: 'gloss', poly: rrect(-0.415, 0.76, 0.415, 0.96, 0.015) },
    ...[[-0.39, -0.27], [-0.25, -0.11], [-0.085, 0.085], [0.11, 0.25], [0.27, 0.39]].map(([a, b]): Decal => ({ step: 0.005, mat: 'mesh', layer: 1, depth: 0.004, poly: rrect(a, 0.775, b, 0.945, 0.012) })),
    ...[-0.33, -0.18, 0.18, 0.33].map((z): Decal => ({ step: 0.005, mat: 'chrome', layer: 2, depth: 0.014, poly: rrect(z - 0.008, 0.795, z + 0.008, 0.925, 0.006) })),
    // headlamps: a dark housing, the big round reflector outboard, the amber indicator inboard, a chrome line under it
    { step: 0.005, mat: 'gloss', mirror: true, poly: rrect(0.425, 0.775, 0.785, 0.96, 0.03) },
    { step: 0.005, mat: 'chrome', mirror: true, layer: 1, depth: 0.008, poly: boleroCircle(0.655, 0.868, 0.078) },
    { step: 0.005, mat: 'head', mirror: true, layer: 2, depth: 0.012, poly: boleroCircle(0.655, 0.868, 0.026) },
    { step: 0.005, mat: 'amber', mirror: true, layer: 1, poly: rrect(0.46, 0.89, 0.53, 0.935, 0.008) },
    { step: 0.005, mat: 'chrome', mirror: true, layer: 1, depth: 0.008, poly: [[0.445, 0.81], [0.57, 0.81], [0.6, 0.83], [0.6, 0.844], [0.57, 0.824], [0.445, 0.824]] },
    // black bumper: fog lamps in square pods, the lower mesh intake
    { step: 0.005, mat: 'gloss', mirror: true, depth: 0.008, poly: rrect(0.57, 0.5, 0.79, 0.63, 0.02) },
    { step: 0.005, mat: 'chrome', mirror: true, layer: 1, depth: 0.01, poly: boleroCircle(0.675, 0.565, 0.036) },
    { step: 0.005, mat: 'head', mirror: true, layer: 2, depth: 0.012, poly: boleroCircle(0.675, 0.565, 0.024) },
    { step: 0.005, mat: 'mesh', poly: [[-0.38, 0.45], [0.38, 0.45], [0.4, 0.53], [-0.4, 0.53]] },
  ],
  rear: [
    // square tail lamps at the corners: red top and bottom, the clear centre with a red band across it
    { step: 0.005, mat: 'reflector', mirror: true, depth: 0.014, poly: rrect(0.65, 0.78, 0.835, 1.08, 0.012) },
    { step: 0.005, mat: 'silver', mirror: true, layer: 1, depth: 0.016, poly: rrect(0.67, 0.83, 0.815, 1.01, 0.008) },
    { step: 0.005, mat: 'tail', mirror: true, layer: 2, depth: 0.018, poly: rrect(0.675, 0.895, 0.81, 0.95, 0.008) },
    // the side-hinged tailgate's shut lines and handle
    { step: 0.005, mat: 'gloss', mirror: true, depth: 0.001, poly: [[0.6, 0.76], [0.613, 0.76], [0.613, 1.3], [0.6, 1.3]] },
    { step: 0.005, mat: 'gloss', depth: 0.001, poly: [[-0.613, 0.76], [0.613, 0.76], [0.613, 0.773], [-0.613, 0.773]] },
    { step: 0.005, mat: 'satin', depth: 0.012, poly: rrect(-0.45, 1.15, -0.34, 1.21, 0.01) },
    // the black bumper bar
    { step: 0.005, mat: 'trim', poly: rrect(-0.86, 0.6, 0.86, 0.745, 0.02) },
  ],
  side: [
    // the satin strip along the wing, both doors and the rear quarter, the amber repeater on it
    ...[[0.95, 0.676], [0.665, 0.483], [0.457, 0.292], [0.264, 0.086]].map(([a, b]): Decal => ({ step: 0.005, mat: 'satin', depth: 0.008, poly: boleroStrip(b, a) })),
    { step: 0.005, mat: 'amber', layer: 1, depth: 0.01, poly: boleroRectU(0.771, 0.92, 0.789, 0.945, 0.006) },
    // satin door handles, the vent on the rear quarter
    { step: 0.005, mat: 'satin', layer: 1, depth: 0.01, poly: boleroRectU(0.501, 1.1, 0.527, 1.135, 0.008) },
    { step: 0.005, mat: 'satin', layer: 1, depth: 0.01, poly: boleroRectU(0.311, 1.145, 0.337, 1.18, 0.008) },
    { step: 0.005, mat: 'satin', depth: 0.006, poly: boleroRectU(0.088, 1.13, 0.12, 1.195, 0.01) },
    { step: 0.005, mat: 'gloss', layer: 1, depth: 0.008, poly: boleroRectU(0.092, 1.145, 0.116, 1.18, 0.006) },
  ],
  plates: { front: 0.6, rear: 0.67 },
  spare: { y: 1.09, z: 0.19 },
  mirrors: 'black',
  paint: '#070809', // Stealth Black
  plate: 'MH 12 BL 2026',
}

const PUNCH_EV_L = 3.88
/** a side outline from a rounded rectangle given in u (0…1) and metres */
const punchEvRectU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  rrectS(u0 * PUNCH_EV_L, y0, u1 * PUNCH_EV_L, y1, r).map(([x, y]) => [+(x / PUNCH_EV_L).toFixed(5), y] as P2)
/** upright ribs (12 mm wide) at a pitch across |z| ≤ hw between heights y0 and y1, skipping |z| < gap */
const punchEvRibs = (hw: number, y0: number, y1: number, pitch: number, mat: Decal['mat'], layer: number, depth: number, gap = 0): Decal[] => {
  const out: Decal[] = []
  for (let z = pitch / 2; z + 0.006 <= hw; z += pitch)
    for (const s of [-1, 1]) if (z >= gap) out.push({ step: 0.003, mat, layer, depth, poly: rrect(s * z - 0.006, y0, s * z + 0.006, y1, 0.003) })
  return out
}

/** Tata Punch.ev (Feb 2026 facelift). 3880 × 1742 × 1622, wheelbase 2445, 195/60 R16 (top trim).
 *  The Punch's body with the EV's closed nose; traced afresh from the gallery's side photo (1.628 m measured, axles
 *  within 0.7 %), so the axles sit at the official wheelbase with the overhangs split as in the photo. Belt, grey
 *  cladding and shut lines read off the cut-out's pixel columns; the bonnet-edge light bar, the charging-lid panel,
 *  the headlamp pods, the ribbed lower grille and the grey bumpers from the straight front and rear photos. */
export const PUNCH_EV: CarSpec = {
  ...PUNCH,
  id: 'tata-punch-ev',
  name: 'Tata Punch.ev',
  rakedEnds: true,
  dropSlivers: true,
  L: PUNCH_EV_L, W: 1.742, H: 1.622,
  axles: [0.1577, 0.7879],
  tyreR: 0.3202, tyreW: 0.195, rim: 0.635, wheel: { style: 'split', spokes: 5 }, rimTone: 'dark',
  archGap: 0.065, archSquare: 0.4,
  sill: [[0, 0.36], [0.01, 0.35], [0.02, 0.338], [0.035, 0.322], [0.05, 0.305], [0.07, 0.295], [0.1, 0.29], [0.2, 0.24], [0.26, 0.222], [0.4, 0.209], [0.5, 0.2], [0.66, 0.195], [0.75, 0.19], [0.86, 0.18], [0.9, 0.165], [0.93, 0.165], [0.95, 0.19], [0.97, 0.2], [0.99, 0.205], [1, 0.21]],
  // the tail up to the light bar; the body-coloured kick under the black C-pillar; the belt falling along the doors to
  // the mirror; the cowl, then the bonnet curving down to the light bar and the raked nose
  top: [[0, 1.11], [0.005, 1.14], [0.01, 1.155], [0.015, 1.163], [0.03, 1.168], [0.06, 1.176], [0.08, 1.2], [0.09, 1.235], [0.1, 1.26], [0.115, 1.278], [0.15, 1.28], [0.17, 1.268], [0.19, 1.235], [0.21, 1.195], [0.23, 1.177], [0.26, 1.168], [0.3, 1.155], [0.4, 1.128], [0.5, 1.1], [0.6, 1.072], [0.66, 1.058], [0.69, 1.062], [0.7, 1.075], [0.71, 1.098], [0.72, 1.115], [0.74, 1.075], [0.76, 1.058], [0.8, 1.037], [0.84, 1.018], [0.88, 0.993], [0.9, 0.975], [0.92, 0.952], [0.94, 0.925], [0.96, 0.893], [0.97, 0.852], [0.98, 0.815], [0.99, 0.795], [1, 0.785]],
  // rounded corners in plan
  width: [[0, 0.88], [0.008, 0.92], [0.025, 0.955], [0.06, 0.982], [0.12, 0.997], [0.5, 1], [0.88, 0.997], [0.93, 0.99], [0.96, 0.978], [0.98, 0.962], [0.993, 0.945], [1, 0.93]],
  crown: 0.02,
  bulge: 0.02,
  shoulder: { y: [[0, 1.02], [0.5, 0.96], [0.9, 0.9], [1, 0.86]], inset: 0.02 },
  haunch: 0.04,
  bonnetRidge: 0,
  topRadius: 0.09,
  noseSweep: 0.15,
  tailSweep: 0.12,
  greenhouse: {
    u0: 0.015, u1: 0.72, tumble: 0.72,
    // the tailgate glass leaning forward under the roof spoiler, the flat roof, the raked windscreen
    top: [[0.015, 1.163], [0.03, 1.188], [0.05, 1.23], [0.07, 1.285], [0.085, 1.325], [0.095, 1.36], [0.1, 1.39], [0.105, 1.47], [0.11, 1.5], [0.12, 1.508], [0.15, 1.52], [0.2, 1.54], [0.3, 1.568], [0.4, 1.57], [0.48, 1.565], [0.52, 1.525], [0.54, 1.508], [0.56, 1.482], [0.58, 1.475], [0.6, 1.423], [0.62, 1.38], [0.64, 1.328], [0.66, 1.281], [0.68, 1.228], [0.7, 1.175], [0.72, 1.115]],
  },
  roof: { u0: 0.0964, u1: 0.5289, black: false },
  pillars: [
    // the B-pillar and the A-pillar (the wide black C-pillar reads as the dark glass)
    { bottom: [0.395, 0.428], top: [0.398, 0.428], black: true },
    { bottom: [0.705, 0.72], top: [0.518, 0.532], black: true },
  ],
  // unpainted grey plastic: the arch flares, the lower doors and both bumpers
  cladding: { top: [[0, 0.715], [0.03, 0.71], [0.06, 0.69], [0.08, 0.62], [0.12, 0.6], [0.2, 0.6], [0.25, 0.585], [0.28, 0.562], [0.32, 0.58], [0.36, 0.6], [0.42, 0.595], [0.5, 0.565], [0.56, 0.537], [0.6, 0.518], [0.64, 0.495], [0.68, 0.468], [0.72, 0.45], [0.86, 0.42], [0.92, 0.37], [1, 0.37]], flare: 0.06, cut: true, color: '#3c3f43' },
  doors: [[0.705, 0.7], [0.44, 0.43], [0.215, 0.185]],
  front: [
    // the gloss-black light bar along the bonnet's leading edge, lit white at its outer ends
    { step: 0.004, mat: 'gloss', poly: both([[0, 0.902], [0.4, 0.904], [0.6, 0.912], [0.68, 0.924], [0.712, 0.94], [0.708, 0.954], [0.6, 0.945], [0.4, 0.937], [0, 0.935]]) },
    { step: 0.004, mat: 'drl', layer: 1, mirror: true, poly: [[0.44, 0.92], [0.6, 0.925], [0.68, 0.935], [0.703, 0.945], [0.7, 0.951], [0.6, 0.94], [0.44, 0.932]] },
    // the charging lid's shut line under the bar
    { step: 0.004, mat: 'gloss', depth: 0.001, poly: band([[-0.155, 0.885], [-0.16, 0.775], [-0.15, 0.765], [0.15, 0.765], [0.16, 0.775], [0.155, 0.885]], 0.012) },
    // the headlamp pods: grey plastic pockets with the LED lamp, the twin fog lamps and dark slats under them
    { step: 0.004, mat: 'clad', mirror: true, depth: 0.004, poly: smooth([[0.6, 0.778], [0.745, 0.778], [0.75, 0.47], [0.69, 0.47], [0.6, 0.545]], 1) },
    { step: 0.004, mat: 'gloss', mirror: true, layer: 1, depth: 0.008, poly: smooth([[0.625, 0.69], [0.735, 0.69], [0.735, 0.765], [0.645, 0.765]], 1) },
    { step: 0.004, mat: 'head', mirror: true, layer: 2, depth: 0.012, poly: rrect(0.643, 0.703, 0.725, 0.755, 0.01) },
    { step: 0.004, mat: 'gloss', mirror: true, layer: 1, depth: 0.008, poly: rrect(0.648, 0.618, 0.732, 0.657, 0.006) },
    { step: 0.004, mat: 'head', mirror: true, layer: 2, depth: 0.012, poly: rrect(0.655, 0.626, 0.688, 0.65, 0.005) },
    { step: 0.004, mat: 'head', mirror: true, layer: 2, depth: 0.012, poly: rrect(0.692, 0.626, 0.725, 0.65, 0.005) },
    { step: 0.004, mat: 'slats', mirror: true, layer: 1, depth: 0.006, poly: [[0.675, 0.5], [0.735, 0.5], [0.735, 0.595], [0.675, 0.595]] },
    // the grey ribbed lower grille with its dark centre slot (bright ribs in it), the satin skid plate on the grey bumper
    { step: 0.004, mat: 'clad', depth: 0.004, poly: smooth(both([[0, 0.37], [0.6, 0.37], [0.625, 0.4], [0.625, 0.545], [0.6, 0.58], [0, 0.58]]), 1) },
    ...punchEvRibs(0.6, 0.385, 0.565, 0.034, 'trim', 1, 0.008, 0.34),
    { step: 0.004, mat: 'gloss', layer: 1, depth: 0.01, poly: rrect(-0.32, 0.375, 0.32, 0.47, 0.01) },
    ...punchEvRibs(0.3, 0.385, 0.46, 0.034, 'clad', 2, 0.014),
    // the grey bumper face under the grille (the cladding's flat end cap falls behind the swept face)
    { step: 0.004, mat: 'clad', depth: 0.002, poly: both([[0, 0.205], [0.72, 0.205], [0.73, 0.22], [0.73, 0.372], [0, 0.372]]) },
    { step: 0.004, mat: 'satin', layer: 1, depth: 0.01, poly: smooth(both([[0, 0.205], [0.52, 0.205], [0.545, 0.225], [0.545, 0.265], [0.52, 0.282], [0, 0.282]]), 1) },
  ],
  rear: [
    // the smoked band under the tailgate glass with the red line along its top, deepening into the lamp clusters at
    // the corners (a second red bar and the clear reversing lamp in each)
    { step: 0.004, mat: 'gloss', layer: 2, depth: 0.012, poly: both([[0, 1.07], [0.56, 1.07], [0.6, 1.058], [0.625, 1.0], [0.64, 0.982], [0.69, 0.975], [0.705, 0.985], [0.705, 1.155], [0, 1.158]]) },
    { step: 0.004, mat: 'tail', layer: 3, depth: 0.016, poly: [[-0.68, 1.128], [0.68, 1.128], [0.68, 1.141], [-0.68, 1.141]] },
    { step: 0.004, mat: 'tail', layer: 3, depth: 0.016, mirror: true, poly: [[0.635, 1.078], [0.69, 1.078], [0.69, 1.094], [0.635, 1.094]] },
    { step: 0.004, mat: 'silver', layer: 3, depth: 0.014, mirror: true, poly: [[0.645, 1.012], [0.688, 1.012], [0.682, 1.045], [0.645, 1.045]] },
    // the tailgate's shut lines down to the bumper, the red reflector strips above its corners
    { step: 0.004, mat: 'gloss', depth: 0.001, mirror: true, poly: band([[0.625, 0.985], [0.63, 0.76], [0.62, 0.72]], 0.012) },
    { step: 0.004, mat: 'reflector', mirror: true, poly: rrect(0.54, 0.724, 0.712, 0.742, 0.005) },
    // the grey bumper face (rising higher in the middle, round the plate; the cladding's flat end cap falls behind the swept tail)
    { step: 0.004, mat: 'clad', depth: 0.004, poly: smooth(both([[0, 0.385], [0.66, 0.385], [0.7, 0.42], [0.7, 0.69], [0.6, 0.705], [0.6, 0.745], [0.56, 0.765], [0, 0.765]]), 1) },
    // the satin skid plate on the grey bumper, the rear fog lamp in its middle
    { step: 0.004, mat: 'satin', layer: 1, depth: 0.01, poly: smooth(both([[0, 0.39], [0.6, 0.39], [0.65, 0.42], [0.66, 0.535], [0.64, 0.56], [0, 0.56]]), 1) },
    { step: 0.004, mat: 'silver', layer: 2, depth: 0.014, poly: rrect(-0.1, 0.455, 0.1, 0.505, 0.008) },
  ],
  side: [
    // the tail lamp wrapping onto the flank as a wedge pointing forward, its red line along the middle
    { step: 0.003, mat: 'gloss', depth: 0.002, poly: smooth([[0.003, 0.985], [0.02, 1.0], [0.045, 1.035], [0.08, 1.06], [0.12, 1.083], [0.152, 1.103], [0.12, 1.125], [0.08, 1.142], [0.04, 1.152], [0.003, 1.155]], 1) },
    { step: 0.003, mat: 'tail', layer: 1, depth: 0.006, poly: sideBand([[0.012, 1.13], [0.05, 1.122], [0.09, 1.112], [0.125, 1.103]], 0.012, PUNCH_EV_L) },
    { step: 0.003, mat: 'tail', layer: 1, depth: 0.006, poly: sideBand([[0.012, 1.085], [0.03, 1.082], [0.055, 1.075]], 0.012, PUNCH_EV_L) },
    // the headlamp pod's slatted side face
    { step: 0.004, mat: 'trim', depth: 0.004, poly: smooth([[0.958, 0.69], [0.945, 0.69], [0.934, 0.45], [0.95, 0.43], [0.962, 0.45]], 1) },
    // the door handle, body-coloured in a dark recess
    { step: 0.004, mat: 'gloss', depth: 0.002, poly: punchEvRectU(0.448, 0.925, 0.513, 0.978, 0.018) },
    { step: 0.004, mat: 'body', layer: 1, depth: 0.008, poly: punchEvRectU(0.452, 0.935, 0.509, 0.968, 0.012) },
    // the black rocker under the grey door panels
    { step: 0.004, mat: 'trim', depth: 0.004, poly: [[0.275, 0.235], [0.69, 0.215], [0.69, 0.31], [0.275, 0.33]] },
  ],
  plates: { front: 0.527, rear: 0.645 },
  rails: 'black',
  spoiler: false,
  sunroof: undefined,
  mirrors: 'black',
  paint: '#5c2317', // Supernova Copper, the gallery car's paint darkened for the studio lights
  ev: true,
  plate: 'MH 12 PE 2026',
}

const NEXON_EV_L = 3.995
const NEXON_EV_K = 0.99
/** the gallery photo's u (close camera, axles 3.3 % apart) onto the official wheelbase, overhangs split as in the photo */
const nexonEvU = (u: number): number => {
  const a = 0.141, b = 0.7867, A = 0.1491, B = 0.7744
  const v = u <= a ? (u / a) * A : u >= b ? B + ((u - b) / (1 - b)) * (1 - B) : A + ((u - a) / (b - a)) * (B - A)
  return +v.toFixed(5)
}
/** photo-traced [u, y] points: u mapped onto the official axles, heights scaled to the official roof */
const nexonEvP = (pts: P2[]): P2[] => pts.map(([u, y]) => [nexonEvU(u), +(y * NEXON_EV_K).toFixed(4)] as P2)
/** photo-traced side outline: u mapped, heights kept (details are read at the official scale) */
const nexonEvS = (pts: P2[]): P2[] => pts.map(([u, y]) => [nexonEvU(u), y] as P2)
/** diagonal stripes (12 mm) from (z, y0) rising by dz to y1, at a pitch across [z0, z1] */
const nexonEvStripes = (z0: number, z1: number, y0: number, y1: number, dz: number, pitch: number, layer: number): Decal[] => {
  const out: Decal[] = []
  for (let z = z0; z <= z1 + 1e-9; z += pitch) out.push({ step: 0.003, mat: 'satin', layer, depth: 0.012, mirror: true, poly: band([[z, y0], [z + dz, y1]], 0.012) })
  return out
}

/** the charging lid's outline on the rear wing (photo u) */
const NEXON_EV_LID: P2[] = rrectS(0.093 * NEXON_EV_L, 0.86, 0.143 * NEXON_EV_L, 0.98, 0.04).map(([x, y]) => [+(x / NEXON_EV_L).toFixed(5), y] as P2)

/** Tata Nexon.ev (2024–26, 45 kWh). 3995 × 1802 × 1625 (with roof rails), wheelbase 2498, 215/60 R16 (top trim).
 *  The Nexon's body with the EV's closed nose; traced afresh from the gallery's side photo (tyres in grass patched as
 *  dark discs, a background pole erased; 1.642 m over the rails, axles 3.3 % apart, so heights × 0.99 and the axles at
 *  the official wheelbase with the overhangs split as in the photo). Belt, garnish, shut lines, handles and charging lid
 *  read off a metric grid of the cut-out; the light bar, the lamp pods, the striped corner panels and the lower grille
 *  from the straight front photo and the bumper close-ups; the tail as the Nexon's. */
export const NEXON_EV: CarSpec = {
  ...NEXON,
  id: 'tata-nexon-ev',
  name: 'Tata Nexon.ev',
  dropSlivers: true,
  L: NEXON_EV_L, W: 1.802, H: 1.625,
  axles: [0.1491, 0.7744],
  tyreR: 0.332, tyreW: 0.215, rim: 0.612, wheel: { style: 'split', spokes: 5 }, rimTone: 'dark',
  archGap: 0.08, archSquare: 0.3,
  sill: nexonEvP([[0, 0.38], [0.01, 0.37], [0.02, 0.365], [0.04, 0.36], [0.06, 0.33], [0.08, 0.305], [0.27, 0.29], [0.67, 0.29], [0.9, 0.3], [0.95, 0.302], [0.98, 0.303], [0.995, 0.31], [1, 0.33]]),
  // the tail up to the light bar, the belt rising gently to the rear, the sail at the mirror, the bonnet falling to
  // the light bar along the nose
  top: nexonEvP([[0, 1.17], [0.005, 1.19], [0.012, 1.19], [0.02, 1.19], [0.06, 1.2], [0.1, 1.228], [0.16, 1.232], [0.2, 1.222], [0.24, 1.21], [0.3, 1.192], [0.4, 1.153], [0.5, 1.113], [0.6, 1.07], [0.64, 1.062], [0.67, 1.072], [0.7, 1.09], [0.725, 1.12], [0.745, 1.152], [0.76, 1.12], [0.78, 1.107], [0.8, 1.1], [0.82, 1.093], [0.84, 1.087], [0.86, 1.08], [0.88, 1.077], [0.9, 1.058], [0.92, 1.037], [0.94, 1.015], [0.96, 0.995], [0.97, 0.987], [0.98, 0.982], [0.99, 0.979], [1, 0.977]]),
  greenhouse: {
    u0: 0.0211, u1: 0.734, tumble: 0.66,
    // the tailgate glass under the big roof spoiler, the roof under the rails, the raked screen
    top: nexonEvP([[0.02, 1.192], [0.03, 1.205], [0.04, 1.222], [0.05, 1.24], [0.058, 1.258], [0.062, 1.33], [0.066, 1.45], [0.075, 1.47], [0.1, 1.478], [0.13, 1.5], [0.16, 1.535], [0.2, 1.552], [0.25, 1.56], [0.3, 1.577], [0.35, 1.587], [0.4, 1.59], [0.45, 1.585], [0.48, 1.572], [0.5, 1.55], [0.52, 1.535], [0.54, 1.528], [0.56, 1.51], [0.58, 1.478], [0.6, 1.443], [0.62, 1.41], [0.64, 1.377], [0.66, 1.338], [0.68, 1.3], [0.7, 1.24], [0.72, 1.19], [0.745, 1.152]]),
  },
  roof: { u0: 0.06753, u1: 0.51764, black: false },
  pillars: [
    // the wide body-coloured C-pillar behind a black quarter-glass divider, the B-pillar and the A-pillar
    { bottom: [0.0211, nexonEvU(0.19)], top: [0.06753, nexonEvU(0.195)], black: false },
    { bottom: [nexonEvU(0.19), nexonEvU(0.205)], top: [nexonEvU(0.195), nexonEvU(0.21)], black: true },
    { bottom: [nexonEvU(0.395), nexonEvU(0.412)], top: [nexonEvU(0.395), nexonEvU(0.412)], black: true },
    { bottom: [nexonEvU(0.725), 0.734], top: [nexonEvU(0.505), nexonEvU(0.52)], black: true },
  ],
  // black arch flares and sill, the black bumper corners at the tail, the black lip under the nose
  cladding: { top: nexonEvS([[0, 0.6], [0.022, 0.6], [0.04, 0.59], [0.06, 0.58], [0.08, 0.53], [0.12, 0.42], [0.3, 0.395], [0.66, 0.395], [0.7, 0.41], [0.88, 0.4], [0.93, 0.36], [0.96, 0.33], [1, 0.32]]), flare: 0.075, cut: true },
  doors: [[nexonEvU(0.67), nexonEvU(0.67)], [nexonEvU(0.408), nexonEvU(0.405)], [nexonEvU(0.18), nexonEvU(0.166)]],
  front: [
    // the slim light bar along the bonnet's leading edge, lit across the width and rising at the corners
    { step: 0.004, mat: 'gloss', poly: both([[0, 0.93], [0.5, 0.932], [0.62, 0.938], [0.69, 0.948], [0.715, 0.958], [0.71, 0.968], [0.62, 0.958], [0.5, 0.953], [0, 0.952]]) },
    { step: 0.004, mat: 'drl', layer: 1, poly: both([[0, 0.936], [0.5, 0.938], [0.62, 0.944], [0.69, 0.953], [0.706, 0.96], [0.69, 0.962], [0.62, 0.956], [0.5, 0.949], [0, 0.948]]) },
    // the lamp pods at the corners joined by the black slatted band under the closed panel
    { step: 0.004, mat: 'gloss', poly: smooth(both([[0, 0.655], [0.55, 0.645], [0.615, 0.61], [0.765, 0.61], [0.765, 0.785], [0.66, 0.79], [0.615, 0.72], [0.5, 0.722], [0, 0.726]]), 1) },
    { step: 0.004, mat: 'slats', layer: 1, poly: [[-0.5, 0.664], [0.5, 0.664], [0.5, 0.712], [-0.5, 0.712]] },
    { step: 0.004, mat: 'trim', mirror: true, layer: 1, depth: 0.008, poly: rrect(0.655, 0.705, 0.755, 0.78, 0.012) },
    { step: 0.004, mat: 'head', mirror: true, layer: 2, depth: 0.012, poly: rrect(0.67, 0.718, 0.745, 0.77, 0.01) },
    { step: 0.004, mat: 'head', mirror: true, layer: 2, depth: 0.012, poly: rrect(0.672, 0.632, 0.74, 0.664, 0.006) },
    // the black panels with silver diagonal stripes under the pods
    { step: 0.004, mat: 'trim', mirror: true, depth: 0.004, poly: [[0.655, 0.6], [0.765, 0.6], [0.765, 0.41], [0.745, 0.395]] },
    ...nexonEvStripes(0.68, 0.74, 0.44, 0.585, 0.022, 0.026, 1).map((d): Decal => ({ ...d, poly: d.poly.map(([z, y]) => [Math.min(z, 0.758), y] as P2) })),
    // the lower grille: a black trapezoid, upright ribs in the middle, diagonal stripes at its sides
    { step: 0.004, mat: 'gloss', poly: smooth(both([[0, 0.36], [0.6, 0.36], [0.67, 0.375], [0.69, 0.4], [0.6, 0.47], [0.5, 0.53], [0, 0.53]]), 1) },
    ...punchEvRibs(0.3, 0.375, 0.515, 0.032, 'satin', 1, 0.012),
    ...nexonEvStripes(0.34, 0.6, 0.375, 0.46, -0.05, 0.034, 1),
    // the silver lip along the bottom of the bumper
    { step: 0.004, mat: 'satin', layer: 1, poly: smooth(both([[0, 0.318], [0.72, 0.318], [0.755, 0.328], [0.76, 0.352], [0.72, 0.362], [0, 0.362]]), 1) },
  ],
  side: [
    // the tail lamp wrapping onto the flank: the upper bar and the lower wedge of the Y in a black housing
    { step: 0.005, mat: 'gloss', depth: 0.004, poly: nexonEvS([[0.004, 1.02], [0.03, 1.03], [0.055, 1.13], [0.06, 1.17], [0.004, 1.178]]) },
    { step: 0.005, mat: 'tail', layer: 1, poly: nexonEvS([[0.006, 1.15], [0.054, 1.152], [0.056, 1.166], [0.006, 1.166]]) },
    { step: 0.005, mat: 'tail', layer: 1, poly: nexonEvS([[0.008, 1.035], [0.028, 1.042], [0.045, 1.075], [0.008, 1.075]]) },
    // body-coloured door handles
    { step: 0.005, mat: 'body', depth: 0.01, poly: nexonEvS(smooth([[0.448, 0.945], [0.508, 0.945], [0.508, 0.985], [0.448, 0.985]], 1)) },
    { step: 0.005, mat: 'body', depth: 0.01, poly: nexonEvS(smooth([[0.183, 1.033], [0.236, 1.033], [0.236, 1.072], [0.183, 1.072]], 1)) },
    // the black insert along the lower doors' garnish, the charging lid on the rear wing
    { step: 0.004, mat: 'gloss', depth: 0.004, poly: nexonEvS([[0.3, 0.44], [0.315, 0.43], [0.655, 0.425], [0.668, 0.44], [0.662, 0.47], [0.3, 0.475]]) },
    { step: 0.004, mat: 'gloss', depth: 0.001, poly: nexonEvS(sideBand([...NEXON_EV_LID, NEXON_EV_LID[0]], 0.012, NEXON_EV_L)) },
    // the lamp pod's side face, and the light bar sweeping back along the wing
    { step: 0.004, mat: 'gloss', depth: 0.004, poly: nexonEvS(smooth([[0.942, 0.62], [0.942, 0.78], [0.93, 0.78], [0.924, 0.64]], 1)) },
    { step: 0.004, mat: 'drl', depth: 0.006, poly: nexonEvS(sideBand([[0.996, 0.95], [0.96, 0.955], [0.92, 0.96], [0.89, 0.965]], 0.012, NEXON_EV_L)) },
  ],
  plates: { front: 0.57, rear: 0.645 },
  rails: 'black',
  sunroof: [0.35, 0.47],
  mirrors: 'black',
  paint: '#a1a69c', // Empowered Oxide, the gallery car's pale grey-green, darkened for the studio lights
  ev: true,
  plate: 'MH 12 NE 2026',
}

const THAR3_L = 4.125
/** the side photo's axles (u 0.2275 / 0.8349, 2.3 % apart from the close camera) mapped onto the official wheelbase,
 *  overhangs in the photo's ratio; applied to everything traced along the side except the silhouette */
const thar3U = (u: number): number => {
  const k: [number, number][] = [[0, 0], [0.2275, 0.2355], [0.8349, 0.8295], [1, 1]]
  for (let i = 1; i < k.length; i++) if (u <= k[i][0]) return +(k[i - 1][1] + ((u - k[i - 1][0]) * (k[i][1] - k[i - 1][1])) / (k[i][0] - k[i - 1][0])).toFixed(5)
  return 1
}
const thar3P = (pts: P2[]): P2[] => pts.map(([u, y]) => [thar3U(u), y] as P2)
/** a side outline from a rounded rectangle given in photo u and metres */
const thar3RectU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  thar3P(rrectS(u0 * THAR3_L, y0, u1 * THAR3_L, y1, r).map(([x, y]) => [x / THAR3_L, y] as P2))
const THAR3_LID: P2[] = rrectS(0.12 * THAR3_L, 0.985, 0.156 * THAR3_L, 1.1, 0.02).map(([x, y]) => [x / THAR3_L, y] as P2)
const THAR3_GH: [number, number] = [0.08, 0.64]
/** a glasshouse station (roof and pillar edges sit on them) */
const thar3St = (i: number) => +(THAR3_GH[0] + (THAR3_GH[1] - THAR3_GH[0]) * (0.5 - 0.5 * Math.cos((Math.PI * i) / 140))).toFixed(5)
// the five-slot grille: tall mesh slots between body-coloured bars
const thar3Slots: Decal[] = [-0.284, -0.142, 0, 0.142, 0.284].map((z): Decal => (
  { step: 0.005, mat: 'mesh', depth: 0.004, poly: rrect(z - 0.055, 0.748, z + 0.055, 1.0, 0.012) }
))

/** Mahindra Thar (3-door, Sept 2026 update). 3995 × 1870 × 1855, wheelbase 2450, 255/65 R18 (LXT / ZXT 4WD). The
 *  official length is to the rear bumper; over the tailgate spare it is 4.125 m (the photo's bumper-to-bumper span at
 *  the official scale). Side profile from a levelled gallery side photo (1.865 m measured, axles 2.3 % apart: axles at
 *  the official wheelbase, side details mapped with them). Lamps, grille and bumpers from the straight front and rear
 *  photos and the close-ups. Black hard top over body-coloured door frames, black flat-topped flares and bumpers. */
export const THAR: CarSpec = {
  id: 'mahindra-thar',
  name: 'Mahindra Thar',
  rakedEnds: true,
  dropSlivers: true,
  L: THAR3_L, W: 1.87, H: 1.855,
  axles: [0.2355, 0.8295],
  tyreR: 0.394, tyreW: 0.255, rim: 0.58, wheel: { style: 'split', spokes: 5 }, rimTone: 'dark',
  archGap: 0.05, archSquare: 0.6,
  // a small tow block under the spare, the rear bumper, the chassis behind it, the side steps, the front bumper
  sill: [[0, 0.72], [0.03, 0.72], [0.034, 0.5], [0.038, 0.48], [0.1, 0.465], [0.12, 0.44], [0.13, 0.43], [0.3, 0.31], [0.35, 0.3], [0.5, 0.3], [0.69, 0.31], [0.72, 0.33], [0.93, 0.4], [0.96, 0.41], [0.98, 0.44], [0.995, 0.46], [1, 0.5]],
  // the tow block, the bumper, the upright tailgate up to its top, the flat belt under the hard top, the door's lower
  // window sill, the flat bonnet falling to the upright grille face, the front bumper standing proud of it
  top: [[0, 0.74], [0.03, 0.74], [0.034, 0.735], [0.038, 0.75], [0.0465, 0.75], [0.0475, 0.76], [0.049, 0.905], [0.0505, 1.05], [0.052, 1.195], [0.053, 1.28], [0.08, 1.282], [0.1, 1.277], [0.2, 1.272], [0.3, 1.27], [0.38, 1.266], [0.386, 1.24], [0.392, 1.212], [0.45, 1.206], [0.5, 1.205], [0.57, 1.21], [0.62, 1.222], [0.64, 1.227], [0.7, 1.206], [0.75, 1.198], [0.8, 1.176], [0.85, 1.157], [0.88, 1.136], [0.9, 1.112], [0.92, 1.091], [0.93, 1.088], [0.937, 1.085], [0.9395, 0.997], [0.942, 0.905], [0.9445, 0.812], [0.947, 0.72], [0.952, 0.7], [0.958, 0.69], [0.97, 0.688], [0.98, 0.68], [0.99, 0.672], [0.997, 0.66], [1, 0.645]],
  // boxy: flat flanks with rounded corners; both bumpers as wide as the flares, the tow block narrow
  width: [[0, 0.2], [0.03, 0.2], [0.033, 0.9], [0.037, 0.95], [0.042, 0.965], [0.0455, 0.96], [0.048, 0.9], [0.052, 0.91], [0.06, 0.915], [0.08, 0.918], [0.5, 0.92], [0.9, 0.918], [0.93, 0.912], [0.94, 0.905], [0.948, 0.93], [0.96, 0.965], [0.985, 0.965], [0.995, 0.93], [1, 0.87]],
  crown: 0.01,
  bulge: 0.004,
  haunch: 0.008,
  topRadius: 0.06,
  noseSweep: 0.04,
  tailSweep: 0.03,
  greenhouse: {
    u0: THAR3_GH[0], u1: THAR3_GH[1], tumble: 0.94,
    // the hard top: upright back face, a roof falling gently over the front door to the near-upright windscreen
    top: [[0.08, 1.282], [0.0815, 1.45], [0.083, 1.6], [0.085, 1.705], [0.088, 1.77], [0.092, 1.805], [0.098, 1.825], [0.105, 1.836], [0.12, 1.842], [0.2, 1.847], [0.3, 1.843], [0.35, 1.834], [0.4, 1.824], [0.45, 1.803], [0.5, 1.785], [0.55, 1.76], [0.57, 1.754], [0.576, 1.748], [0.582, 1.732], [0.587, 1.705], [0.597, 1.615], [0.607, 1.517], [0.617, 1.42], [0.628, 1.318], [0.64, 1.227]],
  },
  // the black hard top (the glass in its upright back face stays glass)
  roof: { u0: thar3St(11), u1: thar3St(112), black: true },
  pillars: [
    // the body-coloured door frame's rear edge and the windscreen frame
    { bottom: [thar3U(0.39), thar3U(0.412)], top: [thar3U(0.39), thar3U(0.412)], black: false },
    { bottom: [thar3U(0.574), 0.635], top: [thar3U(0.57), thar3U(0.592)], black: false },
  ],
  // black bumpers (their tops too), the black side steps, big flat-topped flares
  cladding: { top: thar3P([[0, 0.76], [0.03, 0.76], [0.033, 0.78], [0.046, 0.78], [0.048, 0.755], [0.12, 0.755], [0.135, 0.6], [0.15, 0.45], [0.7, 0.45], [0.72, 0.5], [0.93, 0.56], [0.942, 0.6], [0.946, 0.69], [0.952, 0.72], [1, 0.72]]), flare: 0.15, flareOut: 0.07, flareU: [0.06, 0.944], cut: true, cover: true },
  doors: [[thar3U(0.586), thar3U(0.586)], [thar3U(0.39), thar3U(0.39)]],
  front: [
    ...thar3Slots,
    // round headlamps in raised body-coloured pods: dark lens, LED ring open towards the grille, square projector
    { step: 0.005, mat: 'body', mirror: true, depth: 0.018, poly: tharCircle(0.484, 0.94, 0.112) },
    { step: 0.005, mat: 'gloss', mirror: true, layer: 1, depth: 0.022, poly: tharCircle(0.484, 0.94, 0.096) },
    { step: 0.005, mat: 'drl', mirror: true, layer: 2, depth: 0.024, poly: tharC(0.484, 0.94, 0.084, 0.016, Math.PI * 1.08, 0.3) },
    { step: 0.005, mat: 'head', mirror: true, layer: 2, depth: 0.024, poly: rrect(0.451, 0.926, 0.517, 0.954, 0.008) },
    // the LED lamps in black boxes on the front wings, outboard of the headlamps
    { step: 0.005, mat: 'gloss', mirror: true, depth: 0.012, poly: rrect(0.665, 0.862, 0.805, 0.936, 0.01) },
    { step: 0.005, mat: 'drl', mirror: true, layer: 1, depth: 0.013, poly: rrect(0.678, 0.898, 0.792, 0.924, 0.005) },
    // the black panels under the lamps with two small lamps each, down to the bumper
    { step: 0.005, mat: 'trim', mirror: true, depth: 0.006, poly: [[0.37, 0.69], [0.815, 0.69], [0.815, 0.838], [0.64, 0.838], [0.6, 0.8], [0.4, 0.8], [0.37, 0.775]] },
    { step: 0.005, mat: 'head', mirror: true, layer: 1, depth: 0.01, poly: rrect(0.678, 0.75, 0.708, 0.776, 0.005) },
    { step: 0.005, mat: 'head', mirror: true, layer: 1, depth: 0.01, poly: rrect(0.764, 0.75, 0.794, 0.776, 0.005) },
    // the bumper: a satin-grey face with two black blocks either side of the plate
    { step: 0.005, mat: 'satin', depth: 0.006, poly: rrect(-0.85, 0.48, 0.85, 0.66, 0.03) },
    { step: 0.005, mat: 'trim', mirror: true, layer: 1, depth: 0.012, poly: rrect(0.36, 0.49, 0.52, 0.645, 0.02) },
  ],
  rear: [
    // square tail lamps: a black box, a red frame open to the outside, a lit red upper pane, the amber bar, the
    // clear reversing pane
    { step: 0.005, mat: 'gloss', mirror: true, depth: 0.018, poly: rrect(0.64, 0.84, 0.83, 1.07, 0.02) },
    { step: 0.005, mat: 'tail', mirror: true, layer: 1, depth: 0.02, poly: rrect(0.65, 0.848, 0.785, 1.062, 0.014) },
    { step: 0.005, mat: 'gloss', mirror: true, layer: 2, depth: 0.02, poly: rrect(0.672, 0.87, 0.775, 1.04, 0.006) },
    { step: 0.005, mat: 'tail', mirror: true, layer: 3, depth: 0.02, poly: rrect(0.68, 0.975, 0.768, 1.032, 0.005) },
    { step: 0.005, mat: 'amber', mirror: true, layer: 3, depth: 0.02, poly: rrect(0.678, 0.952, 0.77, 0.966, 0.004) },
    { step: 0.005, mat: 'silver', mirror: true, layer: 3, depth: 0.02, poly: rrect(0.68, 0.878, 0.768, 0.942, 0.005) },
    // the side-hinged tailgate's shut lines and its upright handle
    { step: 0.005, mat: 'gloss', mirror: true, depth: 0.001, poly: [[0.59, 0.77], [0.603, 0.77], [0.603, 1.27], [0.59, 1.27]] },
    { step: 0.005, mat: 'trim', depth: 0.016, poly: rrect(-0.5, 0.89, -0.44, 1.07, 0.02) },
    // the black bumper face (covers the swept end cap), its satin-grey centre, red reflectors in its black ends
    { step: 0.005, mat: 'trim', depth: 0.003, poly: rrect(-0.86, 0.49, 0.86, 0.74, 0.02) },
    { step: 0.005, mat: 'satin', layer: 1, depth: 0.01, poly: rrect(-0.6, 0.5, 0.6, 0.66, 0.02) },
    { step: 0.005, mat: 'reflector', mirror: true, layer: 1, depth: 0.006, poly: rrect(0.79, 0.57, 0.84, 0.7, 0.008) },
  ],
  side: [
    // the body-coloured window frame along the top of the door
    { step: 0.005, mat: 'body', poly: thar3P([[0.392, 1.695], [0.53, 1.695], [0.5, 1.707], [0.45, 1.725], [0.392, 1.748]]) },
    // the hard top's black side panel round the quarter glass
    { step: 0.005, mat: 'trim', layer: 1, poly: thar3RectU(0.095, 1.29, 0.388, 1.74, 0.03) },
    { step: 0.005, mat: 'glass', layer: 2, poly: thar3RectU(0.12, 1.37, 0.356, 1.7, 0.035) },
    // the door's rear shut line up the frame
    { step: 0.005, mat: 'gloss', depth: 0.001, poly: thar3P([[0.3885, 1.21], [0.3915, 1.21], [0.3915, 1.755], [0.3885, 1.755]]) },
    // door handle, fuel lid, the amber marker on the front flare
    { step: 0.005, mat: 'gloss', depth: 0.012, poly: thar3RectU(0.41, 0.976, 0.45, 1.014, 0.012) },
    { step: 0.005, mat: 'gloss', depth: 0.001, poly: thar3P(sideBand([...THAR3_LID, THAR3_LID[0]], 0.012, THAR3_L)) },
    // the grey top edge of the side step
    { step: 0.005, mat: 'satin', poly: thar3RectU(0.37, 0.415, 0.69, 0.43, 0.006) },
  ],
  plates: { front: 0.56, rear: 0.55 },
  spare: { y: 1.09 },
  mirrors: 'black',
  mirrorU: thar3U(0.575),
  satinColor: '#5c6166',
  paint: '#800c1a', // Tango Red, darkened for the studio lights
  plate: 'MH 12 TH 2026',
}

const KIGER_L = 3.99
/** photo u → model u: the gallery camera spreads the axles 2 %, so doors, handles, cladding and pillars are mapped
 *  piecewise-linearly onto the official wheelbase; the silhouette stays in photo u */
const kigerU = (u: number): number => {
  const pa = 0.1634, pb = 0.8022, ma = 0.1689, mb = 0.7955
  const v = u <= pa ? (u * ma) / pa : u <= pb ? ma + ((u - pa) * (mb - ma)) / (pb - pa) : mb + ((u - pb) * (1 - mb)) / (1 - pb)
  return +v.toFixed(5)
}
const kigerP = (pts: P2[]): P2[] => pts.map(([u, y]) => [kigerU(u), y] as P2)
/** a side outline from a rounded rectangle given in photo u and metres */
const kigerRectU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  kigerP(rrectS(u0 * KIGER_L, y0, u1 * KIGER_L, y1, r).map(([x, y]) => [+(x / KIGER_L).toFixed(5), y] as P2))
/** all heights × k: the gallery photo reads 3.3 % tall (close camera; its tyre comes out at the official size after it) */
const kigerK = (s: CarSpec, k: number): CarSpec => {
  const ys = (pts: P2[]): P2[] => pts.map(([a, y]) => [a, +(y * k).toFixed(4)] as P2)
  const ds = (list: Decal[] | undefined) => list?.map((d) => ({ ...d, poly: ys(d.poly) }))
  return {
    ...s, sill: ys(s.sill), top: ys(s.top), greenhouse: { ...s.greenhouse, top: ys(s.greenhouse.top) },
    cladding: s.cladding && { ...s.cladding, top: ys(s.cladding.top) },
    front: ds(s.front)!, rear: ds(s.rear)!, side: ds(s.side),
    plates: { front: +(s.plates.front * k).toFixed(3), rear: +(s.plates.rear * k).toFixed(3) },
  }
}

/** the upper grille's row of gloss blocks (wider at the top), kept off the centre line where the badge mount sits */
const kigerBlocks: Decal[] = [0.1, 0.19, 0.28, 0.37, 0.455].map((z): Decal => ({
  step: 0.004, mat: 'gloss', layer: 2, depth: 0.01, mirror: true,
  poly: smooth([[z - 0.042, 0.92], [z + 0.042, 0.92], [z + 0.03, 0.878], [z - 0.03, 0.878]], 1),
}))

/** Renault Kiger (2025 facelift). 3990 × 1750 × 1605 (with roof rails), wheelbase 2500, 195/60 R16.
 *  Side profile from the gallery's levelled side photo (1.658 m measured over the rails and antenna, the axles 2 % apart):
 *  heights × 0.968 (the photo's tyre then matches 195/60 R16), axles at the official wheelbase with the overhangs split as
 *  in the photo, lower-body lines mapped with them (`kigerU`). Belt kick, glass, shut lines, handles, cladding and the door
 *  garnish read off a metric grid of the levelled cut-out; the slim DRLs over the split headlamp pods, the satin X-frame
 *  round the lower grille and the bumpers from the straight front photo; the C-shaped tail lamps, chrome strip and the
 *  black bumper with its satin skid plate from the straight rear photo. All heights below are in photo metres. */
export const KIGER: CarSpec = kigerK({
  id: 'renault-kiger',
  name: 'Renault Kiger',
  L: KIGER_L, W: 1.75, H: 1.605,
  axles: [0.1689, 0.7955],
  tyreR: 0.32, tyreW: 0.195, rim: 0.635, wheel: { style: 'split', spokes: 4 }, rimTone: 'dark',
  archGap: 0.13, archSquare: 0.35, wellInset: 0.05,
  sill: [[0, 0.3], [0.01, 0.31], [0.02, 0.32], [0.03, 0.32], [0.05, 0.3], [0.08, 0.28], [0.27, 0.265], [0.35, 0.24], [0.5, 0.235], [0.7, 0.225], [0.88, 0.24], [0.95, 0.243], [0.97, 0.25], [0.985, 0.235], [1, 0.22]],
  // the tail up to the lamp tops, the belt kicking up to the quarter-glass corner, falling along the doors to the mirror,
  // the cowl, then the bonnet (lowered by its crown) rolling down to the upright face
  top: [[0, 1.17], [0.005, 1.176], [0.012, 1.182], [0.02, 1.19], [0.04, 1.205], [0.07, 1.23], [0.1, 1.258], [0.13, 1.284], [0.16, 1.306], [0.19, 1.323], [0.21, 1.33], [0.222, 1.326], [0.235, 1.305], [0.25, 1.275], [0.26, 1.252], [0.27, 1.228], [0.285, 1.205], [0.3, 1.193], [0.4, 1.177], [0.5, 1.161], [0.6, 1.146], [0.65, 1.139], [0.69, 1.136], [0.71, 1.14], [0.735, 1.148], [0.76, 1.143], [0.8, 1.124], [0.85, 1.098], [0.9, 1.07], [0.93, 1.044], [0.95, 1.016], [0.965, 0.996], [0.975, 0.984], [0.985, 0.975], [1, 0.97]],
  width: [[0, 0.94], [0.008, 0.96], [0.02, 0.975], [0.05, 0.988], [0.1, 0.997], [0.5, 1], [0.88, 0.996], [0.93, 0.978], [0.96, 0.956], [0.985, 0.928], [1, 0.91]],
  crown: 0.012,
  bulge: 0.02,
  haunch: 0.05,
  topRadius: 0.09,
  noseSweep: 0.17,
  tailSweep: 0.1,
  dropSlivers: true,
  greenhouse: {
    u0: 0.02, u1: 0.735, tumble: 0.72,
    // the raked tailgate glass under the roof spoiler, the roof under the rails, the screen
    top: [[0.02, 1.15], [0.03, 1.1867], [0.04, 1.2133], [0.06, 1.275], [0.08, 1.32], [0.1, 1.37], [0.108, 1.4098], [0.113, 1.4678], [0.118, 1.5108], [0.13, 1.538], [0.15, 1.55], [0.2, 1.568], [0.25, 1.588], [0.3, 1.603], [0.35, 1.61], [0.4, 1.613], [0.45, 1.608], [0.5, 1.598], [0.52, 1.59], [0.54, 1.576], [0.56, 1.541], [0.58, 1.4937], [0.6, 1.455], [0.62, 1.43], [0.64, 1.4], [0.66, 1.36], [0.68, 1.319], [0.7, 1.27], [0.72, 1.195], [0.735, 1.148]],
  },
  roof: { u0: 0.11363, u1: 0.53262, black: false },
  pillars: [
    // the black B-pillar
    { bottom: [kigerU(0.425), kigerU(0.447)], top: [kigerU(0.425), kigerU(0.447)], black: true },
  ],
  // the wide black arch flares, the black strip under the doors, the black bumper corners
  cladding: { top: [[0, 0.62], [kigerU(0.04), 0.62], [kigerU(0.06), 0.5], [kigerU(0.08), 0.3], [kigerU(0.66), 0.3], [kigerU(0.9), 0.3], [kigerU(0.93), 0.5], [1, 0.5]], flare: 0.085, cut: true },
  doors: [[kigerU(0.675), kigerU(0.7)], [kigerU(0.444), kigerU(0.437)], [kigerU(0.205), kigerU(0.217)]],
  front: [
    // the slim DRL lamps under the bonnet edge, joined by the gloss-black upper grille
    { step: 0.004, mat: 'trim', poly: smooth(both([[0, 0.858], [0.5, 0.862], [0.729, 0.865], [0.758, 0.885], [0.758, 0.93], [0.729, 0.948], [0.5, 0.947], [0, 0.952]]), 1) },
    { step: 0.004, mat: 'chrome', layer: 1, depth: 0.006, poly: band([[-0.48, 0.932], [0.48, 0.932]], 0.012) },
    ...kigerBlocks,
    { step: 0.004, mat: 'drl', layer: 1, mirror: true, poly: band([[0.522, 0.922], [0.64, 0.926], [0.744, 0.925]], 0.014) },
    { step: 0.004, mat: 'amber', layer: 1, mirror: true, poly: band([[0.591, 0.9], [0.739, 0.902]], 0.012) },
    // the headlamp pods: black housings, three LED lenses each
    { step: 0.004, mat: 'gloss', mirror: true, poly: smooth([[0.42, 0.7], [0.45, 0.64], [0.5, 0.612], [0.719, 0.602], [0.754, 0.625], [0.76, 0.7], [0.749, 0.752], [0.591, 0.765], [0.45, 0.758]], 1) },
    ...[0.53, 0.6, 0.67].map((z): Decal => ({ step: 0.004, mat: 'head', layer: 1, mirror: true, poly: rrect(z, 0.66, z + 0.055, 0.712, 0.01) })),
    // the black slot between the pods
    { step: 0.004, mat: 'gloss', poly: rrect(-0.42, 0.672, 0.42, 0.698, 0.008) },
    // the black lower bumper, the satin frame round the lower grille, the fog lamps in the corners
    { step: 0.004, mat: 'trim', poly: smooth(both([[0, 0.21], [0.709, 0.21], [0.754, 0.26], [0.766, 0.36], [0.766, 0.505], [0.611, 0.505], [0.542, 0.6], [0, 0.6]]), 1) },
    { step: 0.004, mat: 'satin', layer: 1, poly: smooth(both([[0, 0.32], [0.621, 0.32], [0.66, 0.345], [0.67, 0.5], [0.522, 0.625], [0.46, 0.655], [0, 0.655]]), 1) },
    { step: 0.004, mat: 'mesh', layer: 2, depth: 0.008, poly: smooth(both([[0, 0.365], [0.591, 0.365], [0.611, 0.385], [0.611, 0.49], [0.5, 0.6], [0, 0.61]]), 1) },
    { step: 0.004, mat: 'head', layer: 1, mirror: true, poly: rrect(0.712, 0.418, 0.762, 0.448, 0.008) },
  ],
  rear: [
    // C-shaped tail lamps: smoked housings with a black spur inboard, red guides top, inside and bottom, a clear centre
    { step: 0.004, mat: 'trim', mirror: true, poly: smooth([[0.5, 1.1], [0.625, 1.1], [0.63, 0.985], [0.66, 0.955], [0.775, 0.955], [0.795, 0.975], [0.797, 1.13], [0.78, 1.158], [0.5, 1.16]], 1) },
    { step: 0.004, mat: 'tail', layer: 1, mirror: true, poly: rrect(0.635, 1.124, 0.785, 1.142, 0.005) },
    { step: 0.004, mat: 'tail', layer: 1, mirror: true, poly: rrect(0.635, 0.975, 0.653, 1.142, 0.005) },
    { step: 0.004, mat: 'tail', layer: 1, mirror: true, poly: rrect(0.635, 0.968, 0.775, 0.986, 0.005) },
    { step: 0.004, mat: 'silver', layer: 1, mirror: true, poly: rrect(0.67, 1.0, 0.77, 1.105, 0.008) },
    { step: 0.004, mat: 'tail', layer: 1, mirror: true, poly: rrect(0.515, 1.124, 0.62, 1.136, 0.004) },
    // the satin strip across the tailgate
    { step: 0.004, mat: 'satin', depth: 0.006, poly: rrect(-0.63, 0.798, 0.63, 0.814, 0.005) },
    // the black bumper, the satin skid plate with red reflectors at its top corners
    { step: 0.004, mat: 'trim', poly: smooth(both([[0, 0.29], [0.72, 0.29], [0.78, 0.34], [0.795, 0.45], [0.795, 0.62], [0.77, 0.74], [0.7, 0.775], [0, 0.775]]), 1) },
    { step: 0.004, mat: 'satin', layer: 1, poly: smooth(both([[0, 0.432], [0.65, 0.432], [0.685, 0.46], [0.67, 0.52], [0.61, 0.585], [0.4, 0.585], [0.36, 0.555], [0, 0.555]]), 1) },
    { step: 0.004, mat: 'trim', layer: 2, depth: 0.012, poly: smooth(both([[0, 0.505], [0.6, 0.505], [0.632, 0.53], [0.6, 0.567], [0, 0.567]]), 1) },
    { step: 0.004, mat: 'reflector', layer: 3, depth: 0.016, mirror: true, poly: rrect(0.43, 0.522, 0.55, 0.555, 0.006) },
  ],
  side: [
    // the tail lamp wrapping onto the flank to a point, its red guide along the top
    { step: 0.003, mat: 'trim', depth: 0.002, poly: smooth([[0.002, 0.98], [0.015, 0.982], [0.03, 0.995], [0.05, 1.04], [0.072, 1.095], [0.076, 1.12], [0.068, 1.135], [0.002, 1.14]], 1) },
    { step: 0.003, mat: 'tail', layer: 1, depth: 0.004, poly: [[0.004, 1.113], [0.06, 1.116], [0.062, 1.13], [0.004, 1.13]] },
    // black door handles and the black garnish on the front wing
    { step: 0.004, mat: 'trim', depth: 0.01, poly: kigerRectU(0.466, 0.965, 0.526, 0.993, 0.012) },
    { step: 0.004, mat: 'trim', depth: 0.01, poly: kigerRectU(0.205, 1.03, 0.264, 1.058, 0.012) },
    { step: 0.004, mat: 'trim', depth: 0.006, poly: kigerP(smooth([[0.705, 0.945], [0.74, 0.945], [0.748, 0.965], [0.74, 0.99], [0.705, 0.99]], 1)) },
    // the black door garnish low on the doors
    { step: 0.004, mat: 'trim', depth: 0.004, poly: kigerP(smooth([[0.293, 0.4], [0.305, 0.375], [0.64, 0.375], [0.672, 0.455], [0.668, 0.468], [0.3, 0.462], [0.293, 0.45]], 1)) },
  ],
  plates: { front: 0.51, rear: 0.65 },
  rails: 'silver',
  mirrors: 'black',
  paint: '#b8901c', // Oasis Yellow, darkened for the studio lights
  plate: 'MH 12 KG 2026',
  satinColor: '#62676c',
}, 0.968)

const MAGNITE_L = 3.994
/** photo u → model u: the gallery camera spreads the axles 1.6 %, so doors, handles, cladding and pillars are mapped
 *  piecewise-linearly onto the official wheelbase; the silhouette stays in photo u */
const magniteU = (u: number): number => {
  const pa = 0.1729, pb = 0.8091, ma = 0.1778, mb = 0.8037
  const v = u <= pa ? (u * ma) / pa : u <= pb ? ma + ((u - pa) * (mb - ma)) / (pb - pa) : mb + ((u - pb) * (1 - mb)) / (1 - pb)
  return +v.toFixed(5)
}
const magniteP = (pts: P2[]): P2[] => pts.map(([u, y]) => [magniteU(u), y] as P2)
/** a side outline from a rounded rectangle given in photo u and metres */
const magniteRectU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  magniteP(rrectS(u0 * MAGNITE_L, y0, u1 * MAGNITE_L, y1, r).map(([x, y]) => [+(x / MAGNITE_L).toFixed(5), y] as P2))
/** the big grille's dark hexagonal blocks: staggered rows of short trim bricks, kept inside its outline and off the centre */
const magniteGrilleHW = (y: number) => (y > 0.6 ? 0.5 + ((y - 0.6) / 0.26) * 0.08 : 0.4 + ((y - 0.49) / 0.11) * 0.1) - 0.05
const magniteBricks: Decal[] = [0.545, 0.6, 0.655, 0.71, 0.765, 0.82].flatMap((y, row) => {
  const zs = row % 2 ? [0.11, 0.22, 0.33, 0.44, 0.55] : [0.055, 0.165, 0.275, 0.385, 0.495]
  return zs.filter((z) => z + 0.04 < magniteGrilleHW(y)).map((z): Decal => ({
    step: 0.004, mat: 'trim', layer: 2, depth: 0.012, mirror: true,
    poly: [[z - 0.042, y], [z - 0.03, y - 0.014], [z + 0.03, y - 0.014], [z + 0.042, y], [z + 0.03, y + 0.014], [z - 0.03, y + 0.014]],
  }))
})

/** Nissan Magnite (late-2024 facelift). 3994 × 1758 × 1572 (with roof rails), wheelbase 2500, 195/60 R16.
 *  Side profile from the gallery's levelled side photo (1.581 m measured over the rails, the axles 1.6 % apart): heights
 *  × 0.994, axles at the official wheelbase with the overhangs split as in the photo, lower-body lines mapped with them
 *  (`magniteU`). Belt, D-pillar, shut lines, handles and the door strip read off a metric grid of the levelled cut-out; the
 *  big hex grille with its chrome side frames, the slim swept headlamps, the L-shaped DRLs and the silver U skid plate from
 *  the straight front photo; the smoked tail lamps joined by the satin bar and the bumper from the straight rear photo.
 *  All heights below are in photo metres. */
export const MAGNITE: CarSpec = kigerK({
  id: 'nissan-magnite',
  name: 'Nissan Magnite',
  L: MAGNITE_L, W: 1.758, H: 1.572,
  axles: [0.1778, 0.8037],
  tyreR: 0.32, tyreW: 0.195, rim: 0.635, wheel: { style: 'split', spokes: 5 }, rimTone: 'dark',
  archGap: 0.13, archSquare: 0.3, wellInset: 0.05,
  sill: [[0, 0.27], [0.01, 0.285], [0.02, 0.295], [0.04, 0.29], [0.06, 0.275], [0.08, 0.257], [0.28, 0.24], [0.36, 0.215], [0.5, 0.215], [0.7, 0.205], [0.9, 0.213], [0.95, 0.217], [0.97, 0.225], [0.985, 0.215], [1, 0.2]],
  // the tail up over the lamps, the belt rising gently to the quarter glass, the cowl, the bonnet falling to the nose
  // (kept above the swept headlamps)
  top: [[0, 1.13], [0.01, 1.143], [0.02, 1.15], [0.06, 1.18], [0.12, 1.21], [0.18, 1.235], [0.21, 1.245], [0.24, 1.222], [0.26, 1.2], [0.3, 1.168], [0.4, 1.145], [0.5, 1.126], [0.6, 1.113], [0.7, 1.104], [0.755, 1.102], [0.78, 1.088], [0.8, 1.076], [0.85, 1.045], [0.9, 1.007], [0.93, 0.983], [0.96, 0.962], [0.98, 0.955], [1, 0.95]],
  width: [[0, 0.94], [0.008, 0.96], [0.02, 0.975], [0.05, 0.988], [0.1, 0.997], [0.5, 1], [0.88, 0.996], [0.93, 0.98], [0.96, 0.965], [0.985, 0.945], [1, 0.93]],
  crown: 0.012,
  bulge: 0.02,
  haunch: 0.045,
  topRadius: 0.08,
  noseSweep: 0.12,
  tailSweep: 0.1,
  dropSlivers: true,
  greenhouse: {
    u0: 0.02, u1: 0.755, tumble: 0.74,
    // the raked tailgate glass under the black roof spoiler, the roof under the rails, the screen
    top: [[0.02, 1.15], [0.04, 1.175], [0.06, 1.218], [0.08, 1.27], [0.1, 1.325], [0.108, 1.39], [0.115, 1.45], [0.12, 1.47], [0.14, 1.482], [0.18, 1.5], [0.2, 1.51], [0.25, 1.522], [0.3, 1.53], [0.35, 1.535], [0.4, 1.536], [0.45, 1.532], [0.5, 1.524], [0.52, 1.515], [0.54, 1.5], [0.56, 1.48], [0.58, 1.462], [0.6, 1.44], [0.62, 1.405], [0.64, 1.37], [0.66, 1.33], [0.68, 1.287], [0.7, 1.244], [0.72, 1.195], [0.74, 1.14], [0.755, 1.102]],
  },
  roof: { u0: 0.12187, u1: 0.54696, black: false },
  pillars: [
    // the body-coloured D-pillar from the tail to the quarter glass, the black B-pillar
    { bottom: [0.07, magniteU(0.205)], top: [0.12187, magniteU(0.215)], black: false, step: 0.004 },
    { bottom: [magniteU(0.408), magniteU(0.445)], top: [magniteU(0.408), magniteU(0.445)], black: true },
  ],
  // the black arch flares, the black sill under the doors, the black bumper corners
  cladding: { top: [[0, 0.55], [magniteU(0.035), 0.55], [magniteU(0.05), 0.45], [magniteU(0.07), 0.33], [magniteU(0.9), 0.33], [magniteU(0.93), 0.36], [1, 0.36]], flare: 0.06, cut: true },
  doors: [[magniteU(0.69), magniteU(0.7)], [magniteU(0.452), magniteU(0.437)], [magniteU(0.19), magniteU(0.21)]],
  front: [
    // the big hex grille: a gloss-black panel in a black surround, chrome side frames, staggered dark blocks
    { step: 0.004, mat: 'trim', poly: smooth(both([[0, 0.47], [0.42, 0.47], [0.53, 0.6], [0.6, 0.78], [0.635, 0.87], [0, 0.88]]), 1) },
    { step: 0.004, mat: 'gloss', layer: 1, poly: smooth(both([[0, 0.49], [0.4, 0.49], [0.5, 0.6], [0.565, 0.78], [0.59, 0.858], [0, 0.865]]), 1) },
    { step: 0.004, mat: 'chrome', layer: 2, depth: 0.01, mirror: true, poly: band([[0.42, 0.495], [0.5, 0.6], [0.565, 0.78], [0.595, 0.86]], 0.026) },
    ...magniteBricks,
    // the slim swept headlamps at the top corners, the LED line along their top edge
    { step: 0.004, mat: 'trim', layer: 1, mirror: true, poly: smooth([[0.59, 0.815], [0.66, 0.802], [0.758, 0.8], [0.765, 0.87], [0.74, 0.905], [0.66, 0.89], [0.59, 0.84]], 1) },
    { step: 0.004, mat: 'head', layer: 2, mirror: true, poly: smooth([[0.61, 0.818], [0.752, 0.812], [0.756, 0.866], [0.7, 0.866], [0.62, 0.84]], 1) },
    { step: 0.004, mat: 'drl', layer: 2, mirror: true, poly: band([[0.61, 0.836], [0.67, 0.866], [0.735, 0.886], [0.756, 0.88]], 0.012) },
    // the L-shaped DRLs in the bumper corners: a chrome strip with the LED line inside it
    { step: 0.004, mat: 'chrome', mirror: true, depth: 0.008, poly: band([[0.775, 0.71], [0.77, 0.5], [0.755, 0.462], [0.66, 0.44]], 0.03) },
    { step: 0.004, mat: 'drl', layer: 1, mirror: true, poly: band([[0.768, 0.7], [0.763, 0.505], [0.75, 0.47], [0.67, 0.452]], 0.012) },
    // the black lower bumper, the silver U skid plate with the fog lamps in its arms
    { step: 0.004, mat: 'trim', poly: smooth(both([[0, 0.19], [0.72, 0.19], [0.77, 0.25], [0.778, 0.38], [0.6, 0.43], [0, 0.43]]), 1) },
    { step: 0.004, mat: 'satin', layer: 1, poly: smooth(both([[0, 0.468], [0.52, 0.468], [0.58, 0.488], [0.62, 0.47], [0.72, 0.29], [0.7, 0.262], [0.64, 0.268], [0.56, 0.36], [0.5, 0.44], [0, 0.44]]), 1) },
    { step: 0.004, mat: 'trim', layer: 2, depth: 0.012, mirror: true, poly: rrect(0.56, 0.33, 0.64, 0.39, 0.01) },
    { step: 0.004, mat: 'head', layer: 3, mirror: true, poly: rrect(0.575, 0.345, 0.625, 0.375, 0.008) },
  ],
  rear: [
    // smoked tail lamps tapering inboard, a red guide along the top and a red bar low on the outer half
    { step: 0.004, mat: 'trim', mirror: true, poly: smooth([[0.36, 1.03], [0.42, 1.0], [0.6, 0.975], [0.775, 0.965], [0.795, 0.98], [0.795, 1.105], [0.775, 1.12], [0.5, 1.12], [0.4, 1.07]], 1) },
    { step: 0.004, mat: 'tail', layer: 1, mirror: true, poly: band([[0.4, 1.065], [0.5, 1.1], [0.78, 1.1]], 0.014) },
    { step: 0.004, mat: 'tail', layer: 1, mirror: true, poly: rrect(0.62, 0.982, 0.78, 0.998, 0.005) },
    { step: 0.004, mat: 'tail', layer: 1, mirror: true, poly: rrect(0.66, 1.0, 0.78, 1.075, 0.008) },
    // the satin bar joining them, dipping under the lamps' inner tips
    { step: 0.004, mat: 'satin', layer: 2, depth: 0.008, poly: smooth(both([[0, 1.04], [0.35, 1.035], [0.46, 0.995], [0.5, 0.99], [0.49, 1.006], [0.4, 1.05], [0, 1.068]]), 1) },
    // the black bumper, the silver skid plate round a black slot with red reflectors
    { step: 0.004, mat: 'trim', poly: smooth(both([[0, 0.25], [0.72, 0.25], [0.78, 0.3], [0.795, 0.45], [0.785, 0.6], [0.74, 0.67], [0, 0.675]]), 1) },
    { step: 0.004, mat: 'satin', layer: 1, poly: smooth(both([[0, 0.585], [0.6, 0.585], [0.66, 0.575], [0.71, 0.54], [0.735, 0.49], [0.742, 0.43], [0.735, 0.375], [0.715, 0.348], [0.685, 0.34], [0.655, 0.348], [0.635, 0.375], [0.6, 0.43], [0.56, 0.462], [0.5, 0.47], [0, 0.47]]), 2) },
    { step: 0.004, mat: 'reflector', layer: 2, mirror: true, poly: rrect(0.4, 0.45, 0.55, 0.468, 0.005) },
  ],
  side: [
    // the tail lamp wrapping onto the flank to a point, its red guide along the top
    { step: 0.003, mat: 'trim', depth: 0.002, poly: smooth([[0.003, 0.97], [0.04, 0.98], [0.07, 1.04], [0.09, 1.09], [0.088, 1.108], [0.06, 1.12], [0.003, 1.12]], 1) },
    { step: 0.003, mat: 'tail', layer: 1, depth: 0.004, poly: sideBand([[0.006, 1.1], [0.05, 1.102], [0.078, 1.098]], 0.012, MAGNITE_L) },
    // the headlamp sweeping back along the wing to a point
    { step: 0.003, mat: 'trim', depth: 0.002, poly: [[0.996, 0.826], [0.95, 0.85], [0.906, 0.875], [0.87, 0.94], [0.852, 0.975], [0.88, 0.968], [0.92, 0.948], [0.96, 0.92], [0.996, 0.9]] },
    { step: 0.003, mat: 'drl', layer: 1, depth: 0.004, poly: sideBand([[0.994, 0.893], [0.96, 0.912], [0.92, 0.938], [0.875, 0.962]], 0.012, MAGNITE_L) },
    // satin door handles, the satin strip along the bottom of the doors
    { step: 0.004, mat: 'satin', depth: 0.01, poly: magniteRectU(0.455, 0.938, 0.522, 0.965, 0.012) },
    { step: 0.004, mat: 'satin', depth: 0.01, poly: magniteRectU(0.233, 0.993, 0.275, 1.02, 0.012) },
    { step: 0.004, mat: 'satin', depth: 0.004, poly: magniteP(smooth([[0.335, 0.34], [0.69, 0.34], [0.695, 0.372], [0.45, 0.366], [0.34, 0.355]], 1)) },
  ],
  plates: { front: 0.53, rear: 0.607 },
  rails: 'silver',
  windowChrome: true,
  mirrors: 'black',
  paint: '#9a4219', // Sunrise Copper Orange, darkened for the studio lights
  plate: 'MH 12 MG 2026',
  satinColor: '#62676c',
}, 0.994)

/** Maruti Suzuki XL6 (2025): the Ertiga's body with black arch and sill cladding, silver sill garnish, roof rails, a taller
 *  nose (LED projector lamps over a DRL bar, a chrome-bar grille, black lower bumpers with silver skid plates) and the roof
 *  spoiler. 4485 × 1775 × 1745 (over the rails), wheelbase 2740, 195/60 R16 (Alpha Plus). Side profile refitted from a
 *  gallery road photo (the cut-out lost the silver sill garnish, patched back from the photo; 1.80 m over the rails with the
 *  axles 2.8 % apart from the close camera, so the Ertiga's traced body was fitted to the overlay rather than rescaled). */
const XL6_L = 4.485
/** the skid plates' and sill garnish's mid-grey satin (plain 'satin' reads near-white under the studio lights) */
const XL6_SKID = '#5d6166'
/** a right-half grille panel: black with a mesh over it */
const xl6Grille = (half: P2[], layer: number): Decal[] => [
  { step: 0.004, mat: 'gloss', layer, poly: both(half) },
  { step: 0.004, mat: 'mesh', layer: layer + 1, depth: 0.004, poly: both(half.map(([z, y]) => [Math.max(0, z - 0.012), y] as P2)) },
]

export const XL6: CarSpec = {
  ...ERTIGA_X,
  id: 'maruti-xl6',
  name: 'Maruti Suzuki XL6',
  L: XL6_L, W: 1.775, H: 1.745,
  axles: [0.2077, 0.8186],
  tyreR: 0.3202, tyreW: 0.195, rim: 0.6346, wheel: { style: 'blade', spokes: 5 },
  archGap: 0.08,
  sill: [[0, 0.5], [0.004, 0.44], [0.01, 0.41], [0.02, 0.4], [0.04, 0.39], [0.06, 0.338], [0.08, 0.315], [0.1, 0.293], [0.12, 0.272], [0.2, 0.2555], [0.3, 0.262], [0.33, 0.255], [0.4, 0.253], [0.5, 0.246], [0.6, 0.242], [0.7, 0.232], [0.74, 0.212], [0.8, 0.2047], [0.88, 0.2047], [0.91, 0.2], [0.93, 0.209], [0.95, 0.222], [0.96, 0.227], [0.97, 0.248], [0.98, 0.266], [0.99, 0.293], [0.996, 0.36], [1, 0.45]],
  // the Ertiga's tail and belt; a taller bonnet and nose
  top: [[0, 0.6825], [0.002, 0.8775], [0.005, 1.0237], [0.008, 1.1212], [0.011, 1.19], [0.015, 1.225], [0.02, 1.262], [0.03, 1.325], [0.04, 1.39], [0.05, 1.45], [0.06, 1.495], [0.07, 1.518], [0.078, 1.525], [0.085, 1.515], [0.093, 1.4723], [0.1, 1.443], [0.11, 1.3991], [0.12, 1.3601], [0.13, 1.3211], [0.14, 1.2821], [0.15, 1.248], [0.16, 1.2236], [0.17, 1.209], [0.19, 1.1973], [0.22, 1.1895], [0.3, 1.17], [0.4, 1.1534], [0.5, 1.1339], [0.6, 1.1115], [0.7, 1.0891], [0.74, 1.0774], [0.76, 1.0852], [0.78, 1.0998], [0.8, 1.1134], [0.82, 1.11], [0.85, 1.088], [0.88, 1.07], [0.9, 1.052], [0.92, 1.03], [0.94, 1.005], [0.96, 0.98], [0.975, 0.962], [0.985, 0.948], [0.993, 0.93], [1, 0.91]],
  crown: 0.012,
  // the Ertiga's plan, a touch narrower: the official width is over the cladding flares
  width: [[0, 0.8], [0.005, 0.86], [0.015, 0.91], [0.035, 0.947], [0.07, 0.968], [0.12, 0.978], [0.85, 0.978], [0.9, 0.968], [0.94, 0.955], [0.965, 0.94], [0.98, 0.93], [0.992, 0.915], [1, 0.9]],
  greenhouse: {
    u0: 0.057, u1: 0.8, tumble: 0.72, followBody: 0.1,
    // the spoiler standing proud at the back of the roof, the roof a little higher under the rails
    top: [[0.057, 1.6], [0.06, 1.645], [0.065, 1.685], [0.07, 1.7], [0.08, 1.708], [0.1, 1.712], [0.13, 1.712], [0.2, 1.722], [0.3, 1.728], [0.38, 1.728], [0.45, 1.708], [0.5, 1.686], [0.55, 1.66], [0.58, 1.632], [0.6, 1.607], [0.62, 1.5796], [0.64, 1.5455], [0.66, 1.5036], [0.68, 1.4558], [0.7, 1.4071], [0.72, 1.3554], [0.74, 1.295], [0.76, 1.24], [0.78, 1.19], [0.8, 1.135]],
  },
  // black arch flares, a black band along the lower doors, black lower bumpers
  cladding: { top: [[0, 0.54], [0.08, 0.54], [0.1, 0.5], [0.125, 0.4], [0.3, 0.375], [0.7, 0.375], [0.88, 0.385], [0.93, 0.41], [0.955, 0.46], [1, 0.47]], flare: 0.07, cut: true },
  front: [
    // the big swept headlamps: a dark housing, the LED reflector and projector, the DRL bar along the lower edge, amber at
    // the outer corner
    { step: 0.004, mat: 'gloss', mirror: true, depth: 0.004, poly: smooth([[0.378, 0.868], [0.39, 0.83], [0.42, 0.795], [0.466, 0.752], [0.603, 0.74], [0.75, 0.742], [0.785, 0.775], [0.8, 0.83], [0.797, 0.875], [0.785, 0.9], [0.76, 0.912], [0.72, 0.915], [0.603, 0.9], [0.466, 0.88]], 1) },
    { step: 0.004, mat: 'silver', mirror: true, layer: 1, depth: 0.006, poly: smooth([[0.392, 0.858], [0.405, 0.83], [0.435, 0.8], [0.47, 0.785], [0.6, 0.78], [0.74, 0.784], [0.775, 0.81], [0.785, 0.86], [0.77, 0.89], [0.72, 0.9], [0.6, 0.888], [0.47, 0.87]], 1) },
    { step: 0.004, mat: 'gloss', mirror: true, layer: 2, depth: 0.008, poly: smooth([[0.6, 0.835], [0.71, 0.84], [0.72, 0.89], [0.6, 0.882]], 1) },
    { step: 0.004, mat: 'head', mirror: true, layer: 3, depth: 0.01, poly: ertigaCircle(0.66, 0.861, 0.02) },
    { step: 0.004, mat: 'drl', mirror: true, layer: 2, depth: 0.01, poly: band([[0.45, 0.772], [0.6, 0.762], [0.74, 0.768]], 0.022) },
    { step: 0.004, mat: 'amber', mirror: true, layer: 2, depth: 0.008, poly: smooth([[0.75, 0.765], [0.778, 0.772], [0.79, 0.8], [0.765, 0.8]], 1) },
    // the chrome-bar grille: a slim bar under the bonnet lip, a thick wing between the lamps, a chrome U round the lower half
    ...xl6Grille([[0, 0.775], [0.405, 0.775], [0.372, 0.852], [0, 0.852]], 0),
    ...xl6Grille([[0, 0.632], [0.39, 0.632], [0.42, 0.655], [0.462, 0.722], [0, 0.722]], 0),
    { step: 0.004, mat: 'chrome', layer: 2, depth: 0.008, poly: both([[0, 0.852], [0.385, 0.854], [0.392, 0.868], [0, 0.868]]) },
    { step: 0.004, mat: 'chrome', layer: 2, depth: 0.01, poly: smooth(both([[0, 0.722], [0.3, 0.726], [0.44, 0.742], [0.475, 0.762], [0.44, 0.78], [0.3, 0.778], [0, 0.784]]), 1) },
    { step: 0.004, mat: 'chrome', layer: 2, depth: 0.008, poly: both([[0, 0.62], [0.39, 0.62], [0.428, 0.648], [0.485, 0.725], [0.462, 0.725], [0.415, 0.66], [0.385, 0.635], [0, 0.635]]) },
    // fog lamps in black pods, the black intake and the silver skid plate in the black lower bumper
    { step: 0.004, mat: 'trim', mirror: true, layer: 1, depth: 0.006, poly: smooth([[0.56, 0.565], [0.74, 0.57], [0.772, 0.55], [0.776, 0.39], [0.755, 0.37], [0.56, 0.37], [0.535, 0.4]], 1) },
    { step: 0.004, mat: 'chrome', mirror: true, layer: 2, depth: 0.008, poly: ertigaCircle(0.67, 0.462, 0.04) },
    { step: 0.004, mat: 'head', mirror: true, layer: 3, depth: 0.01, poly: ertigaCircle(0.67, 0.462, 0.029) },
    { step: 0.004, mat: 'gloss', layer: 1, poly: both([[0, 0.375], [0.47, 0.375], [0.49, 0.39], [0.47, 0.44], [0, 0.44]]) },
    ...[0.392, 0.414].map((y): Decal => ({ step: 0.004, mat: 'trim', layer: 2, depth: 0.008, poly: both([[0, y], [0.45, y], [0.45, y + 0.012], [0, y + 0.012]]) })),
    { step: 0.004, mat: 'satin', color: XL6_SKID, layer: 1, depth: 0.01, poly: both([[0, 0.27], [0.47, 0.27], [0.5, 0.282], [0.52, 0.345], [0.505, 0.364], [0, 0.364]]) },
  ],
  rear: [
    ERTIGA_X.rear[0],
    // the gloss-black tailgate garnish between the lamps, under the glass
    { step: 0.005, mat: 'gloss', depth: 0.003, poly: both([[0, 0.997], [0.6, 0.997], [0.6, 1.2], [0, 1.2]]) },
    // the Ertiga's tail lamps and chrome strip over it
    ...ERTIGA_X.rear.slice(1, 8).map((d): Decal => ({ ...d, layer: (d.layer ?? 0) + 1 })),
    ERTIGA_X.rear[8],
    // the silver skid plate in the black lower bumper, red reflectors upright in the bumper corners
    { step: 0.004, mat: 'satin', color: XL6_SKID, depth: 0.01, poly: both([[0, 0.35], [0.38, 0.35], [0.41, 0.372], [0.41, 0.468], [0.39, 0.485], [0, 0.485]]) },
    { step: 0.004, mat: 'reflector', mirror: true, poly: rrect(0.688, 0.565, 0.71, 0.68, 0.008) },
  ],
  side: [
    ...ERTIGA_X.side!.slice(0, 4),
    // the silver garnish under the doors
    { step: 0.004, mat: 'satin', color: XL6_SKID, depth: 0.006, poly: [[0.33, 0.27], [0.345, 0.26], [0.7, 0.256], [0.712, 0.264], [0.716, 0.284], [0.705, 0.296], [0.345, 0.3], [0.334, 0.29]] },
  ],
  plates: { front: 0.533, rear: 0.93 },
  rails: 'silver',
  railsU: [0.14, 0.55],
  mirrors: 'body',
  paint: '#00234a', // NEXA Blue (Celestial), darkened for the studio lights
  plate: 'MH 12 XL 2026',
}

/** Toyota Rumion: the Ertiga's body (before its 2025 roof spoiler) with Toyota's front end — a big honeycomb grille in a chrome
 *  surround, triangular fog-lamp pods and a chrome-lined lower grille. 4460 × 1735 × 1690, wheelbase 2740, 185/65 R15 (V).
 *  Its gallery side photo (1.696 m, axles 2 % apart) put the Ertiga's traced body ~3.5 cm high over the tyres (close camera),
 *  so the body and its decals are lowered by `RUMION_DY`; the tail is the plain roof end without the spoiler. */
const RUMION_L = 4.46
const RUMION_DY = 0.035
const rumionY = (pts: P2[]): P2[] => pts.map(([a, y]) => [a, +(y - RUMION_DY).toFixed(4)] as P2)
const rumionD = (ds: Decal[]): Decal[] => ds.map((d) => ({ ...d, poly: rumionY(d.poly) }))
const rumionSt = (i: number) => +(0.068 + 0.732 * (0.5 - 0.5 * Math.cos((Math.PI * i) / 140))).toFixed(5)
const rumionGrilleHW = (y: number) => (y < 0.632 ? 0.396 + ((y - 0.572) / 0.06) * 0.064 : 0.46 - ((y - 0.632) / 0.176) * 0.035)
/** the grille's big honeycomb: rows of dark-grey hexagon cells over the gloss-black panel */
const rumionHoney: Decal[] = [0.58, 0.61, 0.64, 0.67, 0.7, 0.73, 0.76, 0.788].flatMap((y, row) => {
  const out: Decal[] = []
  for (let k = -8; k <= 8; k++) {
    const zc = k * 0.064 + (row % 2) * 0.032
    if (Math.abs(zc) + 0.028 > Math.min(rumionGrilleHW(y), rumionGrilleHW(y + 0.02)) - 0.012) continue
    out.push({ step: 0.004, mat: 'trim', layer: 2, depth: 0.01, poly: [[zc - 0.028, y + 0.01], [zc - 0.016, y], [zc + 0.016, y], [zc + 0.028, y + 0.01], [zc + 0.016, y + 0.02], [zc - 0.016, y + 0.02]] })
  }
  return out
})

export const RUMION: CarSpec = {
  ...ERTIGA_X,
  id: 'toyota-rumion',
  name: 'Toyota Rumion',
  L: RUMION_L, W: 1.735, H: 1.69,
  axles: [0.2029, 0.8173],
  tyreR: 0.3108, tyreW: 0.185, rim: 0.613, wheel: { style: 'split', spokes: 5 },
  sill: [[0, 0.41], [0.005, 0.384], [0.01, 0.353], [0.02, 0.34], [0.04, 0.323], [0.06, 0.274], [0.08, 0.26], [0.1, 0.235], [0.12, 0.228], [0.2, 0.2255], [0.3, 0.2196], [0.4, 0.2137], [0.5, 0.2059], [0.6, 0.2011], [0.7, 0.1933], [0.74, 0.18], [0.8, 0.175], [0.88, 0.175], [0.91, 0.172], [0.93, 0.175], [0.95, 0.183], [0.97, 0.205], [0.98, 0.222], [0.99, 0.245], [0.996, 0.3], [1, 0.39]],
  // the Ertiga's, lowered; the tail runs up to a plain roof end, the nose a little fuller
  top: [[0, 0.6475], [0.002, 0.8425], [0.005, 0.9887], [0.008, 1.0862], [0.011, 1.15], [0.015, 1.19], [0.02, 1.232], [0.03, 1.275], [0.04, 1.315], [0.05, 1.375], [0.06, 1.435], [0.07, 1.485], [0.078, 1.495], [0.085, 1.485], [0.093, 1.4373], ...rumionY([[0.1, 1.443], [0.11, 1.3991], [0.12, 1.3601], [0.13, 1.3211], [0.14, 1.2821], [0.15, 1.248], [0.16, 1.2236], [0.17, 1.209], [0.19, 1.1973], [0.22, 1.1895], [0.3, 1.17], [0.4, 1.1534], [0.5, 1.1339], [0.6, 1.1115], [0.7, 1.0891], [0.74, 1.0774], [0.76, 1.0852], [0.78, 1.0998], [0.8, 1.1134], [0.82, 1.1066]]), [0.85, 1.042], [0.88, 1.015], [0.9, 0.995], [0.92, 0.97], [0.94, 0.942], [0.96, 0.912], [0.975, 0.885], [0.985, 0.866], [0.993, 0.855], [1, 0.845]],
  shoulder: { y: rumionY(ERTIGA_X.shoulder!.y), inset: 0.035 },
  greenhouse: {
    u0: 0.068, u1: 0.8, tumble: 0.72, followBody: 0.1,
    top: [[0.068, 1.5], [0.072, 1.55], [0.076, 1.585], [0.08, 1.605], [0.09, 1.618], [0.1, 1.628], [0.13, 1.64], [0.2, 1.6635], [0.3, 1.676], [0.38, 1.678], [0.45, 1.6635], [0.5, 1.644], [0.55, 1.607], [0.58, 1.578], [0.6, 1.555], [0.62, 1.528], [0.64, 1.494], [0.66, 1.452], [0.68, 1.404], [0.7, 1.355], [0.72, 1.303], [0.74, 1.254], [0.76, 1.204], [0.78, 1.154], [0.8, 1.1]],
  },
  roof: { u0: 0.068, u1: rumionSt(89), black: false },
  front: [
    // the chrome surround: a slim bar under the bonnet lip, down from the lamps' inner corners and round the grille's foot
    { step: 0.004, mat: 'chrome', depth: 0.008, poly: both([[0, 0.535], [0.44, 0.545], [0.465, 0.565], [0.515, 0.632], [0.47, 0.77], [0.448, 0.79], [0.445, 0.826], [0, 0.826]]) },
    { step: 0.004, mat: 'gloss', layer: 1, poly: both([[0, 0.565], [0.396, 0.572], [0.462, 0.632], [0.428, 0.765], [0.43, 0.81], [0, 0.81]]) },
    ...rumionHoney,
    // the Ertiga's headlamps
    ...rumionD(ERTIGA_X.front.slice(13, 20)),
    // fog lamps in black triangular pods
    { step: 0.004, mat: 'trim', mirror: true, depth: 0.006, poly: smooth([[0.735, 0.655], [0.644, 0.655], [0.556, 0.497], [0.596, 0.429], [0.72, 0.424], [0.74, 0.51]], 1) },
    { step: 0.004, mat: 'chrome', mirror: true, layer: 1, depth: 0.008, poly: ertigaCircle(0.668, 0.536, 0.04) },
    { step: 0.004, mat: 'head', mirror: true, layer: 2, depth: 0.01, poly: ertigaCircle(0.668, 0.536, 0.029) },
    // the lower grille: black slots with chrome slats in a chrome U, the black lip under it
    { step: 0.004, mat: 'gloss', poly: both([[0, 0.31], [0.47, 0.31], [0.49, 0.325], [0.48, 0.375], [0, 0.375]]) },
    ...[0.325, 0.348].map((y): Decal => ({ step: 0.004, mat: 'chrome', layer: 1, depth: 0.008, poly: both([[0, y], [0.46, y], [0.46, y + 0.012], [0, y + 0.012]]) })),
    { step: 0.004, mat: 'chrome', layer: 1, depth: 0.008, poly: both([[0, 0.292], [0.5, 0.292], [0.53, 0.31], [0.535, 0.39], [0.52, 0.395], [0.512, 0.318], [0.49, 0.306], [0, 0.306]]) },
    { step: 0.004, mat: 'trim', poly: both([[0, 0.255], [0.6, 0.255], [0.63, 0.27], [0.62, 0.29], [0, 0.29]]) },
  ],
  rear: rumionD(ERTIGA_X.rear),
  side: rumionD(ERTIGA_X.side!),
  plates: { front: 0.44, rear: 0.895 },
  mirrors: 'body',
  paint: '#4c4e50', // Iconic Grey, darkened for the studio lights
  plate: 'MH 12 RU 2026',
}

const TIAGO_EV_L = 3.825
/** a side outline from a rounded rectangle given in u (0…1) and metres */
const tiagoEvRectU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  rrectS(u0 * TIAGO_EV_L, y0, u1 * TIAGO_EV_L, y1, r).map(([x, y]) => [+(x / TIAGO_EV_L).toFixed(5), y] as P2)
/** the charging lid's outline on the rear wing */
const TIAGO_EV_LID: P2[] = tiagoEvRectU(0.122, 0.7, 0.183, 0.858, 0.045)

/** Tata Tiago.ev (2026 facelift). 3825 × 1684 × 1562, wheelbase 2400, 175/65 R14 (top trim, as on the gallery car).
 *  The Tiago's body with the EV's closed nose; scored afresh against the gallery's side photo (1.563 m measured over the
 *  roof fin, axles 1.3 % apart, so the axles sit at the official wheelbase with the overhangs split as in the photo).
 *  Charging lid, tail lamp wrap and nose read off a metric grid of the cut-out; the body-coloured panel between the
 *  headlamps, the slatted lower grille, the corner slots and the black rear bumper from the straight front and rear photos. */
export const TIAGO_EV: CarSpec = {
  ...TIAGO,
  id: 'tata-tiago-ev',
  name: 'Tata Tiago.ev',
  L: TIAGO_EV_L, W: 1.684, H: 1.562,
  axles: [0.1503, 0.7778],
  tyreR: 0.2916, tyreW: 0.175, rim: 0.61, wheel: { style: 'split', spokes: 4 }, rimTone: 'dark',
  sill: [[0, 0.3], [0.005, 0.28], [0.015, 0.268], [0.03, 0.258], [0.05, 0.25], [0.1, 0.238], [0.2, 0.232], [0.3, 0.23], [0.5, 0.228], [0.6, 0.224], [0.7, 0.212], [0.8, 0.207], [0.9, 0.207], [0.94, 0.21], [0.97, 0.215], [0.985, 0.22], [0.995, 0.23], [1, 0.25]],
  // the Tiago's tail and belt; the bonnet falling in one smooth curve to the nose, ~2.5 cm over the (photo-height) headlamps
  top: [...TIAGO.top.filter(([u]) => u < 0.755), [0.755, 1.034], [0.77, 1.036], [0.785, 1.031], [0.8, 1.017], [0.82, 0.998], [0.84, 0.982], [0.86, 0.965], [0.88, 0.947], [0.9, 0.927], [0.92, 0.903], [0.94, 0.88], [0.955, 0.865], [0.965, 0.856], [0.975, 0.849], [0.985, 0.844], [0.993, 0.841], [1, 0.84]],
  // black arch flares; the black lip under the closed nose, the black lower rear bumper's corners
  cladding: { top: [[0, 0.37], [0.025, 0.34], [0.05, 0.15], [0.95, 0.15], [0.975, 0.2], [0.99, 0.22], [1, 0.22]], flare: 0.045, cut: true },
  front: [
    // the slim swept headlamps, the body-coloured panel between them (no grille, no badge)
    { step: 0.004, mat: 'trim', mirror: true, poly: smooth([[0.458, 0.735], [0.468, 0.688], [0.58, 0.695], [0.635, 0.708], [0.675, 0.72], [0.7, 0.735], [0.706, 0.76], [0.704, 0.8], [0.69, 0.81], [0.58, 0.794], [0.48, 0.776]], 1) },
    ...TIAGO.front.slice(1, 6).map((d): Decal => ({ ...d, poly: d.poly.map(([z, y]) => [z, +(y - 0.03).toFixed(4)] as P2) })),
    // the panel's shut line under the lamps
    { step: 0.004, mat: 'gloss', depth: 0.001, poly: band([[-0.47, 0.678], [-0.3, 0.672], [0.3, 0.672], [0.47, 0.678]], 0.012) },
    // the slatted lower grille under the plate
    { step: 0.004, mat: 'gloss', poly: rrect(-0.31, 0.295, 0.31, 0.425, 0.008) },
    ...punchEvRibs(0.3, 0.305, 0.415, 0.026, 'satin', 1, 0.008),
    // the upright black slots at the bumper's corners
    { step: 0.004, mat: 'gloss', mirror: true, depth: 0.008, poly: rrect(0.64, 0.33, 0.685, 0.6, 0.01) },
  ],
  rear: [
    // the Tiago's light bar and the tailgate's shut line, a dark handle notch under it
    ...TIAGO.rear.slice(0, 7),
    { step: 0.004, mat: 'gloss', poly: rrect(-0.06, 0.652, 0.06, 0.676, 0.008) },
    // the black lower bumper round the plate, the reversing lamp and the slim red reflectors at its corners
    { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.3], [0.6, 0.3], [0.655, 0.315], [0.675, 0.36], [0.675, 0.45], [0.665, 0.53], [0.635, 0.562], [0, 0.565]]), 1) },
    { step: 0.004, mat: 'silver', layer: 1, depth: 0.006, poly: rrect(-0.095, 0.315, 0.095, 0.36, 0.01) },
    { step: 0.004, mat: 'reflector', mirror: true, layer: 1, poly: rrect(0.648, 0.32, 0.668, 0.58, 0.006) },
  ],
  side: [
    ...TIAGO.side!.slice(0, 5),
    // the bonnet's shut line down the wing to the headlamp's rear end
    { step: 0.004, mat: 'gloss', depth: 0.001, poly: sideBand([[0.765, 1.03], [0.79, 0.99], [0.83, 0.915], [0.86, 0.85], [0.885, 0.8]], 0.012, TIAGO_EV_L) },
    // the headlamp sweeping back along the wing as in the side photo, its DRL along the top edge
    { step: 0.004, mat: 'trim', depth: 0.003, poly: smooth([[0.992, 0.722], [0.96, 0.714], [0.93, 0.716], [0.905, 0.73], [0.89, 0.762], [0.895, 0.796], [0.93, 0.796], [0.96, 0.79], [0.992, 0.782]], 1) },
    { step: 0.004, mat: 'drl', layer: 1, depth: 0.005, poly: sideBand([[0.985, 0.77], [0.95, 0.778], [0.915, 0.783], [0.9, 0.782]], 0.012, TIAGO_EV_L) },
    // the charging lid on the rear wing
    { step: 0.004, mat: 'gloss', depth: 0.001, poly: sideBand([...TIAGO_EV_LID, TIAGO_EV_LID[0]], 0.012, TIAGO_EV_L) },
  ],
  plates: { front: 0.49, rear: 0.47 },
  satinColor: '#6b7068', // the grille slats' mid grey
  paint: '#98ad7c', // Dehradun Dew, the gallery car's pale green, darkened for the studio lights
  ev: true,
  plate: 'MH 12 TE 2026',
}

const CURVV_EV_L = 4.31

/** Tata Curvv.ev (2024–26, 55 kWh). 4310 × 1810 × 1637, wheelbase 2560, 215/55 R18 (top trim).
 *  The Curvv's body with the EV's closed nose; scored afresh against the gallery's road side photo (tyres hidden in grass
 *  patched as dark discs under a sill line read off a brightened crop, the shark fin erased; 1.695 m measured from the
 *  close camera, so the cut-out was squeezed to the official height). The closed panel under the light bar, the dark
 *  slot joining the headlamp pods and the lower grille's upright and raked silver slats from the straight front photo;
 *  the tail as the Curvv's. */
export const CURVV_EV: CarSpec = {
  ...CURVV,
  id: 'tata-curvv-ev',
  name: 'Tata Curvv.ev',
  L: CURVV_EV_L, W: 1.81, H: 1.637,
  wheel: { style: 'turbine', spokes: 5 }, rimTone: 'dark',
  sill: [[0, 0.38], [0.01, 0.38], [0.02, 0.38], [0.05, 0.372], [0.07, 0.362], [0.1, 0.345], [0.12, 0.335], [0.32, 0.303], [0.5, 0.3], [0.6, 0.3], [0.68, 0.287], [0.72, 0.28], [0.93, 0.29], [0.95, 0.31], [0.97, 0.325], [0.99, 0.328], [1, 0.32]],
  // the Curvv's tail and belt; the closed nose's bonnet traced lower, ~2 cm over the light bar at the face
  top: [...CURVV.top.filter(([u]) => u < 0.76), [0.76, 1.148], [0.78, 1.132], [0.8, 1.118], [0.82, 1.106], [0.84, 1.096], [0.86, 1.086], [0.88, 1.075], [0.9, 1.06], [0.92, 1.033], [0.94, 1.003], [0.95, 0.989], [0.96, 0.977], [0.97, 0.968], [0.98, 0.959], [0.99, 0.954], [1, 0.951]],
  front: [
    // the light bar along the bonnet's leading edge over the closed, body-coloured panel (no grille, no badge)
    { step: 0.005, mat: 'gloss', poly: both([[0, 0.902], [0.55, 0.903], [0.64, 0.906], [0.7, 0.911], [0.712, 0.9], [0.722, 0.918], [0.712, 0.934], [0.6, 0.931], [0, 0.929]]) },
    ...CURVV.front.slice(1, 3).map((d): Decal => ({ ...d, poly: d.poly.map(([z, y]) => [z, +(y - 0.032).toFixed(4)] as P2) })),
    // the split headlamp pods at the bumper corners
    { step: 0.005, mat: 'gloss', mirror: true, depth: 0.008, poly: smooth([[0.665, 0.835], [0.7, 0.845], [0.765, 0.845], [0.772, 0.82], [0.775, 0.45], [0.755, 0.44], [0.725, 0.52], [0.68, 0.64], [0.665, 0.68]], 1) },
    { step: 0.005, mat: 'head', layer: 1, mirror: true, poly: rrectS(0.69, 0.75, 0.762, 0.825, 0.016) },
    { step: 0.005, mat: 'head', layer: 1, mirror: true, poly: rrectS(0.695, 0.668, 0.762, 0.7, 0.008) },
    { step: 0.005, mat: 'slats', layer: 1, mirror: true, poly: [[0.755, 0.47], [0.767, 0.47], [0.767, 0.645], [0.7, 0.645]] },
    // the dark slot joining the pods under the closed panel
    { step: 0.005, mat: 'gloss', poly: smooth(both([[0, 0.652], [0.6, 0.652], [0.672, 0.665], [0.672, 0.715], [0.6, 0.72], [0, 0.72]]), 1) },
    // the black lower bumper, the trapezoid lower grille: upright silver slats in the middle, raked ones at the sides
    { step: 0.005, mat: 'trim', poly: both([[0, 0.325], [0.7, 0.325], [0.755, 0.345], [0.77, 0.41], [0.73, 0.4], [0, 0.4]]) },
    { step: 0.005, mat: 'gloss', layer: 1, poly: smooth(both([[0, 0.365], [0.7, 0.365], [0.725, 0.385], [0.68, 0.48], [0.655, 0.53], [0, 0.53]]), 1) },
    ...punchEvRibs(0.36, 0.38, 0.515, 0.026, 'satin', 2, 0.01),
    ...nexonEvStripes(0.405, 0.66, 0.38, 0.515, -0.055, 0.03, 2).map((d): Decal => ({ ...d, poly: d.poly.map(([z, y]) => [Math.min(z, 0.7 - (y - 0.38) * 0.4), y] as P2) })),
    // the satin lip along the grille's bottom edge
    { step: 0.005, mat: 'satin', layer: 2, poly: smooth(both([[0, 0.338], [0.64, 0.338], [0.7, 0.345], [0.72, 0.355], [0.66, 0.364], [0, 0.364]]), 1) },
  ],
  rear: [
    // the Curvv's light bar, shut line and corner lamps; its tall black bumper and skid plate ending a little higher
    ...CURVV.rear.slice(0, 3),
    { step: 0.005, mat: 'trim', poly: both([[0, 0.39], [0.7, 0.39], [0.77, 0.42], [0.775, 0.89], [0.718, 0.895], [0.71, 0.74], [0.68, 0.685], [0.6, 0.665], [0, 0.66]]) },
    CURVV.rear[4],
    { step: 0.005, mat: 'satin', layer: 1, poly: smooth(both([[0, 0.405], [0.55, 0.405], [0.62, 0.412], [0.632, 0.44], [0.58, 0.455], [0, 0.458]]), 2) },
  ],
  side: [
    // the tail lamp wedge, the black strip along the bottom of the side glass, flush door handles
    ...CURVV.side!.slice(0, 2),
    { step: 0.004, mat: 'gloss', depth: 0.003, poly: sideBand([[0.19, 1.244], [0.3, 1.215], [0.4, 1.188], [0.5, 1.16], [0.6, 1.133], [0.7, 1.111], [0.722, 1.115]], 0.012, CURVV_EV_L) },
    ...CURVV.side!.slice(3, 5),
  ],
  satinColor: '#6f747b', // the slats and skid strips' mid grey
  paint: '#34486a', // the gallery car's blue-grey, darkened for the studio lights
  ev: true,
  plate: 'MH 12 CE 2026',
}

const HARRIER_EV_L = 4.607

/** Tata Harrier.ev (2025, 65/75 kWh). 4607 × 1922 × 1740 (with roof rails), wheelbase 2741, 245/55 R19 (top trim).
 *  The Harrier's body with the EV's closed nose; scored afresh against the gallery's road side photo (1.769 m measured over
 *  the rails and roof fin, axles 2.9 % apart, so the axles sit at the official wheelbase with the overhangs split as in the
 *  photo). The slatted closed panel under the light bar, the lower grille's upright and raked silver slats, the big satin
 *  skid plates and the black rear bumper from the straight front and rear photos; the tail lamps as the Harrier's. */
export const HARRIER_EV: CarSpec = {
  ...HARRIER,
  id: 'tata-harrier-ev',
  name: 'Tata Harrier.ev',
  L: HARRIER_EV_L, W: 1.922, H: 1.74,
  wheel: { style: 'split', spokes: 5 }, rimTone: 'dark',
  sill: [[0, 0.305], [0.01, 0.31], [0.02, 0.325], [0.04, 0.335], [0.06, 0.33], [0.08, 0.305], [0.12, 0.29], [0.3, 0.255], [0.4, 0.25], [0.6, 0.247], [0.68, 0.247], [0.72, 0.232], [0.9, 0.232], [0.94, 0.24], [0.96, 0.265], [0.98, 0.28], [0.99, 0.28], [1, 0.275]],
  // the Harrier's glasshouse, its roof ~1 cm higher (the EV stands taller), fading out towards the belt
  greenhouse: { ...HARRIER.greenhouse, top: HARRIER.greenhouse.top.map(([u, y]): P2 => [u, +(y + Math.max(0, Math.min(1, (y - 1.3) / 0.3)) * 0.008).toFixed(4)]) },
  front: [
    // the light bar along the bonnet's leading edge
    ...HARRIER.front.slice(0, 2),
    // the closed upper panel: gloss black with fine horizontal slats, and the gloss strip joining the headlamp pods
    { step: 0.005, mat: 'gloss', poly: both([[0, 0.745], [0.55, 0.745], [0.585, 0.8], [0.59, 0.9], [0, 0.9]]) },
    { step: 0.005, mat: 'slats', layer: 1, poly: both([[0, 0.76], [0.54, 0.76], [0.57, 0.8], [0.575, 0.885], [0, 0.885]]) },
    { step: 0.005, mat: 'gloss', poly: both([[0, 0.705], [0.72, 0.705], [0.74, 0.74], [0, 0.74]]) },
    // the split headlamp pods in the bumper corners: projector on top, fog lamp, slatted pocket below
    { step: 0.005, mat: 'gloss', mirror: true, depth: 0.008, poly: smooth([[0.69, 0.8], [0.705, 0.83], [0.8, 0.84], [0.805, 0.5], [0.775, 0.5], [0.72, 0.665], [0.69, 0.71]], 1) },
    { step: 0.005, mat: 'head', layer: 1, mirror: true, poly: rrectS(0.715, 0.765, 0.79, 0.815, 0.014) },
    { step: 0.005, mat: 'head', layer: 1, mirror: true, poly: rrectS(0.735, 0.68, 0.79, 0.702, 0.006) },
    { step: 0.005, mat: 'slats', layer: 1, mirror: true, poly: [[0.775, 0.52], [0.792, 0.52], [0.792, 0.662], [0.735, 0.662]] },
    // the black lower bumper, the lower grille (upright silver slats, raked ones at its sides), the big satin skid plate
    { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.29], [0.66, 0.29], [0.74, 0.31], [0.79, 0.38], [0.8, 0.45], [0.72, 0.43], [0, 0.43]]), 1) },
    { step: 0.005, mat: 'gloss', layer: 1, poly: smooth(both([[0, 0.39], [0.66, 0.39], [0.7, 0.41], [0.7, 0.44], [0.67, 0.545], [0, 0.545]]), 1) },
    ...punchEvRibs(0.5, 0.4, 0.535, 0.026, 'satin', 2, 0.01),
    ...nexonEvStripes(0.55, 0.69, 0.4, 0.535, -0.05, 0.03, 2).map((d): Decal => ({ ...d, poly: d.poly.map(([z, y]) => [Math.min(z, 0.695), y] as P2) })),
    { step: 0.005, mat: 'satin', layer: 2, poly: smooth(both([[0, 0.3], [0.6, 0.3], [0.66, 0.315], [0.69, 0.36], [0.68, 0.385], [0, 0.385]]), 1) },
  ],
  rear: [
    // the Harrier's connected light bar and the tailgate's shut line round the plate recess
    ...HARRIER.rear.slice(0, 4),
    // the tall black bumper wrapping the corners, the big satin skid plate in it
    { step: 0.005, mat: 'trim', poly: smooth(both([[0, 0.322], [0.68, 0.322], [0.76, 0.34], [0.79, 0.4], [0.79, 0.62], [0.74, 0.64], [0.66, 0.67], [0.6, 0.71], [0, 0.72]]), 1) },
    { step: 0.005, mat: 'satin', layer: 1, poly: smooth(both([[0, 0.375], [0.56, 0.375], [0.6, 0.395], [0.6, 0.49], [0.58, 0.505], [0, 0.505]]), 1) },
  ],
  plates: { front: 0.58, rear: 1.04 },
  satinColor: '#686d73', // the slats and skid plates' mid grey
  paint: '#08204e', // Nainital Nocturne, the gallery car's deep navy, darkened for the studio lights
  ev: true,
  plate: 'MH 12 HE 2026',
}

const SLAVIA_L = 4.552
/** the side photo's axles sit 4.5 % apart (2.77 m against 2.651): side details (doors, handles) go through this map from
 *  photo u onto the official wheelbase, with the overhangs split as in the photo; the silhouette stays in photo u */
const slaviaU = (u: number): number => {
  const a = 0.2181, b = 0.8265, A = 0.2326, B = 0.815
  const v = u < a ? (u / a) * A : u > b ? B + ((u - b) / (1 - b)) * (1 - B) : A + ((u - a) / (b - a)) * (B - A)
  return +v.toFixed(5)
}
/** a side outline from a rounded rectangle given in photo u (0…1) and metres, mapped onto the official wheelbase */
const slaviaRectU = (u0: number, y0: number, u1: number, y1: number, r: number, map = true): P2[] =>
  rrectS(u0 * SLAVIA_L, y0, u1 * SLAVIA_L, y1, r).map(([x, y]) => [map ? slaviaU(x / SLAVIA_L) : +(x / SLAVIA_L).toFixed(5), y] as P2)
/** the photo's roof and bonnet sit a uniform band above the model's camera view: every traced height comes down by this */
const SLAVIA_DY = 0.015
const slaviaY = (pts: P2[]): P2[] => pts.map(([u, y]) => [u, +(y - SLAVIA_DY).toFixed(4)] as P2)
const slaviaD = (ds: Decal[]): Decal[] => ds.map((d) => ({ ...d, poly: slaviaY(d.poly) }))
/** upper grille: top edge, pointed sides, lower edge with chamfered corners (half outline) */
const slaviaGrilleTop = (z: number) => (z < 0.49 ? 0.748 - z * 0.035 : 0.731 - ((z - 0.49) / 0.045) * 0.068)
const slaviaGrilleBot = (z: number) => (z < 0.447 ? 0.506 : 0.506 + ((z - 0.447) / 0.088) * 0.157)
/** the vertical chrome slats of the upper grille */
const slaviaSlats: Decal[] = Array.from({ length: 19 }, (_, i) => (i - 9) * 0.054).map((z): Decal => {
  const a = Math.abs(z) + 0.007
  const y0 = +(slaviaGrilleBot(a) + 0.016).toFixed(4), y1 = +(slaviaGrilleTop(a) - 0.014).toFixed(4)
  return { step: 0.004, mat: 'satin', layer: 2, depth: 0.004, poly: rrect(+(z - 0.006).toFixed(4), y0, +(z + 0.006).toFixed(4), y1, 0.004) }
})
/** the lower grille's 3D diamonds: rows of small dark rhombi, every other row offset half a pitch */
const slaviaDiamonds: Decal[] = [0.268, 0.305, 0.342].flatMap((y, row) => {
  const out: Decal[] = []
  for (let k = -9; k <= 9; k++) {
    const zc = k * 0.075 + (row % 2) * 0.0375
    if (Math.abs(zc) + 0.035 > 0.6 + (y - 0.25) * 1.0) continue
    out.push({ step: 0.004, mat: 'trim', layer: 2, depth: 0.012, poly: [[zc - 0.034, y], [zc, y - 0.013], [zc + 0.034, y], [zc, y + 0.013]].map(([z, yy]) => [+z.toFixed(4), +yy.toFixed(4)] as P2) })
  }
  return out
})

/** Skoda Slavia (Oct 2026 facelift). 4552 × 1752 × 1507, wheelbase 2651, 205/55 R16 (top trim).
 *  Side profile from a long-lens road side photo on another portal (tyres in grass patched with dark discs; 1.486 m
 *  without the shark-fin, the axles 4.5 % apart: axles at the official wheelbase, overhangs split as in the photo, doors
 *  and handles mapped with them). Belt, glass, pillars and lamps from a metric grid of the cut-out; the pointed grille
 *  with vertical chrome slats, slim lamps, chrome bumper line and diamond lower grille from a straight front photo; the
 *  split tail lamps joined by a black bar (lettering left out), boot-lid shut line and the bumper's chrome strip,
 *  reflectors and black diffuser from a straight rear photo. */
export const SLAVIA: CarSpec = {
  id: 'skoda-slavia',
  name: 'Skoda Slavia',
  rakedEnds: true,
  dropSlivers: true,
  L: SLAVIA_L, W: 1.752, H: 1.507,
  axles: [0.2326, 0.815],
  tyreR: 0.316, tyreW: 0.205, rim: 0.643, wheel: { style: 'swirl', spokes: 5 }, rimTone: 'dark',
  archGap: 0.07, archSquare: 0.1,
  sill: slaviaY([[0, 0.33], [0.006, 0.34], [0.02, 0.345], [0.05, 0.33], [0.08, 0.31], [0.1, 0.29], [0.12, 0.265], [0.15, 0.24], [0.2, 0.22], [0.3, 0.205], [0.5, 0.205], [0.65, 0.198], [0.75, 0.2], [0.85, 0.2], [0.9, 0.198], [0.95, 0.2], [0.97, 0.205], [0.985, 0.205], [0.995, 0.2], [1, 0.2]]),
  // the tail face up to the lamp tops, the ducktail lip and the sloping boot deck; the belt under the glass falling from
  // the C-pillar to the windscreen base; the bonnet (lowered by the crown) and the nose raised over the lamps
  top: slaviaY([[0, 1.01], [0.006, 1.06], [0.013, 1.093], [0.022, 1.106], [0.035, 1.108], [0.06, 1.112], [0.09, 1.117], [0.115, 1.12], [0.13, 1.121], [0.145, 1.12], [0.165, 1.116], [0.19, 1.107], [0.215, 1.098], [0.25, 1.087], [0.3, 1.077], [0.4, 1.061], [0.5, 1.046], [0.6, 1.031], [0.65, 1.022], [0.7, 1.012], [0.735, 1.005], [0.755, 1.014], [0.77, 1.022], [0.78, 1.0105], [0.8, 0.995], [0.82, 0.98], [0.84, 0.96], [0.86, 0.944], [0.88, 0.924], [0.9, 0.903], [0.92, 0.878], [0.94, 0.852], [0.955, 0.833], [0.97, 0.822], [0.98, 0.817], [0.99, 0.814], [1, 0.81]]),
  // round in plan: both ends taper into the corners
  width: [[0, 0.92], [0.005, 0.935], [0.015, 0.952], [0.035, 0.97], [0.07, 0.985], [0.13, 0.997], [0.2, 1], [0.45, 0.99], [0.8, 0.997], [0.86, 0.99], [0.92, 0.972], [0.955, 0.955], [0.975, 0.93], [0.99, 0.9], [1, 0.875]],
  crown: 0.012,
  bulge: 0.04,
  haunch: 0.05,
  topRadius: 0.08,
  noseSweep: 0.15,
  tailSweep: 0.14,
  greenhouse: {
    u0: 0.13, u1: 0.77, tumble: 0.62,
    // the long rear glass rising off the boot deck, the domed roof (shark-fin left out), the raked windscreen
    top: slaviaY([[0.13, 1.121], [0.14, 1.163], [0.15, 1.2], [0.16, 1.229], [0.17, 1.254], [0.18, 1.272], [0.19, 1.29], [0.2, 1.307], [0.22, 1.338], [0.24, 1.366], [0.26, 1.394], [0.28, 1.417], [0.3, 1.436], [0.32, 1.452], [0.34, 1.463], [0.36, 1.47], [0.38, 1.476], [0.4, 1.481], [0.43, 1.484], [0.46, 1.481], [0.48, 1.476], [0.5, 1.47], [0.52, 1.463], [0.54, 1.454], [0.56, 1.44], [0.58, 1.419], [0.6, 1.392], [0.62, 1.358], [0.64, 1.318], [0.66, 1.274], [0.68, 1.225], [0.7, 1.177], [0.72, 1.126], [0.74, 1.076], [0.76, 1.036], [0.77, 1.024]]),
  },
  roof: { u0: 0.2984, u1: 0.5624, black: false },
  pillars: [
    // body-coloured C-pillar sail behind the pointed quarter glass; black quarter-glass divider and B-pillar
    { bottom: [0.13, 0.207], top: [0.2, 0.2984], black: false },
    { bottom: [0.312, 0.319], top: [0.309, 0.316], black: true },
    { bottom: [0.447, 0.476], top: [0.445, 0.472], black: true },
  ],
  doors: [[slaviaU(0.33), slaviaU(0.265)], [slaviaU(0.482), slaviaU(0.478)], [slaviaU(0.73), slaviaU(0.733)]],
  windowChrome: true,
  front: slaviaD([
    // the pointed grille: a dark frame, gloss black inside, vertical chrome slats
    { step: 0.004, mat: 'trim', depth: 0.006, poly: smooth(both([[0, 0.758], [0.3, 0.752], [0.495, 0.74], [0.548, 0.665], [0.455, 0.496], [0, 0.496]]), 1) },
    { step: 0.004, mat: 'gloss', layer: 1, poly: smooth(both([[0, 0.748], [0.3, 0.741], [0.49, 0.731], [0.535, 0.663], [0.447, 0.506], [0, 0.506]]), 1) },
    ...slaviaSlats,
    // slim headlamps sloping down to the grille's top corners: dark housing, the LED strip along the lower edge, projector
    { step: 0.004, mat: 'trim', mirror: true, depth: 0.004, poly: smooth([[0.5, 0.672], [0.62, 0.664], [0.72, 0.66], [0.77, 0.662], [0.775, 0.7], [0.772, 0.79], [0.74, 0.795], [0.65, 0.768], [0.56, 0.742], [0.505, 0.725]], 1) },
    { step: 0.004, mat: 'drl', mirror: true, layer: 1, poly: [[0.515, 0.682], [0.62, 0.676], [0.72, 0.673], [0.768, 0.675], [0.768, 0.688], [0.72, 0.686], [0.62, 0.689], [0.515, 0.695]] },
    { step: 0.004, mat: 'head', mirror: true, layer: 1, depth: 0.008, poly: rrect(0.66, 0.71, 0.72, 0.75, 0.016) },
    // the chrome line across the bumper (behind the plate), rising at the outer ends
    { step: 0.004, mat: 'chrome', layer: 2, depth: 0.006, poly: band([[-0.765, 0.418], [-0.7, 0.405], [-0.6, 0.392], [-0.4, 0.38], [0, 0.375], [0.4, 0.38], [0.6, 0.392], [0.7, 0.405], [0.765, 0.418]], 0.013) },
    // black fog-lamp pods at the corners with the lamp in them
    { step: 0.004, mat: 'gloss', mirror: true, depth: 0.006, poly: smooth([[0.63, 0.29], [0.76, 0.29], [0.765, 0.41], [0.68, 0.4], [0.63, 0.37]], 1) },
    { step: 0.004, mat: 'head', mirror: true, layer: 1, depth: 0.008, poly: rrect(0.69, 0.37, 0.735, 0.395, 0.01) },
    // the wide lower grille: gloss black with rows of dark diamonds
    { step: 0.004, mat: 'gloss', poly: smooth(both([[0, 0.25], [0.6, 0.25], [0.66, 0.29], [0.72, 0.36], [0, 0.36]]), 1) },
    ...slaviaDiamonds,
  ]),
  rear: slaviaD([
    // split tail lamps: red housing on the wing and the lid, the light guide along the top turning down the outer edge,
    // the clear reversing block
    { step: 0.004, mat: 'reflector', mirror: true, layer: 1, depth: 0.006, poly: smooth([[0.405, 0.958], [0.42, 0.982], [0.6, 0.986], [0.76, 0.99], [0.788, 0.984], [0.792, 0.95], [0.788, 0.872], [0.77, 0.858], [0.69, 0.86], [0.665, 0.875], [0.645, 0.935], [0.42, 0.936]], 1) },
    { step: 0.004, mat: 'tail', mirror: true, layer: 2, poly: [[0.43, 0.965], [0.6, 0.968], [0.765, 0.972], [0.775, 0.965], [0.775, 0.9], [0.763, 0.9], [0.763, 0.96], [0.6, 0.956], [0.43, 0.953]] },
    { step: 0.004, mat: 'silver', mirror: true, layer: 2, depth: 0.008, poly: rrect(0.69, 0.874, 0.755, 0.915, 0.008) },
    // the black bar joining the lamps (its lettering left out)
    { step: 0.004, mat: 'gloss', layer: 1, depth: 0.006, poly: rrect(-0.42, 0.936, 0.42, 0.977, 0.006) },
    // the boot lid's shut line under the lamps and round the plate
    { step: 0.004, mat: 'gloss', depth: 0.001, poly: band([[-0.655, 0.93], [-0.652, 0.75], [-0.635, 0.685], [-0.58, 0.645], [-0.45, 0.632], [0, 0.63], [0.45, 0.632], [0.58, 0.645], [0.635, 0.685], [0.652, 0.75], [0.655, 0.93]], 0.012) },
    // the bumper: black honeycomb band, red reflectors at its ends, the chrome strip along its top
    { step: 0.004, mat: 'trim', layer: 1, depth: 0.006, poly: smooth(both([[0, 0.415], [0.66, 0.415], [0.78, 0.42], [0.8, 0.44], [0.8, 0.462], [0, 0.462]]), 1) },
    { step: 0.004, mat: 'mesh', layer: 2, poly: rrect(-0.62, 0.42, 0.62, 0.456, 0.006) },
    { step: 0.004, mat: 'reflector', mirror: true, layer: 2, depth: 0.01, poly: rrect(0.655, 0.422, 0.79, 0.455, 0.008) },
    { step: 0.004, mat: 'chrome', layer: 3, depth: 0.012, poly: rrect(-0.79, 0.459, 0.79, 0.471, 0.005) },
  ]),
  side: slaviaD([
    // body-coloured door handles (the relief gives them a dark rim)
    { step: 0.004, mat: 'body', depth: 0.01, poly: slaviaRectU(0.488, 0.89, 0.538, 0.92, 0.012) },
    { step: 0.004, mat: 'body', depth: 0.01, poly: slaviaRectU(0.267, 0.935, 0.318, 0.965, 0.012) },
    // the headlamp wrapping back along the wing to a point
    { step: 0.004, mat: 'trim', depth: 0.004, poly: [[0.998, 0.665], [0.998, 0.765], [0.975, 0.782], [0.95, 0.797], [0.928, 0.802], [0.932, 0.79], [0.95, 0.758], [0.97, 0.718], [0.985, 0.68]] },
    { step: 0.004, mat: 'drl', layer: 1, poly: [[0.998, 0.675], [0.998, 0.688], [0.985, 0.693], [0.97, 0.728], [0.955, 0.755], [0.945, 0.762], [0.955, 0.74], [0.97, 0.712], [0.985, 0.68]] },
    // the tail lamp wrapping onto the flank: red housing to a point, its light guide along the top
    { step: 0.003, mat: 'reflector', depth: 0.002, poly: smooth([[0.004, 0.875], [0.004, 0.988], [0.05, 0.99], [0.09, 0.987], [0.098, 0.978], [0.09, 0.95], [0.077, 0.885], [0.06, 0.876]], 1) },
    { step: 0.003, mat: 'tail', layer: 1, poly: [[0.004, 0.962], [0.05, 0.966], [0.088, 0.968], [0.088, 0.978], [0.05, 0.977], [0.004, 0.974]] },
    { step: 0.003, mat: 'silver', layer: 1, depth: 0.004, poly: slaviaRectU(0.006, 0.888, 0.03, 0.935, 0.008, false) },
    // the red reflector at the rear bumper corner
    { step: 0.004, mat: 'reflector', depth: 0.004, poly: slaviaRectU(0.004, 0.428, 0.035, 0.458, 0.01, false) },
  ]),
  plates: { front: 0.41, rear: 0.835 },
  mirrors: 'body',
  mirrorU: slaviaU(0.705),
  satinColor: '#6a6f75',
  paint: '#4f7a82', // the gallery car's pale blue-green, darkened for the studio lights
  plate: 'MH 12 SS 2026',
}

const VIRTUS_L = 4.561
/** the side photo's axles sit 2.5 % apart (2.718 m against 2.651): side details go through this map from photo u onto the
 *  official wheelbase, with the overhangs split as in the photo; the silhouette stays in photo u */
const virtusU = (u: number): number => {
  const a = 0.2204, b = 0.8163, A = 0.2284, B = 0.8096
  const v = u < a ? (u / a) * A : u > b ? B + ((u - b) / (1 - b)) * (1 - B) : A + ((u - a) / (b - a)) * (B - A)
  return +v.toFixed(5)
}
const virtusRectU = (u0: number, y0: number, u1: number, y1: number, r: number): P2[] =>
  rrectS(u0 * VIRTUS_L, y0, u1 * VIRTUS_L, y1, r).map(([x, y]) => [virtusU(x / VIRTUS_L), y] as P2)
/** uniform band between the photo and the model's camera view: every traced height moves by this */
const VIRTUS_DY = 0.015
const virtusY = (pts: P2[]): P2[] => pts.map(([u, y]) => [u, +(y - VIRTUS_DY).toFixed(4)] as P2)
const virtusD = (ds: Decal[]): Decal[] => ds.map((d) => ({ ...d, poly: virtusY(d.poly) }))

/** Volkswagen Virtus GT (current pre-facelift car; the light-bar facelift is due Dec 2026). 4561 × 1752 × 1507, wheelbase
 *  2651, 205/55 R16 (GT Plus). The Slavia's body (same platform), refitted to its own long-lens road side photo from another
 *  portal (black Topline car, tyres in grass patched, shark-fin erased: 1.462 m, axles 2.5 % apart). VW front from a straight
 *  front photo: slim lamps joined by twin chrome grille bars, the wide black intake with slats framed by a chrome C at each
 *  corner, fog lamps in it; smoked tail lamps with red guides, the plain boot lid and the black lower bumper with its chrome U
 *  and reflectors from a straight rear photo. GT Plus black alloys and Wild Cherry Red as on the gallery's GT. */
export const VIRTUS: CarSpec = {
  ...SLAVIA,
  id: 'volkswagen-virtus',
  name: 'Volkswagen Virtus',
  L: VIRTUS_L,
  axles: [0.2284, 0.8096],
  wheel: { style: 'twin', spokes: 5 }, rimTone: 'dark',
  satinColor: undefined,
  noseSweep: 0.1,
  tailSweep: 0.08,
  sill: virtusY([[0, 0.27], [0.006, 0.3], [0.02, 0.33], [0.05, 0.33], [0.08, 0.3], [0.1, 0.28], [0.12, 0.26], [0.15, 0.235], [0.2, 0.215], [0.3, 0.2], [0.5, 0.2], [0.6, 0.198], [0.75, 0.205], [0.85, 0.205], [0.9, 0.205], [0.95, 0.21], [0.97, 0.215], [0.99, 0.215], [1, 0.215]]),
  // the tail face up to the lamp tops, the ducktail and boot deck; the belt falling to the windscreen base; the bonnet
  // (lowered by the crown) and the nose raised over the lamps
  top: virtusY([[0, 1.0], [0.006, 1.05], [0.013, 1.08], [0.022, 1.093], [0.035, 1.097], [0.06, 1.101], [0.09, 1.106], [0.115, 1.109], [0.13, 1.11], [0.145, 1.109], [0.165, 1.106], [0.19, 1.1], [0.21, 1.095], [0.25, 1.088], [0.3, 1.077], [0.4, 1.05], [0.5, 1.024], [0.6, 1.006], [0.65, 0.998], [0.7, 0.992], [0.725, 0.995], [0.74, 1.008], [0.75, 1.018], [0.76, 1.008], [0.78, 0.992], [0.8, 0.982], [0.82, 0.967], [0.84, 0.956], [0.86, 0.936], [0.88, 0.92], [0.9, 0.9], [0.92, 0.874], [0.94, 0.843], [0.955, 0.815], [0.965, 0.802], [0.975, 0.796], [0.985, 0.791], [1, 0.786]]),
  greenhouse: {
    u0: 0.13, u1: 0.75, tumble: 0.62,
    top: virtusY([[0.13, 1.11], [0.14, 1.15], [0.15, 1.184], [0.16, 1.21], [0.17, 1.231], [0.18, 1.247], [0.19, 1.263], [0.2, 1.28], [0.22, 1.313], [0.24, 1.344], [0.26, 1.374], [0.28, 1.4], [0.3, 1.42], [0.32, 1.434], [0.34, 1.444], [0.36, 1.451], [0.38, 1.456], [0.4, 1.46], [0.43, 1.462], [0.46, 1.46], [0.48, 1.455], [0.5, 1.45], [0.52, 1.442], [0.54, 1.431], [0.56, 1.415], [0.58, 1.392], [0.6, 1.364], [0.62, 1.326], [0.64, 1.28], [0.66, 1.233], [0.68, 1.181], [0.7, 1.13], [0.72, 1.08], [0.74, 1.036], [0.75, 1.022]]),
  },
  roof: { u0: 0.2993, u1: 0.5489, black: false },
  pillars: [
    { bottom: [0.13, 0.206], top: [0.2, 0.2993], black: false },
    { bottom: [0.31, 0.317], top: [0.307, 0.314], black: true },
    { bottom: [0.447, 0.473], top: [0.445, 0.469], black: true },
  ],
  doors: [[virtusU(0.3), virtusU(0.28)], [virtusU(0.476), virtusU(0.474)], [virtusU(0.712), virtusU(0.712)]],
  front: virtusD([
    // slim headlamps: dark housing, the DRL running along the top, down the outer edge and back along the bottom, projector
    { step: 0.004, mat: 'trim', mirror: true, depth: 0.004, poly: smooth([[0.52, 0.652], [0.62, 0.648], [0.72, 0.652], [0.762, 0.662], [0.768, 0.7], [0.765, 0.785], [0.74, 0.796], [0.63, 0.77], [0.53, 0.748]], 1) },
    { step: 0.004, mat: 'drl', mirror: true, layer: 1, poly: band([[0.545, 0.738], [0.64, 0.759], [0.735, 0.776]], 0.013) },
    { step: 0.004, mat: 'drl', mirror: true, layer: 1, poly: band([[0.58, 0.666], [0.66, 0.665], [0.74, 0.672]], 0.012) },
    { step: 0.004, mat: 'head', mirror: true, layer: 1, depth: 0.008, poly: rrect(0.66, 0.69, 0.725, 0.738, 0.02) },
    { step: 0.004, mat: 'silver', mirror: true, layer: 1, depth: 0.006, poly: rrect(0.56, 0.69, 0.635, 0.735, 0.018) },
    // the thin black grille between two chrome bars, the lower bar running on under the lamps
    { step: 0.004, mat: 'gloss', poly: rrect(-0.53, 0.652, 0.53, 0.738, 0.01) },
    { step: 0.004, mat: 'chrome', layer: 2, depth: 0.008, poly: rrect(-0.52, 0.724, 0.52, 0.738, 0.005) },
    { step: 0.004, mat: 'chrome', layer: 2, depth: 0.008, poly: rrect(-0.62, 0.64, 0.62, 0.654, 0.005) },
    // the wide black intake with horizontal slats, a chrome C framing each corner and the strip along its foot
    { step: 0.004, mat: 'gloss', poly: smooth(both([[0, 0.262], [0.62, 0.262], [0.72, 0.28], [0.762, 0.33], [0.762, 0.49], [0.72, 0.515], [0.6, 0.52], [0, 0.52]]), 1) },
    ...[0.32, 0.36, 0.4].map((y): Decal => ({ step: 0.004, mat: 'trim', layer: 1, depth: 0.012, poly: rrect(-0.56, y, 0.56, y + 0.014, 0.005) })),
    { step: 0.004, mat: 'satin', layer: 2, depth: 0.006, poly: band([[-0.715, 0.505], [-0.74, 0.47], [-0.74, 0.31], [-0.715, 0.282], [-0.6, 0.272], [0, 0.272], [0.6, 0.272], [0.715, 0.282], [0.74, 0.31], [0.74, 0.47], [0.715, 0.505]], 0.012) },
    { step: 0.004, mat: 'head', mirror: true, layer: 2, depth: 0.01, poly: rrect(0.665, 0.37, 0.725, 0.43, 0.02) },
  ]),
  rear: virtusD([
    // smoked tail lamps: dark housing, the red light guide along the top turning down the outer edge, a red lower block
    { step: 0.004, mat: 'trim', mirror: true, layer: 1, depth: 0.006, poly: smooth([[0.39, 0.95], [0.42, 0.982], [0.6, 0.985], [0.79, 0.983], [0.805, 0.965], [0.805, 0.865], [0.785, 0.835], [0.66, 0.848], [0.5, 0.892], [0.42, 0.915]], 1) },
    { step: 0.004, mat: 'silver', mirror: true, layer: 2, depth: 0.006, poly: band([[0.44, 0.958], [0.6, 0.964], [0.77, 0.966]], 0.012) },
    { step: 0.004, mat: 'tail', mirror: true, layer: 2, poly: band([[0.47, 0.937], [0.6, 0.942], [0.775, 0.946], [0.785, 0.935], [0.785, 0.875]], 0.014) },
    { step: 0.004, mat: 'tail', mirror: true, layer: 2, poly: rrect(0.68, 0.856, 0.77, 0.884, 0.006) },
    // the boot lid's shut line under the lamps and round the plate
    { step: 0.004, mat: 'gloss', depth: 0.001, poly: band([[-0.62, 0.86], [-0.62, 0.72], [-0.6, 0.678], [-0.53, 0.658], [0, 0.655], [0.53, 0.658], [0.6, 0.678], [0.62, 0.72], [0.62, 0.86]], 0.012) },
    // the black lower bumper under a chrome U, red reflectors at its ends
    { step: 0.004, mat: 'trim', depth: 0.006, poly: smooth(both([[0, 0.305], [0.72, 0.305], [0.79, 0.33], [0.805, 0.37], [0.8, 0.462], [0.76, 0.46], [0.62, 0.39], [0.5, 0.368], [0, 0.366]]), 1) },
    { step: 0.004, mat: 'satin', layer: 2, depth: 0.006, poly: band([[-0.795, 0.465], [-0.7, 0.432], [-0.6, 0.392], [-0.5, 0.372], [0, 0.37], [0.5, 0.372], [0.6, 0.392], [0.7, 0.432], [0.795, 0.465]], 0.012) },
    { step: 0.004, mat: 'reflector', mirror: true, layer: 1, depth: 0.01, poly: smooth([[0.64, 0.38], [0.785, 0.4], [0.79, 0.44], [0.7, 0.42], [0.64, 0.395]], 1) },
  ]),
  side: virtusD([
    // body-coloured door handles (the relief gives them a dark rim)
    { step: 0.004, mat: 'body', depth: 0.01, poly: virtusRectU(0.49, 0.85, 0.535, 0.88, 0.012) },
    { step: 0.004, mat: 'body', depth: 0.01, poly: virtusRectU(0.265, 0.92, 0.315, 0.95, 0.012) },
    // the headlamp wrapping back along the wing to a point
    { step: 0.004, mat: 'trim', depth: 0.004, poly: [[0.998, 0.665], [0.998, 0.765], [0.97, 0.785], [0.935, 0.797], [0.9, 0.802], [0.91, 0.79], [0.935, 0.762], [0.96, 0.718], [0.98, 0.68]] },
    { step: 0.004, mat: 'drl', layer: 1, poly: [[0.998, 0.752], [0.998, 0.764], [0.97, 0.783], [0.935, 0.795], [0.905, 0.799], [0.912, 0.79], [0.935, 0.784], [0.97, 0.772]] },
    // the black lower edge of the sills between the arches
    { step: 0.004, mat: 'trim', depth: 0.004, poly: [[0.318, 0.195], [0.72, 0.195], [0.72, 0.235], [0.318, 0.235]] },
    // the black lower bumpers wrapping round onto the flanks ahead of and behind the arches
    { step: 0.004, mat: 'trim', depth: 0.004, poly: smooth([[0.004, 0.31], [0.02, 0.335], [0.05, 0.335], [0.08, 0.305], [0.1, 0.285], [0.125, 0.262], [0.125, 0.31], [0.1, 0.33], [0.08, 0.35], [0.05, 0.38], [0.02, 0.385], [0.004, 0.37]], 1) },
    { step: 0.004, mat: 'trim', depth: 0.004, poly: smooth([[0.885, 0.21], [0.95, 0.215], [0.99, 0.22], [0.997, 0.222], [0.997, 0.27], [0.95, 0.255], [0.885, 0.245]], 1) },
    // the smoked tail lamp wrapping onto the flank, its red guide
    { step: 0.003, mat: 'trim', depth: 0.002, poly: smooth([[0.004, 0.86], [0.004, 0.982], [0.035, 0.98], [0.066, 0.972], [0.06, 0.93], [0.045, 0.87], [0.03, 0.862]], 1) },
    { step: 0.003, mat: 'tail', layer: 1, poly: [[0.004, 0.935], [0.035, 0.937], [0.058, 0.94], [0.058, 0.952], [0.035, 0.95], [0.004, 0.948]] },
  ]),
  plates: { front: 0.5, rear: 0.835 },
  mirrorU: virtusU(0.667),
  paint: '#5e0614', // Wild Cherry Red, darkened for the studio lights
  plate: 'MH 12 VV 2026',
}

export const EXACT: CarSpec[] = [NEXON, PUNCH, CRETA, BREZZA, SWIFT, FRONX, DZIRE, SCORPIO_N, SELTOS, BALENO, THAR_ROXX, VENUE, SONET, WAGON_R, GRAND_VITARA, XUV_3XO, ERTIGA_X, TIAGO, HARRIER, INNOVA_HYCROSS, XUV_7XO, EXTER, CARENS_CLAVIS, HYRYDER, CURVV, I20, KYLAQ, FORTUNER, SAFARI, WINDSOR_EV, CITY_X, SYROS, ALCAZAR, ALTROZ_X, VERNA, VICTORIS_X, SIERRA_X, SIERRA_EV_X, GRAND_I10_NIOS, AURA, CELERIO, ALTO_K10, GLANZA, TAISOR, BOLERO_NEO, BOLERO, NEXON_EV, PUNCH_EV, THAR, KIGER, MAGNITE, XL6, RUMION, TIAGO_EV, CURVV_EV, HARRIER_EV, SLAVIA, VIRTUS]
