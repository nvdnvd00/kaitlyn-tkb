import { createSmartAction } from 'redux-smart-actions';
import GlobalStore from '../helper/globalStore';
import { mappingFormAF0 } from '../Model/AF0Model';
import { mappingBatchData } from '../Model/formModel';
import { mappingCategory } from '../Model/categoryModel';

const METHOD = {
	POST: 'post',
	GET: 'get',
	PATCH: 'patch',
	DELETE: 'delete',
};

let BASE_URL = `http://${GlobalStore.baseURL}:${GlobalStore.port}/api`;
export const setBaseURL = (url: string) => {
	BASE_URL = url;
};

export const signIn = createSmartAction((data) => {
	return {
		loading: true, //default is false
		error: true, //default is true
		request: {
			url: `${BASE_URL}/account/login`,
			method: METHOD.POST,
			data: { ...data, onesingal_device: GlobalStore.notifInfo },
			timeout: 90 * 1000,
		},
		meta: { asMutation: false },
	};
});

export const logout = createSmartAction((data) => {
	return {
		loading: true,
		error: true,
		request: {
			url: `${BASE_URL}/account/logout`,
			method: METHOD.POST,
			data,
		},
		meta: { asMutation: false },
	};
});

export const forgotPassword = createSmartAction((data) => {
	return {
		loading: true,
		error: true,
		request: {
			url: `${BASE_URL}/account/forgotpassword`,
			method: METHOD.POST,
			data,
		},
		meta: {
			asMutation: false,
		},
	};
});

export const resetPassword = createSmartAction((data) => {
	return {
		loading: true,
		error: true,
		request: {
			url: `${BASE_URL}/account/resetpassword`,
			method: METHOD.POST,
			data,
		},
		meta: { asMutation: false },
	};
});

export const changePassword = createSmartAction((data) => {
	return {
		loading: true,
		error: true,
		request: {
			url: `${BASE_URL}/account/updatepassword`,
			method: METHOD.POST,
			data,
		},
		meta: { asMutation: false },
	};
});

export const signUp = createSmartAction((params: any) => {
	return {
		loading: true,
		error: true,
		request: {
			url: `${BASE_URL}/account/register`,
			method: METHOD.POST,
			data: params,
		},
		meta: { asMutation: false },
	};
});

export const verifyOTP = createSmartAction((params) => {
	return {
		loading: true,
		error: true,
		request: {
			url: `${BASE_URL}/account/verifyotp`,
			method: METHOD.POST,
			data: params,
		},
		meta: { asMutation: false },
	};
});

export const resendOTP = createSmartAction((params) => {
	return {
		loading: true,
		error: true,
		request: {
			url: `${BASE_URL}/account/resendotp`,
			method: METHOD.POST,
			data: params,
		},
	};
});
/*Loan Process*/
export const getListFields = createSmartAction((formNames) => {
	return {
		loading: true,
		error: true,
		request: formNames.map((formName: any) => ({
			url: `${BASE_URL}/request/af/get`,
			method: METHOD.POST,
			data: { formname: formName },
		})),
		meta: {
			requestKey: 'AFForm',
			// mutations: {
			// 	[getListFields + id]: (data, mutationData) => mutationData,
			// },
			getData: (data: any, currentData: any) => {
				return {
					success: true,
					data: mappingBatchData(data),
				};
			},
		},
	};
});
export const postListFields = createSmartAction((params) => {
	return {
		loading: true,
		error: true,
		request: {
			url: `${BASE_URL}/request/af/submit`,
			method: METHOD.POST,
			data: params,
		},
		meta: {
			asMutation: false,
		},
	};
});

export const getAf0 = createSmartAction((data) => {
	return {
		loading: true,
		error: true,
		request: {
			url: `${BASE_URL}/request/af0/get`,
			method: METHOD.POST,
			data,
		},
		meta: {
			asMutation: false,
			getData: (data: any, currentData: any) => {
				return {
					success: data.success,
					data: { ...data.data, productlist: mappingFormAF0(data.data.productlist) },
				};
			},
		},
	};
});
export const postAF0 = createSmartAction((data) => {
	return {
		loading: true,
		error: true,
		request: {
			url: `${BASE_URL}/request/af0/submit`,
			method: METHOD.POST,
			data,
		},
	};
});
/*
	 get AF select category
	 EX:
	 body
		 {
			 "category": "national"
		 }
	 response
		{
			"success": true,
			"data": [
			{
				"value": 1,
				"label": "Việt Nam"
			}
		],
			"msg": "success"
		}
*/

