import {Link} from "react-router-dom";

function Faculty() {
    return(
        <>
        <h1>Faculty</h1>

        <Link to={"/faculty/add"}>Add Professor</Link>
        </>
    );
}

export default Faculty;