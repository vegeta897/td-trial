import { System } from './system'
import Transform3D from '../components/com_transform3d'
import Rotate3D from '../components/com_rotate3d'

export default class RotateSystem extends System {
	view = this.world.view(Transform3D, Rotate3D)
	update() {
		this.view.each((entity, transform, { euler: { x, y, z } }) => {
			transform.rotation.x += x
			transform.rotation.y += y
			transform.rotation.z += z
			transform.dirty = true
		})
	}
}
