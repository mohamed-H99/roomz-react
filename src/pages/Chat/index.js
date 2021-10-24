import React, { useContext, useEffect } from "react";
import SideMenu from "../../components/SideMenu";
import ChatBox from "../../components/ChatBox";
import { ACTIONS, DispatchContext, StateContext } from "../../appContext";
import "./style.css";
import { useHistory } from "react-router";
import AuthForm from "../../components/AuthForm";

export default function Chat() {
  const dispatch = useContext(DispatchContext);
  const { activeRoom, currentUser } = useContext(StateContext);
  const history = useHistory();

  useEffect(() => {
    if (!currentUser) {
    } else {
    }

    return () => {};
  }, [dispatch, history, currentUser]);

  return !!currentUser ? (
    <div className="chat-page">
      <div className="chat-page__wrapper">
        <SideMenu />
        {activeRoom && <ChatBox />}
      </div>
    </div>
  ) : (
    <AuthForm />
  );
}
