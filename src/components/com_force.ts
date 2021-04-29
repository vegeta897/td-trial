import { ArrowHelper, Quaternion, Vector3 } from 'three'

export default class ForceComponent {
	velocity = new Vector3()
	dirty = true
	arrow: ArrowHelper
	constructor(
		public direction: Quaternion,
		public magnitude: number,
		public limit = 0,
		public applyRate = 1,
		public showForceVector = false
	) {}
}
