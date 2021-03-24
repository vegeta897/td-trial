import { System } from './system'
import Transform3D from '../components/com_transform3d'
import { Tag, World } from 'uecs'
import { TagID } from '../world'
import Velocity3D from '../components/com_velocity3d'
import { Group, Raycaster } from 'three'

const MAX_DISTANCE = 100

export default class BulletSystem extends System {
	view = this.world.view(Transform3D, Velocity3D, Tag.for(TagID.Bullet))
	enemies = this.world.view(Transform3D, Tag.for(TagID.Enemy))
	enemyGroup: Group
	constructor(world: World, enemyGroup: Group) {
		super(world)
		this.enemyGroup = enemyGroup
	}
	update() {
		this.view.each((entity, transform, velocity) => {
			if (transform.vector3.length() > MAX_DISTANCE) this.world.destroy(entity)
			const raycaster = new Raycaster(
				transform.vector3,
				velocity.vector3.clone().normalize(),
				0,
				velocity.vector3.length()
			)
			const [hitEnemy] = raycaster.intersectObjects(this.enemyGroup.children)
			if (hitEnemy) {
				this.world.destroy(entity)
				this.world.destroy(hitEnemy.object.userData.entity)
			}
		})
	}
}
