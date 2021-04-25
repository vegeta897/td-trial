import { Quaternion, SpriteMaterial, Vector3 } from 'three'
import Emitter, { EmitterType } from '../components/com_emitter'
import Game, { GameObjectTypes } from '../game'
import GameObject from './game_object'
import Target from '../components/com_target'
import Assets, { AssetNames } from '../three/assets'
import { createMesh, createSprite } from '../three/objects'
import Ammo from '../components/com_ammo'

const MAX_AMMO = 100

const ammoSpriteMaterial = new SpriteMaterial({ color: 0xa5ffc4 })

export default class Turret extends GameObject {
	constructor(position: Vector3, rotation?: Quaternion) {
		super(
			GameObjectTypes.Turret,
			createMesh({
				geometry: Assets.get(AssetNames.TurretGeometry),
				materialParams: { color: 0x38b764 },
				meshProperties: { castShadow: true },
			})
		)
		this.transform = { position, rotation }
		const ammoBar = createSprite()
		ammoBar.position.set(0, 0.4, 0)
		ammoBar.scale.setComponent(1, 0.2)
		ammoBar.material = ammoSpriteMaterial
		this.children = [ammoBar]
		this.additionalComponents = [
			new Emitter(
				EmitterType.Turret,
				Math.round(Game.tickRate / Game.turretProperties.fireRate),
				new Vector3(),
				0,
				false,
				true
			),
			new Target(GameObjectTypes.Tumbler, Game.turretProperties.targetDistance),
			new Ammo(MAX_AMMO, ammoBar),
		]
	}
}
