import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { StateContext } from "./appContext";

export default function PrivateRoute({ component: RouteComponent, ...rest }) {
  const { currentUser } = useContext(StateContext);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to="/auth" />
        )
      }
    />
  );
}
