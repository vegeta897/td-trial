import { Quaternion, Vector3 } from 'three'
import Emitter, { EmitterType } from '../components/com_emitter'
import { GameObjectTypes } from '../game'
import Factory from './'
import Target from '../components/com_target'

export function createTurret(
	this: Factory,
	position?: Vector3,
	rotation?: Quaternion
) {
	this.createGameObject({
		position,
		rotation,
		materialParams: { color: 0x38b764 },
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
