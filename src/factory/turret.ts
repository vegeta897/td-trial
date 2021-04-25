import { Object3D, Quaternion, SpriteMaterial, Vector3 } from 'three'
import Emitter, { EmitterType } from '../components/com_emitter'
import Game, { GameObjectTypes } from '../game'
import GameObject from './game_object'
import Target from '../components/com_target'
import Assets, { AssetNames } from '../three/assets'
import { createMesh, createSprite } from '../three/objects'
import AmmoComponent from '../components/com_ammo'

const MAX_AMMO = 100

const ammoSpriteMaterial = new SpriteMaterial({ color: 0xa5ffc4 })

let turretPrototype: Object3D

export default class Turret extends GameObject {
	constructor(position: Vector3, rotation?: Quaternion) {
		turretPrototype =
			turretPrototype ||
			createMesh({
				geometry: Assets.get(AssetNames.TurretGeometry),
				materialParams: { color: 0x38b764 },
				meshProperties: { castShadow: true },
			})
		super(GameObjectTypes.Turret, turretPrototype.clone())
		this.transform = { position, rotation }
		const ammoBar = createSprite()
		ammoBar.position.set(0, 0.4, 0)
		ammoBar.scale.setComponent(1, 0.2)
		ammoBar.material = ammoSpriteMaterial
		this.children = [ammoBar]
		this.additionalComponents = [
			new Emitter(
				EmitterType.Turret,
				Math.round(Game.TickRate / Game.TurretProperties.fireRate),
				new Vector3(),
				0,
				false,
				true
			),
			new Target(GameObjectTypes.Tumbler, Game.TurretProperties.targetDistance),
			new AmmoComponent(MAX_AMMO, ammoBar),
		]
	}
}
