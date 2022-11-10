import {Box, Flex } from "@chakra-ui/react"

interface Props {
    title: string;
    value: string;
}

export const OneColumn = ({title, value}:Props) => {
    return (
            <Box width="25%" className="OneColumn">
				<Flex flexDirection={"column"} justifyContent='space-around' justifyItems='center'>
					<Box
						width='100%'
						bgColor='green.300'
						textAlign='center'
						fontSize="3xl"
						mt={4}
					>
						{title}
                    </Box>
					<Box
						width='100%'
						bgColor='green.200'
						textAlign='center'
						display='flex'
						flexDir='column'
						justifyContent='center'
						fontSize="2xl"
						mb={4}
					>
						{value}
                    </Box>
            	</Flex>
            </Box>
            )
}