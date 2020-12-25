import { all } from 'redux-saga/effects';
import CommonSagas from './sagas/common';

function* rootSaga() {
	yield all([
		/* */
		CommonSagas(),
	]);
}

export default rootSaga;
