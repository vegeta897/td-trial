import {
	Vec3,
	World,
	Material,
	ContactMaterial,
	SplitSolver,
	GSSolver,
} from 'cannon-es'

export class Physics {
	solver = new SplitSolver(new GSSolver())
	world = new World({
		gravity: new Vec3(0, -20, 0),
		allowSleep: true,
		quatNormalizeFast: true, // Turn this off if things are unstable
		solver: this.solver,
	})
	static Materials = {
		ground: new Material('ground'),
		tumbler: new Material('tumbler'),
	}
	constructor() {
		this.solver.iterations = 10
		this.solver.tolerance = 1e-7
		this.world.addContactMaterial(
			new ContactMaterial(Physics.Materials.ground, Physics.Materials.tumbler, {
				friction: 100,
				restitution: 0.5,
			})
		)
	}
}
