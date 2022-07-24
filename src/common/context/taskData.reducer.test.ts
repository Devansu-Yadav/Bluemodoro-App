import {
    SAVE_TASK_DATA,
    CREATE_TASK,
    DELETE_TASK,
    UPDATE_TASK
} from "common/constants";
import { initialTaskData } from "./TaskDataContext";
import { taskDataReducer } from "./taskData.reducer";
import { Task, TaskState, TaskAction } from "common/data";

describe("test Task actions", () => {
    // Following the AAA rule - Arrange Act Assert
    it("should save tasks created by the user", () => {
        const action: TaskAction = {
            type: SAVE_TASK_DATA,
            payload: [
                {
                    _id: "1",
                    taskName: "Add Unit tests",
                    taskDescription: "Adding unit tests using jest",
                    focusDuration: 45,
                    breakDuration: 30 
                },
                {
                    _id: "2",
                    taskName: "Task 2",
                    taskDescription: "Task 2 description",
                    focusDuration: 15,
                    breakDuration: 45
                }
            ]
        };

        const state: TaskState = taskDataReducer(initialTaskData, action);

        expect(state).toEqual([
            {
                _id: "1",
                taskName: "Add Unit tests",
                taskDescription: "Adding unit tests using jest",
                focusDuration: 45,
                breakDuration: 30 
            },
            {
                _id: "2",
                taskName: "Task 2",
                taskDescription: "Task 2 description",
                focusDuration: 15,
                breakDuration: 45
            }
        ]);
    });

    it("should add a new task to user's task data", () => {
        const initialTaskState: TaskState = [
            {
                _id: "1",
                taskName: "Add Unit tests",
                taskDescription: "Adding unit tests using jest",
                focusDuration: 45,
                breakDuration: 30 
            }
        ];
        
        const action: TaskAction = {
            type: CREATE_TASK,
            payload: {
                _id: "3",
                taskName: "New Task",
                taskDescription: "Some task description",
                focusDuration: 30,
                breakDuration: 30
            }
        };

        const state: TaskState = taskDataReducer(initialTaskState, action);

        expect(state).toEqual([
            ...initialTaskState,
            {
                _id: "3",
                taskName: "New Task",
                taskDescription: "Some task description",
                focusDuration: 30,
                breakDuration: 30
            }
        ]);
    });

    it("should delete a task from user's task data", () => {
        const initialTaskState: TaskState = [
            {
                _id: "1",
                taskName: "Add Unit tests",
                taskDescription: "Adding unit tests using jest",
                focusDuration: 45,
                breakDuration: 30 
            }
        ];
        
        const action: TaskAction = {
            type: DELETE_TASK,
            payload: {
                _id: "1",
                taskName: "Add Unit tests",
                taskDescription: "Adding unit tests using jest",
                focusDuration: 45,
                breakDuration: 30 
            }
        };
        
        const state: TaskState = taskDataReducer(initialTaskState, action);

        expect(state).toEqual([]);
    });

    it("should update the specified task", () => {
        const initialTaskState: TaskState = [
            {
                _id: "1",
                taskName: "Add Unit tests",
                taskDescription: "Adding unit tests using jest",
                focusDuration: 45,
                breakDuration: 30 
            }
        ];
        
        const action: TaskAction = {
            type: UPDATE_TASK,
            payload: {
                _id: "1",
                taskName: "Add Unit tests using Jest",
                taskDescription: "Adding unit tests to Pomodoro App",
                focusDuration: 25,
                breakDuration: 30             
            }
        };

        const state: TaskState = taskDataReducer(initialTaskState, action);

        expect(state).toEqual([
            {
                _id: "1",
                taskName: "Add Unit tests using Jest",
                taskDescription: "Adding unit tests to Pomodoro App",
                focusDuration: 25,
                breakDuration: 30             
            }
        ]);
    });

    it("should preserve the initial state in case of default", () => {
        const initialTaskState: TaskState = [
            {
                _id: "1",
                taskName: "Add Unit tests",
                taskDescription: "Adding unit tests using jest",
                focusDuration: 45,
                breakDuration: 60 
            }
        ];

        const action: TaskAction = {
            type: "DEFAULT"
        };

        const state: TaskState = taskDataReducer(initialTaskState, action);

        expect(state).toEqual([...initialTaskState]);
    });
});