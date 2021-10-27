import { useContext, useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { toast } from "react-toastify";
import {
  registerWithEmailAndPassword,
  ACTIONS,
  DispatchContext,
  StateContext,
} from "../../../../storeProvider";
import Button from "../../Button";
import "./style.css";

export default function SignupForm({ onSwitch, onSubmit }) {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch({ type: ACTIONS.set_submitting_form, payload: true });

    await registerWithEmailAndPassword({
      ...state.signupForm,
    })
      .then(() => {
        setLoading(false);
        onSubmit();
      })
      .catch((err) => {
        setLoading((prev) => ({ ...prev, loading: false }));
        toast.error(err.message);
      });
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
      type: ACTIONS.update_signup_form,
      payload: {
        [name]: value,
      },
    });
  };

  const togglePassword = (e) => {
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  return (
    <form className="form" onSubmit={handleSignup}>
      <div className="form-wrapper">
        <div className="form-header">
          <h2 className="form-header__title">{"Signup"}</h2>
          <p className="form-header__subtitle">
            {"Join our Awesome! community members."}
          </p>
          {/* <div className="mt-4 flex gap-2 justify-center items-center">
            <Button variant="primary" onClick={handleGoogle}>
              {"Google"}
            </Button>
          </div> */}
        </div>

        <div className="form-body">
          <div className="form-group">
            <label className="form-label">{"Username"}</label>
            <input
              name="uname"
              className="form-control"
              type="text"
              required={true}
              placeholder=""
              value={state.signupForm["uname"]}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">{"Email address"}</label>
            <input
              name="email"
              className="form-control"
              type="email"
              required={true}
              placeholder=""
              value={state.signupForm["email"]}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">{"Create Password"}</label>
            <div className="input-group">
              <input
                name="password"
                className="form-control"
                type={state.showPassword ? "text" : "password"}
                required={true}
                placeholder=""
                value={state.signupForm["password"]}
                onChange={handleChange}
              />
              <span className="input-icon" onClick={togglePassword}>
                {showPassword ? <Eye /> : <EyeOff />}
              </span>
            </div>
          </div>
        </div>

        <div className="form-footer">
          <div className="form-footer__actions">
            <Button
              variant="primary"
              loading={loading}
              onClick={handleSignup}
              type="submit"
            >
              {"Signup"}
            </Button>
            <Button variant="light" onClick={onSwitch}>
              {"Switch to login"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
