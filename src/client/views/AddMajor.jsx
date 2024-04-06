import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

function AddMajor() {
const {register, handleSubmit, formState: {errors}} = useForm({mode: "onChange"});


const processData = async (formData) => {
    try {
        const request = await fetch(`/api/majors`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });

        const {majors} = await request.json();
        console.log(majors) 

    } catch(error) {
        console.error(error);
    }
};

return(
    <>
        <h1>Add Major</h1>

        <form onSubmit={handleSubmit(processData)}>
            <section>
                <label>Major Name:</label>
                <input type="text" {...register("major_name", {
                    required: true})}/>
                {errors.code && <span>This field is required</span>}
            </section>
            <section>
                <label>Degree:</label>
                <input type="text" {...register("degree", {
                    required: true})}/>
                {errors.code && <span>This field is required</span>}
            </section>
            <section>
                <label>Credits</label>
                <input type="number" {...register("credits", {required: true})}/>
                {errors.code && <span>This field is required</span>}
            </section>
            <button type="submit">Submit</button>
        </form>
    </>
);

}

export default AddMajor