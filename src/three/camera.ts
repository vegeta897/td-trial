import CameraControls from 'camera-controls'
import { ThreeApp } from './three-app'
import { OrthographicCamera } from 'three'

export function setupCamera({ camera, cameraControls, center }: ThreeApp) {
	// Set up camera
	camera.position.setFromSphericalCoords(
		100, // Distance
		Math.PI / 4, // Pitch
		(Math.PI * 2) / 6 // Yaw
	)
	camera.lookAt(center)

	// Set up camera controls
	cameraControls.distance = 100
	cameraControls.minZoom = 0.1
	cameraControls.maxZoom = 7
	cameraControls.maxPolarAngle = Math.PI * 0.45
	cameraControls.setTarget(center.x, center.y, center.z)
	cameraControls.polarAngle = Math.PI / 4
	cameraControls.azimuthAngle = (Math.PI * 2) / 6
	cameraControls.mouseButtons.left = CameraControls.ACTION.NONE
	cameraControls.mouseButtons.right = CameraControls.ACTION.ROTATE
	cameraControls.mouseButtons.middle = CameraControls.ACTION.TRUCK
	cameraControls.polarRotateSpeed = 0.5
	cameraControls.azimuthRotateSpeed = 0.7
	cameraControls.dampingFactor = 0.01
	cameraControls.draggingDampingFactor = 0.02
}

export function updateCamera(camera: OrthographicCamera, scale: number) {
	const aspect = window.innerWidth / window.innerHeight
	camera.left = -aspect * scale
	camera.right = aspect * scale
	camera.top = scale
	camera.bottom = -scale
	camera.updateProjectionMatrix()
}
