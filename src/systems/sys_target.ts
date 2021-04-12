import { System } from './system'
import Target from '../components/com_target'
import Transform3D from '../components/com_transform3d'
import { Entity, Tag } from 'uecs'
import { Object3D } from 'three'
import Emitter from '../components/com_emitter'

const objectProxy = new Object3D() // Could use a Matrix4 but the API is more complex

export default class TargetSystem extends System {
	view = this.world.view(Transform3D, Target)
	update() {
		this.view.each((entity, transform, target) => {
			// Retain existing target if in range
			const targetTransform =
				target.entity && this.world.get(target.entity, Transform3D)
			if (
				targetTransform &&
				targetTransform.position.distanceTo(transform.position) <=
					target.maxDistance
			) {
				lookAtTarget(transform, targetTransform)
				return
			}
			// Acquire closest target
			let closest: [Entity, Transform3D, number] | undefined
			this.world
				.view(Transform3D, Tag.for(target.type))
				.each((targetEntity, targetTransform) => {
					const distance = targetTransform.position.distanceTo(
						transform.position
					)
					if (distance <= target.maxDistance) {
						if (!closest || distance < closest[2])
							closest = [targetEntity, targetTransform, distance]
					}
				})
			const emitter = this.world.get(entity, Emitter)
			if (emitter) emitter.active = !!closest
			if (closest) {
				target.entity = closest[0]
				lookAtTarget(transform, closest[1])
			} else {
				target.entity = null
			}
		})
	}
}

function lookAtTarget(transform: Transform3D, targetTransform: Transform3D) {
	objectProxy.position.copy(transform.position)
	objectProxy.lookAt(targetTransform.position)
	transform.rotation.copy(objectProxy.quaternion)
	transform.dirty = true
}
