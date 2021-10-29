import { createContext, useReducer, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
  updateProfile,
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
  set_submitting_form: false,
  create_room: "create_room",
  join_room: "join_room",
  edit_active_room: "edit_active_room",
  add_member_to_active_room: "add_member_to_active_room",
  info_active_room: "info_active_room",
  leave_active_room: "leave_room",
  delete_active_room: "delete_active_room",
  login: "login",
  update_login_form: "update_login_form",
  signup: "signup",
  update_signup_form: "update_signup_form",
  logout: "logout",
  set_auth_confirmed: "set_auth_confirmed",
  reset_login_form: "reset_login_form",
  reset_signup_form: "reset_signup_form",
};

const initialState = {
  msgInput: "",
  loginForm: {
    email: "",
    password: "",
  },
  signupForm: {
    uname: "",
    email: "",
    password: "",
  },
  modalIsOpen: false,
  currentUser: null,
  authConfirmed: false,
  submittingForm: false,
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
      title: "Edit room",
      action: ACTIONS.edit_active_room,
      admin_access: true,
    },
    {
      title: "Add new member",
      action: ACTIONS.add_member_to_active_room,
      admin_access: true,
    },
    {
      title: "Leave room",
      action: ACTIONS.leave_active_room,
      admin_access: false,
    },
    {
      title: "Delete room",
      action: ACTIONS.delete_active_room,
      admin_access: true,
    },
  ],
  errorMessages: {
    member_exists: "Member is already exists",
    member_not_found: "Member is not found",
    room_exists: "Room is already exists",
    room_not_found: "Room is not found",
    auth_wrong: "Wrong email or password",
    user_not_found: "User is not found in our system",
    user_exists: "User is already exists",
    auth_not_found: "User is not found",
    weak_password: "Weak password, Try something longer",
  },
};

export default function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchRooms = (client_id) => {
    const q = query(
      collection(getFirestore(), "rooms"),
      orderBy("createdAt", "desc"),
      where("membersId", "array-contains", client_id)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let rooms = [];
      querySnapshot.forEach((doc) => {
        const members = doc.data().members;
        const membersLen = members?.length;
        let client_isAdmin = false;
        if (membersLen) {
          for (let i = 0; i < membersLen; i++) {
            if (members[i].uid === client_id && members[i].isAdmin) {
              client_isAdmin = true;
              break;
            }
          }
        }
        rooms.push({
          ...doc.data(),
          id: doc.id,
          has_notification: false,
          client_isAdmin,
        });
      });

      dispatch({ type: ACTIONS.update_rooms, payload: rooms });
    });
  };

  useEffect(() => {
    // IIFE
    (async () => {
      getAuth().onAuthStateChanged(async (cred) => {
        if (cred) {
          const exists = await checkUserInDB(cred.uid);
          if (!exists) {
            await updateProfile(cred, {
              displayName: state.signupForm.uname,
              photoURL: "https://via.placeholder.com/64",
            });
            await addUserToDB({
              uid: cred.uid,
              uname: cred.displayName || state.signupForm.uname,
            });
            dispatch({ type: ACTIONS.set_auth_confirmed, payload: true });
          } else dispatch({ type: ACTIONS.set_auth_confirmed, payload: true });
          fetchRooms(cred.uid);
        }
        dispatch({ type: ACTIONS.update_current_user, payload: cred });
      });
    })();

    return () => {};
  }, [state.signupForm.uname, state.submittingForm]);

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

    case ACTIONS.set_auth_confirmed:
      return produce(state, (draftState) => {
        draftState["authConfirmed"] = payload;
      });

    case ACTIONS.update_login_form:
      return produce(state, (draftState) => {
        draftState["loginForm"] = {
          ...state.loginForm,
          ...payload,
        };
      });

    case ACTIONS.update_signup_form:
      return produce(state, (draftState) => {
        draftState["signupForm"] = {
          ...state.signupForm,
          ...payload,
        };
      });

    case ACTIONS.reset_login_form:
      return produce(state, (draftState) => {
        draftState["loginForm"] = { ...initialState.loginForm };
      });

    case ACTIONS.reset_signup_form:
      return produce(state, (draftState) => {
        draftState["signupForm"] = { ...initialState.signupForm };
      });

    default:
      return state;
  }
}

// ================
// functions (auth)

export const loginWithEmailAndPassword = ({ email, password }) =>
  signInWithEmailAndPassword(getAuth(), email, password);

export const registerWithEmailAndPassword = ({ email, password }) =>
  createUserWithEmailAndPassword(getAuth(), email, password);

export const logout = () => signOut(getAuth());

// =====================
// functions (firestore)

export const checkUserInDB = async (uid) => {
  const usersRef = collection(getFirestore(), "users");
  const userRef = await getDoc(doc(usersRef, uid));
  return userRef.data();
};

export const addUserToDB = async ({ uid, uname }) => {
  const usersRef = collection(getFirestore(), "users");
  const userExists = await checkUserInDB(uid);

  if (!userExists) {
    return setDoc(doc(usersRef, uid), {
      uid,
      uname,
    });
  } else return initialState.errorMessages.user_exists;
};

export const createRoom = ({ uid, uname, name, photoURL }) => {
  const roomsRef = collection(getFirestore(), "rooms");
  return setDoc(doc(roomsRef), {
    name: name,
    messages: [],
    membersId: [uid],
    members: [
      {
        uid: uid,
        uname: uname,
        isAdmin: true,
      },
    ],
    createdAt: Timestamp.fromDate(new Date()),
  });
};

