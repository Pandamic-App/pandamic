import GameState, { getDefaultGameState } from "../models/redux/GameState";
import { AsyncStorage } from "react-native";

const GAME_STATE_KEY = "state";
const CLEAN = false;


export default abstract class PersistState
{

	public static async loadState(): Promise<GameState | null>
	{
		let resultState = null;
		if (CLEAN)
		{
			console.log("sas")
			await AsyncStorage.removeItem(GAME_STATE_KEY);
			let df = getDefaultGameState();
			df.metadataState.loaded = true;
			resultState = df;
		}
		let res = await AsyncStorage.getItem(GAME_STATE_KEY);
		if (res)
		{
			try
			{

				resultState = JSON.parse(res) as GameState;
				resultState.metadataState.infoScreenOpen = false;
			}
			catch
			{
			}
		}
		resultState!.metadataState.infoScreenOpen = false;
		resultState!.metadataState.loaded = true;
		return resultState;
	}

	public static async saveState(state: GameState)
	{
		await AsyncStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
	}
}
