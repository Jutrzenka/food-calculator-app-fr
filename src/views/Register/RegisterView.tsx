import {HallwayNavigation} from "../../components/navigation/HallwayNavigation/HallwayNavigation";
import {Box, Button, Flex, FormControl, FormLabel, Input, Spinner, Text, useToast, VStack} from "@chakra-ui/react";
import {useFormik} from "formik";
import {useFetch} from "../../utils/hooks/useFetch";
import { mainConfig } from "../../config/mainConfig";
import {useEffect} from "react";

export const RegisterView = () => {
    const [data, loading, error, setRequest] = useFetch(null)
    const toast = useToast()
    const formik = useFormik({
        initialValues: {
            email: "",
            name: "",
            surname: "",
        },
        onSubmit: ({email, name, surname}) => {
            toast({
                title: 'Trwa tworzenie konta',
                position: 'bottom-left',
                status: 'loading',
                duration: 6000,
                isClosable: true,
            })
            setRequest(`${mainConfig.url}/api/auth/register`,{
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    name,
                    surname
                })
            })
        }
    });
    useEffect(() => {
        if (data?.success) {
            toast({
                title: 'Tworzenie konta powiodło się',
                position: 'bottom-left',
                status: 'success',
                duration: 6000,
                isClosable: true,
            })
            toast({
                title: `Potwierdz rejestrację na: ${formik.values.email}`,
                position: 'bottom-left',
                status: 'info',
                duration: 6000,
                isClosable: true,
            })
        }
        if (error) {
            toast({
                title: 'Rejestracja nie powiodła się',
                position: 'bottom-left',
                status: 'error',
                duration: 6000,
                isClosable: true,
            })
        }
    }, [data, error])
    return (
        <div className='RegisterView'>
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
                        Rejestracja
                    </Text>
                    <form onSubmit={formik.handleSubmit}>
                        <VStack spacing={6} align="flex-start">
                            <FormControl>
                                <FormLabel htmlFor="email">Adres e-mail</FormLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    variant="filled"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Imię</FormLabel>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    variant="filled"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Nazwisko</FormLabel>
                                <Input
                                    id="surname"
                                    name="surname"
                                    type="text"
                                    variant="filled"
                                    onChange={formik.handleChange}
                                    value={formik.values.surname}
                                />
                            </FormControl>
                            <Button type="submit" colorScheme="green" width="full">
                                {loading ? <Spinner/> : 'Zarejestruj'}
                            </Button>
                        </VStack>
                    </form>
                </Box>
            </Flex>
        </div>
    );
}