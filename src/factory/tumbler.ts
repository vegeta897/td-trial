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
			material: Physics.Materials.tumbler,
		})
		this.transform = {
			position,
			rotation: tumbleDirection.clone(),
			scale: new Vector3(1, 1, 1).setScalar(TUMBLER_CUBE_SIZE),
		}
		this.additionalComponents = [
			new Orbit(Level.Origin),
			new ForceComponent(tumbleDirection.clone(), FORCE, SPEED_LIMIT),
		]
	}
}
