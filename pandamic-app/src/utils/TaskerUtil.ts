import { PandaTask, DoingPandaTask } from "../models/PandaTask";
import { Dispatch, Action } from "redux";
import TaskState from "../models/redux/TaskState";
import moment from "moment";
import { addNewTasks } from "../actions";
import { makeRandomId } from "./Utils";
import { Pedometer } from 'expo-sensors';
import Prando from "prando";
import { updateStepsForTasks } from "../actions/updateStepsForTasks";

const CHANCE_FOR_NEW_TASK_PER_MIN = 1/2;
const MAX_TASKS = 5;

const AllTasks:PandaTask[] = require("../../assets/tasks.json");

function getSecondsToday() : number
{
	let date = new Date();
	let ss = 0;
	ss += date.getHours() *60*60;
	ss += date.getMinutes() * 60;
	ss += date.getSeconds();
	return ss;
}

function getSecondsFromTimeString(ss:string) : number | null
{
	try {
		let tokens = ss.split(":").map(xx=>Math.abs(parseInt(xx)));
		let secs = 0;
		secs += tokens[0] * 60*60;
		secs += tokens[1] * 60;
		secs += tokens[0];
		return secs;
	}
	catch{}
	return null;
}

function getEligiblePandaTasks(ongoing:DoingPandaTask[ ]) : PandaTask[]
{
	let tasks = Array.from(AllTasks.filter(xx=>!xx.fromTime));
	let secondsToday = getSecondsToday();

	for (let task of AllTasks)
	{
		if (task.fromTime && task.toTime)
		{
			let fromTime = getSecondsFromTimeString(task.fromTime!);
			let toTime = getSecondsFromTimeString(task.toTime!);
			if (fromTime && toTime)
			{
				if (secondsToday >= fromTime && secondsToday <= toTime)
				{
					tasks.push(task);
				}
			}
		}
	}
	return tasks.filter(xx => !ongoing.some(ll => ll.question == xx.question));
}

function pickRandom<T>(alls:T[]) : T
{
	let ii = Math.floor(Math.random() * alls.length);
	return alls[ii];
}

export function dispatchNewTasks(dispatch: Dispatch<Action<any>>, taskState: TaskState)
{
	if (taskState.isAtHome)
	{
		let lastTask = moment(taskState.lastGotTask);
		let minutesSinceLastTask = moment().diff(lastTask,"minutes");
		let newTasks:DoingPandaTask[] = [];
		let giveableTasks = getEligiblePandaTasks(taskState.onGoingTasks);

		for (let ii =0; ii < minutesSinceLastTask;ii++)
		{
			let atmin = lastTask.add(ii,"minutes");
			let seed = `${atmin.hours()}:${atmin.minutes()}`;
			let prn = new Prando(seed);
			if (prn.next() <= CHANCE_FOR_NEW_TASK_PER_MIN)
			{
				let base = pickRandom(giveableTasks);
				let newTask: DoingPandaTask = { ...base, id: makeRandomId(10),startedAt:new Date()};
				newTasks.push(newTask);
			}
		}
		if (newTasks.length > 0)
		{
			let rem = MAX_TASKS -  taskState.onGoingTasks.length;
			if (newTasks.length > rem)
			{
				newTasks = newTasks.slice(0,rem);
			}
			dispatch(addNewTasks({tasks:newTasks}));
		}

	}
}


export async function dispatchPedometerUpdates(dispatch: Dispatch<Action<any>>, taskState: TaskState)
{
	if (await Pedometer.isAvailableAsync())
	{
		let steppingTasks = taskState.onGoingTasks.filter(xx=>xx.requiresSteps);
		let updates = [];
		for (let tk of steppingTasks)
		{
			try{
				let resp = await Pedometer.getStepCountAsync(moment(tk.startedAt).toDate(), moment().toDate());
				if (resp.steps !== 0)
				{
					updates.push({id:tk.id,steps:resp.steps});
				}
			}catch{}
		}

		dispatch(updateStepsForTasks({updates}));
	}
}
