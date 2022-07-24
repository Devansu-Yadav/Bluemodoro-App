import { useEffect } from "react";
import { NavBar, LandingPageContent } from "components";
import "styles/LandingPage.css";

const LandingPage = () => {
    // Updating title on rendering Landing Page comp
    useEffect(() => {
        document.title = "Bluemodoro - Home";
    }, []);

    return (
        <div>
            <NavBar />
            <LandingPageContent />
        </div>
    );
}

export { LandingPage };