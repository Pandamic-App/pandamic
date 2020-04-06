---
to: src/actions/<%= name %>.ts
---
import { createAction } from "redux-actions";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import AppState from "../models/redux/AppState";

export const <%= name %> = createAction<<%= h.inflection.camelize(name,false) %>Action>("<%= name %>");
export interface <%= h.inflection.camelize(name,false) %>Action
{

}

export function thunk<%= h.inflection.camelize(name,false) %>(): ThunkAction<void,AppState,{},AnyAction>
{
	return async (dispatch,getState)=>
	{

	}
}
