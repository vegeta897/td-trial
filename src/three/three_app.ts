import * as THREE from 'three'
import {
	AxesHelper,
	Color,
	Group,
	OrthographicCamera,
	Scene,
	Vector3,
	WebGLRenderer,
} from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass'
import { System } from '../systems/system'
import { GameObjectTypes } from '../game'
import CameraControls from 'camera-controls'
import { setupLights } from './light'
import { setupCamera, updateCamera } from './camera'
import { FLOOR_Y } from '../game/level'

CameraControls.install({ THREE })

const SCALE = 16

export class ThreeApp {
	renderer = new WebGLRenderer()
	composer = new EffectComposer(this.renderer)
	scene = new Scene()
	camera = new OrthographicCamera(0, 0, 0, 0, 0, 300)
	cameraControls = new CameraControls(this.camera, this.renderer.domElement)
	systems: System[] = []
	center = new Vector3(4, 0, 4)
	smaaPass = new SMAAPass(0, 0)
	smaa = true
	groups: Map<GameObjectTypes, Group> = new Map()
	constructor() {
		// Set up renderer
		this.renderer.shadowMap.enabled = true
		this.renderer.setPixelRatio(window.devicePixelRatio)
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		document.body.appendChild(this.renderer.domElement)

		// Set up lights & camera
		setupLights(this)
		setupCamera(this)

		// Add background color and fog
		this.scene.background = new Color(0x38286b)
		this.scene.fog = new THREE.Fog(0x38286b, 100, 130)

		// Create axes helper
		const axesHelper = new AxesHelper(3)
		axesHelper.position.set(0, FLOOR_Y + 0.05, 0)
		this.scene.add(axesHelper)

		// Render passes
		this.composer.addPass(new RenderPass(this.scene, this.camera))
		this.composer.addPass(this.smaaPass)

		// Handle window sizing
		window.addEventListener('resize', this.onWindowResize.bind(this))
		this.onWindowResize()

		// Create groups
		for (const groupID in GameObjectTypes) {
			if (!isNaN(Number(groupID))) {
				const group = new Group()
				this.groups.set(Number(groupID), group)
				this.scene.add(group)
			}
		}
	}
	render(tick: number, dt: number) {
		this.systems.forEach((system) => system.update(tick, dt))
		this.cameraControls.update(1)
		this.composer.render()
	}
	onWindowResize() {
		updateCamera(this.camera, SCALE)
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		this.composer.setSize(window.innerWidth, window.innerHeight)
	}
}
