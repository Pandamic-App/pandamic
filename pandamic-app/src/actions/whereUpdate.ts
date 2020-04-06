import { createAction } from "redux-actions";

export const whereUpdate = createAction<WhereUpdateAction>("whereUpdate");
export interface WhereUpdateAction
{
	isAtHome:boolean
}
