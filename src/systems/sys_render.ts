import { System } from './system'
import ThreeObject3D from '../components/com_object3d'
import Transform3D from '../components/com_transform3d'

export default class RenderSystem extends System {
	view = this.world.view(ThreeObject3D, Transform3D)
	update(dt: number) {
		this.view.each((entity, obj3d, transform) => {
			if (!transform.dirty) return
			transform.dirty = false
			obj3d.object3D.position.copy(transform.vector3)
		})
	}
}
