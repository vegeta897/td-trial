import { World } from 'uecs'
import Game from '../game'
import { ThreeApp } from '../three/three_app'
import { Level } from '../game/level'

export abstract class System {
	game: Game
	world: World
	threeApp: ThreeApp
	level: Level

	constructor(game: Game) {
		this.game = game
		this.world = game.world
		this.threeApp = game.threeApp
		this.level = game.level
	}

	abstract update(tick?: number, dt?: number): void
}
