import React, { useContext, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { StateContext } from "../../appContext";
import AuthForm from "../../components/AuthForm";
import "./style.css";

const Auth = () => {
  const state = useContext(StateContext);
  const history = useHistory();

  useEffect(() => {
    if (state.currentUser) history.push("/");

    return () => {};
  }, [state, history]);

  return (
    <div className="auth-page">
      <div className="auth-page__wrapper">
        <AuthForm />
      </div>
    </div>
  );
};

export default withRouter(Auth);
