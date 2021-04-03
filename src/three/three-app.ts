import {
	AmbientLight,
	AxesHelper,
	DirectionalLight,
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
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GameObjectTypes } from '../game'

const SCALE = 8

export class ThreeApp {
	renderer = new WebGLRenderer()
	composer = new EffectComposer(this.renderer)
	scene = new Scene()
	camera = new OrthographicCamera(0, 0, 0, 0, 0, 200)
	cameraControls = new OrbitControls(this.camera, this.renderer.domElement)
	systems: System[] = []
	center = new Vector3(4, 0, 4)
	smaaPass = new SMAAPass(0, 0)
	smaa = true
	groups: Map<GameObjectTypes, Group> = new Map()
	constructor() {
		// Set up renderer
		this.renderer.setPixelRatio(window.devicePixelRatio)
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		document.body.appendChild(this.renderer.domElement)

		// Set up lights
		const ambientLight = new AmbientLight(0x5d275d)
		this.scene.add(ambientLight)
		const light = new DirectionalLight(0xffffff, 1)
		light.position.set(2, 5, 1)
		this.scene.add(light)

		// Set up camera
		this.camera.position.setFromSphericalCoords(
			100, // Distance
			Math.PI / 4, // Pitch
			(Math.PI * 2) / 6 // Yaw
		)
		this.camera.lookAt(this.center)

		// Create axes helper
		const axesHelper = new AxesHelper(4)
		axesHelper.position.set(-2, 0, -2)
		this.scene.add(axesHelper)

		// Render passes
		this.composer.addPass(new RenderPass(this.scene, this.camera))
		this.composer.addPass(this.smaaPass)

		// Handle window sizing
		window.addEventListener('resize', this.onWindowResize.bind(this))
		this.onWindowResize()

		// Set up camera controls
		this.cameraControls.target = this.center
		this.cameraControls.enableDamping = true
		this.cameraControls.dampingFactor = 0.1
		this.cameraControls.screenSpacePanning = false
		this.cameraControls.minDistance = 100
		this.cameraControls.maxDistance = 500
		this.cameraControls.minZoom = 0.1
		this.cameraControls.maxZoom = 5
		this.cameraControls.maxPolarAngle = Math.PI / 2

		// Create groups
		for (const groupID in GameObjectTypes) {
			if (!isNaN(Number(groupID))) {
				const group = new Group()
				this.groups.set(Number(groupID), group)
				this.scene.add(group)
			}
		}
	}
	render(dt: number) {
		this.systems.forEach((system) => system.update(dt))
		this.cameraControls.update()
		this.composer.render()
	}
	onWindowResize() {
		const aspect = window.innerWidth / window.innerHeight
		this.camera.left = -aspect * SCALE
		this.camera.right = aspect * SCALE
		this.camera.top = SCALE
		this.camera.bottom = -SCALE
		this.camera.updateProjectionMatrix()
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		this.composer.setSize(window.innerWidth, window.innerHeight)
	}
}
