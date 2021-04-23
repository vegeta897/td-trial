import { Body } from 'cannon-es'

export default class PhysicsBody {
	constructor(public body: Body) {}
	free() {
		this.body.world?.removeBody(this.body)
	}
}
