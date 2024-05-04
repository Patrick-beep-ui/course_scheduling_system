import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

function AddAdmin() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("/api/users");
                setUsers(response.data.users);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, []);

    const makeAdmin = async (userId) => {
        try {
            await axios.put(`/api/users/${userId}/make-admin`);
            const response = await axios.get("/api/users");
            setUsers(response.data.users);
            navigate("/admins")
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Link to="/admins">Go Back</Link>
            <section className="mt-4">
                <table className="table table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={uuid()}>
                                <td>{user.id}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button
                                        onClick={() => makeAdmin(user.id)}
                                        className="btn btn-secondary"
                                    >
                                        Make Admin
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    );
}

export default AddAdmin;
