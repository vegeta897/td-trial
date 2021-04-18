import Game, { GameObjectTypes } from '../game'
import { createSpawner, createSpawnerPrototype } from './spawner'
import { createEnemy, createEnemyPrototype } from './enemy'
import { createTurret, createTurretPrototype } from './turret'
import { createBullet, createBulletPrototype } from './bullet'
import { Object3D } from 'three'
import { Component, Tag } from 'uecs'
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
	prototypes: Map<GameObjectTypes, Object3D> = new Map()
	constructor(public game: Game) {}
	init() {
		createTurretPrototype(this)
		createBulletPrototype(this)
		createEnemyPrototype(this)
		createSpawnerPrototype(this)
	}
	createSpawner = createSpawner
	createEnemy = createEnemy
	createTurret = createTurret
	createBullet = createBullet
	createGameObject({
		container,
		transform,
		object3D,
		gameObjectType,
		additionalComponents,
		children,
	}: IGameObjectOptions = {}) {
		const newObject =
			object3D ||
			(gameObjectType !== undefined &&
				this.prototypes.has(gameObjectType) &&
				this.prototypes.get(gameObjectType)!.clone())
		if (!newObject)
			throw `Object3D was not provided and prototype does not exist for game object type ${gameObjectType}`
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
