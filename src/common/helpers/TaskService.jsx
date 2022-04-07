import axios from "axios";

const getTaskData = async () => {
    try {
        const response = await axios.get("/api/tasks");
        if(response.status === 200) {
            return response.data.tasks;
        }
    } catch(err) {
        console.log("getTaskData: Error in fetching Tasks", err.response.data.errors[0]);
    }
}

const createTask = async (task) => {
    try {
        const response = await axios.post("/api/tasks", task);
        if(response.status === 201) {
            return response.data.tasks;
        } 
    } catch (error) {
        console.log("createTask : Error in creating Task", error.response.data.errors[0]);
    }
}

const deleteTask = async (taskId) => {
    try {
        const response = await axios.delete(`/api/tasks/${taskId}`);
        if(response.status === 200) {
            return response.data.tasks;
        }
    } catch(error) {
        console.log("deleteTask : Error in deleting task", error.response.data.errors[0]);
    }
}

const updateTask = async (task) => {
    try {
        const response = await axios.post(`/api/tasks/${task._id}`, task);
        if(response.status === 201) {
            return response.data.tasks;
        }
    } catch(error) {
        console.log("updateTask : Error in updating task", error.response.data.errors[0]);
    }
}

export { getTaskData, createTask, deleteTask, updateTask };
