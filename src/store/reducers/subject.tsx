import subjects from '../../mock/subjects.json';
import { createReducer } from '../utils';
export interface IState {
	data: any[];
}

const initState: IState = {
	data: subjects.map((i: any) => ({
		...i,
		from: __DEV__ ? 1509952788000 : i.from,
	})),
};

export default createReducer(initState, {});
