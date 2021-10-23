import { useContext, useState } from "react";
import { StateContext, deleteRoom } from "../../../appContext";
import Button from "../../Base/Button";
import "./style.css";

export default function DeleteRoomModal({ onDiscard }) {
  const { activeRoom } = useContext(StateContext);

  const [loading, setLoading] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    await deleteRoom({
      id: activeRoom?.id,
    });
    setLoading(false);
    onDiscard(e);
  };

  const handleDiscard = (e) => {
    e.preventDefault();
    onDiscard(e);
  };

  return (
    <div className="modal">
      <div className="modal-wrapper">
        <div clas="modal-header">
          <h2 className="modal-header__title">
            {`Are you sure you want to delete: `}
            <span className="text-danger">{`${activeRoom?.name || ""}`}</span>
          </h2>
        </div>

        <div className="modal-body"></div>

        <div className="modal-footer">
          <div className="modal-footer__actions">
            <Button variant="danger" loading={loading} onClick={handleDelete}>
              {"Delete"}
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
