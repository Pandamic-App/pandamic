import { handleAction, handleActions } from "redux-actions";
import { Payload } from "../models/redux/Payload";
import TaskState from "../models/redux/TaskState";
import { whereUpdate, WhereUpdateAction, createAccount, CreateAccountAction, UpdateHappinessAction, updateHappiness, addNewTasks, AddNewTasksAction } from "../actions";
import { calculateMinusHappinessFromNotBeingHome } from "../utils/HappinessUtils";
import { completeTask, CompleteTaskAction } from "../actions/completeTask";
import { updateStepsForTasks, UpdateStepsForTasksAction } from "../actions/updateStepsForTasks";

export function getDefaultTaskState(): TaskState
{
	return ({
		happiness:1,
		lastAtHome:new Date(),
		isAtHome:false,
		lastHappinessWhenHome:1,
		lastUpdatedHappiness: new Date(),
		lastGotTask:new Date(),
		onGoingTasks:[],
		xp:0
	});
}

const taskReducer = handleActions<TaskState, Payload>(
	{
		[whereUpdate.toString()]:(state,action)=>{
			const payload = action.payload as WhereUpdateAction;
			let newLastHappniess = state.lastHappinessWhenHome;
			let newState = Object.assign({},state);
			newState.isAtHome = payload.isAtHome;
			newState.lastAtHome = payload.isAtHome ? new Date() : newState.lastAtHome;

			if (state.isAtHome !== payload.isAtHome)
			{
				//Change at homeness
				newLastHappniess = state.happiness;

				if (!state.isAtHome)
				{
					let minus = calculateMinusHappinessFromNotBeingHome(state);
					newState.happiness = Math.max(newState.happiness-minus,0);
				}
				newState.lastHappinessWhenHome = newLastHappniess;
			}

			return {...newState};
		},
		[updateHappiness.toString()]:(state,action)=>
		{
			const payload = action.payload as UpdateHappinessAction;

			return {...state,happiness:payload.newHappiness,lastUpdatedHappiness:new Date()};
		},
		[addNewTasks.toString()] : (state,action) =>
		{
			const payload = action.payload as AddNewTasksAction;

			return {...state,onGoingTasks:state.onGoingTasks.concat(payload.tasks),lastGotTask:new Date()}
		},
		[completeTask.toString()]:(state,action) =>
		{
			const payload = action.payload as CompleteTaskAction;
			let newGoings = Array.from(state.onGoingTasks);
			let hapinessBonus =0;

			let tk = state.onGoingTasks.find(xx=>xx.id === payload.id);
			if (tk)
			{
				const yesIsReallyGood = tk.yesIsGood === undefined ? true : tk.yesIsGood;
				if (payload.pressedYes == yesIsReallyGood)
				{
					hapinessBonus = tk.weight*0.5;
				}
				else
				{
					hapinessBonus = -tk.weight*0.3;
				}
				newGoings = newGoings.filter(xx=>xx.id !== payload.id);
			}
			return { ...state, happiness: Math.min(1, state.happiness + hapinessBonus),onGoingTasks:newGoings};
		},
		[updateStepsForTasks.toString()] : (state,action) =>
		{
			const payload = action.payload as UpdateStepsForTasksAction;
			let newOngoing = Array.from(state.onGoingTasks);
			let happinessBonus = 0;

			for (let up of payload.updates)
			{
				let tk = newOngoing.find(xx=>xx.id === up.id);

				if (tk)
				{
					if (tk.requiresSteps)
					{
						tk.atStepts = up.steps;

						if (tk.atStepts >= tk.requiresSteps)
						{
							happinessBonus += tk.weight*0.3;
						}
					}
				}
			}
			newOngoing = newOngoing.filter(xx=>xx.requiresSteps ? xx.atStepts ? xx.atStepts < xx.requiresSteps : true : true);

			return { ...state, onGoingTasks: newOngoing, happiness: Math.min(1, state.happiness + happinessBonus)};
		}
	},
	getDefaultTaskState()
);

export default taskReducer
