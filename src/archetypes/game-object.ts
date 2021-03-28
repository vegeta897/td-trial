import { Euler, Object3D, Vector3 } from 'three'
import { Component, Tag, World } from 'uecs'
import { createCube } from '../three/cube'
import { MeshLambertMaterialParameters } from 'three/src/materials/MeshLambertMaterial'
import { TagID } from '../world'
import ThreeObject3D from '../components/com_object3d'
import Transform3D from '../components/com_transform3d'

interface IGameObject {
	position?: Vector3
	rotation?: Euler
	scale?: number
	materialParams?: MeshLambertMaterialParameters
	tagID?: TagID
	additionalComponents?: Component[]
}

export function createGameObject(
	container: Object3D,
	world: World,
	options: IGameObject = {}
) {
	const cube = createCube(options.materialParams)
	container.add(cube)
	const entity = world.create(
		new ThreeObject3D(cube),
		new Transform3D(options.position, options.rotation, options.scale)
	)
	cube.userData.entity = entity
	if (options.additionalComponents)
		world.insert(entity, ...options.additionalComponents)
	if (options.tagID) world.emplace(entity, Tag.for(options.tagID))
}
