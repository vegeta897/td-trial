import { System } from './system'
import PhysicsBody from '../components/com_physicsbody'
import ForceComponent from '../components/com_force'
import { ArrowHelper, Vector3 } from 'three'
import CANNON from 'cannon-es'

export default class ForceSystem extends System {
	view = this.world.view(PhysicsBody, ForceComponent)
	update(tick: number) {
		this.view.each((entity, { body }, force) => {
			if (tick % force.applyRate > 0) return
			if (force.dirty) {
				// Calculate velocity vector from direction and magnitude
				force.dirty = false
				force.velocity
					.set(force.magnitude, 0, 0)
					.applyQuaternion(force.direction)
			}
			if (force.showForceVector) {
				if (!force.arrow) {
					force.arrow = new ArrowHelper()
					this.threeApp.scene.add(force.arrow)
				}
				force.arrow.setLength(force.magnitude)
				force.arrow.position.copy(<Vector3>(<unknown>body.position))
				force.arrow.setDirection(force.velocity.clone().normalize())
			}
			if (force.limit) {
				// Limit body velocity in direction of force
				const velocityDotProduct = force.velocity
					.clone()
					.normalize()
					.dot(<Vector3>(<unknown>body.velocity.unit()))
				const velocityRatio =
					(body.velocity.length() / force.limit) * velocityDotProduct
				const velocityScale = Math.min(1, 1 - velocityRatio)
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
