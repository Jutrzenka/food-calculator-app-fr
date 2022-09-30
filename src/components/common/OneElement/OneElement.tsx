import {Box, Button, Flex, Spinner, Text, useToast} from "@chakra-ui/react";
import {useFetch} from "../../../utils/hooks/useFetch";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

interface Param {
    id: string,
    name: string,
    url: string,
    nav: string,
    onDelete: any,
}

export const OneElement = ({id, name, url, nav, onDelete}: Param) => {
    const [deleted, loadingDeleted, errorDeleted, setRequestDeleted] = useFetch(null);
    const toast = useToast()
    const navigate = useNavigate();
    useEffect(() => {
        if (deleted?.success) {
            onDelete(id)
            toast({
                title: 'Element został usunięty',
                position: 'bottom-left',
                status: 'success',
                duration: 6000,
                isClosable: true,
            })
        }
        if (errorDeleted) {
            toast({
                title: 'Nie udało się usunąć elementu',
                position: 'bottom-left',
                status: 'error',
                duration: 6000,
                isClosable: true,
            })
        }
    }, [deleted, errorDeleted])
    return (
        <div className="OneElement">
            {
                loadingDeleted ?
                    <Box bgColor='blackAlpha.100' borderRadius='md'>
                        <Flex justifyContent='space-around' justifyItems='center'>
                            <Box width='60%' textAlign='center' mr='5px' _hover={{bgColor: 'green.200', borderRadius: "md"}}>
                                <Text color='green.500'>Trwa usuwanie</Text>
                                <Spinner
                                    thickness='4px'
                                    speed='0.85s'
                                    emptyColor='green.100'
                                    color='green.500'
                                    size='md'
                                />
                            </Box>
                        </Flex>
                    </Box>
                    :
                    <Box bgColor='blackAlpha.100' borderRadius='md'>
                        <Flex justifyContent='space-around' justifyItems='center'>
                            <Box
                                 width='60%'
                                 textAlign='center'
                                 mr='5px'
                                 _hover={{bgColor: 'green.200', borderRadius: "md", cursor: 'pointer'}}
                                 onClick={() => navigate(nav)}
                            >
                                {name}
                            </Box>
                            <Button
                                 colorScheme='green'
                                 width='40%'
                                 borderRadius='md'
                                 onClick={() => {
                                     setRequestDeleted(url, {
                                         method: 'DELETE',
                                     })
                                 }}
                            >Usuń</Button>
                        </Flex>
                    </Box>
            }

        </div>
    )
}