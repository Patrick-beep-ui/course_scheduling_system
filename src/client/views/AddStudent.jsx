import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function AddStudent() {
    const {register, handleSubmit, formState: { errors}} = useForm({model: "onChange"});
    const { major_id } = useParams();
    const navigate = useNavigate();

    const processData = async (formData) => {
        try {
            const request = await fetch(`/api/students/${major_id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            const {students} = await request.json();
            navigate(`/students/${major_id}`)
            console.log(students);
        } 
        catch (err) {
            console.error(err);
        }
    }

    // const handleFileUpload = async (event) => {
    //     const file = event.target.files[0];
    //     const formData = new FormData();
    //     formData.append('excelFile', file);

    //     try {
    //         const response = await fetch('/api/upload-excel', {
    //             method: 'POST',
    //             body: formData
    //         });

    //         if (response.ok) {
    //             processData(formData);
    //             console.log(formData);
    //         } else {
    //             throw new Error('Failed to upload Excel file');
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // }

    return(
        <>
        <h1>Add Student</h1>

        <section className="mt-4">
        <form onSubmit={handleSubmit(processData)} className="row g-4">
            <section className="form-group">
                <label className="form-label">Student First Name:</label>
                <input type="text" {...register("first_name", {required: true})} className="form-control"/>
                {errors.code && <span>This field is required</span>}
            </section>
            <section className="col-12">
                <label className="form-label">Student Last Name:</label>
                <input type="text" {...register("last_name", {required: true})}/>
                {errors.code && <span>This field is required</span>}
            </section>
            <section>
                <input type="hidden" value={major_id}{...register("major", {required: true})}/>
                {errors.code && <span>This field is required</span>}
            </section>
            <section>
                <label className="form-label">Student ID:</label>
                <input type="number" {...register("student_id", {required: true})}/>
                {errors.code && <span>This field is required</span>}
            </section>
            <section className="col-12">
            <button type="submit">Submit</button>
            </section>
        </form>
        </section>

        {/*
        <section className="form-group">
                        <label className="form-label">Or Upload Excel File:</label>
                        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="form-control" />
                    </section>
        */}
        </>
    )
}

export default AddStudent