import { Code, Link } from "@chakra-ui/react";

export default function NameBlock() {
    return (
        <Link href="#main" _hover={{ textDecoration: "none" }}>
            <Code fontFamily="mono" fontSize={{ base: "2xl", md: "3xl" }} bg="transparent" cursor="pointer">
                {`<RedonKrasniqi />`}
            </Code>
        </Link>
    );
}
