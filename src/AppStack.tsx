import AsyncStorage from '@react-native-community/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@shopify/restyle';
import { SCREEN_NAME } from 'constant';
import React, { createRef } from 'react';
import Metrics from 'theme/Metrics';
import CustomDrawer from './Components/CustomDrawer';
import Dashboard from './screens/Dashboard';
import WeekSchedule from './screens/WeekSchedule';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
export const navigationRef = createRef<NavigationContainerRef>();

export const navigationNavigate = (name: string, params?: object | undefined) => {
	navigationRef.current?.navigate(name, params);
};

export const navigationGoBack = () => navigationRef.current?.goBack();

export const navigationReset = (name: string, params?: object | undefined) => {
	navigationRef.current?.resetRoot({
		index: 0,
		routes: [{ name, params }],
	});
};

const PERSISTENCE_KEY = `navigationState.001`;
const AppStack = () => {
	const theme = useTheme();
	const DrawerStack = () => {
		return (
			// @ts-ignore
			<Drawer.Navigator
				drawerType={'slide'}
				drawerStyle={
					Metrics.IS_TABLET && Metrics.IS_LARGE_SCREEN
						? { width: '50%' }
						: { width: '80%' }
				}
				overlayColor={theme.colors.ghostWhite_06}
				screenOptions={
					{
						headerShown: false,
					} as any
				}
				drawerContent={(props) => <CustomDrawer {...props} />}>
				<Stack.Screen name={SCREEN_NAME.DASHBOARD} component={Dashboard} />
				<Stack.Screen name={SCREEN_NAME.WEEK_SCHEDULE} component={WeekSchedule} />
			</Drawer.Navigator>
		);
	};

	return (
		<NavigationContainer
			ref={navigationRef}
			// initialState={initialState}
			onStateChange={(state) => AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))}>
			<Stack.Navigator
				headerMode={'none'}
				initialRouteName={SCREEN_NAME.MAIN_DRAWER}
				screenOptions={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}>
				<Stack.Screen name={SCREEN_NAME.MAIN_DRAWER} component={DrawerStack} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppStack;
