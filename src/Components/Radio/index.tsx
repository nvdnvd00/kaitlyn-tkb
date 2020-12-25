import { useTheme } from '@shopify/restyle';
import Button from 'Components/Button';
import React, { memo } from 'react';
import Box from '../Box';

const Radio: React.FC<any> = memo(({ isCheck = false, onPress = () => {}, disabled }: any) => {
	const theme = useTheme();

	return (
		<Button onPress={onPress} disabled={disabled} activeOpacity={0.9}>
			<Box
				width={29.33}
				height={29.33}
				borderRadius={'circle'}
				justifyContent='center'
				alignItems='center'
				bg={isCheck ? 'summerSky' : 'grayLightest'}>
				<Box
					width={13.33}
					height={13.33}
					borderRadius={'circle'}
					justifyContent='center'
					alignItems='center'
					bg={isCheck ? 'primary' : 'grayLighter'}>
					{isCheck && <Box width={6} height={6} borderRadius={'circle'} bg={'white'} />}
				</Box>
			</Box>
		</Button>
	);
});

export default Radio;
