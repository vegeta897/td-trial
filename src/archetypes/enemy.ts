import { Object3D, Vector3 } from 'three'
import { Tag, World } from 'uecs'
import { createCube } from '../three/cube'
import Transform3D from '../components/com_transform3d'
import ThreeObject3D from '../components/com_object3d'
import Path from '../components/com_path'
import { TagID } from '../world'
import { Level } from '../level'
import Health from '../components/com_health'

export const ENEMY_SIZE = 1
const HEALTH = 35

export function createEnemy(
	container: Object3D,
	world: World,
	level: Level,
	location: Vector3
) {
	const enemy = createCube({ color: 0xb13e53, reflectivity: 1 })
	container.add(enemy)
	enemy.userData.entity = world.create(
		new Transform3D(location, undefined, ENEMY_SIZE),
		new ThreeObject3D(enemy),
		new Path(level.startingNode),
		new Health(HEALTH),
		Tag.for(TagID.Enemy)
	)
}
