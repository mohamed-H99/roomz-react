import { useContext } from "react";
import { StateContext } from "../../../appContext";
import Button from "../../Base/Button";
import "./style.css";

export default function InfoRoomModal({ onDiscard }) {
  const { activeRoom } = useContext(StateContext);

  const handleDiscard = (e) => {
    e.preventDefault();
    onDiscard(e);
  };

  return (
    <div className="info-room-modal">
      <div className="info-room-modal__wrapper">
        <div className="info-room-modal__content">
          <h2 className="info-room-modal__content-title">{`${activeRoom?.name} info`}</h2>
          <p className="create-room-modal__form-subtitle">
            {`${activeRoom?.members.length} member${
              activeRoom?.members.length > 1 ? "s" : ""
            }`}
            <br />
            {`${activeRoom?.messages.length} message${
              activeRoom?.messages.length > 1 ? "s" : ""
            }`}
            <br />
            {`Created ${activeRoom?.created_distance}`}
          </p>

          <div className="info-room-modal__content-description">{""}</div>

          <div className="info-room-modal__content-actions">
            <Button variant="light" onClick={handleDiscard}>
              {"Discard"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
