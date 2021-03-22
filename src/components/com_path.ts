import { PathNode } from '../level'

export default class Path {
	constructor(
		public node: PathNode,
		public distance = 0,
		public progress = 0
	) {}
}
