export type Task = {
    _id: string,
    taskName: string,
    taskDescription: string,
    focusDuration: number,
    breakDuration: number
}

export type TaskState = Task[];

export type TaskAction = {
    type: "SAVE_TASK_DATA",
    payload: Task[]
} | {
    type: "CREATE_TASK",
    payload: Task
} | {
    type: "DELETE_TASK",
    payload: Task
} | {
    type: "UPDATE_TASK",
    payload: Task
}