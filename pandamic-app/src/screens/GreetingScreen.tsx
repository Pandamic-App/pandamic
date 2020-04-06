import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, AsyncStorage, ImageBackground, Image, Picker, CheckBox, SwitchIOS, Platform, Switch } from 'react-native';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomText from '../components/CustomText';
import StringsUtils from '../utils/StringsUtils';
import GameState from "../models/redux/GameState"
import { useSelector } from 'react-redux';
import PIX_SIZE from '../utils/Pixel';
import Panda from '../components/Panda';
import Colors from '../utils/Colors';
import HardBorder from '../components/HardBorder';
import Button from '../components/Button';
import { askLocationPermissions } from '../utils/LocationUtils';
import useThunkDispatch from '../hooks/useThunkDispatch';
import * as Location from "expo-location";
import { thunkCreateAccount } from '../actions';


export interface Prop
{

}

const arch = require("../../assets/arch.png");

const GreetingScreen: React.FC<Prop> = (props) =>
{
	const [age, setAge] = useState(9)
	const [atHome,setAtHome] = useState(false);
	const dispatch = useThunkDispatch();

	const ages = new Array(100).fill(0).map((x,y)=>y+9);

	async function submitAccount()
	{
		let gotPerm = await askLocationPermissions();

		if (!gotPerm)
		{
			Alert.alert("Az applikáció használatához engedélyeznie kell a helymeghatározást!","",[{text:"Ok",style:"cancel"}]);
		}
		else
		{			try
			{
				let at = await Location.getCurrentPositionAsync();
				console.log(at);
				dispatch(thunkCreateAccount({lat:at.coords.latitude,lng:at.coords.longitude},age) as any);
			}
			catch
			{
				Alert.alert("Hibába ütközött a regisztráció!", "", [{ text: "Ok", style: "cancel" }]);
			}
		}
	}

	function goForward()
	{
		Alert.alert(
			'Az applikáció használatához otthon kell maradnia',
			'Kerjük otthonában regisztráljon, biztos benne, hogy otthon van ?',
			[
				{
					text: 'Nem',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
				{ text: 'Igen', onPress: () => {submitAccount()} },
			],
			{ cancelable: true },
		);
	}


	return (
		<View style={styles.container}>
			<ImageBackground source={arch} style={styles.arch}>
				<Panda type={"happy"}/>
			</ImageBackground>

			<View style={styles.innerContainer}>
				{/*
				<CustomText size={30} >{StringsUtils.getString("age")}</CustomText>
				<HardBorder
					width={22}
					height={10}
					bgColor={"white"}
					style={{marginTop:15}}
				>
					<Picker
						style={styles.picker}
						selectedValue={age+""}
						onValueChange={(vv)=>{setAge(parseInt(vv))}}
						itemStyle={{ fontFamily:"regular"}}
						mode={"dialog"}
					>
						{ages.map(xx=><Picker.Item key={xx+""} label={xx+""} value={xx+""}/>)}
					</Picker>
				</HardBorder>
				*/}
				<CustomText size={30} style={{marginTop:15}}>{StringsUtils.getString("home")}</CustomText>
				{ Platform.OS !== "ios" ?
				<CheckBox
					value={atHome}
					onValueChange={setAtHome}
					style={{marginTop:5}}
				/>:
				<Switch
					value={atHome}
					onValueChange={setAtHome}
					style={{marginTop:5,width:60,height:30}}
				/>}

				<Button
					text={StringsUtils.getString("continue")!}
					width={26}
					onPress={goForward}
					style={{marginTop:20}}
					isDisabled={!atHome}
				/>
			</View>
		</View>
	);
}

export default GreetingScreen;

const styles = StyleSheet.create({
	checker:{

	},
	picker:
	{
		width:100,
		height:40,
		margin:0,
		padding:0,
		marginLeft:8,
		marginTop:0
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		//paddingTop: 50,
		//paddingBottom: 50,
	},

	innerContainer: {
		display: 'flex',
		width: "90%",
		paddingTop: 50,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 25,
		padding: 20,
		marginTop: 20,
		marginLeft: 20,
		borderWidth: 2,
		borderColor: '#ffffff',
	},

	ageInput: {
		display: "flex",
		flexDirection: "row",
		height: 60,
		borderWidth: 2,
		marginTop: 20,
		fontSize: 30,
		marginBottom: 20,
		borderRadius: 25,
		borderColor: '#f2f2f2'
	},

	acceptButton: {
		height: 50,
		backgroundColor: '#b9d76c',
		borderRadius: 3,
		width: 80
	},

	declineButton: {
		height: 50,
		backgroundColor: '#ff0000',
		borderRadius: 3,
		width: 80
	},

	grayButton: {
		height: 50,
		backgroundColor: '#b3afaf',
		borderRadius: 3,
		width: 80
	},

	buttons: {
		display: "flex",
		flex: 1,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingTop: 30,
	},

	background: {
		display: "flex",
		flex: 1,
		width: "100%",
		resizeMode: "contain",
		justifyContent: "center"
	},
	arch:
	{
		marginTop:30,
		width:75*PIX_SIZE,
		height:75/90*50*PIX_SIZE,
		display:"flex",
		justifyContent:"flex-end",
		alignItems:"center",
		resizeMode:"stretch"
	}
});
