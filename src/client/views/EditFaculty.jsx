import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import { useState, useEffect } from "react";
import axios from "axios";

function EditFaculty() {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
    const [faculty, setFaculty] = useState([]);
    const navigate = useNavigate();
    const { faculty_id } = useParams();

    const processData = async (formData) => {
        try {
            const request = await fetch(`/api/faculty/${faculty_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            const { faculty } = await request.json();
            navigate(`/faculty`);
            console.log(faculty);
        } catch (error) {
            console.error(error);
            toast.error('An error occurred');
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`/api/faculty/${faculty_id}`)
                const { data } = response;
                console.log(data.facultyID);
                setFaculty(data.facultyID);
            } catch (e) {
                console.error(e);
            }
        };

        getData();
    }, [faculty_id]);

    return (
        <>
            <Toaster />
            <h1>Edit Faculty</h1>

            <form onSubmit={handleSubmit(processData)}>
                {faculty.map(f => (
                    <div key={f.id}>
                        <section>
                            <label>Professor First Name:</label>
                            <input type="text" {...register("first_name", { required: true })} defaultValue={f.first_name} />
                            {errors.first_name && <span>This field is required</span>}
                        </section>
                        <section>
                            <label>Professor Last Name:</label>
                            <input type="text" {...register("last_name", { required: true })} defaultValue={f.last_name} />
                            {errors.last_name && <span>This field is required</span>}
                        </section>
                        <section>
                            <label>Professor's Degree:</label>
                            <input type="text" {...register("degree", { required: true })} defaultValue={f.degree} />
                            {errors.degree && <span>This field is required</span>}
                        </section>

                        {/* Map through schedules */}
                        {f.schedules.map((schedule, index) => (
                            <div key={index}>
                                <section>
                                    <label>Professor's Available Days</label>
                                    <input type="text" {...register(`schedules[${index}].days`, { required: true })} defaultValue={schedule.days} />
                                    {errors.schedules && errors.schedules[index] && errors.schedules[index].days && <span>This field is required</span>}
                                </section>
                                <section>
                                    <label>Start Time</label>
                                    <input type="text" {...register(`schedules[${index}].start_time`, { required: true })} defaultValue={schedule.start_time} />
                                    {errors.schedules && errors.schedules[index] && errors.schedules[index].start_time && <span>This field is required</span>}
                                </section>
                                <section>
                                    <label>End Time</label>
                                    <input type="text" {...register(`schedules[${index}].end_time`, { required: true })} defaultValue={schedule.end_time} />
                                    {errors.schedules && errors.schedules[index] && errors.schedules[index].end_time && <span>This field is required</span>}
                                </section>
                            </div>
                        ))}
                    </div>
                ))}

                <button type="submit">Save</button>
            </form>
        </>
    );
}

export default EditFaculty;
