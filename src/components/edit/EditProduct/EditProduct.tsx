import {
    Button,
    HStack,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger, useBoolean,
} from "@chakra-ui/react";
import {EditProductForm} from "../EditProductForm/EditProductForm";

interface Props {
    product: {
        idProduct: string,
        idUser: string,
        name: string,
        calories: number,
        carbohydrates: number,
        fat: number,
        protein: number,
    }
    editProduct: any,
}

export const EditProduct = ({product, editProduct}: Props) => {
    const [isEditing, setIsEditing] = useBoolean();
    return (
        <div className="OneLine">
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
                            {isEditing ? 'Schowaj edycję' : 'Edytuj produkt'}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverBody bgColor='whiteAlpha.600'>
                            <EditProductForm product={product} editProduct={editProduct}/>
                        </PopoverBody>
                    </PopoverContent>
                </HStack>
            </Popover>
        </div>
    )
}