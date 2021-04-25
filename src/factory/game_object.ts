import Game, { GameObjectTypes } from '../game'
import { Object3D } from 'three'
import { Component, Entity, Tag } from 'uecs'
import ThreeObject3D from '../components/com_object3d'
import Transform3D from '../components/com_transform3d'
import { Body } from 'cannon-es'
import PhysicsBody from '../components/com_physicsbody'

export default abstract class GameObject {
	game?: Game
	object3D: Object3D
	body?: Body
	entity: Entity | null = null
	type: GameObjectTypes
	protected children?: Object3D[]
	protected container?: Object3D
	protected additionalComponents?: Component[]
	protected transform: Partial<Transform3D>
	protected constructor(type = 0) {
		this.type = type
	}
	addToGame(game: Game) {
		this.game = game
		if (this.children)
			this.children.forEach((child) => this.object3D.add(child))
		this.container = this.container || this.game.threeApp.scene
		this.container.add(this.object3D)
		this.entity = this.game.world.create(
			new ThreeObject3D(this.object3D),
			new Transform3D(this.transform),
			Tag.for(this.type)
		)
		this.object3D.userData.entity = this.entity
		if (this.body) {
			this.game.world.emplace(this.entity, new PhysicsBody(this.body))
			this.game.physics.world.addBody(this.body)
		}
		if (this.additionalComponents)
			this.game.world.insert(this.entity, ...this.additionalComponents)
	}
}
