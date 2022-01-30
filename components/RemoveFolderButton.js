import { IconButton } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'
import React from "react";
import { Button } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router'

export default function RemoveFolderButton(props) {

    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef()
    const toast = useToast();
    const folderID = props.folderID ? props.folderID : undefined; 
    const [cookies, setCookie, removeCookie] = useCookies(['userID']);
    const router = useRouter();

    const SuccessToast = () =>
        toast({
            description: 'Folder removed successfully.',
            status: 'success',
            duration: 9000,
            isClosable: true,
        });

    const FailToast = () =>
        toast({
            description: 'Folder removed failed.',
            status: 'error',
            duration: 9000,
            isClosable: true,
        });

    const deleteHandler = () => {

        axios.delete("/api/folders/" + folderID + "?userID=" + cookies.userID)
            .then((res) => {
                console.log(res.data);
                onClose();
                SuccessToast();
                router.push("/home");
            })
            .catch((err) => {
                console.error(err);
                FailToast();
            }); 

    }

    return (
        <>
            <IconButton aria-label='Delete Folder' icon={<DeleteIcon />} ml={3} onClick={() => setIsOpen(true)} />
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Folder
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button colorScheme='red' onClick={() => { deleteHandler() }}>
                                Delete
                            </Button>
                            <Button ref={cancelRef} onClick={onClose} ml={3}>
                                Cancel
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}