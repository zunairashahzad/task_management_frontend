import { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

import { getTodoList } from "../../../store/actions/taskActions";
import TodoListItem from "./TodoListItem/TodoListItem";
import { TODO_LIST } from "../../../constants/loader";

const TodoList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);
  const loader = useSelector((state) => state.config.loader);

  useEffect(() => {
    dispatch(getTodoList());
  }, []);

  const taskList = tasks.map((task, index) => (
    <TodoListItem task={task} key={index} />
  ));

  const showLoader = loader.includes(TODO_LIST);

  return (
    <>
      {showLoader ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : tasks.length === 0 ? (
        <h3 className="text-center">Your task list is empty!</h3>
      ) : (
        <ListGroup className="shadow-lg">{taskList}</ListGroup>
      )}
    </>
  );
};

export default TodoList;
