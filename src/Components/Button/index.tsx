import {
	backgroundColor,
	BackgroundColorProps,
	backgroundColorShorthand,
	BackgroundColorShorthandProps,
	border,
	BorderProps,
	createRestyleComponent,
	createVariant,
	layout,
	LayoutProps,
	opacity,
	OpacityProps,
	position,
	PositionProps,
	shadow,
	ShadowProps,
	spacing,
	SpacingProps,
	spacingShorthand,
	SpacingShorthandProps,
	VariantProps,
} from '@shopify/restyle';
import { TouchableOpacity } from 'react-native';
import { Theme } from 'theme';

type Props = VariantProps<Theme, 'touchableVariants'> &
	SpacingProps<Theme> &
	SpacingShorthandProps<Theme> &
	LayoutProps<Theme> &
	PositionProps<Theme> &
	OpacityProps<Theme> &
	BackgroundColorProps<Theme> &
	BackgroundColorShorthandProps<Theme> &
	BorderProps<Theme> &
	ShadowProps<Theme> &
	React.ComponentProps<typeof TouchableOpacity> & {
		children?: any;
	};

const Button = createRestyleComponent<Props, Theme>(
	[
		spacingShorthand,
		backgroundColorShorthand,
		position,
		spacing,
		layout,
		opacity,
		backgroundColor,
		shadow,
		border,
		createVariant({ themeKey: 'touchableVariants' }),
	],
	TouchableOpacity,
);

export default Button;
