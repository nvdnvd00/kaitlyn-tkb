import IAction from '../interfaces/action';
import { COMMON_TYPES } from '../types';
import { createReducer } from '../utils';

export interface IState {
	deviceId: string;
	language: string;
}

const initState: IState = {
	deviceId: '',
	language: 'en',
};

export default createReducer(initState, {
	[COMMON_TYPES.SET_LANGUAGE]: (state: IState, action: IAction) => {
		return {
			...state,
			language: action.payload,
		};
	},
});
