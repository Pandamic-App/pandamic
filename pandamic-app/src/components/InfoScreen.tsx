import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import PIX_SIZE from '../utils/Pixel';
import { useSelector } from 'react-redux';
import GameState from '../models/redux/GameState';
import CustomText from './CustomText';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import useThunkDispatch from '../hooks/useThunkDispatch';
import { toggleInfoScreen } from '../actions';
import Button from './Button';
import * as WebBrowser from 'expo-web-browser';
const infoPanelSource = require("../../assets/infopanel.json");

const DONO_LINK = "https://www.google.com";
const Screen = Dimensions.get("window");

export interface Props
{

}

const InfoScreen: React.FC<Props> = (props) =>
{
	const openEd = useSelector<GameState, boolean>(ss => ss.metadataState.infoScreenOpen);
	const dispatch = useThunkDispatch();


	if (!openEd)
		return null;
	return (
		<>
			<View
				style={styles.wrapper}
			>
			</View>
			<View
				style={styles.realWrapper}
			>
				<View
					style={styles.container}
				>

					<Button
						onPress={() => { dispatch(toggleInfoScreen({ newIsOpened: false })) }}
						width={9}
						height={9}
						text={"X"}
						style={styles.xButton}
					/>
					<CustomText>{infoPanelSource.infopanel}</CustomText>

					<Button
						onPress={() =>
						{
							console.log("debug")
							WebBrowser.openBrowserAsync(DONO_LINK)
						}
						}
						width={10 * PIX_SIZE}
						height={9}
						text={"Adományozzhatsz nekünk itt"}
						textSize={15}
						style={{ alignSelf: "center", marginTop: 10 }}
					/>
				</View>
			</View>
		</>
	);
}

export default InfoScreen;

const styles = StyleSheet.create({
	container: {
		borderWidth: PIX_SIZE,
		borderColor: "black",
		borderStyle: "solid",
		backgroundColor: "white",
		padding: 10,
		maxWidth:Screen.width*0.90
	},
	realWrapper: {
		position: "absolute",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: Screen.width,
		height: Screen.height
	},
	wrapper:
	{
		position: "absolute",
		top: 0,
		left: 0,
		backgroundColor: "rgba(38,38,38,0.5)",
		width: Screen.width,
		height: Screen.height,
		display: "flex",
		justifyContent: "center",
		alignItems: "center"

	},
	xButton:
	{
		position: "relative",
		top: 0,
		right: 0,
		alignSelf: "flex-end",
		marginBottom: 7
	}
});
