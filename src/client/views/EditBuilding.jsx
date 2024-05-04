import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import {useState, useEffect} from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";

function EditBuilding() {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
  const [building, setBuilding] = useState([]);
  const navigate = useNavigate();
  const {building_id} = useParams();

  console.log(building_id)

  const processData = async (formData) => {
    try {
      const request = await fetch(`/api/buildings/${building_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      const { building_name } = await request.json(); 
      navigate(`/buildings`)
      console.log(building_name)

    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    }
  };

  useEffect(() => {
    const getData = async () => {
        try {
            const response = await axios.get(`/api/buildings/${building_id}`)
            const {data} = response
            console.log([data.buildingID])
            setBuilding([data.buildingID])
        }
        catch(e) {
            console.error(e);
        }
      }

      getData();
  }, [building_id])

  return (
    <>
      <Toaster />
      <h1>Edit Building</h1>

      <form onSubmit={handleSubmit(processData)}>
        <input type="hidden" name="method" value="PUT"/>
        {building.map(b => 
        <div key={uuid()}>
             <section>
                <label>Building Name:</label>
                <input type="text" {...register("building_name", {required: true})} defaultValue={b.building_name} />
                {errors.code && <span>This field is required</span>}
            </section>
        </div>
            )}
        <button type="submit">Save</button>
      </form>
    </>
  );
}

export default EditBuilding;
