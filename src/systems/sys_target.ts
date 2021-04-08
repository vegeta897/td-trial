import { System } from './system'
import Target from '../components/com_target'
import Transform3D from '../components/com_transform3d'
import { Tag } from 'uecs'
import { Vector3 } from 'three'
import Emitter from '../components/com_emitter'

export default class TargetSystem extends System {
	view = this.world.view(Transform3D, Target)
	update() {
		this.view.each((entity, transform, target) => {
			const emitter = this.world.get(entity, Emitter)
			let closest: [Vector3, number] | undefined
			this.world
				.view(Transform3D, Tag.for(target.type))
				.each((targetEntity, targetTransform) => {
					const distance = targetTransform.position.distanceTo(
						transform.position
					)
					if (distance <= target.maxDistance) {
						if (!closest || distance < closest[1])
							closest = [
								new Vector3().subVectors(
									targetTransform.position,
									transform.position
								),
								distance,
							]
					}
				})
			if (closest) {
				if (emitter) emitter.active = true
				transform.rotation.setFromUnitVectors(
					new Vector3(0, 0, -1),
					closest[0].normalize()
				)
				transform.dirty = true
			} else if (emitter) {
				emitter.active = false
			}
		})
	}
}
