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
import { Body, Plane } from 'cannon-es'

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
		const plane = new PlaneGeometry(10 ** 3, 10 ** 3)
		const planeMaterial = new MeshLambertMaterial({ color: 0x29264f })
		const planeMesh = new Mesh(plane, planeMaterial)
		planeMesh.receiveShadow = true
		planeMesh.position.y = FLOOR_Y
		planeMesh.position.x = this.game.threeApp.center.x
		planeMesh.position.z = this.game.threeApp.center.z
		planeMesh.rotateX(-Math.PI / 2)
		this.game.threeApp.scene.add(planeMesh)
		this.ground = planeMesh
		const groundBody = new Body({
			type: Body.STATIC,
			shape: new Plane(),
		})
		groundBody.position.y = FLOOR_Y
		groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0) // make it face up
		this.game.physics.world.addBody(groundBody)
	}
	create() {
		// Create spawner
		this.game.factory.createSpawner()
		this.game.factory.createBox(new Vector3(0, 7, 2))
		this.game.factory.createBox(new Vector3(6, 2, 2))
		this.game.factory.createBox(new Vector3(6, 4, 2.5))
		this.game.factory.createBox(new Vector3(6, 6, 3))
	}
}

export class PathNode extends Vector3 {
	nextNode?: PathNode
	addNode(x = 0, y = 0, z = 0): PathNode {
		this.nextNode = new PathNode(this.x + x, this.y + y, this.z + z)
		return this.nextNode
	}
}
