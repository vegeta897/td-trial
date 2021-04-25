import Emitter, { EmitterType } from '../components/com_emitter'
import { System } from './system'
import Transform3D from '../components/com_transform3d'
import { Vector3 } from 'three'
import Tumbler from '../factory/tumbler'
import Ammo from '../factory/ammo'
import AmmoComponent from '../components/com_ammo'
import Bullet from '../factory/bullet'

export default class EmitterSystem extends System {
	view = this.world.view(Emitter, Transform3D)
	update() {
		this.view.each((entity, emitter, transform) => {
			if (!emitter.active) return
			if (++emitter.tick >= emitter.interval) {
				emitter.tick = 0
				switch (emitter.type) {
					case EmitterType.Turret:
						if (emitter.useAmmo) {
							const ammo = this.world.get(entity, AmmoComponent)
							if (!ammo) throw 'Turret missing ammo component'
							if (ammo.current === 0) return
							ammo.current--
							ammo.sprite.scale.setComponent(0, ammo.current / ammo.max)
						}
						new Bullet(transform.position, emitter.direction).addToGame(
							this.game
						)
						break
					case EmitterType.Loader:
						new Ammo(
							transform.position.clone().add(emitter.origin),
							emitter.direction
						).addToGame(this.game)
						break
					case EmitterType.RiverSpawner:
						new Tumbler(
							emitter.spawnArea.at(Math.random(), new Vector3()),
							emitter.direction
						).addToGame(this.game)
						break
				}
			}
		})
	}
}
