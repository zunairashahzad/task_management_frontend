/* eslint-disable @next/next/link-passhref */

import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import Style from "./ExternalLayout.module.scss";
import { logout } from "../../../store/actions/authActions";

const ExternalLayout = ({ children, navMargin }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className={`${Style.coverContainer} d-flex w-100 mx-auto flex-column`}>
      <Navbar
        expand="lg"
        bg="light"
        variant="light"
        className={`${navMargin} shadow-lg`}
      >
        <Container>
          <Link href="/">
            <Navbar.Brand href="/">Task Management System</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav activeKey={router.asPath}>
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard">
                    <Nav.Link href="/dashboard" eventKey="/dashboard">
                      My TODO List
                    </Nav.Link>
                  </Link>
                  <NavDropdown
                    id="nav-dropdown-dark-example"
                    title={`Welcome ${currentUser.firstName}`}
                    menuVariant="dark"
                  >
                    <NavDropdown.Item
                      as="button"
                      onClick={() => dispatch(logout())}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Nav.Link href="/login" eventKey="/login">
                      Login
                    </Nav.Link>
                  </Link>
                  <Link href="/signup">
                    <Nav.Link href="/signup" eventKey="/signup">
                      Signup
                    </Nav.Link>
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>{children}</Container>
      <footer className="mt-auto pt-3 text-center">
        <p>© {new Date().getFullYear()} All rights reserved</p>
      </footer>
    </div>
  );
};

ExternalLayout.defaultProps = {
  navMargin: "mb-4",
};

export default ExternalLayout;

/* eslint-enable @next/next/link-passhref */
