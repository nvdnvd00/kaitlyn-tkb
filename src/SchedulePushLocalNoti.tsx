import { format, subMinutes } from 'date-fns';
import { isFuture } from 'date-fns/esm';
import React from 'react';
import PushNotification from 'react-native-push-notification';
import { useSelector } from 'react-redux';
import useMount from 'react-use/lib/useMount';
import { RootReducer } from 'store/reducer';
import { getFullSchedule } from './helper/utils';

const SchedulePushLocalNoti = (props: any) => {
	const time = new Date();
	const { data: fullSubjects } = useSelector((state: RootReducer) => state.subject);
	const { data: caData } = useSelector((state: RootReducer) => state.ca);
	const { from: semesterFrom, to: semesterTo } = useSelector(
		(state: RootReducer) => state.semester,
	);
	const x = getFullSchedule(
		caData,
		fullSubjects,
		new Date(),
		new Date(semesterTo),
	).filter((i: any) => isFuture(new Date(i.todayTime.begin)));

	useMount(() => {
		clearAllScheduleNotifications();
		setNotiForAllClass(x);
	});
	const clearAllScheduleNotifications = () => {
		PushNotification.cancelAllLocalNotifications();
	};
	const setNotiForAllClass = (data: any[]) => {
		data.map((i: any) => {
			PushNotification.localNotificationSchedule(createNotiObj(i));
		});
	};
	const createNotiObj = (data: any) => {
		const msg = `Môn: ${data.name}\nPhòng: ${data?.todayTime.room} (${data?.todayTime.caIdInfo.start} ~ ${data?.todayTime.caIdInfo.end})`;
		return {
			id: data.todayTime.begin,
			title: `Tới giờ đi học (${format(new Date(data.todayTime.begin), 'dd/MM/yyyy')})`,
			message: msg,
			date: new Date(subMinutes(new Date(data.todayTime.begin), 30)),
		};
	};
	return <>{props.children}</>;
};
export default SchedulePushLocalNoti;
