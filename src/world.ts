import { World } from 'uecs'
import ThreeObject3D from './components/com_object3d'
import { ThreeApp } from './three-app'
import { System } from './systems/system'
import Path from './components/com_path'
import { Level } from './level'
import { PathSystem } from './systems/sys_path'

export class ECSWorld {
	world = new World()
	threeApp: ThreeApp
	systems: System[] = []
	constructor(threeApp: ThreeApp) {
		this.threeApp = threeApp

		// Create systems
		this.systems.push(new PathSystem(this.world))

		// Create level
		const level = new Level(threeApp)

		// Add cube on path
		this.world.create(
			new ThreeObject3D(this.threeApp.cube),
			new Path(level.startingNode)
		)
	}
	update() {
		this.systems.forEach((system) => system.update())
	}
}
