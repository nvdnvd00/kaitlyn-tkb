import { ThemeProvider } from '@shopify/restyle';
import React from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import useMount from 'react-use/lib/useMount';
import theme from 'theme';
import Container from './Container';
import store from './store';

const App = () => {
	useMount(() => {
		StatusBar.setBarStyle('light-content');
		SplashScreen.hide();
	});
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<Container />
			</ThemeProvider>
		</Provider>
	);
};

export default App;
