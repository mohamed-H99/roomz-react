import { useContext, useState } from "react";
import { StateContext, logout } from "../../../appContext";
import Button from "../../Base/Button";
import "./style.css";

export default function LogoutModal({ onDiscard }) {
  const { activeRoom } = useContext(StateContext);

  const [loading, setLoading] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    setLoading(true);
    await logout();
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
            {`Are you sure you want to Logout?`}
          </h2>
        </div>

        <div className="modal-body"></div>

        <div className="modal-footer">
          <div className="modal-footer__actions">
            <Button variant="danger" loading={loading} onClick={handleLogout}>
              {"Logout"}
            </Button>
            <Button variant="light" onClick={handleDiscard}>
              {"Stay"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
