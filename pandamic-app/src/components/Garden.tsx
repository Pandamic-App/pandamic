import React from 'react';
import { StyleSheet,View,Image, Dimensions, ImageBackground } from 'react-native';
import HardBorder from './HardBorder';
import HapinessBar from './HapinessBar';
import Panda from './Panda';
import { useSelector } from 'react-redux';
import GameState from '../models/redux/GameState';
const garden = require("../../assets/garden.png");

export interface Props
{

}

const ScreenSize = Dimensions.get("window");
const ASPECT = 1.0557;

const Garden:React.FC<Props> = (props) =>
{
	const happiness = useSelector((game:GameState)=>game.taskState.happiness);
	let pandaType:"happy"|"sad"|"normal" = "normal";
	if (happiness <= 0.3)
	{
		pandaType = "sad"
	}
	else if (happiness >= 0.7)
	{
		pandaType = "happy";
	}

	return (
		<View>
			<ImageBackground source={garden} style={styles.garden}>
				<Panda
					type={pandaType}
				/>
			</ImageBackground>
		</View>
	);
}

export default Garden;

const styles = StyleSheet.create({
	garden: {
		width:ScreenSize.width,resizeMode:"stretch",
		height:ScreenSize.width * ASPECT,
		display:"flex",
		justifyContent:"center",
		alignItems:"center"
	},
});
