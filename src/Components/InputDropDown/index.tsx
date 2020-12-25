import React from 'react';
import AppText from '../AppText';
import Box from '../Box';
import CustomDropdown from '../CustomDropDown';

interface InputDropDownProps {
	label?: string;
	data?: object[];
	onSelected?: (item: object) => void;
	values?: any;
	placeHolder?: string;
	error?: any;
	editable?: boolean;
	renderKey?: any;
	compareKey?: any;
	onPress?: any;
}

const InputDropDown = ({
	label = 'DROPDOWN LABEL',
	data = [],
	placeHolder = '',
	onSelected,
	values = 0,
	error,
	editable,
	renderKey,
	compareKey,
}: InputDropDownProps) => {
	const onSelect = (item: object) => {
		if (onSelected) {
			onSelected(item);
		}
	};
	return (
		<Box marginBottom={'s'} opacity={editable ? 1 : 0.5}>
			<AppText variant={'inputLabel'} color={'text'}>
				{label?.toUpperCase?.()}
			</AppText>
			<CustomDropdown
				data={data}
				placeholder={placeHolder}
				values={values}
				onSelect={onSelect}
				iconArrow={'menu2'}
				disabled={!editable}
				renderKey={renderKey}
				compareKey={compareKey}
			/>
			<AppText variant={'caption'} color={'red'}>
				{error}
			</AppText>
		</Box>
	);
};

export default InputDropDown;
