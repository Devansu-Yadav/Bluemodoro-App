import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavBar, Pomodoro } from "components";
import "styles/PomodoroTimerPage.css";

const PomodoroTimerPage = () => {
    // Updating title on rendering Pomodoro Timer Page comp
    useEffect(() => {
        document.title = "Bluemodoro - Pomodoro Timer";
    }, []);

    const { taskId } = useParams();

    return (
        <div>
            <NavBar />
            <Pomodoro taskId={taskId ?? "" } />
        </div>
    );
}

export { PomodoroTimerPage };