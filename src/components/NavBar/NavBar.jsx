import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass, faMoon } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar flex-row-container shadow-md">
            <Link id="nav-logo" to="/">
                <p className="logo-txt">Bluemodoro</p>
                <FontAwesomeIcon icon={faHourglass} />
            </Link>

            <div className="navigation flex-row-container">
                <ul className="nav-items centered-flex-row-container">
                    <li className="github-link">
                        <Link to="https://github.com/Devansu-Yadav/Bluemodoro-App">
                            <button className="btn-icon github-btn btn-icon-default rounded-med space-S">
                                <FontAwesomeIcon icon={faGithub} />
                                GITHUB
                            </button>
                        </Link>
                    </li>

                    <Link className="github-btn-mobile" to="https://github.com/Devansu-Yadav/Bluemodoro-App">
                        <FontAwesomeIcon icon={faGithub} />
                    </Link>
                    
                    <li className="toggle-modes">
                        <FontAwesomeIcon icon={faMoon} />
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export { NavBar };