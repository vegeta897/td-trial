import { System } from './system'
import Emitter from '../components/com_emitter'
import { Level } from '../level'
import { Tag, World } from 'uecs'
import Transform3D from '../components/com_transform3d'
import { TagID } from '../world'
import { Group } from 'three'
import { createEnemy } from '../archetypes/enemy'

export default class SpawnerSystem extends System {
	view = this.world.view(Emitter, Transform3D, Tag.for(TagID.Spawner))
	enemyGroup: Group
	level: Level
	constructor(world: World, enemyGroup: Group, level: Level) {
		super(world)
		this.enemyGroup = enemyGroup
		this.level = level
	}
	update() {
		this.view.each((entity, spawner, transform) => {
			if (++spawner.tick === spawner.interval) {
				spawner.tick = 0
				createEnemy(
					this.enemyGroup,
					this.world,
					this.level,
					transform.position.clone()
				)
			}
		})
	}
}
