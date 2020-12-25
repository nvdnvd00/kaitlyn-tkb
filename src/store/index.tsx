import AsyncStorage from '@react-native-community/async-storage';
import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
// import { NODE_ENV } from '../../env';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
// import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './saga'; // defaults to localStorage for web

export interface State {}
let store: any;
let sagaMiddleware: any = createSagaMiddleware();
let middlewares = [sagaMiddleware];
// const autoMergeLevel2 = require("redux-persist/lib/stateReconciler/autoMergeLevel2").default;
const persistConfig = {
	version: 0,
	timeout: 10000,
	key: 'root',
	storage: AsyncStorage,
	whitelist: [],
	// stateReconciler: autoMergeLevel2,
};

if (__DEV__) {
	middlewares.push(logger);
}
store = createStore(
	persistReducer(persistConfig, rootReducer),
	compose(applyMiddleware(...middlewares)),
);
store.__PERSISTOR = persistStore(store);

sagaMiddleware.run(rootSaga);

export const makeStore = () => store;

export default store;
