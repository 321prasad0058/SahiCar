// Image-based lighting without downloading an HDR: a tiny procedural room with emissive softboxes,
// baked once into a PMREM environment map. "studio" is a car-photography set (overhead softbox, side strips,
// a cool rim light); "night" is a dark street with a warm and a cool glow for the hero drive.
import * as THREE from 'three'

export function bakeEnvironment(renderer: THREE.WebGLRenderer, mood: 'studio' | 'night' | 'daylight') {
  const room = new THREE.Scene()
  const box = new THREE.Mesh(new THREE.BoxGeometry(30, 14, 30), new THREE.MeshBasicMaterial({ color: mood === 'daylight' ? '#cfcac0' : mood === 'studio' ? '#0b0f14' : '#03050a', side: THREE.BackSide }))
  box.position.y = 5
  room.add(box)
  const panel = (w: number, h: number, color: string, intensity: number, pos: [number, number, number], look: [number, number, number]) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity), side: THREE.DoubleSide }))
    m.position.set(...pos)
    m.lookAt(...look)
    room.add(m)
  }
  if (mood === 'daylight') {
    // a bright white photo studio: big overhead scrim, two tall side softboxes, a pale floor bounce
    panel(18, 10, '#ffffff', 3.2, [0, 12, 0], [0, 0, 0])
    panel(10, 6, '#ffffff', 2.2, [0, 4, 13], [0, 2, 0])
    panel(10, 6, '#fff8ee', 1.6, [0, 4, -13], [0, 2, 0])
    panel(8, 6, '#ffffff', 1.8, [13, 4, 0], [0, 1, 0])
    panel(30, 30, '#e9e4da', 0.9, [0, -0.5, 0], [0, 1, 0])
  } else if (mood === 'studio') {
    panel(14, 8, '#ffffff', 6, [0, 11, 0], [0, 0, 0]) // big overhead softbox: the long highlight along the roof and bonnet
    panel(16, 1.4, '#ffffff', 4, [0, 4, 12], [0, 2, 0]) // side strips: the crisp line along the doors
    panel(16, 1.4, '#ffffff', 4, [0, 4, -12], [0, 2, 0])
    panel(6, 5, '#9fdcff', 2.4, [-13, 4, 0], [0, 1, 0]) // cool rim from behind
    panel(6, 5, '#fff2e0', 2, [13, 3, 4], [0, 1, 0]) // warm key from the front
  } else {
    panel(30, 2.5, '#eef3ff', 3.0, [0, 9, 8], [0, 0, 0]) // sodium/LED street lighting
    panel(30, 2.5, '#cfe9ff', 2.6, [0, 9, -8], [0, 0, 0])
    panel(12, 6, '#ffffff', 1.4, [0, 12, 0], [0, 0, 0]) // the sky glow over a city
    panel(10, 3, '#2ad4ff', 1.4, [-14, 2, 0], [0, 1, 0])
    panel(10, 3, '#3cf06e', 0.9, [14, 2, 0], [0, 1, 0])
  }
  const pmrem = new THREE.PMREMGenerator(renderer)
  const env = pmrem.fromScene(room, 0.02).texture
  pmrem.dispose()
  room.traverse((o) => {
    const m = o as THREE.Mesh
    m.geometry?.dispose()
    ;(m.material as THREE.Material | undefined)?.dispose()
  })
  return env
}
