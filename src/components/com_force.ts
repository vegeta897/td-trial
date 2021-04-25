import { Quaternion, Vector3 } from 'three'

export default class ForceComponent {
	velocity = new Vector3()
	dirty = true
	constructor(
		public direction: Quaternion,
		public magnitude: number,
		public limit = 0
	) {}
}
