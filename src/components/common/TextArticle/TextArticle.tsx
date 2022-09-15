import {Text} from "@chakra-ui/react";

interface Props {
    children?: string,
}

export const TextArticle = ({children}:Props) => {
    return (
        <div className="TextArticle">
            <Text fontSize='xl' mt={8} p={8} pt={0}>
                {children}
            </Text>
        </div>
    )
}