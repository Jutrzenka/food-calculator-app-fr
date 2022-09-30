import {Box, Button, Flex, Spinner, useToast} from "@chakra-ui/react";
import {useFetch} from "../../../utils/hooks/useFetch";
import {useEffect} from "react";
import {AddIcon} from "@chakra-ui/icons";

interface Param {
    onAdded: any,
    url: string,
}

export const ButtonAddedElement = ({onAdded, url}: Param) => {
    const [added, loadingAdded, errorAdded, setRequestAdded] = useFetch(null);
    const toast = useToast()
    useEffect(() => {
        if (added?.success) {
            onAdded(added?.data.value)
            toast({
                title: 'Dodano nowy element',
                position: 'bottom-left',
                status: 'success',
                duration: 6000,
                isClosable: true,
            })
        }
        if (errorAdded) {
            toast({
                title: 'Nie udało się dodać nowego elementu',
                position: 'bottom-left',
                status: 'error',
                duration: 6000,
                isClosable: true,
            })
        }
    }, [added, errorAdded])
    return (
        <div className="ButtonAddedElement">
            <Box bgColor='blackAlpha.100' borderRadius='md'>
                <Flex justifyContent='space-around' justifyItems='center'>
                    <Button
                         variant='ghost'
                         colorScheme='black'
                         width='80%'
                         textAlign='center'
                         mr='5px'
                         _hover={{bgColor: 'green.200', borderRadius: "md"}}
                         onClick={() => {
                             setRequestAdded(url, {
                                 method: 'PUT',
                             })
                         }}
                    >
                        {
                            !loadingAdded
                                ? <AddIcon w={7} h={7} />
                                : <Spinner
                                    thickness='4px'
                                    speed='0.85s'
                                    emptyColor='green.100'
                                    color='green.500'
                                    size='md'
                                />
                        }
                    </Button>
                </Flex>
            </Box>
        </div>
    )
}