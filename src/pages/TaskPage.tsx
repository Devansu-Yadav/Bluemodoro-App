import { useEffect } from "react";
import { NavBar, Task } from "components";
import "styles/TaskPage.css";

const TaskPage = () => {
    // Updating title on rendering Task Page comp
    useEffect(() => {
        document.title = "Bluemodoro - Tasks";
    }, []);

    return (
        <div>
            <NavBar />
            <Task />
        </div>
    );
}

export { TaskPage };