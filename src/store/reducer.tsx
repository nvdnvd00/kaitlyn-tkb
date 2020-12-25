import AsyncStorage from '@react-native-community/async-storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import ca, { IState as ICa } from './reducers/ca';
import common, { IState as ICommon } from './reducers/common';
import semester, { IState as ISemester } from './reducers/semester';
import subject, { IState as ISubject } from './reducers/subject';
import user, { IState as IUser } from './reducers/user';

const commonPersistConfig = {
	key: 'common',
	storage: AsyncStorage,
	whitelist: ['language'],
};
const caPersistConfig = {
	key: 'ca',
	storage: AsyncStorage,
	whitelist: ['data'],
};
const subjectPersistConfig = {
	key: 'subject',
	storage: AsyncStorage,
	whitelist: ['data'],
};
const semesterPersistConfig = {
	key: 'semester',
	storage: AsyncStorage,
	whitelist: ['from', 'to'],
};

const reducer = combineReducers({
	common: persistReducer(commonPersistConfig, common),
	// ca: persistReducer(caPersistConfig, ca),
	ca,
	subject,
	semester,
	user,
} as any);

export type RootReducer = {
	common: ICommon;
	subject: ISubject;
	ca: ICa;
	semester: ISemester;
	user: IUser;
};

export default reducer;
