import { cloneTransform3D } from '../util'
import Velocity3D from '../components/com_velocity3d'
import { Euler, MathUtils, Quaternion, Vector3 } from 'three'
import { GameObjectTypes } from '../game'
import Transform3D from '../components/com_transform3d'
import Factory from './'

const BULLET_SPEED = 0.5
const BULLET_SCALE = 0.12
const BULLET_SPREAD = MathUtils.degToRad(5)

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
				new Vector3(0, 0, BULLET_SPEED).applyQuaternion(randomRotation)
			),
		],
	})
}

function randomizeAim(quaternion: Quaternion, maxAngle: number): Quaternion {
	return quaternion
		.clone()
		.multiply(
			new Quaternion().setFromEuler(
				new Euler(
					MathUtils.randFloat(-maxAngle, maxAngle),
					MathUtils.randFloat(-maxAngle, maxAngle),
					0,
					'YXZ'
				)
			)
		)
}
