import { PandaTask, DoingPandaTask } from "../models/PandaTask";
import { Dispatch, Action } from "redux";
import TaskState from "../models/redux/TaskState";
import moment from "moment";
import { addNewTasks } from "../actions";
import { makeRandomId } from "./Utils";
import { Pedometer } from 'expo-sensors';
import Prando from "prando";
import { updateStepsForTasks } from "../actions/updateStepsForTasks";

const CHANCE_FOR_NEW_TASK_PER_MIN = 10/20;
const MAX_TASKS = 5;

const AllTasks:PandaTask[] = require("../../assets/tasks.json");

export function dispatchNewTasks(dispatch: Dispatch<Action<any>>, taskState: TaskState)
{
	if (taskState.isAtHome)
	{
		let lastTask = moment(taskState.lastGotTask);
		let minutesSinceLastTask = moment().diff(lastTask,"minutes");
		let newTasks:DoingPandaTask[] = [];
		for (let ii =0; ii < minutesSinceLastTask;ii++)
		{
			let atmin = lastTask.add(ii,"minutes");
			let seed = `${atmin.hours()}:${atmin.minutes()}`;
			let prn = new Prando(seed);
			if (prn.next() <= CHANCE_FOR_NEW_TASK_PER_MIN)
			{
				let base = AllTasks[Math.floor(Math.random() * AllTasks.length)];
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
