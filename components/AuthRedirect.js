import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
const axios = require('axios');

export default function AuthRedirect() {
    const [cookies, setCookie, removeCookie] = useCookies(['userID']);
    const router = useRouter();

    useEffect(() => {
        if (!cookies.userID) {
            router.push("/login");
        } else {
            axios.post("/api/authStatus", { userID: cookies.userID }).then((res) => {
                if (!res.data.authStatus) {
                    router.push("/login");
                }
            });
        }
    }, []);

    return (<></>);
}