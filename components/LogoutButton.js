import { Icon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react'
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';


export default function LogoutButton(props) {
    const [cookies, setCookie, removeCookie] = useCookies(['userID']);
    const router = useRouter();

    const LogoutIcon = (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none" /><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" /></svg>
    )

    const onClickHandler = () => {
        axios.post("/api/logout", { userID: cookies.userID }).then(()=>{
            removeCookie("userID");
            router.push("/");
        });
    }

    return (
        <>
            <IconButton
                variant="unstyled"
                colorScheme='teal'
                aria-label='Logout'
                icon={<Icon as={LogoutIcon} />}
                onClick={onClickHandler}
            />
        </>
    );
}