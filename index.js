import { AppRegistry, LogBox } from 'react-native';
import App from './src/App';

/**
 * React Native 0.54 warning message ignore.
 */
LogBox.ignoreLogs([
	'Warning: componentWillMount is deprecated',
	'Warning: componentWillReceiveProps is deprecated',
	'Module RCTImageLoader',
]);

AppRegistry.registerComponent('tkb', () => App);
