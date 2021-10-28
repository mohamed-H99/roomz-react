import { useContext, useState } from "react";
import { toast } from "react-toastify";
import {
  ACTIONS,
  DispatchContext,
  loginWithEmailAndPassword,
  StateContext,
} from "../../../../storeProvider";
import Button from "../../Button";
import "./style.css";

export default function LoginForm({ onSwitch }) {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (state.loginForm.email.trim() && state.loginForm.password.trim()) {
      setLoading(true);

      await loginWithEmailAndPassword({ ...state.loginForm })
        .then(() => {
          setLoading(false);
          dispatch({ type: ACTIONS.reset_login_form });
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.message);
        });
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch({
      type: ACTIONS.update_login_form,
      payload: {
        [name]: value,
      },
    });
  };

  return (
    <form className="form" onSubmit={handleLogin}>
      <div className="form-wrapper">
        <div className="form-header">
          <h2 className="form-header__title">{"Login"}</h2>
          <p className="form-header__subtitle">
            {"We appreciate your coming back."}
          </p>
        </div>

        <div className="form-body">
          <div className="form-group">
            <label className="form-label">{"Email address"}</label>
            <input
              name="email"
              className="form-control"
              type="email"
              required={true}
              placeholder=""
              value={state.loginForm["email"]}
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
              value={state.loginForm["password"]}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-footer">
          <div className="form-footer__actions">
            <Button
              variant="primary"
              loading={loading}
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
