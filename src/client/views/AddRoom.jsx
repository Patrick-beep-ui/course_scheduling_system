import { useForm } from "react-hook-form";
//import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function AddRoom() {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
    //const [courses, setCourses] = useState([]);
   const { building_id } = useParams();
   const navigate = useNavigate();

   console.log(building_id);

   const processData = async (formData) => {
    try {
        const request = await fetch(`/api/rooms/${building_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });
        const { courses } = await request.json();
        navigate(`/rooms/${building_id}`);
        console.log(courses);
    } catch (error) {
        console.error(error);
    }
};

    return(
        <>
        <h1>Add Room</h1>
        <form onSubmit={handleSubmit(processData)}>
                <section>
                    <label>Room Name:</label>
                    <input type="text" {...register("room_name",{ required: true })} />
                    {errors.code && <span>This field is required</span>}
                </section>
                <section>
                    <label>Room Capacity: </label>
                    <input type="number" {...register("capacity",{ required: true })} />
                    {errors.credits && <span>This field is required</span>}
                </section>
                <section>
                    <label>Components</label>
                    <textarea cols="30" rows="10" {...register("components", {required: true})} ></textarea>
                    {errors.credits && <span>This field is required</span>}
                </section>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default AddRoom