import { GameObjectTypes } from '../game'
import { Entity } from 'uecs'

export default class Target {
	constructor(
		public type: GameObjectTypes,
		public maxDistance: number = 1,
		public entity: Entity | null = null
	) {}
}
