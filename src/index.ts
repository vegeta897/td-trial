import './style.css'
import { WEBGL } from 'three/examples/jsm/WebGL'
import Game from './game'

if (WEBGL.isWebGLAvailable()) {
	new Game()
} else {
	document.body.appendChild(WEBGL.getWebGLErrorMessage())
}
