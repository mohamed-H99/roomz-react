import { useContext, useState } from "react";
import { StateContext, createRoom } from "../../../appContext";
import Button from "../../Base/Button";
import "./style.css";

const initialState = {
  loading: false,
  formData: {
    name: "",
  },
};

export default function CreateRoomModal({ onDiscard }) {
  const [state, setState] = useState(initialState);

  const { currentUser } = useContext(StateContext);

  const handleCreate = async (e) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, loading: true }));
    await createRoom({
      name: state.formData.name,
      uname: currentUser?.displayName, // [providerNaming]
      uid: currentUser?.uid,
    });
    setState(initialState);
    onDiscard();
  };

  const handleDiscard = (e) => {
    e.preventDefault();
    onDiscard();
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        name: value,
      },
    }));
  };

  return (
    <div className="modal">
      <div className="modal-wrapper">
        <div className="modal-header">
          <h2 className="modal-header__title">{"Create Room"}</h2>
          <p className="modal-header__subtitle">
            {"Create and connect with your awesome community!"}
          </p>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">{"Room name"}</label>
            <input
              name="name"
              className="form-control"
              type="text"
              placeholder=""
              value={state.formData["name"]}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="modal-footer">
          <div className="modal-footer__actions">
            <Button
              variant="primary"
              loading={state.loading}
              onClick={handleCreate}
            >
              {"Create"}
            </Button>
            <Button variant="light" onClick={handleDiscard}>
              {"Discard"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
