import { AddIcon } from "@chakra-ui/icons";
import { Button, Stack } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
} from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import DateTimePicker from "./DateTimePicker";
import { Select } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import moment from 'moment'
import { useRouter } from 'next/router'

export default function AddItemButton() {
    const router = useRouter()

    const [cookies, setCookie, removeCookie] = useCookies(['userID']);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [datetime, setDatetime] = useState(new Date());
    const toast = useToast();
    const [folderData, setFolderData] = useState([]);

    // fetch folder data
    useEffect(() => {
        axios.get("/api/folders?userID=" + cookies.userID)
            .then((res) => {
                setFolderData(res.data.result);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const SuccessToast = () =>
        toast({
            description: 'Item created successfully.',
            status: 'success',
            duration: 9000,
            isClosable: true,
        });

    const submitHandler = (e) => {
        e.preventDefault();

        var data = {
            userID: cookies.userID,
            name: e.target.name.value,
            description: e.target.description.value,
            datetime: datetime,
            reminder: e.target.reminder.value,
            repeat: e.target.repeat.value,
            folder: e.target.folder.value
        }

        console.log(data);
        axios.post("/api/items", data).then((res) => {
            onClose();
            SuccessToast();
            router.push("/folder/" + data.folder);
        }).catch((err) => {
            console.error(err);
        });
    }

    const datetimeHandler = (value) => {
        setDatetime(moment(value));
    }

    const printFolderOptions = () => {
        return folderData.map((value) => {
            return <option value={value.id}>{value.name}</option>
        });
    }

    return (
        <>
            <Button
                colorScheme="gray"
                leftIcon={<AddIcon />}
                onClick={onOpen}
            >
                Add Item
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                <form onSubmit={submitHandler}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add Item</ModalHeader>
                        <ModalCloseButton />

                        <ModalBody>
                            <Stack spacing={3}>
                                <FormControl isRequired>
                                    <FormLabel htmlFor='name'>Name</FormLabel>
                                    <Input id='name' type='text' placeholder="Shopping" />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor='description'>Description</FormLabel>
                                    <Textarea id='description' placeholder='Description' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel htmlFor='datetime'>Date & Time</FormLabel>
                                    <DateTimePicker changeHandler={datetimeHandler} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor='reminder'>Reminder</FormLabel>
                                    <Select id='reminder'>
                                        <option value='0' defaultChecked>No Reminder</option>
                                        <option value='5'>5 minutes before</option>
                                        <option value='10'>10 minutes before</option>
                                        <option value='15'>15 minutes before</option>
                                        <option value='30'>30 minutes before</option>
                                        <option value='60'>1 hour before</option>
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor='repeat'>Repeat</FormLabel>
                                    <Select id='repeat'>
                                        <option value='none' defaultChecked>None</option>
                                        <option value='daily'>Daily</option>
                                        <option value='weekly'>Weekly</option>
                                        <option value='monthly'>Monthly</option>
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor='folder'>Folder</FormLabel>
                                    <Select id='folder'>
                                        {printFolderOptions()}
                                    </Select>
                                </FormControl>
                            </Stack>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='teal' mr={3} type="submit">Add Item</Button>
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