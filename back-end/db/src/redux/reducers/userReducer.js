const initialState = {
  isLoggedIn: false,
  user: {},
  selectedTab: "Root",
  friendsTab: " My Friends (5)",
  kicksType: "Following",
  totalComments: [],
  totalReply: [],
  menuModalTab: "Nudity or Sexual activity",
  orgCategory: [],
  eventTabSelected: "Post",
  unionTab: "My Unions",
  unionFriendsTab: "Friends",
  unionMembersTab: "Members"
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_LOGIN_DATA":
      return {
        ...state,
        // isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user,
      };
    case "SELECT_TAB":
      return { ...state, selectedTab: action.payload };
    case "FRIENDS_TAB":
      return { ...state, friendsTab: action.payload };

    case "SELECT_KICKS_TYPE":
      return { ...state, kicksType: action.payload };

    case "MENU_MODAL_SELCTED_TAB":
      return { ...state, menuModalTab: action.payload };

    case "ADD_COMMENTS":
      return {
        ...state,
        totalComments: [...state.totalComments, action.payload],
      };
    case "ADD_REPLY":
      return {
        ...state,
        totalReply: [...state.totalReply, action.payload],
      };

    case "GET_ORG_CATEGORY":
      return { ...state, orgCategory: action.payload.data };
    case "SELECTED_TAB_SPONSERED_EVENT":
      return { ...state, eventTabSelected: action.payload };

    case "UNION_TAB_SELECTION":
      return { ...state, unionTab: action.payload };
    case "UNION_FRIENDS_TAB_SELECTION":
      return { ...state, unionFriendsTab: action.payload };

    case "UNION_MEMBERS_TAB_SELECTION":
      return { ...state, unionMembersTab: action.payload };
    default:
      return state;
  }
};

export default userReducer;
