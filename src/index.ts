import './style.css'
import { WEBGL } from 'three/examples/jsm/WebGL'
import Game from './game'

if (WEBGL.isWebGLAvailable()) {
	new Game().init()
} else {
	document.body.appendChild(WEBGL.getWebGLErrorMessage())
}
