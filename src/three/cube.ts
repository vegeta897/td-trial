import { BoxGeometry, Mesh, MeshLambertMaterial, Object3D } from 'three'

const geometry = new BoxGeometry()
const material = new MeshLambertMaterial({
	color: 0x00ff00,
})
const cube = new Mesh(geometry, material)

export function createCube(scale = 1): Object3D {
	const newCube = cube.clone()
	newCube.scale.setScalar(scale)
	return newCube
}
