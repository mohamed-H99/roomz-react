import { useContext } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Chat from "./pages/Chat";
import Error from "./pages/Error";
import ReactModal from "react-modal";
import { ACTIONS, DispatchContext, StateContext } from "./appContext";
import CreateRoomModal from "./components/Modal/CreateRoom";
import JoinRoomModal from "./components/Modal/JoinRoom";
import EditRoomModal from "./components/Modal/EditRoom";
import LeaveRoomModal from "./components/Modal/LeaveRoom";
import InfoRoomModal from "./components/Modal/InfoRoom";
import DeleteRoomModal from "./components/Modal/DeleteRoom";
import { ToastContainer } from "react-toastify";
import AddMemberRoomModal from "./components/Modal/AddMemberRoom";
import LogoutModal from "./components/Modal/Logout";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/style.css";

function App() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const modalType = useLocation().search.slice(1);

  const handleDiscard = () => dispatch({ type: ACTIONS.close_modal });

  return (
    <>
      <Switch>
        <Route path="/" exact component={Chat} />
        <Route path="/404" exact component={Error} />
        <Redirect to="/404" />
      </Switch>

      <ReactModal isOpen={state.modalIsOpen} ariaHideApp={false}>
        {modalType === ACTIONS.create_room && (
          <CreateRoomModal onDiscard={handleDiscard} />
        )}
        {modalType === ACTIONS.join_room && (
          <JoinRoomModal onDiscard={handleDiscard} />
        )}
        {modalType === ACTIONS.edit_active_room && (
          <EditRoomModal onDiscard={handleDiscard} />
        )}
        {modalType === ACTIONS.add_member_to_active_room && (
          <AddMemberRoomModal onDiscard={handleDiscard} />
        )}
        {modalType === ACTIONS.info_active_room && (
          <InfoRoomModal onDiscard={handleDiscard} />
        )}
        {modalType === ACTIONS.leave_active_room && (
          <LeaveRoomModal onDiscard={handleDiscard} />
        )}
        {modalType === ACTIONS.delete_active_room && (
          <DeleteRoomModal onDiscard={handleDiscard} />
        )}
        {modalType === ACTIONS.logout && (
          <LogoutModal onDiscard={handleDiscard} />
        )}
      </ReactModal>

      <ToastContainer />
    </>
  );
}

export default App;
