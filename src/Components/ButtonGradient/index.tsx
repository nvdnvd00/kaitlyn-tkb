import * as React from 'react';
import metrics from 'theme/Metrics';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../Button';
import { useTheme } from '@shopify/restyle';

interface LinearBgProps {
	children?: React.ReactNode;
}

const ButtonGradient = ({ children, ...rest }: LinearBgProps) => {
	const { SCREEN_WIDTH, SCREEN_HEIGHT, HEADER_HEIGHT } = metrics;
	const them = useTheme();
	return (
		<Button {...rest}>
			<LinearGradient
				//] start={{ x: 0, y: 0 }}
				// end={{ x: 1, y: 0 }}
				locations={[0.005, 0.3, 1]}
				colors={['rgba(8, 30, 131, 0.8)', 'rgba(4, 103, 188, 0.5)', 'rgba(0, 179, 248, 1)']}
				style={{
					width: '100%',
					height: '100%',
					alignItems: 'center',
					justifyContent: 'center',
					borderRadius: them.borderRadii.s,
				}}>
				{children}
			</LinearGradient>
		</Button>
	);
};

export default ButtonGradient;
