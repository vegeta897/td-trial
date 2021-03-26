import { World } from 'uecs'
import { ThreeApp } from './three/three-app'
import { System } from './systems/system'
import { Level } from './level'
import { PathSystem } from './systems/sys_path'
import SpawnerSystem from './systems/sys_spawner'
import RenderSystem from './systems/sys_render'
import TransformSystem from './systems/sys_transform'
import TurretSystem from './systems/sys_turret'
import { Euler, Group, Vector3 } from 'three'
import BulletSystem from './systems/sys_bullet'
import { createTurret } from './archetypes/turret'
import { createSpawner } from './archetypes/spawner'

export enum TagID {
	Turret,
	Spawner,
	Bullet,
	Enemy,
}

export class ECSWorld {
	world = new World()
	threeApp: ThreeApp
	systems: System[] = []
	constructor(threeApp: ThreeApp) {
		this.threeApp = threeApp

		// Group enemy meshes for bullet raycasting
		const enemyGroup = new Group()
		this.threeApp.scene.add(enemyGroup)

		// Create level
		const level = new Level(threeApp)

		// Create systems
		this.systems.push(new SpawnerSystem(this.world, enemyGroup, level))
		this.systems.push(new PathSystem(this.world))
		this.systems.push(new TurretSystem(this.world, threeApp, level))
		this.systems.push(new BulletSystem(this.world, enemyGroup))
		this.systems.push(new TransformSystem(this.world))
		threeApp.systems.push(new RenderSystem(this.world))

		// Create entities
		createSpawner(threeApp.scene, this.world)
		createTurret(
			threeApp.scene,
			this.world,
			new Vector3(2, 0, 10),
			new Euler(0, 0.6)
		)
		createTurret(threeApp.scene, this.world, new Vector3(0, 0, 10))
	}
	update() {
		this.systems.forEach((system) => system.update())
	}
}
