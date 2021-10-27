import { useContext, useState } from "react";
import { toast } from "react-toastify";
import {
  ACTIONS,
  DispatchContext,
  loginWithEmailAndPassword,
  StateContext,
  // loginWithGoogle,
} from "../../../../storeProvider";
import Button from "../../Button";
import "./style.css";

export default function LoginForm({ onSwitch, onSubmit }) {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (state.loginForm.email.trim() && state.loginForm.password.trim()) {
      setLoading(true);
      dispatch({ type: ACTIONS.set_submitting_form, payload: true });

      await loginWithEmailAndPassword({ ...state.loginForm })
        .then(() => {
          setLoading(false);
          onSubmit();
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.message);
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
          {/* <div className="mt-4 flex gap-2 justify-center items-center">
            <Button variant="primary" onClick={handleGoogle}>
              {"Google"}
            </Button>
          </div> */}
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
