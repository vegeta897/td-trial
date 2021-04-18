import Factory from './index'
import { GameObjectTypes } from '../game'
import { createMesh } from '../three/objects'
import { AssetNames } from '../three/assets'
import { Quaternion, Vector3 } from 'three'
import Emitter, { EmitterType } from '../components/com_emitter'
import Target from '../components/com_target'

const MAX_DISTANCE = 5
const EMITTER_HEIGHT = 0.9

export function createLoaderPrototype(factory: Factory) {
	factory.prototypes.set(
		GameObjectTypes.Loader,
		createMesh({
			geometry: factory.game.threeApp.assets.get(AssetNames.LoaderGeometry),
			materialParams: { color: 0x2da5b1 },
			meshProperties: { castShadow: true },
		})
	)
}

export function createLoader(
	this: Factory,
	position?: Vector3,
	rotation?: Quaternion
) {
	this.createGameObject({
		transform: { position, rotation },
		gameObjectType: GameObjectTypes.Loader,
		additionalComponents: [
			new Emitter(
				EmitterType.Loader,
				10,
				new Vector3(0, EMITTER_HEIGHT, 0),
				0,
				false
			),
			new Target(GameObjectTypes.Turret, MAX_DISTANCE, false),
		],
	})
}
