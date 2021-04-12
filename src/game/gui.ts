import Game from './index'
import { InteractionState } from './interaction'

export default class GUI {
	game: Game
	container = document.createElement('div')
	buttons = {
		turret: document.createElement('button'),
		cancel: document.createElement('button'),
	}
	constructor(game: Game) {
		this.game = game
		this.container.id = 'gui-container'
		document.body.appendChild(this.container)
		const heading = document.createElement('h2')
		heading.innerText = 'Build'
		this.container.appendChild(heading)

		this.buttons.turret.innerText = 'Turret'
		this.buttons.turret.addEventListener('click', () => {
			this.game.interaction.state = InteractionState.BUILD_TURRET
			this.update()
		})
		this.container.appendChild(this.buttons.turret)

		this.buttons.cancel.innerText = 'cancel'
		this.buttons.cancel.addEventListener('click', () => {
			this.game.interaction.state = InteractionState.NONE
			this.update()
		})
		this.container.appendChild(this.buttons.cancel)
		this.update()
	}
	update() {
		this.buttons.turret.disabled =
			this.game.interaction.state === InteractionState.BUILD_TURRET
		this.buttons.cancel.style.visibility =
			this.game.interaction.state === InteractionState.NONE
				? 'hidden'
				: 'visible'
		this.buttons.cancel.disabled =
			this.game.interaction.state === InteractionState.NONE
	}
}
