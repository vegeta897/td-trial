import Game from './'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'

export function createDebugGUI(game: Game) {
	const gui = new GUI({ width: 200 })

	const simFolder = gui.addFolder('Simulation')
	simFolder
		.add(Game, 'TickTime', 1, 400)
		.onChange((tickTime) => (Game.TickTime = tickTime))
	simFolder.add(game, 'interpolate')
	simFolder.add(game, 'paused')
	simFolder
		.add(game.threeApp, 'smaa')
		.onFinishChange((enabled) => (game.threeApp.smaaPass.enabled = enabled))
	simFolder.open()

	// const turretFolder = gui.addFolder('Turrets')
	// turretFolder
	// 	.add(game.TurretProperties, 'fireRate', 1, 60)
	// 	.onChange((shootInterval) => {
	// 		game.TurretProperties.fireRate = Math.round(shootInterval)
	// 		game.world
	// 			.view(Emitter, Tag.for(GameObjectTypes.Turret))
	// 			.each((e, emitter) => {
	// 				emitter.interval = Math.round(
	// 					game.TickRate / game.TurretProperties.fireRate
	// 				)
	// 			})
	// 	})
	// turretFolder
	// 	.add(game.TurretProperties, 'targetDistance', 0, 30)
	// 	.onChange((targetDistance) => {
	// 		game.world
	// 			.view(Target, Tag.for(GameObjectTypes.Turret))
	// 			.each((e, target) => {
	// 				target.maxDistance = targetDistance
	// 			})
	// 	})
	// turretFolder.add(game.TurretProperties, 'bulletSpeed', 0.1, 1.2)
	// turretFolder.add(game.TurretProperties, 'bulletSpread', 0, 60)
	// turretFolder.open()
}
