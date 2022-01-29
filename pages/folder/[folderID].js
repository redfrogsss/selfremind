import { useRouter } from 'next/router'
import { Flex, Grid, GridItem, Spacer, Stack, Text } from '@chakra-ui/react'
import MenuBar from "../../components/MenuBar";
import FoldersPanel from "../../components/FoldersPanel";
import AddItemButton from "../../components/AddItemButton";
import TodoListTable from "../../components/TodoListTable";
import RemoveFolderButton from "../../components/RemoveFolderButton";
import AuthRedirect from '../../components/AuthRedirect';

const Folder = () => {
    const router = useRouter();
    const { folderID } = router.query;  //url variable

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
                                    Folder: {folderID}
                                    <RemoveFolderButton />
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
    );
}

export default Folder;
