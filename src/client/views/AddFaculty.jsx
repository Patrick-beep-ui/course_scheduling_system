import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function AddFaculty() {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
    const navigate = useNavigate();
    const [schedules, setSchedules] = useState([]);

    const addSchedule = () => {
        setSchedules([...schedules, { days: "", start_time: "", end_time: "" }]);
    };

    const removeSchedule = (index) => {
        const updatedSchedules = [...schedules];
        updatedSchedules.splice(index, 1);
        setSchedules(updatedSchedules);
    };

    const processData = async (formData) => {
        try {
            const { schedules, ...facultyData } = formData;

            const request = await fetch('/api/faculty', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...facultyData, // Send faculty data excluding schedules
                    schedules: schedules // Send schedules separately
                })
            });

            const { faculty } = await request.json();
            console.log(faculty);
            navigate('/faculty');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <h1>Add Faculty</h1>

            <form onSubmit={handleSubmit(processData)}>
                <section>
                    <label>Professor First Name:</label>
                    <input type="text" {...register("first_name", { required: true })} />
                    {errors.first_name && <span>This field is required</span>}
                </section>
                <section>
                    <label>Professor Last Name:</label>
                    <input type="text" {...register("last_name", { required: true })} />
                    {errors.last_name && <span>This field is required</span>}
                </section>
                <section>
                    <label>Professor's Degree:</label>
                    <input type="text" {...register("degree", { required: true })} />
                    {errors.degree && <span>This field is required</span>}
                </section>
                <div className="faculty_availability">
                    <p>Professor's Schedule</p>
                    {schedules.map((schedule, index) => (
                        <div key={index}>
                            <section>
                                <label>Professor's Available Days</label>
                                <input type="text" {...register(`schedules[${index}].days`, { required: true })} />
                                {errors.schedules && errors.schedules[index] && errors.schedules[index].days && <span>This field is required</span>}
                            </section>
                            <section>
                                <label>Start Time</label>
                                <input type="text" {...register(`schedules[${index}].start_time`, { required: true })} />
                                {errors.schedules && errors.schedules[index] && errors.schedules[index].start_time && <span>This field is required</span>}
                            </section>
                            <section>
                                <label>End Time</label>
                                <input type="text" {...register(`schedules[${index}].end_time`, { required: true })} />
                                {errors.schedules && errors.schedules[index] && errors.schedules[index].end_time && <span>This field is required</span>}
                            </section>
                            {index > 0 && <button type="button" onClick={() => removeSchedule(index)}>Remove Schedule</button>}
                        </div>
                    ))}
                    <button type="button" onClick={addSchedule}>Add Schedule</button>
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default AddFaculty;
