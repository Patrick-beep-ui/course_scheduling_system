import {useForm} from "react-hook-form";
import {useParams, useNavigate} from "react-router-dom";

function AddTerm() {
    const {register, handleSubmit, formState: {errors}} = useForm({mode: "onChange"});
    const navigate = useNavigate();

    const processData = async (formData) => {
        try {
            const request = await fetch('/api/terms', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })

            const {term} = await request.json();
            console.log(term);
            navigate('/terms')
        }   
        catch(e) {
            console.error(e);
        }
    }

    return(
        <>
        <h1>Add Term</h1>

        <form onSubmit={handleSubmit(processData)}>
            <section>
                <label>Term Name</label>
                <select {...register("name", {required: true})} >
                    <option value="Spring">Spring</option>
                    <option value="Fall">Fall</option>
                    <option value="Summer">Summer</option>
                </select>
                {errors.code && <span>This field is required</span>}
            </section>
            <section>
                <label>Year</label>
                <input type="text" {...register("term_year", {required: true})} />
                {errors.code && <span>This field is required</span>}
            </section>
            <section>
                <label>Start Date</label>
                <input type="date" {...register("start_date", {required: true})} />
                {errors.code && <span>This field is required</span>}
            </section>
            <section>
                <label>End Date</label>
                <input type="date" {...register("end_date", {required: true})} />
                {errors.code && <span>This field is required</span>}
            </section>
            <button type="submit">Submit</button>
        </form>

        
        </>
    )
}

export default AddTerm;