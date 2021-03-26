import { Euler, Object3D, Vector3 } from 'three'
import { Tag, World } from 'uecs'
import { createCube } from '../three/cube'
import ThreeObject3D from '../components/com_object3d'
import Transform3D from '../components/com_transform3d'
import Emitter, { EmitterType } from '../components/com_emitter'
import { TagID } from '../world'

const SHOOT_INTERVAL = 5

export function createTurret(
	container: Object3D,
	world: World,
	position?: Vector3,
	rotation?: Euler
) {
	const turretCube = createCube()
	container.add(turretCube)
	world.create(
		Tag.for(TagID.Turret),
		new ThreeObject3D(turretCube),
		new Transform3D(position, rotation),
		new Emitter(EmitterType.Turret, SHOOT_INTERVAL)
	)
}
