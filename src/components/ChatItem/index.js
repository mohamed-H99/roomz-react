import React, { useContext } from "react";
import { ACTIONS, DispatchContext } from "../../appContext";
import "./style.css";

export default function ChatItem({ data, onSelect }) {
  const dispatch = useContext(DispatchContext);

  const activateRoom = (e) => {
    e.stopPropagation();
    onSelect();
    dispatch({ type: ACTIONS.update_active_room, payload: data });
  };

  return (
    <div className="chat-item" onClick={activateRoom}>
      <div className="chat-item__wrapper">
        <div className="chat-item__img-wrapper">
          {data?.has_notification && (
            <span className="chat-item__notification"></span>
          )}
          <img
            className="chat-item__img"
            src="https://via.placeholder.com/64"
            alt="username"
            title="username"
          />
        </div>

        <div className="chat-item__content-wrapper">
          <div className="chat-item__content">
            <h4 className="chat-item__title">{data.name}</h4>
            <p className={`chat-item__subtitle hidden`}>
              <span className="me-1">{""}</span>
              <span>{""}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
