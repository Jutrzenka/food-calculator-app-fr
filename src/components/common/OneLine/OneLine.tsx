import {Box, Flex} from "@chakra-ui/react";

interface Props {
    label: string;
    value: string | number | null;
}

export const OneLine = ({label, value}:Props) => {

    return (
        <div className="OneLine">
            <Box bgColor='blackAlpha.100' borderRadius='md'>
                <Flex justifyContent='space-around' justifyItems='center'>
                    <Box
                        width='40%'
                        bgColor='green.300'
                        textAlign='center'
                        fontSize="3xl"
                        mt="8px"
                    >
                        {label}
                    </Box>
                    <Box
                        width='60%'
                        bgColor='green.200'
                        textAlign='center'
                        display='flex'
                        flexDir='column'
                        justifyContent='center'
                        fontSize="2xl"
                        mt="8px"
                    >
                        {value}
                    </Box>
                </Flex>
            </Box>
        </div>
    )
}