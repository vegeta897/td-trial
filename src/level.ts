import { Vector3 } from 'three'

export class PathNode extends Vector3 {
	nextNode?: PathNode
	addNode(x: number, y: number, z = 0): PathNode {
		this.nextNode = new PathNode(x, y, z)
		return this.nextNode
	}
}

export class Level {
	startingNode = new PathNode()
	constructor() {
		this.startingNode
			.addNode(0, 0, 4)
			.addNode(2, 0)
			.addNode(0, 0, -2)
			.addNode(4, 0)
	}
}
