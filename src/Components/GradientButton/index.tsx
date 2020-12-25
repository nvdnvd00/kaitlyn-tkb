import {
	backgroundColor,
	border,
	color,
	layout,
	opacity,
	position,
	shadow,
	spacing,
	typography,
	useRestyle,
	useTheme,
	visible,
} from '@shopify/restyle';
import AppText from 'Components/AppText';
import Button from 'Components/Button';
import React, { memo } from 'react';
import { ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Theme } from 'theme';

const restyleFunctions = [
	spacing,
	border,
	backgroundColor,
	position,
	typography,
	layout,
	color,
	visible,
	opacity,
	shadow,
];

const GradientButton = ({
	textProps = {},
	isGradientBackground,
	text = 'Button',
	backgroundColor,
	contentContainerStyle = {},
	onPress = () => {},
	disabled = false,
	loading = false,
	gradientConfigStyle,
	opacity = 1,
	...rest
}: any) => {
	const tProps = useRestyle(restyleFunctions, textProps);
	const theme = useTheme<Theme>();
	const gradientConfig = {
		colors: ['rgba(8, 30, 131, .8)', 'rgba(4, 103, 188, .9)', 'rgba(0, 179, 248, 1)'],
		locations: [0.005, 0.4, 1],
		// start: { x: 0, y: 0 },
		// end: { x: 1, y: 0 },
		...gradientConfigStyle,
	};
	return (
		<Button
			disabled={disabled}
			variant={'buttonShadow'}
			onPress={onPress}
			activeOpacity={0.9}
			{...rest}>
			<LinearGradient
				{...gradientConfig}
				style={[
					backgroundColor && { backgroundColor },
					{
						height: 36,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						paddingHorizontal: theme.spacing.m,
						borderRadius: theme.borderRadii.s,
						opacity,
					},
					contentContainerStyle,
				]}>
				{loading ? (
					<ActivityIndicator color={'white'} size={'small'} />
				) : (
					<AppText variant={'bodyMedium'} numberOfLines={1} color={'white'} {...tProps}>
						{text}
					</AppText>
				)}
			</LinearGradient>
		</Button>
	);
};

export default memo(GradientButton);
