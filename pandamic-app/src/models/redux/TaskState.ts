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
