// Libraries
import { useTheme } from '@shopify/restyle';
import * as React from 'react';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import { Theme } from 'theme';
import icoMoonConfig from './selection.json';

const IconC = createIconSetFromIcoMoon(icoMoonConfig);

export default {
	IconC: ({
		color = 'white',
		size = 's',
		name = 'logout',
	}: {
		color?: keyof Theme['colors'];
		size?: keyof Theme['fontSize'];
		name?: string;
	}) => {
		const theme = useTheme<Theme>();
		return <IconC name={name} size={theme.fontSize[size]} color={theme.colors[color]} />;
	},
};
