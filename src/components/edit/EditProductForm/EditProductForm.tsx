import {useFetch} from "../../../utils/hooks/useFetch";
import {Box, Button, Flex, FormControl, FormLabel, Input, Spinner, Text, useToast, VStack} from "@chakra-ui/react";
import {useFormik} from "formik";
import {mainConfig} from "../../../config/mainConfig";
import {useEffect} from "react";
import {useParams} from "react-router-dom";

interface Props {
    product: {
        idProduct: string,
        idUser: string,
        name: string,
        calories: number,
        carbohydrates: number,
        fat: number,
        protein: number,
    }
    editProduct: any,
}

export const EditProductForm = ({product, editProduct}: Props) => {
    const {name, calories, carbohydrates, fat, protein} = product;
    const [data, loading, error, setRequest] = useFetch(null)
    const { id } = useParams();
    const toast = useToast()
    const formik = useFormik({
        initialValues: {
            name,
            calories,
            carbohydrates,
            fat,
            protein,
        },
        onSubmit: ({
                       name,
                       calories,
                       carbohydrates,
                       fat,
                       protein,
                   }) => {
            toast({
                title: 'Trwa edycja produktu',
                position: 'bottom-left',
                status: 'loading',
                duration: 6000,
                isClosable: true,
            })
            setRequest(`${mainConfig.url}/api/products/${id}`,{
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    calories,
                    carbohydrates,
                    fat,
                    protein,
                })
            })
        }
    });
    useEffect(() => {
        if (data?.success) {
            toast({
                title: 'Zedytowano produkt',
                position: 'bottom-left',
                status: 'success',
                duration: 6000,
                isClosable: true,
            })
            editProduct({
                name: formik.values.name,
                calories: formik.values.calories,
                carbohydrates: formik.values.carbohydrates,
                fat: formik.values.fat,
                protein: formik.values.protein,
            })
        }
        if (error) {
            toast({
                title: 'Edytowanie produktu nie powiodło się',
                position: 'bottom-left',
                status: 'error',
                duration: 6000,
                isClosable: true,
            })
        }
    }, [data, error])
    return (
        <div className="EditProductForm">
            <form onSubmit={formik.handleSubmit}>
                <VStack spacing={6} align="flex-start">
                    <FormControl>
                        <FormLabel>Nazwa produktu:</FormLabel>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            variant="filled"
                            maxLength={20}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            Kalorie:
                            <Text fontWeight='bold' color='red.700' fontSize='xs'>
                                Kcal na 100 gramów produktu
                            </Text>
                        </FormLabel>
                        <Input
                            id="calories"
                            name="calories"
                            type="number"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={formik.values.calories}
                        />
                    </FormControl>
                    <Box bgColor='green.100' w="100%" borderRadius="md" pt="5px" pb="5px">
                        <Flex justifyContent='center'>
                            <Text fontWeight='medium' textAlign="center">
                                Makroskładniki:
                                <Text fontWeight='bold' color='red.700' fontSize='xs' textAlign="center">
                                    Gramy na 100 gramów produktu:
                                </Text>
                            </Text>
                        </Flex>
                    </Box>
                    <FormControl>
                        <FormLabel>Węglowodany:</FormLabel>
                        <Input
                            id="carbohydrates"
                            name="carbohydrates"
                            type="number"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={formik.values.carbohydrates}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Tłuszcz:</FormLabel>
                        <Input
                            id="fat"
                            name="fat"
                            type="number"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={formik.values.fat}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Białko:</FormLabel>
                        <Input
                            id="protein"
                            name="protein"
                            type="number"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={formik.values.protein}
                        />
                    </FormControl>
                    <Button type="submit" colorScheme="green" width="full">
                        {loading ? <Spinner/> : 'Zapisz'}
                    </Button>
                </VStack>
            </form>
        </div>
    )
}