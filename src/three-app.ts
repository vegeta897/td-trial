import {
	AmbientLight,
	AxesHelper,
	BoxGeometry,
	DirectionalLight,
	Mesh,
	MeshPhongMaterial,
	OrthographicCamera,
	Scene,
	WebGLRenderer,
} from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass'

const SCALE = 6

export class ThreeApp {
	renderer = new WebGLRenderer()
	composer = new EffectComposer(this.renderer)
	scene = new Scene()
	camera = new OrthographicCamera(0, 0, 0, 0, 0, 200)
	cube: Mesh
	constructor() {
		this.renderer.setPixelRatio(window.devicePixelRatio)
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		document.body.appendChild(this.renderer.domElement)

		const ambientLight = new AmbientLight(0x404040)
		this.scene.add(ambientLight)
		const light = new DirectionalLight(0xa0a0a0)
		light.position.x = -2
		light.position.z = 4
		light.position.y = 10
		this.scene.add(light)

		const geometry = new BoxGeometry(0.5, 0.5, 0.5)
		const material = new MeshPhongMaterial({
			color: 0x00ff00,
			specular: 0xaaaaaa,
		})
		this.cube = new Mesh(geometry, material)
		this.scene.add(this.cube)

		this.camera.position.x = 100
		this.camera.position.y = 100
		this.camera.position.z = 50
		this.camera.lookAt(2, 0, 2)

		const axesHelper = new AxesHelper(3)
		axesHelper.position.y = -1 / 4
		this.scene.add(axesHelper)

		this.composer.addPass(new RenderPass(this.scene, this.camera))
		this.composer.addPass(new SMAAPass(0, 0))

		window.addEventListener('resize', this.onWindowResize.bind(this))
		this.onWindowResize()
	}
	render(dt: number) {
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
