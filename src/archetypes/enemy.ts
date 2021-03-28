import { Object3D, Vector3 } from 'three'
import { World } from 'uecs'
import Path from '../components/com_path'
import { TagID } from '../world'
import { Level } from '../level'
import Health from '../components/com_health'
import { createGameObject } from './game-object'

export const ENEMY_SIZE = 1
const HEALTH = 35

export function createEnemy(
	container: Object3D,
	world: World,
	level: Level,
	position: Vector3
) {
	createGameObject(container, world, {
		position,
		scale: ENEMY_SIZE,
		materialParams: { color: 0xb13e53 },
		tagID: TagID.Enemy,
		additionalComponents: [new Path(level.startingNode), new Health(HEALTH)],
	})
}
