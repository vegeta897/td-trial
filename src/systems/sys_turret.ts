import { Tag, World } from 'uecs'
import { TagID } from '../world'
import Emitter from '../components/com_emitter'
import { System } from './system'
import { ThreeApp } from '../three/three-app'
import { Level } from '../level'
import Transform3D from '../components/com_transform3d'
import { createBullet } from '../archetypes/bullet'

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
				createBullet(this.threeApp.scene, this.world, transform)
			}
		})
	}
}
