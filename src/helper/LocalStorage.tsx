import AsyncStorage from '@react-native-community/async-storage';
import GlobalStore from './globalStore';

export default class LocalStorage {
	static clearLocal = async () => {
		try {
			await AsyncStorage.clear();
			GlobalStore.token = null;
		} catch (error) {
			if (__DEV__) {
				console.log('LocalStorage CLEAR \n ERROR:', error.message);
			}
		}
	};

	static setToLocal = async (key, value) => {
		try {
			await AsyncStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			if (__DEV__) {
				console.log('LocalStorage SET ' + key + ' TO LOCAL \n ERROR:', error.message);
			}
		}
	};

	static getFromLocal = async (key) => {
		let data = '';
		try {
			const res: any = await AsyncStorage.getItem(key);
			data = JSON.parse(res);
		} catch (error) {
			if (__DEV__) {
				console.log('LocalStorage GET ' + key + ' FROM LOCAL \n ERROR:', error.message);
			}
		}

		return data;
	};

	static getPostBadge = async () => {
		const data = await LocalStorage.getFromLocal('postBadge');
		return data || null;
	};

	static setPostBadge = async (status = '0') => {
		await LocalStorage.setToLocal('postBadge', status);
	};
	static getSyncedStatus = async () => {
		const data = await LocalStorage.getFromLocal('SyncedStatus');
		return data || null;
	};
	static setSyncedStatus = async (status = '0') => {
		await LocalStorage.setToLocal('SyncedStatus', status);
	};
	static getAppVersion = async () => {
		const data = await LocalStorage.getFromLocal('Version');
		return data || null;
	};
	static setAppVersion = async (status = '0') => {
		await LocalStorage.setToLocal('Version', status);
	};
}
