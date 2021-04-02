import { cloneTransform3D } from '../util'
import Velocity3D from '../components/com_velocity3d'
import { Euler, Vector3 } from 'three'
import { GameObjectTypes } from '../game'
import Transform3D from '../components/com_transform3d'
import Factory from './'

const BULLET_SPEED = 0.5
const BULLET_SCALE = 0.12
const BULLET_SPREAD = 0.1

export function createBullet(this: Factory, turretTransform: Transform3D) {
	const { position, rotation } = cloneTransform3D(turretTransform)
	const randomRotation = randomizeAim(rotation, BULLET_SPREAD)
	this.createGameObject({
		position,
		rotation: randomRotation,
		scale: new Vector3().setScalar(BULLET_SCALE),
		materialParams: {
			color: 0,
			emissive: 0xa7f070,
			emissiveIntensity: 1,
		},
		gameObjectType: GameObjectTypes.Bullet,
		additionalComponents: [
			new Velocity3D(
				new Vector3(0, 0, -BULLET_SPEED).applyEuler(randomRotation)
			),
		],
	})
}

function randomizeAim(euler: Euler, maxAngle: number): Euler {
	return new Euler(
		euler.x + Math.random() * maxAngle * 2 - maxAngle,
		euler.y + Math.random() * maxAngle * 2 - maxAngle,
		euler.z
	)
}
