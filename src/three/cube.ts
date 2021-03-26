import { BoxGeometry, Mesh, MeshLambertMaterial } from 'three'

const geometry = new BoxGeometry()
const material = new MeshLambertMaterial({
	color: 0x00ff00,
})
const cube = new Mesh(geometry, material)

export function createCube(scale = 1): Mesh {
	const newCube = <Mesh>cube.clone()
	newCube.scale.setScalar(scale)
	return newCube
}
