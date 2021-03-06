import * as THREE from 'three'
import {
	AxesHelper,
	Color,
	Group,
	Object3D,
	OrthographicCamera,
	Scene,
	WebGLRenderer,
} from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass'
import { System } from '../systems/system'
import CameraControls from 'camera-controls'
import { setupLights } from './light'
import { setupCameraControls, updateCamera } from './camera'
import { FLOOR_Y } from '../game/level'
import { GameObjectTypes } from '../factory/game_object'

CameraControls.install({ THREE })

const SCALE = 16

export class ThreeApp {
	renderer = new WebGLRenderer()
	composer = new EffectComposer(this.renderer)
	scene = new Scene()
	camera = new OrthographicCamera(0, 0, 0, 0, 0, 300)
	cameraControls = new CameraControls(this.camera, this.renderer.domElement)
	systems: System[] = []
	smaaPass = new SMAAPass(0, 0)
	smaa = true
	groups: Map<GameObjectTypes, Group> = new Map()
	static FollowObject: Object3D | null
	constructor() {
		// Set up renderer
		this.renderer.shadowMap.enabled = true
		this.renderer.setPixelRatio(window.devicePixelRatio)
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		document.body.appendChild(this.renderer.domElement)

		// Set up lights & camera
		setupLights(this)
		setupCameraControls(this)

		// Add background color and fog
		this.scene.background = new Color(0x38286b)
		// this.scene.fog = new THREE.Fog(0x38286b, 130, 150)

		// Create axes helper
		const axesHelper = new AxesHelper(3)
		axesHelper.position.set(0, FLOOR_Y + 0.05, 8)
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
