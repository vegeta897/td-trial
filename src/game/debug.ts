import Game, { GameObjectTypes } from './index'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import Emitter from '../components/com_emitter'
import { Tag } from 'uecs'
import Target from '../components/com_target'

export function createDebugGUI(game: Game) {
	const gui = new GUI({ width: 300 })

	const simFolder = gui.addFolder('Simulation')
	simFolder
		.add(game, 'tickTime', 1, 300)
		.onChange((tickTime) => (game.tickTime = tickTime))
	simFolder.add(game, 'interpolate')
	simFolder.add(game, 'paused')
	simFolder
		.add(game.threeApp, 'smaa')
		.onFinishChange((enabled) => (game.threeApp.smaaPass.enabled = enabled))
	simFolder.open()

	const turretFolder = gui.addFolder('Turrets')
	turretFolder
		.add(game.turretProperties, 'fireRate', 1, 60)
		.onChange((shootInterval) => {
			game.turretProperties.fireRate = Math.round(shootInterval)
			game.world
				.view(Emitter, Tag.for(GameObjectTypes.Turret))
				.each((e, emitter) => {
					emitter.interval = Math.round(
						game.tickRate / game.turretProperties.fireRate
					)
				})
		})
	turretFolder
		.add(game.turretProperties, 'targetDistance', 0, 30)
		.onChange((targetDistance) => {
			game.world
				.view(Target, Tag.for(GameObjectTypes.Turret))
				.each((e, target) => {
					target.maxDistance = targetDistance
				})
		})
	turretFolder.add(game.turretProperties, 'bulletSpeed', 0.1, 1.2)
	turretFolder.add(game.turretProperties, 'bulletSpread', 0, 60)
	turretFolder.open()
}
