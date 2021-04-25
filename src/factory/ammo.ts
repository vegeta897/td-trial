import { GameObjectTypes } from '../game'
import { createMesh } from '../three/objects'
import { Quaternion, Vector3 } from 'three'
import Velocity3D from '../components/com_velocity3d'
import GameObject from './game_object'

const AMMO_SCALE = 0.2

const ammoPrototype = createMesh({
	materialParams: { color: 0x73eff7 },
})

export default class Ammo extends GameObject {
	constructor(loaderPosition: Vector3, loaderDirection: Quaternion) {
		super(GameObjectTypes.Ammo, ammoPrototype.clone())
		const rotation = loaderDirection.clone()
		this.transform = {
			position: loaderPosition,
			rotation,
			scale: new Vector3().setScalar(AMMO_SCALE),
		}
		this.additionalComponents = [
			new Velocity3D(new Vector3(0, 0, 0.1).applyQuaternion(rotation)),
		]
	}
}
