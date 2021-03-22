import { System } from './system'
import Path from '../components/com_path'
import Transform3D from '../components/com_transform3d'
import Velocity3D from '../components/com_velocity3d'
import { Vector3 } from 'three'

const MOVE_SPEED = 0.02

export class PathSystem extends System {
	view = this.world.view(Transform3D, Path)
	update() {
		this.view.each((entity, transform, path) => {
			if (path.progress === 0) {
				transform.vector3.copy(path.node)
				if (path.node.nextNode) {
					path.distance = path.node.distanceTo(path.node.nextNode)
					path.progress = 0
					this.world.emplace(
						entity,
						new Velocity3D(
							new Vector3()
								.subVectors(path.node.nextNode, path.node)
								.normalize()
								.multiplyScalar(MOVE_SPEED)
						)
					)
					path.node = path.node.nextNode
				} else {
					this.world.destroy(entity)
					return
				}
			}
			path.progress += MOVE_SPEED
			if (path.progress >= path.distance) path.progress = 0
		})
	}
}
