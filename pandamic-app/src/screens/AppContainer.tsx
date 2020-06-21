import React, { useEffect, useState } from 'react';
import { StyleSheet,View, AsyncStorage,Text } from 'react-native';
import { AppLoading } from "expo";
import { useFonts } from '@use-expo/font';
import useInterval from 'use-interval'

import GreetingScreen from './GreetingScreen';
import GameState, { getTestingGameState } from '../models/redux/GameState';
import { useSelector, useDispatch } from 'react-redux';
import useThunkDispatch from '../hooks/useThunkDispatch';
import { thunkLoadGameFromStorage, loadGameFromStorage, thunkOnInterval, whereUpdate } from '../actions';
import { askLocationPermissions, makeSureLocationsFetching, stopGeofencing, outsideOfHome } from '../utils/LocationUtils';
import HomeScreen from './HomeScreen';
import LocationUpdater from '../components/LocationUpdater';
import LatLong from '../models/LatLong';
import * as Location from "expo-location";
import NotAtHomeScreen from './NotAtHomeScreen';
import { dispatchUpdateHappiness } from '../utils/HappinessUtils';
import { dispatchNewTasks, dispatchPedometerUpdates } from '../utils/TaskerUtil';
import PedometerWatcher from '../components/PedometerWatcher';
import { updateStepsForTasks } from '../actions/updateStepsForTasks';

const TEST = false;

const AppContainer:React.FC<{}> = (props) =>
{
	const loadedState = useSelector((state:GameState)=>state.metadataState.loaded);
	const hasAccount = useSelector((state:GameState)=>state.metadataState.loaded ? state.metadataState.hasAccount : false);
	const taskState = useSelector((state:GameState)=>state.taskState);
	const [shit,setShit] = useState<unknown|undefined>();
	const otherErr = useSelector((state: GameState) => state.metadataState.otherError);

	const dispatch = useThunkDispatch();
	const home = useSelector((state:GameState)=>{
		if (state.metadataState.loaded)
			if (state.metadataState.hasAccount)
				return state.metadataState.baseLocation;

		return undefined;
	});
	const isAtHome = useSelector((state:GameState)=>state.taskState.isAtHome);

	function handleNewLocation(loc:LatLong)
	{
		console.log(loc);
		if (home)
			if (outsideOfHome(home,loc)){
				dispatch(whereUpdate({isAtHome:false}));
			}
			else
			{
				dispatch(whereUpdate({ isAtHome: true }));
			}
	}

	function handleNewSteps(steps:number)
	{
		let steppingTasks = taskState.onGoingTasks.filter(xx => xx.requiresSteps);
		let updates = [];

		for (let tk of steppingTasks)
		{
			let atSteps = Math.min(tk.atStepts! + steps,tk.requiresSteps!);
			updates.push({ id: tk.id, steps: atSteps });
		}

		dispatch(updateStepsForTasks({ updates }));
	}

	useEffect(()=>{
		async function load()
		{
			if (TEST)
			{
				AsyncStorage.clear();
				let ss = getTestingGameState();
				dispatch(loadGameFromStorage({ gameState: ss}));
				if (ss.metadataState.loaded)
					if (ss.metadataState.hasAccount)
						await makeSureLocationsFetching(ss.metadataState.baseLocation!);
			}
			else
			{
				//await AsyncStorage.clear();
				dispatch(thunkLoadGameFromStorage() as any)
			};
		}
		try {load();}
		catch(ex)
		{
			setShit(ex);
		}


		return ()=>{
			//Dispose
			console.log("stop")
			stopGeofencing();
		}
	},[])


	useInterval(()=>{
		try{
			if (hasAccount && isLoaded && loadedState){
				dispatchUpdateHappiness(dispatch,taskState);
				dispatchNewTasks(dispatch,taskState);
				dispatchPedometerUpdates(dispatch,taskState);
			}
		}catch(ex)
		{
			setShit(ex);
		}
	},1000);

	const [isLoaded] = useFonts({
		"regular": require("../../assets/fonts/NeuePixelSans.ttf"),
		"bold": require("../../assets/fonts/BPdotsSquares-Bold.otf")
	});


	if (shit !== undefined)
	{
		return <Text style={styles.err}>Other error : {JSON.stringify(shit)}</Text>
	}

	if (!isLoaded || !loadedState)
	{
		return <Text style={styles.err}>Loading .... {isLoaded ? "elso" : "nem elso"}-{loadedState ? "masodik" : "nem masodik"} {otherErr}</Text>
	}

	try{
		return  (
		<React.Fragment>
			<LocationUpdater cb={handleNewLocation}/>
			<PedometerWatcher cb={handleNewSteps}/>
				{(hasAccount ? (isAtHome ? <HomeScreen /> : <NotAtHomeScreen />) : <GreetingScreen />)}
		</React.Fragment>);
	}catch(ex)
	{
		return <Text style={styles.err}>Render error: {JSON.stringify(ex)}</Text>
	}
}

export default AppContainer;

const styles = StyleSheet.create({
	container: {

	},
	err:{
		color:"black",
		marginTop:60
	}
});
