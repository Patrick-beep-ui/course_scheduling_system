import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';

function AddMajor() {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
  const navigate = useNavigate();

  const processData = async (formData) => {
    try {
      const request = await fetch(`/api/majors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      const { major_name } = await request.json(); 

      const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: major_name }), 2000));

      toast.promise(promise(), {
        loading: 'Adding major...',
        success: (response) => {
          navigate('/');
          return `${response.name} Major has been added`;
        },
        error: (error) => `Error: ${error}`,
      });
    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    }
  };

  return (
    <>
      <Toaster />
      <h1>Add Major</h1>

      <form onSubmit={handleSubmit(processData)}>
        <section>
          <label>Major Name:</label>
          <input type="text" {...register("major_name", { required: true })} />
          {errors.major_name && <span>This field is required</span>}
        </section>
        <section>
          <label>Degree:</label>
          <input type="text" {...register("degree", { required: true })} />
          {errors.degree && <span>This field is required</span>}
        </section>
        <section>
          <label>Credits</label>
          <input type="number" {...register("credits", { required: true })} />
          {errors.credits && <span>This field is required</span>}
        </section>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default AddMajor;
