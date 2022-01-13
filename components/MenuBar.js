
import { SearchIcon } from '@chakra-ui/icons';
import { Center, Divider, Grid, GridItem, Text, Input, InputGroup, InputLeftElement, HStack, IconButton } from '@chakra-ui/react'
import Link from 'next/link';
import SettingModal from './SettingModal';
import LogoutButton from './LogoutButton';

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
                            redfrogss
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