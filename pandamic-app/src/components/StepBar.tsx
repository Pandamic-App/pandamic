import React from 'react';
import { StyleSheet,View, ViewStyle } from 'react-native';
import HardBorder from './HardBorder';
import PIX_SIZE from '../utils/Pixel';
import Colors from '../utils/Colors';
import CustomText from './CustomText';

export interface Props
{
	at:number,
	max:number,
	style?:ViewStyle
}

const BAR_WIDTH = 48;
const BAR_HEIGHT = 6;
const BAR_INNER_HEIGHT = 4;
const BAR_INNER_WIDTH = 47;

const StepBar:React.FC<Props> = (props) =>
{
	const progression = Math.min(1,props.at/props.max);

	return (
		<View style={[{ height: 10 * PIX_SIZE, width: BAR_WIDTH * PIX_SIZE },styles.container, props.style]}>
			<HardBorder
				bgColor={Colors.beige}
				width={BAR_WIDTH}
				height={BAR_HEIGHT}
				style={{ position: "relative", top: 0 * PIX_SIZE, left: 0 * PIX_SIZE }}
			>
				<View>
					<View style={{
						backgroundColor: Colors.cyan,
						height: BAR_INNER_HEIGHT / 2 * PIX_SIZE,
						width: BAR_INNER_WIDTH * PIX_SIZE * progression,
						left:PIX_SIZE,
						zIndex: 1200
					}} />
					<View style={{
						backgroundColor: Colors.darkerBlue,
						height: BAR_INNER_HEIGHT / 2 * PIX_SIZE,
						width: BAR_INNER_WIDTH * PIX_SIZE * progression,
						zIndex: 1200,
						left: PIX_SIZE
					}} />
				</View>
			</HardBorder>
			<CustomText>{props.at} / {props.max}</CustomText>
		</View>
	);
}

export default StepBar;

const styles = StyleSheet.create({
	container: {
		display:"flex",
		justifyContent:"center",
		alignItems:"flex-end"
	},
});
