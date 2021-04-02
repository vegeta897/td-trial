import { World } from 'uecs'
import Game from '../game'
import { ThreeApp } from '../three/three-app'
import { Level } from '../game/level'
import Factory from '../factory'

export abstract class System {
	game: Game
	world: World
	threeApp: ThreeApp
	level: Level
	factory: Factory

	constructor(game: Game) {
		this.game = game
		this.world = game.world
		this.threeApp = game.threeApp
		this.level = game.level
		this.factory = game.factory
	}

	abstract update(dt?: number): void
}
