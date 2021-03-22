import './style.css'
import { WEBGL } from 'three/examples/jsm/WebGL'
import { ThreeApp } from './three/three-app'
import { ECSWorld } from './world'
import Stats from 'three/examples/jsm/libs/stats.module'

const TICKS_PER_SECOND = 60
const TICK_TIME = 1000 / TICKS_PER_SECOND

if (WEBGL.isWebGLAvailable()) {
	const app = new ThreeApp()
	const world = new ECSWorld(app)
	const stats = Stats()
	document.body.appendChild(stats.dom)
	let lastUpdate = performance.now()
	let lag = 0
	function update() {
		// Adapted from https://gist.github.com/godwhoa/e6225ae99853aac1f633
		requestAnimationFrame(update)
		const now = performance.now()
		let delta = now - lastUpdate
		if (delta > 1000) delta = TICK_TIME
		lag += delta
		while (lag >= TICK_TIME) {
			world.update()
			lag -= TICK_TIME
		}
		stats.begin()
		app.render(lag / TICK_TIME)
		stats.end()
		lastUpdate = performance.now()
	}
	update()
} else {
	const warning = WEBGL.getWebGLErrorMessage()
	document.body.appendChild(warning)
}
