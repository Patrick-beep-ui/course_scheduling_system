import { useState, useEffect } from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";
import "./App.css";
import { Link } from "react-router-dom";

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

  return (
    <>
    <h1>This is the homePage</h1>

    <table>
      <thead>
        <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Degree</th>
        <th>Credits</th>
        </tr>
      </thead>
      <tbody>
         {majors.map(major => 
         <tr key={uuid()}>
          <td>{major.id}</td>
          <td>{major.major_name}</td>
          <td>{major.degree}</td>
          <td>{major.credits}</td>
          <td><Link to={`/courses/${major.id}`}>Courses</Link></td>
          <td><Link to={`/students/${major.id}`}>Students</Link></td>
         </tr>
          )}
        </tbody>
    </table>

    <Link to={'/major/add'}>Add Major</Link>
    </>
  )
}

export default App;
