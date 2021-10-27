import React, { useContext } from "react";
import { ACTIONS, DispatchContext, StateContext } from "../../storeProvider";
import Dropdown from "../Base/Dropdown";
import { Info, Settings } from "react-feather";
import "./style.css";
import Button from "../Base/Button";
import { useHistory } from "react-router";

export default function ChatHeader() {
  const dispatch = useContext(DispatchContext);
  const { activeRoom, roomOptions } = useContext(StateContext);
  const history = useHistory();

  const showInfo = (e) => {
    e.stopPropagation();
    dispatch({ type: ACTIONS.open_modal });
    history.push(`?${ACTIONS.info_active_room}`);
  };

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
          <Button
            variant=""
            className="bg-white text-gray shadow rounded-full p-0 text-xs h-12 w-12 flex justify-center items-center"
            onClick={showInfo}
          >
            <Info />
          </Button>
          <Dropdown variant="" links={roomOptions}>
            <Settings />
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
