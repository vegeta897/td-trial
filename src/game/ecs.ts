import { World } from 'uecs'
import { System } from '../systems/system'
import { PathSystem } from '../systems/sys_path'
import RenderSystem from '../systems/sys_render'
import TransformSystem from '../systems/sys_transform'
import EmitterSystem from '../systems/sys_emitter'
import BulletSystem from '../systems/sys_bullet'
import RotateSystem from '../systems/sys_rotate'
import TargetSystem from '../systems/sys_target'
import Game from './'

export default class ECS {
	world = new World()
	systems: System[] = []
	registerSystems(game: Game) {
		this.systems.push(new TransformSystem(game))
		this.systems.push(new RotateSystem(game))
		this.systems.push(new TargetSystem(game))
		this.systems.push(new EmitterSystem(game))
		this.systems.push(new BulletSystem(game))
		this.systems.push(new PathSystem(game))
		game.threeApp.systems.push(new RenderSystem(game))
	}
	update() {
		this.systems.forEach((system) => system.update())
	}
}
