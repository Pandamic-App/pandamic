import TaskState from "../models/redux/TaskState";
import moment from "moment";
import { Action, Dispatch } from "redux";
import { updateHappiness } from "../actions";

const MINUS_HAPPINESS_PER_SEC = 0.005/60*2;

export function calculateMinusHappinessFromNotBeingHome(taskState:TaskState)
{
	let timeElapsedFromHome = moment().diff(moment(taskState.lastAtHome), "seconds");
	return timeElapsedFromHome * MINUS_HAPPINESS_PER_SEC;
}

export function dispatchUpdateHappiness(dispatch:Dispatch<Action<any>>,taskState:TaskState)
{
	if (!taskState.isAtHome)
	{
		let minus = calculateMinusHappinessFromNotBeingHome(taskState);
		dispatch(updateHappiness({newHappiness: Math.max(taskState.lastHappinessWhenHome-minus,0)}));
	}
}
