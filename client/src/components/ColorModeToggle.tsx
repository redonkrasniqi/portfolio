import React from 'react';
import {
    Button,
    IconButton,
    useColorMode,
    type ButtonProps,
    type IconButtonProps,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { useAppTheme } from '../hooks/useAppTheme';

export type ColorModeToggleProps = {
    variant?: 'icon' | 'full';
} & Omit<ButtonProps, 'leftIcon' | 'children' | 'onClick'>
    & Omit<IconButtonProps, 'aria-label' | 'icon' | 'onClick'>;

const ColorModeToggle: React.FC<ColorModeToggleProps> = ({
    variant = 'icon',
    ...props
}) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { colors } = useAppTheme();
    const { modeBg, modeHoverBg } = colors;
    const icon = colorMode === 'light' ? <MoonIcon /> : <SunIcon />;

    if (variant === 'full') {
        return (
            <Button
                leftIcon={icon}
                onClick={toggleColorMode}
                bg={modeBg}
                _hover={{ bg: modeHoverBg }}
                w="full"
                maxW="150px"
                {...props}
            >
                {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
            </Button>
        );
    }

    return (
        <IconButton
            aria-label="Toggle color mode"
            icon={icon}
            onClick={toggleColorMode}
            bg={modeBg}
            _hover={{ bg: modeHoverBg }}
            {...props}
        />
    );
};

export default ColorModeToggle;
