import React from "react";
import ChatItem from "../ChatItem";
import "./style.css";

export default function SideMenu() {
  return (
    <aside className="side-menu">
      <div className="side-menu__wrapper">
        <ul className="side-menu__list">
          <li className="side-menu__item">
            <ChatItem />
          </li>
          <li className="side-menu__item">
            <ChatItem />
          </li>
          <li className="side-menu__item">
            <ChatItem />
          </li>
          <li className="side-menu__item">
            <ChatItem />
          </li>
          <li className="side-menu__item">
            <ChatItem />
          </li>
        </ul>
      </div>
    </aside>
  );
}
