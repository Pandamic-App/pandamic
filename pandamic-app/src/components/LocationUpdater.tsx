import React from 'react';
import * as Location from "expo-location";
import LatLong from '../models/LatLong';


export interface Props
{
	cb:(loc:LatLong)=>void
}

export interface State
{

}

class LocationUpdater extends React.Component<Props,State>
{
	constructor(props:Props)
	{
		super(props);

		this.state = {

		};
	}

	removeWatcher:undefined | (()=>void);

	async componentDidMount()
	{
		this.removeWatcher = (await Location.watchPositionAsync({
			accuracy: Location.Accuracy.Highest,
			timeInterval: 300,
			mayShowUserSettingsDialog: true
		},
			(loc) => { this.props.cb({ lat: loc.coords.latitude, lng: loc.coords.longitude }) }
		)).remove;
	}

	componentWillUnmount()
	{
		if (this.removeWatcher)
		{
			this.removeWatcher();
		}
	}

	render(){
		return (
			null
		);
	}
}

export default LocationUpdater;
