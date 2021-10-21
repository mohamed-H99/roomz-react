import React from "react";
import { formatDistanceToNow } from "date-fns";
import "./style.css";

export default function ChatMessage({ data, self }) {
  const date = formatDistanceToNow(data?.created_at.toDate());

  return (
    <div className={`chat-message ${self ? "chat-message__self" : ""}`}>
      <div className="chat-message__wrapper">
        <div className="chat-message__avatar-wrapper">
          <img
            className="chat-message__avatar"
            src="https://via.placeholder.com/32"
            alt={data?.author}
            title={data?.author}
          />
        </div>

        <div className="chat-message__content-wrapper">
          <div className="chat-message__content">{data?.content}</div>
        </div>
        <span className="chat-message__date">{date}</span>
      </div>
    </div>
  );
}
