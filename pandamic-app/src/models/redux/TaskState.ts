import { PandaTask, DoingPandaTask } from "../PandaTask";

export default interface TaskState
{
	isAtHome:boolean,
	lastAtHome:Date,
	happiness:number,
	lastHappinessWhenHome:number,
	lastUpdatedHappiness:Date,

	lastGotTask:Date,
	xp:number,
	onGoingTasks:DoingPandaTask[]
}

export function getDefaultTaskState(): TaskState
{
	return ({
		happiness: 1,
		lastAtHome: new Date(),
		isAtHome: false,
		lastHappinessWhenHome: 1,
		lastUpdatedHappiness: new Date(),
		lastGotTask: new Date(),
		onGoingTasks: [],
		xp: 0
	});
}
