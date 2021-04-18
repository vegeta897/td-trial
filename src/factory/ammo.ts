import Factory from './index'
import { GameObjectTypes } from '../game'
import { createMesh } from '../three/objects'
import { Quaternion, Vector3 } from 'three'
import Velocity3D from '../components/com_velocity3d'

const AMMO_SCALE = 0.2

export function createAmmoPrototype(factory: Factory) {
	factory.prototypes.set(
		GameObjectTypes.Ammo,
		createMesh({
			materialParams: {
				color: 0x73eff7,
			},
		})
	)
}

export function createAmmo(
	this: Factory,
	loaderPosition: Vector3,
	loaderDirection: Vector3
) {
	const rotation = new Quaternion().setFromUnitVectors(
		new Vector3(0, 0, 1),
		loaderDirection
	)
	this.createGameObject({
		transform: {
			position: loaderPosition,
			rotation,
			scale: new Vector3().setScalar(AMMO_SCALE),
		},
		gameObjectType: GameObjectTypes.Ammo,
		additionalComponents: [
			new Velocity3D(new Vector3(0, 0, 0.1).applyQuaternion(rotation)),
		],
	})
}
