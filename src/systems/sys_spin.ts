import { System } from './system'
import Transform3D from '../components/com_transform3d'
import Spin from '../components/com_spin'

export default class SpinSystem extends System {
	view = this.world.view(Transform3D, Spin)
	update() {
		this.view.each((entity, transform, spin) => {
			transform.rotation.y += spin.rate
			transform.dirty = true
		})
	}
}
