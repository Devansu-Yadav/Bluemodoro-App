import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlay, faPause, faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useTaskData } from "common/context";
import "./Pomodoro.css";

const Pomodoro = ({ taskId }: { taskId: string }) => {
    const { getTaskById } = useTaskData();
    const taskData = getTaskById(taskId);

    const [key, setKey] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const onTimeComplete = ({ remainingTime }: { remainingTime: number }) => {
        if(remainingTime === 0) {
            return <div className="timer-complete">Time's UP!!</div>;
        } else {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;

            return <div className="timer-value">{`${minutes}:${seconds}`}</div>;
        }
    }

    return (
        <main className="main-container">
            { !taskData && <div className={`task-not-found-container centered-flex-col-container`}>
                <h3 className="task-not-found-heading"> Task Not Found :(</h3>
                <img className="task-not-found-img" src="/assets/images/page-not-found.svg" alt="404 Task Not Found" />
                <Link to="/tasks"><button className="btn btn-outline-default rounded-med">{"<- Back To Tasks"}</button></Link>
            </div> }

            { taskData && <div className="pomodoro-task-section rounded-lg flex-col-container">
                <section>
                    <div className="timer-container">
                        <div className="return-task-page-container">
                            <Link to="/tasks">
                                <button className="btn return-to-task-page-btn btn-icon-primary rounded-med space-S">
                                    <FontAwesomeIcon icon={faArrowLeft} className="control-icons" />
                                    RETURN TO TASK PAGE
                                </button>
                            </Link>
                        </div>
                        <div className="countdown-timer centered-flex-col-container">
                            <CountdownCircleTimer 
                                key={key}
                                isPlaying={isPlaying}
                                size={250}
                                duration={taskData.focusDuration * 60}
                                initialRemainingTime={taskData.focusDuration * 60}
                                colors='#162F5A'
                                onComplete={() => ({ shouldRepeat: false, delay: 1000 })} >
                                    {onTimeComplete}
                            </CountdownCircleTimer>
                        </div>

                        <div className="timer-controls">
                            <button className="btn timer-control-btn start-btn btn-icon-primary rounded-med space-S" onClick={() => setIsPlaying(true)}>
                                <FontAwesomeIcon icon={faPlay} className="control-icons"/>
                                START
                            </button>
                            <button className="btn timer-control-btn stop-btn btn-icon-primary rounded-med space-S" onClick={() => setIsPlaying(false)}>
                                <FontAwesomeIcon icon={faPause} className="control-icons" />
                                STOP
                            </button>
                            <button className="btn timer-control-btn restart-btn btn-icon-primary rounded-med space-S" onClick={() => setKey((prevKey) => prevKey + 1)}>
                                <FontAwesomeIcon icon={faArrowRotateRight} className="control-icons" />
                                RESTART
                            </button>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="task-details-container">
                        <h1 className="heading-1 task-details-heading">{taskData.taskName}</h1>
                        <div className="task-description">{taskData.taskDescription}</div>
                    </div>
                </section>
             </div> }
        </main>
    );
}

export { Pomodoro };