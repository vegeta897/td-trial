import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { ThreeApp } from './three_app'
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils'
import { Mesh } from 'three'
import turretObj from '../assets/turret.obj'
import loaderObj from '../assets/loader.obj'

export enum AssetNames {
	TurretGeometry,
	LoaderGeometry,
}

const assetList: [AssetNames, string][] = [
	[AssetNames.TurretGeometry, turretObj],
	[AssetNames.LoaderGeometry, loaderObj],
]

export async function loadAssets(this: ThreeApp) {
	const loader = new OBJLoader()
	await Promise.all(
		assetList.map(async ([assetName, objPath]) => {
			const group = await loader.loadAsync(objPath)
			const geometry = BufferGeometryUtils.mergeVertices(
				(<Mesh>group.children[0]).geometry,
				0.01
			)
			geometry.translate(0, -0.5, 0)
			this.assets.set(assetName, geometry)
		})
	)
}
