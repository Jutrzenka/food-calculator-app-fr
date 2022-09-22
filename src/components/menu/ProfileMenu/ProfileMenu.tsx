import {Button, Menu, MenuButton, MenuItem, MenuList, Spinner, useToast} from "@chakra-ui/react";
import {useFetch} from "../../../utils/hooks/useFetch";
import {useNavigate} from "react-router-dom";
import {mainConfig} from "../../../config/mainConfig";
import {useEffect} from "react";

export const ProfileMenu = () => {
    const [data, loading, error, setRequest] = useFetch(null);
    const navigate = useNavigate();
    const toast = useToast();
    useEffect(() => {
        if (data?.success) {
            navigate('/', {replace: true});
            toast({
                title: 'Udało się wylogować',
                position: 'bottom-left',
                status: 'success',
                duration: 6000,
                isClosable: true,
            })
        }
        if (error) {
            toast({
                title: 'Wylogowanie nie powiodło się',
                position: 'bottom-left',
                status: 'error',
                duration: 6000,
                isClosable: true,
            })
        }
    }, [data, error])
    return (
        <div className="ProfileMenu">
            <Menu>
                {({ isOpen }) => (
                    <>
                        <MenuButton isActive={isOpen} as={Button} variant='solid' colorScheme='green' boxShadow='md' size='md' borderRadius='md' p={6} fontSize={24} _expanded={{ bg: 'green.900' }}>
                            PROFIL
                        </MenuButton>
                        <MenuList bgColor='green.100' borderColor='green.500'>
                            <MenuItem
                                _hover={{bg: 'green.200'}}
                                _focus={{bg: 'green.200'}}
                                onClick={() => setRequest(`${mainConfig.url}/api/auth/logout`, {
                                    method: 'POST',
                                })}
                            >
                                {loading ? <Spinner/> : 'Wyloguj'}
                            </MenuItem>
                        </MenuList>
                    </>
                )}
            </Menu>
        </div>
    )
}