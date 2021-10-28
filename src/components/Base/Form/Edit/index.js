import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { StateContext, editRoom } from "../../../../storeProvider";
import Button from "../../Button";
import "./style.css";

const initialState = {
  loading: false,
  formData: {
    name: "",
    photoURL: "https://via.placeholder.com/64",
  },
};

export default function EditForm({ onDiscard }) {
  const [state, setState] = useState(initialState);

  const { activeRoom } = useContext(StateContext);

  useEffect(() => {
    setState((prev) => ({ ...prev, name: activeRoom?.name }));

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, loading: true }));
    await editRoom({
      name: state.formData.name,
      id: activeRoom?.id,
      photoURL: state.formData.photoURL,
    })
      .then(() => {
        setState(initialState);
        onDiscard(e);
      })
      .catch((err) => {
        setState((prev) => ({ ...prev, loading: false }));
        toast.error(err.message);
      });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="form">
      <div className="form-wrapper">
        <div className="form-header">
          <h2 className="form-header__title">{"Edit Room"}</h2>
          <p className="form-header__subtitle">{"Edit your room info."}</p>
        </div>

        <div className="form-body">
          <div className="form-group">
            <label className="form-label">{"New name"}</label>
            <input
              name="name"
              className="form-control"
              type="text"
              required={true}
              placeholder=""
              value={state.formData["name"]}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-footer">
          <div className="form-footer__actions">
            <Button
              variant="primary"
              loading={state.loading}
              onClick={handleEdit}
              type="submit"
            >
              {"Edit"}
            </Button>
            <Button variant="light" onClick={(e) => onDiscard(e)}>
              {"Discard"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
