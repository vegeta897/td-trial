import GameObject from './game_object'
import Game, { GameObjectTypes } from '../game'
import { createMesh } from '../three/objects'
import { AssetNames } from '../three/assets'
import { Quaternion, Vector3 } from 'three'
import Emitter, { EmitterType } from '../components/com_emitter'
import Target, { TargetPriority } from '../components/com_target'

const MAX_DISTANCE = 5
const EMITTER_HEIGHT = 0.9

export default class AmmoLoader extends GameObject {
	constructor(position: Vector3, rotation?: Quaternion) {
		super(GameObjectTypes.AmmoLoader)
		this.transform = { position, rotation }
		this.additionalComponents = [
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
		]
	}
	addToGame(game: Game) {
		this.object3D = createMesh({
			geometry: game.threeApp.assets.get(AssetNames.LoaderGeometry),
			materialParams: { color: 0x2da5b1 },
			meshProperties: { castShadow: true },
		})
		super.addToGame(game)
	}
}
