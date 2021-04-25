import { System } from './system'
import Orbit from '../components/com_orbit'
import ForceComponent from '../components/com_force'
import Transform3D from '../components/com_transform3d'
import { Vector2, Vector3 } from 'three'

const UP = new Vector3(0, 1, 0)

export default class OrbitSystem extends System {
	view = this.world.view(Orbit, Transform3D, ForceComponent)
	update() {
		this.view.each((entity, { origin, ccw }, { position }, force) => {
			const radiusVector = new Vector2(position.x, position.z).sub(origin)
			const angle = -radiusVector.angle() - (Math.PI / 2) * (ccw ? -1 : 1)
			force.direction.setFromAxisAngle(UP, angle)
			force.dirty = true
		})
	}
}
