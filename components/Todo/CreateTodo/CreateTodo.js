import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Offcanvas, Form, FloatingLabel, Button } from "react-bootstrap";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

import Style from "./CreateTodo.module.scss";
import { createTask } from "../../../store/actions/taskActions";
import { CREATE_TASK } from "../../../constants/buttons";

const CreateTodo = () => {
  const dispatch = useDispatch();
  const disabledButtons = useSelector((state) => state.config.disabledButtons);

  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: undefined,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChange = (event) => {
    const { name, value } = event.target;

    setTask({ ...task, [name]: value });
  };

  const callback = () => {
    setTask({ title: "", description: "", dueDate: "" });
    setValidated(false);
    handleClose();
  };

  const onSubmit = (event) => {
    const form = event.currentTarget;

    event.preventDefault();

    if (!validated) {
      setValidated(true);
    }

    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    dispatch(createTask(task, callback));
  };

  return (
    <>
      <Button
        variant="primary"
        type="button"
        size="lg"
        onClick={handleShow}
        className={Style.createButton}
      >
        +
      </Button>

      <Offcanvas show={show} onHide={handleClose} keyboard={false}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add task to your TODO List</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={onSubmit} noValidate validated={validated}>
            <FloatingLabel
              controlId="floatingTitle"
              label="Enter Title"
              className="mb-3"
            >
              <Form.Control
                name="title"
                type="text"
                placeholder="Enter Title"
                required
                size="sm"
                onChange={onChange}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingDescription"
              label="Enter Description"
              className="mb-3"
            >
              <Form.Control
                name="description"
                as="textarea"
                placeholder="Enter Description"
                size="sm"
                style={{ height: "100px" }}
                onChange={onChange}
              />
            </FloatingLabel>
            <div className="text-center">
              <b className="mt-3">Select Due Date</b>
              <DayPicker
                onDayClick={(day) =>
                  setTask({ ...task, dueDate: new Date(day) })
                }
                selectedDays={task.dueDate}
                disabledDays={[{ before: new Date() }]}
              />
            </div>

            <div className="d-grid gap-2">
              <Button
                variant="primary"
                type="submit"
                size="lg"
                disabled={disabledButtons.includes(CREATE_TASK)}
              >
                Create
              </Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CreateTodo;
