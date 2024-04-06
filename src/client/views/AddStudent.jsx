import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function AddStudent() {
    const {register, handleSubmit, formState: { errors}} = useForm({model: "onChange"});
    const { major_id } = useParams();

    const processData = async (formData) => {
        try {
            const request = await fetch(`/api/students/${major_id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            const {students} = await request.json();
            console.log(students);
        } 
        catch (err) {
            console.error(err);
        }
    }

    return(
        <>
        <h1>Add Student</h1>

        <form onSubmit={handleSubmit(processData)}>
            <section>
                <label>Student First Name:</label>
                <input type="text" {...register("first_name", {required: true})}/>
                {errors.code && <span>This field is required</span>}
            </section>
            <section>
                <label>Student Last Name:</label>
                <input type="text" {...register("last_name", {required: true})}/>
                {errors.code && <span>This field is required</span>}
            </section>
            <section>
                <input type="hidden" value={major_id}{...register("major", {required: true})}/>
                {errors.code && <span>This field is required</span>}
            </section>
            <section>
                <label>Student ID:</label>
                <input type="number" {...register("student_id", {required: true})}/>
                {errors.code && <span>This field is required</span>}
            </section>
            <button type="submit">Submit</button>
        </form>
        </>
    )
}

export default AddStudent