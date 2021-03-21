import './style.css'
import { WEBGL } from 'three/examples/jsm/WebGL'
import { ThreeApp } from './three-app'
import { ECSWorld } from './world'
import Stats from 'three/examples/jsm/libs/stats.module'

const TICKS_PER_SECOND = 60
const TICK_TIME = 1000 / TICKS_PER_SECOND

if (WEBGL.isWebGLAvailable()) {
	const app = new ThreeApp()
	const world = new ECSWorld(app)
	const stats = Stats()
	document.body.appendChild(stats.dom)
	let lastUpdate = 0
	function animate() {
		requestAnimationFrame(animate)
		stats.begin()
		app.render((performance.now() - lastUpdate) / TICK_TIME)
		stats.end()
	}
	animate()

	setInterval(() => {
		world.update()
		lastUpdate = performance.now()
	}, TICK_TIME)
} else {
	const warning = WEBGL.getWebGLErrorMessage()
	document.body.appendChild(warning)
}
