import {Button, Link} from "@chakra-ui/react";
import {NavLink as ReactNavLink} from 'react-router-dom';

interface Props {
    to: string,
    title: string,
}

export const NavButton = ({to, title}: Props) => {
    const value = title.toUpperCase();
    return (
        <div className="NavButton">
            <Link as={ReactNavLink} to={to} style={{textDecoration: 'none'}}>
                <Button variant='solid' colorScheme='green' boxShadow='md' size='md' borderRadius='md' p={6} fontSize={24}>
                    {value}
                </Button>
            </Link>
        </div>
    )
}