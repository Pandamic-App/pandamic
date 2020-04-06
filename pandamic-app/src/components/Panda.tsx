import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import PIX_SIZE from '../utils/Pixel';
import useInterval from 'use-interval';

export interface Props
{
	type:"normal"|"sad"|"happy"
}

const PANDA_BODY_HEIGHT = 6;
const PANDA_HEAD_HEIGHT = 13;
const PANDA_HEAD_WIDTH = 20;
const PANDA_WIDTH = 12;

const body = require("../../assets/panda/panda-body.png");
const happyHead = require("../../assets/panda/panda-happy.png");
const sadHead = require("../../assets/panda/panda-sad.png");
const normalHead = require("../../assets/panda/panda-neutral.png");

const Panda:React.FC<Props> = (props) =>
{
	const [animFrame, setAnimFrame] = useState(false);
	const head = props.type === "happy" ? happyHead : props.type === "normal" ? normalHead : sadHead;

	useInterval(()=>{
		setAnimFrame(!animFrame);
	},1000);

	return (
		<View
			style={styles.container}
		>
			<Image
				source={head}
				style={{
					position:"relative",
					top:animFrame ? PIX_SIZE : 0,
					left:0,
					width: PANDA_HEAD_WIDTH*PIX_SIZE,
					height: PANDA_HEAD_HEIGHT * PIX_SIZE,
					resizeMode:"stretch"
				}}
			/>
			<Image
				source={body}
				style={{
					position:"relative",
					top:-1,
					left:(PANDA_HEAD_WIDTH-PANDA_WIDTH)/2*PIX_SIZE,
					width: PANDA_WIDTH * PIX_SIZE,
					height:PANDA_BODY_HEIGHT*PIX_SIZE,
					resizeMode: "stretch"
				}}
			/>
		</View>
	);
}

export default Panda;

const styles = StyleSheet.create({
	container: {
		width: PANDA_HEAD_WIDTH*PIX_SIZE,
		height: (PANDA_HEAD_HEIGHT + PANDA_BODY_HEIGHT)*PIX_SIZE
	},
});
