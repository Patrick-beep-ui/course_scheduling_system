import { useState, useEffect } from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";
import { Link, useParams } from "react-router-dom";
import { Toaster, toast } from 'sonner';

function StudentSchedule() {
    const [schedule, setSchedule] = useState([]);
    const {term_id} = useParams();
    const {student_id} = useParams();

    console.log("Term:", term_id);
    console.log("Student", student_id);

    useEffect(() => {
        const getSchedule = async () => {
            try {
                const request = await axios.get(`/api/student/schedule/${term_id}/${student_id}`)
                const {data} = request
                console.log(data.schedule)
                setSchedule(data.schedule)
            }
            catch(e) {
                console.error(e)
            }
        }

        getSchedule()
    }, [student_id])

    return(
        <>
        <h1>Student Schedule</h1>
        
             <section>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Days</th>
                            <th scope="col">Time</th>
                            <th>Location</th>
                            <th scope="col">Course Code</th>
                            <th scope="col">Course Name</th>
                            <th scope="col">Professor</th>
                            <th>Credits</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map(course => (
                            <tr key={uuid()}>
                                <td>{course.course_days}</td>
                                <td>{course.start_time} - {course.end_time}</td>
                                <td>{course.building} - {course.room_name}</td>
                                <td>{course.course_code}</td>
                                <td>{course.course_name}</td>
                                <td>{course.professor_name}</td>
                                <td>{course.course_credits}</td>
                                <td>{course.start_date} - {course.end_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>


        <section>
            <Link to={`/registar/create/schedule/${term_id}/${student_id}`} className="btn btn-primary">Create Schedule</Link>
        </section>
        </>
    )
}

export default StudentSchedule;