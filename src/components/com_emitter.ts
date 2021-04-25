import { Line3, Quaternion, Vector3 } from 'three'

export enum EmitterType {
	RiverSpawner,
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
		public direction: Quaternion = new Quaternion(),
		public spawnArea: Line3 = new Line3()
	) {
		if (interval < 1) throw 'Emitter interval must be at least 1'
	}
}
