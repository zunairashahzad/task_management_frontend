import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ListGroupItem, Form } from "react-bootstrap";
import dayjs from "dayjs";
import Image from "next/image";

import CalendarIcon from "../../../CalendarIcon/CalendarIcon";
import Style from "./TodoListItem.module.scss";
import { deleteTask, updateTask } from "../../../../store/actions/taskActions";

const TASK_STATUS = {
  COMPLETE: "COMPLETE",
  INCOMPLETE: "INCOMPLETE",
};

const TodoListItem = ({ task }) => {
  const [status, setStatus] = useState(TASK_STATUS.INCOMPLETE);
  const dispatch = useDispatch();

  useEffect(() => {
    if (task) {
      setStatus(task.status);
    }
  }, [task]);

  const markAsComplete = (event) => {
    const statusToBeStored = event.target.checked
      ? TASK_STATUS.COMPLETE
      : TASK_STATUS.INCOMPLETE;

    setStatus(statusToBeStored);

    dispatch(updateTask(task._id, { status: statusToBeStored }));
  };

  const taskIsCompleted = status === TASK_STATUS.COMPLETE;

  return (
    <ListGroupItem className={Style.itemWrapper}>
      <Form.Check
        id={`task-${task._id}`}
        className={`${Style.checkWrapper} ${
          taskIsCompleted ? Style.completed : ""
        }`}
      >
        <Form.Check.Input
          name="status"
          checked={taskIsCompleted}
          onChange={markAsComplete}
        />
        <Form.Check.Label className="ps-3">
          <span className="pt-1 form-checked-content">
            <strong>{task.title}</strong>
            {task.description && <p className="mb-1">{task.description}</p>}
            <small className="d-block text-muted">
              {task.dueDate && (
                <>
                  <CalendarIcon />{" "}
                  {dayjs(new Date(task.dueDate)).format("MMMM DD[,] YYYY")}
                </>
              )}
            </small>
          </span>
        </Form.Check.Label>
      </Form.Check>
      <div className={Style.deleteIconWrapper}>
        <button
          type="button"
          className={Style.deleteIcon}
          onClick={() => dispatch(deleteTask(task._id))}
        >
          <Image src="/trash.svg" alt="Delete" height="25" width="25" />
        </button>
      </div>
    </ListGroupItem>
  );
};

export default TodoListItem;
