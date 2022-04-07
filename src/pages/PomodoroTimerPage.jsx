import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";
import { Pomodoro } from "../components/Pomodoro/Pomodoro";
import "../styles/PomodoroTimerPage.css";

const PomodoroTimerPage = () => {
    // Updating title on rendering Pomodoro Timer Page comp
    useEffect(() => {
        document.title = "Bluemodoro - Pomodoro Timer";
    }, []);

    const taskId = useParams();

    return (
        <div>
            <NavBar />
            <Pomodoro taskId={taskId.taskId}/>
        </div>
    );
}

export { PomodoroTimerPage };