import {useForm} from "react-hook-form";
import {useParams, useNavigate} from "react-router-dom";

function AddBuilding() {
    const {register, handleSubmit, formState: {errors}} = useForm({mode: "onChange"});
    const navigate = useNavigate();

    const processData = async (formData) => {
        try {
            const request = await fetch('/api/buildings', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            const {buildings} = await request.json();
            console.log(buildings);
            navigate('/buildings')
        }
    catch(err) {
        console.error(err);
    }
    }

    return(
        <>
        <h1>Add Building</h1>
        <form onSubmit={handleSubmit(processData)}>
            <section>
                <label>Building Name:</label>
                <input type="text" {...register("building_name", {required: true})}/>
                {errors.code && <span>This field is required</span>}
            </section>
            <button type="submit">Submit</button>
        </form>
        
        </>
    )
}

export default AddBuilding;