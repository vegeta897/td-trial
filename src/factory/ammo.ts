import Factory from './'
import { GameObjectTypes } from '../game'
import { createMesh } from '../three/objects'
import { Quaternion, Vector3 } from 'three'
import Velocity3D from '../components/com_velocity3d'

const AMMO_SCALE = 0.2

const ammoPrototype = createMesh({
	materialParams: { color: 0x73eff7 },
})

export function createAmmo(
	this: Factory,
	loaderPosition: Vector3,
	loaderDirection: Quaternion
) {
	const rotation = loaderDirection.clone()
	this.createGameObject({
		transform: {
			position: loaderPosition,
			rotation,
			scale: new Vector3().setScalar(AMMO_SCALE),
		},
		object3D: ammoPrototype.clone(),
		gameObjectType: GameObjectTypes.Ammo,
		additionalComponents: [
			new Velocity3D(new Vector3(0, 0, 0.1).applyQuaternion(rotation)),
		],
	})
}
