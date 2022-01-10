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
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import DateTimePicker from "./DateTimePicker";

export default function AddItemButton() {

    const { isOpen, onOpen, onClose } = useDisclosure()

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
                                <Input id='name' type='text' placeholder="Shopping"/>
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor='description'>Description</FormLabel>
                                <Textarea id='desciption 'placeholder='Description' />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor='description'>Date & Time</FormLabel>
                                <DateTimePicker />
                            </FormControl>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='teal' mr={3}>Add Item</Button>
                        <Button colorScheme='teal' variant='ghost' onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}