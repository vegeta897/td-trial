import { Object3D, Vector3 } from 'three'
import { World } from 'uecs'
import Path from '../components/com_path'
import { TagID } from '../world'
import { Level } from '../level'
import Health from '../components/com_health'
import { createGameObject } from './game-object'
import { createSprite } from '../three/objects'

export const ENEMY_SIZE = 1
const HEALTH = 35

export function createEnemy(
	container: Object3D,
	world: World,
	level: Level,
	position: Vector3
) {
	const healthBar = createSprite()
	healthBar.position.set(0, 0.8, 0)
	healthBar.scale.setComponent(1, 0.2)
	healthBar.material.color.setHex(0xffcd75)
	healthBar.visible = false
	createGameObject(container, world, {
		position,
		scale: new Vector3().setScalar(ENEMY_SIZE),
		materialParams: { color: 0xb13e53 },
		tagID: TagID.Enemy,
		additionalComponents: [
			new Path(level.startingNode),
			new Health(HEALTH, healthBar),
		],
		children: [healthBar],
	})
}
