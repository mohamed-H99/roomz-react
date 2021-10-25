import React, { useContext } from "react";
import SideMenu from "../../components/SideMenu";
import ChatBox from "../../components/ChatBox";
import { StateContext } from "../../appContext";
import "./style.css";
import Auth from "../../components/Auth";

export default function Chat() {
  const { activeRoom, currentUser } = useContext(StateContext);

  return !!currentUser ? (
    <div className="chat-page">
      <div className="chat-page__wrapper">
        <SideMenu />
        {activeRoom && <ChatBox />}
      </div>
    </div>
  ) : (
    <Auth />
  );
}
