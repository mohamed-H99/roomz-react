import React, { useContext } from "react";
import SideMenu from "../../components/SideMenu";
import ChatBox from "../../components/ChatBox";
import { StateContext } from "../../appContext";
import "./style.css";

export default function Chat() {
  const { activeRoom } = useContext(StateContext);

  return (
    <div className="chat-page">
      <div className="chat-page__wrapper">
        <SideMenu />
        {activeRoom && <ChatBox />}
      </div>
    </div>
  );
}
