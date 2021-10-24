import { useContext } from "react";
import { StateContext } from "../../../appContext";
import Button from "../../Base/Button";
import "./style.css";

export default function InfoRoomModal({ onDiscard }) {
  const { activeRoom } = useContext(StateContext);

  const copyId = () => {
    navigator.clipboard.writeText(activeRoom?.id);
  };

  const handleDiscard = (e) => {
    e.preventDefault();
    onDiscard();
  };

  return (
    <div className="modal">
      <div className="modal-wrapper">
        <div className="modal-header">
          <h2 className="text-2xl">{`${activeRoom?.name}`}</h2>
        </div>

        <div className="modal-body text-gray">
          <div>
            {`${activeRoom?.members.length} member${
              activeRoom?.members.length > 1 ? "s" : ""
            }`}
          </div>
          <div>
            {`${activeRoom?.messages.length} message${
              activeRoom?.messages.length > 1 ? "s" : ""
            }`}
          </div>
          <div className="form-group">
            <label className="form-label">{`Room ID`}</label>
            <input
              className="btn btn-primary"
              onClick={copyId}
              disabled={false}
              value={`${activeRoom?.id}`}
              readOnly={true}
            />
          </div>
        </div>

        <div className="modal-footer">
          <div className="modal-footer__actions">
            <Button variant="light" onClick={handleDiscard}>
              {"Discard"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
