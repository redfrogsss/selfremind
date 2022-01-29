import { Button, Divider, Stack, Text } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons'
import { useDisclosure } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import axios from 'axios'
import { useCookies } from 'react-cookie';

const ActiveButton = (props) => {
    return (
        <Button colorScheme="teal">{props.children}</Button>
    );
}

const InactiveButton = (props) => {
    return (
        <Button variant="outline" onClick={props.onClick}><Text color="gray.500">{props.children}</Text></Button>
    );
}

const AddFolderButton = (props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const toast = useToast();

    const SuccessToast = () =>
        toast({
            description: 'Folder created successfully.',
            status: 'success',
            duration: 9000,
            isClosable: true,
        });

    return (
        <>
            <Button
                colorScheme='teal'
                variant='ghost'
                leftIcon={<AddIcon color="gray.500" />}
                onClick={onOpen}
            >
                <Text color="gray.500">Add Folder</Text>
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Folder</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel htmlFor='text'>Name</FormLabel>
                            <Input id='Name' type='text' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='teal' mr={3} onClick={() => { onClose(); SuccessToast(); }} >Add Item</Button>
                        <Button colorScheme='teal' variant='ghost' onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default function FoldersPanel() {

    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['userID']);
    const [data, setData] = useState([]);

    useEffect(() => {
        // get all folders 
        axios.get("/api/folders?userID=" + cookies.userID)
            .then((res) => {
                setData(res.data.result);
            });
    }, [])

    const printFolderButtons = (data) => {
        return data.map((value) => {
            return (
                <InactiveButton onClick={() => { router.push("/folder/" + value.id) }}>{value.name}</InactiveButton>
            )
        });
    }

    return (
        <Stack w="100%" p={10}>
            <ActiveButton>Today</ActiveButton>
            <InactiveButton onClick={()=>{ router.push("/done") }}>Done</InactiveButton>
            <InactiveButton>All Todos</InactiveButton>
            <Divider w="100%" h={1} py={1} />
            {/* temp route */}
            {/* <InactiveButton onClick={() => { router.push("/folder/Folder1") }}>Folder 1</InactiveButton>
            <InactiveButton onClick={() => { router.push("/folder/Folder2") }}>Folder 2</InactiveButton>
            <InactiveButton onClick={() => { router.push("/folder/Folder3") }}>Folder 3</InactiveButton>
            <InactiveButton onClick={() => { router.push("/folder/Folder4") }}>Folder 4</InactiveButton> */}
            {printFolderButtons(data)}
            <AddFolderButton />
        </Stack>
    );
} 