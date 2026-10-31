// Optional drop-in 3D models. The procedural cars are traced likenesses; for exact replicas, buy or commission
// licensed models (glTF/GLB, ideally under ~1.5 MB with meshopt or Draco compression), put them in
// public/models/ and register them here. They load after first paint, replacing the procedural car only
// once downloaded — slow connections keep the procedural one.
//
//   'tata-sierra-ev': { file: '/models/suv-ev.glb', rotateY: Math.PI / 2 },
//
// rotateY turns the model so its nose points along +x (glTF files often face +z).
export interface ModelFile {
  file: string
  rotateY?: number
}

export const MODEL_FILES: Partial<Record<string, ModelFile>> = {}

/** Load a registered model and fit it to the car's real length, standing on the ground. */
export async function loadModel(id: string, length: number) {
  const entry = MODEL_FILES[id]
  if (!entry) return null
  const [{ GLTFLoader }, THREE] = await Promise.all([import('three/examples/jsm/loaders/GLTFLoader.js'), import('three')])
  const gltf = await new GLTFLoader().loadAsync(entry.file)
  const root = gltf.scene
  root.rotation.y = entry.rotateY ?? 0
  root.updateMatrixWorld(true)
  const box = new THREE.Box3().setFromObject(root)
  const size = box.getSize(new THREE.Vector3())
  const s = length / Math.max(size.x, size.z)
  root.scale.multiplyScalar(s)
  root.updateMatrixWorld(true)
  const b2 = new THREE.Box3().setFromObject(root)
  root.position.y -= b2.min.y
  root.position.x -= (b2.min.x + b2.max.x) / 2
  root.position.z -= (b2.min.z + b2.max.z) / 2
  return root
}
