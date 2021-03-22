import { System } from './system'
import ThreeObject3D from '../components/com_object3d'
import Spawner from '../components/com_spawner'
import Path from '../components/com_path'
import { ThreeApp } from '../three/three-app'
import { Level } from '../level'
import { createCube } from '../three/cube'
import { World } from 'uecs'
import Transform3D from '../components/com_transform3d'

export default class SpawnerSystem extends System {
	view = this.world.view(ThreeObject3D, Spawner)
	threeApp: ThreeApp
	level: Level
	constructor(world: World, threeApp: ThreeApp, level: Level) {
		super(world)
		this.threeApp = threeApp
		this.level = level
	}
	update() {
		this.view.each((entity, obj3d, spawner) => {
			if (++spawner.tick === spawner.interval) {
				spawner.tick = 0
				const marcher = createCube()
				this.threeApp.scene.add(marcher)
				this.world.create(
					new Transform3D(),
					new ThreeObject3D(marcher),
					new Path(this.level.startingNode)
				)
			}
		})
	}
}
