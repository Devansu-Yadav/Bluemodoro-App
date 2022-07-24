import { useReducer, useEffect, useContext, createContext } from "react";
import { SAVE_TASK_DATA } from "common/constants";
import { getTaskData } from "common/helpers";
import { taskDataReducer } from "./taskData.reducer";
import { Task, TaskState } from "common/data";
import { TaskContext } from "./taskContext.types";

const TaskDataContext = createContext<TaskContext>({ taskData: [], taskDataDispatch: () => {}, getTaskById: (taskId: string) => undefined });

const useTaskData = () => useContext(TaskDataContext);

const initialTaskData: TaskState = [];

const TaskDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [taskData, taskDataDispatch] = useReducer(taskDataReducer, initialTaskData);
    
    const getTaskById = (taskId: string): Task | undefined => {
        return taskData.find(task => task._id === taskId);
    }

    // Fetch Task Data initially
    useEffect(() => {
        const saveTaskData = async () => {
            const taskData = await getTaskData();

            if(taskData && !("errorMessage" in taskData)) {
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

export { initialTaskData };
export { useTaskData, TaskDataProvider };