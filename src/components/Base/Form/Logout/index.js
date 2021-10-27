import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { ACTIONS, DispatchContext, logout } from "../../../../storeProvider";
import Button from "../../Button";
import "./style.css";

export default function LogoutForm({ onDiscard }) {
  const dispatch = useContext(DispatchContext);
  const [loading, setLoading] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    setLoading(true);
    await logout()
      .then(() => {
        dispatch({ type: ACTIONS.set_auth_confirmed, payload: false });
        onDiscard(e);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
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
