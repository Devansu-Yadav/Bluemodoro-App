import { useReducer, useEffect, useContext, createContext } from "react";
import {
    SAVE_TASK_DATA,
    CREATE_TASK,
    DELETE_TASK,
    UPDATE_TASK
} from "common/constants";
import { getTaskData } from "common/helpers";
import { Task, TaskState, TaskAction } from "common/data";
import { TaskContext } from "./taskContext.types";

const TaskDataContext = createContext<TaskContext>({ taskData: [], taskDataDispatch: () => {}, getTaskById: (taskId: string) => undefined });

const useTaskData = () => useContext(TaskDataContext);

const TaskDataProvider = ({ children }: { children: React.ReactNode }) => {
    const initialTaskData: TaskState = [];

    const taskDataReducer = (state = initialTaskData, action: TaskAction) => {
        switch(action.type) {
            case SAVE_TASK_DATA:
                return [...state, ...action.payload];
            case CREATE_TASK:
                return [...state, action.payload];
            case DELETE_TASK:
                return [...state.filter(task => task._id !== action.payload._id)];
            case UPDATE_TASK:
                return [...state.reduce((taskData, currTask) => currTask._id === action.payload._id ? [...taskData, {...action.payload }]: [...taskData, currTask], initialTaskData)];
            default:
                return [...state];
        }
    }

    const [taskData, taskDataDispatch] = useReducer(taskDataReducer, initialTaskData);
    
    const getTaskById = (taskId: string): Task | undefined => {
        return taskData.find(task => task._id === taskId);
    }

    // Fetch Task Data initially
    useEffect(() => {
        const saveTaskData = async () => {
            const taskData = await getTaskData();

            if(taskData) {
                taskDataDispatch({ type: SAVE_TASK_DATA, payload: taskData});
            }
        }
        saveTaskData();
    }, []);

    return (
        <TaskDataContext.Provider value={{ taskData, taskDataDispatch, getTaskById }}>
            { children }
        </TaskDataContext.Provider>
    );
}

export { useTaskData, TaskDataProvider };