import {Link, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";
import { Toaster, toast } from 'sonner';

function FacultyCourse() {
    const [course, setCourse] = useState([])
    const {faculty_id} = useParams();

    useEffect(() => {
        const getCourses = async () => {
            try {
                const request = await axios.get(`/api/faculty/course/${faculty_id}`)
                const {data} = request
                console.log(data.courses);
                setCourse(data.courses)
            }   
            catch(e) {
                console.error(e);
            }
        }

        getCourses();
    }, [faculty_id]);

    const deleteCourse = async (event) => {
        try {
            const fCourse = event.currentTarget 
            const fCourse_id = fCourse.getAttribute('value')
            console.log(fCourse_id);
    
            const url = `/api/faculty/course/${faculty_id}/${fCourse_id}`
            axios.delete(url)
    
            const request = await axios(`/api/faculty/course/${faculty_id}`)
            setCourse(request.data.courses);
        }
        catch (e) {
            console.error(e);
        }
       }

    return(
        <>
            <h1>Faculty Courses</h1>

            <section className="mt-4">

        <table className="table table-striped">
            <thead className="table-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Course Code</th>
                    <th scope="col">Course Name</th>
                    <th scope="col">Course Credits</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {course.map(c =>
                <tr key={uuid()}>
                    <td>{c.course_id}</td>
                    <td>{c.course_code}</td>
                    <td>{c.course_name}</td>
                    <td>{c.course_credits}</td>
                    <td name='course_id' value={c.id} onClick={(event) => deleteCourse(event)}><i className='bx bx-trash delete'></i></td>
                </tr>    
                    )}
            </tbody>
        </table>
        <Link to={`/faculty/assign/${faculty_id}`} className="btn btn-primary">Assign Course</Link>
    </section>
        </>
    )
}

export default FacultyCourse;