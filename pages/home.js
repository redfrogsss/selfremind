import MenuBar from "../components/MenuBar";
import { Flex, Grid, GridItem, Spacer, Stack, Text } from '@chakra-ui/react'
import FoldersPanel from "../components/FoldersPanel";
import AddItemButton from "../components/AddItemButton";
import TodoListTable from "../components/TodoListTable";
import { useCookies } from 'react-cookie';
import { useEffect } from "react";
import AuthRedirect from '../components/AuthRedirect';

export default function Home() {

    const [cookies, setCookie, removeCookie] = useCookies(['userID']);

    useEffect(() => {
        // console.log(cookies.userID);
    }, []);

    return (
        <>
            <AuthRedirect />
            <Grid templateColumns='repeat(5, 1fr)'>
                <GridItem colSpan={5}>
                    <MenuBar />
                </GridItem>
                <GridItem>
                    <FoldersPanel />
                </GridItem>
                <GridItem colSpan={4}>
                    <Stack spacing={5} p={10}>
                        <Flex>
                            <Text>
                                <Text as="b" fontSize="xl">
                                    Today
                                </Text>
                                <Text fontSize="sm">
                                    27 December 2021
                                </Text>
                            </Text>
                            <Spacer />
                            <AddItemButton />
                        </Flex>
                        <TodoListTable />
                    </Stack>
                </GridItem>
            </Grid>
        </>
    )
}