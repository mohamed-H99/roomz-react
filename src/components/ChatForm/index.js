import React, { useContext } from "react";
import { Send } from "react-feather";
import {
  DispatchContext,
  ACTIONS,
  StateContext,
  sendMessageToRoom,
} from "../../appContext";
import "./style.css";

export default function ChatForm() {
  const dispatch = useContext(DispatchContext);
  const { msgInput, activeRoom, currentUser } = useContext(StateContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (msgInput)
      await sendMessageToRoom(activeRoom?.messages, {
        id: activeRoom?.id,
        author_id: currentUser?.uid,
        author_name: currentUser?.displayName, // [providerNaming]
        content: msgInput.trim(),
      });

    dispatch({ type: ACTIONS.update_msg_input, payload: "" });
  };

  const handleChange = (e) =>
    dispatch({
      type: ACTIONS.update_msg_input,
      payload: e.target.value,
    });

  return (
    <form className="chat-form" onSubmit={handleSubmit}>
      <div className="chat-form__wrapper">
        <div className="chat-form__group">
          <input
            className="chat-form__control"
            placeholder="Enter your message here.."
            onChange={handleChange}
            value={msgInput}
          />
          <button className="chat-form__btn">
            <Send />
          </button>
        </div>
      </div>
    </form>
  );
}
