import { useNavigation } from '@react-navigation/core';
import AppText from 'Components/AppText';
import Box from 'Components/Box';
import Header from 'Components/Header';
import { format, isFuture } from 'date-fns';
import * as React from 'react';
import { Image, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootReducer } from 'store/reducer';
import Metrics from 'theme/Metrics';
import images from '../../Assets/Images';
import ScheduleCard from '../../Components/ScheduleCard';
import { getFullSchedule, getScheduleByDay, isEmptyObj } from '../../helper/utils';

interface DashBoardProps {}

const DashBoard = (props: DashBoardProps) => {
	const navigation: any = useNavigation();
	const time = new Date();
	const { data: fullSubjects } = useSelector((state: RootReducer) => state.subject);
	const { data: caData } = useSelector((state: RootReducer) => state.ca);
	const { data: userData } = useSelector((state: RootReducer) => state.user);
	const todaySubjects = getScheduleByDay(caData, fullSubjects, time);
	const x = getFullSchedule(caData, fullSubjects, new Date(), new Date(1620579599000));
	const nextSubject = x.find((i: any) => {
		return isFuture(i.todayTime.begin);
	});
	// console.log(x);
	return (
		<Box flex={1}>
			<Image
				source={images.kn1}
				style={{
					width: Metrics.SCREEN_WIDTH,
					height: Metrics.SCREEN_HEIGHT,
					position: 'absolute',
				}}
			/>
			<Box
				width={Metrics.SCREEN_WIDTH}
				height={Metrics.SCREEN_HEIGHT}
				position='absolute'
				bg='black'
				opacity={0.5}
			/>
			<Header
				iconLeft={'menu'}
				onPressLeft={() => navigation.toggleDrawer()}
				title={userData.name}
			/>
			<Box flex={1} alignItems='center' pb={'bottomSpace'}>
				<ScrollView
					style={{ flex: 1, width: Metrics.SCREEN_WIDTH }}
					contentContainerStyle={{ alignItems: 'center' }}>
					{!isEmptyObj(nextSubject) && (
						<Box width='90%' mt='m'>
							<ScheduleCard data={nextSubject} title={'Môn học tiếp theo'} />
						</Box>
					)}
					<Box height={1} bg='white' width='90%' mt='m'></Box>
					<Box mt='m' width={'90%'} justifyContent='center' alignItems='center'>
						<AppText variant='heading' textAlign='center' color='white'>
							Lịch học hôm nay
						</AppText>
						<AppText variant='heading' textAlign='center' color='white' mt='s'>
							{format(time, 'dd-MM-yyyy')}
						</AppText>
						{todaySubjects.length ? (
							todaySubjects.map((i: any, index: number) => {
								return (
									<Box key={index} mt='m' width='100%'>
										<ScheduleCard data={i} hideDay />
									</Box>
								);
							})
						) : (
							<Box mt='s' flex={1} justifyContent='center' height={250}>
								<AppText variant='body' color='green'>
									Không có môn nào, không cần lên lớp hôm nay!
								</AppText>
							</Box>
						)}
					</Box>
				</ScrollView>
			</Box>
		</Box>
	);
};

export default DashBoard;
