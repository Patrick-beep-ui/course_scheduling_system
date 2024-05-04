import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import {useState, useEffect} from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";

function EditTerm() {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
    const [term, setTerm] = useState([]);
    const navigate = useNavigate();
    const {term_id} = useParams();

    console.log(term_id);

    const processData = async (formData) => {
        try {
            const request = await fetch(`/api/terms/${term_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            const {term_data} = await request.json();
            console.log(term_data);
            toast.success('Term edited suuccessfully');
            navigate('/terms');
        }
        catch(e) {
            console.error(e)
            toast.error('An error occurred');
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`/api/terms/${term_id}`);
                const {data} = response
                console.log(data.termID);
                setTerm([data.termID]);
            }
            catch(e) {
                console.error(e)
            }
        }

        getData();
    }, [term_id])

    return(
        <>
        <Toaster />
        <h1>Edit Term</h1>

        <form onSubmit={handleSubmit(processData)}>
        <input type="hidden" name="method" value="PUT"/>
        {term.map(t => 
        <div key={uuid()}>
            <section>
                <label>Term Name</label>
                <select {...register("name", {required: true})} defaultValue={t.term_name}>
                    <option value="Spring">Spring</option>
                    <option value="Fall">Fall</option>
                    <option value="Summer">Summer</option>
                </select>
                {errors.code && <span>This field is required</span>}
            </section>
            <section>
                <label>Year</label>
                <input type="text" {...register("term_year", {required: true})} defaultValue={t.term_year} />
                {errors.code && <span>This field is required</span>}
            </section>
            <section>
                <label>Start Date</label>
                <input type="date" {...register("start_date", {required: true})} defaultValue={t.start_date} />
                {errors.code && <span>This field is required</span>}
            </section>
            <section>
                <label>End Date</label>
                <input type="date" {...register("end_date", {required: true})} defaultValue={t.end_date} />
                {errors.code && <span>This field is required</span>}
            </section>
        </div>
            )}
        <button type="submit">Save</button>
      </form>
        </>
    )
}

export default EditTerm;