import { World } from 'uecs'
import Emitter, { EmitterType } from '../components/com_emitter'
import { System } from './system'
import { ThreeApp } from '../three/three-app'
import { Level } from '../level'
import Transform3D from '../components/com_transform3d'
import { createBullet } from '../archetypes/bullet'
import { createEnemy } from '../archetypes/enemy'
import { Group } from 'three'

export default class EmitterSystem extends System {
	view = this.world.view(Emitter, Transform3D)
	threeApp: ThreeApp
	enemyGroup: Group
	level: Level
	constructor(
		world: World,
		threeApp: ThreeApp,
		enemyGroup: Group,
		level: Level
	) {
		super(world)
		this.threeApp = threeApp
		this.enemyGroup = enemyGroup
		this.level = level
	}
	update() {
		this.view.each((entity, emitter, transform) => {
			if (++emitter.tick === emitter.interval) {
				emitter.tick = 0
				switch (emitter.type) {
					case EmitterType.Spawner:
						createEnemy(
							this.enemyGroup,
							this.world,
							this.level,
							transform.position.clone()
						)
						break
					case EmitterType.Turret:
						createBullet(this.threeApp.scene, this.world, transform)
						break
				}
			}
		})
	}
}
