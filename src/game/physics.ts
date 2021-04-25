import { Vec3, World, Material, ContactMaterial } from 'cannon-es'
import Game from './'

export class Physics {
	game: Game
	world = new World({ gravity: new Vec3(0, -20, 0), allowSleep: true })
	static Materials = {
		ground: new Material('ground'),
		tumbler: new Material('tumbler'),
	}
	constructor(game: Game) {
		this.world.addContactMaterial(
			new ContactMaterial(Physics.Materials.ground, Physics.Materials.tumbler, {
				friction: 100,
				restitution: 0.5,
			})
		)
	}
}
