import { useState, useEffect } from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";
import { Link } from "react-router-dom";
import { Toaster, toast } from 'sonner';

export default function ScheduleComponent(props) {
    const {term_id, onSelectCourse } = props;
    const [course, setCourse] = useState([]);

    console.log(term_id);

    useEffect(() => {
        const getCourses = async () => {
            try {
                const request = await axios.get(`/api/rosters/classes/${term_id}`)
                const {data} = request;
                console.log(data.classes)
                setCourse(data.classes)
            }
            catch(e) {
                console.error(e)
            }
        }

        getCourses();
    }, [term_id]);

        // Function to handle course selection
        const handleCourseSelect = (course) => {
            onSelectCourse(course);
        };

    return(
        <>
        <h3>Term Component {term_id}</h3>
        <section className="mt-4 section-card">
        {course.map(course => (
                    <div className="course-card" key={course.term_course_id}>
                        <h4>{course.course_code}</h4>
                        <p>{course.course_name}</p>
                        <p>Professor: {course.professor_name}</p>
                        <p>Days: {course.course_days}</p>
                        <p>Time: {course.start_time} - {course.end_time}</p>
                        <p>Location: {course.building} - {course.room_name}</p>
                        <p>Credits: {course.course_credits}</p>
                        <p>Dates: {course.start_date} to {course.end_date}</p>
                        <button onClick={() => handleCourseSelect(course)}>Select</button>
                    </div>
                ))}
        </section>
        
        </>
        
    )
}
