import {AppNavigation} from "../../components/navigation/AppNavigation/AppNavigation";
import {useStaticFetch} from "../../utils/hooks/useStaticFetch";
import {mainConfig} from "../../config/mainConfig";
import {useEffect, useState} from "react";
import {ElementData, JsonCommunicationType} from "../../utils/types/JsonCommunication.type";
import { useParams } from "react-router-dom";

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

    return (
        <div className="OneRecipeView">
            <AppNavigation/>
            <h1>
                {recipe?.name}
                {recipe?.description}
            </h1>
        </div>
    )
}