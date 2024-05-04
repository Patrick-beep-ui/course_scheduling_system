import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";
import { Toaster, toast } from 'sonner';

function Admin() {
    const [admin, setAdmin] = useState([]);

    useEffect(() => {
        const getAdmins = async () => {
            try {
                const request = await axios.get(`/api/admins`)
                const {data} = request
                console.log(data.admins)
                setAdmin(data.admins)
            }
            catch(e) {
                console.error(e);
            }
        }
    getAdmins()    
    }, [])

    return(
        <>
        <Link to={`/`}>Go Back</Link>
        <section className="mt-4">

        <table className="table table-striped">
            <thead className="table-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                </tr>
            </thead>
            <tbody>
                {admin.map(a =>
                <tr key={uuid()}>
                    <td>{a.id}</td>
                    <td>{a.first_name}</td>
                    <td>{a.last_name}</td>
                    <td>{a.username}</td>
                    <td>{a.email}</td>
                    <td>{a.role}</td>
                </tr>    
                    )}
            </tbody>
        </table>
        <Link to={`/admins/add`} className="btn btn-primary">Add Admins</Link>
    </section>
        </>
    )
}

export default Admin