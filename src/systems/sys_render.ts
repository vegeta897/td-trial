import { System } from './system'
import ThreeObject3D from '../components/com_object3d'
import Transform3D from '../components/com_transform3d'
import Target from '../components/com_target'

export default class RenderSystem extends System {
	transforms = this.world.view(ThreeObject3D, Transform3D)
	targets = this.world.view(ThreeObject3D, Target)
	update(tick: number, dt: number) {
		// TODO: Disable/enable LERPing in real time based on framerate/tickrate?
		this.transforms.each((entity, threeObject3D, transform) => {
			const { position, quaternion, scale } = threeObject3D.object3D
			const { prevPosition, prevRotation, prevScale } = transform
			if (threeObject3D.lastUpdated === -1) {
				// Initialize Object3D
				threeObject3D.lastUpdated = tick
				position.copy(prevPosition)
				quaternion.copy(prevRotation)
				scale.copy(prevScale)
			}
			if (this.game.paused) return
			if (this.game.interpolate && transform.lastUpdated === tick) {
				// Interpolating and transform was updated in this tick
				threeObject3D.lastUpdated = tick
				if (!prevPosition.equals(transform.position))
					position.lerpVectors(prevPosition, transform.position, dt)
				if (!prevRotation.equals(transform.rotation))
					quaternion.slerpQuaternions(prevRotation, transform.rotation, dt)
				if (!prevScale.equals(transform.scale))
					scale.lerpVectors(prevScale, transform.scale, dt)
			} else if (transform.lastUpdated > threeObject3D.lastUpdated) {
				// Not interpolating and Object3D is outdated
				// This will also catch any outdated objects didn't render during an updated tick
				threeObject3D.lastUpdated = tick
				position.copy(transform.position)
				quaternion.copy(transform.rotation)
				scale.copy(transform.scale)
			}
		})
		this.targets.each((entity, { object3D }, target) => {
			// TODO: This is slow, try to optimize
			if (!target.entity || !target.faceTarget) return
			const targetObject = this.world.get(target.entity, ThreeObject3D)
			if (targetObject) object3D.lookAt(targetObject.object3D.position)
		})
	}
}
