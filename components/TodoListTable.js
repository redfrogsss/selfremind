import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Box,
    HStack,
    Text,
} from '@chakra-ui/react'
import { Checkbox } from '@chakra-ui/react'
import { Badge } from '@chakra-ui/react'
import moment from 'moment'

const DateBadge = (props) => {
    return (
        <Badge variant="outline" mr={2}>{props.children}</Badge>
    );
}

const OverDueDateBadge = (props) => {
    return (
        <Badge variant="outline" mr={2} colorScheme="red">{props.children}</Badge>
    );
}

const OverDueBadge = (props) => {
    return (
        <Badge variant="solid" mr={2} colorScheme="red">OverDue</Badge>
    );
}

const RepeatBadge = (props) => {
    return (
        <Badge variant="solid" mr={2}>{props.children}</Badge>
    );
}

export default function TodoListTable(props) {

    const printItems = (data = []) => {

        const getDate = (date) => {
            var targetDate = moment(date).format('DD MMM');
            var today = moment().format('DD MMM');
            if (targetDate.toString() === today.toString()){
                return "TODAY";
            } else {
                return targetDate;
            }
        }

        return data.map((value) => {
            return (
                <Tr>
                    <Td><Checkbox>{value.name}</Checkbox></Td>
                    <Td isNumeric>
                        <DateBadge>{getDate(value.datetime)}</DateBadge>
                        {moment(value.datetime).format('h:mm A')}
                    </Td>
                </Tr>
            );
        })
    }

    return (
        <Box borderRadius="lg" borderWidth="1px">
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>NAME</Th>
                        <Th isNumeric>DATE</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td><Checkbox>Item 1</Checkbox></Td>
                        <Td isNumeric>
                            <OverDueBadge />
                            <OverDueDateBadge>23 Dec</OverDueDateBadge>
                            06:00AM
                        </Td>
                    </Tr>
                    <Tr>
                        <Td><Checkbox>Item 2</Checkbox></Td>
                        <Td isNumeric>
                            <RepeatBadge>Weekly</RepeatBadge>
                            <DateBadge>Today</DateBadge>
                            07:00AM
                        </Td>
                    </Tr>
                    <Tr>
                        <Td><Checkbox>Item 3</Checkbox></Td>
                        <Td isNumeric>
                            <RepeatBadge>Monthly</RepeatBadge>
                            <DateBadge>Today</DateBadge>
                            09:30AM
                        </Td>
                    </Tr>
                    <Tr>
                        <Td><Checkbox>Item 4</Checkbox></Td>
                        <Td isNumeric>
                            <DateBadge>Today</DateBadge>
                            11:30AM
                        </Td>
                    </Tr>
                    {printItems(props.data)}
                </Tbody>
            </Table>
        </Box>

    );
}