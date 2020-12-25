import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import LinearBg from 'Components/LinearBG';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Metrics from 'theme/Metrics';
import { SCREEN_NAME } from '../../constant';
import { RootReducer } from '../../store/reducer';
import AppText from '../AppText';
import Avatar from '../Avatar';
import Box from '../Box';
import Icon from '../Icons';

interface DrawerItemProps {
	item?: any;
	onPress?: (type: any) => void;
}

const DrawerItemType = {
	HOME: 'home',
	WEEK_SCHEDULE: 'week-schedule',
};
const DrawerItemList = [
	{
		type: DrawerItemType.HOME,
		icon: 'home',
		text: 'Trang chính',
		screenKey: SCREEN_NAME.DASHBOARD,
	},
	{
		type: DrawerItemType.WEEK_SCHEDULE,
		icon: 'calendar',
		text: 'Xem TKB tuần',
		screenKey: SCREEN_NAME.WEEK_SCHEDULE,
	},
];
const DrawerItem = ({ item, onPress = () => {} }: DrawerItemProps) => {
	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.9}>
			<Box
				flexDirection={'row'}
				alignItems={'flex-end'}
				width={'100%'}
				borderBottomWidth={1}
				borderColor={'white'}
				paddingLeft={'s'}
				paddingVertical={'xm'}>
				<Icon.IconC name={item?.icon} color={'white'} size={'body'} />
				<AppText variant='bodyBold' color={'white'} marginLeft={'xm'}>
					{item?.text}
				</AppText>
			</Box>
		</TouchableOpacity>
	);
};

const CustomDrawer = (props: any) => {
	const navigation = useNavigation();
	const theme = useTheme();
	const { data: userData } = useSelector((state: RootReducer) => state.user);

	const handleOnPress = (item: any) => () => {
		if (item.screenKey) {
			navigation.navigate(item.screenKey);
		}
	};

	return (
		<LinearBg linearHeight={'100%'}>
			<Box paddingHorizontal={'l'} flex={1}>
				<ScrollView
					style={{
						flex: 1,
					}}
					contentContainerStyle={{ marginTop: Metrics.HEADER_HEIGHT }}
					bounces={false}
					showsVerticalScrollIndicator={false}>
					<Box flexDirection='row' alignItems={'center'}>
						<Avatar />
						<AppText variant='bodyBold' color={'white'} marginLeft={'m'}>
							{userData.name}
						</AppText>
					</Box>
					<Box
						width={'100%'}
						height={1}
						backgroundColor={'white'}
						marginTop={'m'}
						marginBottom={'xxs'}
					/>
					<Box paddingLeft={'xxl'}>
						{DrawerItemList.map((item, i) => {
							return <DrawerItem key={i} item={item} onPress={handleOnPress(item)} />;
						})}
					</Box>
				</ScrollView>
				{/* <Button
					variant={'buttonTransparent'}
					borderColor={'lightBlue'}
					backgroundColor={'transparent'}
					flexDirection={'row'}
					width={113}
					style={{
						position: 'absolute',
						bottom: Metrics.BOTTOM_SPACE + 35,
						right: theme.spacing.l,
					}}
					onPress={emptyFunction}>
					<Icon.IconC name={'logout'} size={'s'} color={'lightBlue'} />
					<AppText variant='bodyBold' color={'lightBlue'} marginLeft={'s'}>
						THOÁT
					</AppText>
				</Button> */}
			</Box>
		</LinearBg>
	);
};
export default CustomDrawer;
