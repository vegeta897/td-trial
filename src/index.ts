import './style.css'
import { WEBGL } from 'three/examples/jsm/WebGL'
import { ThreeApp } from './three-app'
import { ECSWorld } from './world'
import Stats from 'three/examples/jsm/libs/stats.module'

if (WEBGL.isWebGLAvailable()) {
	const app = new ThreeApp()
	const world = new ECSWorld(app)
	const stats = Stats()
	document.body.appendChild(stats.dom)
	function animate() {
		requestAnimationFrame(animate)
		stats.begin()
		world.update()
		app.render()
		stats.end()
	}
	animate()
} else {
	const warning = WEBGL.getWebGLErrorMessage()
	document.body.appendChild(warning)
}
