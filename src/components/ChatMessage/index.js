import React from "react";
import "./style.css";

export default function ChatMessage({ self }) {
  return (
    <div className={`chat-message ${self ? "chat-message__self" : ""}`}>
      <div className="chat-message__wrapper">
        <div className="chat-message__avatar-wrapper">
          <img
            className="chat-message__avatar"
            src="https://via.placeholder.com/32"
            alt="user"
            title="user"
          />
        </div>

        <div className="chat-message__content-wrapper">
          <div className="chat-message__content">{"Hey there, whatsup!!"}</div>
        </div>
        <span className="chat-message__date">{'5 minutes'}</span>
      </div>
    </div>
  );
}
