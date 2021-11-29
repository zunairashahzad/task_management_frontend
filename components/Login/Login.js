import { Form, FloatingLabel, Button, Card } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ExternalLayout from "../Layouts/ExternalLayout/ExternalLayout";
import Style from "../../styles/auth.module.scss";
import { loginUser } from "../../store/actions/authActions";
import { LOGIN } from "../../constants/buttons";

const Login = () => {
  const dispatch = useDispatch();

  const disabledButtons = useSelector((state) => state.config.disabledButtons);

  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

    dispatch(loginUser({ email, password }));
  };
  return (
    <ExternalLayout navMargin="mb-auto">
      <main className={Style.wrapper}>
        <Form
          className={Style.form}
          onSubmit={onSubmit}
          noValidate
          validated={validated}
        >
          <Card className="shadow-lg">
            <Card.Body>
              <h2 className="h3 mb-3 fw-normal text-center">Login</h2>

              <FloatingLabel
                controlId="floatingInput"
                label="Enter Email"
                className="mb-3"
              >
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required={true}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPassword"
                label="Enter Password"
                className="mb-3"
              >
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  required={true}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </FloatingLabel>
              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  disabled={disabledButtons.includes(LOGIN)}
                >
                  Login
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Form>
      </main>
    </ExternalLayout>
  );
};

export default Login;
