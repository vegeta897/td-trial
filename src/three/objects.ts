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

export interface IMeshOptions {
	materialParams?: MeshLambertMaterialParameters
	geometry?: BufferGeometry
	meshProperties?: Partial<Mesh>
}

export function createMesh({
	materialParams,
	geometry,
	meshProperties,
}: IMeshOptions): Mesh {
	const newMesh = geometry ? new Mesh(geometry, material) : <Mesh>cube.clone()
	if (materialParams) newMesh.material = new MeshLambertMaterial(materialParams)
	if (meshProperties) Object.assign(newMesh, meshProperties)
	return newMesh
}

const sprite = new Sprite()

export function createSprite(): Sprite {
	const newSprite = <Sprite>sprite.clone()
	return newSprite
}
