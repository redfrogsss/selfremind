import { Button, FormControl, FormLabel, Input, Stack} from "@chakra-ui/react";

export default function LoginForm() {
    return (
        <FormControl>
            <Stack>
                <FormLabel htmlFor="usernmae">Username</FormLabel>
                <Input id="username" type="text" placeholder="Username"></Input>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input id="password" type="password" placeholder="Password"></Input>
                <Button type="submit" mt={4} colorScheme="teal">
                    Login
                </Button>
            </Stack>
        </FormControl>
    );
}