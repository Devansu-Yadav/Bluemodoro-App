import { Response } from "miragejs";
import { v4 as uuid } from "uuid";

/**
 * All the routes related to Tasks are present here.
 *  These are currently publicly accessible routes (No Auth added).
 * */

/**
 * This handler handles gets all tasks in the db.
 * send GET Request at /api/tasks
 * */

export const getAllTasksHandler = function (schema, request) {
  // Fetch Tasks for the Guest user.
  const user = this.db.users[0];
  if (!user) {
    return new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Guest Not Found"],
      }
    );
  }
  return new Response(200, {}, { tasks: user.tasks });
};

/**
 * This handler handles creating a new task
 * send POST Request at /api/tasks
 * body contains {task}
 * */

export const createTaskHandler = function (schema, request) {
  // Create task for Guest user
  const user = this.db.users[0];
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Guest User Not found"],
        }
      );
    }
    const { task } = JSON.parse(request.requestBody);
    user.tasks.push({ ...task, _id: uuid() });
    this.db.users.update({ _id: user._id }, user);
    return new Response(201, {}, { tasks: user.tasks });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles deleting a task
 * send DELETE Request at /api/tasks/:taskId
 * */

export const deleteTaskHandler = function (schema, request) {
  const user = this.db.users[0];
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Guest User not found"],
        }
      );
    }
    const taskId = request.params.taskId;
    user.tasks = user.tasks.filter((item) => item._id !== taskId);
    this.db.users.update({ _id: user._id }, user);
    return new Response(200, {}, { tasks: user.tasks });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles updating a task
 * send POST Request at /api/tasks/:taskId
 * body contains {task}
 * */

export const updateTaskHandler = function (schema, request) {
  const user = this.db.users[0];
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Guest User not found"],
        }
      );
    }
    const { task } = JSON.parse(request.requestBody);
    const { taskId } = request.params;
    const taskIndex = user.tasks.findIndex((task) => task._id === taskId);
    user.tasks[taskIndex] = { ...user.tasks[taskIndex], ...task };
    this.db.users.update({ _id: user._id }, user);
    return new Response(201, {}, { tasks: user.tasks });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
