import CameraControls from 'camera-controls'
import { ThreeApp } from './three_app'
import { OrthographicCamera, Vector3 } from 'three'
import { FLOOR_Y, Level } from '../game/level'

const CAMERA_DISTANCE = 100

export function setupCameraControls({ cameraControls }: ThreeApp) {
	// Set up camera controls
	cameraControls.distance = CAMERA_DISTANCE
	cameraControls.minZoom = 0.1
	cameraControls.maxZoom = 7
	cameraControls.maxPolarAngle = Math.PI * 0.45
	cameraControls.setTarget(Level.Origin.x, FLOOR_Y, Level.Origin.y)
	cameraControls.polarAngle = Math.PI / 4
	cameraControls.azimuthAngle = (Math.PI * 2) / 6
	cameraControls.mouseButtons.left = CameraControls.ACTION.NONE
	cameraControls.mouseButtons.right = CameraControls.ACTION.ROTATE
	cameraControls.mouseButtons.middle = CameraControls.ACTION.TRUCK
	cameraControls.dollyToCursor = true
	cameraControls.polarRotateSpeed = 0.5
	cameraControls.azimuthRotateSpeed = 0.7
	cameraControls.dampingFactor = 0.01
	cameraControls.draggingDampingFactor = 0.02

	const t = new Vector3()
	const p = new Vector3()
	const cameraToTarget = new Vector3()
	const yIntersect = new Vector3()
	cameraControls.addEventListener('update', () => {
		// Keep target at y = 0 and camera distance constant
		cameraControls.getTarget(t)
		cameraControls.getPosition(p)
		// Extend camera-target vector to y = 0
		cameraToTarget.subVectors(p, t)
		yIntersect.copy(t.addScaledVector(cameraToTarget, t.y / (t.y - p.y)))
		cameraControls.setTarget(yIntersect.x, 0, yIntersect.z)
		// Move camera to appropriate distance
		yIntersect.add(cameraToTarget.setLength(CAMERA_DISTANCE))
		cameraControls.setPosition(yIntersect.x, yIntersect.y, yIntersect.z)
	})
}

export function updateCamera(camera: OrthographicCamera, scale: number) {
	const aspect = window.innerWidth / window.innerHeight
	camera.left = -aspect * scale
	camera.right = aspect * scale
	camera.top = scale
	camera.bottom = -scale
	camera.updateProjectionMatrix()
}
