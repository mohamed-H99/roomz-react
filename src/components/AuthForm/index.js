import React from "react";
import { useHistory } from "react-router";
import { loginWithGoogle } from "../../appContext";
import "./style.css";

export default function AuthForm() {
  const history = useHistory();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    await loginWithGoogle();
    history.push("/");
  };

  return (
    <form className="auth-form" onSubmit={HandleSubmit}>
      <div className="auth-form__wrapper">
        <h1 className="auth-form__title">
          {"Join our Awesome community members"}
        </h1>
        <button className="auth-form__btn">
          {"Login with"} <strong>{"Google"}</strong>
        </button>
      </div>
    </form>
  );
}
