import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addUser,
  signUpWithEmailAndPassword,
  updateNewUserProfile,
} from "../../../../appContext";
import Button from "../../Button";
import "./style.css";

const initialState = {
  loading: false,
  formData: {
    uname: "",
    email: "",
    password: "",
  },
};

export default function SignupForm({ onSwitch }) {
  const [state, setState] = useState(initialState);

  const handleSignup = async (e) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, loading: true }));
    signUpWithEmailAndPassword({
      email: state.formData.email,
      password: state.formData.password,
    })
      .then(async (res) => {
        console.log("res: ", res);
        await updateNewUserProfile({ uname: state.formData.uname });
        await addUser({ uid: res.user.uid, uname: state.formData.uname });
        setState(initialState);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setState((prev) => ({ ...prev, loading: false }));
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
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label className="form-label">{"Username"}</label>
              <input
                name="uname"
                className="form-control"
                type="text"
                required={true}
                placeholder=""
                value={state.formData["uname"]}
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
                value={state.formData["email"]}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">{"Create Password"}</label>
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
