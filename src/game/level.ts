import { Euler, Mesh, MeshLambertMaterial, PlaneGeometry, Vector3 } from 'three'
import Game from './'
import { Body, Plane } from 'cannon-es'

export const FLOOR_Y = 0

export class Level {
	ground: Mesh
	game: Game
	constructor(game: Game) {
		this.game = game

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
		this.game.factory.createHQ(
			new Vector3(0, FLOOR_Y + 1.5, 10),
			new Euler(0, 0.2)
		)

		this.game.factory.createRiverSpawner(
			new Vector3(-18, FLOOR_Y + 0.25, -10),
			12,
			0
		)
	}
}

export class PathNode extends Vector3 {
	nextNode?: PathNode
	addNode(x = 0, y = 0, z = 0): PathNode {
		this.nextNode = new PathNode(this.x + x, this.y + y, this.z + z)
		return this.nextNode
	}
}
