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