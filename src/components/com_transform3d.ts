import { Euler, Vector3 } from 'three'

export default class Transform3D {
	constructor(
		public position: Vector3 = new Vector3(),
		public rotation: Euler = new Euler(),
		public dirty: boolean = true
	) {}
}
