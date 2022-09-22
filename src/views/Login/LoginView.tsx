import {HallwayNavigation} from "../../components/navigation/HallwayNavigation/HallwayNavigation";
import {Box, Button, Flex, FormControl, FormLabel, Input, Link, Spinner, Text, useToast, VStack} from "@chakra-ui/react";
import {useFormik} from "formik";
import {Link as ReactLink, useNavigate} from "react-router-dom";
import {useFetch} from "../../utils/hooks/useFetch";
import {mainConfig} from "../../config/mainConfig";
import {useEffect} from "react";

export const LoginView = () => {
    const [data, loading, error, setRequest] = useFetch(null)
    const toast = useToast()
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: ({email, password}) => {
            toast({
                title: 'Trwa logowanie',
                position: 'bottom-left',
                status: 'loading',
                duration: 6000,
                isClosable: true,
            })
            setRequest(`${mainConfig.url}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                })
            })
        }
    });
    useEffect(() => {
        if (data?.success) {
            navigate('/app/recipes', {replace: true});
            toast.closeAll();
        }
        if (error) {
            toast({
                title: 'Logowanie nie powiodło się',
                position: 'bottom-left',
                status: 'error',
                duration: 6000,
                isClosable: true,
            })
        }
    }, [data, error])
    return (
        <div className='LoginView'>
            <HallwayNavigation/>
            <Flex align="center" justify="center" minH="80vh" mt={25}>
                <Box bgGradient='linear(to-l, green.100, green.200)' p={12} rounded="md" boxShadow='2xl' minW='25vw'>
                    <Text
                        bgGradient='linear(to-l, green.600, green.900)'
                        bgClip='text'
                        fontSize='2xl'
                        fontWeight='bold'
                        pb={6}
                    >
                        Logowanie
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
                                <FormLabel htmlFor="password">Hasło</FormLabel>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    variant="filled"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                            </FormControl>
                                <Text>
                                    Nie masz konta?{' '}
                                    <Link as={ReactLink} color='green.900' fontWeight='bold' to='/register'>
                                        Zarejestruj się tutaj!
                                    </Link>
                                </Text>
                            <Button
                                colorScheme='green'
                                type='submit'
                                w='full'
                            >
                                {loading ? <Spinner/> : 'Zaloguj'}
                            </Button>
                        </VStack>
                    </form>
                </Box>
            </Flex>
        </div>
    );
}