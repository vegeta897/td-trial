import './style.css'
import { WEBGL } from 'three/examples/jsm/WebGL'
import { ThreeApp } from './three/three-app'
import { ECSWorld } from './world'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'

const TICKS_PER_SECOND = 60

const SIMULATION = {
	tickTime: 1000 / TICKS_PER_SECOND,
	smaa: true,
}

if (WEBGL.isWebGLAvailable()) {
	const app = new ThreeApp()
	const world = new ECSWorld(app)
	const stats = Stats()
	document.body.appendChild(stats.dom)

	const gui = new GUI({ width: 400 })
	const simFolder = gui.addFolder('Simulation')
	simFolder
		.add(SIMULATION, 'tickTime', 1, 300)
		.onChange((tickTime) => (SIMULATION.tickTime = tickTime))
	simFolder
		.add(SIMULATION, 'smaa')
		.onFinishChange((enabled) => (app.smaaPass.enabled = enabled))
	simFolder.open()

	let lastUpdate = performance.now()
	let lag = 0
	function update() {
		// Adapted from https://gist.github.com/godwhoa/e6225ae99853aac1f633
		requestAnimationFrame(update)
		const now = performance.now()
		let delta = now - lastUpdate
		if (delta > 1000) delta = SIMULATION.tickTime
		lag += delta
		while (lag >= SIMULATION.tickTime) {
			world.update()
			lag -= SIMULATION.tickTime
		}
		stats.begin()
		app.render(lag / SIMULATION.tickTime)
		stats.end()
		lastUpdate = performance.now()
	}
	update()
} else {
	const warning = WEBGL.getWebGLErrorMessage()
	document.body.appendChild(warning)
}
