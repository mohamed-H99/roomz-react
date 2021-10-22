import { createContext, useReducer, useEffect } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getFirestore,
  Timestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { produce } from "immer";
// import { formatDistanceToNow } from "date-fns";

export const StateContext = createContext();
export const DispatchContext = createContext();

export const ACTIONS = {
  open_modal: "open_modal",
  close_modal: "close_modal",
  update_msg_input: "update_msg_input",
  update_current_user: "update_current_user",
  update_rooms: "update_rooms",
  filter_rooms: "filter_rooms",
  update_active_room: "update_active_room",
  create_room: "create_room",
  join_room: "join_room",
  edit_active_room: "edit_active_room",
  info_active_room: "info_active_room",
  leave_active_room: "leave_room",
  delete_active_room: "delete_active_room",
};

const initialState = {
  msgInput: "",
  modalIsOpen: false,
  currentUser: null,
  rooms: [],
  activeRoom: null,
  roomOptions: [
    {
      title: "Edit",
      action: ACTIONS.edit_active_room,
      admin_access: true,
    },
    {
      title: "Info",
      action: ACTIONS.info_active_room,
      admin_access: false,
    },
    {
      title: "Leave",
      action: ACTIONS.leave_active_room,
      admin_access: false,
    },
    {
      title: "Delete",
      action: ACTIONS.delete_active_room,
      admin_access: true,
    },
  ],
};

export default function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchRooms = (client_id) => {
    const q = query(
      collection(getFirestore(), "rooms"),
      orderBy("created_at", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let rooms = [];
      querySnapshot.forEach((doc) => {
        const admins = doc.data().admins;
        const adminsLen = admins?.length;
        let client_is_admin = false;
        if (adminsLen) {
          for (let i = 0; i < adminsLen; i++) {
            if (admins[i].admin_id === client_id) {
              client_is_admin = true;
              break;
            }
          }
        }
        rooms.push({
          ...doc.data(),
          id: doc.id,
          has_notification: state.activeRoom?.id !== doc.id ? true : false,
          client_admin: client_is_admin,
        });
      });

      // querySnapshot.docChanges().forEach(({ type, doc }) => {
      //   switch (type) {
      //     case "added":
      //       break;
      //     case "modified":
      //       break;
      //     case "removed":
      //       break;
      //     default:
      //       break;
      //   }
      // });

      dispatch({ type: ACTIONS.update_rooms, payload: rooms });
    });
  };

  const fetchMainData = () => {
    getAuth().onAuthStateChanged((cred) => {
      fetchRooms(cred?.uid);
      dispatch({ type: ACTIONS.update_current_user, payload: cred });
    });
  };

  useEffect(() => {
    fetchMainData();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
}

// reducer
function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.open_modal:
      return produce(state, (draftState) => {
        draftState[`modalIsOpen`] = true;
      });

    case ACTIONS.close_modal:
      return produce(state, (draftState) => {
        draftState[`modalIsOpen`] = false;
      });

    case ACTIONS.update_current_user:
      return produce(state, (draftState) => {
        draftState[`currentUser`] = payload;
      });

    case ACTIONS.update_msg_input:
      return produce(state, (draftState) => {
        draftState[`msgInput`] = payload;
      });

    case ACTIONS.update_rooms:
      return produce(state, (draftState) => {
        draftState[`rooms`] = payload;
        if (state.activeRoom && payload.length) {
          const updatedDoc = payload.find(
            (doc) => doc.id === state.activeRoom.id
          );
          draftState[`activeRoom`] = updatedDoc;
        } else {
          draftState[`activeRoom`] = null;
        }
      });

    case ACTIONS.update_active_room:
      return produce(state, (draftState) => {
        draftState[`activeRoom`] = payload;
      });

    default:
      return state;
  }
}

// ================
// functions (auth)

export const loginWithGoogle = () =>
  signInWithPopup(getAuth(), new GoogleAuthProvider());

export const logout = () => signOut();

// =====================
// functions (firestore)

export const createRoom = (data) => {
  return setDoc(doc(collection(getFirestore(), "rooms")), {
    name: data.name,
    messages: [],
    admins: [
      {
        admin_id: data.uid,
        admin_name: data.uname,
      },
    ],
    members: [
      {
        member_id: data.uid,
        member_name: data.uname,
        is_admin: true,
      },
    ],
    created_at: Timestamp.fromDate(new Date()),
  });
};

export const joinRoom = (data) => {
  console.log("in progress::", data);
};

export const editRoom = ({ id, name }) => {
  const roomDocRef = doc(getFirestore(), "rooms", id);
  return updateDoc(roomDocRef, {
    name,
  });
};

export const leaveRoom = (data) => {
  console.log("in progress::", data);
};

export const deleteRoom = ({ id }) => {
  const roomDocRef = doc(getFirestore(), "rooms", id);
  return deleteDoc(roomDocRef);
};

export const sendMessageToRoom = (
  oldMessages,
  { id, author_id, author_name, content }
) => {
  const roomDocRef = doc(getFirestore(), "rooms", id);
  return updateDoc(roomDocRef, {
    messages: [
      ...oldMessages,
      {
        author_id,
        author_name,
        content,
        created_at: Timestamp.fromDate(new Date()),
      },
    ],
  });
};
