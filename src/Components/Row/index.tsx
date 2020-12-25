import { BoxProps } from '@shopify/restyle';
import Button from 'Components/Button';
import React from 'react';
import { Theme } from 'theme';
import Box from '../Box';

type RowProps = BoxProps<Theme> & {
	type?: 'white' | 'primary' | undefined | string;
	onPress?: () => void;
	height?: number;
	borderRadius?: keyof Theme['borderRadii'];
	children?: React.ReactNode;
	index?: number;
	contentflexDirection?: 'row' | 'column';
	disableRowType?: boolean;
};

const defaultProps: RowProps = {
	type: 'white',
	borderRadius: 'm',
	index: 0,
};
const RowType = {
	white: 'white',
	primary: 'primary',
};
const Row = ({
	type,
	onPress,
	height,
	borderRadius,
	children,
	index = 0,
	contentflexDirection = 'row',
	disableRowType = false,
	...rest
}: RowProps) => {
	type = disableRowType ? RowType.white : index % 2 === 0 ? RowType.white : RowType.primary;
	let shadow =
		type === RowType.white
			? {
					shadowColor: 'black',
					shadowOffset: {
						width: 0,
						height: 4,
					},
					shadowOpacity: 0.32,
					shadowRadius: 5.46,
					elevation: 9,
			  }
			: null;
	return (
		<Button activeOpacity={0.9} onPress={onPress}>
			<Box
				width={'100%'}
				minHeight={90}
				height={height}
				backgroundColor={type}
				borderRadius={borderRadius}
				overflow={type === RowType.primary ? 'hidden' : 'visible'}
				shadowColor={shadow?.shadowColor}
				shadowOffset={shadow?.shadowOffset}
				shadowOpacity={shadow?.shadowOpacity}
				shadowRadius={shadow?.shadowRadius}
				elevation={shadow?.elevation}
				{...rest}>
				<Box padding={'m'} flexDirection={contentflexDirection} flex={1} zIndex={'modal'}>
					{children}
				</Box>
				{type === RowType.primary ? (
					<Box
						position={'absolute'}
						right={-100}
						top={-50}
						borderTopLeftRadius={`111`}
						borderBottomLeftRadius={`111`}
						width={222}
						height={222}
						backgroundColor={'mayaBlue'}
						opacity={0.24}
					/>
				) : null}
			</Box>
		</Button>
	);
};
Row.defaultProps = defaultProps;
export { Row, RowType };
