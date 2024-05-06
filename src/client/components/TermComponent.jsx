import { useState, useEffect } from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";
import { Link } from "react-router-dom";
import { Toaster, toast } from 'sonner';

export default function TermComponent(props) {
    const {term_id} = props;

    console.log(term_id);

    return(
        <>
        <h3>Term Component {term_id}</h3>

        <section className="registar-links">
        <Link to={`/registar/students/${term_id}`} className="btn btn-primary home_links">See Students</Link>
        <Link to={`/registar/roster/${term_id}`} className="btn btn-primary home_links">Add a Course</Link>
        </section>
        
        </>
        
    )
}
