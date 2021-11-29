import { cloneDeep } from "lodash";

import {
  CREATE_TASK,
  SET_TASKS,
  DELETE_TASK,
  UPDATE_TASK,
} from "../types/taskTypes";

const initialState = {
  tasks: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TASK:
      return {
        ...state,
        tasks: [action.task, ...state.tasks],
      };
    case SET_TASKS:
      return {
        ...state,
        tasks: action.tasks,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.id),
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: updateTask(state, action),
      };
    default:
      return {
        ...state,
      };
  }
};

const updateTask = (state, action) => {
  const tasks = cloneDeep(state.tasks);
  const taskIndex = tasks.findIndex((task) => task._id === action.task._id);

  if (taskIndex >= 0) {
    tasks[taskIndex] = action.task;
  }

  return tasks;
};

export default taskReducer;
