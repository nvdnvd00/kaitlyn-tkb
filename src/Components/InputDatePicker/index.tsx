import format from 'date-fns/format';
import React, { useState } from 'react';
import Box from '../Box';
import Button from '../Button';
import DatePicker from '../DatePicker';
import Icons from '../Icons';
import Input from '../Input';

const InputDatePicker = ({ label, values, error, onChangeValue }: any) => {
	const [pickerShow, setIsPickerShow] = useState(false);
	return (
		<>
			<Button onPress={() => setIsPickerShow(true)}>
				<Input
					label={label?.toUpperCase?.()}
					value={values ? format(values, 'dd/MM/yyyy') : ''}
					editable={false}
					rightIcon={<Icons.IconC name='calendar' size='title' color='text' />}
					error={error}
				/>
				<Box position='absolute' width={'100%'} height={'100%'} bg='transparent' />
			</Button>
			<DatePicker
				onSelectDate={(date) => {
					setIsPickerShow(false);
					setTimeout(() => {
						onChangeValue(date);
					}, 100);
				}}
				date={values ?? new Date()}
				isVisible={pickerShow}
				onClose={() => setIsPickerShow(false)}
			/>
		</>
	);
};
export default InputDatePicker;
