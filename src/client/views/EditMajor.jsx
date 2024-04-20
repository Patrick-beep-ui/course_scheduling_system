import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import {useState, useEffect} from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";

function EditMajor() {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
  const [major, setMajor] = useState([]);
  const navigate = useNavigate();
  const {major_id} = useParams();


  console.log(major_id)

  const processData = async (formData) => {
    try {
      const request = await fetch(`/api/majors/${major_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      const { major_name } = await request.json(); 
      navigate('/')
      console.log(major_name)

    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    }
  };

  useEffect(() => {
    const getData = async () => {
        try {
            const response = await axios.get(`/api/majors/${major_id}`)
            const {data} = response
            console.log(data.majorID)
            setMajor(data.majorID)
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
        {major.map(major => 
        <div key={uuid()}>
            <section>
                <label>Major Name:</label>
                <input type="text" {...register("major_name", { required: true })} defaultValue={major.major_name}/>
                {errors.major_name && <span>This field is required</span>}
            </section>
            <section>
                <label>Degree:</label>
                <input type="text" {...register("degree", { required: true })} defaultValue={major.degree}/>
                {errors.degree && <span>This field is required</span>}
            </section>
            <section>
                <label>Credits</label>
                <input type="number" {...register("credits", { required: true })} defaultValue={major.credits}/>
                {errors.credits && <span>This field is required</span>}
            </section> 
            <input type="hidden" value={major.id}/>  
        </div>
        )}
        <button type="submit">Save</button>
      </form>
    </>
  );
}

export default EditMajor;
