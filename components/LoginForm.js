import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";

export default function LoginForm() {

    const submitHandler = (e) => {
        e.preventDefault();

        var attempt = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        console.log(attempt);
    }

    return (
        <form onSubmit={submitHandler}>
            <Stack>
                <FormControl>
                    <FormLabel htmlFor='username'>Username</FormLabel>
                    <Input id='username' type='username' />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input id='password' type='password' />
                </FormControl>
                <Button type="submit" mt={4} colorScheme="teal">
                    Login
                </Button>
            </Stack>
        </form>
    );
}