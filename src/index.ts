import './style.css'
import { WEBGL } from 'three/examples/jsm/WebGL'
import { ThreeApp } from './three-app'
import { ECSWorld } from './world'

if (WEBGL.isWebGLAvailable()) {
	const app = new ThreeApp()
	const world = new ECSWorld(app)
	function animate() {
		requestAnimationFrame(animate)
		world.update()
		app.render()
	}
	animate()
} else {
	const warning = WEBGL.getWebGLErrorMessage()
	document.body.appendChild(warning)
}
