import {AppNavigation} from "../../components/navigation/AppNavigation/AppNavigation";
import {useParams} from "react-router-dom";
import {mainConfig} from "../../config/mainConfig";
import {useEffect, useState} from "react";
import {ElementData, JsonCommunicationType} from "../../utils/types/JsonCommunication.type";
import {MainArticle} from "../../components/common/MainArticle/MainArticle";
import {Box, Center, CircularProgress, CircularProgressLabel} from "@chakra-ui/react";
import {OneLine} from "../../components/common/OneLine/OneLine";
import {EditProduct} from "../../components/edit/EditProduct/EditProduct";
import {useFetch} from "../../utils/hooks/useFetch";

interface Product {
    idProduct: string,
    idUser: string,
    name: string,
    calories: number,
    carbohydrates: number,
    fat: number,
    protein: number,
}

export const OneProductView = () => {
    const { id } = useParams();
    const [data] = useFetch(`${mainConfig.url}/api/products/${id}`,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    const [product, setProduct] =
        useState(data
            ? (((data as JsonCommunicationType).data as ElementData).value as Product)
            : null);

    useEffect(() => {
        setProduct(data ? (((data as JsonCommunicationType).data as ElementData).value as Product) : null)
    }, [data])

    const editProduct = (element: Product) => {
        setProduct(element);
    };

    return (
        <div className="OneProductView">
            <AppNavigation/>
            <Center h='auto' width='100%'>
                <MainArticle header={product?.name}>
                    {
                        product ?
                            <>
                                <EditProduct product={product} editProduct={editProduct}/>
                                <OneLine label={'Kalorie:'}
                                         value={product?.calories ? `${product?.calories}kcal/100g` : `${0}kcal/100g`}/>
                                <OneLine label={'Węglowodany:'}
                                         value={product?.carbohydrates ? `${product?.carbohydrates}g/100g` : `${0}g/100g`}/>
                                <OneLine label={'Tłuszcze:'}
                                         value={product?.fat ? `${product?.fat}g/100g` : `${0}g/100g`}/>
                                <OneLine label={'Białka:'}
                                         value={product?.protein ? `${product?.protein}g/100g` : `${0}g/100g`}/>
                                <Box pt={4}/>
                            </>
                            :
                            <Center>
                                <CircularProgress size='500px' isIndeterminate color='green.400'>
                                    <CircularProgressLabel
                                        fontSize='6xl'
                                        color='green.900'
                                    >
                                        Ładowanie produktu
                                    </CircularProgressLabel>
                                </CircularProgress>
                            </Center>
                    }
                    <Box pt={4}/>
                </MainArticle>
            </Center>
        </div>
    )
}