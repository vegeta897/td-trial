import { createCube } from '../three/cube'
import { cloneTransform3D } from '../util'
import ThreeObject3D from '../components/com_object3d'
import Velocity3D from '../components/com_velocity3d'
import { Object3D, Vector3 } from 'three'
import { Tag, World } from 'uecs'
import { TagID } from '../world'
import Transform3D from '../components/com_transform3d'

const BULLET_SPEED = 0.3

export function createBullet(
	container: Object3D,
	world: World,
	transform: Transform3D
) {
	const bullet = createCube(0.15)
	container.add(bullet)
	world.create(
		cloneTransform3D(transform),
		new ThreeObject3D(bullet),
		new Velocity3D(
			new Vector3(0, 0, -BULLET_SPEED).applyEuler(transform.rotation)
		),
		Tag.for(TagID.Bullet)
	)
}
