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

  useEffect(() => {
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div className="modal">
      <div className="modal-wrapper">
        <div className="modal-header">
          <h2 className="modal-header__title">{"Signup"}</h2>
          <p className="modal-header__subtitle">
            {"Join our Awesome! community members."}
          </p>
          {/* <div className="mt-4 flex gap-2 justify-center items-center">
            <Button variant="primary" onClick={handleGoogle}>
              {"Google"}
            </Button>
          </div> */}
        </div>

        <div className="modal-body">
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

        <div className="modal-footer">
          <div className="modal-footer__actions">
            <Button
              variant="primary"
              loading={state.loading}
              onClick={handleSignup}
              type="submit"
            >
              {"Signup"}
            </Button>
            <Button variant="light" onClick={onSwitch}>
              {"Login here"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
