import React, { useContext, useEffect, useRef, useState } from "react";
import Dropdown from "../Base/Dropdown";
import ChatItem from "../ChatItem";
import { Search, Plus, Users, Menu } from "react-feather";
import "./style.css";
import { ACTIONS, DispatchContext, StateContext } from "../../appContext";
import { useHistory } from "react-router";

export default function SideMenu() {
  const dispatch = useContext(DispatchContext);
  const { rooms, menuOptions } = useContext(StateContext);
  const [state, setState] = useState({
    search: "",
    rooms: [],
  });
  const history = useHistory();

  const handleChange = (e) =>
    setState((prev) => ({ ...prev, search: e.target.value }));

  const handleLocalSearch = (value) => {
    let filteredRooms = [];
    if (value) {
      rooms.forEach((room) => {
        const res = room.name.match(value);
        if (res) filteredRooms.push(room);
      });
      setState((prev) => ({ ...prev, rooms: filteredRooms }));
    } else {
      setState((prev) => ({ ...prev, rooms }));
    }
  };

  useEffect(() => {
    handleLocalSearch(state.search.trim());

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.search, rooms]);

  const openModal = (e, type) => {
    e.preventDefault();
    history.push(`?${type}`);
    dispatch({ type: ACTIONS.open_modal });
  };

  const sideMenuRef = useRef(null);

  const toggleSideMenu = (e) => {
    e?.preventDefault();
    const sideMenu = sideMenuRef.current;
    if (sideMenu) {
      sideMenu.classList.toggle("active");
    }
  };

  return (
    <aside className="side-menu" ref={sideMenuRef}>
      <button className="side-menu__toggle" onClick={toggleSideMenu}>
        <Menu />
      </button>
      <div className="side-menu__wrapper">
        <form className="side-menu__form">
          <div className="side-menu__form-wrapper">
            <div className="side-menu__form-search">
              <Search />
              <input
                className="side-menu__form-control"
                type="text"
                placeholder="Search.."
                onChange={handleChange}
              />
            </div>
            <Dropdown variant="" links={menuOptions}>
              <Users />
            </Dropdown>
          </div>
        </form>

        <ul className="side-menu__list">
          {state.rooms.length
            ? state.rooms.map((room) => (
                <li className="side-menu__item" key={room.id}>
                  <ChatItem data={room} onSelect={toggleSideMenu} />
                </li>
              ))
            : ""}
        </ul>
      </div>
    </aside>
  );
}
