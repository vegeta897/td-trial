import { createMesh } from '../three/objects'
import { Euler, LineBasicMaterial, LineLoop, Quaternion, Vector3 } from 'three'
import * as CANNON from 'cannon-es'
import GameObject from './game_object'
import { GameObjectTypes } from '../game'
import { createLineCircleGeometry } from '../util'

const HQ_CUBE_SIZE = 3
const HQ_ZONE_RADIUS = 8

const hqPrototype = createMesh({
	materialParams: { color: 0x38b764 },
	meshProperties: { castShadow: true },
})
const hqZoneLineGeometry = createLineCircleGeometry(
	HQ_ZONE_RADIUS / HQ_CUBE_SIZE
)
const hqZoneMaterial = new LineBasicMaterial({ color: 0x00eeaa })
const hqZoneLine = new LineLoop(hqZoneLineGeometry, hqZoneMaterial)
hqZoneLine.translateY(-1 / 2 + 0.05)
hqZoneLine.rotateX(Math.PI / 2)
hqPrototype.add(hqZoneLine)

export default class HQ extends GameObject {
	constructor(position: Vector3, rotation = new Euler()) {
		super(GameObjectTypes.HQ, hqPrototype.clone())
		const quaternion = new Quaternion().setFromEuler(rotation)
		this.body = new CANNON.Body({
			type: CANNON.Body.STATIC,
			shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1).scale(HQ_CUBE_SIZE / 2)),
			position: new CANNON.Vec3(position.x, position.y, position.z),
			quaternion: <CANNON.Quaternion>(<unknown>quaternion.clone()),
		})
		this.transform = {
			position,
			rotation: quaternion.clone(),
			scale: new Vector3().setScalar(HQ_CUBE_SIZE),
		}
	}
}
