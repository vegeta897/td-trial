import { System } from './system'
import ThreeObject3D from '../components/com_object3d'
import Emitter from '../components/com_emitter'
import Path from '../components/com_path'
import { ThreeApp } from '../three/three-app'
import { Level } from '../level'
import { createCube } from '../three/cube'
import { Tag, World } from 'uecs'
import Transform3D from '../components/com_transform3d'
import { TagID } from '../world'

export default class SpawnerSystem extends System {
	view = this.world.view(Emitter, Transform3D, Tag.for(TagID.Spawner))
	threeApp: ThreeApp
	level: Level
	constructor(world: World, threeApp: ThreeApp, level: Level) {
		super(world)
		this.threeApp = threeApp
		this.level = level
	}
	update() {
		this.view.each((entity, spawner, transform) => {
			if (++spawner.tick === spawner.interval) {
				spawner.tick = 0
				const marcher = createCube()
				this.threeApp.scene.add(marcher)
				this.world.create(
					new Transform3D(transform.vector3.clone()),
					new ThreeObject3D(marcher),
					new Path(this.level.startingNode),
					Tag.for(TagID.Enemy)
				)
			}
		})
	}
}
