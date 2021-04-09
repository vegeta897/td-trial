import { BoxGeometry, Mesh, MeshLambertMaterial, Sprite } from 'three'
import { MeshLambertMaterialParameters } from 'three/src/materials/MeshLambertMaterial'

const geometry = new BoxGeometry()
const material = new MeshLambertMaterial({
	color: 0x00ff00,
})
const cube = new Mesh(geometry, material)

export function createCube({
	materialParams,
	shadows = true,
}: {
	materialParams?: MeshLambertMaterialParameters
	shadows?: boolean
}): Mesh {
	const newCube = <Mesh>cube.clone()
	if (materialParams) newCube.material = new MeshLambertMaterial(materialParams)
	if (shadows) {
		newCube.castShadow = true
		newCube.receiveShadow = true
	}
	return newCube
}

const sprite = new Sprite()

export function createSprite(): Sprite {
	const newSprite = <Sprite>sprite.clone()
	return newSprite
}
