import { SpriteMaterial, Vector3 } from 'three'
import Path from '../components/com_path'
import { GameObjectTypes } from '../game'
import Health from '../components/com_health'
import { createMesh, createSprite } from '../three/objects'
import Factory from './'
import { Body, Box, Vec3 } from 'cannon-es'

export const ENEMY_SIZE = 1
const HEALTH = 100

const healthSpriteMaterial = new SpriteMaterial({ color: 0xffcd75 })

const enemyPrototype = createMesh({
	materialParams: { color: 0xb13e53 },
	meshProperties: { castShadow: true },
})

export function createEnemy(this: Factory, position: Vector3) {
	const healthBar = createSprite()
	healthBar.position.set(0, 0.8, 0)
	healthBar.scale.setComponent(1, 0.2)
	healthBar.material = healthSpriteMaterial
	healthBar.visible = false
	const body = new Body({
		type: Body.KINEMATIC,
		shape: new Box(new Vec3(1 / 2, 1 / 2, 1 / 2)),
		position: new Vec3(position.x, position.y, position.z),
	})
	this.createGameObject({
		container: this.game.threeApp.groups.get(GameObjectTypes.Enemy),
		transform: { position, scale: new Vector3().setScalar(ENEMY_SIZE) },
		object3D: enemyPrototype.clone(),
		body,
		gameObjectType: GameObjectTypes.Enemy,
		additionalComponents: [
			new Path(this.game.level.startingNode),
			new Health(HEALTH, healthBar),
		],
		children: [healthBar],
	})
}
