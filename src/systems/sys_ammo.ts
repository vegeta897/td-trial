import { System } from './system'
import Transform3D from '../components/com_transform3d'
import { GameObjectTypes } from '../game'
import { Tag } from 'uecs'
import { FLOOR_Y } from '../game/level'
import Ammo from '../components/com_ammo'

const MAX_DISTANCE = 100
const MAX_DISTANCE_SQ = MAX_DISTANCE ** 2
const TURRET_SIZE_SQ = (1 / 2) ** 2

const AMMO_AMOUNT = 5

export default class AmmoSystem extends System {
	view = this.world.view(Transform3D, Tag.for(GameObjectTypes.Ammo))
	turrets = this.world.view(Transform3D, Tag.for(GameObjectTypes.Turret))
	update() {
		this.view.each((entity, transform) => {
			if (
				transform.position.lengthSq() > MAX_DISTANCE_SQ ||
				transform.position.y <= FLOOR_Y
			) {
				this.world.destroy(entity)
				return
			}
			this.turrets.each((turret, { position: turretPos }) => {
				if (transform.position.distanceToSquared(turretPos) <= TURRET_SIZE_SQ) {
					this.world.destroy(entity)
					const ammo = this.world.get(turret, Ammo)!
					ammo.current = Math.min(ammo.max, ammo.current + AMMO_AMOUNT)
					ammo.sprite.scale.setComponent(0, ammo.current / ammo.max)
					return false
				}
			})
		})
	}
}
