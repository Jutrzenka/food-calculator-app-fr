import {Box, Text, Thead} from "@chakra-ui/react"
import {useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mainConfig } from "../../../config/mainConfig";
import { useStaticFetch } from "../../../utils/hooks/useStaticFetch";
import { ArrayData, JsonCommunicationType } from "../../../utils/types/JsonCommunication.type";
import {MacroElements} from "../MacroElements/MacroElements";

interface Relation {
    idProduct: string,
	idUser: string,
	name: string,
	calories: number,
	fat: number,
	carbohydrates: number,
	protein: number,
	amount: number,
}

export const RelationsList = () => {
    const { id } = useParams();
    const { data } = useStaticFetch(`${mainConfig.url}/api/relations/${id}`, {
        method: 'GET',
	});

    const [relations, setRelations] = useState(data
	? (((data as JsonCommunicationType).data as ArrayData).value as Relation[])
	: []);

    useEffect(() => {
        setRelations(data
		? (((data as JsonCommunicationType).data as ArrayData).value as Relation[])
		: [])
	}, [data])

    console.log(relations);

    return (
            <div className="RelationsList">
				<MacroElements relations={relations}/>
				{
                    relations.map(value =>
					<Text>
						{value?.name}
                    </Text>)
                }
				<Box pt={4}/>
            </div>
            )
}