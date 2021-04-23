import { Quaternion, Vector3 } from 'three'
import { assignDefined } from '../util'

export default class Transform3D {
	position: Vector3 = new Vector3()
	rotation: Quaternion = new Quaternion()
	scale: Vector3 = new Vector3().setScalar(1)
	prevPosition: Vector3
	prevRotation: Quaternion
	prevScale: Vector3
	lastUpdated = -1
	constructor(options: Partial<Transform3D> = {}) {
		assignDefined(this, options)
		this.prevPosition = this.position.clone()
		this.prevRotation = this.rotation.clone()
		this.prevScale = this.scale.clone()
	}
}
