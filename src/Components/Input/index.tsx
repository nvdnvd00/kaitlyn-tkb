import {
	backgroundColor,
	BackgroundColorProps,
	border,
	BorderProps,
	color,
	ColorProps,
	layout,
	LayoutProps,
	opacity,
	OpacityProps,
	position,
	PositionProps,
	spacing,
	SpacingProps,
	typography,
	TypographyProps,
	useRestyle,
	useTheme,
	visible,
	VisibleProps,
} from '@shopify/restyle';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Input, InputProps } from 'react-native-elements';
import theme, { Theme } from 'theme';
import Box from 'Components/Box';
import Button from 'Components/Button';

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
];
type Props = SpacingProps<Theme> &
	BorderProps<Theme> &
	PositionProps<Theme> &
	TypographyProps<Theme> &
	LayoutProps<Theme> &
	VisibleProps<Theme> &
	OpacityProps<Theme> &
	BackgroundColorProps<Theme> &
	ColorProps<Theme> &
	InputProps & {
		error?: any;
		onPress?: () => void;
	};

export default ({ onPress, disabled, error, value, style, containerStyle, ...rest }: Props) => {
	const { style: styleInput, ...props }: Props = useRestyle(restyleFunctions, { style });
	const theme = useTheme();
	return (
		<Button onPress={onPress} disabled={!onPress || disabled}>
			<Input
				containerStyle={[
					{ paddingHorizontal: 0, minHeight: 75, flexGrow: 1 },
					containerStyle,
				]}
				inputContainerStyle={{
					borderBottomWidth: 1,
					borderColor: theme.colors.borderColor,
					height: 35,
					marginTop: 0,
					marginBottom: 0,
				}}
				labelStyle={{
					fontFamily: 'Roboto',
					fontWeight: '400',
					fontSize: 11,
					lineHeight: 16,
					letterSpacing: 1.5,
					color: theme.colors.text,
				}}
				style={StyleSheet.flatten([
					{ fontFamily: 'Roboto', fontSize: 14, fontWeight: '400', color: 'black' },
					styleInput,
				])}
				errorStyle={{
					color: theme.colors.red,
					marginLeft: 0,
					fontSize: 11,
					lineHeight: 18,
					fontWeight: '500',
					fontFamily: 'Roboto-Regular',
				}}
				errorMessage={error}
				value={value}
				editable={!onPress}
				{...rest}
				{...props}
			/>
			{onPress && <Box position='absolute' width={'100%'} height={'100%'} bg='transparent' />}
		</Button>
	);
};
