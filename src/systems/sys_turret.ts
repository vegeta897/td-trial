import { Tag, World } from 'uecs'
import { TagID } from '../world'
import ThreeObject3D from '../components/com_object3d'
import Emitter from '../components/com_emitter'
import { System } from './system'
import { ThreeApp } from '../three/three-app'
import { Level } from '../level'
import { createCube } from '../three/cube'
import Transform3D from '../components/com_transform3d'
import Velocity3D from '../components/com_velocity3d'
import { Vector3 } from 'three'

const BULLET_SPEED = 0.3

export default class TurretSystem extends System {
	view = this.world.view(Emitter, Transform3D, Tag.for(TagID.Turret))
	threeApp: ThreeApp
	level: Level
	constructor(world: World, threeApp: ThreeApp, level: Level) {
		super(world)
		this.threeApp = threeApp
		this.level = level
	}
	update() {
		this.view.each((entity, turret, transform) => {
			if (++turret.tick === turret.interval) {
				turret.tick = 0
				const bullet = createCube(0.2)
				this.threeApp.scene.add(bullet)
				this.world.create(
					new Transform3D(transform.vector3.clone()),
					new ThreeObject3D(bullet),
					new Velocity3D(new Vector3(0, 0, -BULLET_SPEED)),
					Tag.for(TagID.Bullet)
				)
			}
		})
	}
}
