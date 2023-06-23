const initialState = {
  eventData: {},
  total_participant_count: null,
  defaultRootData:{},
  defaultEventData: {},
  allEventsPost: [],
  allTrendingPost:[]
};

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RECIVED_EVENT_DATA":
      return {
        ...state,
        eventData: action.payload.postData,
        total_participant_count: action.payload.total_participant_count,
      };
    case "DEFAULT_ROOT_SCREEN":
      return {
        ...state,
        defaultRootData:action.payload,
      };
    case "DEFAULT_EVENT_SCREEN":
      return {
        ...state,
        defaultEventData: action.payload,
      };

    case "GET_ALL_EVENTS_POST_LIST":
      return {
        ...state,
        allEventsPost:  action.payload.data ,
      };
    case "TRENDING_EVENTS_POST_LIST":
      return {
        ...state,
        allTrendingPost:  action.payload.data ,
      };
    case "INCREASE_LIKE_COUNT":
      const data = state.allEventsPost?.map((item) => {
        return item?.id === action.payload ? {...item, likecount: item?.likecount + 1, isliked: true} : item
      })

      const trending = state.allTrendingPost?.map((item) => {
        return item?.id === action.payload ? {...item, likecount: item?.likecount + 1, isliked: true} : item
      })
      
      return { ...state, allEventsPost: data, allTrendingPost: trending}
    case "DECREASE_LIKE_COUNT":
        const eventData = state.allEventsPost?.map((item) => {
          return item?.id === action.payload ? {...item, likecount: item?.likecount - 1, isliked: false} : item
        })

        const trendingData = state.allTrendingPost?.map((item) => {
          return item?.id === action.payload ? {...item, likecount: item?.likecount - 1, isliked: false} : item
        })

        return { ...state, allEventsPost: eventData, allTrendingPost: trendingData}
    case "INCREASE_COMMENT_COUNT": 
        const commentData = state.allEventsPost?.map((item) => {
          return item?.id === action.payload ? { ...item, commentcount: item?.commentcount + 1} : item
        });

        const trendingCommentData = state.allTrendingPost?.map((item) => {
          return item?.id === action.payload ? { ...item, commentcount: item?.commentcount + 1} : item
        });
        return { ...state, allEventsPost: commentData, allTrendingPost: trendingCommentData}
    default:
      return state;
  }
};
