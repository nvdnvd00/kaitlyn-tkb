import React from 'react';
import { TouchableOpacity } from 'react-native';
import images from '../../Assets/Images';
import ImageC from '../Image';

interface AvatarProps {
	variant?: string;
}

const defaultProps: AvatarProps = {
	variant: 'avatar_m',
};
const Avatar = ({ variant }: AvatarProps) => {
	return (
		<TouchableOpacity>
			<ImageC variant={variant} source={images.kn1} />
		</TouchableOpacity>
	);
};
Avatar.defaultProps = defaultProps;

export default Avatar;
