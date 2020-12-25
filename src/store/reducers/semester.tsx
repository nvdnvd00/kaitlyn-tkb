import { addYears, getTime } from 'date-fns';
import { createReducer } from '../utils';

export interface IState {
	from: number;
	to: number;
}

const initState: IState = {
	from: getTime(new Date()),
	to: getTime(addYears(new Date(), 1)),
};

export default createReducer(initState, {});
