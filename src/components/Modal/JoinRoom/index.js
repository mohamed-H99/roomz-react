import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { StateContext, addMemberToRoom } from "../../../appContext";
import Button from "../../Base/Button";
import "./style.css";

const initialState = {
  loading: false,
  id: "",
};

export default function JoinRoomModal({ onDiscard }) {
  const [state, setState] = useState(initialState);

  const { currentUser } = useContext(StateContext);

  const handleJoin = async (e) => {
    e?.preventDefault();
    if (state.id.trim()) {
      setState((prev) => ({ ...prev, loading: true }));
      await addMemberToRoom({
        id: state.id.trim(),
        uid: currentUser?.uid,
        uname: currentUser?.displayName,
      })
        .then(() => {
          handleDiscard();
        })
        .catch((err) => {
          toast.error(err.message);
        });
      setState(initialState);
    }
  };

  const handleDiscard = (e) => {
    e?.preventDefault();
    onDiscard();
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setState((prev) => ({ ...prev, id: value }));
  };

  return (
    <div className="modal">
      <div className="modal-wrapper">
        <div className="modal-header">
          <h2 className="modal-header__title">{"Join Room"}</h2>
          <p className="modal-header__subtitle">
            {"You can search by room-ID."}
          </p>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">{"Room id"}</label>
            <input
              name="name"
              className="form-control"
              type="text"
              placeholder=""
              value={state[`name`]}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="modal-footer">
          <div className="modal-footer__actions">
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
        </div>
      </div>
    </div>
  );
}
