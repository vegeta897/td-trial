import { createMesh } from '../three/objects'
import Factory from './index'
import { BoxGeometry, Quaternion, Vector3 } from 'three'
import * as CANNON from 'cannon-es'
import { GameObjectTypes } from '../game'
import ForceComponent from '../components/com_force'

const CUBE_SIZE = 0.5
const MASS = CUBE_SIZE ** 3
const FORCE = 5
const SPEED_LIMIT = 2

const tumblerPrototype = createMesh({
	materialParams: { color: 0x73eff7 },
	meshProperties: { castShadow: true },
	geometry: new BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE),
})

export function createTumbler(
	this: Factory,
	position: Vector3,
	tumbleDirection: Quaternion
) {
	const body = new CANNON.Body({
		mass: MASS,
		shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1).scale(CUBE_SIZE / 2)),
		position: new CANNON.Vec3(position.x, position.y, position.z),
		quaternion: <CANNON.Quaternion>(<unknown>tumbleDirection.clone()),
	})
	this.createGameObject({
		transform: { position, rotation: tumbleDirection.clone() },
		gameObjectType: GameObjectTypes.Tumbler,
		object3D: tumblerPrototype.clone(),
		body,
		additionalComponents: [
			new ForceComponent(
				new Vector3(FORCE).applyQuaternion(tumbleDirection),
				SPEED_LIMIT
			),
		],
	})
}
