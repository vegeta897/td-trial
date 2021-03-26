import { BoxGeometry, Mesh, MeshLambertMaterial } from 'three'
import { MeshLambertMaterialParameters } from 'three/src/materials/MeshLambertMaterial'

const geometry = new BoxGeometry()
const material = new MeshLambertMaterial({
	color: 0x00ff00,
})
const cube = new Mesh(geometry, material)

export function createCube(
	materialParams?: MeshLambertMaterialParameters
): Mesh {
	const newCube = <Mesh>cube.clone()
	if (materialParams) newCube.material = new MeshLambertMaterial(materialParams)
	return newCube
}
