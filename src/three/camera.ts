import CameraControls from 'camera-controls'
import { ThreeApp } from './three-app'
import { OrthographicCamera } from 'three'

export function setupCamera(threeApp: ThreeApp) {
	// Set up camera
	threeApp.camera.position.setFromSphericalCoords(
		100, // Distance
		Math.PI / 4, // Pitch
		(Math.PI * 2) / 6 // Yaw
	)
	threeApp.camera.lookAt(threeApp.center)

	// Set up camera controls
	threeApp.cameraControls.distance = 100
	threeApp.cameraControls.minZoom = 0.1
	threeApp.cameraControls.maxZoom = 7
	threeApp.cameraControls.maxPolarAngle = Math.PI * 0.45
	threeApp.cameraControls.setTarget(
		threeApp.center.x,
		threeApp.center.y,
		threeApp.center.z
	)
	threeApp.cameraControls.polarAngle = Math.PI / 4
	threeApp.cameraControls.azimuthAngle = (Math.PI * 2) / 6
	threeApp.cameraControls.mouseButtons.left = CameraControls.ACTION.NONE
	threeApp.cameraControls.mouseButtons.right = CameraControls.ACTION.ROTATE
	threeApp.cameraControls.mouseButtons.middle = CameraControls.ACTION.TRUCK
	threeApp.cameraControls.polarRotateSpeed = 0.5
	threeApp.cameraControls.azimuthRotateSpeed = 0.7
	threeApp.cameraControls.dampingFactor = 0.01
	threeApp.cameraControls.draggingDampingFactor = 0.02
}

export function updateCamera(camera: OrthographicCamera, scale: number) {
	const aspect = window.innerWidth / window.innerHeight
	camera.left = -aspect * scale
	camera.right = aspect * scale
	camera.top = scale
	camera.bottom = -scale
	camera.updateProjectionMatrix()
}
