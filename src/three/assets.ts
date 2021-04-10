import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { ThreeApp } from './three-app'
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils'
import { Mesh } from 'three'
import turretObj from '../assets/turret.obj'

export async function loadAssets(this: ThreeApp) {
	const loader = new OBJLoader()
	const turretGroup = await loader.loadAsync(turretObj)
	const turretGeometry = BufferGeometryUtils.mergeVertices(
		(<Mesh>turretGroup.children[0]).geometry,
		0.01
	)
	turretGeometry.translate(0, -0.5, 0)
	this.assets.set(AssetNames.TurretGeometry, turretGeometry)
}

export enum AssetNames {
	TurretGeometry,
}
