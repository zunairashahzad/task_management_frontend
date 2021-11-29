import { Form, FloatingLabel, Button, Card } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ExternalLayout from "../Layouts/ExternalLayout/ExternalLayout";
import Style from "../../styles/auth.module.scss";
import { signupUser } from "../../store/actions/authActions";
import { SIGNUP } from "../../constants/buttons";

const Signup = () => {
  const dispatch = useDispatch();

  const disabledButtons = useSelector((state) => state.config.disabledButtons);

  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirmation: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;

    let passwordError = false;

    if (
      name === "password" &&
      user.passwordConfirmation &&
      value !== user.passwordConfirmation
    ) {
      event.target.setCustomValidity("invalid");
      passwordError = true;
    }

    if (name === "passwordConfirmation" && value !== user.password) {
      event.target.setCustomValidity("invalid");
      passwordError = true;
    }

    if (["password", "passwordConfirmation"].includes(name) && !passwordError) {
      document.querySelector("input[name='password']").setCustomValidity("");
      document
        .querySelector("input[name='passwordConfirmation']")
        .setCustomValidity("");
    }

    setUser({ ...user, [name]: value });
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

    const { passwordConfirmation, ...authData } = user;

    dispatch(signupUser(authData));
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
              <h2 className="h3 mb-3 fw-normal text-center">Signup</h2>

              <FloatingLabel
                controlId="floatingFirstName"
                label="Enter First Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="John"
                  required
                  name="firstName"
                  value={user.firstName}
                  onChange={onChange}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingLastName"
                label="Enter Last Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Doe"
                  required
                  name="lastName"
                  value={user.lastName}
                  onChange={onChange}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingEmail"
                label="Enter Email"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  required
                  name="email"
                  value={user.email}
                  onChange={onChange}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPassword"
                label="Enter Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  value={user.password}
                  onChange={onChange}
                  minLength={8}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPasswordConfirmation"
                label="Confirm Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="passwordConfirmation"
                  value={user.passwordConfirmation}
                  onChange={onChange}
                  isInvalid={
                    user.passwordConfirmation &&
                    user.passwordConfirmation !== user.password
                  }
                  required
                />
                {user.passwordConfirmation && (
                  <Form.Control.Feedback type="invalid">
                    Two passwords must match
                  </Form.Control.Feedback>
                )}
              </FloatingLabel>
              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  disabled={disabledButtons.includes(SIGNUP)}
                >
                  Signup
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Form>
      </main>
    </ExternalLayout>
  );
};

export default Signup;
