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
        <Button colorScheme="teal" onClick={props.onClick}>{props.children}</Button>
    );
}

const InactiveButton = (props) => {
    return (
        <Button variant="outline" onClick={props.onClick}><Text color="gray.500">{props.children}</Text></Button>
    );
}

const AddFolderButton = (props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [cookies, setCookie, removeCookie] = useCookies(['userID']);
    const router = useRouter();

    const toast = useToast();

    const SuccessToast = () =>
        toast({
            description: 'Folder created successfully.',
            status: 'success',
            duration: 9000,
            isClosable: true,
        });

    const submitHandler = (e) => {
        e.preventDefault();

        var data = {
            userID: cookies.userID,
            name: e.target.name.value,
        }

        axios.post("/api/folders", data)
            .then((res) => {
                console.log(res.data);
                if(router.asPath === "/home") {
                    router.push("/all");
                } else {
                    router.push("/home");
                }
            })
            .catch((err) => {
                console.log(err);
            });

        onClose();
        SuccessToast();
    }

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
                <form onSubmit={(e) => { submitHandler(e); }}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add Folder</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl>
                                <FormLabel htmlFor='text'>Name</FormLabel>
                                <Input id='name' type='text' />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='teal' mr={3} type="submit" >Add Folder</Button>
                            <Button colorScheme='teal' variant='ghost' onClick={onClose}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    );
}

const PanelButtons = (props) => {
    const router = useRouter();

    const expectedURL = props.expectedURL ? props.expectedURL : undefined;
    const onClick = props.onClick ? props.onClick : undefined;

    if (expectedURL === undefined) {
        return <InactiveButton onClick={onClick}>{props.children}</InactiveButton>
    } else {
        if (router.asPath === expectedURL) {
            return <ActiveButton onClick={onClick}>{props.children}</ActiveButton>
        } else {
            return <InactiveButton onClick={onClick}>{props.children}</InactiveButton>
        }
    }
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
                // <InactiveButton onClick={() => { router.push("/folder/" + value.id) }}>{value.name}</InactiveButton>
                <PanelButtons
                    expectedURL={"/folder/" + value.id}
                    onClick={() => { router.push("/folder/" + value.id) }}
                >{value.name}</PanelButtons>
            )
        });
    }


    return (
        <Stack w="100%" p={10}>
            <PanelButtons expectedURL="/home" onClick={() => { router.push("/home") }}>Today</PanelButtons>
            <PanelButtons expectedURL="/done" onClick={() => { router.push("/done") }}>Done</PanelButtons>
            <PanelButtons expectedURL="/all" onClick={() => { router.push("/all") }}>All Todos</PanelButtons>
            <Divider w="100%" h={1} py={1} />
            {printFolderButtons(data)}
            <AddFolderButton />
        </Stack>
    );
} 