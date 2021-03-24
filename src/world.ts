import { Tag, World } from 'uecs'
import ThreeObject3D from './components/com_object3d'
import { ThreeApp } from './three/three-app'
import { System } from './systems/system'
import { Level } from './level'
import { PathSystem } from './systems/sys_path'
import Emitter from './components/com_emitter'
import { createCube } from './three/cube'
import SpawnerSystem from './systems/sys_spawner'
import RenderSystem from './systems/sys_render'
import TransformSystem from './systems/sys_transform'
import TurretSystem from './systems/sys_turret'
import Transform3D from './components/com_transform3d'
import { Vector3 } from 'three'
import BulletSystem from './systems/sys_bullet'

export enum TagID {
	Turret = 'turret',
	Spawner = 'spawner',
	Bullet = 'bullet',
}

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
		this.systems.push(new TurretSystem(this.world, threeApp, level))
		this.systems.push(new TransformSystem(this.world))
		this.systems.push(new BulletSystem(this.world))
		threeApp.systems.push(new RenderSystem(this.world))

		// Create spawner
		const spawnerCube = createCube()
		threeApp.scene.add(spawnerCube)
		this.world.create(
			Tag.for(TagID.Spawner),
			new ThreeObject3D(spawnerCube),
			new Transform3D(new Vector3()),
			new Emitter(60)
		)

		// Create turret
		const turretCube = createCube()
		threeApp.scene.add(turretCube)
		this.world.create(
			Tag.for(TagID.Turret),
			new ThreeObject3D(turretCube),
			new Transform3D(new Vector3(0, 0, 10)),
			new Emitter(20)
		)
	}
	update() {
		this.systems.forEach((system) => system.update())
	}
}
