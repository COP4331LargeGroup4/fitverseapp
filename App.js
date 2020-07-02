import React, { Component } from 'react'
import { StyleSheet, Text, SafeAreaView, View, Image, Dimensions } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import SvgUri from 'react-native-svg-uri';


//import * as mdiIcon from '@mdi/react' // can i change the iconprovder to this? or add mdiAccountCowboyHat to react-native-icon-provider or whatever its called
//import { mdiAccountCowboyHat } from '@mdi/js';
import SafeViewAndroid from "./components/SafeAndroidView";
import Profile from './src/profile';
import Logo from './assets/logo.svg'
import { DashboardCalendar, PageCalendar } from './src/calendar';


const width = Dimensions.get('window').width; 


//<Image source={require('./assets/logo.png')} style={{ alignContent:'center', resizeMode:'center', width: (width * .8) }} />

const DashboardRoute = () => 
	<View >
		<Logo 
			width='100%'
			height='20%'
			
			style={styles.container}
		/>
		<DashboardCalendar />

	</View >;

const CalendarRoute = () => 
	<View >
		<PageCalendar />
	</View >;

const RecentsRoute = () => 
	<View >
		<Text>Recents</Text>
		<Text>Route</Text>
		<Text>test</Text>
	</View >;

const ProfileRoute = () => 
	<View >
		<Profile />
	</View >;

const App = () => {

	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: 'dashboard', title: 'Dashboard', icon: 'home' },
		{ key: 'calendar', title: 'Calendar', icon: 'calendar' },
		{ key: 'recents', title: 'Recents', icon: 'history' },
		{ key: 'profile', title: 'Profile', icon: 'account' }, // TODO: Change to https://materialdesignicons.com/icon/account-cowboy-hat
	]);

	const renderScene = BottomNavigation.SceneMap({
		dashboard: DashboardRoute,
		calendar: CalendarRoute,
		recents: RecentsRoute,
		profile: ProfileRoute,
	});

	return (
		<SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
			<BottomNavigation
				navigationState={{ index, routes }}
				onIndexChange={setIndex}
				renderScene={renderScene}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	logo: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center'
	}
});

export default App;