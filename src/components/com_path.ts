import { PathNode } from '../level'

export default class Path {
	constructor(
		public fromNode: PathNode,
		public toNode?: PathNode,
		public distance = 0,
		public progress = 0
	) {}
}
