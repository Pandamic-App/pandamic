import { createAction } from "redux-actions";

export const updateStepsForTasks = createAction<UpdateStepsForTasksAction>("updateStepsForTasks");
export interface UpdateStepsForTasksAction
{
	updates:{id:string,steps:number}[]
}
