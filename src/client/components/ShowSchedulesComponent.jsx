import { useState, useEffect } from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";
import { Link } from "react-router-dom";
import { Toaster, toast } from 'sonner';

export default function ShowScheduleComponent(props) {
    const {term_id, student_id, student_name, student_ku_id, credits} = props;
    const [schedule, setSchedule] = useState([]);

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

    const deleteCourse = async (event) => {
        try {
            const student = event.currentTarget 
            const sc_student_id = student.getAttribute('value')
            console.log(student_id);
    
            const url = `/api/student/schedule/${term_id}/${student_id}/${sc_student_id}`
            axios.delete(url)
    
            const request = await axios(`/api/student/schedule/${term_id}/${student_id}`)
            setCourses(request.data.schedule);
        }
        catch (e) {
            console.error(e);
        }
       }

    return(
        <>
        
             <section className="schedules-table">
                <h4>{student_name}</h4>
                <span>{student_ku_id}</span>
                <table className="table">
                    <thead>
                    <span className="total-credits"><strong>{credits} Credits</strong></span>
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
                                <td name='course_id' value={course.student_schedule_id} onClick={(event) => deleteCourse(event)}><i className='bx bx-trash delete'></i></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>


        
        </>
    )
}