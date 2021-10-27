import { useContext } from "react";
import { StateContext } from "../../../../storeProvider";
import Button from "../../Button";
import "./style.css";

export default function InfoForm({ onDiscard }) {
  const { activeRoom } = useContext(StateContext);

  const copyIdToClipboard = () => navigator.clipboard.writeText(activeRoom?.id);

  return (
    <form className="form">
      <div className="form-wrapper">
        <div className="form-header">
          <h2 className="text-2xl">{`${activeRoom?.name}`}</h2>
        </div>

        <div className="form-body text-gray">
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
              onClick={copyIdToClipboard}
              disabled={true}
              value={`${activeRoom?.id}`}
              readOnly={true}
              title={"copy id"}
            />
          </div>
        </div>

        <div className="form-footer">
          <div className="form-footer__actions">
            <Button variant="light" onClick={(e) => onDiscard(e)}>
              {"Discard"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
