import React, { useState } from 'react';
import Input from 'Components/Input';
import Button from 'Components/Button';
import Icon from '../Icons';

export default ({ ...rest }: any) => {
	const [hidePass, setHidePass] = useState(true);
	return (
		<Input
			{...rest}
			secureTextEntry={hidePass}
			// rightIcon={
			//     <Button
			//         onPress={() => setHidePass((value) => !value)}>
			//         <Icon.IconC
			//             name={hidePass ? 'eye' : 'eye'}
			//             color='grayLighter'
			//         />
			//     </Button>
			// }
		/>
	);
};
