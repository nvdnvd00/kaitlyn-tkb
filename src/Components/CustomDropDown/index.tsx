import { useTheme } from '@shopify/restyle';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import Metrics from '../../theme/Metrics';
import AppText from '../AppText';
import Box from '../Box';
import Icon from '../Icons';
import ModalDropdown from './ModalDropDown';

interface CustomDropdownProps {
	onSelect?: (value: object) => void;
	data?: any[];
	disabled?: boolean;
	placeholder?: string;
	values?: any;
	dropdownStyle?: any;
	iconArrow?: any;
	error?: any;
	renderKey?: string;
	compareKey?: string;
}

const CustomDropdown = ({
	onSelect,
	data,
	disabled,
	placeholder,
	values,
	dropdownStyle,
	iconArrow = 'menu2',
	error,
	renderKey,
	compareKey,
}: CustomDropdownProps) => {
	const [layout, setLayout] = useState({ width: 0, height: 0, x: 0, y: 0 });
	const [focus, setFocus] = useState(false);
	const theme = useTheme();
	const handleSelect = async (index: any, value: { key: any; value: any }) => {
		if (onSelect) {
			onSelect(value);
		}
	};

	// {
	// 	key: string | number | null | undefined;
	// 	icon: string | undefined;
	// 	value: React.ReactNode;
	// }
	const renderRow = (rowData: any, rowID: any) => {
		return (
			<Box
				minHeight={50}
				flexDirection={'row'}
				alignItems={'center'}
				paddingHorizontal={'m'}
				paddingVertical={'m'}
				backgroundColor={'solitude'}
				key={rowData?.[compareKey ? compareKey : 'key']}>
				{rowData.icon && <Icon.IconC name={rowData.icon} />}
				<AppText variant={'inputText'} color={'black'}>
					{rowData?.[renderKey ? renderKey : 'value']}
				</AppText>
			</Box>
		);
	};

	const defaultIndex =
		data?.findIndex(
			(item: any) =>
				item?.[compareKey ? compareKey : 'key']?.toString() === values?.toString(),
		) ?? 0;
	// focus
	return (
		<ModalDropdown
			disabled={disabled}
			defaultIndex={defaultIndex}
			dropdownStyle={[
				{
					marginTop: Platform.OS === 'android' ? -14 : 10,
					flexDirection: 'row',
					borderColor: theme.colors.borderColor,
					backgroundColor: theme.colors.solitude,
					borderRadius: theme.borderRadii.s,
					borderWidth: 1,
					//	alignItems: 'center',
					overflow: 'hidden',
					height: data?.length * 50,
					maxHeight: Metrics.SCREEN_HEIGHT / 4,
				},
				{ width: layout.width },
				dropdownStyle,
			]}
			options={data}
			onSelect={handleSelect}
			renderRow={renderRow}
			onDropdownWillShow={() => setFocus(true)}
			onDropdownWillHide={() => setFocus(false)}
			renderSeparator={() => (
				<Box height={1} backgroundColor={'borderColor'} marginHorizontal={'m'} />
			)}>
			<Box>
				<Box
					flexDirection={'row'}
					width={'100%'}
					borderColor={'borderColor'}
					borderBottomWidth={1}
					backgroundColor={'white'}
					alignItems={'center'}
					paddingVertical={'s'}
					onLayout={(event) => {
						const { x, y, width, height } = event.nativeEvent.layout;
						setLayout({ ...layout, width, height, x, y });
					}}>
					{/*{data?.[defaultIndex]?.icon && <Icon.IconC name={data[defaultIndex].icon} />}*/}

					<AppText variant={'inputText'} color={'black'} style={{ width: '85%' }}>
						{defaultIndex < 0
							? placeholder
							: data?.[defaultIndex]?.[renderKey ? renderKey : 'value']}
					</AppText>

					{iconArrow ? (
						<Box width={40} justifyContent={'flex-end'} alignItems={'flex-end'}>
							<Icon.IconC name={iconArrow} color={'text'} size={'caption'} />
						</Box>
					) : null}
				</Box>
			</Box>
		</ModalDropdown>
	);
};
export default CustomDropdown;
