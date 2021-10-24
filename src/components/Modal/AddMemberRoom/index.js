import { useContext, useState } from "react";
import { StateContext, addMemberToRoom } from "../../../appContext";
import Button from "../../Base/Button";
import "./style.css";

const initialState = {
  loading: false,
  formData: {
    id: "",
  },
};

export default function AddMemberRoomModal({ onDiscard }) {
  const [state, setState] = useState(initialState);

  const { activeRoom } = useContext(StateContext);

  const handleJoin = async (e) => {
    e.preventDefault();
    if (state.formData.id.trim()) {
      // && state.formData.name
      setState((prev) => ({ ...prev, loading: true }));
      await addMemberToRoom({
        id: activeRoom?.id,
        uid: state.formData.id.trim(),
      });
      setState(initialState);
    }
  };

  const handleDiscard = (e) => {
    e.preventDefault();
    onDiscard();
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
    <div className="modal">
      <div className="modal-wrapper">
        <div className="modal-header">
          <h2 className="modal-header__title">{"Add new member"}</h2>
          <p className="modal-header__subtitle">{"You can add by User-ID."}</p>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">{"User id"}</label>
            <input
              name="id"
              className="form-control"
              type="text"
              placeholder=""
              value={state.formData[`id`]}
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
              {"Add"}
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
