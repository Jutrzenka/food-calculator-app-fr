import {Box, Flex} from "@chakra-ui/react";

interface Props {
    label: string;
    value: string | number | null;
}

export const DoubledLine = ({label, value}:Props) => {

    return (
        <div className="DoubledLine">
            <Box borderRadius='md'>
                <Flex flexDir="column" alignItems="center" justifyContent="center">
                    <Box
                        width='100%'
                        bgColor='green.300'
                        textAlign='center'
                        fontSize="3xl"
                        mt="8px"
                    >
                        {label}
                    </Box>
                    <Box
                        width='90%'
                        bgColor='green.200'
                        textAlign='center'
                        display='flex'
                        flexDir='column'
                        justifyContent='center'
                        fontSize="2xl"
                        borderBottomRadius="2xl"
                        pt="8px"
                        pb="8px"
                    >
                        {value}
                    </Box>
                </Flex>
            </Box>
        </div>
    )
}