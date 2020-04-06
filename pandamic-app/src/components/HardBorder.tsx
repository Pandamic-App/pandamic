import React from 'react';
import { StyleSheet,View, StyleProp, ViewStyle } from 'react-native';
import PIX_SIZE from '../utils/Pixel';

export interface Props
{
	height:number,
	width:number,
	bgColor:string,
	style?:ViewStyle,
	borderColor?:string
}

const HardBorder:React.FC<Props> = (props) =>
{
	const borderColor  = props.borderColor ? props.borderColor : "black";

	const corners = [
		{x:0,y:0,color:props.bgColor},
		{x:0,y:props.height-1,color:props.bgColor},
		{x:props.width-1,y:0,color:props.bgColor},
		{x:props.width-1,y:props.height-1,color:props.bgColor},
		{ x: 1, y: 1, color: borderColor},
		{ x: props.width - 2, y: 1, color: borderColor},
		{ x: props.width - 2, y: props.height - 2, color: borderColor},
		{ x: 1, y: props.height - 2, color:borderColor}

	];
	let elems = [];
	for (let ii = 0; ii < corners.length;ii++)
	{
		let corner = corners[ii];
		let xDif = -1;
		let yDif = -ii-1;
		elems.push(<View
			style={{
				backgroundColor:corner.color,
				width:PIX_SIZE,
				height:PIX_SIZE,
				position: "relative",
				top: (yDif+corner.y)*PIX_SIZE,
				left: (xDif + corner.x) * PIX_SIZE,
				zIndex:100
			}}
			key={ii+""}
		/>);
	}

	return (
		<View
			style={[{
				backgroundColor:props.bgColor,
				width:props.width*PIX_SIZE,
				height:props.height*PIX_SIZE,
				borderColor: borderColor,
				borderStyle:"solid",
				borderWidth:PIX_SIZE,
			},props.style]}
		>
			{elems}
			<View style={{position:"relative",top:(-elems.length)*PIX_SIZE,left:-PIX_SIZE}}>{props.children}</View>
		</View>
	);
}

export default HardBorder;

const styles = StyleSheet.create({
	container: {

	},
});
