import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { useRouter } from 'next/router'

export default function LoginForm() {
    const router = useRouter();

    const submitHandler = (e) => {
        e.preventDefault();

        var attempt = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        console.log(attempt);

        // temp
        const href = "/home";
        router.push(href);
    }

    return (
        <form onSubmit={submitHandler}>
            <Stack>
                <FormControl>
                    <FormLabel htmlFor='username'>Username</FormLabel>
                    <Input id='username' type='username' required/>
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input id='password' type='password' required/>
                </FormControl>
                <Button type="submit" mt={4} colorScheme="teal" onSubmit={submitHandler}>
                    Login
                </Button>
            </Stack>
        </form>
    );
}