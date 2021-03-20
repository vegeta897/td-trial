import ThreeObject3D from '../components/com_object3d'
import { System } from './system'

export class RotateSystem extends System {
	view = this.world.view(ThreeObject3D)
	update() {
		this.view.each((entity, obj3d) => {
			obj3d.object3D.rotateX(0.01).rotateY(0.005)
		})
	}
}
