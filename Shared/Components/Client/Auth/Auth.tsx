import { useRouter } from "next/router";
import ButtonHeader from "../Button/buttonHeader";
import styles from "./auth.module.css";
import { useEffect, useState } from "react";
import { useResize } from "../../../Hooks/useResize";
import { clearUser } from "../../../Redux/Featuries/User/userSlice";
import { getNameFirstLetter } from "../../../Utils/getNameFirstLetter";
import { AppDispatch, RootState } from "../../../Redux/Store/store";
import { useSelector, useDispatch } from "react-redux";
import { Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react";
// import Profile from "../../../../public/profile.png"

export default function Auth() {
    let {push} = useRouter()
    const [active,setActive]=useState(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    function goAuth() {
        push('/login-register');
    }
    const dispatch: AppDispatch = useDispatch();
    let {isMobile} =useResize()
    

    let user = useSelector((state: RootState) => state.user);
    console.log("user",user);
    const nameChar = user.fullname ? getNameFirstLetter(user.fullname) : '';

    

    

    function handleClick(){
        setActive(!active)
    }

    useEffect(() => {
        const token = localStorage.getItem('user_info');
        setAccessToken(token);
    }, [user]);



    const handleLogout = () => {
        window.location.reload();
        localStorage.removeItem("user_info");
        setAccessToken(null);
     
        localStorage.removeItem("access_token");
        dispatch(clearUser());
        push('/login-register');
    };
    
    
    return (
        <>

            {accessToken ?
                <div className='flex items-center justify-end gap-3'>
                    <Menu 
                        onOpen={() => setIsMenuOpen(true)}
                        onClose={() => setIsMenuOpen(false)}
                    >
                        <MenuButton 
                            onClick={handleClick} 
                            as={Button} 
                            colorScheme="teal"
                            borderRadius="full"
                            w="14"
                            h="14"
                            className={`flex justify-center items-center ${styles.user_btn} ${styles.auth_btn}`}
                            style={{ backgroundColor: isMenuOpen ? '#b0f4de' : '#26d6a1', color: 'white' }}
                        >
                            {nameChar}
                            
                        </MenuButton>
                        <h1 className={styles.user_name}>
  {isMobile && user.fullname.split(' ').map((word, index) => (
    <span key={index}>{word}</span>
  ))}
</h1>
                        
                        <MenuList style={{ backgroundColor: '#26d6a1', color: 'white' }}>
                            {
                              <ul>
                                    <MenuGroup>
                                        <MenuItem 
                                            sx={{ 
                                                color: 'white', 
                                                backgroundColor: '#26d6a1', 
                                                _hover: { backgroundColor: '#b0f4de' }, 
                                                transition: 'background-color 0.6s' 
                                            }} 
                                            onClick={() => push('/user/profile')}
                                        >
                                            Profilin
                                        </MenuItem>
                                        <MenuItem 
                                            sx={{ 
                                                color: 'white', 
                                                backgroundColor: '#26d6a1', 
                                                _hover: { backgroundColor: '#b0f4de' }, 
                                                transition: 'background-color 0.6s' 
                                            }} 
                                            onClick={() => push('/medicines')}
                                        >
                                            Tibet məhsulları
                                        </MenuItem>
                                        <MenuItem 
                                            sx={{ 
                                                color: 'white', 
                                                backgroundColor: '#26d6a1', 
                                                _hover: { backgroundColor: '#b0f4de' }, 
                                                transition: 'background-color 0.6s' 
                                            }} 
                                            onClick={() => push('/user/orders')}
                                        >
                                            Sifarişləriniz
                                        </MenuItem>
                                        <MenuItem 
                                            sx={{ 
                                                color: 'white', 
                                                backgroundColor: '#26d6a1', 
                                                _hover: { backgroundColor: '#b0f4de' },
                                                transition: 'background-color 0.6s'  
                                            }} 
                                            onClick={() => push('/user/checkout')}
                                        >
                                            Ödəniş
                                        </MenuItem>
                                    </MenuGroup>
                                    <MenuDivider />

                                    <MenuItem 
                                        sx={{ 
                                            color: 'white', 
                                            backgroundColor: '#26d6a1', 
                                            _hover: { backgroundColor: '#b0f4de' }, 
                                            transition: 'background-color 0.6s' 
                                        }} 
                                        onClick={handleLogout}
                                    >
                                        Çıxış et
                                    </MenuItem>
      
                                    </ul>
                                
                            }
                        </MenuList>
                        
                    </Menu>
                   
                </div> :
                <ButtonHeader addButtonFun={goAuth} typeButton={true} title='Daxil ol' btnSize={'sm'} addButton={false} />
            }
        </>
    )
}
