import Emitter, { EmitterType } from '../components/com_emitter'
import { System } from './system'
import Transform3D from '../components/com_transform3d'
import { Group } from 'three'
import Game, { GameObjectTypes } from '../game'
import Ammo from '../components/com_ammo'

export default class EmitterSystem extends System {
	view = this.world.view(Emitter, Transform3D)
	enemyGroup: Group
	constructor(game: Game) {
		super(game)
		this.enemyGroup = this.threeApp.groups.get(GameObjectTypes.Enemy)!
	}
	update() {
		this.view.each((entity, emitter, transform) => {
			if (!emitter.active) return
			if (++emitter.tick >= emitter.interval) {
				emitter.tick = 0
				switch (emitter.type) {
					case EmitterType.Spawner:
						this.factory.createEnemy(transform.position.clone())
						break
					case EmitterType.Turret:
						if (emitter.useAmmo) {
							const ammo = this.world.get(entity, Ammo)
							if (!ammo) throw 'Turret missing ammo component'
							if (ammo.current === 0) return
							ammo.current--
							ammo.sprite.scale.setComponent(0, ammo.current / ammo.max)
						}
						this.factory.createBullet(transform.position, emitter.direction)
						break
					case EmitterType.Loader:
						this.factory.createAmmo(
							transform.position.clone().add(emitter.origin),
							emitter.direction
						)
						break
				}
			}
		})
	}
}
