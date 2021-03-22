import { Vector3 } from 'three'

export default class Transform3D {
	constructor(
		public vector3: Vector3 = new Vector3(),
		public dirty: boolean = true
	) {}
}
