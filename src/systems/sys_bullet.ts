import { System } from './system'
import Transform3D from '../components/com_transform3d'
import { Tag } from 'uecs'
import { TagID } from '../world'

const MAX_DISTANCE = 100
const HIT_DISTANCE_SQUARED = 0.5 ** 2

export default class BulletSystem extends System {
	view = this.world.view(Transform3D, Tag.for(TagID.Bullet))
	enemies = this.world.view(Transform3D, Tag.for(TagID.Enemy))
	update() {
		this.view.each((entity, transform) => {
			if (transform.vector3.length() > MAX_DISTANCE) this.world.destroy(entity)
			this.enemies.each((enemy, enemyTransform) => {
				if (
					transform.vector3.distanceToSquared(enemyTransform.vector3) <=
					HIT_DISTANCE_SQUARED
				) {
					this.world.destroy(entity)
					this.world.destroy(enemy)
					return false
				}
			})
		})
	}
}
