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

const ASPECT = window.innerWidth / window.innerHeight
const SCALE = 6

export class ThreeApp {
	renderer = new WebGLRenderer()
	scene = new Scene()
	camera = new OrthographicCamera(
		-ASPECT * SCALE,
		ASPECT * SCALE,
		SCALE,
		-SCALE,
		0,
		200
	)
	cube: Mesh
	constructor() {
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

		const axesHelper = new AxesHelper(4)
		this.scene.add(axesHelper)
	}
	render() {
		this.renderer.render(this.scene, this.camera)
	}
}
