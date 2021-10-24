import { useState } from "react";
import { toast } from "react-toastify";
import {
  loginWithEmailAndPassword,
  // loginWithGoogle,
} from "../../appContext";
import Button from "../Base/Button";
import "./style.css";

const initialState = {
  loading: false,
  formData: {
    email: "",
    password: "",
  },
};

export default function LoginForm({ onSwitch }) {
  const [state, setState] = useState(initialState);

  const handleLogin = (e) => {
    e.preventDefault();
    if (state.formData.email.trim() && state.formData.password.trim()) {
      setState((prev) => ({ ...prev, loading: true }));
      loginWithEmailAndPassword({ ...state.formData })
        .then(() => {
          setState(initialState);
        })
        .catch((err) => {
          toast.error(err.message);
          setState((prev) => ({ ...prev, loading: false }));
        });
    }
  };

  // const handleGoogle = async (e) => {
  //   e.preventDefault();
  //   setState((prev) => ({ ...prev, loading: true }));
  //   await loginWithGoogle();
  //   setState(initialState);
  // };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        [name]: value,
      },
    }));
  };

  return (
    <div className="modal">
      <div className="modal-wrapper">
        <div className="modal-header">
          <h2 className="modal-header__title">{"Login"}</h2>
          <p className="modal-header__subtitle">
            {"We appreciate your coming back."}
          </p>
          {/* <div className="mt-4 flex gap-2 justify-center items-center">
            <Button variant="primary" onClick={handleGoogle}>
              {"Google"}
            </Button>
          </div> */}
        </div>

        <div className="modal-body">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">{"Email address"}</label>
              <input
                name="email"
                className="form-control"
                type="email"
                required={true}
                placeholder=""
                value={state.formData["email"]}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">{"Password"}</label>
              <input
                name="password"
                className="form-control"
                type="password"
                required={true}
                placeholder=""
                value={state.formData["password"]}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>

        <div className="modal-footer">
          <div className="modal-footer__actions">
            <Button
              variant="primary"
              loading={state.loading}
              onClick={handleLogin}
            >
              {"Login"}
            </Button>
            <Button variant="light" onClick={onSwitch}>
              {"Join us"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
