import { combineReducers, AnyAction } from "redux";
import GameState from "../models/redux/GameState";
import metadataReducer from "./metadataReducer";
import { loadGameFromStorage, LoadGameFromStorageAction } from "../actions";
import taskReducer from "./taskReducer";



const combinedReducer = combineReducers<GameState>({
	metadataState: metadataReducer,
	taskState:taskReducer
});

const rootReducer = (state:GameState,action:AnyAction) =>
{
	if (action.type === loadGameFromStorage.toString())
	{
		let payload = (action as any).payload as LoadGameFromStorageAction;
		let newState = Object.assign({},payload.gameState);
		return newState;
	}
	return combinedReducer(state,action)
}

export default rootReducer;
