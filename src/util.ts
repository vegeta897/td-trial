import Transform3D from './components/com_transform3d'

export function cloneTransform3D(transform: Transform3D): Transform3D {
	return new Transform3D(transform.position.clone(), transform.rotation.clone())
}
