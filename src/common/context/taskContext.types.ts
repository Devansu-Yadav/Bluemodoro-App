import { Task, TaskAction } from "common/data"
import React from "react"

export type TaskContext = {
    taskData: Task[],
    taskDataDispatch: React.Dispatch<TaskAction>,
    getTaskById: (taskId: string) => Task | undefined
}

export type ModalToggle = { displayModal: boolean, type: string };

export type TaskModalCtxt = {
    modalToggle: ModalToggle,
    setModalToggle: React.Dispatch<React.SetStateAction<ModalToggle>>,
    initialTaskModalData: Task,
    taskModalData: Task,
    setTaskModalData: React.Dispatch<React.SetStateAction<Task>>
}