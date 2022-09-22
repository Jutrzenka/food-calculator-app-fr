import {NavigationMenu} from "../../common/NavigationMenu/NavigationMenu";
import {NavButton} from "../../common/NavButton/NavButton";
import {Spacer} from "@chakra-ui/react";

export const HallwayNavigation = () => {
    return (
        <div className="HallwayNavigationMenu">
            <NavigationMenu>
                <NavButton to='/' title='Strona główna'/>
                <Spacer/>
                <NavButton to='/about' title='O projekcie'/>
                <Spacer/>
                <Spacer/>
                <NavButton to='/login' title='Logowanie'/>
            </NavigationMenu>
        </div>
    )
}