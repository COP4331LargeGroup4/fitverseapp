import { StyleSheet, Platform, StatusBar } from "react-native";
import { Dimensions } from "react-native";

export default StyleSheet.create({
	AndroidSafeArea: {
		flex: 1,
		backgroundColor: "white",
		paddingTop: (Platform.OS === "android" ? StatusBar.currentHeight : 0),
	},
	ViewWindow: {
		paddingLeft: Math.round(Dimensions.get('window').width) - Math.round(Dimensions.get('window').width) * .98,
		paddingRight: Math.round(Dimensions.get('window').width) - Math.round(Dimensions.get('window').width) * .98,
	}
});