import { useState, useEffect } from "react";
import { useTaskModal } from "../../common/context/TaskModalContext";
import { useTaskData } from "../../common/context/TaskDataContext";
import { CREATE_TASK, UPDATE_TASK, MIN_TASK_NAME_LENGTH, MIN_TASK_DESCRIPTION_LENGTH } from "../../common/constants";
import { createTask, updateTask } from "../../common/helpers/TaskService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./TaskModal.css";

const TaskModal = () => {
    const { modalToggle, setModalToggle, taskModalData, setTaskModalData } = useTaskModal();
    const { taskDataDispatch } = useTaskData();
    const [taskPropertiesError, setTaskPropertiesError] = useState({ taskName: false, taskDescription: false });
    const taskNameLength = taskModalData.taskName.length;
    const taskDescriptionLength = taskModalData.taskDescription.length;

    const onSubmitAddTaskHandler = async (event) => {
        if(!taskPropertiesError.taskName && !taskPropertiesError.taskDescription) {
            event.preventDefault();
            const createTaskResponse = await createTask(taskModalData);
            console.log("Task Created - ", createTaskResponse);
            taskDataDispatch({ type: CREATE_TASK, payload: {...taskModalData, _id: createTaskResponse[createTaskResponse.length - 1]._id }});
            setModalToggle(modal => ({...modal, displayModal: false }));
        }
    }

    const onSubmitUpdateTaskHandler = async (event) => {
        if(!taskPropertiesError.taskName && !taskPropertiesError.taskDescription) {
            event.preventDefault();
            const updateTaskResponse = await updateTask(taskModalData);
            console.log("Task Updated - ", updateTaskResponse);
            taskDataDispatch({ type: UPDATE_TASK, payload: taskModalData });
            setModalToggle(modal => ({...modal, displayModal: false }));
        }
    }

    // Checking if there are any errors or not.
    useEffect(() => {
        setTaskPropertiesError(taskError => taskNameLength >= MIN_TASK_NAME_LENGTH ? {...taskError, taskName: false}: {...taskError, taskName: true});
        setTaskPropertiesError(taskError => taskDescriptionLength >= MIN_TASK_DESCRIPTION_LENGTH ? {...taskError, taskDescription: false}: {...taskError, taskDescription: true});
    }, [taskNameLength, taskDescriptionLength]);

    return (
        <div>
            <div className={`modal-overlay ${modalToggle.displayModal ? "display-modal-overlay": ""}`}></div>

            <div className={`modal ${ modalToggle.displayModal ? "display-modal": ""} centered-flex-col-container`}>
                <div className="modal-header">
                    <h2 className="heading-2">Task</h2>
                    <img className="btn-close" src="/assets/images/close-button.svg" alt="Close Button" onClick={() => setModalToggle(modal => ({...modal, displayModal: false }))}/>
                </div>

                <form className={`flex-col-container task-form`}>
                    <div className='form-item'>
                        <label className="form-input-label" htmlFor="task-name">Task Name*</label>
                        <input type="text" id="task-name" className={`form-input-field input-primary`} value={taskModalData.taskName} name='taskName' placeholder='Add Title' 
                        onChange={(event) => {
                            setTaskModalData(taskItem => ({...taskItem, taskName: event.target.value}));
                        }} required></input>
                    </div>
                    { taskPropertiesError.taskName && 
                        <div className='modal-error'>
                            <FontAwesomeIcon icon={faXmark} />
                            ({taskNameLength}/{ MIN_TASK_NAME_LENGTH })
                        </div>
                    }
                    {
                        !taskPropertiesError.taskName &&
                        <div className="modal-success">Great going!</div>
                    }

                    <div className='form-item'>
                        <label className="form-input-label" htmlFor="task-description">Task Description *</label>
                        <textarea id="task-description" className='form-text-area input-primary' value={taskModalData.taskDescription} name='taskDescription' rows="3" placeholder='Add Description' 
                        onChange={(event) => {
                            setTaskModalData(taskItem => ({...taskItem, taskDescription: event.target.value}));
                        }} required></textarea>
                    </div>
                    { taskPropertiesError.taskDescription && 
                        <div className='modal-error'>
                            <FontAwesomeIcon icon={faXmark} />
                            ({taskDescriptionLength}/{ MIN_TASK_DESCRIPTION_LENGTH })
                        </div>
                    }
                    {
                        !taskPropertiesError.taskDescription &&
                        <div className="modal-success">Great going!</div>
                    }

                    <div className='form-item'>
                        <label className="form-input-label" htmlFor="focus-duration">Focus Duration *</label>
                        <input type="range" min="15" max="90" step="15" list="tickmarks" id="focus-duration" className={`form-input-slider input-primary`} value={taskModalData.focusDuration.toString()} name='focusDuration' 
                        onChange={(event) => setTaskModalData(taskItem => ({...taskItem, focusDuration: parseInt(event.target.value) }))} required></input>
                        
                        <datalist className="datalist flex-row-container" id="tickmarks">
                            <option className="range-markers" value="15" label="15m"></option>
                            <option className="range-markers" value="30" label="30m"></option>
                            <option className="range-markers" value="45" label="45m"></option>
                            <option className="range-markers" value="60" label="60m"></option>
                            <option className="range-markers" value="75" label="75m"></option>
                            <option className="range-markers" value="90" label="90m"></option>
                        </datalist>
                    </div>

                    <div className='form-item'>
                        <label className="form-input-label" htmlFor="break-duration">Break Duration *</label>
                        <input type="range" min="15" max="90" step="15" list="tickmarks" id="break-duration" className={`form-input-slider input-primary`} value={taskModalData.breakDuration.toString()} name='breakDuration' 
                        onChange={(event) => setTaskModalData(taskItem => ({...taskItem, breakDuration: parseInt(event.target.value) }))} required></input>
                        
                        <datalist className="datalist flex-row-container" id="tickmarks">
                            <option className="range-markers" value="15" label="15m"></option>
                            <option className="range-markers" value="30" label="30m"></option>
                            <option className="range-markers" value="45" label="45m"></option>
                            <option className="range-markers" value="60" label="60m"></option>
                            <option className="range-markers" value="75" label="75m"></option>
                            <option className="range-markers" value="90" label="90m"></option>
                        </datalist>
                    </div>

                    <div className='form-actions flex-row-container'>
                        <input type="button" value="Cancel" className='btn btn-outline-primary rounded-med space-S' onClick={() => setModalToggle(modal => ({...modal, displayModal: false }))}></input>
                        
                        { modalToggle.type === "add" ? <input type="submit" value="ADD TASK" className={`btn btn-outline-primary ${taskPropertiesError.taskName || taskPropertiesError.taskDescription ? "btn-disable": ""} rounded-med space-S`} onClick={async (event) => {
                            await onSubmitAddTaskHandler(event);
                        }}></input>
                         : <input type="submit" value="UPDATE TASK" className={`btn btn-outline-primary ${taskPropertiesError.taskName || taskPropertiesError.taskDescription ? "btn-disable": ""} rounded-med space-S`} onClick={async(event) => {
                            await onSubmitUpdateTaskHandler(event);
                         }}></input>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

export { TaskModal };