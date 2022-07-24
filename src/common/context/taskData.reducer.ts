import {
    SAVE_TASK_DATA,
    CREATE_TASK,
    DELETE_TASK,
    UPDATE_TASK
} from "common/constants";
import { TaskState, TaskAction } from "common/data";
import { initialTaskData } from "./TaskDataContext";

const taskDataReducer = (state: TaskState = initialTaskData, action: TaskAction) => {
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
};

export { taskDataReducer };
