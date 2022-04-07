import { useState, useContext, createContext } from "react";

const TaskModalContext = createContext({ 
    modalToggle: { displayModal: false, type: "" }, 
    setModalToggle: () => {},
    initialTaskModalData: {
        _id: "",
        taskName: "",
        taskDescription: "",
        focusDuration: 15,
        breakDuration: 15
    },
    taskModalData: {},
    setTaskModalData: () => {}
});

const useTaskModal = () => useContext(TaskModalContext);

const TaskModalToggle = ({ children }) => {
    const [ modalToggle, setModalToggle ] = useState({ displayModal: false, type: "" });
    const initialTaskModalData = {
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