import React from "react";
import ChatForm from "../ChatForm";
import ChatContent from "../ChatContent";
import "./style.css";

export default function ChatBox() {
  return (
    <div className="chat-box">
      <div className="chat-box__wrapper">
        <ChatContent />
        <ChatForm />
      </div>
    </div>
  );
}
