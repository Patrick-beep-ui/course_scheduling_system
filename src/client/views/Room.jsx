import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {v4 as uuid} from "uuid";
import { Link } from "react-router-dom";

function Room() {
    const [room, setRoom] = useState([]);
    const {building_id} = useParams();

    useEffect(() => {
        const getRooms = async () => {
            try {
                const request = await axios(`/api/rooms/${building_id}`)
                const {data} = request;
                console.log(data.rooms);
                setRoom(data.rooms);
            }
            catch(e) {
                console.error(e);
            }
        }
        getRooms();
    }, [])

    const deleteRoom = async (roomId) => {
        try {
            const url = `/api/rooms/${building_id}/${roomId}`;
            await axios.delete(url);
    
            // Remove the deleted room from the room state
            setRoom(prevRooms => prevRooms.filter(r => r.id !== roomId));
        } catch (error) {
            console.error(error);
        }
    };
    

    return(
        <>
    <h1>Rooms</h1>

    <Link to={`/buildings`}>Go Back</Link>
    <section className="mt-4">
     <table className="table table-stripped">
      <thead className="table-dark">
        <tr>
        <th scope="col">ID</th>
        <th scope="col">Room Name</th>
        <th scope="col">Room Capacity</th>
        <th scope="col">Room Components</th>
        <th></th>
        <th></th>
        </tr>
      </thead>
      <tbody>
         {room.map(r => 
         <tr key={uuid()}>
          <td>{r.id}</td>
          <td>{r.name}</td>
          <td>{r.capacity}</td>
          <td>{r.components}</td>
          <td><Link to={`/rooms/edit/${building_id}/${r.id}`}><i className='bx bx-pencil edit'></i></Link></td>
          <td name='room_id' value={r.id} onClick={() => deleteRoom(r.id)}><i className='bx bx-trash delete'></i></td>
         </tr>
          )}
        </tbody>
    </table>

    <Link to={`/rooms/add/${building_id}`} className="btn btn-primary">Add Room</Link>
    </section>
        </>
    )
}

export default Room;