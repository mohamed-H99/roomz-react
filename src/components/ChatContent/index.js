import React, { useContext } from "react";
import { StateContext } from "../../appContext";
import ChatMessage from "../ChatMessage";
import "./style.css";

export default function ChatContent() {
  const { activeRoom, currentUser } = useContext(StateContext);

  return (
    <div className="chat-content">
      <div className="chat-content__wrapper">
        {activeRoom?.messages.map((msg, idx) => (
          <ChatMessage
            key={idx}
            data={msg}
            self={currentUser?.uid === msg.author_id ? true : false}
          />
        ))}
      </div>
    </div>
  );
}
