import { createMesh } from '../three/objects'
import {
	BoxGeometry,
	Euler,
	LineBasicMaterial,
	LineLoop,
	Quaternion,
	Vector3,
} from 'three'
import * as CANNON from 'cannon-es'
import Factory from './'
import { GameObjectTypes } from '../game'
import { createLineCircleGeometry } from '../util'

const HQ_CUBE_SIZE = 3
const HQ_ZONE_RADIUS = 8

const hqPrototype = createMesh({
	materialParams: { color: 0x38b764 },
	meshProperties: { castShadow: true },
	geometry: new BoxGeometry(HQ_CUBE_SIZE, HQ_CUBE_SIZE, HQ_CUBE_SIZE),
})
const hqZoneLineGeometry = createLineCircleGeometry(HQ_ZONE_RADIUS)
const hqZoneMaterial = new LineBasicMaterial({ color: 0x00eeaa })
const hqZoneLine = new LineLoop(hqZoneLineGeometry, hqZoneMaterial)
hqZoneLine.translateY(-HQ_CUBE_SIZE / 2 + 0.05)
hqZoneLine.rotateX(Math.PI / 2)
hqPrototype.add(hqZoneLine)

export function createHQ(
	this: Factory,
	position: Vector3,
	rotation = new Euler()
) {
	const quaternion = new Quaternion().setFromEuler(rotation)
	const body = new CANNON.Body({
		type: CANNON.Body.STATIC,
		shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1).scale(HQ_CUBE_SIZE / 2)),
		position: new CANNON.Vec3(position.x, position.y, position.z),
		quaternion: <CANNON.Quaternion>(<unknown>quaternion.clone()),
	})
	this.createGameObject({
		transform: { position, rotation: quaternion.clone() },
		gameObjectType: GameObjectTypes.HQ,
		object3D: hqPrototype.clone(),
		body,
	})
}
