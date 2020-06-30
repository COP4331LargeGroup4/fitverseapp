import React, { Component } from 'react'
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
//import * as mdiIcon from '@mdi/react' // can i change the iconprovder to this? or add mdiAccountCowboyHat to react-native-icon-provider or whatever its called
//import { mdiAccountCowboyHat } from '@mdi/js';
import SafeViewAndroid from "./components/SafeAndroidView";
import Profile from './src/profile';

const MusicRoute = () => 
	<View style={SafeViewAndroid.ViewWindow}>
		<Text>Music</Text>
		<Text>Route</Text>
		<Text>test</Text>
	</View >;

const AlbumsRoute = () => 
	<View style={SafeViewAndroid.ViewWindow}>
		<Text>Album</Text>
		<Text>Route</Text>
		<Text>test</Text>
	</View >;

const RecentsRoute = () => 
	<View style={SafeViewAndroid.ViewWindow}>
		<Text>Recents</Text>
		<Text>Route</Text>
		<Text>test</Text>
	</View >;

const ProfileRoute = () => 
	<View style={SafeViewAndroid.ViewWindow}>
		<Profile />
	</View >;

const App = () => {

	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: 'music', title: 'Music', icon: 'music' },
		{ key: 'albums', title: 'Albums', icon: 'album' },
		{ key: 'recents', title: 'Recents', icon: 'history' },
		{ key: 'profile', title: 'Profile', icon: 'account' }, // TODO: Change to https://materialdesignicons.com/icon/account-cowboy-hat
	]);

	const renderScene = BottomNavigation.SceneMap({
		music: MusicRoute,
		albums: AlbumsRoute,
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
});

export default App;