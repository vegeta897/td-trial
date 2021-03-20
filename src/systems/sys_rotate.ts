import { World } from 'uecs'
import ThreeObject3D from '../components/com_object3d'

export function rotate(world: World) {
	world.view(ThreeObject3D).each((entity, obj3d) => {
		obj3d.object3D.rotateX(0.01).rotateY(0.005)
	})
}
