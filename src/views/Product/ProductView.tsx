import {AppNavigation} from "../../components/navigation/AppNavigation/AppNavigation";
import {MainArticle} from "../../components/common/MainArticle/MainArticle";
import {Center} from "@chakra-ui/react";

export const ProductView = () => {
    return (
        <div className="ProductView">
            <AppNavigation/>
            <Center h='auto' width='100%'>
                <MainArticle header='Lista produktów'>
                    Produkty
                </MainArticle>
            </Center>
        </div>
    )
}