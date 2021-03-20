import { World } from 'uecs'
import ThreeObject3D from './components/com_object3d'
import { ThreeApp } from './three-app'
import { RotateSystem } from './systems/sys_rotate'
import { System } from './systems/system'

export class ECSWorld {
	world = new World()
	threeApp: ThreeApp
	systems: System[] = []
	constructor(threeApp: ThreeApp) {
		this.threeApp = threeApp

		// Create systems
		this.systems.push(new RotateSystem(this.world))

		// Create ThreeObject3D components for all objects in scene
		this.threeApp.scene.children.forEach((obj3d) =>
			this.world.create(new ThreeObject3D(obj3d))
		)
	}
	update() {
		this.systems.forEach((system) => system.update())
	}
}
