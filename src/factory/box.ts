import { createMesh } from '../three/objects'
import Factory from './index'
import { Vector3 } from 'three'
import { Body, Box, Vec3 } from 'cannon-es'
import { GameObjectTypes } from '../game'

const boxPrototype = createMesh({
	materialParams: { color: 0xaa2288 },
	meshProperties: { castShadow: true },
})

const BOX_SIZE = 1 / 2

export function createBox(this: Factory, position: Vector3) {
	const body = new Body({
		mass: 1,
		shape: new Box(new Vec3(BOX_SIZE, BOX_SIZE, BOX_SIZE)),
		position: new Vec3(position.x, position.y, position.z),
		allowSleep: true,
		sleepSpeedLimit: 0.05,
		sleepTimeLimit: 0.5,
	})
	this.createGameObject({
		transform: { position },
		gameObjectType: GameObjectTypes.Box,
		object3D: boxPrototype.clone(),
		body,
	})
}
