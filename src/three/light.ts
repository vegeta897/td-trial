import {
	AmbientLight,
	CameraHelper,
	DirectionalLight,
	PCFSoftShadowMap,
} from 'three'
import { ThreeApp } from './three_app'

const SHOW_LIGHT_HELPER = false

export function setupLights({ scene, renderer }: ThreeApp) {
	renderer.shadowMap.type = PCFSoftShadowMap
	const ambientLight = new AmbientLight(0x5d275d, 1.5)
	scene.add(ambientLight)
	const directionalLight = new DirectionalLight(0xffffff, 1)
	directionalLight.position.set(30, 50, -20)
	directionalLight.castShadow = true
	directionalLight.shadow.camera.near = 10
	directionalLight.shadow.camera.far = 100
	directionalLight.shadow.camera.left = -40
	directionalLight.shadow.camera.right = 40
	directionalLight.shadow.camera.bottom = -40
	directionalLight.shadow.camera.top = 40
	directionalLight.shadow.mapSize.width = 4096
	directionalLight.shadow.mapSize.height = 4096
	directionalLight.shadow.camera.updateProjectionMatrix()
	scene.add(directionalLight)
	if (SHOW_LIGHT_HELPER)
		scene.add(new CameraHelper(directionalLight.shadow.camera))
}
