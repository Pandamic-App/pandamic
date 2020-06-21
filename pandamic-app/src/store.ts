import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunkMiddleware from "redux-thunk";
import PersistState from "./utils/PersistState";
import GameState from "./models/redux/GameState";
import { Platform } from "react-native";
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as TaskManager from 'expo-task-manager';
import { whereUpdate } from "./actions/whereUpdate";

const store = createStore(rootReducer as any, undefined, applyMiddleware(thunkMiddleware))
var CallCounter =0;

store.subscribe(()=>{
	CallCounter++;

	if (CallCounter % 5 == 0)
	{
		CallCounter = 0;

		PersistState.saveState(store.getState() as GameState);
	}
})

export default store;

const L_TASK_NAME = "homer";
TaskManager.defineTask(L_TASK_NAME, ({ data, error }) =>
{
	try
	{
		if (error)
			return;

		let _data = data as { eventType: Location.GeofencingEventType, region: Location.LocationRegion };

		if (_data.eventType === Location.GeofencingEventType.Enter)
		{
			console.log("entering home");
			store.dispatch(whereUpdate({ isAtHome: true }));
		}
		else if (_data.eventType === Location.GeofencingEventType.Exit)
		{
			console.log("Exiting home");
			store.dispatch(whereUpdate({ isAtHome: false }));
		}
	} catch (ex)
	{
		store.dispatch(whereUpdate({ isAtHome: true }))
	}
});
