import {Box, Flex } from "@chakra-ui/react";
import {ReactNode} from "react";

interface Props {
    children?: ReactNode,
}

export const NavigationMenu = ({children}:Props) => {
    return (
        <div className="NavigationMenu">
            <Box bg='green.100' w='100%' p='1vh' boxShadow='md'>
                <Flex >
                    {children}
                </Flex>
            </Box>
        </div>
    )
}