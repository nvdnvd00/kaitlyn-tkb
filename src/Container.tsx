import AppText from 'Components/AppText';
import React from 'react';
import { Platform } from 'react-native';
import useMount from 'react-use/lib/useMount';
import AppStack from './AppStack';
import NotifService from './firebase/Notification/NotifService';
import GlobalStore from './helper/globalStore';
import LocalStorage from './helper/LocalStorage';
import { isStringEmpty } from './helper/utils';
import SchedulePushLocalNoti from './SchedulePushLocalNoti';

const Container = () => {
	const language = GlobalStore.lang;

	AppText.defaultProps = AppText.defaultProps || {};
	AppText.defaultProps.allowFontScaling = false;

	const onRegister = async (token: any) => {
		GlobalStore.notificationToken = token.token;
		//	Alert.alert('', error);
	};

	const onNotif = (notif) => {
		//
	};
	useMount(() => {
		GlobalStore.notiRef = new NotifService(onRegister, onNotif);
		if (Platform.OS === 'android') {
			LocalStorage.getFromLocal('deviceToken')
				.then((token) => {
					if (!isStringEmpty(token)) {
						onRegister({ token });
					}
				})
				.catch();
		}
		// ios
		// if (!isStringEmpty(deviceToken)) GlobalStore.notificationToken = deviceToken;
	});

	return (
		<SchedulePushLocalNoti>
			<AppStack />
		</SchedulePushLocalNoti>
	);
};

export default Container;
