import { useContext, useState } from "react";
import { StateContext, joinRoom } from "../../../appContext";
import Button from "../../Base/Button";
import "./style.css";

export default function JoinRoomModal({ onDiscard }) {
  const [state, setState] = useState({
    loading: false,
    name: "",
  });

  const { currentUser } = useContext(StateContext);

  const handleJoin = async (e) => {
    e.preventDefault();
    if (state.name.trim()) {
      setState((prev) => ({ ...prev, loading: true }));
      await joinRoom({
        id: state.name.trim(),
        uid: currentUser?.uid,
        uname: currentUser?.displayName,
      });
      setState((prev) => ({ name: "", loading: false }));
    }
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
    <div className="join-room-modal">
      <div className="join-room-modal__wrapper">
        <form className="join-room-modal__form">
          <h2 className="join-room-modal__form-title">{"Join Room"}</h2>
          <p className="join-room-modal__form-subtitle">
            {"You can search by room ID."}
          </p>

          <div className="join-room-modal__form-group">
            <label className="join-room-modal__form-label">{"Room-ID"}</label>
            <input
              name="name"
              className="join-room-modal__form-control"
              type="text"
              placeholder=""
              value={state[`name`]}
              onChange={handleChange}
            />
          </div>

          <div className="join-room-modal__form-actions">
            <Button
              variant="primary"
              loading={state.loading}
              onClick={handleJoin}
            >
              {"Join"}
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
