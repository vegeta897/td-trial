import { Object3D } from 'three'

export default class ThreeObject3D {
	object3D: Object3D
	foo: number
	constructor(object3D: Object3D) {
		this.object3D = object3D
	}
}
