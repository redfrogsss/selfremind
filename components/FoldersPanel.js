import { Button, Divider, Stack, Text } from "@chakra-ui/react";

const ActiveButton = (props) => {
    return (
        <Button colorScheme="teal">{props.children}</Button>
    );
}

const InactiveButton = (props) => {
    return (
        <Button variant="outline"><Text color="gray.500">{props.children}</Text></Button>
    );
}

export default function FoldersPanel() {
    return (
        <Stack w="100%" p={10}>
            <ActiveButton>Today</ActiveButton>
            <InactiveButton>Done</InactiveButton>
            <InactiveButton>All Todos</InactiveButton>
            <Divider w="100%" h={1} py={1} />
            <InactiveButton>Folder 1</InactiveButton>
            <InactiveButton>Folder 2</InactiveButton>
            <InactiveButton>Folder 3</InactiveButton>
            <InactiveButton>Folder 4</InactiveButton>
        </Stack>
    );
} 