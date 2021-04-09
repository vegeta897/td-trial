import { ThreeApp } from '../three/three-app'
import ECS from './ecs'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import { Level } from './level'
import Factory from '../factory'
import { Raycaster } from 'three'
import Emitter from '../components/com_emitter'
import { Tag } from 'uecs'
import Target from '../components/com_target'

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
		// Create GUI
		const gui = new GUI({ width: 360 })
		const simFolder = gui.addFolder('Simulation')
		simFolder
			.add(this, 'tickTime', 1, 300)
			.onChange((tickTime) => (this.tickTime = tickTime))
		simFolder.add(this, 'interpolate')
		simFolder.add(this, 'paused')
		simFolder
			.add(this.threeApp, 'smaa')
			.onFinishChange((enabled) => (this.threeApp.smaaPass.enabled = enabled))
		simFolder.open()
		const turretFolder = gui.addFolder('Turrets')
		turretFolder
			.add(this.turretProperties, 'fireRate', 1, 60)
			.onChange((shootInterval) => {
				this.turretProperties.fireRate = Math.round(shootInterval)
				this.world
					.view(Emitter, Tag.for(GameObjectTypes.Turret))
					.each((e, emitter) => {
						emitter.interval = Math.round(
							this.tickRate / this.turretProperties.fireRate
						)
					})
			})
		turretFolder
			.add(this.turretProperties, 'targetDistance', 0, 30)
			.onChange((targetDistance) => {
				this.world
					.view(Target, Tag.for(GameObjectTypes.Turret))
					.each((e, target) => {
						target.maxDistance = targetDistance
					})
			})
		turretFolder.add(this.turretProperties, 'bulletSpeed', 0.1, 1.2)
		turretFolder.add(this.turretProperties, 'bulletSpread', 0, 60)
		turretFolder.open()

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
			const intersect = raycaster
				.intersectObjects(this.threeApp.scene.children)
				.find((i) => i.object === this.level.ground)
			if (!intersect) return
			this.factory.createTurret(intersect.point.setComponent(1, 0))
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
