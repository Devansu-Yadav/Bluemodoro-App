import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { TaskList } from "./TaskList";
import { TaskModal } from "../TaskModal/TaskModal";
import { useTaskModal } from "../../common/context/TaskModalContext";
import { useTaskData } from "../../common/context/TaskDataContext";
import "./Task.css";

const Task = () => {
    const { setModalToggle, initialTaskModalData, setTaskModalData } = useTaskModal();
    const { taskData } = useTaskData();

    return (
        <main className="main-container">
            <div className="task-container space-XL flex-col-container">
                <h1 className="heading-1 task-page-welcome-heading">Welcome back, User!</h1>
                { taskData.length ? <h2 className="heading-2 task-count-heading">Pending Tasks left: { taskData.length }</h2> 
                : <h2 className="heading-2 task-count-heading">No tasks left! Great work!!</h2> }

                <TaskModal />

                <div className="tasks-section rounded-lg flex-col-container">
                    <div className="tasks-section-heading flex-row-container">
                        <h2 className="task-section-title">Tasks To Do</h2>
                        <button className="btn-icon btn-icon-primary add-task-btn rounded space-S" 
                        onClick={() => {
                            setModalToggle(modal => ({...modal, displayModal: true, type: "add" }));
                            setTaskModalData({...initialTaskModalData });
                        }}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>

                    {/* Task List */}
                    <TaskList />
                </div>
            </div>
        </main>
    );
}

export { Task };