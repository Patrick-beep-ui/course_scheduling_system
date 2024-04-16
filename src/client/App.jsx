import { useState, useEffect } from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";
import "./App.css";
import { Link } from "react-router-dom";
import { Toaster, toast } from 'sonner'

function App() {
  const [majors, setMajors] = useState([]);

  useEffect(() => {
    const getMajors = async () => {
      const request = await axios("/api/majors")
      const {data} = request;
      setMajors(data.majors);
      console.log(data.majors);

    };
    getMajors();
  }, [])

  const deleteMajor = async (event, id) => {
    const clickedElement = event.currentTarget;
    const major_id = clickedElement.getAttribute('value');
    console.log(major_id);

    const url =  `/api/majors/${major_id}`
    axios.delete(url)

    const request = await axios("/api/majors");
    setMajors(request.majors);
    toast('Major deleted successfully');
  }

  return (
    <>
      <Toaster />
    <h1>Majors</h1>
    <section className="mt-4">    

    <table className="table table-striped">
      <thead className="table-dark">
        <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Degree</th>
        <th scope="col">Credits</th>
        <th colSpan={4}></th>
        </tr>
      </thead>
      <tbody>
         {majors.map(major => 
         <tr key={uuid()}>
          <td>{major.id}</td>
          <td>{major.major_name}</td>
          <td>{major.degree}</td>
          <td>{major.credits}</td>
          <td><Link to={`/courses/${major.id}`} className="btn btn-primary">Courses</Link></td>
          <td><Link to={`/students/${major.id}`} className="btn btn-secondary">Students</Link></td>
          <td><i className='bx bx-pencil edit'></i></td>
          <td name='major_id' value={major.id} onClick={(event) => deleteMajor(event, major.id)}><i className='bx bx-trash delete'></i></td>
         </tr>
          )}
        </tbody>
    </table>
    {/*
    <button onClick={() => toast('My first toast')}>
        Give me a toast
      </button>
    */ }

    <Link to={'/major/add'} className="btn btn-primary">Add Major</Link>
    </section>
    </>

  )
}

export default App;
