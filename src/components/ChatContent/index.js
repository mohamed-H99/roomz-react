import React from "react";
import ChatMessage from "../ChatMessage";
import "./style.css";

export default function ChatContent() {
  return (
    <div className="chat-content">
      <div className="chat-content__wrapper">
        <ChatMessage />
        <ChatMessage self={true} />
        <ChatMessage />
      </div>
    </div>
  );
}
