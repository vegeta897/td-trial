import { System } from './system'
import ThreeObject3D from '../components/com_object3d'
import Path from '../components/com_path'

const MOVE_SPEED = 0.03

export class PathSystem extends System {
	view = this.world.view(ThreeObject3D, Path)
	update() {
		this.view.each((entity, obj3d, path) => {
			if (!path.toNode) {
				obj3d.object3D.position.copy(path.fromNode)
				if (path.fromNode.nextNode) {
					path.toNode = path.fromNode.nextNode
					path.distance = path.fromNode.distanceTo(path.toNode)
					path.progress = 0
				} else {
					this.world.remove(entity, Path)
					return
				}
			}
			const move = path.fromNode
				.clone()
				.lerp(path.toNode, path.progress / path.distance)
			obj3d.object3D.position.copy(move)
			path.progress += MOVE_SPEED
			if (path.progress >= path.distance) {
				path.fromNode = path.toNode
				delete path.toNode
			}
		})
	}
}