/*GET user draft form every time user login to the app*/
export const getDraft = createSmartAction(() => {
	return {
		loading: true,
		error: true,
		request: {
			url: `${BASE_URL}/request/af/getdraft`,
			method: METHOD.POST,
		},
		meta: {
			asMutation: false,
		},
	};
});
//
export const getTermAndPolicy = createSmartAction(() => {
	return {
		loading: true,
		error: true,
		request: {
			url: `${BASE_URL}/contents/key/dieu-khoan`,
			method: METHOD.GET,
		},
		meta: {
			asMutation: false,
		},
	};
});
export const getAboutUs = createSmartAction((data) => {
	return {
		loading: true,
		error: true,
		request: {
			url: `${BASE_URL}/contents/category/about-us `,
			method: METHOD.GET,
		},
		meta: {
			asMutation: false,
		},
	};
});
export const getNotification = createSmartAction((page: number, type: number) => {
	return {
		loading: false,
		error: true,
		request: {
			url: `${BASE_URL}/notification?type=${type}&page=${page}&size=10`,
			method: METHOD.GET,
		},
		meta: {
			asMutation: false,
			requestKey: `${type}_${page}`,
		},
	};
});
export const getNotificationDetail = createSmartAction((id: string) => {
	return {
		loading: false,
		error: true,
		request: {
			url: `${BASE_URL}/notification/${id}`,
			method: METHOD.GET,
		},
		meta: {
			asMutation: false,
		},
	};
});

export const getPromotion = createSmartAction(() => {
	return {
		loading: true,
		error: true,
		request: {
			url: `${BASE_URL}/promotion/intro`,
			method: METHOD.GET,
		},
		meta: {
			asMutation: false,
		},
	};
});
export const getPromotionHome = createSmartAction(() => {
	return {
		loading: true,
		error: true,
		request: {
			url: `${BASE_URL}/promotion/home`,
			method: METHOD.GET,
		},
		meta: {
			asMutation: false,
		},
	};
});
export const getContactInfo = createSmartAction(() => {
	return {
		loading: true,
		error: true,
		request: {
			url: `${BASE_URL}/contents/contactinfo`,
			method: METHOD.GET,
		},
		meta: {
			asMutation: false,
		},
	};
});
export const getFaqAll = createSmartAction(() => {
	return {
		loading: true,
		error: true,
		request: {
			url: `${BASE_URL}/faq/all`,
			method: METHOD.GET,
		},
		meta: {
			asMutation: false,
		},
	};
});

export const checkSesion = createSmartAction(() => {
	return {
		loading: false,
		error: false,
		request: {
			url: `${BASE_URL}/monitor/check/session`,
			method: METHOD.GET,
		},
	};
});

export const checkLoanCondition = createSmartAction((data) => {
	return {
		loading: true,
		error: true,
		request: {
			url: `${BASE_URL}/request/checkloancondition`,
			method: METHOD.POST,
			data,
		},
		meta: {
			asMutation: false,
		},
	};
});

export const checkQualifiedImage = createSmartAction((data) => {
	return {
		loading: true,
		error: true,
		request: {
			url: `${BASE_URL}/request/af/checkqualifiedimage`,
			method: METHOD.POST,
			data,
		},
		meta: {
			asMutation: false,
		},
	};
});
export const getAFCategory = createSmartAction((data) => {
	return {
		loading: true,
		error: true,
		request: data.map((item: { category: string; name: string }) => ({
			url: `${BASE_URL}/request/af/getcategory`,
			method: METHOD.POST,
			data: { category: item.category, name: item.name },
		})),
		meta: {
			takeLatest: true,
			//asMutation: false,
			requestKey: data.category,
			mutations: {
				['GET_AF_CATEGORY_' + data.category]: (data: any, mutationData: any) =>
					mutationData,
			},
			getData: (data: any, currentData: any) => {
				return {
					success: true,
					data: mappingCategory(data),
				};
			},
		},
	};
});
export const getAFCategoryWithParentCode = createSmartAction(
	(data: { category: string; name: string; parent_code: any }) => {
		return {
			loading: true,
			error: true,
			request: {
				url: `${BASE_URL}/request/af/getcategory`,
				method: METHOD.POST,
				data,
			},
			meta: {
				asMutation: false,
				// requestKey: data.category,
				// mutations: {
				// 	['GET_AF_CATEGORY_' + data.category]: (data: any, mutationData: any) =>
				// 		mutationData,
				// },
				// getData: (data: any, currentData: any) => {
				// 	return {
				// 		success: true,
				// 		data: mappingCategory(data),
				// 	};
				// },
			},
		};
	},
);
export const uploadDocument = createSmartAction((data) => {
	return {
		loading: true,
		error: true,
		request: {
			url: `${BASE_URL}/request/document/upload`,
			method: METHOD.POST,
			data,
		},
		meta: {
			asMutation: false,
		},
	};
});

export const clearAFForm = createSmartAction(() => {
	return {
		loading: true,
		error: true,
		request: {
			url: `${BASE_URL}/request/af/clear`,
			method: METHOD.POST,
			data,
		},
		meta: {
			asMutation: false,
		},
	};
});
