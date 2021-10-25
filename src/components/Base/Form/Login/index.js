import { useState } from "react";
import { toast } from "react-toastify";
import {
  loginWithEmailAndPassword,
  // loginWithGoogle,
} from "../../../../appContext";
import Button from "../../Button";
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
        })
        .finally(() => {
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
    <form className="form">
      <div className="form-wrapper">
        <div className="form-header">
          <h2 className="form-header__title">{"Login"}</h2>
          <p className="form-header__subtitle">
            {"We appreciate your coming back."}
          </p>
          {/* <div className="mt-4 flex gap-2 justify-center items-center">
            <Button variant="primary" onClick={handleGoogle}>
              {"Google"}
            </Button>
          </div> */}
        </div>

        <div className="form-body">
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

        <div className="form-footer">
          <div className="form-footer__actions">
            <Button
              variant="primary"
              loading={state.loading}
              onClick={handleLogin}
              type="submit"
            >
              {"Login"}
            </Button>
            <Button variant="light" onClick={onSwitch}>
              {"Join us"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
