import { useEffect, useState } from "react";
import TodoListTable from "./TodoListTable";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import moment from "moment";

export default function SearchTable(props) {
    const [cookies, setCookie, removeCookie] = useCookies(['userID']);

    const [data, setData] = useState(undefined);

    const keywords = props.keywords ? props.keywords : undefined;

    const filteredData = (data) => {
        return data.filter(((value) => {  // return true or false
            return value.name.toString().toLowerCase().search(keywords.toString().toLowerCase()) !== -1 || value.description.toString().toLowerCase().search(keywords.toString().toLowerCase()) !== -1;
        }));
    }

    useEffect(() => {
        const url = "/api/items?userID=" + cookies.userID;
        axios.get(url).then((res) => {
            setData(filteredData(res.data.result));
            console.log(filteredData(res.data.result));
        }).catch((err) => {
            console.error(err);
        });
    }, []);

    return (
        <>
            <TodoListTable data={data} />
        </>
    );
}