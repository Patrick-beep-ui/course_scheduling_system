import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import {useState, useEffect} from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";

function EditRoom() {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
    const [room, setRoom] = useState([]);
    const navigate = useNavigate();
    const {building_id} = useParams();
    const {room_id} = useParams();

    console.log(room_id);

    const processData = async (formData) => {
        try {
          const request = await fetch(`/api/rooms/${building_id}/${room_id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
          });
    
          const { rooms } = await request.json(); 
          navigate(`/rooms/${building_id}`)
          console.log(rooms)
    
        } catch (error) {
          console.error(error);
          toast.error('An error occurred');
        }
      };

      useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`/api/rooms/${building_id}/${room_id}`)
                const {data} = response
                console.log(data.roomID)
                setRoom(data.roomID)
            }
            catch(e) {
                console.error(e)
            }
        }
        getData();
      }, [room_id])

      return(
        <>
            <Toaster />
            <h1>Edit Room</h1>
            <form onSubmit={handleSubmit(processData)}>
        <input type="hidden" name="method" value="PUT"/>
        {room.map(r => 
        <div key={uuid()}>
            <section>
                    <label>Room Name:</label>
                    <input type="text" {...register("room_name",{ required: true })} defaultValue={r.name}/>
                    {errors.code && <span>This field is required</span>}
                </section>
                <section>
                    <label>Room Capacity: </label>
                    <input type="number" {...register("capacity",{ required: true })} defaultValue={r.capacity} />
                    {errors.credits && <span>This field is required</span>}
                </section>
                <section>
                    <label>Components</label>
                    <textarea cols="30" rows="10" {...register("components", {required: true})} defaultValue={r.components} ></textarea>
                    {errors.credits && <span>This field is required</span>}
                </section>
        </div>
            )}
        <button type="submit">Save</button>
      </form>
        </>
      )
}

export default EditRoom