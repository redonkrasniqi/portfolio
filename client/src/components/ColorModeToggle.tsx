import React from 'react';
import {
    Button,
    IconButton,
    useColorMode,
    useColorModeValue,
    type ButtonProps,
    type IconButtonProps,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

export type ColorModeToggleProps = {
    variant?: 'icon' | 'full';
} & Omit<ButtonProps, 'leftIcon' | 'children' | 'onClick'>
    & Omit<IconButtonProps, 'aria-label' | 'icon' | 'onClick'>;

const ColorModeToggle: React.FC<ColorModeToggleProps> = ({
    variant = 'icon',
    ...props
}) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const bg = useColorModeValue('gray.100', 'gray.700');
    const hoverBg = useColorModeValue('gray.200', 'gray.600');
    const icon = colorMode === 'light' ? <MoonIcon /> : <SunIcon />;

    if (variant === 'full') {
        return (
            <Button
                leftIcon={icon}
                onClick={toggleColorMode}
                bg={bg}
                _hover={{ bg: hoverBg }}
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
            bg={bg}
            _hover={{ bg: hoverBg }}
            {...props}
        />
    );
};

export default ColorModeToggle;
