export enum EmitterType {
	Spawner,
	Turret,
}

export default class Emitter {
	constructor(
		public type: EmitterType,
		public interval: number,
		public tick: number = 0,
		public active: boolean = true,
		public useAmmo: boolean = false
	) {
		if (interval < 1) throw 'Emitter interval must be at least 1'
	}
}
