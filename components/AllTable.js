import { useEffect, useState } from "react";
import TodoListTable from "./TodoListTable";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import moment from "moment";

export default function AllTable () {
    const [cookies, setCookie, removeCookie] = useCookies(['userID']);

    const [data, setData] = useState(undefined);
    
    useEffect(()=>{
        const url = "/api/items?userID=" + cookies.userID;
        axios.get(url).then((res)=>{
            setData(res.data.result);
        }).catch((err)=>{
            console.error(err);
        });
    }, []);

    return (
        <>
            <TodoListTable data={data} disableOverdue={true}/>
        </>
    );
}