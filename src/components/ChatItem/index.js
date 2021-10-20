import React from "react";
import "./style.css";

export default function ChatItem() {
  return (
    <div className="chat-item">
      <div className="chat-item__wrapper">
        <div className="chat-item__img-wrapper">
          <span className="chat-item__notification"></span>
          <img
            className="chat-item__img"
            src="https://via.placeholder.com/64"
            alt="username"
            title="username"
          />
        </div>

        <div className="chat-item__content-wrapper">
          <div className="chat-item__content">
            <h4 className="chat-item__title">{"Room Surname"}</h4>
            <p className="chat-item__subtitle">
              <span className="me-1">{"[User]"}</span>
              <span>
                {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.".slice(
                  0,
                  30
                ) + "..."}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
