import { Quaternion, SpriteMaterial, Vector3 } from 'three'
import Emitter, { EmitterType } from '../components/com_emitter'
import { GameObjectTypes } from '../game'
import Factory from './'
import Target from '../components/com_target'
import { AssetNames } from '../three/assets'
import { createMesh, createSprite } from '../three/objects'
import Ammo from '../components/com_ammo'

const MAX_AMMO = 100

export function createTurretPrototype(factory: Factory) {
	factory.prototypes.set(
		GameObjectTypes.Turret,
		createMesh({
			geometry: factory.game.threeApp.assets.get(AssetNames.TurretGeometry),
			materialParams: { color: 0x38b764 },
			meshProperties: { castShadow: true },
		})
	)
}

const ammoSpriteMaterial = new SpriteMaterial({ color: 0xa5ffc4 })

export function createTurret(
	this: Factory,
	position?: Vector3,
	rotation?: Quaternion
) {
	const ammoBar = createSprite()
	ammoBar.position.set(0, 0.6, 0)
	ammoBar.scale.setComponent(1, 0.2)
	ammoBar.material = ammoSpriteMaterial
	this.createGameObject({
		transform: { position, rotation },
		gameObjectType: GameObjectTypes.Turret,
		additionalComponents: [
			new Emitter(
				EmitterType.Turret,
				Math.round(this.game.tickRate / this.game.turretProperties.fireRate),
				new Vector3(),
				0,
				false,
				true
			),
			new Target(
				GameObjectTypes.Enemy,
				this.game.turretProperties.targetDistance
			),
			new Ammo(MAX_AMMO, ammoBar),
		],
		children: [ammoBar],
	})
}
