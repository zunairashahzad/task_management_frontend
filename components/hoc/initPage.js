import React, { Component } from "react";
import Router from "next/router";
import nextCookie from "next-cookies";

import { AUTH_KEYS } from "../../helpers/AuthHelper";

const initPage = (WrappedComponent, accessType = "private") => {
  const PageHOC = (props) => {
    return <WrappedComponent {...props} />;
  };

  PageHOC.getInitialProps = (context) => {
    applyRedirection(accessType, context);

    return { query: context.query };
  };

  return PageHOC;
};

const applyRedirection = (accessType, context) => {
  const cookies = nextCookie(context);

  const token = cookies[AUTH_KEYS.TOKEN];
  const user = cookies[AUTH_KEYS.USER];

  switch (accessType) {
    case "private":
      if (!token || !user) {
        redirect(context, "/login");
      }

      break;
    case "public":
      if (token && user) {
        redirect(context, "/dashboard");
      }

      break;
  }
};

const redirect = (context, path) => {
  const { req, res } = context;

  if (req) {
    res.writeHead(302, { Location: path });
    res.end();
    return;
  }

  Router.push(path);
};

export default initPage;
