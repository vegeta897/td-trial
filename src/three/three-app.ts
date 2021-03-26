import {
	AmbientLight,
	AxesHelper,
	DirectionalLight,
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

const SCALE = 8
const NO_AA = false

export class ThreeApp {
	renderer = new WebGLRenderer()
	composer = new EffectComposer(this.renderer)
	scene = new Scene()
	camera = new OrthographicCamera(0, 0, 0, 0, 0, 200)
	controls = new OrbitControls(this.camera, this.renderer.domElement)
	systems: System[] = []
	center = new Vector3(4, 0, 4)
	constructor() {
		this.renderer.setPixelRatio(window.devicePixelRatio)
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		document.body.appendChild(this.renderer.domElement)

		const ambientLight = new AmbientLight(0x5d275d)
		this.scene.add(ambientLight)
		const light = new DirectionalLight(0xffffff, 1)
		light.position.set(2, 5, 1)
		this.scene.add(light)

		this.camera.position.setFromSphericalCoords(
			100, // Distance
			Math.PI / 4, // Pitch
			(Math.PI * 2) / 6 // Yaw
		)
		this.camera.lookAt(this.center)

		const axesHelper = new AxesHelper(4)
		axesHelper.position.set(-2, 0, -2)
		this.scene.add(axesHelper)

		this.composer.addPass(new RenderPass(this.scene, this.camera))
		if (!NO_AA) this.composer.addPass(new SMAAPass(0, 0))

		window.addEventListener('resize', this.onWindowResize.bind(this))
		this.onWindowResize()

		this.controls.target = this.center
		this.controls.enableDamping = true
		this.controls.dampingFactor = 0.05
		this.controls.screenSpacePanning = false
		this.controls.minDistance = 100
		this.controls.maxDistance = 500
		this.controls.minZoom = 0.1
		this.controls.maxZoom = 5
		this.controls.maxPolarAngle = Math.PI / 2
	}
	render(dt: number) {
		this.systems.forEach((system) => system.update(dt))
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
