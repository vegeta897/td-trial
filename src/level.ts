import { BufferGeometry, Line, LineBasicMaterial, Vector3 } from 'three'
import { ThreeApp } from './three/three-app'

export class PathNode extends Vector3 {
	nextNode?: PathNode
	addNode(x = 0, y = 0, z = 0): PathNode {
		this.nextNode = new PathNode(this.x + x, this.y + y, this.z + z)
		return this.nextNode
	}
}

export class Level {
	startingNode = new PathNode()
	constructor(threeApp: ThreeApp) {
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
	}
}
