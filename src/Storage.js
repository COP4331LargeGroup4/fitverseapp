import AsyncStorage from '@react-native-community/async-storage';

export default class StorageUtil{
	getData = async (token) => {
		try {
			return await AsyncStorage.getItem(token);
		} catch (e) {
			console.log(e);
		}
	}

	setData = async (key, value) => {
		try {
			await AsyncStorage.setItem(key, value);
		} catch (e) {
			console.log(e);
		}
	}

	clearData = async () => {
		try {
			await AsyncStorage.clear();
		} catch (e) {
			console.log(e);
		}
		console.log('Storage Cleared');
	}
}