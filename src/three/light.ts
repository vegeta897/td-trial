import { AmbientLight, DirectionalLight, Scene } from 'three'

export function setupLights(scene: Scene) {
	const ambientLight = new AmbientLight(0x5d275d, 1.5)
	scene.add(ambientLight)
	const directionalLight = new DirectionalLight(0xffffff, 1)
	directionalLight.position.set(30, 50, -20)
	directionalLight.castShadow = true
	directionalLight.shadow.camera.left = -20
	directionalLight.shadow.camera.right = 10
	directionalLight.shadow.camera.bottom = -14
	directionalLight.shadow.camera.top = 12
	directionalLight.shadow.mapSize.width = 4096
	directionalLight.shadow.mapSize.height = 4096
	directionalLight.shadow.camera.updateProjectionMatrix()
	scene.add(directionalLight)
}
