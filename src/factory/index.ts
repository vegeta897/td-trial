import Game, { GameObjectTypes } from '../game'
import { createSpawner } from './spawner'
import { createEnemy } from './enemy'
import { createTurret } from './turret'
import { createBullet } from './bullet'
import { Object3D } from 'three'
import { Component, Tag } from 'uecs'
import ThreeObject3D from '../components/com_object3d'
import Transform3D from '../components/com_transform3d'
import { createLoader } from './loader'
import { createAmmo } from './ammo'
import { Body } from 'cannon-es'
import PhysicsBody from '../components/com_physicsbody'
import { createBox } from './box'

interface IGameObjectOptions {
	container?: Object3D
	transform?: Partial<Transform3D>
	object3D: Object3D
	body?: Body
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
	createLoader = createLoader
	createAmmo = createAmmo
	createBox = createBox
	createGameObject({
		container,
		transform,
		object3D,
		body,
		gameObjectType,
		additionalComponents,
		children,
	}: IGameObjectOptions) {
		if (children) children.forEach((child) => object3D.add(child))
		;(container || this.game.threeApp.scene).add(object3D)
		const entity = this.game.world.create(
			new ThreeObject3D(object3D),
			new Transform3D(transform)
		)
		object3D.userData.entity = entity
		if (body) {
			this.game.world.emplace(entity, new PhysicsBody(body))
			this.game.physics.world.addBody(body)
		}
		if (additionalComponents)
			this.game.world.insert(entity, ...additionalComponents)
		if (gameObjectType !== undefined)
			this.game.world.emplace(entity, Tag.for(gameObjectType))
	}
}
