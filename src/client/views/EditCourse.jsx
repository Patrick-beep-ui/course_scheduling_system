import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import {useState, useEffect} from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";

function EditCourse() {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
  const [course, setCourse] = useState([]);
  const navigate = useNavigate();
  const {major_id} = useParams();
  const {course_id} = useParams();


  console.log(major_id)

  const processData = async (formData) => {
    try {
      const request = await fetch(`/api/courses/${major_id}/${course_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      const { course_name } = await request.json(); 
      navigate(`/courses/${major_id}`)
      console.log(course_name)

    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    }
  };

  useEffect(() => {
    const getData = async () => {
        try {
            const response = await axios.get(`/api/courses/${major_id}/${course_id}`)
            const {data} = response
            console.log(data.courseID)
            setCourse(data.courseID)
        }
        catch(e) {
            console.error(e);
        }
      }

      getData();
  }, [major_id])

  return (
    <>
      <Toaster />
      <h1>Edit Major</h1>

      <form onSubmit={handleSubmit(processData)}>
        <input type="hidden" name="method" value="PUT"/>
        {course.map(c => 
        <div key={uuid()}>
            <section>
                    <label>Course Code:</label>
                    <input type="text" {...register("code",{ required: true })} defaultValue={c.code}/>
                    {errors.code && <span>This field is required</span>}
                </section>
                <section>
                    <label>Credits:</label>
                    <input type="number" {...register("credits",{ required: true })} defaultValue={c.credits} />
                    {errors.credits && <span>This field is required</span>}
                </section>
                <section>
                    <label>Prerequisite:</label>
                    <input type="number" {...register("prerequisite")} defaultValue={c.prerequisite}/>
                </section>
                <section>
                    <label>Course Name:</label>
                    <input type="text" {...register("course_name",{ required: true })} defaultValue={c.course_name}/>
                    {errors.course_name && <span>This field is required</span>}
                </section>
        </div>
            )}
        <button type="submit">Save</button>
      </form>
    </>
  );
}

export default EditCourse;
