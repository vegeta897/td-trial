import { Euler, Object3D, Vector3 } from 'three'
import { World } from 'uecs'
import Emitter, { EmitterType } from '../components/com_emitter'
import { createGameObject } from './game-object'
import { TagID } from '../world'

const SPAWN_INTERVAL = 60

export function createSpawner(
	container: Object3D,
	world: World,
	position?: Vector3,
	rotation?: Euler
) {
	createGameObject(container, world, {
		position,
		rotation,
		scale: new Vector3().setScalar(1.2),
		materialParams: { color: 0xef7d57 },
		additionalComponents: [
			new Emitter(EmitterType.Spawner, SPAWN_INTERVAL, SPAWN_INTERVAL - 1),
		],
		tagID: TagID.Spawner,
	})
}
