import { Button, Divider, Stack, Text } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons'

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

const AddFolderButton = (props) => {
    return (
        <Button
            colorScheme='teal'
            variant='ghost'
            leftIcon={<AddIcon color="gray.500" />}
        >
            <Text color="gray.500">Add Folder</Text>
        </Button>
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
            <AddFolderButton />
        </Stack>
    );
} 