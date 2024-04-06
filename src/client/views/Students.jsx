import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {v4 as uuid} from "uuid";
import { Link } from "react-router-dom";

function Student() {
    const [students, setStudents] = useState([]);
    const { major_id } = useParams();

    useEffect(() => {
        const getStudents = async () => {
            try {
                const request = await axios(`/api/students/${major_id}`);
                const {data} = request;
                console.log(data.students);
                setStudents(data.students);
            }
            catch (err) {
                console.error(err);
            }
        };

        getStudents();
    }, [])

    return(
        <>
        <h1>Students</h1>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Major</th>
                </tr>
            </thead>
            <tbody>
                {students.map(student =>
                <tr key={uuid()}>
                    <td>{student.student_id}</td>
                    <td>{student.student_name}</td>
                    <td>{student.major}</td>
                </tr>    
                    )}
            </tbody>
        </table>


        <Link to={`/students/add/${major_id}`}>Add Student</Link>
        </>
    )
}

export default Student; 