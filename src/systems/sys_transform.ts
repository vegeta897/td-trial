import { System } from './system'
import Transform3D from '../components/com_transform3d'
import Velocity3D from '../components/com_velocity3d'

export default class TransformSystem extends System {
	view = this.world.view(Transform3D, Velocity3D)
	update(dt: number) {
		this.view.each((entity, transform, velocity) => {
			transform.position.add(velocity.vector3)
			transform.dirty = true
		})
	}
}
