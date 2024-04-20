import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {v4 as uuid} from "uuid";
import { Link } from "react-router-dom";

function ShowStudents() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const getCourses = async () => {
            try {
                const request = await axios("/api/students");
                const {data} = request;
                console.log(data.students);
                setStudents(data.students);
            }       
            catch(e) {
                console.error(e);
            }
        }

        getCourses();
    }, [])

    return (
        <>
        <h1>Students</h1>
        <Link to={`/`}>Go Back</Link>
        <section className="mt-4">

        <table className="table table-striped">
            <thead className="table-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Major</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {students.map(student =>
                <tr key={uuid()}>
                    <td>{student.student_id}</td>
                    <td>{student.student_name}</td>
                    <td><Link to={`/courses/${student.major_id}`}>{student.major}</Link></td>
                    <td><i className='bx bx-pencil edit'></i></td>
                    <td name='major_id' value={student.id} onClick={(event) => deleteStudent(event)}><i className='bx bx-trash delete'></i></td>
                </tr>    
                    )}
            </tbody>
        </table>
        </section>
        </>
    )
}

export default ShowStudents;