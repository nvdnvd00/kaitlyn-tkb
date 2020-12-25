import { COMMON_TYPES } from '../types';

const setLanguage = (language: string) => ({
	type: COMMON_TYPES.SET_LANGUAGE,
	payload: language,
});

export default {
	setLanguage,
};
