import { useContext, useState } from "react";
import { StateContext, editRoom } from "../../../appContext";
import Button from "../../Base/Button";
import "./style.css";

export default function EditRoomModal({ onDiscard }) {
  const { activeRoom } = useContext(StateContext);

  const [state, setState] = useState({
    loading: false,
    name: activeRoom?.name,
  });

  const handleEdit = async (e) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, loading: true }));
    await editRoom({
      name: state.name,
      id: activeRoom?.id,
    });
    setState({ name: activeRoom?.name, loading: false });
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
    <div className="edit-room-modal">
      <div className="edit-room-modal__wrapper">
        <form className="edit-room-modal__form">
          <h2 className="edit-room-modal__form-title">{"Edit Room"}</h2>
          <p className="edit-room-modal__form-subtitle">
            {"Edit your room info."}
          </p>

          <div className="edit-room-modal__form-group">
            <label className="edit-room-modal__form-label">{"New name"}</label>
            <input
              name="name"
              className="edit-room-modal__form-control"
              type="text"
              placeholder="Name.."
              value={state[`name`]}
              onChange={handleChange}
            />
          </div>

          <div className="edit-room-modal__form-actions">
            <Button
              variant="primary"
              loading={state.loading}
              onClick={handleEdit}
            >
              {"Edit"}
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
