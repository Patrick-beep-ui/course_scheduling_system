import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import {useState, useEffect} from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";

function EditFaculty() {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
  const [faculty, setFaculty] = useState([]);
  const navigate = useNavigate();
  const {faculty_id} = useParams();


  console.log(faculty_id)

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
      navigate(`/faculty`)
      console.log(faculty)

    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    }
  };

  useEffect(() => {
    const getData = async () => {
        try {
            const response = await axios.get(`/api/faculty/${faculty_id}`)
            const {data} = response
            console.log(data.facultyID)
            setFaculty(data.facultyID)
        }
        catch(e) {
            console.error(e);
        }
      }

      getData();
  }, [faculty_id])

  return (
    <>
      <Toaster />
      <h1>Edit Faculty</h1>

      <form onSubmit={handleSubmit(processData)}>
        <input type="hidden" name="method" value="PUT"/>
        {faculty.map(f => 
            <div>
                <section>
                <label>Professor First Name:</label>
                <input type="text" {...register("first_name", {required: true})} defaultValue={f.first_name} />
                {errors.code && <span>This field is required</span>}
            </section>
            <input type="hidden" {...register("user_id", {required: true})} value={f.id} />
            <section>
                <label>Professor Last Name:</label>
                <input type="text" {...register("last_name", {required: true})} defaultValue={f.last_name} />
                {errors.code && <span>This field is required</span>}
            </section>
            <section>
                <label>Professor's Degree:</label>
                <input type="text" {...register("degree", {required: true})} defaultValue={f.professor_degree} />
                {errors.code && <span>This field is required</span>}
            </section>
            </div>)}

        <button type="submit">Save</button>
      </form>
    </>
  );
}

export default EditFaculty;
