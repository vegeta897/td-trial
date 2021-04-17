import { Quaternion, Vector3 } from 'three'
import Emitter, { EmitterType } from '../components/com_emitter'
import { GameObjectTypes } from '../game'
import Factory from './'
import { createMesh } from '../three/objects'

const SPAWN_INTERVAL = 60

export function createSpawnerPrototype(factory: Factory) {
	factory.prototypes.set(
		GameObjectTypes.Spawner,
		createMesh({
			materialParams: { color: 0xef7d57 },
			meshProperties: { castShadow: true },
		})
	)
}

export function createSpawner(
	this: Factory,
	position?: Vector3,
	rotation?: Quaternion
) {
	this.createGameObject({
		transform: { position, rotation, scale: new Vector3().setScalar(1.2) },
		additionalComponents: [
			new Emitter(EmitterType.Spawner, SPAWN_INTERVAL, SPAWN_INTERVAL - 1),
		],
		gameObjectType: GameObjectTypes.Spawner,
	})
}
