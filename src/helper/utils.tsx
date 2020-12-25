import { getDay, getTime, isAfter, isBefore, set } from 'date-fns';
import { addDays } from 'date-fns/esm';

export const emptyFunction = (f?: any) => f;

export const isEmptyObj = (obj: any) =>
	typeof obj === 'object' && obj !== null ? Object.keys(obj).length === 0 : true;

export const isStringEmpty = (text: string | undefined | null) =>
	text === undefined || text === null || text === '';

export const capitalizeFirstLetter = (string: string) =>
	string.charAt(0).toUpperCase() + string.slice(1);

export const isNumeric = (value: string) => {
	return /^-?\d+$/.test(value);
};

export const removeEmptyAttributesFromObject = (obj: any) => {
	Object.keys(obj).forEach((key) => (obj[key] === null || obj[key] === '') && delete obj[key]);
	return obj;
};

export const getScheduleByDay = (caData: any[], subjects: any[], time: Date) => {
	const dayOfTheWeek = getDay(time);
	return subjects
		.filter((i: any) => {
			return (
				isAfter(time, new Date(i.from)) &&
				isBefore(time, new Date(i.to)) &&
				i.times.map((j: any) => j.weekday).includes(dayOfTheWeek)
			);
		})
		.map((i: any) => {
			const todayTime = i.times.find((t: any) => t.weekday === dayOfTheWeek);
			const caIdInfo = caData.find((c: any) => c.id === todayTime.caId);
			const timeStartObj = splithhmm(caIdInfo.start);
			const timeEndObj = splithhmm(caIdInfo.end);
			const begin = getTime(
				set(time, {
					hours: timeStartObj.h,
					minutes: timeStartObj.m,
					seconds: 0,
					milliseconds: 0,
				}),
			);
			const end = getTime(
				set(time, {
					hours: timeEndObj.h,
					minutes: timeEndObj.m,
					seconds: 0,
					milliseconds: 0,
				}),
			);
			return {
				...i,
				todayTime: {
					caIdInfo,
					...todayTime,
					begin,
					end,
				},
			};
		})
		.sort((a: any, b: any) => a.todayTime.caId - b.todayTime.caId);
};
export const getFullSchedule = (caData: any[], subjects: any[], from: Date, to: Date) => {
	let result: any[] = [];
	let time = from;
	while (isBefore(time, to)) {
		result = [...result, ...getScheduleByDay(caData, subjects, time)];
		time = addDays(time, 1);
	}
	return result;
};

const splithhmm = (hhmm: string) => {
	return {
		h: +hhmm.split(':')[0],
		m: +hhmm.split(':')[1],
	};
};
