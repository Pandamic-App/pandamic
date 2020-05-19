import { createAction } from "redux-actions";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import GameState from "../models/redux/GameState";
import LatLong from "../models/LatLong";
import { makeSureLocationsFetching } from "../utils/LocationUtils";

export const createAccount = createAction<CreateAccountAction>("createAccount");
export interface CreateAccountAction
{
	home:LatLong
}

export function thunkCreateAccount(home: LatLong, age: number): ThunkAction<void, GameState,{},AnyAction>
{
	return async (dispatch,getState)=>
	{
		//TODO : SEND AGE TO SERVER
		console.log("setting home",home);
		await makeSureLocationsFetching(home);
		dispatch(createAccount({home}))
	}
}
