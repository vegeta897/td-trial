import {
	BoxGeometry,
	BufferGeometry,
	Line,
	LineBasicMaterial,
	Mesh,
	MeshBasicMaterial,
	PerspectiveCamera,
	Scene,
	Vector3,
	WebGLRenderer,
} from 'three'

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

		const geometry = new BoxGeometry()
		const material = new MeshBasicMaterial({ color: 0x00ff00 })
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
	}
	update() {
		this.scene.children.forEach((child) => child.rotateX(0.01).rotateY(0.005))
	}
	render() {
		this.renderer.render(this.scene, this.camera)
	}
}
