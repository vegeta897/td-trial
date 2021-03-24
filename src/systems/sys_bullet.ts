import { System } from './system'
import Transform3D from '../components/com_transform3d'
import { Tag } from 'uecs'
import { TagID } from '../world'

const MAX_DISTANCE = 100

export default class BulletSystem extends System {
	view = this.world.view(Transform3D, Tag.for(TagID.Bullet))
	update() {
		this.view.each((entity, transform) => {
			if (transform.vector3.length() > MAX_DISTANCE) this.world.destroy(entity)
		})
	}
}
