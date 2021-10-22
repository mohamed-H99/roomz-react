import React, { useContext } from "react";
import { StateContext } from "../../appContext";
import Dropdown from "../Base/Dropdown";
import "./style.css";

export default function ChatHeader() {
  const { activeRoom, currentUser, roomOptions } = useContext(StateContext);

  return (
    <div className="chat-header">
      <div className="chat-header__wrapper">
        <div className="chat-header__info">
          <div className="chat-header__avatar-wrapper">
            <img
              className="chat-header__avatar"
              src="https://via.placeholder.com/64"
              alt={activeRoom?.name}
              title={activeRoom?.name}
            />
          </div>
          <div className="chat-header__content-wrapper">
            <div className="chat-header__content">
              <h2 className="chat-header__content-title">{activeRoom?.name}</h2>
              <p className="chat-header__content-subtitle">{`${
                activeRoom?.members?.length
              } member${activeRoom?.members?.length > 1 ? "s" : ""}`}</p>
            </div>
          </div>
        </div>

        <div className="chat-header__options">
          <Dropdown links={roomOptions} />
        </div>
      </div>
    </div>
  );
}
