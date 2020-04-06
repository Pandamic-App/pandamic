import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import HardBorder from './HardBorder';
import PIX_SIZE from '../utils/Pixel';
import Colors from '../utils/Colors';
import { CardInfo } from '../models/CardInfo';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import CustomText from './CustomText';
import Button from './Button';
import useThunkDispatch from '../hooks/useThunkDispatch';
import { DoingPandaTask } from '../models/PandaTask';
import { completeTask } from '../actions/completeTask';
import StepBar from './StepBar';

export interface Props
{
	cards:DoingPandaTask[]
}

const ScreenSize = Dimensions.get("window");

const CardBrowser:React.FC<Props> = (props) =>
{
	if (props.cards.length === 0)
		return null;

	const [atCard, setAtCard] = useState(0);
	const [switching,setSwitching] = useState(false);
	const hasCardToLeft = atCard !== 0;
	const hasCardToRight = atCard !== props.cards.length-1;
	const dispatch = useThunkDispatch();

	function panDir(left:boolean)
	{
		if (!switching)
		{
			setSwitching(true);
			setAtCard(left ? Math.max(0,atCard-1) : Math.min(props.cards.length-1,atCard+1));
			setTimeout(()=>{
				setSwitching(false);
			},400)
		}
	}

	function completeTaskCb(pressedYes:boolean)
	{
		if (atCard === props.cards.length-1)
		{
			setAtCard(atCard-1);
		}
		dispatch(completeTask({id:props.cards[atCard].id,pressedYes:pressedYes}));
	}

	const boxHeight = ScreenSize.height * 0.3 / PIX_SIZE;
	const boxWidth = 65;
	const midPaddingToCenter = (ScreenSize.width - (boxWidth * PIX_SIZE)) / 2;
	const darkPartHeight = (0.3 * boxHeight) * PIX_SIZE;
	const currentCard = props.cards[atCard];

	const ActionPart = currentCard.requiresSteps ? <StepBar at={currentCard.atStepts ? currentCard.atStepts : 0} max={currentCard.requiresSteps} />
		: <>
			<Button bgColor={Colors.beige} textSize={20} text={"Nem"} width={20} onPress={() => { completeTaskCb(false) }} />
			<Button bgColor={Colors.beige} textSize={20} text={"Igen"} width={20} onPress={() => { completeTaskCb(true) }} style={{ marginLeft: 10 }} />
		</>
	return (
		<PanGestureHandler
			maxDeltaY={30}
			minDeltaX={100}
			onGestureEvent={(event: PanGestureHandlerGestureEvent)=>{panDir(event.nativeEvent.velocityX>0)}}
		>
			<View
				style={styles.container}
			>
				<HardBorder
					width={boxWidth}
					height={boxHeight}
					bgColor={Colors.beige}
					style={{
						position:"relative",
						top:2*PIX_SIZE,
						left: midPaddingToCenter
					}}
				>
					<View
						style={[{position:"relative",top:0,left:PIX_SIZE,width:(boxWidth-2)*PIX_SIZE,backgroundColor:Colors.darkerass,height:darkPartHeight},styles.contentWrapper]}
					>
						<CustomText
							size={20}
							color={"white"}
							style={{marginBottom:10}}
						>{props.cards[atCard].title}</CustomText>

					</View>
					<View
						style={[{ position: "relative", top: 0,left:PIX_SIZE},styles.contentWrapper]}
					>
						<CustomText
							size={18}
							style={{marginTop:7}}
						>{props.cards[atCard].question}</CustomText>
						<View style={styles.btnGroup}>
							{ActionPart}
						</View>
					</View>
				</HardBorder>
				{hasCardToLeft ?
				<HardBorder
					width={boxWidth}
					height={boxHeight}
					bgColor={Colors.beige}
					style={{
						position: "relative",
						top: (-boxHeight+2)*PIX_SIZE,
						left: midPaddingToCenter - ((boxWidth+2)*PIX_SIZE)
					}}
				>
					<View style={{position:"relative",top:0,left:0,height:(boxHeight-2)*PIX_SIZE,width:(boxWidth-1)*PIX_SIZE,backgroundColor:Colors.ass}}></View>
				</HardBorder>:null}
				{hasCardToRight ?
				<HardBorder
					width={boxWidth}
					height={boxHeight}
					bgColor={Colors.beige}
					style={{
						position: "relative",
						top: (-(hasCardToLeft ? 2 : 1)*boxHeight + 2) * PIX_SIZE,
						left: midPaddingToCenter + ((boxWidth + 2) * PIX_SIZE)
					}}
				>
					<View style={{ position: "relative", top: 0, left: PIX_SIZE, height: (boxHeight - 2) * PIX_SIZE, width: (boxWidth - 1) * PIX_SIZE, backgroundColor: Colors.ass }}></View>
				</HardBorder> : null}
			</View>
		</PanGestureHandler>
	);
}

export default CardBrowser;

const styles = StyleSheet.create({
	container: {
		width:ScreenSize.width,
	},
	contentWrapper:{
		display:"flex",
		justifyContent:"space-between",
		alignItems:"flex-start",
		flexDirection:"column",
		paddingLeft:10,
		paddingTop:0,
	},
	btnGroup:
	{
		marginTop:10,
		display:"flex",
		justifyContent:"space-around",
		alignItems:"center",
		flexDirection:"row",
		width:"100%"
	}
});
