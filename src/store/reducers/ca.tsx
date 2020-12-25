import caData from '../../mock/ca.json';
import { createReducer } from '../utils';

export interface IState {
	data: any[];
}

const initState: IState = {
	data: caData,
};

export default createReducer(initState, {});
