import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { StateContext, deleteRoom } from "../../../../storeProvider";
import Button from "../../Button";
import "./style.css";

export default function DeleteForm({ onDiscard }) {
  const { activeRoom } = useContext(StateContext);

  const [loading, setLoading] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    await deleteRoom({
      id: activeRoom?.id,
    })
      .then(() => {
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
            {`Are you sure you want to delete `}
            <span className="text-danger">{`${activeRoom?.name || ""}`}</span>
          </h2>
        </div>

        <div className="form-body"></div>

        <div className="form-footer">
          <div className="form-footer__actions">
            <Button
              variant="danger"
              loading={loading}
              onClick={handleDelete}
              type="submit"
            >
              {"Delete"}
            </Button>
            <Button variant="light" onClick={(e) => onDiscard(e)}>
              {"Discard"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
