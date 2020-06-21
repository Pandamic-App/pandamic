import { createAction } from "redux-actions";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import GameState from "../models/redux/GameState";
import PersistState from "../utils/PersistState";
import { makeSureLocationsFetching, outsideOfHome } from "../utils/LocationUtils";
import * as Location from "expo-location";
import LatLong from "../models/LatLong";


export const loadGameFromStorage = createAction<LoadGameFromStorageAction>("loadGameFromStorage");
export interface LoadGameFromStorageAction
{
	gameState: GameState
}

export function thunkLoadGameFromStorage(): ThunkAction<void, GameState, {}, AnyAction>
{
	return async (dispatch, getState) =>
	{
		try
		{
			let oldState = await PersistState.loadState();
			let newState = Object.assign({}, oldState ? oldState : getState());
			newState.metadataState.loaded = true;

			if (newState.metadataState.loaded && newState.metadataState.hasAccount)
			{
				let didStart = await makeSureLocationsFetching(newState.metadataState.baseLocation!);
				if (!didStart)
					newState.metadataState.otherError = "fencing off";
			}

			if (newState.metadataState.hasAccount && newState.metadataState.baseLocation)
			{
				let at = await Location.getCurrentPositionAsync();
				let atLatLng: LatLong = { lat: at.coords.latitude, lng: at.coords.longitude };

				newState.taskState.isAtHome = !outsideOfHome(newState.metadataState.baseLocation!, atLatLng);
			}

			dispatch(loadGameFromStorage({ gameState: newState }))
		} catch (ex)
		{
			let errState = getState();
			errState.metadataState.loaded = false;
			errState.metadataState.otherError = JSON.stringify(ex);
			dispatch(loadGameFromStorage({ gameState: errState }))
		}
	}
}
