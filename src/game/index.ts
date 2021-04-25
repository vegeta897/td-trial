import { ThreeApp } from '../three/three_app'
import ECS from './ecs'
import Stats from 'three/examples/jsm/libs/stats.module'
import { Level } from './level'
import { createDebugGUI } from './debug'
import GUI from './gui'
import Interaction from './interaction'
import { Physics } from './physics'
import { loadAssets } from '../three/assets'

// TODO: Change as many properties as possible to static, including in ThreeApp
// Like the Discord class in D-Bot-TS

export default class Game {
	threeApp = new ThreeApp()
	ecs = new ECS()
	world = this.ecs.world
	physics = new Physics(this)
	level = new Level(this)
	interaction = new Interaction(this)
	gui = new GUI(this)
	tick = 0
	static TickRate = 60
	static TickTime = 1000 / Game.TickRate
	static preloadTicks = 2000
	paused = false
	interpolate = true
	static TurretProperties = {
		fireRate: 12,
		targetDistance: 5,
		bulletSpeed: 0.5,
		bulletSpread: 5,
	}
	async init() {
		await loadAssets()
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
			const now = performance.now()
			if (!this.paused) {
				let delta = now - lastUpdate
				if (delta > 1000) delta = Game.TickTime
				lag += delta
				while (lag >= Game.TickTime) {
					this.ecs.update(++this.tick)
					lag -= Game.TickTime
				}
			}
			lastUpdate = now
			stats.begin()
			this.threeApp.render(this.tick, lag / Game.TickTime)
			stats.end()
		}
		while (this.tick < Game.preloadTicks) {
			this.ecs.update(++this.tick)
		}
		update()
	}
	update() {}
}

export enum GameObjectTypes {
	None,
	Turret,
	Bullet,
	AmmoLoader,
	Ammo,
	Tumbler,
	HQ,
	RiverSpawner,
}
