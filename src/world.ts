import { World } from 'uecs'
import ThreeObject3D from './components/com_object3d'
import { ThreeApp } from './three-app'
import { rotate } from './systems/sys_rotate'

export class ECSWorld {
	world = new World()
	threeApp: ThreeApp
	constructor(threeApp: ThreeApp) {
		this.threeApp = threeApp
		// Create ThreeObject3D components for all objects in scene
		this.threeApp.scene.children.forEach((obj3d) =>
			this.world.create(new ThreeObject3D(obj3d))
		)
	}
	update() {
		rotate(this.world)
	}
}
