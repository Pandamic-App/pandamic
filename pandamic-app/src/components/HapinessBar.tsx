import React from 'react';
import { StyleSheet, View, Image, ViewStyle, Dimensions } from 'react-native';
import HardBorder from './HardBorder';
import PIX_SIZE from '../utils/Pixel';
import Colors from '../utils/Colors';
import { useSelector } from 'react-redux';
import GameState from '../models/redux/GameState';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import useThunkDispatch from '../hooks/useThunkDispatch';
import { toggleInfoScreen } from '../actions';
const hearth = require("../../assets/hearth.png");
const qmark = require("../../assets/qmark.png")

export interface Props
{
	style?:ViewStyle
}
const Screen = Dimensions.get("window");

const BAR_WIDTH = 58;
const BAR_HEIGHT = 6;
const BAR_INNER_HEIGHT = 4;
const BAR_INNER_WIDTH = BAR_WIDTH-1;

const HapinessBar:React.FC<Props> = (props) =>
{
	const happiness = useSelector((state:GameState)=>state.taskState.happiness);
	const dispatch = useThunkDispatch();

	return (
		<View style={styles.centerer}>
			<View style={[{height:9*PIX_SIZE,width:(BAR_WIDTH+10)*PIX_SIZE},props.style]}>
				<Image source={hearth} style={styles.hearth}/>
				<HardBorder
					bgColor={Colors.beige}
					width={BAR_WIDTH}
					height={BAR_HEIGHT}
					style={{position:"relative",top:-8*PIX_SIZE,left:10*PIX_SIZE}}
				>
					<View>
						<View style={{
							backgroundColor: "red",
							height:BAR_INNER_HEIGHT/2*PIX_SIZE,
							width: BAR_INNER_WIDTH * PIX_SIZE * happiness,
							zIndex:1200,
							left:PIX_SIZE
						}} />
						<View style={{
							backgroundColor: "#960400",
							height: BAR_INNER_HEIGHT/2 * PIX_SIZE,
							width: BAR_INNER_WIDTH * PIX_SIZE * happiness,
							zIndex: 1200,
							left:PIX_SIZE
						}} />
					</View>
				</HardBorder>
			</View>
			<TouchableOpacity
				onPress={()=>{
					dispatch(toggleInfoScreen({newIsOpened:true}))
				}}
			>
				<Image source={qmark} style={styles.qmark} />
			</TouchableOpacity>
		</View>
	);
}

export default HapinessBar;

const styles = StyleSheet.create({
	centerer: {
		display:"flex",
		justifyContent:"center",
		alignItems:"center",
		width:Screen.width,
		flexDirection:"row"
	},
	hearth:{
		position:"relative",
		top:0,
		left:0,
		width:9*PIX_SIZE,
		height: 9 * PIX_SIZE,
		zIndex:110
	},
	qmark:
	{
		width: 4 * PIX_SIZE,
		height: 4 * PIX_SIZE,
		zIndex: 110,
		marginBottom:20,
		marginLeft:10
	}
});
