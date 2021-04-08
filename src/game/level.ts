import {
	BufferGeometry,
	Line,
	LineBasicMaterial,
	Mesh,
	MeshLambertMaterial,
	PlaneGeometry,
	Quaternion,
	Vector3,
} from 'three'
import Game from './'

export const FLOOR_Y = -0.5

export class PathNode extends Vector3 {
	nextNode?: PathNode
	addNode(x = 0, y = 0, z = 0): PathNode {
		this.nextNode = new PathNode(this.x + x, this.y + y, this.z + z)
		return this.nextNode
	}
}

export class Level {
	startingNode = new PathNode()
	constructor({ threeApp, factory }: Game) {
		this.startingNode.addNode(0, 0, 8).addNode(4).addNode(0, 0, -4).addNode(8)
		let node: PathNode | undefined = this.startingNode
		const pathPoints: Vector3[] = []
		do {
			pathPoints.push(node)
			node = node.nextNode
		} while (node)
		const pathGeometry = new BufferGeometry().setFromPoints(pathPoints)
		const pathLine = new Line(
			pathGeometry,
			new LineBasicMaterial({ color: 0x990000 })
		)
		threeApp.scene.add(pathLine)

		const plane = new PlaneGeometry(20, 20)
		const planeMaterial = new MeshLambertMaterial({ color: 0x29264f })
		const planeMesh = new Mesh(plane, planeMaterial)
		planeMesh.position.y = FLOOR_Y
		planeMesh.position.x = threeApp.center.x
		planeMesh.position.z = threeApp.center.z
		planeMesh.rotateX(-Math.PI / 2)
		threeApp.scene.add(planeMesh)

		// Create spawners and turrets
		factory.createSpawner()
		factory.createTurret(new Vector3(0, 0, 10))
		factory.createTurret(
			new Vector3(2, 0, 10),
			new Quaternion().setFromAxisAngle(new Vector3(0, 1), 0.6)
		)
		factory.createTurret(
			new Vector3(2, 0, 4),
			new Quaternion(),
			new Quaternion().setFromAxisAngle(new Vector3(0, 1), 0.02)
		)
	}
}
