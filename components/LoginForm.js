import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'
import { useCookies } from 'react-cookie';
import { useEffect } from "react";

const axios = require('axios');

export default function LoginForm() {
    const [cookies, setCookie, removeCookie] = useCookies(['userID']);
    const toast = useToast();
    const router = useRouter();

    const FailToast = () =>
        toast({
            description: "Username / Password Invalid.",
            status: 'error',
            duration: 9000,
            isClosable: true,
        })

    const submitHandler = (e) => {
        e.preventDefault();

        const attempt = {
            username: e.target.username.value,
            pwd: e.target.password.value
        }

        axios.post("/api/login", attempt).then((res) => {
            if (res.data.authStatus === true) {
                // console.log("userID", res.data.userID);  // test session
                setCookie("userID", res.data.userID);
                // console.log("cookie", cookies.userID);   // test cookies
                const href = "/home";
                router.push(href);
            } else {
                FailToast();
            }
        }).catch((err) => {
            FailToast();
        });
    }

    useEffect(() => {
        if (!cookies.userID) { console.log("no cookies"); } else {
            axios.post("/api/authStatus", { userID: cookies.userID }).then((res) => {
                if (res.data.authStatus) {
                    const href = "/home";
                    router.push(href);
                }
            });
        }
    }, []);

    return (
        <form onSubmit={submitHandler}>
            <Stack>
                <FormControl>
                    <FormLabel htmlFor='username'>Username</FormLabel>
                    <Input id='username' type='username' required />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input id='password' type='password' required />
                </FormControl>
                <Button type="submit" mt={4} colorScheme="teal" onSubmit={submitHandler}>
                    Login
                </Button>
            </Stack>
        </form>
    );
}