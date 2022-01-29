import { useEffect, useState } from "react";
import TodoListTable from "./TodoListTable";
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function FolderTable (props) {

    const [cookies, setCookie, removeCookie] = useCookies(['userID']);
    const [data, setData] = useState(undefined);

    const folderID = props.folderID;

    const filteredData = (data) => {
        return data.filter(((value)=>{  // return true or false
            return value.folder.toString() === folderID.toString();
        }));
    }
    
    useEffect(()=>{
        const url = "/api/items?userID=" + cookies.userID;
        axios.get(url).then((res)=>{
            setData(filteredData(res.data.result));
            console.log(res.data.result);
        }).catch((err)=>{
            console.error(err);
        });
    }, [folderID]);

    return (
        <>
            <TodoListTable data={data} />
        </>
    );
}