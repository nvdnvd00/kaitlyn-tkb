import { BoxProps } from '@shopify/restyle';
import Box from 'Components/Box';
import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Theme } from 'theme';

type CardProps = BoxProps<Theme> & {
	style?: StyleProp<ViewStyle>;
	children?: React.ReactNode;
};

const Card = ({ style, children, ...rest }: CardProps) => {
	return (
		<Box
			padding={'m'}
			backgroundColor={'white'}
			borderRadius={'m'}
			shadowColor='shadow'
			shadowOffset={{ width: 0, height: 2 }}
			shadowOpacity={0.25}
			shadowRadius={4}
			elevation={5}
			{...rest}
			{...{ style }}>
			{children}
		</Box>
	);
};

export default Card;