export const editRoom = ({ id, name, photoURL }) => {
  const roomDocRef = doc(getFirestore(), "rooms", id);
  return updateDoc(roomDocRef, {
    name,
    photoURL: photoURL ? photoURL : "", // ignore
  });
};

export const addMemberToRoomById = async ({ id: room_id, uid }) => {
  const roomDocRef = doc(getFirestore(), "rooms", room_id);
  const roomDocData = (await getDoc(roomDocRef)).data();
  const userRef = doc(getFirestore(), "users", uid);

  if (roomDocData && userRef) {
    const oldMembers = roomDocData.members;
    const oldMembersId = roomDocData.membersId;

    const memberAlreadyExists =
      oldMembers.findIndex((m) => m.uid === uid) === -1 ? false : true;
    const userExists = await checkUserInDB(uid);
    if (!memberAlreadyExists) {
      if (userExists) {
        return updateDoc(roomDocRef, {
          members: [...oldMembers, { uid, uname: "", isAdmin: false }],
          membersId: [...oldMembersId, uid],
        });
      } else return initialState.errorMessages.user_not_found;
    } else return initialState.errorMessages.member_exists;
  } else return initialState.errorMessages.room_not_found;
};

export const removeMemberFromRoomById = async ({ id, uid }) => {
  const roomDocRef = doc(getFirestore(), "rooms", id);
  const roomExists = await checkRoomInDB(id);
  const memberExists = await checkMemberInRoom(id, uid);
  if (roomExists) {
    if (memberExists) {
      const oldMembers = roomExists.members;
      const oldMembersId = roomExists.membersId;
      const newMembers = oldMembers.filter(
        (mem) => mem.uid !== memberExists.uid
      );
      const newMembersId = oldMembersId.filter(
        (m_id) => m_id !== memberExists.uid
      );
      return await updateDoc(roomDocRef, {
        members: [...newMembers],
        membersId: [...newMembersId],
      }).then(async () => {
        const roomHasAdmins = checkRoomHasAdmins(id);
        if (!roomHasAdmins) {
          const randomMember = getRandomMember(id);
          await setAdminToRoom(id, randomMember.uid);
        } else {
          return await deleteRoom(roomExists.id);
        }
      });
    } else return initialState.errorMessages.member_not_found;
  } else return initialState.errorMessages.room_not_found;
};

export const deleteRoom = async ({ id, uid }) => {
  const roomDocRef = doc(getFirestore(), "rooms", id);
  const memberExists = await checkMemberInRoom(id, uid);
  const memberIsAdmin = checkMemberIsAdmin(id, uid);

  if (memberExists) {
    if (memberIsAdmin) {
      return deleteDoc(roomDocRef);
    }
  }
};

export const getRandomMember = async (id) => {
  const roomExists = await checkRoomInDB(id);

  if (roomExists) {
    const roomLength = roomExists.membersId;
    const randIndex = Math.floor(Math.random() * roomLength);
    return roomExists.members[randIndex];
  }
};

export const checkRoomHasNoMembers = async (id) => {
  const roomExists = await checkRoomInDB(id);
  return roomExists.membersId.length;
};

export const checkRoomHasAdmins = async (id) => {
  const roomExists = await checkRoomInDB(id);
  const members = roomExists.members;

  const isAdmin = members.find((mem) => mem.isAdmin === true);
  return isAdmin;
};

export const checkMemberIsAdmin = async (id, uid) => {
  const roomExists = await checkRoomInDB(id);
  const memberExists = await checkMemberInRoom(id, uid);

  if (memberExists) {
    const oldMembers = roomExists.members;
    const memberInRoom = oldMembers.find((mem) => mem.uid === memberExists.uid);
    return memberInRoom.isAdmin;
  }
};

export const setNotAdminToRoom = async ({ id, uid }) => {
  const roomDocRef = doc(getFirestore(), "rooms", id);
  const roomExists = await checkRoomInDB(id);
  const memberExists = await checkMemberInRoom(id, uid);

  if (roomExists) {
    if (memberExists) {
      const oldMembers = roomExists.members;
      const newMembers = oldMembers.map((mem) => {
        if (mem.uid === memberExists.uid) {
          return {
            ...mem,
            isAdmin: false,
          };
        }
        return mem;
      });
      return await updateDoc(roomDocRef, {
        members: [...newMembers],
      });
    }
  }
};

export const setAdminToRoom = async ({ id, uid }) => {
  const roomDocRef = doc(getFirestore(), "rooms", id);
  const roomExists = await checkRoomInDB(id);
  const memberExists = await checkMemberInRoom(id, uid);

  if (roomExists) {
    if (memberExists) {
      const oldMembers = roomExists.members;
      const newMembers = oldMembers.map((mem) => {
        if (mem.uid === memberExists.uid) {
          return {
            ...mem,
            isAdmin: true,
          };
        }
        return mem;
      });
      return await updateDoc(roomDocRef, {
        members: [...newMembers],
      });
    }
  }
};

export const checkRoomInDB = async (id) => {
  const roomDocRef = doc(getFirestore(), "rooms", id);
  const roomDocData = (await getDoc(roomDocRef)).data();
  return roomDocData;
};

export const checkMemberInRoom = async (id, uid) => {
  const roomExists = await checkRoomInDB(id);
  const userExists = await checkUserInDB(uid);

  if (roomExists) {
    if (userExists) {
      const oldMembersId = roomExists.membersId;
      return oldMembersId.includes(userExists.uid);
    }
  }
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
        createdAt: Timestamp.fromDate(new Date()),
      },
    ],
  });
};
