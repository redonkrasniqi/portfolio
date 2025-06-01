import { Box, HStack, Link, Text, Icon } from '@chakra-ui/react';
import { type IconType } from 'react-icons';
import { footerNavLinks, type NavLink } from '../types/navigation';
import { useAppTheme } from '../hooks/useAppTheme';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { colors } = useAppTheme();
    const { bg, textColor, border } = colors;

    return (
        <Box
            w="100%"
            as="footer"
            py={4}
            bg={bg}
            borderTop="1px"
            borderColor={border}
        >
            <HStack justify="center" spacing={6} mb={4}>
                {footerNavLinks.map((link: NavLink) => (
                    <Link
                        key={link.href + link.label}
                        href={link.href}
                        isExternal={link.external}
                        rel={link.external ? link.rel : undefined}
                        color={textColor}
                    >
                        {link.icon && (
                            <Icon as={link.icon as IconType} boxSize={6} mr={link.label ? 2 : 0} />
                        )}
                        {link.label}
                    </Link>
                ))}
            </HStack>

            <Text textAlign="center" fontSize="sm">
                © {currentYear} Redon Krasniqi.
            </Text>
        </Box>
    );
}
