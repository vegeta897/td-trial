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
import GameObject, { GameObjectTypes } from './game_object'

const SPAWN_INTERVAL = 200

const lineGeometry = new BufferGeometry().setFromPoints([
	new Vector3(0.5),
	new Vector3(-0.5),
])
const riverSpawnerPrototype = new Line(
	lineGeometry,
	new LineBasicMaterial({ color: 0x00ffff })
)

export default class RiverSpawner extends GameObject {
	constructor(position: Vector3, width = 1, direction: 0 | 1 | 2 | 3 = 0) {
		super(GameObjectTypes.RiverSpawner, riverSpawnerPrototype.clone())
		const angle = direction * (Math.PI / 2)
		const lineAngle = new Euler(0, angle + Math.PI / 2)
		const halfWidth = new Vector3(width / 2).applyEuler(lineAngle)
		this.transform = {
			position,
			rotation: new Quaternion().setFromEuler(lineAngle),
			scale: new Vector3(width),
		}
		const lineStart = position.clone().sub(halfWidth)
		const lineEnd = position.clone().add(halfWidth)
		this.additionalComponents = [
			new Emitter(
				EmitterType.RiverSpawner,
				SPAWN_INTERVAL,
				position,
				SPAWN_INTERVAL - 1,
				true,
				false,
				new Quaternion().setFromEuler(new Euler(0, angle)),
				new Line3(lineStart, lineEnd)
			),
		]
	}
}
