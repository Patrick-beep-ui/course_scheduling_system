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

   return(
    <>
    <h1>Courses</h1>
     <table>
      <thead>
        <tr>
        <th>ID</th>
        <th>Code</th>
        <th>Name</th>
        <th>Credits</th>
        <th>Prerequisite</th>
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
         </tr>
          )}
        </tbody>
    </table>

    <Link to={`/courses/add/${major_id}`}>Add Course</Link>

    </>
   )
}

export default Course;
