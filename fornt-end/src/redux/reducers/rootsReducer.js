const initialState = {
  kicksList: [],
  postList: [],
  likedDetails: {},
  activePost: {},
};

const rootsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_KICKS_VIDEOS_WITH_LIMITS":
      return {
        ...state,
        kicksList: [action.payload, ...state.kicksList],
      };
    case "GET_ALL_POST_WITH_LIMITS":
      return {
        ...state,
        postList: [action.payload, ...state.postList],
      };

    case "GET_LIKE_BY_POST_ID":
      return {
        ...state,
        likedDetails: action.payload,
      };
    case "ACTIVE_POST":
      return {
        ...state,
        activePost: action.payload,
      };
    case "GET_POST_LIST":
      return { ...state, postList: [...action.payload.data.content, ...state.postList, ] };
    case "INCREASE_COMMENT_COUNT":
      const { postList } = state;
      const newData = postList.map((item) => {
        return item?.id === action.payload
          ? { ...item, commentcount: item.commentcount + 1 }
          : item;
      });
      return { ...state, postList: newData };

    case "INCREASE_LIKE_COUNT":
      const { postList: allPost } = state;
      const newPostList = allPost.map((item) => {
        return item?.id === action.payload
          ? { ...item, likecount: item.likecount + 1, isliked: true }
          : item;
      });
      return { ...state, postList: newPostList };

    case "DECREASE_LIKE_COUNT":
      const { postList: allPostList } = state;
      const desliked = allPostList.map((item) => {
        return item?.id === action.payload
          ? { ...item, likecount: item.likecount - 1, isliked: false}
          : item;
      });
      return { ...state, postList: desliked };
    default:
      return state;
  }
};

export default rootsReducer;
