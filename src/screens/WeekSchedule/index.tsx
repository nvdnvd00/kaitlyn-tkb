import { useNavigation } from '@react-navigation/core';
import Box from 'Components/Box';
import Header from 'Components/Header';
import { addDays, format, startOfWeek } from 'date-fns';
import groupBy from 'lodash/groupBy';
import moment from 'moment';
import 'moment/locale/vi';
import * as React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useSelector } from 'react-redux';
import { RootReducer } from 'store/reducer';
import Metrics from 'theme/Metrics';
import images from '../../Assets/Images';
import AppText from '../../Components/AppText';
import ScheduleCard from '../../Components/ScheduleCard';
import { getFullSchedule } from '../../helper/utils';
moment.locale('vi');

interface DashBoardProps {}

const styles = StyleSheet.create({
	carouselContainer: { alignSelf: 'center' },
	carouselContentContainer: {
		// alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
	},
});

const DashBoard = (props: DashBoardProps) => {
	const navigation: any = useNavigation();
	const { data: fullSubjects } = useSelector((state: RootReducer) => state.subject);
	const { data: caData } = useSelector((state: RootReducer) => state.ca);
	const x = groupBy(
		getFullSchedule(
			caData,
			fullSubjects,
			startOfWeek(new Date()),
			addDays(startOfWeek(new Date()), 6),
		),
		(i: any) => i.todayTime.weekday,
	);
	const schedule = Object.keys(x).map((key) => ({ subjects: x[key] }));

	const _renderItem = ({ item, index }: any) => {
		const time = item.subjects[0].todayTime.begin;
		return (
			<Box
				key={index}
				height={(Metrics.SCREEN_HEIGHT - Metrics.HEADER_HEIGHT) * 0.8}
				width={Metrics.SCREEN_WIDTH - 80}
				// backgroundColor={'white_085'}
				borderRadius={'l'}
				overflow={'hidden'}
				alignItems='center'>
				{/* <Image
					borderRadius={16}
					source={images.kn1}
					style={{
						width: Metrics.SCREEN_WIDTH - 80,
						height: '100%',
						position: 'absolute',
					}}
				/> */}
				<AppText variant='heading' textAlign='center' color='white'>
					{moment(time).format('dddd').toUpperCase()}
				</AppText>
				<AppText variant='heading' textAlign='center' color='white' mt='s'>
					{format(time, 'dd-MM-yyyy')}
				</AppText>
				<ScrollView style={{ width: '100%' }}>
					{item.subjects.map((i: any, index: number) => {
						return (
							<Box key={index} mt='m' width='100%'>
								<ScheduleCard data={i} hideDay />
							</Box>
						);
					})}
				</ScrollView>
			</Box>
		);
	};

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
				title={'Lịch Tuần'}
			/>

			{schedule.length ? (
				<Box flex={1} alignItems='center' paddingBottom='bottomSpace'>
					<Carousel
						data={schedule}
						renderItem={_renderItem}
						sliderWidth={Metrics.SCREEN_WIDTH}
						itemWidth={Metrics.SCREEN_WIDTH - 80}
						contentContainerCustomStyle={styles.carouselContentContainer}
						style={[styles.carouselContainer, { height: '80%' }]}
					/>
				</Box>
			) : (
				<Box mt='s' flex={1} justifyContent='center' height={250}>
					<AppText variant='body' color='green' textAlign='center'>
						Tuần này không cần đi học!
					</AppText>
				</Box>
			)}
		</Box>
	);
};

export default DashBoard;
