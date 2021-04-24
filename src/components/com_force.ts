import { Vector3 } from 'three'

export default class ForceComponent {
	constructor(public velocity = new Vector3(), public limit = 0) {}
}
