import { System } from './system'
import Transform3D from '../components/com_transform3d'
import Rotate3D from '../components/com_rotate3d'

export default class RotateSystem extends System {
	view = this.world.view(Transform3D, Rotate3D)
	update(tick: number) {
		this.view.each((entity, transform, rotation) => {
			transform.rotation.multiply(rotation.quaternion)
			transform.lastUpdated = tick
		})
	}
}
