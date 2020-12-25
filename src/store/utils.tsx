import { IState as ICommon } from './reducers/common';

export const createReducer = (initialState: any, reducerMap: any) => (
	state = initialState,
	action: any,
) => {
	const reducer = reducerMap[action.type];
	if (typeof reducer !== 'function') {
		return state;
	}
	return reducer(state, action);
};

export const getAddingType = (type: string) => `ADD_${type}`;
export const getUpdatingType = (type: string) => `UPDATE_${type}`;
export const getDeletingType = (type: string) => `DELETE_${type}`;

export const sagaGettingType = (type: string) => `CALL_GET_${type}`;
export const sagaAddingType = (type: string) => `CALL_${getAddingType(type)}`;
export const sagaUpdatingType = (type: string) => `CALL_${getUpdatingType(type)}`;
export const sagaDeletingType = (type: string) => `CALL_${getDeletingType(type)}`;

export const getCommon = ({ common }: { common: ICommon }) => common;
