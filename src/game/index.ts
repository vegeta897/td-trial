import { ThreeApp } from '../three/three-app'
import ECS from './ecs'
import Stats from 'three/examples/jsm/libs/stats.module'
import { Level } from './level'
import Factory from '../factory'
import { createDebugGUI } from './debug'
import GUI from './gui'
import Interaction from './interaction'

export default class Game {
	threeApp = new ThreeApp()
	ecs = new ECS()
	world = this.ecs.world
	factory = new Factory(this)
	level = new Level(this)
	interaction = new Interaction(this)
	gui = new GUI(this)
	tickRate = 60
	tickTime = 1000 / this.tickRate
	paused = false
	interpolate = true
	turretProperties = {
		fireRate: 12,
		targetDistance: 5,
		bulletSpeed: 0.5,
		bulletSpread: 5,
	}
	async init() {
		await this.threeApp.loadAssets()
		this.level.create()

		this.ecs.registerSystems(this)

		createDebugGUI(this)
		const stats = Stats()
		document.body.appendChild(stats.dom)

		// Main loop
		let lag = 0
		let lastUpdate = performance.now()
		const update = () => {
			// Adapted from https://gist.github.com/godwhoa/e6225ae99853aac1f633
			requestAnimationFrame(update)
			if (!this.paused) {
				const now = performance.now()
				let delta = now - lastUpdate
				if (delta > 1000) delta = this.tickTime
				lag += delta
				while (lag >= this.tickTime) {
					stats.begin()
					this.ecs.update()
					stats.end()
					lag -= this.tickTime
				}
			}
			lastUpdate = performance.now()
			this.threeApp.render(lag / this.tickTime)
		}
		update()
	}
}

export enum GameObjectTypes {
	Turret,
	Spawner,
	Bullet,
	Enemy,
}
