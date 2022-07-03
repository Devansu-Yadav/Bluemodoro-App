import axios from "axios";
import { Task } from "common/data";

const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    } else if(axios.isAxiosError(error)) {
        return error.response?.data?.errors[0] as string;
    }
    return String(error);
}

const getTaskData = async (): Promise<Task[] | undefined> => {
    try {
        const response = await axios.get("/api/tasks");
        if(response.status === 200) {
            return response.data.tasks;
        }
    } catch(err) {
        console.log("getTaskData: Error in fetching Tasks", getErrorMessage(err));
    }
}

const createTask = async (task: Task): Promise<Task[] | undefined> => {
    try {
        const response = await axios.post("/api/tasks", task);
        if(response.status === 201) {
            return response.data.tasks;
        } 
    } catch (error) {
        console.log("createTask : Error in creating Task", getErrorMessage(error));
    }
}

const deleteTask = async (taskId: string): Promise<Task[] | undefined> => {
    try {
        const response = await axios.delete(`/api/tasks/${taskId}`);
        if(response.status === 200) {
            return response.data.tasks;
        }
    } catch(error) {
        console.log("deleteTask : Error in deleting task", getErrorMessage(error));
    }
}

const updateTask = async (task: Task): Promise<Task[] | undefined> => {
    try {
        const response = await axios.post(`/api/tasks/${task._id}`, task);
        if(response.status === 201) {
            return response.data.tasks;
        }
    } catch(error) {
        console.log("updateTask : Error in updating task", getErrorMessage(error));
    }
}

export { getTaskData, createTask, deleteTask, updateTask };
