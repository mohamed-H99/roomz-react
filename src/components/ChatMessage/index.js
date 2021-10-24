import React from "react";
import { formatDistanceToNow } from "date-fns";
import "./style.css";

export default function ChatMessage({ data, self }) {
  const dateDistanceToNow = formatDistanceToNow(data?.created_at.toDate());

  return (
    <div className={`chat-message ${self ? "__self" : ""}`}>
      <div className="chat-message__wrapper">
        <div className="chat-message__avatar-wrapper">
          <img
            className="chat-message__avatar"
            src="https://via.placeholder.com/32"
            alt={data?.uname}
            title={data?.uname}
          />
        </div>

        <div className="chat-message__content-wrapper">
          <div className="chat-message__content">{data?.content}</div>
        </div>
        <span className="chat-message__date">{dateDistanceToNow}</span>
      </div>
    </div>
  );
}
