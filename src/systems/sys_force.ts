import { System } from './system'
import PhysicsBody from '../components/com_physicsbody'
import ForceComponent from '../components/com_force'
import { Vector3 } from 'three'
import CANNON from 'cannon-es'

export default class ForceSystem extends System {
	view = this.world.view(PhysicsBody, ForceComponent)
	update() {
		this.view.each((entity, { body }, force) => {
			if (force.dirty) {
				// Calculate velocity vector from direction and magnitude
				force.dirty = false
				force.velocity
					.set(force.magnitude, 0, 0)
					.applyQuaternion(force.direction)
			}
			if (force.limit) {
				// Limit body velocity in direction of force
				const velocityDotProduct = force.velocity
					.clone()
					.normalize()
					.dot(<Vector3>(<unknown>body.velocity.unit()))
				const velocityRatio =
					(body.velocity.length() / force.limit) *
					Math.max(0, velocityDotProduct)
				const velocityScale = Math.max(0, Math.min(1, 1 - velocityRatio))
				if (velocityScale > 0)
					body.applyForce(
						<CANNON.Vec3>(
							(<unknown>force.velocity.clone().multiplyScalar(velocityScale))
						)
					)
			} else {
				body.applyForce(<CANNON.Vec3>(<unknown>force.velocity))
			}
		})
	}
}
