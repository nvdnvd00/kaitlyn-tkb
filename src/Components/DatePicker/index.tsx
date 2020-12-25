import DateTimePicker from '@react-native-community/datetimepicker';
import Box from 'Components/Box';
import isValid from 'date-fns/isValid';
import * as React from 'react';
import { useState } from 'react';
import { Platform } from 'react-native';
import Modal from 'react-native-modal';
import useUpdateEffect from 'react-use/lib/useUpdateEffect';
interface DatePickerProps {
	onSelectDate: (date: Date) => void;
	date: Date;
	isVisible: boolean;
	onClose: () => void;
}

const DatePicker = ({
	onSelectDate,
	date = new Date(),
	isVisible = false,
	onClose = () => {},
}: DatePickerProps) => {
	const [tempTimeIOS, setTempTimeIOS] = useState(date);
	useUpdateEffect(() => {
		setTempTimeIOS(date);
	}, [date]);

	return (
		<Box>
			{Platform.OS === 'ios' && (
				<Modal
					isVisible={isVisible}
					onBackdropPress={() => {
						onSelectDate(tempTimeIOS);
						onClose();
					}}
					onModalShow={() => setTempTimeIOS(date)}
					onModalHide={() => onSelectDate(tempTimeIOS)}>
					<Box padding='m' backgroundColor='white' borderRadius={'s'}>
						<DateTimePicker
							value={tempTimeIOS}
							mode={'date'}
							display={'default'}
							onChange={(event: any, date: any) => setTempTimeIOS(date)}
							// minimumDate={minimumTime}
							// maximumDate={add(minimumTime, {
							// 	days: preOrderLimitDays,
							// })}
						/>
					</Box>
				</Modal>
			)}
			{Platform.OS === 'android' && isVisible && (
				<DateTimePicker
					value={date}
					mode={'date'}
					display={'default'}
					locale='vi_VN'
					onChange={(event: any, date: any) => {
						if (isValid(date)) {
							onSelectDate(date);
						} else {
							onClose();
						}
					}}
					// minimumDate={minimumTime}
					// maximumDate={add(minimumTime, {
					// 	days: preOrderLimitDays,
					// })}
				/>
			)}
		</Box>
	);
};

export default DatePicker;
