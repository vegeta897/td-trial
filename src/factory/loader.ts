import Factory from './'
import { GameObjectTypes } from '../game'
import { createMesh } from '../three/objects'
import { AssetNames } from '../three/assets'
import { Mesh, Quaternion, Vector3 } from 'three'
import Emitter, { EmitterType } from '../components/com_emitter'
import Target, { TargetPriority } from '../components/com_target'

const MAX_DISTANCE = 5
const EMITTER_HEIGHT = 0.9

let loaderPrototype: Mesh

export function createLoader(
	this: Factory,
	position?: Vector3,
	rotation?: Quaternion
) {
	loaderPrototype =
		loaderPrototype ||
		createMesh({
			geometry: this.game.threeApp.assets.get(AssetNames.LoaderGeometry),
			materialParams: { color: 0x2da5b1 },
			meshProperties: { castShadow: true },
		})
	this.createGameObject({
		transform: { position, rotation },
		gameObjectType: GameObjectTypes.Loader,
		object3D: loaderPrototype.clone(),
		additionalComponents: [
			new Emitter(
				EmitterType.Loader,
				10,
				new Vector3(0, EMITTER_HEIGHT, 0),
				0,
				false
			),
			new Target(
				GameObjectTypes.Turret,
				MAX_DISTANCE,
				false,
				TargetPriority.LowestAmmo,
				false
			),
		],
	})
}
