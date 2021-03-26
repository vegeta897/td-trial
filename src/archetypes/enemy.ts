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
	const enemy = createCube(ENEMY_SIZE)
	container.add(enemy)
	enemy.userData.entity = world.create(
		new Transform3D(location),
		new ThreeObject3D(enemy),
		new Path(level.startingNode),
		new Health(HEALTH),
		Tag.for(TagID.Enemy)
	)
}
