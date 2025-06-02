import { Box, Image, type ResponsiveValue } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useAppTheme } from "../hooks/useAppTheme";
import { type AvatarPhotos, avatarPhotos } from "../types/avatarPhotos";

interface CyclingAvatarProps {
    photos?: AvatarPhotos;
    size?: ResponsiveValue<string | number>;
}

export default function CyclingAvatar({
    photos = avatarPhotos,
    size = { base: "250px", md: "350px" },
}: CyclingAvatarProps) {
    const { colors } = useAppTheme();
    const { border } = colors;
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        if (timeoutRef.current !== null) {
            window.clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % photos.length);
        }, 5000);

        return () => {
            if (timeoutRef.current !== null) {
                window.clearTimeout(timeoutRef.current);
            }
        };
    }, [currentIndex, photos.length]);

    const handleClick = () => {
        if (timeoutRef.current !== null) {
            window.clearTimeout(timeoutRef.current);
        }
        setCurrentIndex((prev) => (prev + 1) % photos.length);
    };

    return (
        <Box
            as="button"
            onClick={handleClick}
            borderRadius="full"
            overflow="hidden"
            border={`5px solid ${border}`}
            boxShadow={`0 0 0 8px ${border}33`}
            w={size}
            h={size}
            position="relative"
            _hover={{ cursor: "pointer", opacity: 0.9 }}
        >
            <Image
                src={photos[currentIndex]}
                alt={`Avatar ${currentIndex + 1}`}
                objectFit="cover"
                w="100%"
                h="100%"
            />
        </Box>
    );
}
