import { Quaternion, Vector3 } from 'three'
import { Component } from 'uecs'
import Emitter, { EmitterType } from '../components/com_emitter'
import { GameObjectTypes } from '../game'
import Rotate3D from '../components/com_rotate3d'
import Factory from './'

const SHOOT_INTERVAL = 5

export function createTurret(
	this: Factory,
	position?: Vector3,
	rotation?: Quaternion,
	spin?: Quaternion
) {
	const additionalComponents: Component[] = [
		new Emitter(EmitterType.Turret, SHOOT_INTERVAL),
	]
	if (spin) additionalComponents.push(new Rotate3D(spin))
	this.createGameObject({
		position,
		rotation,
		materialParams: { color: 0x38b764 },
		gameObjectType: GameObjectTypes.Turret,
		additionalComponents,
	})
}
