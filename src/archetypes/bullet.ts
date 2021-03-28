import { cloneTransform3D } from '../util'
import Velocity3D from '../components/com_velocity3d'
import { Euler, Object3D, Vector3 } from 'three'
import { World } from 'uecs'
import { TagID } from '../world'
import Transform3D from '../components/com_transform3d'
import { createGameObject } from './game-object'

const BULLET_SPEED = 0.5
const BULLET_SCALE = 0.15
const BULLET_SPREAD = 0.1

export function createBullet(
	container: Object3D,
	world: World,
	turretTransform: Transform3D
) {
	const transform = cloneTransform3D(turretTransform)
	createGameObject(container, world, {
		position: transform.position,
		rotation: transform.rotation,
		scale: BULLET_SCALE,
		materialParams: {
			color: 0,
			emissive: 0xa7f070,
			emissiveIntensity: 1,
		},
		tagID: TagID.Bullet,
		additionalComponents: [
			new Velocity3D(
				new Vector3(0, 0, -BULLET_SPEED).applyEuler(
					randomizeEuler(transform.rotation, BULLET_SPREAD)
				)
			),
		],
	})
}

function randomizeEuler(euler: Euler, maxAngle: number): Euler {
	return new Euler(
		euler.x + Math.random() * maxAngle * 2 - maxAngle,
		euler.y + Math.random() * maxAngle * 2 - maxAngle,
		euler.z + Math.random() * maxAngle * 2 - maxAngle
	)
}
