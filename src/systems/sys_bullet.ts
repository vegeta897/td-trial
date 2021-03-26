import { System } from './system'
import Transform3D from '../components/com_transform3d'
import { Tag, World } from 'uecs'
import { TagID } from '../world'
import Velocity3D from '../components/com_velocity3d'
import { Group, Raycaster } from 'three'
import Health from '../components/com_health'

const MAX_DISTANCE = 100

export default class BulletSystem extends System {
	view = this.world.view(Transform3D, Velocity3D, Tag.for(TagID.Bullet))
	enemyGroup: Group
	constructor(world: World, enemyGroup: Group) {
		super(world)
		this.enemyGroup = enemyGroup
	}
	update() {
		this.view.each((entity, transform, velocity) => {
			if (transform.position.length() > MAX_DISTANCE) this.world.destroy(entity)
			const raycaster = new Raycaster(
				transform.position,
				velocity.vector3.clone().normalize(),
				0,
				velocity.vector3.length()
			)
			const [hitEnemy] = raycaster.intersectObjects(this.enemyGroup.children)
			if (hitEnemy) {
				this.world.destroy(entity)
				const health = this.world.get(hitEnemy.object.userData.entity, Health)!
				health.current -= 1
				if (health.current <= 0) {
					this.world.destroy(hitEnemy.object.userData.entity)
				}
			}
		})
	}
}
