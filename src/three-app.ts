import {
	BoxGeometry,
	Mesh,
	MeshBasicMaterial,
	PerspectiveCamera,
	Scene,
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
		this.camera.position.z = 5
	}
	update() {
		this.scene.children.forEach((child) => child.rotateX(0.01).rotateY(0.01))
	}
	render() {
		this.renderer.render(this.scene, this.camera)
	}
}
