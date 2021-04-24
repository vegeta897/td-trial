import { System } from './system'
import Transform3D from '../components/com_transform3d'
import PhysicsBody from '../components/com_physicsbody'
import * as CANNON from 'cannon-es'
import { Quaternion, Vector3 } from 'three'
import Velocity3D from '../components/com_velocity3d'
import ForceComponent from '../components/com_force'

// TODO: Create unified three/cannon Vector3 and Quaternion?
const MAX_DISTANCE = 50
const MAX_DISTANCE_SQ = MAX_DISTANCE ** 2

export default class PhysicsSystem extends System {
	forces = this.world.view(PhysicsBody, ForceComponent)
	bodies = this.world.view(PhysicsBody, Transform3D)
	update(tick: number) {
		this.forces.each((entity, { body }, { velocity, limit }) => {
			if (limit) {
				// Limit body velocity in direction of force
				const velocityDotProduct = velocity
					.clone()
					.normalize()
					.dot(<Vector3>(<unknown>body.velocity.unit()))
				const velocityRatio =
					(body.velocity.length() / limit) * Math.max(0, velocityDotProduct)
				const velocityScale = Math.max(0, Math.min(1, 1 - velocityRatio))
				if (velocityScale > 0)
					body.applyForce(
						<CANNON.Vec3>(
							(<unknown>velocity.clone().multiplyScalar(velocityScale))
						)
					)
			} else {
				body.applyForce(<CANNON.Vec3>(<unknown>velocity))
			}
		})
		this.bodies.each(
			(entity, { body }, { lastUpdated, prevPosition, prevRotation }) => {
				if (body.type === CANNON.Body.DYNAMIC) return
				// For static and kinetic bodies, ECS is the source of truth
				if (lastUpdated === tick) {
					// Previous transform is used because velocity/rotation will be applied
					body.position.copy(<CANNON.Vec3>(<unknown>prevPosition))
					body.quaternion.copy(<CANNON.Quaternion>(<unknown>prevRotation))
				}
				if (body.type === CANNON.Body.STATIC) return
				const velocity = this.world.get(entity, Velocity3D)
				if (velocity)
					body.velocity.copy(
						<CANNON.Vec3>(
							(<unknown>(
								velocity.vector3.clone().multiplyScalar(this.game.tickRate)
							))
						)
					)
				else body.velocity.setZero()
			}
		)
		this.game.physics.world.step(1 / this.game.tickRate)
		this.bodies.each((entity, { body }, transform) => {
			if (body.position.lengthSquared() > MAX_DISTANCE_SQ) {
				this.world.destroy(entity)
				return
			}
			if (body.type !== CANNON.Body.DYNAMIC) return
			// For dynamic bodies, physics bodies are the source of truth
			if (
				body.sleepState === CANNON.Body.SLEEPY ||
				body.sleepState === CANNON.Body.SLEEPING
			)
				return
			transform.position.copy(<Vector3>(<unknown>body.position))
			transform.rotation.copy(<Quaternion>(<unknown>body.quaternion))
			transform.lastUpdated = tick
		})
	}
}
