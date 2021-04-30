import { System } from './system'
import Orbit from '../components/com_orbit'
import ForceComponent from '../components/com_force'
import Transform3D from '../components/com_transform3d'
import { Quaternion, Vector2, Vector3 } from 'three'

const UP = new Vector3(0, 1, 0)
const SLICES = 360
const RADIANS_PER_SLICE = (2 * Math.PI) / SLICES
const orbitQuaternions: Quaternion[] = []
for (let i = 0; i < SLICES; i++) {
	orbitQuaternions.push(
		new Quaternion().setFromAxisAngle(UP, -i * RADIANS_PER_SLICE - Math.PI / 2)
	)
}

const RADIUS_VECTOR = new Vector2()

export default class OrbitSystem extends System {
	view = this.world.view(Orbit, Transform3D, ForceComponent)
	update(tick: number) {
		this.view.each((entity, { origin, ccw }, { position }, force) => {
			if (tick % force.applyRate > 0) return
			RADIUS_VECTOR.set(position.x, position.z).sub(origin)
			let slice = Math.round((RADIUS_VECTOR.angle() / (Math.PI * 2)) * SLICES)
			if (ccw) slice += SLICES / 2
			const orbitQuaternion = orbitQuaternions[slice % SLICES]
			force.direction.copy(orbitQuaternion)
			force.dirty = true
		})
	}
}
