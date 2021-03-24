import { BoxGeometry, Mesh, MeshPhongMaterial, Object3D } from 'three'

const geometry = new BoxGeometry()
const material = new MeshPhongMaterial({
	color: 0x00ff00,
	specular: 0xaaaaaa,
})
const cube = new Mesh(geometry, material)

export function createCube(scale = 1): Object3D {
	const newCube = cube.clone()
	newCube.scale.setScalar(scale)
	return newCube
}
