import { useTheme } from '@shopify/restyle';
import Button from 'Components/Button';
import React, { memo } from 'react';
import { Theme } from 'theme';
import Box from '../Box';
import Icon from '../Icons';

type Props = {
	isCheck: boolean;
	onPress: () => void;
	disabled: boolean;
	iconColor: keyof Theme['colors'];
	iconSize: keyof Theme['fontSize'];
	width: number;
	height: number;
	activeColor: keyof Theme['colors'];
	borderColor: keyof Theme['colors'];
	inActiveColor: keyof Theme['colors'];
};

const CheckBox: React.FC<any> = memo(
	({
		isCheck = false,
		onPress = () => {},
		disabled,
		iconColor = 'white',
		iconSize = 'xs',
		width = 18,
		height = 18,
		activeColor = 'primary',
		borderColor = 'primary',
		inActiveColor = 'white',
	}: Props) => {
		const theme = useTheme<Theme>();
		return (
			<Button onPress={onPress} disabled={disabled} activeOpacity={0.9}>
				<Box
					width={width}
					height={height}
					borderRadius={'s'}
					backgroundColor={isCheck ? activeColor : inActiveColor}
					alignItems='center'
					justifyContent='center'
					borderColor={borderColor}
					borderWidth={0.5}>
					{isCheck ? (
						<Icon.IconC name={'check'} color={iconColor} size={iconSize} />
					) : null}
				</Box>
			</Button>
		);
	},
);

export default CheckBox;
