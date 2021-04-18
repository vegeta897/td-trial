import Game from './index'
import { Raycaster } from 'three'

export enum InteractionState {
	NONE,
	BUILD_TURRET,
	BUILD_LOADER,
}

export default class Interaction {
	state: InteractionState = InteractionState.NONE
	game: Game
	constructor(game: Game) {
		this.game = game

		// Handle mouse clicks
		const raycaster = new Raycaster()
		this.game.threeApp.renderer.domElement.addEventListener(
			'mousedown',
			(event) => {
				if (event.button !== 0) return
				if (this.state === InteractionState.NONE) return
				const mouse = {
					x: (event.clientX / window.innerWidth) * 2 - 1,
					y: -(event.clientY / window.innerHeight) * 2 + 1,
				}
				raycaster.setFromCamera(mouse, this.game.threeApp.camera)
				const groundClick = raycaster
					.intersectObjects(this.game.threeApp.scene.children)
					.find((i) => i.object === this.game.level.ground)
				if (groundClick) {
					switch (this.state) {
						case InteractionState.BUILD_TURRET:
							this.game.factory.createTurret(
								groundClick.point.setComponent(1, 0)
							)
							break
						case InteractionState.BUILD_LOADER:
							this.game.factory.createLoader(
								groundClick.point.setComponent(1, 0)
							)
							break
					}
				}
				this.game.gui.update()
			}
		)
	}
}
