import { BoxGeometry, Mesh, MeshPhongMaterial, Object3D } from 'three'

const geometry = new BoxGeometry(0.5, 0.5, 0.5)
const material = new MeshPhongMaterial({
	color: 0x00ff00,
	specular: 0xaaaaaa,
})

export function createCube(): Object3D {
	return new Mesh(geometry, material)
}
