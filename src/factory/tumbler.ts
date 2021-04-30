import { createMesh } from '../three/objects'
import { Quaternion, Vector3 } from 'three'
import * as CANNON from 'cannon-es'
import ForceComponent from '../components/com_force'
import GameObject, { GameObjectTypes } from './game_object'
import Orbit from '../components/com_orbit'
import { Physics } from '../game/physics'
import { Level } from '../game/level'

export const TUMBLER_CUBE_SIZE = 0.3
const MASS = TUMBLER_CUBE_SIZE ** 3
const FORCE = 3
const SPEED_LIMIT = 2

const tumblerPrototype = createMesh({
	materialParams: { color: 0x73eff7 },
	meshProperties: { castShadow: true },
})

const SCALE_VECTOR = new Vector3().setScalar(TUMBLER_CUBE_SIZE)
const BODY_SCALE_VECTOR = new CANNON.Vec3(1, 1, 1).scale(TUMBLER_CUBE_SIZE / 2)

export default class Tumbler extends GameObject {
	constructor(position: Vector3, initDirection: Quaternion) {
		super(GameObjectTypes.Tumbler, tumblerPrototype.clone())
		this.body = new CANNON.Body({
			mass: MASS,
			shape: new CANNON.Box(BODY_SCALE_VECTOR.clone()),
			position: new CANNON.Vec3(position.x, position.y, position.z),
			quaternion: new CANNON.Quaternion(
				initDirection.x,
				initDirection.y,
				initDirection.z,
				initDirection.w
			),
			material: Physics.Materials.tumbler,
		})
		this.transform = {
			position,
			rotation: initDirection.clone(),
			scale: SCALE_VECTOR.clone(),
		}
		this.additionalComponents = [
			new Orbit(Level.Origin),
			new ForceComponent(initDirection.clone(), FORCE, SPEED_LIMIT, 2),
		]
	}
}
