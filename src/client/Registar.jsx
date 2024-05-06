import { useState, useEffect } from "react";
import axios from "axios";
import TermComponent from "./components/TermComponent";
import "./App.css";
import { Toaster, toast } from 'sonner';

function Registar() {
    const [terms, setTerms] = useState([]);
    const [selectedTermId, setSelectedTermId] = useState(null);

    useEffect(() => {
        const getTerms = async () => {
            try {
                const response = await axios.get("/api/terms");
                setTerms(response.data.terms);
            } catch (error) {
                console.error("Error fetching terms:", error);
                toast.error('Failed to fetch terms');
            }
        };

        getTerms();
    }, []);

    const handleTermChange = (event) => {
        setSelectedTermId(event.target.value);
    };

    return(
        <>
            <h1>Registar Dashboard</h1>
            <hr/>
            <section className="mt-4">
                <select defaultValue={6} onChange={handleTermChange}>
                    {terms.map(term => 
                        <option value={term.id} key={term.id}>{term.term_name} {term.term_year}</option>
                    )}
                </select>
            </section>
            
            <section className="term-component">
                {selectedTermId && <TermComponent term_id={selectedTermId} />}
            </section>
        </>
    )
}

export default Registar;
