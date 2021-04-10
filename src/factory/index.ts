import Game, { GameObjectTypes } from '../game'
import { createSpawner } from './spawner'
import { createEnemy } from './enemy'
import { createTurret } from './turret'
import { createBullet } from './bullet'
import { Mesh, Object3D, Quaternion, Vector3 } from 'three'
import { MeshLambertMaterialParameters } from 'three/src/materials/MeshLambertMaterial'
import { Component, Tag } from 'uecs'
import { createMesh } from '../three/objects'
import ThreeObject3D from '../components/com_object3d'
import Transform3D from '../components/com_transform3d'

export default class Factory {
	constructor(public game: Game) {}

	createSpawner = createSpawner
	createEnemy = createEnemy
	createTurret = createTurret
	createBullet = createBullet
	createGameObject({
		container,
		position,
		rotation,
		scale,
		materialParams,
		object3D,
		meshOptions,
		gameObjectType,
		additionalComponents,
		children,
	}: {
		container?: Object3D
		position?: Vector3
		rotation?: Quaternion
		scale?: Vector3
		materialParams?: MeshLambertMaterialParameters
		object3D?: Object3D
		meshOptions?: Partial<Mesh>
		gameObjectType?: GameObjectTypes
		additionalComponents?: Component[]
		children?: Object3D[]
	} = {}) {
		const newObject = object3D || createMesh({ materialParams, meshOptions })
		if (children) children.forEach((child) => newObject.add(child))
		;(container || this.game.threeApp.scene).add(newObject)
		const entity = this.game.world.create(
			new ThreeObject3D(newObject),
			new Transform3D(position, rotation, scale)
		)
		newObject.userData.entity = entity
		if (additionalComponents)
			this.game.world.insert(entity, ...additionalComponents)
		if (gameObjectType !== undefined)
			this.game.world.emplace(entity, Tag.for(gameObjectType))
	}
}
