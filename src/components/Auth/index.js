import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ACTIONS, DispatchContext } from "../../storeProvider";
import LoginForm from "../Base/Form/Login";
import SignupForm from "../Base/Form/Signup";
import "./style.css";

export default function Auth() {
  const dispatch = useContext(DispatchContext);
  const [activeForm, setActiveForm] = useState(ACTIONS.signup);

  const history = useHistory();

  const handleSwitch = () => {
    if (activeForm === ACTIONS.login) setActiveForm(ACTIONS.signup);
    else setActiveForm(ACTIONS.login);
  };

  const handleAuthConfirmed = () => {
    dispatch({ type: ACTIONS.set_auth_confirmed, payload: true });
  };

  useEffect(() => {
    history.push("/");

    return () => {};
  }, [history]);

  return (
    <div className="auth-form">
      <div className="auth-form__wrapper">
        {activeForm === ACTIONS.login ? (
          <LoginForm onSubmit={handleAuthConfirmed} onSwitch={handleSwitch} />
        ) : (
          <SignupForm onSubmit={handleAuthConfirmed} onSwitch={handleSwitch} />
        )}
      </div>
    </div>
  );
}
