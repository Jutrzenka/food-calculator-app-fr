import {AppNavigation} from "../../components/navigation/AppNavigation/AppNavigation";
import {Box, Center, SimpleGrid, CircularProgress, CircularProgressLabel} from "@chakra-ui/react";
import {MainArticle} from "../../components/common/MainArticle/MainArticle";
import {OneElement} from "../../components/common/OneElement/OneElement";
import {useStaticFetch} from "../../utils/hooks/useStaticFetch";
import {mainConfig} from "../../config/mainConfig";
import {useEffect, useState} from "react";
import {ButtonAddedElement} from "../../components/button/ButtonAddedElement/ButtonAddedElement";
import {ArrayData, JsonCommunicationType} from "../../utils/types/JsonCommunication.type";

interface Recipe {
    idRecipe: string,
    idUser: string,
    name: string,
    description: string,
}

export const RecipeView = () => {
    const { data } = useStaticFetch(`${mainConfig.url}/api/recipes`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            limit: 100,
            page: 1,
        })
    });
    const [recipes, setRecipes] = useState(data ? (((data as JsonCommunicationType).data as ArrayData).value as Recipe[]) : null);

    useEffect(() => {
        setRecipes(data ? (((data as JsonCommunicationType).data as ArrayData).value as Recipe[]) : null)
    }, [data])

    const addedObjectFromArray = (element: Recipe) => {
        setRecipes((prev: Recipe[] | null) => {
            if (prev === null) return prev;
            return [...prev, element]
        });
    };

    const removeObjectFromArray = (id: string) => {
        setRecipes((prev: Recipe[] | null) => {
            if (prev === null) return prev;
            return prev.filter(obj => {
                return obj.idRecipe !== id;
            })
        });
    };
    return (
        <div className="RecipeView">
            <AppNavigation/>
            <Center h='auto' width='100%'>
                <MainArticle header='Lista przepisów'>
                    <Center h='auto' width='100%'>
                        <Box mt={2.5} mb={5} width='90%'>
                            <SimpleGrid minChildWidth='250px' spacing='5px'>
                                {recipes ?
                                    <ButtonAddedElement onAdded={addedObjectFromArray} url={`${mainConfig.url}/api/recipes`}/>
                                    : null}
                                {recipes ? recipes.map((el: Recipe) => <OneElement
                                        key={el.idRecipe}
                                        url={`${mainConfig.url}/api/recipes/${el.idRecipe}`}
                                        nav={`/app/recipes/${el.idRecipe}`}
                                        id={el.idRecipe}
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