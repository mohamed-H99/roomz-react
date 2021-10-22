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
    <div className="delete-room-modal">
      <div className="delete-room-modal__wrapper">
        <form className="delete-room-modal__form">
          <h2 className="delete-room-modal__form-title">
            {`Are you sure you want to delete ${activeRoom?.name}?`}
          </h2>

          <div className="delete-room-modal__form-actions">
            <Button variant="danger" loading={loading} onClick={handleDelete}>
              {"Delete"}
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
