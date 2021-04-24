import Factory from './'
import Emitter, { EmitterType } from '../components/com_emitter'
import {
	BufferGeometry,
	Euler,
	Line,
	Line3,
	LineBasicMaterial,
	Quaternion,
	Vector3,
} from 'three'

const SPAWN_INTERVAL = 100

export function createRiverSpawner(
	this: Factory,
	position: Vector3,
	width = 1,
	angle = 0
) {
	const lineAngle = new Euler(0, angle + Math.PI / 2)
	const halfWidth = new Vector3(width / 2).applyEuler(lineAngle)
	const lineGeometry = new BufferGeometry().setFromPoints([
		new Vector3().add(halfWidth),
		new Vector3().sub(halfWidth),
	])
	const lineObject = new Line(
		lineGeometry,
		new LineBasicMaterial({ color: 0x00ffff })
	)
	// halfWidth.applyEuler(lineAngle) // Rotate for global spawn line points
	this.createGameObject({
		transform: { position },
		object3D: lineObject,
		additionalComponents: [
			new Emitter(
				EmitterType.RiverSpawner,
				SPAWN_INTERVAL,
				position,
				SPAWN_INTERVAL - 1,
				true,
				false,
				new Quaternion().setFromEuler(new Euler(0, angle)),
				new Line3(
					position.clone().add(halfWidth),
					position.clone().sub(halfWidth)
				)
			),
		],
	})
}
