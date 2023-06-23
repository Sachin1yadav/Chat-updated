const initialState = {
  friendBlockList: [],
  searchBlockedFriend:[],
};

const settingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BLOCK_FRIEND_LIST":
      return { ...state, friendBlockList: action.payload };
    case "SEARCH_BLOCK_FRIEND":
        console.log("action PAyload", action.payload);
      return { ...state, searchBlockedFriend: action.payload };
    default:
      return state;
  }
};

export default settingReducer;
