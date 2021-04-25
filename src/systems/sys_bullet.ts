import { System } from './system'
import Transform3D from '../components/com_transform3d'
import { Entity, Tag } from 'uecs'
import { GameObjectTypes } from '../game'
import Velocity3D from '../components/com_velocity3d'
import { Group, Raycaster } from 'three'
import { FLOOR_Y } from '../game/level'
import Game from '../game'
import { TUMBLER_CUBE_SIZE } from '../factory/tumbler'

const MAX_DISTANCE = 100
const MAX_DISTANCE_SQ = MAX_DISTANCE ** 2
const ENEMY_SIZE_SQ = (TUMBLER_CUBE_SIZE / 2) ** 2

export default class BulletSystem extends System {
	view = this.world.view(
		Transform3D,
		Velocity3D,
		Tag.for(GameObjectTypes.Bullet)
	)
	enemies = this.world.view(Transform3D, Tag.for(GameObjectTypes.Tumbler))
	tumblerGroup: Group
	raycaster = new Raycaster()
	constructor(game: Game) {
		super(game)
		this.tumblerGroup = this.threeApp.groups.get(GameObjectTypes.Tumbler)!
	}
	update(tick: number) {
		this.view.each((entity, transform, velocity) => {
			const velocityLength = velocity.vector3.length()
			if (
				velocityLength < 0.05 ||
				transform.position.lengthSq() > MAX_DISTANCE_SQ ||
				transform.position.y <= FLOOR_Y
			) {
				this.world.destroy(entity)
				return
			}
			this.enemies.each((enemy, { position: enemyPos }) => {
				if (transform.position.distanceToSquared(enemyPos) <= ENEMY_SIZE_SQ) {
					this.hitEnemy(entity, enemy)
					return false
				}
			})
			if (!this.world.exists(entity)) return
			this.raycaster.set(
				transform.position,
				velocity.vector3.clone().normalize()
			)
			this.raycaster.far = velocityLength
			const [hitEnemy] = this.raycaster.intersectObjects(
				this.tumblerGroup.children
			)
			if (hitEnemy) this.hitEnemy(entity, hitEnemy.object.userData.entity)
			if (!this.world.exists(entity)) return
			transform.scale.z = velocityLength / Game.TurretProperties.bulletSpeed
			velocity.vector3.multiplyScalar(0.95)
			transform.scale.multiplyScalar(0.98)
			transform.lastUpdated = tick
		})
	}
	hitEnemy(bullet: Entity, enemy: Entity) {
		this.world.destroy(bullet)
		// const health = this.world.get(enemy, Health)!
		// health.current -= 1
		// health.sprite.visible = true
		// health.sprite.scale.setComponent(0, health.current / health.max)
		// if (health.current <= 0) {
		// 	this.world.destroy(enemy)
		// }
	}
}
