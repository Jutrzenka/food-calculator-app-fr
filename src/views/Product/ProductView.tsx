import {AppNavigation} from "../../components/navigation/AppNavigation/AppNavigation";
import {MainArticle} from "../../components/common/MainArticle/MainArticle";
import {Box, Center, CircularProgress, CircularProgressLabel, SimpleGrid} from "@chakra-ui/react";
import {ButtonAddedElement} from "../../components/button/ButtonAddedElement/ButtonAddedElement";
import {OneElement} from "../../components/common/OneElement/OneElement";
import {mainConfig} from "../../config/mainConfig";
import {useStaticFetch} from "../../utils/hooks/useStaticFetch";
import {useEffect, useState} from "react";
import {ArrayData, JsonCommunicationType} from "../../utils/types/JsonCommunication.type";

interface Product {
    idProduct: string,
    idUser: string,
    name: string,
    description: string,
}

export const ProductView = () => {
    const { data } = useStaticFetch(`${mainConfig.url}/api/products`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            limit: 10,
            page: 1,
        })
    });
    const [products, setProducts]
        = useState(data ? (((data as JsonCommunicationType).data as ArrayData).value as Product[]) : null);

    useEffect(() => {
        setProducts(data ? (((data as JsonCommunicationType).data as ArrayData).value as Product[]) : null)
    }, [data])

    const addedObjectFromArray = (element: Product) => {
        setProducts((prev: Product[] | null) => {
            if (prev === null) return prev;
            return [...prev, element]
        });
    };

    const removeObjectFromArray = (id: string) => {
        setProducts((prev: Product[] | null) => {
            if (prev === null) return prev;
            return prev.filter(obj => {
                return obj.idProduct !== id;
            })
        });
    };
    return (
        <div className="ProductView">
            <AppNavigation/>
            <Center h='auto' width='100%'>
                <MainArticle header='Lista produktów'>
                    <Center h='auto' width='100%'>
                        <Box mt={2.5} mb={5} width='90%'>
                            <SimpleGrid minChildWidth='250px' spacing='5px'>
                                {products ?
                                    <ButtonAddedElement onAdded={addedObjectFromArray} url={`${mainConfig.url}/api/products`}/>
                                    : null}
                                {products ? products.map((el: Product) => <OneElement
                                        key={el.idProduct}
                                        url={`${mainConfig.url}/api/products/${el.idProduct}`}
                                        nav={`/app/products/${el.idProduct}`}
                                        id={el.idProduct}
                                        name={el.name}
                                        onDelete={removeObjectFromArray}/>
                                    ) :
                                    <Center>
                                        <CircularProgress size='500px' isIndeterminate color='green.400'>
                                            <CircularProgressLabel fontSize='6xl' color='green.900'>Ładowanie przepisów</CircularProgressLabel>
                                        </CircularProgress>
                                    </Center>
                                }
                            </SimpleGrid>
                        </Box>
                    </Center>
                </MainArticle>
            </Center>
        </div>
    )
}