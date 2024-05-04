import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";
import { Toaster, toast } from 'sonner';

function Term() {
    const [term, setTerm] = useState([]);

    useEffect(() => {
        const getTerms = async () => {
            try {
                const request = await axios("/api/terms");
                const {data} = request
                console.log(data.terms);
                setTerm(data.terms)
            } 
            catch(e) {
                console.error(e);
            }
        }

        getTerms();
    }, [])

    const deleteTerm = async (event) => {
        const clickedElement = event.currentTarget
        const term_id = clickedElement.getAttribute('value');
        console.log(term_id);

        const url = `/api/terms/${term_id}`;
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
                    <th scope="col">Name</th>
                    <th scope="col">Year</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {term.map(t =>
                <tr key={uuid()}>
                    <td>{t.id}</td>
                    <td>{t.term_name}</td>
                    <td>{t.term_year}</td>
                    <td>{t.start_date}</td>
                    <td>{t.end_date}</td>
                    <td><Link to={`/terms/edit/${t.id}`}><i className='bx bx-pencil edit'></i></Link></td>
                    <td name='major_id' value={t.id} onClick={(event) => deleteTerm(event)}><i className='bx bx-trash delete'></i></td>
                </tr>    
                    )}
            </tbody>
        </table>
        <Link to={`/terms/add`} className="btn btn-primary">Add Term</Link>
    </section>
        </>
    )
}

export default Term;