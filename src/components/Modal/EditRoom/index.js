import { useContext, useEffect, useState } from "react";
import { StateContext, editRoom } from "../../../appContext";
import Button from "../../Base/Button";
import "./style.css";

const initialState = {
  loading: false,
  name: "",
};

export default function EditRoomModal({ onDiscard }) {
  const { activeRoom } = useContext(StateContext);

  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState((prev) => ({ ...prev, name: activeRoom?.name }));

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, loading: true }));
    await editRoom({
      name: state.name,
      id: activeRoom?.id,
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
    setState((prev) => ({ ...prev, name: value }));
  };

  return (
    <div className="modal">
      <div className="modal-wrapper">
        <div className="modal-header">
          <h2 className="modal-header__title">{"Edit Room"}</h2>
          <p className="modal-header__subtitle">{"Edit your room info."}</p>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">{"New name"}</label>
            <input
              name="name"
              className="form-control"
              type="text"
              placeholder=""
              value={state.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="modal-footer">
          <div className="modal-footer__actions">
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
        </div>
      </div>
    </div>
  );
}
