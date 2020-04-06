import React from 'react';
import {Pedometer} from "expo-sensors";

export interface Props
{
	cb(steps:number):void
}

export interface State
{

}

class PedometerWatcher extends React.Component<Props,State>
{
	constructor(props:Props)
	{
		super(props);

		this.state = {

		};
	}

	removeWatcher: undefined | (() => void);

	async componentDidMount()
	{
		this.removeWatcher = (await Pedometer.watchStepCount((obj)=>{this.props.cb(obj.steps)})).remove;
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

export default PedometerWatcher;
