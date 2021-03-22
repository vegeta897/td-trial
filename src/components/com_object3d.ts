import { Object3D } from 'three'

export default class ThreeObject3D {
	constructor(public object3D: Object3D) {}
	free() {
		this.object3D.parent?.remove(this.object3D)
	}
}
