import { BoxProps, useTheme } from '@shopify/restyle';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from 'theme';
import Metrics from 'theme/Metrics';
import { navigationGoBack } from '../../AppStack';
import AppText from '../AppText';
import Box from '../Box';
import Button from '../Button';
import Icon from '../Icons';

type Props = BoxProps<Theme> & {
	left: any;
	right: any;
	center: any;
	title: string;
	titleColor: keyof Theme['colors'];
	hideCenter: any;
	hideLeft: any;
	hideRight: any;
	iconRight: any;
	iconRightColor: any;
	onPressRight: any;
	iconLeft: any;
	iconLeftColor: any;
	onPressLeft: any;
	hideShadow: boolean;
	iconLeftSize: keyof Theme['fontSize'];
	iconRightSize: keyof Theme['fontSize'];
};

const Header: React.FC<any> = ({
	left,
	right,
	center,
	title,
	titleColor = 'white',
	hideCenter,
	hideLeft,
	hideRight,
	iconRight,
	iconRightColor,
	onPressRight,
	iconLeft,
	iconLeftColor,
	onPressLeft,
	hideShadow = true,
	iconLeftSize = 's',
	iconRightSize = 's',
	...rest
}: Props) => {
	const theme = useTheme<Theme>();
	const insets = useSafeAreaInsets();
	const renderCenter = () => {
		if (center) return center;
		if (hideCenter) return null;
		return (
			<AppText variant='heading' color={titleColor}>
				{title?.toUpperCase?.() ?? title}
			</AppText>
		);
	};
	const renderLeft = () => {
		if (left) return left;
		if (hideLeft) return null;
		return (
			<Button
				onPress={onPressLeft ? onPressLeft : () => navigationGoBack()}
				alignItems={'flex-start'}
				hitSlop={{ left: 20, right: 20, bottom: 10, top: 10 }}>
				<Icon.IconC
					name={iconLeft ? iconLeft : 'back'}
					color={iconLeftColor ? iconLeftColor : 'white'}
					size={iconLeftSize}
				/>
			</Button>
		);
	};
	const renderRight = () => {
		if (right) return right;
		if (hideRight) return null;
		if (iconRight && onPressRight)
			return (
				<Button
					onPress={onPressRight}
					alignItems={'flex-end'}
					hitSlop={{ left: 20, right: 20, bottom: 10, top: 10 }}>
					<Icon.IconC
						name={iconRight}
						color={iconRightColor ? iconRightColor : 'white'}
						size={iconRightSize}
					/>
				</Button>
			);
	};
	return (
		<Box
			flexDirection={'row'}
			alignItems={'center'}
			justifyContent={'center'}
			flexWrap={'wrap'}
			width={'100%'}
			height={Metrics.HEADER_HEIGHT}
			paddingHorizontal={'m'}
			backgroundColor={'transparent'}
			style={{
				paddingTop: Metrics.STATUS_BAR_HEIGHT,
			}}
			shadowColor={'black'}
			shadowOffset={{
				width: 0,
				height: hideShadow ? 0 : 1,
			}}
			shadowOpacity={hideShadow ? 0 : 0.25}
			shadowRadius={hideShadow ? 0 : 2}
			elevation={hideShadow ? 0 : 3}
			// zIndex={'header'}
			{...rest}>
			{/*Left*/}
			<Box flex={0.5} justifyContent={'flex-start'}>
				{renderLeft()}
			</Box>
			{/*Center*/}
			<Box flex={1} alignItems={'center'} justifyContent={'center'} height='100%'>
				{renderCenter()}
			</Box>
			{/*Right*/}
			<Box flex={0.5} justifyContent={'flex-end'}>
				{renderRight()}
			</Box>
		</Box>
	);
};

export default Header;
