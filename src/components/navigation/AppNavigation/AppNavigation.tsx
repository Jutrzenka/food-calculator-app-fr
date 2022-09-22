import {NavigationMenu} from "../../common/NavigationMenu/NavigationMenu";
import {Spacer} from "@chakra-ui/react";
import {NavButton} from "../../common/NavButton/NavButton";
import {ProfileMenu} from "../../menu/ProfileMenu/ProfileMenu";

export const AppNavigation = () => {
    return (
        <div className="AppNavigationMenu">
            <NavigationMenu>
                <NavButton to='/app/recipes' title='Przepisy'/>
                <Spacer/>
                <NavButton to='/app/products' title='Produkty'/>
                <Spacer/>
                <Spacer/>
                <ProfileMenu/>
            </NavigationMenu>
        </div>
    )
}