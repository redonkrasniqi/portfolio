import { Code, Link } from "@chakra-ui/react";
import { useAppTheme } from "../../hooks/useAppTheme";

export default function NameBlock() {
    const { colors } = useAppTheme();
    const { border } = colors;

    return (
        <Link href="#main" _hover={{ textDecoration: "none" }}>
            <Code fontFamily="mono" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" bg="transparent" color={border} cursor="pointer">
                {`<RedonKrasniqi />`}
            </Code>
        </Link>
    );
}
