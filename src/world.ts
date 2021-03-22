import { World } from 'uecs'
import ThreeObject3D from './components/com_object3d'
import { ThreeApp } from './three/three-app'
import { System } from './systems/system'
import { Level } from './level'
import { PathSystem } from './systems/sys_path'
import Spawner from './components/com_spawner'
import { createCube } from './three/cube'
import SpawnerSystem from './systems/sys_spawner'
import RenderSystem from './systems/sys_render'
import TransformSystem from './systems/sys_transform'

export class ECSWorld {
	world = new World()
	threeApp: ThreeApp
	systems: System[] = []
	constructor(threeApp: ThreeApp) {
		this.threeApp = threeApp

		// Create level
		const level = new Level(threeApp)

		// Create systems
		this.systems.push(new SpawnerSystem(this.world, threeApp, level))
		this.systems.push(new PathSystem(this.world))
		this.systems.push(new TransformSystem(this.world))
		threeApp.systems.push(new RenderSystem(this.world))

		const spawnerCube = createCube()
		threeApp.scene.add(spawnerCube)
		this.world.create(new ThreeObject3D(spawnerCube), new Spawner(60))
	}
	update() {
		this.systems.forEach((system) => system.update())
	}
}
