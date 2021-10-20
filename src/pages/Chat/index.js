import React from "react";
import { SideMenu, ChatBox } from "../../components";
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
