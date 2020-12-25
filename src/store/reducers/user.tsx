import userData from '../../mock/user.json';
import { createReducer } from '../utils';

export interface IState {
	data: any;
}

const initState: IState = {
	data: userData,
};

export default createReducer(initState, {});
