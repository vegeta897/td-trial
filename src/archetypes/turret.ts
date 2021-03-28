import { Euler, Object3D, Vector3 } from 'three'
import { Component, World } from 'uecs'
import Emitter, { EmitterType } from '../components/com_emitter'
import { TagID } from '../world'
import Spin from '../components/com_spin'
import { createGameObject } from './game-object'

const SHOOT_INTERVAL = 5

export function createTurret(
	container: Object3D,
	world: World,
	position?: Vector3,
	rotation?: Euler,
	spin?: number
) {
	const additionalComponents: Component[] = [
		new Emitter(EmitterType.Turret, SHOOT_INTERVAL),
	]
	if (spin) additionalComponents.push(new Spin(spin))
	createGameObject(container, world, {
		position,
		rotation,
		materialParams: { color: 0x38b764 },
		tagID: TagID.Turret,
		additionalComponents,
	})
}
