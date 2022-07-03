import { useState, useContext, createContext } from "react";
import { Task } from "common/data";
import { ModalToggle, TaskModalCtxt } from "./taskContext.types";

const TaskModalContext = createContext<TaskModalCtxt>({ 
    modalToggle: { displayModal: false, type: "" }, 
    setModalToggle: () => {},
    initialTaskModalData: {
        _id: "",
        taskName: "",
        taskDescription: "",
        focusDuration: 15,
        breakDuration: 15
    },
    taskModalData: {
        _id: "",
        taskName: "",
        taskDescription: "",
        focusDuration: 15,
        breakDuration: 15
    },
    setTaskModalData: () => {}
});

const useTaskModal = () => useContext(TaskModalContext);

const TaskModalToggle = ({ children }: { children: React.ReactNode }) => {
    const initialModalToggle: ModalToggle = { displayModal: false, type: "" };

    const [ modalToggle, setModalToggle ] = useState(initialModalToggle);

    const initialTaskModalData: Task = {
        _id: "",
        taskName: "",
        taskDescription: "",
        focusDuration: 15,
        breakDuration: 15
    }

    const [taskModalData, setTaskModalData] = useState(initialTaskModalData);

    return (
        <TaskModalContext.Provider value={{ modalToggle, setModalToggle, initialTaskModalData, taskModalData, setTaskModalData }}>
            { children }
        </TaskModalContext.Provider>
    );
}

export { useTaskModal, TaskModalToggle };