import { System } from './system'
import Target, { TargetPriority } from '../components/com_target'
import Transform3D from '../components/com_transform3d'
import { Entity, Tag, View } from 'uecs'
import { Object3D } from 'three'
import Emitter from '../components/com_emitter'
import { GameObjectTypes } from '../game'
import { Constructor } from 'uecs/dist/util'
import AmmoComponent from '../components/com_ammo'

const objectProxy = new Object3D() // Could use a Matrix4 but the API is more complex

export default class TargetSystem extends System {
	view = this.world.view(Transform3D, Target)
	targetViews: Map<
		GameObjectTypes,
		View<[Constructor<Transform3D>]>
	> = new Map()
	update(tick: number) {
		this.view.each((entity, transform, target) => {
			const maxDistanceSquared = target.maxDistance ** 2
			const emitter = this.world.get(entity, Emitter)
			if (target.preferExisting) {
				// Retain existing target if in range
				const targetTransform =
					target.entity && this.world.get(target.entity, Transform3D)
				if (
					targetTransform &&
					targetTransform.position.distanceToSquared(transform.position) <=
						maxDistanceSquared
				) {
					setTarget(tick, transform, targetTransform, target, emitter)
					return
				}
			}
			// Acquire highest priority target
			let bestTarget: [Entity, Transform3D, number] | undefined
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
					if (distanceSquared > maxDistanceSquared) return
					let score = 0
					switch (target.priority) {
						case TargetPriority.Nearest:
							score =
								(maxDistanceSquared - distanceSquared) / maxDistanceSquared
							break
						case TargetPriority.LowestAmmo:
							const ammo = this.world.get(targetEntity, AmmoComponent)!
							score = (ammo.max - ammo.current) / ammo.max
							break
					}
					if (score > 0 && (!bestTarget || score > bestTarget[2]))
						bestTarget = [targetEntity, targetTransform, score]
				})
			if (emitter) emitter.active = !!bestTarget
			if (bestTarget) {
				target.entity = bestTarget[0]
				setTarget(tick, transform, bestTarget[1], target, emitter)
			} else {
				target.entity = null
			}
		})
	}
}

function setTarget(
	tick: number,
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
		transform.lastUpdated = tick
	}
}
