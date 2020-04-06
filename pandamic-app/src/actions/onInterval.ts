import { createAction } from "redux-actions";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import memoizeOne from 'memoize-one';
import GameState from "../models/redux/GameState";

export const onInterval = createAction<OnIntervalAction>("onInterval");
export interface OnIntervalAction
{
	extraCoins:number
}

export function thunkOnInterval(): ThunkAction<void, GameState,{},AnyAction>
{
	return async (dispatch,getState)=>
	{
		let state = getState();

		//dispatch(onInterval({extraCoins:coins}));
	}
}
