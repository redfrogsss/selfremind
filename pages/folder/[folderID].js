import { useRouter } from 'next/router'
import { Flex, Grid, GridItem, Spacer, Stack, Text } from '@chakra-ui/react'
import MenuBar from "../../components/MenuBar";
import FoldersPanel from "../../components/FoldersPanel";
import AddItemButton from "../../components/AddItemButton";
import TodoListTable from "../../components/TodoListTable";
import RemoveFolderButton from "../../components/RemoveFolderButton";
import AuthRedirect from '../../components/AuthRedirect';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import FolderTable from '../../components/FolderTable';

const Folder = () => {
    const router = useRouter();
    const { folderID } = router.query;  //url variable
    const [cookies, setCookie, removeCookie] = useCookies(['userID']);

    const [folderData, setFolderData] = useState(undefined);

    useEffect(() => {
        if (folderID !== undefined) {
            axios.get("/api/folders/" + folderID + "?userID=" + cookies.userID)
                .then((res) => {
                    setFolderData(res.data.result[0]);
                }).catch((err) => {
                    console.error(err);
                });
        }
    }, [folderID]);

    const printFolderName = () => {
        return folderData ? folderData.name : "";
    }

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
                                    Folder: {printFolderName()}
                                    <RemoveFolderButton folderID={folderID}/>
                                </Text>
                            </Text>
                            <Spacer />
                            <AddItemButton />
                        </Flex>
                        <FolderTable folderID={folderID} />
                    </Stack>
                </GridItem>
            </Grid>
        </>
    );
}

export default Folder;
