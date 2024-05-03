import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {v4 as uuid} from "uuid";
import { Link } from "react-router-dom";
import { Toaster, toast } from 'sonner';

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

    const deleteStudent = async (event) => {
        const clickedElement = event.currentTarget
        const student_id = clickedElement.getAttribute('value'); 
        console.log(student_id);

        const url = `/api/students/${major_id}/${student_id}`;
        axios.delete(url);

        const request = await axios(`/api/students/${major_id}`);
        setStudents(request.data.students);
        toast('Student Deleted Successfully')
    }

    return(
        <>
        <Toaster />
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
                    <td>{student.major}</td>
                    <td><Link to={`/student/edit/${major_id}/${student.id}`}><i className='bx bx-pencil edit'></i></Link></td>
                    <td name='major_id' value={student.id} onClick={(event) => deleteStudent(event)}><i className='bx bx-trash delete'></i></td>
                </tr>    
                    )}
            </tbody>
        </table>


        <Link to={`/students/add/${major_id}`} className="btn btn-primary">Add Student</Link>
        </section>
        </>
    )
}

export default Student; 