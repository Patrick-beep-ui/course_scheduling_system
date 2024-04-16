import {useState, useEffect} from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";
import {Link} from "react-router-dom";

function User() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const request = await axios("/api/users")
            const {data} = request;
            console.log(data);
        }
        getUsers();
    }, [])

    return(
        <>
        </>
    );
}

export default User;