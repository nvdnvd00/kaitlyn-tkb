import InputDropDown from './index';
import React from 'react';
import { useSelector } from 'react-redux';
import { getDistricts, getProvince, getWard } from '../../helper/hook';

interface CategoryCDropDownProps {
	setFieldValue: (key: string | undefined, value: string | undefined) => void;
	fieldName?: string;
	values?: any;
	label?: any;
	error?: any;
	editable: boolean;
}

export const CategoryCDropDown = ({
	setFieldValue,
	fieldName,
	values,
	label,
	error,
	editable,
}: CategoryCDropDownProps) => {
	const { categoryList } = useSelector((state) => state?.categoryReducer);
	const { data: formValues } = useSelector((state) => state?.afFormReducer);
	//console.log(categoryList, fieldName);
	const onSelect = (item: { key: string }) => {
		if (fieldName === 'national') {
			if (formValues.same_as_current_address) {
				setFieldValue('permanent_nation', item?.key.toString());
			}
		}
		if (fieldName === 'province') {
			if (formValues.same_as_current_address) {
				setFieldValue('permanent_province', item?.key.toString());
			}
		}
		if (fieldName === 'district') {
			if (formValues.same_as_current_address) {
				setFieldValue('permanent_district', item?.key.toString());
			}
		}
		if (fieldName === 'ward') {
			if (formValues.same_as_current_address) {
				setFieldValue('permanent_ward', item?.key.toString());
			}
		}
		setFieldValue(fieldName, item?.key.toString());
		getViaSelect(fieldName, item?.key);
	};
	const getViaSelect = (fieldName: string | undefined, key: string) => {
		switch (fieldName) {
			case 'national':
				// get next Data province
				return getProvince(key, 'province');
			case 'province':
				// get next Data district
				return getDistricts(key, 'district');
			case 'district':
				// get next Data 'ward'
				return getWard(key, 'ward');
			case 'workplace_national':
				return getProvince(key, 'workplace_province');
			case 'workplace_province':
				return getDistricts(key, 'workplace_district');
			case 'workplace_district':
				return getWard(key, 'workplace_ward');
			case 'permanent_nation':
				return getProvince(key, 'permanent_province');
			case 'permanent_province':
				return getDistricts(key, 'permanent_district');
			case 'permanent_district':
				return getWard(key, 'permanent_ward');
			default:
				return;
		}
	};
	const getData = () => {
		if (fieldName === 'permanent_nation') {
			return categoryList?.national || [];
		}
		if (fieldName === 'permanent_province') {
			return categoryList?.province || [];
		}
		if (fieldName === 'permanent_district') {
			return categoryList?.district || [];
		}
		if (fieldName === 'permanent_ward') {
			return categoryList?.ward || [];
		}
		return categoryList?.[fieldName];
	};
	return (
		<InputDropDown
			onSelected={onSelect}
			values={values}
			label={label}
			data={getData()}
			error={error}
			editable={editable}
		/>
	);
};
