import { useState, useEffect } from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";
import { Link, useParams } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import ShowScheduleComponent from "../components/ShowSchedulesComponent";

function ShowSchedules() {
    const [schedule, setSchedule] = useState([]);
    const {term_id} = useParams();

    useEffect(() => {
        const getSchedule = async () => {
            try {
                const request = await axios.get(`/api/show/schedules`)
                const {data} = request
                console.log(data.schedules)
                setSchedule(data.schedules)
            }
            catch(e) {
                console.error(e)
            }
        }

        getSchedule()
    }, [])

    return(
        <><h1>See Schedules</h1>
        <section className="mt-4">
            {schedule.map(s => 
                <ShowScheduleComponent 
                term_id={term_id}
                student_id={s.student_id}/>
                )}
        </section>
        </>


    )
}

export default ShowSchedules