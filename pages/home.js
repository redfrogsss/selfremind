import MenuBar from "../components/MenuBar";
import { Grid, GridItem } from '@chakra-ui/react'
import FoldersPanel from "../components/FoldersPanel";

export default function Home() {
    return (
        <Grid templateColumns='repeat(5, 1fr)'>
            <GridItem colSpan={5}>
                <MenuBar />
            </GridItem>
            <GridItem>
                <FoldersPanel />
            </GridItem>
            <GridItem colSpan={4}>
                Hello World
            </GridItem>
        </Grid>
    )
}