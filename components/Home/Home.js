import Link from "next/link";
import { useSelector } from "react-redux";

import Style from "./Home.module.scss";
import ExternalLayout from "../Layouts/ExternalLayout/ExternalLayout";

const Home = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <ExternalLayout navMargin="mb-auto">
      <main className={`${Style.body} px-3 text-center m-auto`}>
        <h1>Welcome to Task Management System</h1>
        <p className="lead">
          Enter the world of task management. Manage your tasks easily
        </p>
        <p className="lead">
          {isAuthenticated ? (
            <Link href="/dashboard">
              <a className="btn btn-lg btn-secondary fw-bold">
                Manage TODO List
              </a>
            </Link>
          ) : (
            <Link href="/signup">
              <a className="btn btn-lg btn-secondary fw-bold">Register Now!</a>
            </Link>
          )}
        </p>
      </main>
    </ExternalLayout>
  );
};

export default Home;
