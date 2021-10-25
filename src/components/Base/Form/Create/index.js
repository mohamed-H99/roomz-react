import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { StateContext, createRoom } from "../../../../appContext";
import Button from "../../Button";
import "./style.css";

const initialState = {
  loading: false,
  formData: {
    name: "",
  },
};

export default function CreateForm({ onDiscard }) {
  const [state, setState] = useState(initialState);

  const { currentUser } = useContext(StateContext);

  const handleCreate = async (e) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, loading: true }));
    await createRoom({
      name: state.formData.name,
      uname: currentUser?.displayName, // [providerNaming]
      uid: currentUser?.uid,
    })
      .then(() => {
        setState(initialState);
        onDiscard(e);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setState((prev) => ({ ...prev, loading: false }));
      });
  };

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
          <h2 className="form-header__title">{"Create Room"}</h2>
          <p className="form-header__subtitle">
            {"Create and connect with your awesome community!"}
          </p>
        </div>

        <div className="form-body">
          <div className="form-group">
            <label className="form-label">{"Room name"}</label>
            <input
              name="name"
              className="form-control"
              type="text"
              placeholder=""
              required={true}
              value={state.formData["name"]}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-footer">
          <div className="form-footer__actions">
            <Button
              variant="primary"
              loading={state.loading}
              onClick={handleCreate}
              type="submit"
            >
              {"Create"}
            </Button>
            <Button variant="light" onClick={(e) => onDiscard(e)}>
              {"Discard"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
