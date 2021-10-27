import { Fragment, useContext, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useHistory } from "react-router";
import { ACTIONS, DispatchContext, StateContext } from "../../../storeProvider";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown({ links, variant, children }) {
  const dispatch = useContext(DispatchContext);
  const { activeRoom } = useContext(StateContext);
  const [accessibleLinks, setAccessibleLinks] = useState([]);
  const history = useHistory();

  const getAccessLinks = () => {
    if (!activeRoom?.client_is_admin && links?.length) {
      const newLinks = links.filter((link) => !link.admin_access);
      setAccessibleLinks(newLinks);
    } else {
      setAccessibleLinks(links);
    }
  };

  useEffect(() => {
    getAccessLinks();

    return () => setAccessibleLinks([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [links]);

  const handleClick = (e, action) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.open_modal });
    history.push(`?${action}`);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className={`btn btn-${variant} bg-white text-gray shadow rounded-full p-0 text-xs h-12 w-12 flex justify-center items-center`}
        >
          {children}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right z-50 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {accessibleLinks.map((link, idx) => {
              return (
                <Menu.Item key={idx}>
                  {({ active }) => (
                    <button
                      href="#"
                      className={classNames(
                        active
                          ? "bg-gray-lightest text-gray-darkest"
                          : "text-gray-dark",
                        "block px-4 py-2 text-sm w-full text-left"
                      )}
                      onClick={(e) => handleClick(e, link.action)}
                    >
                      {link.title}
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
