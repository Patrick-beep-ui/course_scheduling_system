import { useState, useEffect } from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";
import { Link } from "react-router-dom";
import { Toaster, toast } from 'sonner';

export default function TermComponent(props) {
    const {term_id} = props;
    const [course, setCourse] = useState([]);

    console.log(term_id);

    useEffect(() => {
        const getCourses = async () => {
            try {
                const request = await axios.get(`/api/roster/${term_id}`)
                const {data} = request;
                console.log(data.courses)
                setCourse(data.courses)
            }
            catch(e) {
                console.error(e)
            }
        }

        getCourses();
    }, [term_id]);

    return(
        <>
        <h3>Term Component {term_id}</h3>
        <section className="mt-4 section-card">
        {course.map(c => 
        <div className="course-card" key={c.term_course_id}>
            <h3>{c.course_code}</h3>
            <p>{c.course_name}</p>
            <div className="details">
                <p><strong>Credits:</strong> {c.course_credits}</p>
                <p><strong>Professor:</strong> {c.professor_name}</p>
            </div>
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
