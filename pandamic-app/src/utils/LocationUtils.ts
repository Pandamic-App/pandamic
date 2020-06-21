import { Platform } from "react-native";
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as TaskManager from 'expo-task-manager';
import LatLong from "../models/LatLong";
import store from "../store";
import { whereUpdate } from "../actions";

const L_TASK_NAME = "homer";
const UPDATES_TASK = ""
const RAD_TOLERANCE = 100;

export async function askLocationPermissions() : Promise<boolean>
{
	if (Platform.OS === "android" && !Constants.isDevice)
	{
		return false;
	}

	let { status } = await Permissions.askAsync(Permissions.LOCATION);
	if (status !== 'granted')
	{
		return false;
	}
	return true;
}

/*
This API is a piece of shit I have never seen before so fucking useless and does shit ass as the specs and can suck my hairy balls omg
*/

export async function makeSureLocationsFetching(home:LatLong)
{
	console.log("fencing");
	let fencing = (await Location.hasStartedGeofencingAsync(L_TASK_NAME));
	if (!fencing)
	{
		startShit(home);
	}
	else
	{
		await stopGeofencing(),
		await startShit(home);
	}
}

export async function startShit(home:LatLong)
{
	console.log("started fencing!");
	await Location.startGeofencingAsync(L_TASK_NAME, [{
		latitude: home.lat,
		longitude: home.lng,
		radius: RAD_TOLERANCE,
		notifyOnEnter: true,
		notifyOnExit: true
	}]);
}


export async function stopGeofencing()
{
	try{
		while (true){
			await Location.stopGeofencingAsync(L_TASK_NAME);
		}
	}
	catch
	{
		return;
	}
}



export function outsideOfHome(home: LatLong, at: LatLong): boolean
{
	let dist = distance(home.lat,home.lng,at.lat,at.lng,"K")*1000;
	console.log(dist , " messze.");
	return (dist >= RAD_TOLERANCE);
}

function distance(lat1:number, lon1:number, lat2:number, lon2:number, unit:"M"|"K"|"N") : number
{
	if ((lat1 == lat2) && (lon1 == lon2))
	{
		return 0;
	}
	else
	{
		var radlat1 = Math.PI * lat1 / 180;
		var radlat2 = Math.PI * lat2 / 180;
		var theta = lon1 - lon2;
		var radtheta = Math.PI * theta / 180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1)
		{
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180 / Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit == "K") { dist = dist * 1.609344 }
		if (unit == "N") { dist = dist * 0.8684 }
		return dist;
	}
}
