import { useState, useEffect } from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";
import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';

function CourseRoster() {
    const { register, handleSubmit, formState: { errors } } = useForm({ model: "onChange" });
    const [room, setRoom] = useState([]);
    const [course, setCourse] = useState([]);
    const {term_id} = useParams();

    const processData = async (formData) => {
        try {
          const request = await fetch(`/api/roster`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
          });
    
          const { roster } = await request.json();
          console.log(roster);
    
          toast.promise(promise(), {
            loading: 'Adding Course...',
            success: (response) => {
                navigate(`/registar`);
              return `${response.name} Course has been added`;
            },
            error: (error) => `Error: ${error}`,
          });
        }
        catch (e) {
          console.error(e);
        }
      }

      useEffect(() => {
        const fetchData = async () => {
            try {
                const [roomResponse, courseResponse] = await Promise.all([
                    axios.get(`/api/room`),
                    axios.get(`/api/professor/courses`)
                ]);

                const roomData = roomResponse.data.rooms;
                const courseData = courseResponse.data.facultyCourses

                console.log("Rooms:", roomData);
                console.log("Courses:", courseData);

                setRoom(roomData);
                setCourse(courseData);
            }
            catch(e) {
                console.error("Error fetching data:", e); 
            }
        }

        fetchData()
      }, [term_id]);


      

      return(
        <>
        <Toaster/>
        <h1>Course Roster</h1>

        <form onSubmit={handleSubmit(processData)}>
            <section>
                <h4>Select Course</h4>
                <select {...register("course_id")} defaultValue={1}>
                    {course.map(c => 
                    <option value={c.fc_id} key={uuid()} >{c.course_code} {c.course_name} - {c.faculty_name}</option>
                    )}
                </select>
            </section>
            <input type="hidden" value={term_id} {...register("term")} />
            <section>
                <h4>Select Room</h4>
                <select {...register("room_id")} defaultValue={1}>
                    {room.map(r => 
                    <option value={r.room_id} key={uuid()} >{r.building} - {r.room_name} (Capacity: {r.room_capacity}) Resources: {r.room_components}</option>    
                        )}
                </select>
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
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </>
      )
}

export default CourseRoster