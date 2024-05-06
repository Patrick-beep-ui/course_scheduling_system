import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import axios from "axios";

function EditFaculty() {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
    const [faculty, setFaculty] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [newSchedule, setNewSchedule] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);

    const navigate = useNavigate();
    const { faculty_id } = useParams();

    // Function to add a new schedule
    const addSchedule = () => {
        setNewSchedule([...newSchedule, { days: "", start_time: "", end_time: "" }]);
    };

    // Function to remove a schedule at a specific index
    const removeSchedule = (index) => {
        const updatedSchedule = [...newSchedule];
        updatedSchedule.splice(index, 1);
        setNewSchedule(updatedSchedule);
    };

    // Function to handle form submission
    const processData = async (formData) => {
        try {
            const { newSchedule, ...Data } = formData;
            const request = await axios.put(`/api/faculty/${faculty_id}`, {
                ...Data,
                schedules: newSchedule
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            console.log("New Schedule:", newSchedule);

            // Redirect to faculty page after successful update
            const { faculty } = request.data;
            navigate(`/faculty`);
            console.log(faculty);
        } catch (error) {
            console.error(error);
            toast.error('An error occurred');
        }
    };

    // Fetch faculty and schedule data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const facultyResponse = await axios.get(`/api/faculty/${faculty_id}`);
                const scheduleResponse = await axios.get(`/api/faculty/availability/${faculty_id}`);

                const facultyData = facultyResponse.data.facultyID;
                const scheduleData = scheduleResponse.data.availability;

                console.log("Faculty:", facultyData)
                console.log("Schedule:", scheduleData)

                setFaculty(facultyData);
                setSchedule(scheduleData);
            } catch (error) {
                console.error(error);
                toast.error('Failed to fetch data');
            }
        };

        fetchData();
    }, [faculty_id]);

    // Function to handle editing a schedule item
    const handleEdit = (index) => {
        setEditingIndex(index);
    };

    return (
        <>
            <Toaster />
            <h1>Edit Faculty</h1>

            <form onSubmit={handleSubmit(processData)}>
                {/* Input fields for faculty data */}
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
                            <input type="text" {...register("degree", { required: true })} defaultValue={f.professor_degree} />
                            {errors.degree && <span>This field is required</span>}
                        </section>

                        {/* Hidden input for user_id */}
                        <input type="hidden" {...register("user_id")} value={f.user_id} />
                    </div>
                ))}

                {/* Table to display current schedule */}
                <section className="mt-4">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Days</th>
                                <th scope="col">Start Time</th>
                                <th scope="col">End Time</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedule.map((a, index) => (
                                <tr key={index}>
                                    {editingIndex === index ? (
                                        <>
                                            <td><input type="text" {...register(`schedule[${index}].days`)} defaultValue={a.days} /></td>
                                            <td><input type="text" {...register(`schedule[${index}].start_time`)} defaultValue={a.start_time} /></td>
                                            <td><input type="text" {...register(`schedule[${index}].end_time`)} defaultValue={a.end_time} /></td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{a.days}</td>
                                            <td>{a.start_time}</td>
                                            <td>{a.end_time}</td>
                                        </>
                                    )}
                                    <td>
                                        {editingIndex === index ? (
                                            <button type="button" onClick={() => setEditingIndex(null)}>Save</button>
                                        ) : (
                                            <button type="button" onClick={() => handleEdit(index)}>Edit</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                {/* Section to add new schedule */}
                <div>
                    <h2>Add Schedule</h2>
                    {newSchedule.map((schedule, index) => (
                        <div key={index}>
                            <section>
                                <label>Professor's Available Days</label>
                                <input type="text" {...register(`newSchedule[${index}].days`, { required: true })} />
                                {errors.newSchedule && errors.newSchedule[index] && errors.newSchedule[index].days && <span>This field is required</span>}
                            </section>
                            <section>
                                <label>Start Time</label>
                                <input type="text" {...register(`newSchedule[${index}].start_time`, { required: true })} />
                                {errors.newSchedule && errors.newSchedule[index] && errors.newSchedule[index].start_time && <span>This field is required</span>}
                            </section>
                            <section>
                                <label>End Time</label>
                                <input type="text" {...register(`newSchedule[${index}].end_time`, { required: true })} />
                                {errors.newSchedule && errors.newSchedule[index] && errors.newSchedule[index].end_time && <span>This field is required</span>}
                            </section>
                            {index > 0 && <button type="button" onClick={() => removeSchedule(index)}>Remove Schedule</button>}
                        </div>
                    ))}
                    <button type="button" onClick={addSchedule}>Add Schedule</button>
                </div>

                {/* Submit button */}
                <button type="submit">Save</button>
            </form>
        </>
    );
}

export default EditFaculty;
