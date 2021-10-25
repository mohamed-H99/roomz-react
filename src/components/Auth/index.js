import React, { useState } from "react";
import { ACTIONS } from "../../appContext";
import LoginForm from "../Base/Form/Login";
import SignupForm from "../Base/Form/Signup";
import "./style.css";

export default function Auth() {
  const [activeForm, setActiveForm] = useState(ACTIONS.login);

  const handleSwitch = () => {
    if (activeForm === ACTIONS.login) setActiveForm(ACTIONS.signup);
    else setActiveForm(ACTIONS.login);
  };
  return (
    <div className="auth-form">
      <div className="auth-form__wrapper">
        {activeForm === ACTIONS.login ? (
          <LoginForm onSwitch={handleSwitch} />
        ) : (
          <SignupForm onSwitch={handleSwitch} />
        )}
      </div>
    </div>
  );
}
