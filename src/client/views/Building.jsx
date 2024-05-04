import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";
import { Toaster, toast } from 'sonner';

function Building() {
    const [building, setBuilding] = useState([]);

    useEffect(() => {
        const getTerms = async () => {
            try {
                const request = await axios("/api/buildings");
                const {data} = request
                console.log(data.buildings);
                setBuilding(data.buildings)
            } 
            catch(e) {
                console.error(e);
            }
        }

        getTerms();
    }, [])

    const deleteBuilding = async (event) => {
        const clickedElement = event.currentTarget
        const building_id = clickedElement.getAttribute('value');
        console.log(building_id);

        const url = `/api/buildings/${building_id}`;
        axios.delete(url);

        const request = await axios(`/api/terms`);
        setTerm(request.data.terms);
        toast('Term Deleted Successfully')
    }

    return(
        <>
         <Toaster />
        <h1>Terms</h1>
        <Link to={`/`}>Go Back</Link>
        <section className="mt-4">

        <table className="table table-striped">
            <thead className="table-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Building Name</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {building.map(b =>
                <tr key={uuid()}>
                    <td>{b.id}</td>
                    <td>{b.building_name}</td>
                    <td><Link to={`/rooms/${b.id}`} className="btn btn-primary">Rooms</Link></td>
                    <td><Link to={`/buildings/edit/${b.id}`}><i className='bx bx-pencil edit'></i></Link></td>
                    <td name='major_id' value={b.id} onClick={(event) => deleteBuilding(event)}><i className='bx bx-trash delete'></i></td>
                </tr>    
                    )}
            </tbody>
        </table>
        <Link to={`/buildings/add`} className="btn btn-primary">Add Building</Link>
    </section>
        </>
    )
}

export default Building;