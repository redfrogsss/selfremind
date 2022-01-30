import { useEffect, useState } from "react";
import TodoListTable from "./TodoListTable";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import moment from "moment";

export default function TodayTable () {
    const [cookies, setCookie, removeCookie] = useCookies(['userID']);

    const [data, setData] = useState(undefined);

    const filteredData = (data) => {
        return data.filter(((value)=>{  // return true or false
            return moment().isSame(moment(value.datetime), "date") & !value.finished;
        }));
    }
    
    useEffect(()=>{
        const url = "/api/items?userID=" + cookies.userID;
        axios.get(url).then((res)=>{
            setData(filteredData(res.data.result));
        }).catch((err)=>{
            console.error(err);
        });
    }, []);

    return (
        <>
            <TodoListTable data={data} />
        </>
    );
}