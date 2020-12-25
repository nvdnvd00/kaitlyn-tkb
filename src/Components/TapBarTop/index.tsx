import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { Route, SceneRendererProps } from 'react-native-tab-view';
import theme from 'theme';
import AppText from '../AppText';
import Box from '../Box';

const styles = StyleSheet.create({
	item: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 4.5,
	},
	activeItem: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	active: {
		color: '#0084ff',
	},
	inactive: {
		color: '#939393',
	},
});
const renderItem = ({
	navigationState,
	position,
}: {
	navigationState: State;
	position: Animated.Node<number>;
}) => ({ route, index }: { route: Route; index: number }) => {
	const inputRange = navigationState.routes.map((_, i) => i);
	const activeOpacity = Animated.interpolate(position, {
		inputRange,
		outputRange: inputRange.map((i: number) => (i === index ? 1 : 0)),
	});
	const inactiveOpacity = Animated.interpolate(position, {
		inputRange,
		outputRange: inputRange.map((i: number) => (i === index ? 0 : 1)),
	});

	return (
		<Animated.View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				borderBottomWidth: 2,
				borderLeftWidth:
					index === 0 ||
					navigationState?.routes?.length - 1 === index ||
					navigationState.index === index
						? 2
						: 0,
				borderTopWidth: 0,
				borderRightWidth:
					index === 0 ||
					navigationState?.routes?.length - 1 === index ||
					navigationState.index === index
						? 2
						: 0,
				borderBottomLeftRadius: index === 0 ? 6 : 0,
				borderTopLeftRadius: index === 0 ? 6 : 0,
				borderBottomRightRadius: navigationState?.routes?.length - 1 === index ? 6 : 0,
				borderTopRightRadius: navigationState?.routes?.length - 1 === index ? 6 : 0,
				borderColor:
					navigationState.index === index ? theme.colors.primary : theme.colors.lightgrey,
			}}>
			<Animated.View style={[styles.item, { opacity: inactiveOpacity }]}>
				<AppText variant={'body'} color={'text'}>
					{route.title}
				</AppText>
			</Animated.View>
			<Animated.View style={[styles.item, styles.activeItem, { opacity: activeOpacity }]}>
				<AppText variant={'body'} color={'black'}>
					{route.title}
				</AppText>
			</Animated.View>
		</Animated.View>
	);
};

const renderTabBar: (props: any) => any = (
	props: SceneRendererProps & { navigationState: State },
) => (
	<Box
		flexDirection={'row'}
		height={60}
		justifyContent={'space-between'}
		backgroundColor={'transparent'}>
		{props.navigationState.routes.map((route: Route, index: number) => {
			return (
				<TouchableWithoutFeedback key={route.key} onPress={() => props.jumpTo(route.key)}>
					{renderItem(props)({ route, index })}
				</TouchableWithoutFeedback>
			);
		})}
	</Box>
);
export default { renderTabBar };
