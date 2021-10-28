import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { StateContext, addMemberToRoomById } from "../../../../storeProvider";
import Button from "../../Button";
import "./style.css";

const initialState = {
  loading: false,
  formData: {
    id: "",
  },
};

export default function JoinForm({ onDiscard }) {
  const [state, setState] = useState(initialState);

  const { currentUser } = useContext(StateContext);

  const handleJoin = async (e) => {
    e?.preventDefault();
    if (state.formData.id.trim()) {
      setState((prev) => ({ ...prev, loading: true }));
      await addMemberToRoomById({
        id: state.formData.id.trim(),
        uid: currentUser?.uid,
        uname: currentUser?.displayName,
      })
        .then(() => {
          setState(initialState);
          onDiscard(e);
        })
        .catch((err) => {
          setState((prev) => ({ ...prev, loading: false }));
          toast.error(err.message);
        });
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="form">
      <div className="form-wrapper">
        <div className="form-header">
          <h2 className="form-header__title">{"Join Room"}</h2>
          <p className="form-header__subtitle">
            {"You can search by room-ID."}
          </p>
        </div>

        <div className="form-body">
          <div className="form-group">
            <label className="form-label">{"Room id"}</label>
            <input
              name="id"
              className="form-control"
              type="text"
              placeholder=""
              required={true}
              value={state.formData["id"]}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-footer">
          <div className="form-footer__actions">
            <Button
              variant="primary"
              loading={state.loading}
              onClick={handleJoin}
              type="submit"
            >
              {"Join"}
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
