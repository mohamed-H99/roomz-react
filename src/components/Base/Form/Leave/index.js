import { useContext, useState } from "react";
import { toast } from "react-toastify";
import {
  StateContext,
  removeMemberFromRoomById,
} from "../../../../storeProvider";
import Button from "../../Button";
import "./style.css";

const initialState = {
  loading: false,
  formData: {
    reason: "",
  },
};

export default function LeaveForm({ onDiscard }) {
  const [state, setState] = useState(initialState);

  const { currentUser, activeRoom } = useContext(StateContext);

  const handleLeave = async (e) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, loading: true }));
    await removeMemberFromRoomById({
      id: activeRoom?.id,
      reason: state.formData.reason,
      uid: currentUser?.uid,
    })
      .then(() => {
        setState(initialState);
        onDiscard(e);
      })
      .catch((err) => {
        setState((prev) => ({ ...prev, loading: false }));
        toast.error(err.message);
      });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setState((prev) => ({ ...prev, reason: value }));
  };

  return (
    <form className="form">
      <div className="form-wrapper">
        <div className="form-header">
          <h2 className="form-header__title">
            {`Are you sure you want to leave `}
            <span className="text-danger">{`${activeRoom?.name || ""}`}</span>
          </h2>
        </div>

        <div className="form-body">
          <div className="form-group optional">
            <label className="form-label">{"Why are you leaving?"}</label>
            <input
              name="name"
              className="form-control"
              type="text"
              required={false}
              placeholder=""
              value={state.formData.reason}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-footer">
          <div className="form-footer__actions">
            <Button
              variant="danger"
              loading={state.loading}
              onClick={handleLeave}
              type="submit"
            >
              {"Leave"}
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
