import {AppNavigation} from "../../components/navigation/AppNavigation/AppNavigation";
import {Box, Center, SimpleGrid, CircularProgress, CircularProgressLabel} from "@chakra-ui/react";
import {MainArticle} from "../../components/common/MainArticle/MainArticle";
import {OneElement} from "../../components/common/OneElement/OneElement";
import {useStaticFetch} from "../../utils/hooks/useStaticFetch";
import {mainConfig} from "../../config/mainConfig";
import {useEffect, useState} from "react";
import {ButtonAddedElement} from "../../components/button/ButtonAddedElement/ButtonAddedElement";
export const RecipeView = () => {
    const {data} = useStaticFetch(`${mainConfig.url}/api/recipe`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            limit: 100,
            page: 1,
        })
    })
    const [recipes, setRecipes] = useState(data ? data.data.value : null);

    useEffect(() => {
        setRecipes(data ? data.data.value : null)
    }, [data])

    const addedObjectFromArray = (element: string) => {
        setRecipes(prev => [...prev, element] );
    };

    const removeObjectFromArray = (idRecipe: string) => {
        setRecipes(prev =>
            prev.filter(obj => {
                return obj.idRecipe !== idRecipe;
            }),
        );
    };
    return (
        <div className="RecipeView">
            <AppNavigation/>
            <Center h='auto' width='100%'>
                <MainArticle header='Lista przepisów'>
                    <Center h='auto' width='100%'>
                        <Box mt={2.5} mb={5} width='90%'>
                            <SimpleGrid minChildWidth='250px' spacing='5px'>
                                {recipes ? <ButtonAddedElement onAdded={addedObjectFromArray}/> : null}
                                {recipes ? recipes.map(el => <OneElement
                                        key={el.idRecipe}
                                        url={`${mainConfig.url}/api/recipe/${el.idRecipe}`}
                                        nav={`/app/recipes/${el.idRecipe}`}
                                        idRecipe={el.idRecipe}
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