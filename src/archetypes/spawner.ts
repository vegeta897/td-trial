import { Euler, Object3D, Vector3 } from 'three'
import { Tag, World } from 'uecs'
import { createCube } from '../three/cube'
import ThreeObject3D from '../components/com_object3d'
import Transform3D from '../components/com_transform3d'
import Emitter, { EmitterType } from '../components/com_emitter'
import { TagID } from '../world'

export function createSpawner(
	container: Object3D,
	world: World,
	position?: Vector3,
	rotation?: Euler
) {
	const spawnerCube = createCube()
	container.add(spawnerCube)
	world.create(
		Tag.for(TagID.Spawner),
		new ThreeObject3D(spawnerCube),
		new Transform3D(position, rotation),
		new Emitter(EmitterType.Spawner, 60, 59)
	)
}
