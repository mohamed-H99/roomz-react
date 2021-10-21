import React from "react";
import ChatItem from "../ChatItem";
import { Search, Plus, Users } from "react-feather";
import "./style.css";

export default function SideMenu() {
  return (
    <aside className="side-menu">
      <div className="side-menu__wrapper">
        <form className="side-menu__form">
          <div className="side-menu__form-wrapper">
            <div className="side-menu__form-search">
              <Search />
              <input
                className="side-menu__form-control"
                type="text"
                placeholder="Search for.."
              />
            </div>
            <button className="side-menu__form-btn">
              <Plus />
            </button>
            <button className="side-menu__form-btn">
              <Users />
            </button>
          </div>
        </form>

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
