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
import { formatDistanceToNow } from "date-fns";

export const StateContext = createContext();
export const DispatchContext = createContext();

export const ACTIONS = {
  open_modal: "open_modal",
  close_modal: "close_modal",
  update_msg_input: "update_msg_input",
  update_current_user: "update_current_user",
  update_rooms: "update_rooms",
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

  const getRooms = () => {
    const q = query(
      collection(getFirestore(), "rooms"),
      orderBy("created_at", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((doc) => {
        const created_distance = formatDistanceToNow(
          doc.data()?.created_at.toDate()
        );
        arr.push({ ...doc.data(), id: doc.id, created_distance });
      });
      dispatch({ type: ACTIONS.update_rooms, payload: arr });
    });
  };

  // const getRoomById = async (id) => {
  //   const unsub = onSnapshot(
  //     doc(getFirestore(), "rooms", id),
  //     { includeMetadataChanges: true },
  //     (doc) => {
  //       dispatch({
  //         type: ACTIONS.update_active_room,
  //         payload: { ...doc.data(), id: doc.id },
  //       });
  //     }
  //   );
  // };

  useEffect(() => {
    getAuth().onAuthStateChanged((cred) =>
      dispatch({ type: ACTIONS.update_current_user, payload: cred })
    );

    getRooms();
    // if (state.activeRoom?.id) getRoomById(state.activeRoom?.id);

    return () => {};
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
        if (state.activeRoom) {
          if (!payload.length) draftState[`activeRoom`] = null;
          else
            payload.forEach((room) => {
              if (room.id === state.activeRoom?.id) {
                console.log(room.id, " = ", state.activeRoom?.id);
                draftState[`activeRoom`] = room;
              }
            });
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
    members: [
      {
        member_id: data.uid,
        admin: true,
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

export const sendMessageToRoomById = (
  oldMessages,
  { id, author_id, author, content }
) => {
  const roomDocRef = doc(getFirestore(), "rooms", id);
  return updateDoc(roomDocRef, {
    messages: [
      ...oldMessages,
      {
        author_id,
        author,
        content,
        created_at: Timestamp.fromDate(new Date()),
      },
    ],
  });
};
