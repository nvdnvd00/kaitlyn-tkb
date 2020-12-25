import Box from 'Components/Box';
import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import metrics from 'theme/Metrics';

interface LinearBgProps {
	children?: React.ReactNode;
	linearHeight?: number | string;
}

const LinearBg = ({
	children,
	linearHeight = metrics.SCREEN_HEIGHT / 2,
	...rest
}: LinearBgProps) => {
	const { SCREEN_WIDTH } = metrics;
	return (
		<Box flex={1} backgroundColor={'white'} {...rest}>
			<LinearGradient
				start={{ x: 1, y: 0.5 }}
				end={{ x: 0, y: 0.8 }}
				locations={[0.0726, 1]}
				colors={['black', '#2c3e50']}
				style={{
					height: linearHeight,
					width: '100%',
					position: 'absolute',
				}}></LinearGradient>
			{children}
		</Box>
	);
};

export default LinearBg;
