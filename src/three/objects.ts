import {
	BoxGeometry,
	BufferGeometry,
	Mesh,
	MeshLambertMaterial,
	Sprite,
} from 'three'
import { MeshLambertMaterialParameters } from 'three/src/materials/MeshLambertMaterial'

const geometry = new BoxGeometry()
const material = new MeshLambertMaterial({ color: 0x00ff00 })
const cube = new Mesh(geometry, material)

export function createMesh({
	materialParams,
	geometry,
	meshOptions,
}: {
	materialParams?: MeshLambertMaterialParameters
	geometry?: BufferGeometry
	meshOptions?: Partial<Mesh>
}): Mesh {
	const newMesh = geometry ? new Mesh(geometry, material) : <Mesh>cube.clone()
	if (materialParams) newMesh.material = new MeshLambertMaterial(materialParams)
	if (meshOptions) Object.assign(newMesh, meshOptions)
	return newMesh
}

const sprite = new Sprite()

export function createSprite(): Sprite {
	const newSprite = <Sprite>sprite.clone()
	return newSprite
}
