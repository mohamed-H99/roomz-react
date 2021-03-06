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

export default function AddMemberForm({ onDiscard }) {
  const [state, setState] = useState(initialState);

  const { activeRoom } = useContext(StateContext);

  const handleJoin = async (e) => {
    e.preventDefault();
    if (state.formData.id.trim()) {
      setState((prev) => ({ ...prev, loading: true }));
      await addMemberToRoomById({
        id: activeRoom?.id,
        uid: state.formData.id.trim(),
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
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        [name]: value,
      },
    }));
  };

  return (
    <form className="form">
      <div className="form-wrapper">
        <div className="form-header">
          <h2 className="form-header__title">{"Add new member"}</h2>
          <p className="form-header__subtitle">{"You can add by User-ID."}</p>
        </div>

        <div className="form-body">
          <div className="form-group">
            <label className="form-label">{"User id"}</label>
            <input
              name="id"
              className="form-control"
              type="text"
              required={true}
              placeholder=""
              value={state.formData[`id`]}
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
              {"Add"}
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
