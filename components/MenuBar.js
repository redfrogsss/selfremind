
import { Icon, SearchIcon } from '@chakra-ui/icons';
import { Center, Divider, Grid, GridItem, Text, Input, InputGroup, InputLeftElement, HStack, IconButton } from '@chakra-ui/react'

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

const LogoutIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none" /><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" /></svg>
)

const SettingsIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><rect fill="none" height="24" width="24"/><path d="M19.5,12c0-0.23-0.01-0.45-0.03-0.68l1.86-1.41c0.4-0.3,0.51-0.86,0.26-1.3l-1.87-3.23c-0.25-0.44-0.79-0.62-1.25-0.42 l-2.15,0.91c-0.37-0.26-0.76-0.49-1.17-0.68l-0.29-2.31C14.8,2.38,14.37,2,13.87,2h-3.73C9.63,2,9.2,2.38,9.14,2.88L8.85,5.19 c-0.41,0.19-0.8,0.42-1.17,0.68L5.53,4.96c-0.46-0.2-1-0.02-1.25,0.42L2.41,8.62c-0.25,0.44-0.14,0.99,0.26,1.3l1.86,1.41 C4.51,11.55,4.5,11.77,4.5,12s0.01,0.45,0.03,0.68l-1.86,1.41c-0.4,0.3-0.51,0.86-0.26,1.3l1.87,3.23c0.25,0.44,0.79,0.62,1.25,0.42 l2.15-0.91c0.37,0.26,0.76,0.49,1.17,0.68l0.29,2.31C9.2,21.62,9.63,22,10.13,22h3.73c0.5,0,0.93-0.38,0.99-0.88l0.29-2.31 c0.41-0.19,0.8-0.42,1.17-0.68l2.15,0.91c0.46,0.2,1,0.02,1.25-0.42l1.87-3.23c0.25-0.44,0.14-0.99-0.26-1.3l-1.86-1.41 C19.49,12.45,19.5,12.23,19.5,12z M12.04,15.5c-1.93,0-3.5-1.57-3.5-3.5s1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5S13.97,15.5,12.04,15.5z"/></svg>
)

export default function MenuBar() {
    return (
        <Grid templateColumns='repeat(5, 1fr)'>
            <GridItem>
                <Center h="100%" p={4}>
                    <Text fontSize='xl' as='b'>SelfRemind</Text>
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
                        <IconButton
                            variant="unstyled"
                            colorScheme='teal'
                            aria-label='Send email'
                            icon={<Icon as={SettingsIcon} />}
                        />
                        <IconButton
                            variant="unstyled"
                            colorScheme='teal'
                            aria-label='Send email'
                            icon={<Icon as={LogoutIcon} />}
                        />
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