import { createAction } from "redux-actions";
import { PandaTask, DoingPandaTask } from "../models/PandaTask";

export const addNewTasks = createAction<AddNewTasksAction>("addNewTasks");
export interface AddNewTasksAction
{
	tasks:DoingPandaTask[]
}
