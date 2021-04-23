import { System } from './system'
import Transform3D from '../components/com_transform3d'
import PhysicsBody from '../components/com_physicsbody'
import * as CANNON from 'cannon-es'
import { Quaternion, Vector3 } from 'three'
import Velocity3D from '../components/com_velocity3d'

// TODO: Create unified Vector3 and Quaternion?

export default class PhysicsSystem extends System {
	bodies = this.world.view(PhysicsBody, Transform3D)
	update(tick: number) {
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
