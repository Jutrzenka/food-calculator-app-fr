import {Box, Button, Flex, Spinner, Text, useToast} from "@chakra-ui/react";
import {useFetch} from "../../../utils/hooks/useFetch";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

interface Param {
    idRecipe: string,
    name: string,
    url: string,
    nav: string,
    onDelete: any,
}

export const OneElement = ({idRecipe, name, url, nav, onDelete}: Param) => {
    const [deleted, loadingDeleted, errorDeleted, setRequestDeleted] = useFetch(null);
    const toast = useToast()
    const navigate = useNavigate();
    useEffect(() => {
        if (deleted?.success) {
            onDelete(idRecipe)
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
                    <Button bgColor='blackAlpha.100' borderRadius='md'>
                        <Flex justifyContent='space-around' justifyItems='center'>
                            <Button variant='ghost' colorScheme='black' width='60%' textAlign='center' mr='5px' _hover={{bgColor: 'green.200', borderRadius: "md"}}>
                                <Text>Trwa usuwanie</Text>
                                <Spinner
                                    thickness='4px'
                                    speed='0.85s'
                                    emptyColor='green.100'
                                    color='green.500'
                                    size='md'
                                />
                            </Button>
                        </Flex>
                    </Button>
                    :
                    <Box bgColor='blackAlpha.100' borderRadius='md'>
                        <Flex justifyContent='space-around' justifyItems='center'>
                            <Button
                                 variant='ghost'
                                 colorScheme='black'
                                 width='60%'
                                 textAlign='center'
                                 mr='5px'
                                 _hover={{bgColor: 'green.200', borderRadius: "md"}}
                                 onClick={() => navigate(nav)}
                            >
                                {name}
                            </Button>
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