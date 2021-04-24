import Game from './'
import { InteractionState } from './interaction'

export default class GUI {
	game: Game
	statsContainer = document.createElement('div')
	buildContainer = document.createElement('div')
	buttons = {
		turret: document.createElement('button'),
		loader: document.createElement('button'),
		cancel: document.createElement('button'),
	}
	constructor(game: Game) {
		this.game = game

		this.statsContainer.id = 'gui-stats-container'
		document.body.appendChild(this.statsContainer)
		const tickDisplay = document.createElement('span')
		const entityDisplay = document.createElement('span')
		const bodyDisplay = document.createElement('span')
		this.statsContainer.appendChild(tickDisplay)
		this.statsContainer.appendChild(entityDisplay)
		this.statsContainer.appendChild(bodyDisplay)
		setInterval(() => {
			tickDisplay.innerText = `Tick: ${this.game.tick}`
			entityDisplay.innerText = `Entities: ${this.game.world.size()}`
			bodyDisplay.innerText = `Bodies: ${this.game.physics.world.bodies.length}`
		}, 200)

		this.buildContainer.id = 'gui-build-container'
		document.body.appendChild(this.buildContainer)
		const heading = document.createElement('h2')
		heading.innerText = 'Build'
		this.buildContainer.appendChild(heading)

		this.buttons.turret.innerText = 'Turret'
		this.buttons.turret.addEventListener('click', () => {
			this.game.interaction.state = InteractionState.BUILD_TURRET
			this.update()
		})
		this.buildContainer.appendChild(this.buttons.turret)

		this.buttons.loader.innerText = 'Loader'
		this.buttons.loader.addEventListener('click', () => {
			this.game.interaction.state = InteractionState.BUILD_LOADER
			this.update()
		})
		this.buildContainer.appendChild(this.buttons.loader)

		this.buttons.cancel.innerText = 'cancel'
		this.buttons.cancel.addEventListener('click', () => {
			this.game.interaction.state = InteractionState.NONE
			this.update()
		})
		this.buildContainer.appendChild(this.buttons.cancel)
		this.update()
	}
	update() {
		this.buttons.turret.disabled =
			this.game.interaction.state === InteractionState.BUILD_TURRET
		this.buttons.loader.disabled =
			this.game.interaction.state === InteractionState.BUILD_LOADER
		this.buttons.cancel.style.visibility =
			this.game.interaction.state === InteractionState.NONE
				? 'hidden'
				: 'visible'
		this.buttons.cancel.disabled =
			this.game.interaction.state === InteractionState.NONE
	}
}
