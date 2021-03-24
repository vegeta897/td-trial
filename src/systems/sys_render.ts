import { System } from './system'
import ThreeObject3D from '../components/com_object3d'
import Transform3D from '../components/com_transform3d'
import Velocity3D from '../components/com_velocity3d'

export default class RenderSystem extends System {
	transforms = this.world.view(ThreeObject3D, Transform3D)
	velocities = this.world.view(ThreeObject3D, Transform3D, Velocity3D)
	update(dt: number) {
		this.transforms.each((entity, obj3d, transform) => {
			if (!transform.dirty) return
			transform.dirty = false
			obj3d.object3D.position.copy(transform.vector3)
		})
		this.velocities.each((entity, obj3d, transform, velocity) => {
			// If this doesn't work out, store previous position in transform and LERP
			// See https://github.com/EverCrawl/game/blob/master/common/component.ts
			obj3d.object3D.position.addVectors(
				transform.vector3,
				velocity.vector3.clone().multiplyScalar(dt)
			)
		})
	}
}
