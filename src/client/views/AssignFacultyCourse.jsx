import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { Toaster, toast } from "sonner";

function AssignFacultyCourse() {
  const { register, handleSubmit, formState: { errors } } = useForm({ model: "onChange" });
  const [faculty, setFaculty] = useState([]);
  const [course, setCourse] = useState([]);
  const [major, setMajor] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const { faculty_id } = useParams();

  const processData = async (formData) => {
    try {
      const request = await fetch(`/api/faculty/course/${faculty_id}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      const { tutors } = await request.json();
      console.log(tutors);

      toast.promise(promise(), {
        loading: 'Adding Course...',
        success: (response) => {
            navigate(`/faculty/courses/${faculty_id}`);
          return `${response.name} Course has been added`;
        },
        error: (error) => `Error: ${error}`,
      });
    }
    catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [facultyResponse, availabilityResponse, classesResponse, majorsResponse] = await Promise.all([
          axios.get(`/api/faculty/${faculty_id}`),
          axios.get(`/api/faculty/availability/${faculty_id}`),
          axios.get(`/api/courses/${selectedMajor || 0}`), // Fetch courses based on selected major
          axios.get("/api/majors")
        ]);
        const facultyData = facultyResponse.data.facultyID;
        const availabilityData = availabilityResponse.data.availability;
        const classesData = classesResponse.data.courses;
        const majorsData = majorsResponse.data.majors;

        console.log("Faculty:", facultyData);
        console.log("Availability:", availabilityData)
        console.log("Courses:", classesData);
        console.log("Majors:", majorsData);

        setCourse(classesData);
        setFaculty(facultyData);
        setMajor(majorsData);
        setAvailability(availabilityData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedMajor]); //This will run the useEffect when selectedMajor changes

  function handleCheckboxChange(event) {
    const isChecked = event.target.checked;
    const label = event.target.nextElementSibling;

    if (isChecked) {
      label.classList.add('highlighted');

    } else {
      label.classList.remove('highlighted');
    }
  }

  function handleSelectChange(event) {
    const clickedElement = event.currentTarget
    const option = clickedElement.getAttribute('value');
    console.log(option)
    setSelectedMajor(option);
  }

  return (
    <>
    <Toaster/>
      <h1>Assign Courses</h1>


      {faculty.map(f =>
        <div>
          <h2>{f.last_name}, {f.first_name}</h2>
          <p>{f.professor_degree}</p>
        </div>
      )}

      <section className="mt-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Days</th>
              <th scope="col">Start Time</th>
              <th scope="col">End Time</th>
            </tr>
          </thead>
          <tbody>
            {availability.map(a =>
              <tr key={uuid()}>
                <td>{a.days}</td>
                <td>{a.start_time}</td>
                <td>{a.end_time}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <h4>Select Major</h4>
      <section>
        {major.map(m =>
          <span key={m.id} value={m.id} className="btn btn-primary major-btns" onClick={handleSelectChange}>{m.major_name}</span>)}
      </section>

    <section className="mt-4 courses_form">
      <form onSubmit={handleSubmit(processData)}>
        <div className="courses">
        {course.map(classObj => (
          <div key={classObj.id}>
            <input type="checkbox" id={classObj.id} value={classObj.id} {...register("class-option", { required: true })} onChange={handleCheckboxChange} />
            <label htmlFor={classObj.id}>{classObj.course_name} - {classObj.code}</label>
          </div>
        ))}
        </div>
        <input type="submit" className="btn btn-success" value="Assign"/>
        </form>
    </section>
    </>
  )
}

export default AssignFacultyCourse;
