import { Vec3, World, Material, ContactMaterial, GSSolver } from 'cannon-es'

export class Physics {
	world = new World({
		gravity: new Vec3(0, -20, 0),
		allowSleep: true,
		quatNormalizeFast: true, // Turn this off if things are unstable
	})
	static Materials = {
		ground: new Material('ground'),
		tumbler: new Material('tumbler'),
	}
	constructor() {
		;(<GSSolver>this.world.solver).iterations = 10
		this.world.addContactMaterial(
			new ContactMaterial(Physics.Materials.ground, Physics.Materials.tumbler, {
				friction: 100,
				restitution: 0.5,
			})
		)
	}
}
