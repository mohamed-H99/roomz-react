import { useContext, useState } from "react";
import { StateContext, leaveRoom } from "../../../appContext";
import Button from "../../Base/Button";
import "./style.css";

export default function LeaveRoomModal({ onDiscard }) {
  const { currentUser, activeRoom } = useContext(StateContext);

  const [state, setState] = useState({
    loading: false,
    name: "",
  });

  const handleLeave = async (e) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, loading: true }));
    await leaveRoom({
      id: activeRoom?.id,
      reason: state.name,
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
    <div className="leave-room-modal">
      <div className="leave-room-modal__wrapper">
        <form className="leave-room-modal__form">
          <h2 className="leave-room-modal__form-title">
            {`Are you sure you want to leave '${activeRoom?.name}'?`}
          </h2>

          <div className="leave-room-modal__form-group optional">
            <label className="leave-room-modal__form-label">
              {"Why are you leaving?"}
            </label>
            <input
              name="name"
              className="leave-room-modal__form-control"
              type="text"
              placeholder="Name.."
              value={state[`name`]}
              onChange={handleChange}
            />
          </div>

          <div className="leave-room-modal__form-actions">
            <Button
              variant="danger"
              loading={state.loading}
              onClick={handleLeave}
            >
              {"Leave"}
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
