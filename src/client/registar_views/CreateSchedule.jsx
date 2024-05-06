import React, { useState } from "react";
import axios from "axios";
import ScheduleComponent from "../components/ScheduleComponent";
import { v4 as uuid } from "uuid";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";

function CreateSchedule() {
    const { register, handleSubmit, formState: { errors } } = useForm({ model: "onChange" });
    const { term_id } = useParams();
    const {student_id} = useParams();
    const [selectedCourses, setSelectedCourses] = useState([]);
    const navigate = useNavigate();

    // Function to handle course selection
    const handleCourseSelection = (course) => {
        setSelectedCourses(prevCourses => [...prevCourses, course]);
    };

    // Function to handle form submission
    const onSubmit = async () => {
        try {
            const response = await axios.post(`/api/student/schedule/${term_id}/${student_id}`, selectedCourses);
            console.log("Response:", response.data);
            navigate(`/registar/students/${term_id}`)
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <h1>Create Schedule</h1>

            {/* Display selected courses */}
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
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedCourses.map(course => (
                            <tr key={uuid()}>
                                <td>{course.course_days}</td>
                                <td>{course.start_time} - {course.end_time}</td>
                                <td>{course.building} - {course.room_name}</td>
                                <td>{course.course_code}</td>
                                <td>{course.course_name}</td>
                                <td>{course.professor_name}</td>
                                <td>{course.start_date} - {course.end_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Form for submitting selected courses */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <button type="submit">Save Schedule</button>
            </form>

            {/* ScheduleComponent for selecting courses */}
            <section className="term-component">
                <ScheduleComponent term_id={term_id} onSelectCourse={handleCourseSelection} />
            </section>
        </>
    );
}

export default CreateSchedule;
