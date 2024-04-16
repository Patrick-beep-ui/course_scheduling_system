import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {v4 as uuid} from "uuid";
import { Link } from "react-router-dom";

function Course() {
   const [courses, setCourses] = useState([]);
   const { major_id } = useParams();

   useEffect(() => {
    const getCourses = async () => {
        try {
            const request = await axios(`/api/courses/${major_id}`)
            const {data} = request;
            console.log(data.courses);
            setCourses(data.courses);
        }
        catch (e) {
            console.error(e);
        }
    }
    getCourses();
   }, [])

   const deleteCourse = async (event) => {
    try {
        const student = event.currentTarget 
        const student_id = student.getAttribute('value')
        console.log(student_id);

        const url = `/api/courses/${major_id}/${student_id}`
        axios.delete(url)

        const request = await axios(`/api/courses/${major_id}`)
        setCourses(request.data.courses);
    }
    catch (e) {
        console.error(e);
    }
   }

   return(
    <>
    <h1>Courses</h1>
    <Link to={`/`}>Go Back</Link>
    <section className="mt-4">
     <table className="table table-stripped">
      <thead className="table-dark">
        <tr>
        <th scope="col">ID</th>
        <th scope="col">Code</th>
        <th scope="col">Name</th>
        <th scope="col">Credits</th>
        <th scope="col">Prerequisite</th>
        <th></th>
        <th></th>
        </tr>
      </thead>
      <tbody>
         {courses.map(course => 
         <tr key={uuid()}>
          <td>{course.id}</td>
          <td>{course.code}</td>
          <td>{course.course_name}</td>
          <td>{course.credits}</td>
          <td>{course.prerequisite}</td>
          <td><i className='bx bx-pencil edit'></i></td>
          <td name='course_id' value={course.id} onClick={(event) => deleteCourse(event)}><i className='bx bx-trash delete'></i></td>
         </tr>
          )}
        </tbody>
    </table>

    <Link to={`/courses/add/${major_id}`} className="btn btn-primary">Add Course</Link>
    </section>
    </>
   )
}

export default Course;
