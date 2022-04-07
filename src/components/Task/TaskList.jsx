import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useTaskModal } from "../../common/context/TaskModalContext";
import { useTaskData } from "../../common/context/TaskDataContext";
import { deleteTask } from "../../common/helpers/TaskService";
import {
    DELETE_TASK
} from "../../common/constants";
import "./TaskList.css";

const TaskList = () => {
    const { setModalToggle, setTaskModalData } = useTaskModal();
    const { taskData, taskDataDispatch, getTaskById } = useTaskData();

    return (
        <ul className="task-list flex-col-container">
            { taskData.map(task => {
                return (
                    <li key={task._id} className="task-item rounded-med flex-row-container">
                        <Link to={`/pomodoro/${task._id}`} className="task-details">
                            <div className="flex-col-container">
                                <h3 className="task-heading">{task.taskName}</h3>
                                <p className="task-properties">Focus duration: {task.focusDuration}, Break Duration: {task.breakDuration}</p>
                            </div>
                        </Link>
                        <div className="task-operations centered-flex-row-container">
                            <FontAwesomeIcon icon={faPenToSquare} className="edit-task-btn" onClick={() => { 
                                setModalToggle(modal => ({...modal, displayModal: true, type: "update" }));
                                const taskData = getTaskById(task._id);
                                setTaskModalData({...taskData });
                            }} />
                            <FontAwesomeIcon icon={faTrash} className="delete-task-btn" onClick={async() => {
                                taskDataDispatch({ type: DELETE_TASK, payload: task });
                                const deleteTaskResponse = await deleteTask(task._id);
                                console.log("Task Deleted - ", deleteTaskResponse);
                            }}/>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}

export { TaskList };