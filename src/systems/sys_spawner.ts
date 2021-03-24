import { System } from './system'
import ThreeObject3D from '../components/com_object3d'
import Emitter from '../components/com_emitter'
import Path from '../components/com_path'
import { Level } from '../level'
import { createCube } from '../three/cube'
import { Tag, World } from 'uecs'
import Transform3D from '../components/com_transform3d'
import { TagID } from '../world'
import { Group } from 'three'

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
				const marcher = createCube()
				this.enemyGroup.add(marcher)
				marcher.userData.entity = this.world.create(
					new Transform3D(transform.vector3.clone()),
					new ThreeObject3D(marcher),
					new Path(this.level.startingNode),
					Tag.for(TagID.Enemy)
				)
			}
		})
	}
}
