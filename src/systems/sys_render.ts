import { System } from './system'
import ThreeObject3D from '../components/com_object3d'
import Transform3D from '../components/com_transform3d'
import Velocity3D from '../components/com_velocity3d'
import Rotate3D from '../components/com_rotate3d'
import { Quaternion } from 'three'
import Target from '../components/com_target'

export default class RenderSystem extends System {
	transforms = this.world.view(ThreeObject3D, Transform3D)
	velocities = this.world.view(ThreeObject3D, Transform3D, Velocity3D)
	rotations = this.world.view(ThreeObject3D, Transform3D, Rotate3D)
	targets = this.world.view(ThreeObject3D, Target)
	update(dt: number) {
		this.transforms.each((entity, { object3D }, transform) => {
			if (!transform.dirty) return
			transform.dirty = false
			object3D.position.copy(transform.position)
			object3D.quaternion.copy(transform.rotation)
			object3D.scale.copy(transform.scale)
		})
		// Do not interpolate if game is paused
		if (this.game.paused || !this.game.interpolate) return
		this.velocities.each((entity, { object3D }, transform, velocity) => {
			// If this doesn't work out, store previous position in transform and LERP
			// See https://github.com/EverCrawl/game/blob/master/common/component.ts
			object3D.position.addVectors(
				transform.position,
				velocity.vector3.clone().multiplyScalar(dt)
			)
		})
		this.rotations.each((entity, { object3D }, { rotation }, rotate) => {
			object3D.quaternion.multiplyQuaternions(
				rotation,
				new Quaternion().slerp(rotate.quaternion, dt)
			)
		})
		this.targets.each((entity, { object3D }, target) => {
			if (!target.entity) return
			const targetObject = this.world.get(target.entity, ThreeObject3D)
			if (targetObject) object3D.lookAt(targetObject.object3D.position)
		})
	}
}
