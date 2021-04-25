import Velocity3D from '../components/com_velocity3d'
import { Euler, MathUtils, Quaternion, Vector3 } from 'three'
import Game, { GameObjectTypes } from '../game'
import GameObject from './game_object'
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
		super(GameObjectTypes.Bullet)
		const rotation = emitterDirection.clone()
		this.object3D = bulletPrototype.clone()
		const randomRotation = randomizeAim(
			emitterDirection,
			MathUtils.degToRad(Game.turretProperties.bulletSpread)
		)
		this.transform = {
			position: turretPosition.clone(),
			rotation: randomRotation,
			scale: new Vector3().setScalar(BULLET_SCALE),
		}
		this.additionalComponents = [
			new Velocity3D(
				new Vector3(0, 0, Game.turretProperties.bulletSpeed).applyQuaternion(
					rotation
				)
			),
		]
	}
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
