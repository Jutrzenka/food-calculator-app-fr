import {useFetch} from "../../../utils/hooks/useFetch";
import {Button, FormControl, FormLabel, Input, Spinner, Text, Textarea, useToast, VStack} from "@chakra-ui/react";
import {useFormik} from "formik";
import {mainConfig} from "../../../config/mainConfig";
import {useEffect} from "react";
import {useParams} from "react-router-dom";

interface Props {
    recipe: {
        idRecipe: string,
        idUser: string,
        name: string,
        description: string,
    }
    editRecipe: any,
}

export const EditRecipeForm = ({recipe, editRecipe}: Props) => {
    const { id } = useParams();
    const {name, description} = recipe;
    const [data, loading, error, setRequest] = useFetch(null)
    const toast = useToast()
    const formik = useFormik({
        initialValues: {
            name,
            description
        },
        onSubmit: ({
                       name,
                       description
                   }) => {
            toast({
                title: 'Trwa edycja przepisu',
                position: 'bottom-left',
                status: 'loading',
                duration: 6000,
                isClosable: true,
            })
            setRequest(`${mainConfig.url}/api/recipes/${id}`,{
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    description
                })
            })
        }
    });
    useEffect(() => {
        if (data?.success) {
            toast({
                title: 'Zedytowano przepis',
                position: 'bottom-left',
                status: 'success',
                duration: 6000,
                isClosable: true,
            })
            editRecipe({
                name: formik.values.name,
                description: formik.values.description,
            })
        }
        if (error) {
            toast({
                title: 'Edytowanie przepisu nie powiodło się',
                position: 'bottom-left',
                status: 'error',
                duration: 6000,
                isClosable: true,
            })
        }
    }, [data, error])
    return (
        <div className="EditRecipeForm">
            <form onSubmit={formik.handleSubmit}>
                <VStack spacing={6} align="flex-start">
                    <FormControl>
                        <FormLabel>Nazwa przepisu:</FormLabel>
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
                            Opis przepisu:
                        </FormLabel>
                        <Textarea
                            id="description"
                            name="description"
                            variant="filled"
                            onChange={formik.handleChange}
                            value={formik.values.description}
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