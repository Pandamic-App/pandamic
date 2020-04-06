import { useEffect, useState } from "react";
import * as Location from "expo-location";
import LatLong from "../models/LatLong";

export function useWatchLocations (cb:(loc:LatLong)=>void)
{
	const [remove,setRemove] = useState< (()=>void) | undefined>(undefined);

	useEffect(()=>{
		Location.watchPositionAsync({
				accuracy:Location.Accuracy.Highest,
				timeInterval:300,
				mayShowUserSettingsDialog:true
			},
			(loc)=>{cb({lat:loc.coords.latitude,lng:loc.coords.longitude})}
		)
		.then((xx)=>{setRemove(xx.remove)})

		return ()=>{
			if(remove){
				console.log("remove");
				remove();
			}
		}
	});
}
