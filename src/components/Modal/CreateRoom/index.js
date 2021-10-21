import { useContext, useState } from "react";
import { StateContext, createRoom } from "../../../appContext";
import Button from "../../Base/Button";
import "./style.css";

export default function CreateRoomModal({ onDiscard }) {
  const [state, setState] = useState({
    loading: false,
    name: "",
  });

  const { currentUser } = useContext(StateContext);

  const handleCreate = async (e) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, loading: true }));
    await createRoom({
      name: state.name,
      uid: currentUser?.uid,
    });
    setState({ name: "", loading: false });
    onDiscard(e);
  };

  const handleDiscard = (e) => {
    e.preventDefault();
    onDiscard(e);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="create-room-modal">
      <div className="create-room-modal__wrapper">
        <form className="create-room-modal__form">
          <h2 className="create-room-modal__form-title">{"Create Room"}</h2>
          <p className="create-room-modal__form-subtitle">
            {"Create and connect with your awesome community!"}
          </p>

          <div className="create-room-modal__form-group">
            <label className="create-room-modal__form-label">
              {"Room name"}
            </label>
            <input
              name="name"
              className="create-room-modal__form-control"
              type="text"
              placeholder="Name.."
              value={state[`name`]}
              onChange={handleChange}
            />
          </div>

          <div className="create-room-modal__form-actions">
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
        </form>
      </div>
    </div>
  );
}
