import axios from "axios";

import FlashHelper from "../../helpers/FlashHelper";
import {
  disableActionBtn,
  enableActionBtn,
  initLoader,
  dismissLoader,
} from "./configActions";
import { CREATE_TASK } from "../../constants/buttons";
import { TODO_LIST } from "../../constants/loader";
import { SET_TASKS, DELETE_TASK, UPDATE_TASK } from "../types/taskTypes";

export const createTask = (task, callback) => async (dispatch) => {
  try {
    dispatch(disableActionBtn(CREATE_TASK));

    const response = await axios.post("/tasks", task);

    dispatch({ type: CREATE_TASK, task: response.data.task });

    callback();

    dispatch(enableActionBtn(CREATE_TASK));

    FlashHelper.success("Task created");
  } catch (error) {
    FlashHelper.error(error?.response?.data?.message);

    dispatch(enableActionBtn(CREATE_TASK));
  }
};

export const getTodoList = () => async (dispatch) => {
  try {
    dispatch(initLoader(TODO_LIST));

    const response = await axios.get("/tasks");

    dispatch({ type: SET_TASKS, tasks: response.data.tasks });

    dispatch(dismissLoader(TODO_LIST));
  } catch (error) {
    dispatch(dismissLoader(TODO_LIST));

    FlashHelper.error(error?.response?.data?.message);
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    await axios.delete(`/tasks/${id}`);

    dispatch({ type: DELETE_TASK, id });
  } catch (error) {
    FlashHelper.error(error?.response?.data?.message);
  }
};

export const updateTask = (id, task) => async (dispatch) => {
  try {
    const response = await axios.patch(`/tasks/${id}`, task);

    dispatch({ type: UPDATE_TASK, task: response.data.task });
  } catch (error) {
    console.error("Error updating", error);
    FlashHelper.error(error?.response?.data?.message);
  }
};
