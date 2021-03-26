import { createCube } from '../three/cube'
import { cloneTransform3D } from '../util'
import ThreeObject3D from '../components/com_object3d'
import Velocity3D from '../components/com_velocity3d'
import { Euler, Object3D, Vector3 } from 'three'
import { Tag, World } from 'uecs'
import { TagID } from '../world'
import Transform3D from '../components/com_transform3d'

const BULLET_SPEED = 0.5

export function createBullet(
	container: Object3D,
	world: World,
	turretTransform: Transform3D
) {
	const bullet = createCube()
	container.add(bullet)
	const transform = cloneTransform3D(turretTransform)
	transform.scale = 0.15
	world.create(
		transform,
		new ThreeObject3D(bullet),
		new Velocity3D(
			new Vector3(0, 0, -BULLET_SPEED).applyEuler(
				randomizeEuler(transform.rotation, 0.1)
			)
		),
		Tag.for(TagID.Bullet)
	)
}

function randomizeEuler(euler: Euler, maxAngle: number): Euler {
	return new Euler(
		euler.x + Math.random() * maxAngle * 2 - maxAngle,
		euler.y + Math.random() * maxAngle * 2 - maxAngle,
		euler.z + Math.random() * maxAngle * 2 - maxAngle
	)
}
