import {
	AmbientLight,
	BoxGeometry,
	BufferGeometry,
	DirectionalLight,
	Line,
	LineBasicMaterial,
	Mesh,
	MeshPhongMaterial,
	PerspectiveCamera,
	Scene,
	Vector3,
	WebGLRenderer,
} from 'three'
import { DragControls } from 'three/examples/jsm/controls/DragControls'

export class ThreeApp {
	renderer = new WebGLRenderer()
	scene = new Scene()
	camera = new PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	)
	constructor() {
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		document.body.appendChild(this.renderer.domElement)

		const ambientLight = new AmbientLight(0x404040)
		this.scene.add(ambientLight)
		const light = new DirectionalLight(0xa0a0a0)
		light.position.x = -2
		this.scene.add(light)

		const geometry = new BoxGeometry()
		const material = new MeshPhongMaterial({
			color: 0x00ff00,
			specular: 0xaaaaaa,
		})
		const cube = new Mesh(geometry, material)
		this.scene.add(cube)

		const lineMaterial = new LineBasicMaterial({ color: 0x0000ff })
		const points = []
		points.push(new Vector3(-1, 0, 0))
		points.push(new Vector3(0, 1, 0))
		points.push(new Vector3(1, 0, 0))
		points.push(new Vector3(0, -1, 0))
		points.push(new Vector3(-1, 0, 0))
		const lineGeometry = new BufferGeometry().setFromPoints(points)
		const line = new Line(lineGeometry, lineMaterial)
		this.scene.add(line)

		this.camera.position.z = 5

		const controls = new DragControls(
			[cube],
			this.camera,
			this.renderer.domElement
		)
		controls.addEventListener('dragstart', function (event) {
			event.object.material.emissive.set(0x333333)
		})
		controls.addEventListener('dragend', function (event) {
			event.object.material.emissive.set(0x000000)
		})
	}
	render() {
		this.renderer.render(this.scene, this.camera)
	}
}
