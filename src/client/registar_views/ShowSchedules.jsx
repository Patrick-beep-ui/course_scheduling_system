import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { Link, useParams } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import ShowScheduleComponent from "../components/ShowSchedulesComponent";

function ShowSchedules() {
    const [schedule, setSchedule] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { term_id } = useParams();

    useEffect(() => {
        const getSchedule = async () => {
            try {
                const request = await axios.get(`/api/show/schedules`)
                const { data } = request
                console.log(data.schedules)
                setSchedule(data.schedules)
            }
            catch (e) {
                console.error(e)
            }
        }

        getSchedule()
    }, [])

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    }

    const filteredSchedule = schedule.filter(course => {
        return Object.keys(course).some(key => {
            // Check if the property exists and if its value contains the search query
            return course[key] && course[key].toString().toLowerCase().includes(searchQuery.toLowerCase());
        });
    });
    
    
    

    return (
        <>
            <h1>See Schedules</h1>
            <input
                type="text"
                placeholder="Search by student info"
                value={searchQuery}
                onChange={handleSearch}
            />
            <section className="mt-4">
                {filteredSchedule.map(s =>
                    <ShowScheduleComponent
                        key={uuid()}
                        term_id={term_id}
                        student_id={s.s_id}
                        student_name={s.student_name}
                        student_ku_id={s.student_id}
                        credits={s.total_credits} />
                )}
            </section>
        </>
    )
}

export default ShowSchedules;
