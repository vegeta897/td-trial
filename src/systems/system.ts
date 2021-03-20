import { World } from 'uecs'

export abstract class System {
	world: World

	constructor(world: World) {
		this.world = world
	}

	abstract update(): void
}
