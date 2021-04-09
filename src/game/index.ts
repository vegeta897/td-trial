import { ThreeApp } from '../three/three-app'
import ECS from './ecs'
import Stats from 'three/examples/jsm/libs/stats.module'
import { Level } from './level'
import Factory from '../factory'
import { Raycaster } from 'three'
import { createDebugGUI } from './debug'

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
	constructor() {
		createDebugGUI(this)
		const stats = Stats()
		document.body.appendChild(stats.dom)

		this.ecs.registerSystems(this)

		// Handle mouse clicks
		const raycaster = new Raycaster()
		this.threeApp.renderer.domElement.addEventListener('mousedown', (event) => {
			if (event.button !== 0) return
			const mouse = {
				x: (event.clientX / window.innerWidth) * 2 - 1,
				y: -(event.clientY / window.innerHeight) * 2 + 1,
			}
			raycaster.setFromCamera(mouse, this.threeApp.camera)
			const groundClick = raycaster
				.intersectObjects(this.threeApp.scene.children)
				.find((i) => i.object === this.level.ground)
			if (!groundClick) return
			this.factory.createTurret(groundClick.point.setComponent(1, 0))
		})

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
					this.ecs.update()
					lag -= this.tickTime
				}
			}
			stats.begin()
			this.threeApp.render(lag / this.tickTime)
			stats.end()
			lastUpdate = performance.now()
		}
		update()
	}
}
