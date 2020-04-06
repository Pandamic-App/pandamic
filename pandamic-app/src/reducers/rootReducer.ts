import { combineReducers, AnyAction } from "redux";
import GameState from "../models/redux/GameState";
import metadataReducer, { getDefaultMetadataState } from "./metadataReducer";
import { loadGameFromStorage, LoadGameFromStorageAction } from "../actions";
import taskReducer, { getDefaultTaskState } from "./taskReducer";

export function getDefaultGameState() : GameState
{
	return {
		metadataState:getDefaultMetadataState(),
		taskState:getDefaultTaskState()
	}
}

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
