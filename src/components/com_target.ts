import { GameObjectTypes } from '../game'

export default class Target {
	constructor(public type: GameObjectTypes, public maxDistance: number = 1) {}
}
