import {
	BufferGeometry,
	Line,
	LineBasicMaterial,
	Mesh,
	MeshLambertMaterial,
	PlaneGeometry,
	Vector3,
} from 'three'
import Game from './'

export const FLOOR_Y = -0.5

export class Level {
	startingNode = new PathNode()
	ground: Mesh
	game: Game
	constructor(game: Game) {
		this.game = game
		// Create enemy path
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
		this.game.threeApp.scene.add(pathLine)

		// Create ground plane
		const plane = new PlaneGeometry(20, 20)
		const planeMaterial = new MeshLambertMaterial({ color: 0x29264f })
		const planeMesh = new Mesh(plane, planeMaterial)
		planeMesh.receiveShadow = true
		planeMesh.position.y = FLOOR_Y
		planeMesh.position.x = this.game.threeApp.center.x
		planeMesh.position.z = this.game.threeApp.center.z
		planeMesh.rotateX(-Math.PI / 2)
		this.game.threeApp.scene.add(planeMesh)
		this.ground = planeMesh
	}
	create() {
		// Create spawner
		this.game.factory.createSpawner()
	}
}

export class PathNode extends Vector3 {
	nextNode?: PathNode
	addNode(x = 0, y = 0, z = 0): PathNode {
		this.nextNode = new PathNode(this.x + x, this.y + y, this.z + z)
		return this.nextNode
	}
}
