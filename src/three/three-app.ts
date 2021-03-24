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

const SCALE = 8
const NO_AA = false

export class ThreeApp {
	renderer = new WebGLRenderer()
	composer = new EffectComposer(this.renderer)
	scene = new Scene()
	camera = new OrthographicCamera(0, 0, 0, 0, 0, 200)
	systems: System[] = []
	constructor() {
		this.renderer.setPixelRatio(window.devicePixelRatio)
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		document.body.appendChild(this.renderer.domElement)

		const ambientLight = new AmbientLight(0x404040)
		this.scene.add(ambientLight)
		const light = new DirectionalLight(0xa0a0a0)
		light.position.x = -4
		light.position.z = 8
		light.position.y = 20
		this.scene.add(light)

		const center = new Vector3(4, 0, 4)
		this.camera.position.setFromSphericalCoords(
			100, // Distance
			Math.PI / 4, // Pitch
			(Math.PI * 2) / 6 // Yaw
		)
		this.camera.lookAt(center)

		const axesHelper = new AxesHelper(4)
		axesHelper.position.y = -1 / 2
		this.scene.add(axesHelper)

		this.composer.addPass(new RenderPass(this.scene, this.camera))
		if (!NO_AA) this.composer.addPass(new SMAAPass(0, 0))

		window.addEventListener('resize', this.onWindowResize.bind(this))
		this.onWindowResize()
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
