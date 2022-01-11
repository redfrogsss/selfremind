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

export default function AddItemButton() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const toast = useToast();

    const SuccessToast = () =>
        toast({
            description: 'Item created successfully.',
            status: 'success',
            duration: 9000,
            isClosable: true,
        });

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
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Item</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Stack spacing={3}>
                            <FormControl>
                                <FormLabel htmlFor='name'>Name</FormLabel>
                                <Input id='name' type='text' placeholder="Shopping" />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor='description'>Description</FormLabel>
                                <Textarea id='desciption ' placeholder='Description' />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor='description'>Date & Time</FormLabel>
                                <DateTimePicker />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor='reminder'>Reminder</FormLabel>
                                <Select id='reminder'>
                                    <option value='none' defaultChecked>No Reminder</option>
                                    <option value='5'>5 minutes before</option>
                                    <option value='10'>10 minutes before</option>
                                    <option value='15'>15 minutes before</option>
                                    <option value='30'>30 minutes before</option>
                                    <option value='60'>1 hour before</option>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor='reminder'>Repeat</FormLabel>
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
                                    <option value='folder1' defaultChecked>Folder 1</option>
                                    <option value='folder2'>Folder 2</option>
                                    <option value='folder3'>Folder 3</option>
                                    <option value='folder4'>Folder 4</option>
                                </Select>
                            </FormControl>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='teal' mr={3} onClick={()=>{onClose();SuccessToast();}} >Add Item</Button>
                        <Button colorScheme='teal' variant='ghost' onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}