import {Box, Center, Text} from "@chakra-ui/react";
import {ReactNode} from "react";

interface Props {
    children?: ReactNode,
}

export const MainArticle = ({children}:Props) => {
    return (
        <div className="MainArticle">
            <Box width='auto' minWidth='60vw' maxWidth='80vw' marginTop='5vh' bg='green.50' boxShadow='2xl' rounded='2xl'>
                <Box width='100%' minWidth='100%' bg='green.100' boxShadow='xl' rounded='2xl'>
                <Center>
                    <Text
                        bgGradient='linear(to-l, green.600, green.900)'
                        bgClip='text'
                        fontSize='6xl'
                        fontWeight='extrabold'
                    >
                        MegaFoodCalc:
                    </Text>
                </Center>
                </Box>
                {children}
            </Box>
        </div>
    )
}