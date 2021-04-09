import { System } from './system'
import Target from '../components/com_target'
import Transform3D from '../components/com_transform3d'
import { Entity, Tag } from 'uecs'
import { Object3D, Vector3 } from 'three'
import Emitter from '../components/com_emitter'

const objectProxy = new Object3D() // Could use a Matrix4 but the API is more complex

export default class TargetSystem extends System {
	view = this.world.view(Transform3D, Target)
	update() {
		this.view.each((entity, transform, target) => {
			const emitter = this.world.get(entity, Emitter)
			// Keep target if still in range?
			let closest: [Entity, Vector3, number] | undefined
			this.world
				.view(Transform3D, Tag.for(target.type))
				.each((targetEntity, targetTransform) => {
					const distance = targetTransform.position.distanceTo(
						transform.position
					)
					if (distance <= target.maxDistance) {
						if (!closest || distance < closest[2])
							closest = [targetEntity, targetTransform.position, distance]
					}
				})
			if (closest) {
				target.entity = closest[0]
				if (emitter) emitter.active = true
				objectProxy.position.copy(transform.position)
				objectProxy.lookAt(closest[1])
				transform.rotation.copy(objectProxy.quaternion)
				transform.dirty = true
			} else {
				target.entity = null
				if (emitter) emitter.active = false
			}
		})
	}
}
