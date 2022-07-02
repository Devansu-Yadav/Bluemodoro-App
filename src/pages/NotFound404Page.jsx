import { useEffect } from "react";
import { Link } from "react-router-dom";
import { NavBar } from "components";
import "styles/NotFound404Page.css";

const NotFound404Page = () => {
    // Updating title on rendering 404 Page comp
    useEffect(() => {
        document.title = "Bluemodoro - 404 Not Found";
    }, []);

    return (
        <div>
            <NavBar />
            <div className={`page-not-found-container centered-flex-col-container`}>
                <h3 className="page-not-found-heading">404 Page Not Found :(</h3>
                <img className="page-not-found-img" src="/assets/images/page-not-found.svg" alt="404 Page Not Found" />
                <Link to="/"><button className="btn btn-outline-default rounded-med">{"<- Back To Home Page"}</button></Link>
            </div>
        </div>
    );
}

export { NotFound404Page };