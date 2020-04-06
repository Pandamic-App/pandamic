import { createAction } from "redux-actions";

export const completeTask = createAction<CompleteTaskAction>("completeTask");
export interface CompleteTaskAction
{
	pressedYes:boolean,
	id:string
}
