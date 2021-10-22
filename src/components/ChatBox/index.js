import React from "react";
import ChatHeader from "../ChatHeader";
import ChatForm from "../ChatForm";
import ChatContent from "../ChatContent";
import "./style.css";

export default function ChatBox() {
  return (
    <div className="chat-box">
      <div className="chat-box__wrapper">
        <ChatHeader />
        <ChatContent />
        <ChatForm />
      </div>
    </div>
  );
}
