import { Icon } from '@chakra-ui/icons';
import { IconButton, useDisclosure } from '@chakra-ui/react'
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
import { Button, Input, Divider } from '@chakra-ui/react'


const SettingsIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><rect fill="none" height="24" width="24" /><path d="M19.5,12c0-0.23-0.01-0.45-0.03-0.68l1.86-1.41c0.4-0.3,0.51-0.86,0.26-1.3l-1.87-3.23c-0.25-0.44-0.79-0.62-1.25-0.42 l-2.15,0.91c-0.37-0.26-0.76-0.49-1.17-0.68l-0.29-2.31C14.8,2.38,14.37,2,13.87,2h-3.73C9.63,2,9.2,2.38,9.14,2.88L8.85,5.19 c-0.41,0.19-0.8,0.42-1.17,0.68L5.53,4.96c-0.46-0.2-1-0.02-1.25,0.42L2.41,8.62c-0.25,0.44-0.14,0.99,0.26,1.3l1.86,1.41 C4.51,11.55,4.5,11.77,4.5,12s0.01,0.45,0.03,0.68l-1.86,1.41c-0.4,0.3-0.51,0.86-0.26,1.3l1.87,3.23c0.25,0.44,0.79,0.62,1.25,0.42 l2.15-0.91c0.37,0.26,0.76,0.49,1.17,0.68l0.29,2.31C9.2,21.62,9.63,22,10.13,22h3.73c0.5,0,0.93-0.38,0.99-0.88l0.29-2.31 c0.41-0.19,0.8-0.42,1.17-0.68l2.15,0.91c0.46,0.2,1,0.02,1.25-0.42l1.87-3.23c0.25-0.44,0.14-0.99-0.26-1.3l-1.86-1.41 C19.49,12.45,19.5,12.23,19.5,12z M12.04,15.5c-1.93,0-3.5-1.57-3.5-3.5s1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5S13.97,15.5,12.04,15.5z" /></svg>
)

export default function SettingModal(props) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const FailToast = () =>
        toast({
            description: 'Item created failed.',
            status: 'error',
            duration: 9000,
            isClosable: true,
        });

    const submitHandler = (e) => {
        e.preventDefault();

        var formInfo = {
            newUsername: e.target.newusername.value,
            oldPassword: e.target.oldpassword.value,
            newPassword: e.target.newpassword.value,
            repeatNewPassword: e.target.repeatnewpassword.value,
        }

        console.log(formInfo);

        onClose();
    }

    return (
        <>
            <IconButton
                variant="unstyled"
                colorScheme='teal'
                aria-label='Send email'
                icon={<Icon as={SettingsIcon} />}
                onClick={onOpen}
            />

            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={submitHandler}>
                        <ModalHeader>Settings</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <b>Update Username</b>
                            <FormControl>
                                <FormLabel htmlFor='newusername'>New Username</FormLabel>
                                <Input id='newusername' type='text' />
                            </FormControl>
                            <Divider h={3} />
                            <b>Update Password</b>
                            <FormControl>
                                <FormLabel htmlFor='oldpassword'>Old Password</FormLabel>
                                <Input id='oldpassword' type='password' />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor='newpassword'>New Password</FormLabel>
                                <Input id='newpassword' type='password' />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor='repeatnewpassword'>Repeat New Password</FormLabel>
                                <Input id='repeatnewpassword' type='password' />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button variant='ghost' mr={3} onClick={onClose}>Cancel</Button>
                            <Button colorScheme='blue' type="submit">
                                Update
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
}
