import { useContext, useState } from "react";
import { StateContext, leaveRoom } from "../../../appContext";
import Button from "../../Base/Button";
import "./style.css";

const initialState = {
  loading: false,
  formData: {
    reason: "",
  },
};

export default function LeaveRoomModal({ onDiscard }) {
  const { currentUser, activeRoom } = useContext(StateContext);
  const [state, setState] = useState(initialState);

  const handleLeave = async (e) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, loading: true }));
    await leaveRoom({
      id: activeRoom?.id,
      reason: state.reason,
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
    setState((prev) => ({ ...prev, reason: value }));
  };

  return (
    <div className="modal">
      <div className="modal-wrapper">
        {/* modal header */}
        <div className="modal-header">
          <h2 className="modal-header__title">
            {`Are you sure you want to leave: `}
            <span className="text-danger">{`${activeRoom?.name || ""}`}</span>
          </h2>
        </div>

        <div className="modal-body">
          <div className="form-group optional">
            <label className="form-label">{"Why are you leaving?"}</label>
            <input
              name="name"
              className="form-control"
              type="text"
              placeholder=""
              value={state.formData.reason}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="modal-footer">
          <div className="modal-footer__actions">
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
        </div>
      </div>
    </div>
  );
}
