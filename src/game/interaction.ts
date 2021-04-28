import Game from './'
import { Object3D, Raycaster } from 'three'
import { FLOOR_Y } from './level'
import Turret from '../factory/turret'
import AmmoLoader from '../factory/ammo_loader'
import { Tag } from 'uecs'
import { GameObjectTypes } from '../factory/game_object'
import { ThreeApp } from '../three/three_app'

export enum InteractionState {
	NONE,
	FOLLOW,
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
				if (this.state === InteractionState.FOLLOW) this.followObject()
				const mouse = {
					x: (event.clientX / window.innerWidth) * 2 - 1,
					y: -(event.clientY / window.innerHeight) * 2 + 1,
				}
				raycaster.setFromCamera(mouse, this.game.threeApp.camera)
				const intersected = raycaster.intersectObjects(
					this.game.threeApp.scene.children
				)
				if (this.state === InteractionState.NONE) {
					const tumblerClick = intersected.find((i) =>
						this.game.world.has(
							i.object.userData.entity,
							Tag.for(GameObjectTypes.Tumbler)
						)
					)
					if (tumblerClick) this.followObject(tumblerClick.object)
				} else {
					const groundClick = intersected.find(
						(i) => i.object === this.game.level.ground
					)
					if (groundClick) {
						if (groundClick.point.manhattanLength() > 50) return
						switch (this.state) {
							case InteractionState.BUILD_TURRET:
								new Turret(
									groundClick.point.setComponent(1, FLOOR_Y + 0.5)
								).addToGame(this.game)
								break
							case InteractionState.BUILD_LOADER:
								new AmmoLoader(
									groundClick.point.setComponent(1, FLOOR_Y + 0.5)
								).addToGame(this.game)
								break
						}
					}
				}
				this.game.gui.update()
			}
		)
	}
	followObject(object: Object3D | null = null) {
		this.state =
			object === null ? InteractionState.NONE : InteractionState.FOLLOW
		this.game.threeApp.cameraControls.dollyToCursor = object === null
		ThreeApp.FollowObject = object
	}
}
