import Game from './'
import { InteractionState } from './interaction'

export default class GUI {
	game: Game
	statsContainer = document.createElement('div')
	buildContainer = document.createElement('div')
	displays: Display[] = []
	buttons: Button[] = []
	constructor(game: Game) {
		this.game = game

		this.statsContainer.id = 'gui-stats-container'
		document.body.appendChild(this.statsContainer)
		this.createDisplay('Tick', () => this.game.tick)
		this.createDisplay('Entities', () => this.game.world.size())
		this.createDisplay('Bodies', () => this.game.physics.world.bodies.length)
		setInterval(() => {
			this.displays.forEach((d) => d.update())
		}, 200)

		this.buildContainer.id = 'gui-build-container'
		document.body.appendChild(this.buildContainer)
		const heading = document.createElement('h2')
		heading.innerText = 'Build'
		this.buildContainer.appendChild(heading)

		this.createButton('Turret', InteractionState.BUILD_TURRET)
		this.createButton('Loader', InteractionState.BUILD_LOADER)
		this.createButton('cancel', InteractionState.NONE, true)
		this.update()
	}

	update() {
		if (this.game.interaction.state === InteractionState.FOLLOW) {
			this.buildContainer.style.visibility = 'hidden'
			return
		}
		this.buildContainer.style.visibility = 'visible'
		this.buttons.forEach(({ element, state, hideOnState }) => {
			element.disabled = this.game.interaction.state === state
			if (hideOnState)
				element.style.visibility =
					this.game.interaction.state === state ? 'hidden' : 'visible'
		})
	}

	createDisplay(name: string, getValue: () => string | number) {
		const element = document.createElement('span')
		this.statsContainer.appendChild(element)
		this.displays.push({
			name,
			update: () => (element.innerText = `${name}: ${getValue()}`),
			element,
		})
	}

	createButton(label: string, state: InteractionState, hideOnState = false) {
		const element = document.createElement('button')
		element.innerText = label
		element.addEventListener('click', () => {
			this.game.interaction.state = state
			this.update()
		})
		this.buildContainer.appendChild(element)
		this.buttons.push({ element, state, hideOnState })
	}
}

declare type Display = {
	name: string
	update: () => void
	element: HTMLElement
}

declare type Button = {
	element: HTMLButtonElement
	state: InteractionState
	hideOnState: boolean
}
