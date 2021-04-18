import { Quaternion, Vector3 } from 'three'

export enum EmitterType {
	Spawner,
	Turret,
	Loader,
}

export default class Emitter {
	constructor(
		public type: EmitterType,
		public interval: number,
		public origin: Vector3 = new Vector3(),
		public tick: number = 0,
		public active: boolean = true,
		public useAmmo: boolean = false,
		public direction: Quaternion = new Quaternion()
	) {
		if (interval < 1) throw 'Emitter interval must be at least 1'
	}
}
