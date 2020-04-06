import React from 'react';
import { StyleSheet, View, Image, ViewStyle } from 'react-native';
import HardBorder from './HardBorder';
import PIX_SIZE from '../utils/Pixel';
import Colors from '../utils/Colors';
import { useSelector } from 'react-redux';
import GameState from '../models/redux/GameState';
const hearth = require("../../assets/hearth.png");

export interface Props
{
	style?:ViewStyle
}

const BAR_WIDTH = 68;
const BAR_HEIGHT = 6;
const BAR_INNER_HEIGHT = 4;
const BAR_INNER_WIDTH = 67;

const HapinessBar:React.FC<Props> = (props) =>
{
	const happiness = useSelector((state:GameState)=>state.taskState.happiness);

	return (
		<View style={[{height:9*PIX_SIZE,width:BAR_WIDTH*PIX_SIZE},props.style]}>
			<Image source={hearth} style={styles.hearth}/>
			<HardBorder
				bgColor={Colors.beige}
				width={BAR_WIDTH}
				height={BAR_HEIGHT}
				style={{position:"relative",top:-8*PIX_SIZE,left:1*PIX_SIZE}}
			>
				<View>
					<View style={{
						backgroundColor: "red",
						height:BAR_INNER_HEIGHT/2*PIX_SIZE,
						width: BAR_INNER_WIDTH * PIX_SIZE * happiness,
						zIndex:1200
					}} />
					<View style={{
						backgroundColor: "#960400",
						height: BAR_INNER_HEIGHT/2 * PIX_SIZE,
						width: BAR_INNER_WIDTH * PIX_SIZE * happiness,
						zIndex: 1200
					}} />
				</View>
			</HardBorder>
		</View>
	);
}

export default HapinessBar;

const styles = StyleSheet.create({
	container: {

	},
	hearth:{
		position:"relative",
		top:0,
		left:0,
		width:9*PIX_SIZE,
		height: 9 * PIX_SIZE,
		zIndex:110
	}
});
