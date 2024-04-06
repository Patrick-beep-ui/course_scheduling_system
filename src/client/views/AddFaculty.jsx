import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";

function AddFaculty() {
    const {register, handleSubmit, formState: {errors}} = useForm({mode: "onChange"});

    const processData = async (formData) => {
        try {
            const request = await fetch('/api/faculty', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            const {faculty} = await request.json();
            console.log(faculty);
        }
    catch(err) {
        console.error(err);
    }
    }

    return(
        <>
        <h1>Add Faculty</h1>

        <form onSubmit={handleSubmit(processData)}>
            <section>
                <label>Professor First Name:</label>
                <input type="text" {...register("first_name", {required: true})}/>
                {errors.code && <span>This field is required</span>}
            </section>
            <section>
                <label>Professor Last Name:</label>
                <input type="text" {...register("last_name", {required: true})}/>
                {errors.code && <span>This field is required</span>}
            </section>
            <section>
                <label>Professor's Degree:</label>
                <input type="text" {...register("degree", {required: true})}/>
                {errors.code && <span>This field is required</span>}
            </section>
            <button type="submit">Submit</button>
        </form>
        </>
    );
}

export default AddFaculty