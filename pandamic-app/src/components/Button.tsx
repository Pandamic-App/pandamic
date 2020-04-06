import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle, StyleProp, TextStyle, View } from 'react-native';
import HardBorder from './HardBorder';
import PIX_SIZE from '../utils/Pixel';
import CustomText from './CustomText';

export interface Props
{
	onPress(): void,

	width: number,
	textSize?:number
	bgColor?:string,
	isDisabled?: boolean,
	text: string,
	style?:ViewStyle
}

const height = 12;

const Button: React.SFC<Props> = (props) =>
{
	const bgColor = props.isDisabled ? "grey" : "#ffe300";
	const textSize = props.textSize ? props.textSize : 30;
	const bgColorTo = props.bgColor ? props.bgColor : "white";

	return (
		<TouchableOpacity disabled={props.isDisabled} onPress={props.onPress} style={props.style}>
			<HardBorder
				bgColor={bgColorTo}
				width={props.width}
				height={height}
			>
				<View
					style={{ display:"flex",justifyContent:"center",alignItems:"center",backgroundColor: bgColor, position: "relative", top: 0, left: PIX_SIZE, width: (props.width - 2) * PIX_SIZE, height: (height-2) * PIX_SIZE }}
				>
					<CustomText
						bold
						color={"white"}
						size={textSize}
					>
						{props.text.toUpperCase()}
					</CustomText>
				</View>
			</HardBorder>
		</TouchableOpacity>
	);
}

export default Button;

const styles = StyleSheet.create({

});
