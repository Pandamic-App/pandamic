import { createAction } from "redux-actions";

export const updateHappiness = createAction<UpdateHappinessAction>("updateHappiness");
export interface UpdateHappinessAction
{
	newHappiness:number
}
