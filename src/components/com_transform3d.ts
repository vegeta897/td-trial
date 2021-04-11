import { Quaternion, Vector3 } from 'three'
import { assignDefined } from '../util'

export default class Transform3D {
	position: Vector3 = new Vector3()
	rotation: Quaternion = new Quaternion()
	scale: Vector3 = new Vector3().setScalar(1)
	dirty: boolean = true
	constructor(options: Partial<Transform3D> = {}) {
		assignDefined(this, options)
	}
}
