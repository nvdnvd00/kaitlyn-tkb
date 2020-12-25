import { format } from 'date-fns';
import * as React from 'react';
import { isStringEmpty } from '../../helper/utils';
import AppText from '../AppText';
import Box from '../Box';

interface ScheduleCardProps {
	data: any;
	title?: string;
	key?: number | string;
	hideDay?: boolean;
}

const ScheduleCard = ({ data, title, hideDay = false }: ScheduleCardProps) => {
	return (
		<Box width={'100%'} bg='nero' borderRadius='l' paddingHorizontal='m' pb='m'>
			{title && (
				<AppText variant='heading' textAlign='center' color='dodgerBlue' mt='s'>
					{title}
				</AppText>
			)}
			{!hideDay && (
				<AppText variant='body' color='white' mt='s'>
					Ngày: {format(data?.todayTime.begin, 'dd-MM-yyyy')}
				</AppText>
			)}
			<AppText variant='body' color='white' mt='s'>
				Tên môn: {data?.name}
			</AppText>
			<AppText variant='body' color='white' mt='s'>
				Mã lớp: {data?.code}
			</AppText>
			{data?.todayTime?.tlGroup && (
				<AppText variant='body' color='white' mt='s'>
					Nhóm TL: {data?.todayTime.tlGroup}
				</AppText>
			)}
			<AppText variant='body' color='white' mt='s'>
				Ca: {data?.todayTime.caIdInfo.name}
			</AppText>
			<AppText variant='body' color='white' mt='s'>
				Giờ học: {data?.todayTime.caIdInfo.start} ~ {data?.todayTime.caIdInfo.end}
			</AppText>
			<AppText variant='body' color='white' mt='s'>
				Phòng: {data?.todayTime.room}
			</AppText>

			{!isStringEmpty(data?.todayTime?.note) && (
				<AppText variant='body' color='white' mt='s'>
					{data?.todayTime?.note}
				</AppText>
			)}
		</Box>
	);
};

export default ScheduleCard;
