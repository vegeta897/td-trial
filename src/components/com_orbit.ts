import { Vector2 } from 'three'

export default class Orbit {
	constructor(public origin: Vector2, public ccw = false) {}
}
