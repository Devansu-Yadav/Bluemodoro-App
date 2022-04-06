import { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar/NavBar";
import { LandingPageContent } from "../components/LandingPageContent/LandingPageContent";
import "../styles/LandingPage.css";

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