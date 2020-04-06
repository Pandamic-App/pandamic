import React from 'react';
import { StyleSheet, View, Text, TextStyle } from 'react-native';

export interface Props
{
	color?: string,
	bold?: Boolean,
	size?:number,
	style?:TextStyle
}

const CustomText: React.SFC<Props> = (props) =>
{
	return (
		<Text style={[styles.text,
		{
			color: props.color ? props.color : "black",
			fontFamily: props.bold ? "regular" : "bold",
			fontSize:props.size
		},props.style]} >
			{props.children}
		</Text>
	);
}

export default CustomText;

const styles = StyleSheet.create({
	text: {
		fontFamily: "regular",
	}
});
