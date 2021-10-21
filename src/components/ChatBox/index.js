import React, { useContext } from "react";
import ChatForm from "../ChatForm";
import ChatContent from "../ChatContent";
import "./style.css";
import { StateContext } from "../../appContext";

export default function ChatBox() {
  const { activeRoom } = useContext(StateContext);

  return (
    <div className="chat-box">
      <div className="chat-box__wrapper">
        {activeRoom && (
          <>
            <ChatContent />
            <ChatForm />
          </>
        )}
      </div>
    </div>
  );
}
