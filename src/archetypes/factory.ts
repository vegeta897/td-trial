import Game, { GameObjectTypes } from '../game'
import { createSpawner } from './spawner'
import { createEnemy } from './enemy'
import { createTurret } from './turret'
import { createBullet } from './bullet'
import { Euler, Object3D, Vector3 } from 'three'
import { MeshLambertMaterialParameters } from 'three/src/materials/MeshLambertMaterial'
import { Component, Tag } from 'uecs'
import { createCube } from '../three/objects'
import ThreeObject3D from '../components/com_object3d'
import Transform3D from '../components/com_transform3d'

interface IGameObject {
	container?: Object3D
	position?: Vector3
	rotation?: Euler
	scale?: Vector3
	materialParams?: MeshLambertMaterialParameters
	gameObjectType?: GameObjectTypes
	additionalComponents?: Component[]
	children?: Object3D[]
}

export default class Factory {
	constructor(public game: Game) {}

	createGameObject(options: IGameObject = {}) {
		const cube = createCube(options.materialParams)
		if (options.children) options.children.forEach((child) => cube.add(child))
		;(options.container || this.game.threeApp.scene).add(cube)
		const entity = this.game.world.create(
			new ThreeObject3D(cube),
			new Transform3D(options.position, options.rotation, options.scale)
		)
		cube.userData.entity = entity
		if (options.additionalComponents)
			this.game.world.insert(entity, ...options.additionalComponents)
		if (options.gameObjectType)
			this.game.world.emplace(entity, Tag.for(options.gameObjectType))
	}
	createSpawner = createSpawner
	createEnemy = createEnemy
	createTurret = createTurret
	createBullet = createBullet
}
