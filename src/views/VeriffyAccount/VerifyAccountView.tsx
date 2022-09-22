import {useParams} from "react-router-dom";
import {useFetch} from "../../utils/hooks/useFetch";
import {Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement, Spinner, Text, useToast, VStack} from "@chakra-ui/react";
import {useFormik} from "formik";
import {HallwayNavigation} from "../../components/navigation/HallwayNavigation/HallwayNavigation";
import {useEffect, useState} from "react";
import {mainConfig} from "../../config/mainConfig";

export const VerifyAccountView = () => {
    const {email, registerCode} = useParams()
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const [data, loading, error, setRequest] = useFetch(null)
    const toast = useToast()

    const formik = useFormik({
        initialValues: {
            password: "",
        },
        onSubmit: ({password}) => {
            toast({
                title: 'Trwa weryfikacja konta',
                position: 'bottom-left',
                status: 'loading',
                duration: 6000,
                isClosable: true,
            })
            setRequest(`${mainConfig.url}/api/auth/confirm/${email}/${registerCode}`,{
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password,
                })
            })
        }
    });
    useEffect(() => {
        if (data?.success) {
            toast({
                title: 'Weryfikacja konta powiodła się',
                position: 'bottom-left',
                status: 'success',
                duration: 6000,
                isClosable: true,
            })
            toast({
                title: 'Teraz możesz przejść do logowania',
                position: 'bottom-left',
                status: 'info',
                duration: 6000,
                isClosable: true,
            })
        }
        if (error) {
            toast({
                title: 'Weryfikacja nie powiodła się',
                position: 'bottom-left',
                status: 'error',
                duration: 6000,
                isClosable: true,
            })
            toast({
                title: 'Spróbuj ponownie za chwilę',
                position: 'bottom-left',
                status: 'info',
                duration: 6000,
                isClosable: true,
            })
        }
    }, [data, error])
    return (
        <div className="VerifyAccountView">
            <HallwayNavigation/>
            <Flex align="center" justify="center" minH='80vh' mt={25}>
                <Box bgGradient='linear(to-l, green.100, green.200)' p={12} rounded="md" boxShadow='2xl' minW='25vw'>
                    <Text
                        bgGradient='linear(to-l, green.600, green.900)'
                        bgClip='text'
                        fontSize='2xl'
                        fontWeight='bold'
                        pb={6}
                    >
                        Weryfikacja konta
                    </Text>
                    <form onSubmit={formik.handleSubmit}>
                        <VStack spacing={6} align="flex-start">
                            <FormControl>
                                <FormLabel htmlFor="password">Hasło</FormLabel>
                                <InputGroup size='md'>
                                    <Input
                                        id="password"
                                        name="password"
                                        type={show ? 'text' : 'password'}
                                        variant="filled"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <Button colorScheme='green' h='1.75rem' size='sm' onClick={handleClick}>
                                            {show ? 'Ukryj' : 'Pokaż'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Button type="submit" colorScheme="green" width="full">
                                {loading ? <Spinner/> : 'Ustaw hasło'}
                            </Button>
                        </VStack>
                    </form>
                </Box>
            </Flex>
        </div>
    )
}