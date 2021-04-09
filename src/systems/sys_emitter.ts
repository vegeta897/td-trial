import Emitter, { EmitterType } from '../components/com_emitter'
import { System } from './system'
import Transform3D from '../components/com_transform3d'
import { Group } from 'three'
import Game from '../game'
import { GameObjectTypes } from '../game'

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
						this.factory.createBullet(transform)
						break
				}
			}
		})
	}
}
