import { useContext } from "react";
import { StateContext } from "../../../appContext";
import Button from "../../Base/Button";
import "./style.css";

export default function InfoRoomModal({ onDiscard }) {
  const { activeRoom } = useContext(StateContext);

  const handleDiscard = (e) => {
    e.preventDefault();
    onDiscard();
  };

  return (
    <div className="modal">
      <div className="modal-wrapper">
        <div className="modal-header">
          <h2 className="text-2xl">{`${activeRoom?.name} info`}</h2>
        </div>

        <div className="modal-body text-gray">
          <p className="">
            {`${activeRoom?.members.length} member${
              activeRoom?.members.length > 1 ? "s" : ""
            }`}
          </p>
          <p className="">
            {`${activeRoom?.messages.length} message${
              activeRoom?.messages.length > 1 ? "s" : ""
            }`}
          </p>
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
