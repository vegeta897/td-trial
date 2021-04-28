import { System } from './system'
import { Box3, Vector3 } from 'three'
import { ThreeApp } from '../three/three_app'

const followBox = new Box3()
const followVec = new Vector3()

export default class CameraFollowSystem extends System {
	controls = this.threeApp.cameraControls
	update() {
		if (!ThreeApp.FollowObject) return
		if (!ThreeApp.FollowObject.parent) {
			this.game.interaction.followObject()
			this.game.gui.update()
			return
		}
		followBox.setFromObject(ThreeApp.FollowObject)
		followBox.getCenter(followVec)
		this.controls.setTarget(followVec.x, 0, followVec.z, true)
	}
}
