import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";


function AddCourse() {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
    const [courses, setCourses] = useState([]);
   const { major_id } = useParams();
   const navigate = useNavigate();

   console.log(major_id);

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

   const processData = async (formData) => {
    // Check if the selected prerequisite is "None"
    const prerequisiteValue = formData.prerequisite === "None" ? null : formData.prerequisite;

    try {
        const request = await fetch(`/api/courses/${major_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...formData,
                prerequisite: prerequisiteValue, // Replace "None" with null
            }),
        });
        const { courses } = await request.json();
        navigate(`/courses/${major_id}`);
        console.log(courses);
    } catch (error) {
        console.error(error);
    }
};


    return (
        <>
            <h1>Add Course</h1>
            <form onSubmit={handleSubmit(processData)}>
                <section>
                    <label>Course Code:</label>
                    <input type="text" {...register("code",{ required: true })} />
                    {errors.code && <span>This field is required</span>}
                </section>
                <section>
                    <label>Credits:</label>
                    <input type="number" {...register("credits",{ required: true })} />
                    {errors.credits && <span>This field is required</span>}
                </section>
                <section>
                    <label>Prerequisite:</label>
                    <select {...register("prerequisite")} defaultValue={null}>
                        <option value={null}>None</option>
                        {courses.map(c => 
                            <option key={c.id} value={c.id}>{c.course_name} - {c.code}</option>)}
                    </select>

                </section>
                <section>
                    <label>Course Name:</label>
                    <input type="text" {...register("course_name",{ required: true })} />
                    {errors.course_name && <span>This field is required</span>}
                </section>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default AddCourse;
