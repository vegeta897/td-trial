import { ThreeApp } from './three/three-app'
import ECS from './ecs'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import { Level } from './level'
import Factory from './archetypes/factory'

const TICKS_PER_SECOND = 60

const SIMULATION = {
	tickTime: 1000 / TICKS_PER_SECOND,
	smaa: true,
}

export enum GameObjectTypes {
	Turret,
	Spawner,
	Bullet,
	Enemy,
}

export default class Game {
	threeApp = new ThreeApp()
	ecs = new ECS()
	world = this.ecs.world
	factory = new Factory(this)
	level = new Level(this)
	lastUpdate = performance.now()
	lag = 0
	stats = Stats()
	constructor() {
		document.body.appendChild(this.stats.dom)

		const gui = new GUI({ width: 400 })
		const simFolder = gui.addFolder('Simulation')
		simFolder
			.add(SIMULATION, 'tickTime', 1, 300)
			.onChange((tickTime) => (SIMULATION.tickTime = tickTime))
		simFolder
			.add(SIMULATION, 'smaa')
			.onFinishChange((enabled) => (this.threeApp.smaaPass.enabled = enabled))
		simFolder.open()

		this.ecs.registerSystems(this)

		this.update()
	}
	update() {
		// Adapted from https://gist.github.com/godwhoa/e6225ae99853aac1f633
		requestAnimationFrame(() => this.update())
		const now = performance.now()
		let delta = now - this.lastUpdate
		if (delta > 1000) delta = SIMULATION.tickTime
		this.lag += delta
		while (this.lag >= SIMULATION.tickTime) {
			this.ecs.update()
			this.lag -= SIMULATION.tickTime
		}
		this.stats.begin()
		this.threeApp.render(this.lag / SIMULATION.tickTime)
		this.stats.end()
		this.lastUpdate = performance.now()
	}
}
