import React from "react";
import SideMenu from "../../components/SideMenu";
import ChatBox from "../../components/ChatBox";
import "./style.css";

export default function Chat() {
  return (
    <div className="chat-page">
      <div className="chat-page__wrapper">
        <SideMenu />
        <ChatBox />
      </div>
    </div>
  );
}
