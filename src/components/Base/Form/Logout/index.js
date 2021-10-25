import { useState } from "react";
import { toast } from "react-toastify";
import { logout } from "../../../../appContext";
import Button from "../../Button";
import "./style.css";

export default function LogoutForm({ onDiscard }) {
  const [loading, setLoading] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    setLoading(true);
    await logout()
      .then(() => {
        onDiscard(e);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className="form">
      <div className="form-wrapper">
        <div clas="form-header">
          <h2 className="form-header__title">
            {`Are you sure you want to Logout?`}
          </h2>
        </div>

        <div className="form-body"></div>

        <div className="form-footer">
          <div className="form-footer__actions">
            <Button
              variant="danger"
              loading={loading}
              onClick={handleLogout}
              type="submit"
            >
              {"Yes, Logout"}
            </Button>
            <Button variant="light" onClick={(e) => onDiscard(e)}>
              {"No, Stay"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
