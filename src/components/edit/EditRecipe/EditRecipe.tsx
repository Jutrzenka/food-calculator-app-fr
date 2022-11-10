import {
    Button,
    HStack,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger, useBoolean,
} from "@chakra-ui/react";
import {EditProductForm} from "../EditProductForm/EditProductForm";
import {EditRecipeForm} from "../EditRecipeForm/EditRecipeForm";

interface Props {
    recipe: {
        idRecipe: string,
        idUser: string,
        name: string,
        description: string,
    }
    editRecipe: any,
}

export const EditRecipe = ({recipe, editRecipe}: Props) => {
    const [isEditing, setIsEditing] = useBoolean();
    return (
        <div className="EditRecipe">
            <Popover
                isOpen={isEditing}
                onOpen={setIsEditing.on}
                onClose={setIsEditing.off}
                closeOnBlur={false}
                isLazy
                lazyBehavior='keepMounted'
            >
                <HStack>
                    <PopoverTrigger>
                        <Button
                            width='100%'
                            colorScheme='green'
                            textAlign='center'
                            fontSize="3xl"
                            mt="8px"
                            textTransform='uppercase'
                            padding={8}
                            borderRadius={0}
                            color='whiteAlpha.900'
                        >
                            {isEditing ? 'Schowaj edycję' : 'Edytuj przepis'}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverBody bgColor='whiteAlpha.600'>
                            <EditRecipeForm recipe={recipe} editRecipe={editRecipe}/>
                        </PopoverBody>
                    </PopoverContent>
                </HStack>
            </Popover>
        </div>
    )
}