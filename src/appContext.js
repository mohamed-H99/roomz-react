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
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getFirestore,
  Timestamp,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { produce } from "immer";

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
  add_member_to_active_room: "add_member_to_active_room",
  info_active_room: "info_active_room",
  leave_active_room: "leave_room",
  delete_active_room: "delete_active_room",
  logout: "logout",
};

const initialState = {
  msgInput: "",
  modalIsOpen: false,
  currentUser: null,
  rooms: [],
  activeRoom: null,
  menuOptions: [
    {
      title: "Create room",
      action: ACTIONS.create_room,
      admin_access: false,
    },
    {
      title: "Join room",
      action: ACTIONS.join_room,
      admin_access: false,
    },
    {
      title: "Logout",
      action: ACTIONS.logout,
      admin_access: false,
    },
  ],
  roomOptions: [
    {
      title: "Edit",
      action: ACTIONS.edit_active_room,
      admin_access: true,
    },
    {
      title: "Add new member",
      action: ACTIONS.add_member_to_active_room,
      admin_access: true,
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
  errorMessages: {
    member_exists: "Member is already exists",
    member_not_found: "Member is not found",
    room_exists: "Room is already exists",
    room_not_found: "Room is not found",
  },
};

export default function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchRooms = (client_id) => {
    const q = query(
      collection(getFirestore(), "rooms"),
      orderBy("created_at", "desc"),
      where("members_id", "array-contains", client_id)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let rooms = [];
      querySnapshot.forEach((doc) => {
        const members = doc.data().members;
        const membersLen = members?.length;
        let client_is_admin = false;
        if (membersLen) {
          for (let i = 0; i < membersLen; i++) {
            if (members[i].id === client_id && members[i].is_admin) {
              client_is_admin = true;
              break;
            }
          }
        }
        rooms.push({
          ...doc.data(),
          id: doc.id,
          has_notification: state.activeRoom?.id !== doc.id ? true : false,
          client_is_admin,
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
        draftState["modalIsOpen"] = true;
      });

    case ACTIONS.close_modal:
      return produce(state, (draftState) => {
        draftState["modalIsOpen"] = false;
      });

    case ACTIONS.update_current_user:
      return produce(state, (draftState) => {
        draftState["currentUser"] = payload;
      });

    case ACTIONS.update_msg_input:
      return produce(state, (draftState) => {
        draftState["msgInput"] = payload;
      });

    case ACTIONS.update_rooms:
      return produce(state, (draftState) => {
        draftState["rooms"] = payload;
        if (state.activeRoom && payload.length) {
          const updatedDoc = payload.find(
            (doc) => doc.id === state.activeRoom.id
          );
          draftState["activeRoom"] = updatedDoc;
        } else {
          draftState["activeRoom"] = null;
        }
      });

    case ACTIONS.update_active_room:
      return produce(state, (draftState) => {
        draftState["activeRoom"] = payload;
      });

    default:
      return state;
  }
}

// ===============
// basic functions

export const errorMsg = (msg) => ({ type: "error", message: msg });

export const successMsg = (msg) => ({ type: "success", message: msg });

// ================
// functions (auth)

export const loginWithGoogle = () =>
  signInWithPopup(getAuth(), new GoogleAuthProvider());

export const logout = () => signOut();

// =====================
// functions (firestore)

export const addUser = ({ uid, uname }) => {
  const usersRef = collection(getFirestore(), "users");
  return setDoc(doc(usersRef, uid), {
    uid,
    uname,
  });
};

export const createRoom = ({ uid, uname, name }) => {
  const roomsRef = collection(getFirestore(), "rooms");
  return setDoc(doc(roomsRef), {
    name: name,
    messages: [],
    members_id: [uid],
    members: [
      {
        uid: uid,
        uname: uname,
        is_admin: true,
      },
    ],
    created_at: Timestamp.fromDate(new Date()),
  });
};

export const editRoom = ({ id, name }) => {
  const roomDocRef = doc(getFirestore(), "rooms", id);
  return updateDoc(roomDocRef, {
    name,
  });
};

export const addMemberToRoom = async ({ id: room_id, uid, uname }) => {
  const roomDocRef = doc(getFirestore(), "rooms", room_id);
  const roomDocData = (await getDoc(roomDocRef)).data();
  const userRef = doc(getFirestore(), "users", uid);

  if (roomDocData && userRef) {
    const oldMembers = roomDocData.members;
    const oldMembersId = roomDocData.members_id;

    const member =
      oldMembers.findIndex((m) => m.id === uid) === -1 ? false : true;
    if (!member) {
      return updateDoc(roomDocRef, {
        members: [...oldMembers, { uid: uid, uname: uname, is_admin: false }],
        members_id: [...oldMembersId, uid],
      });
    } else return errorMsg(initialState.errorMessages.member_exists);
  } else return errorMsg(initialState.errorMessages.room_not_found);
};

export const leaveRoom = async ({ id, uid }) => {
  const roomDocRef = doc(getFirestore(), "rooms", id);
  const roomDocData = (await getDoc(roomDocRef)).data();
  if (roomDocData) {
    const oldMembers = roomDocData.members;
    const oldMembersId = roomDocData.members_id;
    const member = oldMembers.find((m) => m.uid === uid);
    if (member) {
      // && memberId
      const newMembers = oldMembers.filter((m) => m.uid !== member.uid);
      const newMembersId = oldMembersId.filter((m_id) => m_id !== member.uid);
      return updateDoc(roomDocRef, {
        members: [...newMembers],
        members_id: [...newMembersId],
      });
    } else return errorMsg(initialState.errorMessages.member_not_found);
  } else return errorMsg(initialState.errorMessages.room_not_found);
};

export const deleteRoom = ({ id }) => {
  const roomDocRef = doc(getFirestore(), "rooms", id);
  return deleteDoc(roomDocRef);
};

export const sendMessageToRoom = (oldMessages, { id, uid, uname, content }) => {
  const roomDocRef = doc(getFirestore(), "rooms", id);
  return updateDoc(roomDocRef, {
    messages: [
      ...oldMessages,
      {
        uid,
        uname,
        content,
        created_at: Timestamp.fromDate(new Date()),
      },
    ],
  });
};
