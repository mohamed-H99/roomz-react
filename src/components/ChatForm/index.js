import React from "react";
import { Send } from "react-feather";
import "./style.css";

export default function ChatForm() {
  return (
    <form className="chat-form">
      <div className="chat-form__wrapper">
        <div className="chat-form__group">
          <input
            className="chat-form__control"
            placeholder="Enter your message here.."
          />
          <button className="chat-form__btn">
            <Send />
          </button>
        </div>
      </div>
    </form>
  );
}
