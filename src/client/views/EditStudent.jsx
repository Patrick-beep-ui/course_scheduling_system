import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import {useState, useEffect} from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";

function EditStudent() {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
  const [student, setStudent] = useState([]);
  const navigate = useNavigate();
  const {major_id} = useParams();
  const {student_id} = useParams();


  console.log(major_id)

  const processData = async (formData) => {
    try {
      const request = await fetch(`/api/students/${major_id}/${student_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      const { course_name } = await request.json(); 
      navigate(`/students/${major_id}`)
      console.log(course_name)

    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    }
  };

  useEffect(() => {
    const getData = async () => {
        try {
            const response = await axios.get(`/api/students/${major_id}/${student_id}`)
            const {data} = response
            console.log(data.studentID)
            setStudent(data.studentID)
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
        {student.map(s => 
        <div key={uuid()}>
            <section className="form-group">
                <label className="form-label">Student First Name:</label>
                <input type="text" {...register("first_name", {required: true})} className="form-control" defaultValue={s.first_name} />
                {errors.code && <span>This field is required</span>}
            </section>
            <section className="col-12">
                <label className="form-label">Student Last Name:</label>
                <input type="text" {...register("last_name", {required: true})} defaultValue={s.last_name} />
                {errors.code && <span>This field is required</span>}
            </section>
            <section>
                <input type="hidden" value={major_id}{...register("major", {required: true})}/>
                {errors.code && <span>This field is required</span>}
                <input type="hidden" value={s.user_id}{...register("user_id", {required: true})}/>
                {errors.code && <span>This field is required</span>}
            </section>
            <section>
                <label className="form-label">Student ID:</label>
                <input type="number" {...register("student_id", {required: true})} defaultValue={s.student_id} />
                {errors.code && <span>This field is required</span>}
            </section>
            <section className="col-12">
            <button type="submit">Submit</button>
            </section>
        </div>
            )}
        <button type="submit">Save</button>
      </form>
    </>
  );
}

export default EditStudent;
