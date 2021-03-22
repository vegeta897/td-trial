import { System } from './system'
import Path from '../components/com_path'
import Transform3D from '../components/com_transform3d'
import Velocity3D from '../components/com_velocity3d'
import { Vector3 } from 'three'

const MOVE_SPEED = 0.03

export class PathSystem extends System {
	view = this.world.view(Transform3D, Path)
	update() {
		this.view.each((entity, transform, path) => {
			if (!path.toNode) {
				transform.vector3.copy(path.fromNode)
				transform.dirty = true
				if (path.fromNode.nextNode) {
					path.toNode = path.fromNode.nextNode
					path.distance = path.fromNode.distanceTo(path.toNode)
					path.progress = 0
					this.world.emplace(
						entity,
						new Velocity3D(
							new Vector3()
								.subVectors(path.toNode, path.fromNode)
								.normalize()
								.multiplyScalar(MOVE_SPEED)
						)
					)
				} else {
					this.world.destroy(entity)
					return
				}
			}
			path.progress += MOVE_SPEED
			if (path.progress >= path.distance) {
				path.fromNode = path.toNode
				this.world.remove(entity, Velocity3D)
				delete path.toNode
			}
		})
	}
}
