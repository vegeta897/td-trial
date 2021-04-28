import Transform3D from './components/com_transform3d'
import { BufferGeometry, CircleGeometry, Vector3 } from 'three'

export function cloneTransform3D(transform: Transform3D): Transform3D {
	return new Transform3D({
		position: transform.position.clone(),
		rotation: transform.rotation.clone(),
		scale: transform.scale.clone(),
	})
}

export function createLineCircleGeometry(
	radius = 1,
	segments = 64
): BufferGeometry {
	const points: Vector3[] = []
	const positions = new CircleGeometry(radius, segments).getAttribute(
		'position'
	)
	for (let p = 1; p < positions.count; p++) {
		points.push(new Vector3().fromBufferAttribute(positions, p))
	}
	return new BufferGeometry().setFromPoints(points)
}

// https://stackoverflow.com/a/39514270/2612679
export function assignDefined<T extends Record<keyof T, unknown>>(
	target: T,
	...sources: Partial<T>[]
) {
	for (const source of sources) {
		for (const key of Object.keys(source)) {
			const val = source[key as keyof T]
			if (val !== undefined) {
				target[key as keyof T] = val!
			}
		}
	}
	return target
}
