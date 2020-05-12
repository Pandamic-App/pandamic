import { createAction } from "redux-actions";

export const toggleInfoScreen = createAction<ToggleInfoScreenAction>("toggleInfoScreen");
export interface ToggleInfoScreenAction
{
	newIsOpened:boolean
}
