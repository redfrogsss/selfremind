
import { SearchIcon } from '@chakra-ui/icons';
import { Center, Divider, Grid, GridItem, Text, Input, InputGroup, InputLeftElement, HStack, IconButton } from '@chakra-ui/react'
import Link from 'next/link';
import SettingModal from './SettingModal';
import LogoutButton from './LogoutButton';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const SearchBar = () => {
    return (
        <InputGroup>
            <InputLeftElement
                pointerEvents='none'
                children={<SearchIcon color="gray.300" />}
            />
            <Input type="text" placeholder="Search" />
        </InputGroup>
    );
}

export default function MenuBar() {

    const [username, setUsername] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies(['userID']);
    const toast = useToast();

    const FailToast = () =>
        toast({
            description: 'Cannot fetch username',
            status: 'error',
            duration: 9000,
            isClosable: true,
        });

    useEffect(()=>{
        const url = "/api/user/" + cookies.userID;
        axios.get(url).then((res) => {
            setUsername(res.data.result[0].username);
        }).catch((err)=>{
            console.error(err);
            FailToast();
        });
    }, []);

    return (
        <Grid templateColumns='repeat(5, 1fr)'>
            <GridItem>
                <Center h="100%" p={4}>
                    <Link href={"/"}>
                        <a>
                            <Text fontSize='xl' as='b'>SelfRemind</Text>
                        </a>
                    </Link>
                </Center>
            </GridItem>
            <GridItem colSpan="3">
                <Center p={4}>
                    <SearchBar />
                </Center>
            </GridItem>
            <GridItem>
                <Center p={4}>
                    <HStack>
                        <SettingModal />
                        <LogoutButton /> 
                        <Text px={4}>
                            {username}
                        </Text>
                    </HStack>
                </Center>
            </GridItem>
            <GridItem colSpan="5">
                <Divider width="100%"></Divider>
            </GridItem>
        </Grid>
    );
}