import { System } from './system'
import Target from '../components/com_target'
import Transform3D from '../components/com_transform3d'
import { Entity, Tag, View } from 'uecs'
import { Object3D } from 'three'
import Emitter from '../components/com_emitter'
import { GameObjectTypes } from '../game'
import { Constructor } from 'uecs/dist/util'

const objectProxy = new Object3D() // Could use a Matrix4 but the API is more complex

export default class TargetSystem extends System {
	view = this.world.view(Transform3D, Target)
	targetViews: Map<
		GameObjectTypes,
		View<[Constructor<Transform3D>]>
	> = new Map()
	update() {
		this.view.each((entity, transform, target) => {
			const maxDistanceSquared = target.maxDistance ** 2
			const emitter = this.world.get(entity, Emitter)
			// Retain existing target if in range
			const targetTransform =
				target.entity && this.world.get(target.entity, Transform3D)
			if (
				targetTransform &&
				targetTransform.position.distanceToSquared(transform.position) <=
					maxDistanceSquared
			) {
				setTarget(transform, targetTransform, target, emitter)
				return
			}
			// Acquire closest target
			let closest: [Entity, Transform3D, number] | undefined
			if (!this.targetViews.has(target.type))
				this.targetViews.set(
					target.type,
					this.world.view(Transform3D, Tag.for(target.type))
				)
			this.targetViews
				.get(target.type)!
				.each((targetEntity, targetTransform) => {
					const distanceSquared = targetTransform.position.distanceToSquared(
						transform.position
					)
					if (distanceSquared <= maxDistanceSquared) {
						if (!closest || distanceSquared < closest[2])
							closest = [targetEntity, targetTransform, distanceSquared]
					}
				})
			if (emitter) emitter.active = !!closest
			if (closest) {
				target.entity = closest[0]
				setTarget(transform, closest[1], target, emitter)
			} else {
				target.entity = null
			}
		})
	}
}

function setTarget(
	transform: Transform3D,
	targetTransform: Transform3D,
	target: Target,
	emitter?: Emitter
) {
	objectProxy.position.copy(transform.position)
	if (emitter) {
		if (emitter.origin.lengthSq() > 0) objectProxy.position.add(emitter.origin)
		objectProxy.lookAt(targetTransform.position)
		emitter.direction.copy(objectProxy.quaternion)
	}
	if (target.faceTarget) {
		objectProxy.lookAt(targetTransform.position)
		transform.rotation.copy(objectProxy.quaternion)
		transform.dirty = true
	}
}
