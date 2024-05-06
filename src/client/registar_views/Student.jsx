import { useState, useEffect } from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";
import { Link, useParams } from "react-router-dom";
import { Toaster, toast } from 'sonner';

function RStudent() {
    const [student, setStudent] = useState([]);
    const {term_id} = useParams();

    useEffect(() => {
        const getStudents = async () => {
            try {
                const request = await axios.get(`/api/student/${term_id}`)
                const {data} = request
                console.log(data.studentTerm);
                setStudent(data.studentTerm);
            }
            catch(e) {
                console.error(e);
            }
        }

        getStudents()
    }, [term_id])

    const unenrollStudent = async (event) => {
        const clickedElement = event.currentTarget
        const student_id = clickedElement.getAttribute('value'); 
        console.log(student_id);

        const url = `/api/student/${term_id}/${student_id}`;
        axios.delete(url);

        toast('Student Unenrolled Successfully')

        const request = await axios.get(`/api/student/${term_id}`)
        setStudent(request.data.studentTerm)
        
    }
    
    

    return(
        <>
        <Toaster/>
        <h1>Students</h1>

        <section className="mt-4">
            <table className="table table-stripped">
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
                    {student.map(s => 
                    <tr key={uuid()}>
                        <td>{s.student_id}</td>
                        <td>{s.student_name}</td>
                        <td>{s.major}</td>
                        <td><Link to={`/registar/students/schedule/${term_id}/${s.s_id}`} className="btn btn-primary">Schedule</Link></td>
                        <td><button className="btn btn-danger" value={s.t_id} onClick={unenrollStudent} >Unenroll</button></td>
                    </tr>
                        )}
                </tbody>
            </table>
        </section>

        <Link to={`/registar/students/enroll/${term_id}`} className="btn btn-primary home_links">Enroll Students</Link>
        </>
    )
}

export default RStudent