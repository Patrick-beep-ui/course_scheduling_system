import { useForm } from "react-hook-form";
//import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function AddCourse() {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
    //const [courses, setCourses] = useState([]);
   const { major_id } = useParams();
   const navigate = useNavigate();

   console.log(major_id);

    const processData = async (formData) => {
        try {
            const request = await fetch(`/api/courses/${major_id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
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
                    <input type="number" {...register("prerequisite")} defaultValue={null}/>
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
