import { System } from './system'
import Transform3D from '../components/com_transform3d'
import { Entity, Tag, World } from 'uecs'
import { TagID } from '../world'
import Velocity3D from '../components/com_velocity3d'
import { Group, Raycaster } from 'three'
import Health from '../components/com_health'
import { ENEMY_SIZE } from '../archetypes/enemy'
import { FLOOR_Y } from '../level'

const MAX_DISTANCE = 100

export default class BulletSystem extends System {
	view = this.world.view(Transform3D, Velocity3D, Tag.for(TagID.Bullet))
	enemies = this.world.view(Transform3D, Velocity3D, Tag.for(TagID.Enemy))
	enemyGroup: Group
	constructor(world: World, enemyGroup: Group) {
		super(world)
		this.enemyGroup = enemyGroup
	}
	update() {
		this.view.each((entity, transform, velocity) => {
			if (
				transform.position.length() > MAX_DISTANCE ||
				transform.position.y <= FLOOR_Y - transform.scale.getComponent(0) / 2 ||
				velocity.vector3.length() < 0.05
			) {
				this.world.destroy(entity)
				return
			}
			velocity.vector3.multiplyScalar(0.95)
			transform.scale.multiplyScalar(0.98)
			transform.scale.z = velocity.vector3.length()
			this.enemies.each((enemy, enemyTransform, enemyVelocity) => {
				if (
					transform.position.distanceTo(enemyTransform.position) <=
					ENEMY_SIZE / 2
				) {
					this.hitEnemy(entity, enemy)
					return false
				}
			})
			if (!this.world.exists(entity)) return
			const raycaster = new Raycaster(
				transform.position,
				velocity.vector3.clone().normalize(),
				0,
				velocity.vector3.length()
			)
			const [hitEnemy] = raycaster.intersectObjects(this.enemyGroup.children)
			if (hitEnemy) this.hitEnemy(entity, hitEnemy.object.userData.entity)
		})
	}
	hitEnemy(bullet: Entity, enemy: Entity) {
		this.world.destroy(bullet)
		const health = this.world.get(enemy, Health)!
		health.current -= 1
		health.sprite.visible = true
		health.sprite.scale.setComponent(0, health.current / health.max)
		if (health.current <= 0) {
			this.world.destroy(enemy)
		}
	}
}
