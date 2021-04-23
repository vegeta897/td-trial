import { Vec3, World } from 'cannon-es'
import Game from './'

export class Physics {
	game: Game
	world = new World({ gravity: new Vec3(0, -20, 0), allowSleep: true })
	constructor(game: Game) {}
}
