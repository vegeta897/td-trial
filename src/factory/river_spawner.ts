import Factory from './index'
import Emitter, { EmitterType } from '../components/com_emitter'
import {
	BufferGeometry,
	Line,
	Line3,
	LineBasicMaterial,
	Quaternion,
	Vector3,
} from 'three'

const SPAWN_INTERVAL = 50

export function createRiverSpawner(
	this: Factory,
	position: Vector3,
	width = 1,
	direction = new Quaternion()
) {
	const halfWidth = new Vector3(width / 2).applyQuaternion(direction)
	const spawnLine = new Line3(
		position.clone().add(halfWidth),
		position.clone().sub(halfWidth)
	)
	const lineGeometry = new BufferGeometry().setFromPoints([
		spawnLine.start,
		spawnLine.end,
	])
	const lineObject = new Line(
		lineGeometry,
		new LineBasicMaterial({ color: 0x00ffff })
	)
	this.createGameObject({
		transform: { position },
		object3D: lineObject,
		additionalComponents: [
			new Emitter(
				EmitterType.RiverSpawner,
				SPAWN_INTERVAL,
				position,
				0,
				true,
				false,
				direction,
				spawnLine
			),
		],
	})
}
