import React from 'react';
import { StyleSheet,View, Dimensions } from 'react-native';
import Colors from '../utils/Colors';
import { useSelector } from 'react-redux';
import GameState from '../models/redux/GameState';
import CustomText from '../components/CustomText';
import Garden from '../components/Garden';
import HapinessBar from '../components/HapinessBar';
import HardBorder from '../components/HardBorder';
import PIX_SIZE from '../utils/Pixel';
import CardBrowser from '../components/CardBrowser';

export interface Props
{

}


const HomeScreen:React.FC<Props> = (props:Props) =>
{
	const taskState = useSelector((state:GameState)=>state.taskState);

	return (
		<View style={styles.container}>
			<HapinessBar
				style={{marginBottom:8}}
			/>
			<Garden />
			<CardBrowser cards={taskState.onGoingTasks}/>
		</View>
	);
}

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		display:"flex",
		flex:1,
		justifyContent:"flex-start",
		alignItems:"center",
		flexDirection:"column",
		paddingTop:30,
		backgroundColor:Colors.beige
	},
});
