import { getTaskData, createTask, updateTask, deleteTask } from "common/helpers";
import axios from "axios";
import { Task } from "common/data";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("get Task service", () => {
    it("should return user's tasks", async () => {
        mockedAxios.get.mockResolvedValue({ status: 200, data: { tasks: [{
            _id: "1",
            taskName: "Add Unit tests",
            taskDescription: "Adding unit tests using jest",
            focusDuration: 45,
            breakDuration: 60 
        }]}});

        const tasks = await getTaskData();

        expect(tasks).toEqual([{
            _id: "1",
            taskName: "Add Unit tests",
            taskDescription: "Adding unit tests using jest",
            focusDuration: 45,
            breakDuration: 60 
        }]);
    });

    it("should return errorMessage when API call fails", async () => {
        mockedAxios.get.mockRejectedValue({ isAxiosError: true, response: { data: { errors: ["Couldn't fetch all tasks"] }}});
        mockedAxios.isAxiosError.mockImplementation((payload) => true);
        
        const tasks = await getTaskData();

        expect(tasks).toEqual({ errorMessage: "Couldn't fetch all tasks" });
        expect(axios.isAxiosError).toBeCalledTimes(2);
    });
});

describe("create Task service", () => {
    const newTask = {
        _id: "1",
        taskName: "Add Unit tests",
        taskDescription: "Adding unit tests using jest",
        focusDuration: 45,
        breakDuration: 60 
    };

    it("should create a task", async () => {
        mockedAxios.post.mockResolvedValue({ status: 201, data: { tasks: [{ ...newTask }]}});
        const tasks = await createTask(newTask);

        expect(tasks).toEqual([{
            ...newTask 
        }]);
    });

    it("should return errorMessage when API call fails", async () => {
        mockedAxios.post.mockRejectedValue({ isAxiosError: true, response: { data: { errors: ["Couldn't create a task"] }}});
        mockedAxios.isAxiosError.mockImplementation((payload) => true);
        
        const tasks = await createTask(newTask);

        expect(tasks).toEqual({ errorMessage: "Couldn't create a task" });
        expect(axios.isAxiosError).toBeCalledTimes(2);
    });
});

describe("update Task service", () => {
    const updatedTask = {
        _id: "1",
        taskName: "Add Unit tests",
        taskDescription: "Adding unit tests using jest",
        focusDuration: 45,
        breakDuration: 60 
    };

    it("should update task", async () => {
        mockedAxios.post.mockResolvedValue({ status: 201, data: { tasks: [{ ...updatedTask }]}});
        const tasks = await updateTask(updatedTask);

        expect(tasks).toEqual([{
            ...updatedTask 
        }]);
    });

    it("should return errorMessage when API call fails", async () => {
        mockedAxios.post.mockRejectedValue({ isAxiosError: true, response: { data: { errors: ["Couldn't update task"] }}});
        mockedAxios.isAxiosError.mockImplementation((payload) => true);
        
        const tasks = await updateTask(updatedTask);

        expect(tasks).toEqual({ errorMessage: "Couldn't update task" });
        expect(axios.isAxiosError).toBeCalledTimes(2);
    });
});

describe("delete Task service", () => {
    it("should delete a task", async () => {
        mockedAxios.delete.mockResolvedValue({ status: 200, data: { tasks: [] }});

        const tasks = await deleteTask("1");

        expect(tasks).toEqual([]);
    });

    it("should return errorMessage when API call fails", async () => {
        mockedAxios.delete.mockRejectedValue({ isAxiosError: true, response: { data: { errors: ["Couldn't delete task"] }}});
        mockedAxios.isAxiosError.mockImplementation((payload) => true);
        
        const tasks = await deleteTask("1");

        expect(tasks).toEqual({ errorMessage: "Couldn't delete task" });
        expect(axios.isAxiosError).toBeCalledTimes(2);
    });
});