import { Sprite } from 'three'

export default class AmmoComponent {
	public max: number
	constructor(public current: number, public sprite: Sprite) {
		this.max = current
	}
	free() {
		this.sprite.parent?.remove(this.sprite)
	}
}
