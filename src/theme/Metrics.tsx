import { Dimensions, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { getBottomSpace, getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';

const width = Dimensions.get('window').width;
const height =
	Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('screen').height;

// MKT view
const MKT_IMAGE_D_HEIGHT = 390;
const MKT_IMAGE_D_WIDTH = 291;
const MKT_IMAGE_MAX_HEIGHT = MKT_IMAGE_D_HEIGHT * 2;
const MKT_IMAGE_MAX_WIDTH = MKT_IMAGE_D_WIDTH * 2;
const MKT_IMAGE_RATIO = MKT_IMAGE_D_WIDTH / MKT_IMAGE_D_HEIGHT;
const MKT_IMAGE_NEW_HEIGHT = (width - 80) / MKT_IMAGE_RATIO;
const MKT_IMAGE_NEW_WIDTH = MKT_IMAGE_NEW_HEIGHT * MKT_IMAGE_RATIO;

const metrics = {
	BUTTON_RADIUS: 3,
	INPUT_RADIUS: 5,
	CARD_RADIUS: 5,
	MODAL_RADIUS: 15,
	DIALOG_RADIUS: 20,
	SWITCH_WRAP_RADIUS: 6,
	SWITCH_INNER_RADIUS: 4,
	CARD_COIN_RADIUS: 10,
	CHECK_BOX_RADIUS: 6,
	CONTAINER_RADIUS: 30,
	//
	SCREEN_WIDTH: width,
	SCREEN_HEIGHT: height,
	//
	HORIZONTAL_LINE_HEIGHT: 1,
	//
	HEADER_HEIGHT: 50 + getStatusBarHeight(),
	HEADER_PADDING_HORIZONTAL: 15,
	CONTENT_PADDING: 15,
	//
	STATUS_BAR_HEIGHT: getStatusBarHeight(false),
	BOTTOM_SPACE: Platform.OS === 'ios' ? getBottomSpace() : getBottomSpace() + 50,
	//
	INPUT_BORDER_WIDTH: 1,
	isIphoneX,
	IS_TABLET: DeviceInfo.isTablet(),
	IS_LARGE_SCREEN: width >= 768,
	MKT_CAROUSEL_HEIGHT:
		MKT_IMAGE_NEW_HEIGHT > MKT_IMAGE_MAX_HEIGHT ? MKT_IMAGE_MAX_HEIGHT : MKT_IMAGE_NEW_HEIGHT,
	MKT_CAROUSEL_WIDTH:
		MKT_IMAGE_NEW_WIDTH > MKT_IMAGE_MAX_WIDTH ? MKT_IMAGE_MAX_WIDTH : MKT_IMAGE_NEW_WIDTH,
};

export default metrics;
