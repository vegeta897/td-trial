import Velocity3D from '../components/com_velocity3d'
import { Euler, MathUtils, Quaternion, Vector3 } from 'three'
import { GameObjectTypes } from '../game'
import Factory from './'
import { createMesh } from '../three/objects'

const BULLET_SCALE = 0.12

export function createBulletPrototype(factory: Factory) {
	factory.prototypes.set(
		GameObjectTypes.Bullet,
		createMesh({
			materialParams: {
				color: 0,
				emissive: 0xa7f070,
				emissiveIntensity: 1,
			},
		})
	)
}

export function createBullet(
	this: Factory,
	turretPosition: Vector3,
	emitterDirection: Quaternion
) {
	const randomRotation = randomizeAim(
		emitterDirection,
		MathUtils.degToRad(this.game.turretProperties.bulletSpread)
	)
	this.createGameObject({
		transform: {
			position: turretPosition.clone(),
			rotation: randomRotation,
			scale: new Vector3().setScalar(BULLET_SCALE),
		},
		gameObjectType: GameObjectTypes.Bullet,
		additionalComponents: [
			new Velocity3D(
				new Vector3(
					0,
					0,
					this.game.turretProperties.bulletSpeed
				).applyQuaternion(randomRotation)
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
