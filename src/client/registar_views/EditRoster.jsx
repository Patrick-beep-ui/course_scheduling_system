import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';

function EditRoster() {
    const { term_id, term_course_id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({ model: "onChange" });

    useEffect(() => {
        const fetchRosterEntry = async () => {
            try {
                const response = await axios.get(`/api/roster/${term_id}/${term_course_id}`);
                const { roster } = response.data;
                // Populate form fields with current roster entry data
                setValue("course_id", roster.course_id);
                setValue("room_id", roster.room_id);
                setValue("start_date", roster.start_date);
                setValue("end_date", roster.end_date);
                setValue("days", roster.days);
                setValue("start_time", roster.start_time);
                setValue("end_time", roster.end_time);
            } catch (error) {
                console.error("Error fetching roster entry:", error);
            }
        };

        fetchRosterEntry();
    }, [term_id, term_course_id, setValue]);

    const updateRosterEntry = async (formData) => {
        try {
            const response = await axios.put(`/api/roster/${term_id}/${term_course_id}`, formData);
            const { term_courses } = response.data;
            toast.success("Roster entry updated successfully");
            navigate(`/registar`);
        } catch (error) {
            console.error("Error updating roster entry:", error);
            toast.error("Failed to update roster entry");
        }
    };

    return (
        <>
            <h1>Edit Roster</h1>
            <form onSubmit={handleSubmit(updateRosterEntry)}>
                <section>
                    <h4>Course ID</h4>
                    <input type="text" {...register("course_id")} />
                </section>
                <section>
                    <h4>Room ID</h4>
                    <input type="text" {...register("room_id")} />
                </section>
                <section>
                    <h4>Start Date</h4>
                    <input type="date" {...register("start_date")} />
                </section>
                <section>
                    <h4>End Date</h4>
                    <input type="date" {...register("end_date")} />
                </section>
                <section>
                    <h4>Days</h4>
                    <input type="text" {...register("days")} />
                </section>
                <section>
                    <h4>Start Time</h4>
                    <input type="time" {...register("start_time")} />
                </section>
                <section>
                    <h4>End Time</h4>
                    <input type="time" {...register("end_time")} />
                </section>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
            <Toaster />
        </>
    );
}

export default EditRoster;
