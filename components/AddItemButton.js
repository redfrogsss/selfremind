import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";


export default function AddItemButton () {
    return (
        <Button colorScheme="gray" leftIcon={<AddIcon />}>Add Item</Button>
    );
}