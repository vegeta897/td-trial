import { GameObjectTypes } from '../game'
import { Entity } from 'uecs'

export enum TargetPriority {
	Nearest,
	LowestAmmo,
}

export default class Target {
	constructor(
		public type: GameObjectTypes,
		public maxDistance: number = 1,
		public faceTarget: boolean = true,
		public priority: TargetPriority = TargetPriority.Nearest,
		public preferExisting: boolean = true,
		public entity: Entity | null = null
	) {}
}
