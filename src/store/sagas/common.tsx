// function* callGetCountries() {
//   try {
//     // yield put(CommonActions.showLoading());
//     const { data } = yield call(CommonApis.getCountries());

//     yield put({ type: getUpdatingType(COMMON_TYPES.COUNTRIES), payload: data });
//     // yield put(CommonActions.hideLoading());
//   } catch (e) {
//     // yield put(CommonActions.hideLoading());
//     if (e.code != 9999) {
//       yield put(CommonActions.openNotificationPopup({ message: e.message }));
//     }
//   }
// }

export default function* watchAll() {
	// yield takeLeading((COMMON_TYPES.COUNTRIES), (callGetCountries));
}
