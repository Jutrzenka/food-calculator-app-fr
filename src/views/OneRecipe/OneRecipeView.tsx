import {AppNavigation} from "../../components/navigation/AppNavigation/AppNavigation";
import {useStaticFetch} from "../../utils/hooks/useStaticFetch";
import {mainConfig} from "../../config/mainConfig";
import {useEffect, useState} from "react";
import {ElementData, JsonCommunicationType} from "../../utils/types/JsonCommunication.type";
import { useParams } from "react-router-dom";
import {Box, Center, CircularProgress, CircularProgressLabel} from "@chakra-ui/react";
import {MainArticle} from "../../components/common/MainArticle/MainArticle";
import {DoubledLine} from "../../components/common/DoubledLine/DoubledLine";
import {EditRecipe} from "../../components/edit/EditRecipe/EditRecipe";
import {RelationsList} from "../../components/recipe/RelationsList/RelationsList";

interface Recipe {
    idRecipe: string,
    idUser: string,
    name: string,
    description: string,
}

export const OneRecipeView = () => {
    const { id } = useParams();
    const { data } = useStaticFetch(`${mainConfig.url}/api/recipes/${id}`, {
        method: 'GET',
    });

    const [recipe, setRecipe] = useState(data ? (((data as JsonCommunicationType).data as ElementData).value as Recipe) : null);

    useEffect(() => {
        setRecipe(data ? (((data as JsonCommunicationType).data as ElementData).value as Recipe) : null)
    }, [data])

    const editRecipe = (element: Recipe) => {
        setRecipe(element);
    };

    return (
        <div className="OneRecipeView">
            <AppNavigation/>
            <Center h='auto' width='100%'>
                <MainArticle header={recipe?.name}>
                    {
                        recipe ?
                            <>
                                <EditRecipe recipe={recipe} editRecipe={editRecipe}/>
                                <DoubledLine label="Opis przepisu:" value={recipe?.description ? recipe?.description : null}/>
                                <Box pt={4}/>
                            </>
                            :
                            <Center>
                                <CircularProgress size='500px' isIndeterminate color='green.400'>
                                    <CircularProgressLabel
                                        fontSize='6xl'
                                        color='green.900'
                                    >
                                        Ładowanie przepisu
                                    </CircularProgressLabel>
                                </CircularProgress>
                            </Center>
                    }
                    <Box pt={4}/>
                </MainArticle>
            </Center>
            <Center h='auto' width='100%'>
                <MainArticle header="Lista produktów">
                    {
                        recipe ?
                            <>
								<RelationsList/>
                            </>
                            :
                            <Center>
                                <CircularProgress size='500px' isIndeterminate color='green.400'>
                                    <CircularProgressLabel
                                        fontSize='6xl'
                                        color='green.900'
                                    >
                                        Ładowanie produktów
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