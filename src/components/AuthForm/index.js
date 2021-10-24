import React, { useState } from "react";
import { ACTIONS } from "../../appContext";
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";
import "./style.css";

export default function AuthForm() {
  const [activeForm, setActiveForm] = useState(ACTIONS.login);

  const switchForm = () => {
    if (activeForm === ACTIONS.login) setActiveForm(ACTIONS.signup);
    else setActiveForm(ACTIONS.login);
  };
  return (
    <div className="auth-form">
      <div className="auth-form__wrapper">
        {activeForm === ACTIONS.login ? (
          <LoginForm onSwitch={switchForm} />
        ) : (
          <SignupForm onSwitch={switchForm} />
        )}
      </div>
    </div>
  );
}
