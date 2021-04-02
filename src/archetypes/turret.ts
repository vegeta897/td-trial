import { Euler, Vector3 } from 'three'
import { Component } from 'uecs'
import Emitter, { EmitterType } from '../components/com_emitter'
import { GameObjectTypes } from '../game'
import Spin from '../components/com_spin'
import Factory from './factory'

const SHOOT_INTERVAL = 5

export function createTurret(
	this: Factory,
	position?: Vector3,
	rotation?: Euler,
	spin?: number
) {
	const additionalComponents: Component[] = [
		new Emitter(EmitterType.Turret, SHOOT_INTERVAL),
	]
	if (spin) additionalComponents.push(new Spin(spin))
	this.createGameObject({
		position,
		rotation,
		materialParams: { color: 0x38b764 },
		gameObjectType: GameObjectTypes.Turret,
		additionalComponents,
	})
}
