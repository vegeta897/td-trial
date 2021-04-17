import { Quaternion, Vector3 } from 'three'
import Emitter, { EmitterType } from '../components/com_emitter'
import { GameObjectTypes } from '../game'
import Factory from './'
import Target from '../components/com_target'
import { AssetNames } from '../three/assets'
import { createMesh } from '../three/objects'

export function createTurretPrototype(factory: Factory) {
	factory.prototypes.set(
		GameObjectTypes.Turret,
		createMesh({
			geometry: factory.game.threeApp.assets.get(AssetNames.TurretGeometry),
			materialParams: { color: 0x38b764 },
			meshProperties: { castShadow: true },
		})
	)
}

export function createTurret(
	this: Factory,
	position?: Vector3,
	rotation?: Quaternion
) {
	this.createGameObject({
		transform: { position, rotation },
		gameObjectType: GameObjectTypes.Turret,
		additionalComponents: [
			new Emitter(
				EmitterType.Turret,
				Math.round(this.game.tickRate / this.game.turretProperties.fireRate),
				0,
				false
			),
			new Target(
				GameObjectTypes.Enemy,
				this.game.turretProperties.targetDistance
			),
		],
	})
}
