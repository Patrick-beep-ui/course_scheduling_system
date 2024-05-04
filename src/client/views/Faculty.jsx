import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";

function Faculty() {
    const [faculty, setFaculty] = useState([]);

    useEffect(() => {
        const getFaculty = async () => {
            try {
                const request = await axios("/api/faculty")
                const {data} = request
                console.log(data.faculty)
                setFaculty(data.faculty)
            }
            catch (err) {
                console.error(err);
            }
        }

        getFaculty();
    }, [])

    const deleteFaculty = async (event) => {
        try {
            const faculty = event.currentTarget
            const faculty_id = faculty.getAttribute('value')
            console.log(faculty_id)

            const url = `/api/faculty/${faculty_id}`;
            axios.delete(url)

            const request = await axios("/api/faculty")
            setFaculty(request.data.faculty)
        }
        catch (err) {
            console.error(err);
        }
    }

    return(
    <>
    <h1>Faculty</h1>
    <Link to={`/`}>Go Home</Link>
    <section className="mt-4">
        <table className="table table-stripped">
            <thead className="table-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Degree</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {faculty.map(faculty => 
                <tr key={uuid()}>
                    <td>{faculty.id}</td>
                    <td>{faculty.professor_name}</td>
                    <td>{faculty.professor_degree}</td>
                    <td><Link to={`/faculty/courses/${faculty.id}`} className="btn btn-primary">Courses</Link></td>
                    <td><Link to={`/faculty/edit/${faculty.id}`}><i className='bx bx-pencil edit'></i></Link></td>
                    <td name='course_id' value={faculty.id} onClick={(event) => deleteFaculty(event)}><i className='bx bx-trash delete'></i></td>
                </tr>    
                )}
            </tbody>

        </table>

    </section>

        <Link to={"/faculty/add"}>Add Professor</Link>
        </>
    );
}

export default Faculty;