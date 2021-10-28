import { useContext } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Chat from "./pages/Chat";
import Auth from "./components/Auth";
import Error from "./pages/Error";
import ReactModal from "react-modal";
import { ACTIONS, DispatchContext, StateContext } from "./storeProvider";
import CreateForm from "./components/Base/Form/Create";
import JoinForm from "./components/Base/Form/Join";
import EditForm from "./components/Base/Form/Edit";
import LeaveForm from "./components/Base/Form/Leave";
import InfoForm from "./components/Base/Form/Info";
import DeleteForm from "./components/Base/Form/Delete";
import AddMemberForm from "./components/Base/Form/AddMember";
import LogoutForm from "./components/Base/Form/Logout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/style.css";

function App() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const modalType = useLocation().search.slice(1);

  const handleDiscard = (e) => {
    e?.preventDefault();
    dispatch({ type: ACTIONS.close_modal });
  };

  return (
    <>
      <Switch>
        <Route
          path="/"
          exact
          render={(props) =>
            state.authConfirmed ? <Chat {...props} /> : <Auth {...props} />
          }
        />
        <Route path="/404" exact component={Error} />
        <Redirect to="/404" />
      </Switch>

      {/* modal */}
      <ReactModal isOpen={state.modalIsOpen} ariaHideApp={false}>
        {modalType === ACTIONS.create_room && (
          <CreateForm onDiscard={handleDiscard} />
        )}
        {modalType === ACTIONS.join_room && (
          <JoinForm onDiscard={handleDiscard} />
        )}
        {modalType === ACTIONS.edit_active_room && (
          <EditForm onDiscard={handleDiscard} />
        )}
        {modalType === ACTIONS.add_member_to_active_room && (
          <AddMemberForm onDiscard={handleDiscard} />
        )}
        {modalType === ACTIONS.info_active_room && (
          <InfoForm onDiscard={handleDiscard} />
        )}
        {modalType === ACTIONS.leave_active_room && (
          <LeaveForm onDiscard={handleDiscard} />
        )}
        {modalType === ACTIONS.delete_active_room && (
          <DeleteForm onDiscard={handleDiscard} />
        )}
        {modalType === ACTIONS.logout && (
          <LogoutForm onDiscard={handleDiscard} />
        )}
      </ReactModal>

      {/* notification container */}
      <ToastContainer />
    </>
  );
}

export default App;
