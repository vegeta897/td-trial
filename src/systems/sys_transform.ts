import { System } from './system'
import Transform3D from '../components/com_transform3d'

export default class TransformSystem extends System {
	transforms = this.world.view(Transform3D)
	update() {
		this.transforms.each((entity, transform) => {
			transform.prevPosition.copy(transform.position)
			transform.prevRotation.copy(transform.rotation)
			transform.prevScale.copy(transform.scale)
		})
	}
}
