import './style.css'
import { WEBGL } from 'three/examples/jsm/WebGL'
import { ThreeApp } from './three-app'

if (WEBGL.isWebGLAvailable()) {
	const app = new ThreeApp()
	function animate() {
		requestAnimationFrame(animate)
		app.update()
		app.render()
	}
	animate()
} else {
	const warning = WEBGL.getWebGLErrorMessage()
	document.body.appendChild(warning)
}
