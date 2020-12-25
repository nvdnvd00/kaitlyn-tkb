import {
    backgroundColor,
    BackgroundColorProps,
    BorderProps,
    createRestyleComponent,
    createVariant,
    layout,
    LayoutProps,
    opacity,
    OpacityProps,
    PositionProps,
    shadow,
    ShadowProps,
    spacing,
    SpacingProps,
    VariantProps,
} from '@shopify/restyle';
import {Image} from 'react-native';
import {Theme} from 'theme';

type Props = VariantProps<Theme, 'imageVariants'> &
    SpacingProps<Theme> &
    LayoutProps<Theme> &
    PositionProps<Theme> &
    OpacityProps<Theme> &
    BackgroundColorProps<Theme> &
    BorderProps<Theme> &
    ShadowProps<Theme> &
    React.ComponentProps<typeof Image> & {
    children?: any;
};

const ImageC = createRestyleComponent<Props, Theme>(
    [
        spacing,
        layout,
        opacity,
        backgroundColor,
        shadow,
        createVariant({themeKey: 'imageVariants'}),
    ],
    Image,
);

export default ImageC;
