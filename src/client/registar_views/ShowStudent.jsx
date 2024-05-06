import { useState, useEffect } from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';

function ShowStudent() {
    const [student, setStudent] = useState([]);
    const {term_id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getStudents = async () => {
            try {
                const request = await axios.get(`/api/student`)
                const {data} = request
                console.log(data.students);
                setStudent(data.students);
            }
            catch(e) {
                console.error(e);
            }
        }

        getStudents()
    }, [term_id])

    const enrollStudent = async (event) => {
        const clickedElement = event.currentTarget
        const student_id = clickedElement.getAttribute('value'); 
        console.log(student_id);

        const url = `/api/student/${term_id}/${student_id}`;
        axios.post(url);

        toast('Student Enrolled Successfully')
        navigate(`/registar/students/${term_id}`)
    }
    

    return(
        <>
        <Toaster />
        <h1>All Students</h1>

        <section className="mt-4">
            <table className="table table-stripped">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Major</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {student.map(s => 
                    <tr key={uuid()}>
                        <td>{s.student_id}</td>
                        <td>{s.student_name}</td>
                        <td>{s.major}</td>
                        <td><button className="btn btn-primary" value={s.s_id} onClick={enrollStudent}>Enroll</button></td>
                    </tr>
                        )}
                </tbody>
            </table>
        </section>
        </>
    )
}

export default ShowStudent