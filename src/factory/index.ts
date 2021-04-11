import Game, { GameObjectTypes } from '../game'
import { createSpawner } from './spawner'
import { createEnemy } from './enemy'
import { createTurret } from './turret'
import { createBullet } from './bullet'
import { Object3D } from 'three'
import { Component, Tag } from 'uecs'
import { createMesh, IMeshOptions } from '../three/objects'
import ThreeObject3D from '../components/com_object3d'
import Transform3D from '../components/com_transform3d'

interface IGameObjectOptions {
	container?: Object3D
	transform?: Partial<Transform3D>
	object3D?: Object3D
	gameObjectType?: GameObjectTypes
	additionalComponents?: Component[]
	children?: Object3D[]
}

export default class Factory {
	constructor(public game: Game) {}

	createSpawner = createSpawner
	createEnemy = createEnemy
	createTurret = createTurret
	createBullet = createBullet
	createGameObject({
		container,
		transform,
		geometry,
		materialParams,
		meshProperties,
		object3D,
		gameObjectType,
		additionalComponents,
		children,
	}: IGameObjectOptions & IMeshOptions = {}) {
		const newObject =
			object3D || createMesh({ geometry, materialParams, meshProperties })
		if (children) children.forEach((child) => newObject.add(child))
		;(container || this.game.threeApp.scene).add(newObject)
		const entity = this.game.world.create(
			new ThreeObject3D(newObject),
			new Transform3D(transform)
		)
		newObject.userData.entity = entity
		if (additionalComponents)
			this.game.world.insert(entity, ...additionalComponents)
		if (gameObjectType !== undefined)
			this.game.world.emplace(entity, Tag.for(gameObjectType))
	}
}
