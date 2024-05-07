import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { Toaster, toast } from 'sonner';

export default function TermComponent(props) {
    const { term_id } = props;
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getCourses = async () => {
            try {
                const request = await axios.get(`/api/roster/${term_id}`)
                const { data } = request;
                console.log(data.courses)
                setCourses(data.courses)
            }
            catch (e) {
                console.error(e)
            }
        }

        getCourses();
    }, [term_id]);

    return (
        <>
            <h3>Term Component {term_id}</h3>
            <section className="mt-4 section-card">
                {courses.map(course =>
                    <div className={`course-card`} key={course.term_course_id}>
                        <h3>{course.course_code}</h3>
                        <p><Link to={`/registar/roster/edit/${term_id}/${course.term_course_id}`}>{course.course_name}</Link></p>
                        <div className="details">
                            <p><strong>Credits:</strong> {course.course_credits}</p>
                            <p><strong>Professor:</strong> {course.professor_name}</p>
                        </div>  
                        <span className={`${course.qtyOfStudents < 6 ? 'red' : ''}`}>Students: {course.qtyOfStudents}</span>
                    </div>
                )}
            </section>

            <section className="registar-links">
                <Link to={`/registar/students/${term_id}`} className="btn btn-primary home_links">See Students</Link>
                <Link to={`/registar/roster/${term_id}`} className="btn btn-primary home_links">Add a Course</Link>
                <Link to={`/registar/schedules/show/${term_id}`} className="btn btn-primary home_links">See Schedules</Link>
            </section>
        </>
    )
}
