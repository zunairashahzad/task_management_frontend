import { useEffect } from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import ReactNotification from "react-notifications-component";

import "react-notifications-component/dist/theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

import store from "../store/store";
import axiosDefault from "../utils/axios-defaults";
import { verifyLogin } from "../store/actions/authActions";

axiosDefault();

const TaskManagement = ({ Component, pageProps }) => {
  useEffect(() => {
    store.dispatch(verifyLogin());
  }, []);

  return (
    <>
      <Head>
        <title>Task Management System</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Provider store={store}>
        <ReactNotification />
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

export default TaskManagement;
