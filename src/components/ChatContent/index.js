import React, { useContext, useEffect, useRef } from "react";
import { StateContext } from "../../appContext";
import ChatMessage from "../ChatMessage";
import "./style.css";

export default function ChatContent() {
  const { activeRoom, currentUser } = useContext(StateContext);

  const wrapperRef = useRef(null);

  const dynamicContentScrolling = () => {
    const wrapper = wrapperRef.current;
    if (wrapper && wrapper.scrollTop <= wrapper.scrollHeight) {
      wrapper.scrollTop = wrapper.scrollHeight;
    }
  };

  useEffect(() => {
    dynamicContentScrolling();

    return () => {};
  }, [activeRoom]);

  return (
    <div className="chat-content">
      <div className="chat-content__wrapper" ref={wrapperRef}>
        {activeRoom?.messages?.map((msg, idx) => (
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
