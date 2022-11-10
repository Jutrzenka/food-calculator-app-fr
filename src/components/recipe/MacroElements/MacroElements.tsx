import {Flex} from "@chakra-ui/react"
import {OneColumn} from "./OneColumn";

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

interface Props {
    relations: Relation[],
}

export const MacroElements = ({relations}: Props) => {
    return (
        <div className="MicroElements">
            <Flex flexDirection={"row"}>
                <OneColumn title={"Kalorie:"} value={`${relations.reduce((sum, relation) => {
                    return sum + (relation.calories * relation.amount / 100);
                    }, 0)} kcal`}
                />
				<OneColumn title={"Białka:"} value={`${relations.reduce((sum, relation) => {
                    return sum + (relation.protein * relation.amount / 100);
                    }, 0)} g`}
                />
				<OneColumn title={"Tłuszcze:"} value={`${relations.reduce((sum, relation) => {
                    return sum + (relation.fat * relation.amount / 100);
                    }, 0)} g`}
                />
				<OneColumn title={"Węglowodany:"} value={`${relations.reduce((sum, relation) => {
                    return sum + (relation.carbohydrates * relation.amount / 100);
                    }, 0)} g`}
                />
            </Flex>
        </div>
    )
}