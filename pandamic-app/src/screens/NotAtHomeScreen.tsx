import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import CustomText from '../components/CustomText';
import StringsUtils from '../utils/StringsUtils';
import HapinessBar from '../components/HapinessBar';
import Colors from '../utils/Colors';
import PIX_SIZE from '../utils/Pixel';

const topBamboo = require("../../assets/bambooTop.png");
const warnPand = require("../../assets/warningpanda.png");

export interface Props
{

}

const ScreenSize = Dimensions.get("window");


const NotAtHomeScreen:React.FC<Props> = (props) =>
{

	return (
		<View style={styles.container}>
			<HapinessBar
				style={{ marginBottom: 8 }}
			/>
			<Image source={topBamboo} style={{width:ScreenSize.width,height:(ScreenSize.width*0.08),resizeMode:"stretch"}}/>
			<View
				style={{flex:1,backgroundColor:Colors.bordeaux,width:ScreenSize.width,justifyContent:"center",alignItems:"center"}}
			>
				<Image source={warnPand} style={{width:32*PIX_SIZE,height:30*PIX_SIZE,resizeMode:"stretch"}}/>
					<CustomText
						bold
						color={"white"}
						size={40}
						style={{marginTop:10}}
					>{StringsUtils.getString("gohome")}</CustomText>
			</View>
		</View>
	);
}

export default NotAtHomeScreen;

const styles = StyleSheet.create({
	container: {
		flex:1,
		justifyContent:"flex-start",
		alignItems:"center",
		backgroundColor: Colors.beige,
		paddingTop:30
	},
});
