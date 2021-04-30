import Velocity3D from '../components/com_velocity3d'
import { Euler, MathUtils, Quaternion, Vector3 } from 'three'
import Game from '../game'
import GameObject, { GameObjectTypes } from './game_object'
import { createMesh } from '../three/objects'

const BULLET_SCALE = 0.12

const bulletPrototype = createMesh({
	materialParams: {
		color: 0,
		emissive: 0xa7f070,
		emissiveIntensity: 1,
	},
})

export default class Bullet extends GameObject {
	constructor(turretPosition: Vector3, emitterDirection: Quaternion) {
		super(GameObjectTypes.Bullet, bulletPrototype.clone())
		const rotation = emitterDirection.clone()
		const randomRotation = randomizeAim(
			emitterDirection,
			MathUtils.degToRad(Game.TurretProperties.bulletSpread)
		)
		this.transform = {
			position: turretPosition.clone(),
			rotation: randomRotation,
			scale: new Vector3().setScalar(BULLET_SCALE),
		}
		this.additionalComponents = [
			new Velocity3D(
				new Vector3(0, 0, Game.TurretProperties.bulletSpeed).applyQuaternion(
					rotation
				)
			),
		]
	}
}

const AIM_EULER = new Euler()

function randomizeAim(quaternion: Quaternion, maxAngle: number): Quaternion {
	return quaternion
		.clone()
		.multiply(
			new Quaternion().setFromEuler(
				AIM_EULER.set(
					MathUtils.randFloat(-maxAngle, maxAngle),
					MathUtils.randFloat(-maxAngle, maxAngle),
					0,
					'YXZ'
				)
			)
		)
}
