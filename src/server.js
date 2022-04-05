import { Server, Model, RestSerializer } from "miragejs";
import {
  getAllTasksHandler,
  createTaskHandler,
  deleteTaskHandler,
  updateTaskHandler
} from "./backend/controllers/TasksController";
import { users } from "./backend/db/users";

export function makeServer({ environment = "development" } = {}) {
  const server = new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    // TODO: Use Relationships to have named relational Data
    models: {
      user: Model,
      tasks: Model,
    },

    seeds(server) {
      server.logging = false;
      users.forEach((item) =>
        server.create("user", {
          ...item,
          tasks: []
        })
      );
    },

    routes() {
      this.namespace = "api";
      // auth routes (public)
      this.get("/tasks", getAllTasksHandler.bind(this));
      this.post("/tasks", createTaskHandler.bind(this));
      this.post("/tasks/:taskId", updateTaskHandler.bind(this));
      this.delete("/tasks/:taskId", deleteTaskHandler.bind(this));
    },
  });
  return server;
}
