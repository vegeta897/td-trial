import { createMesh } from '../three/objects'
import { Quaternion, Vector3 } from 'three'
import * as CANNON from 'cannon-es'
import { GameObjectTypes } from '../game'
import ForceComponent from '../components/com_force'
import GameObject from './game_object'

export const TUMBLER_CUBE_SIZE = 0.5
const MASS = TUMBLER_CUBE_SIZE ** 3
const FORCE = 5
const SPEED_LIMIT = 2

const tumblerPrototype = createMesh({
	materialParams: { color: 0x73eff7 },
	meshProperties: { castShadow: true },
})

export default class Tumbler extends GameObject {
	constructor(position: Vector3, tumbleDirection: Quaternion) {
		super(GameObjectTypes.Tumbler, tumblerPrototype.clone())
		this.body = new CANNON.Body({
			mass: MASS,
			shape: new CANNON.Box(
				new CANNON.Vec3(1, 1, 1).scale(TUMBLER_CUBE_SIZE / 2)
			),
			position: new CANNON.Vec3(position.x, position.y, position.z),
			quaternion: <CANNON.Quaternion>(<unknown>tumbleDirection.clone()),
		})
		this.transform = {
			position,
			rotation: tumbleDirection.clone(),
			scale: new Vector3(1, 1, 1).setScalar(TUMBLER_CUBE_SIZE),
		}
		this.additionalComponents = [
			new ForceComponent(
				new Vector3(FORCE).applyQuaternion(tumbleDirection),
				SPEED_LIMIT
			),
		]
	}
}
