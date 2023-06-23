const initialState = {
  latestKicks: [],
  trendingKicks: [],
  followingKicks: [],
  comments: [],
  reply: [],
  segment: "Following",
  kicksVideoList: [],
  kicksTagList: [],
  profileList: [],
  userKickList: [],
  getData: true
};

const kicksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LATEST_KICKS":
      return { ...state, latestKicks: action.payload.data };
    case "GET_TRENDING_KICKS":
      return { ...state, trendingKicks: action.payload.data };
    case "GET_FOLLOWING_KICKS":
      return { ...state, followingKicks: action.payload.data };

    case "INCREASE_LIKE":
      const { followingKicks, latestKicks, trendingKicks } = state;
      if (state.segment === "Following") {
        const liked = followingKicks.content.map((item) => {
          return action.payload === item.id
            ? { ...item, isliked: true, likecount: item?.likecount + 1 }
            : item;
        });

        return {
          ...state,
          totalLikes: action.payload.data,
          followingKicks: { ...followingKicks, content: liked },
        };
      } else if (state.segment === "Trending") {
        const liked = trendingKicks.content.map((item) => {
          return action.payload === item.id
            ? { ...item, isliked: true, likecount: item?.likecount + 1 }
            : item;
        });
        return {
          ...state,
          totalLikes: action.payload.data,
          trendingKicks: { ...trendingKicks, content: liked },
        };
      } else if (state.segment === "Latest") {
        const liked = latestKicks.content.map((item) => {
          return action.payload === item.id
            ? { ...item, isliked: true, likecount: item?.likecount + 1 }
            : item;
        });
        return {
          ...state,
          totalLikes: action.payload.data,
          latestKicks: { ...latestKicks, content: liked },
        };
      }

    case "REMOVE_LIKE":
      const { followingKicks: followingKick, latestKicks: latestKick, trendingKicks: trendingKick } = state;
      if (state.segment === "Following") {
        const liked = followingKick.content.map((item) => {
          return action.payload === item.id
            ? { ...item, isliked: false, likecount: item?.likecount - 1 }
            : item;
        });
        return {
          ...state,
          totalLikes: action.payload.data,
          followingKicks: { ...followingKick, content: liked },
        };
      } else if (state.segment === "Trending") {
        const liked = trendingKick.content.map((item) => {
          return action.payload === item.id
            ? { ...item, isliked: false, likecount: item?.likecount - 1 }
            : item;
        });
        return {
          ...state,
          totalLikes: action.payload.data,
          trendingKicks: { ...trendingKick, content: liked },
        };
      } else if (state.segment === "Latest") {
        const liked = latestKick.content.map((item) => {
          return action.payload === item.id
            ? { ...item, isliked: false, likecount: item?.likecount - 1 }
            : item;
        });
        return {
          ...state,
          totalLikes: action.payload.data,
          latestKicks: { ...latestKick, content: liked },
        };
      }
    case 'INCREASE_COMMENT':
      const { followingKicks: followingKicksCmnt, latestKicks: latestKicksCmnt, trendingKicks: trendingKicksCmnt } = state;
      if (state.segment === "Following") {
        const liked = followingKicksCmnt.content.map((item) => {
          return action.payload === item.id
            ? { ...item, commentcount: item?.commentcount + 1 }
            : item;
        });
        console.log(liked);
        return {
          ...state,
          totalLikes: action.payload.data,
          followingKicks: { ...followingKicksCmnt, content: liked },
        };
      } else if (state.segment === "Trending") {
        const liked = trendingKicksCmnt.content.map((item) => {
          return action.payload === item.id
            ? { ...item, commentcount: item?.commentcount + 1 }
            : item;
        });
        return {
          ...state,
          totalLikes: action.payload.data,
          trendingKicks: { ...trendingKicksCmnt, content: liked },
        };
      } else if (state.segment === "Latest") {
        const liked = latestKicksCmnt.content.map((item) => {
          return action.payload === item.id
            ? { ...item, commentcount: item?.commentcount + 1 }
            : item;
        });
        return {
          ...state,
          totalLikes: action.payload.data,
          latestKicks: { ...latestKicksCmnt, content: liked },
        };
      }

    case "UNFOLLOW":
      const { followingKicks: following, latestKicks: latest, trendingKicks: trending } = state;
      if (state.segment === "Following") {
        const liked = following.content.map((item) => {
          return action.payload === item.id
            ? { ...item, isFollow: false }
            : item;
        });
        return {
          ...state,
          totalLikes: action.payload.data,
          followingKicks: { ...following, content: liked },
        };
      } else if (state.segment === "Trending") {
        const liked = trendingKick.content.map((item) => {
          return action.payload === item.id
            ? { ...item, isFollow: false }
            : item;
        });
        return {
          ...state,
          totalLikes: action.payload.data,
          trendingKicks: { ...trending, content: liked },
        };
      } else if (state.segment === "Latest") {
        const liked = latest.content.map((item) => {
          return action.payload === item.id
            ? { ...item, isFollow: false }
            : item;
        });
        return {
          ...state,
          totalLikes: action.payload.data,
          latestKicks: { ...latest, isFollow: false },
        };
      }


    case "START_FOLLOW":
      const { followingKicks: followingKic, latestKicks: latestKic, trendingKicks: trendingKic } = state;
      if (state.segment === "Following") {
        const liked = followingKic.content.map((item) => {
          return action.payload === item.id
            ? { ...item, isFollow: true }
            : item;
        });
        return {
          ...state,
          totalLikes: action.payload.data,
          followingKicks: { ...followingKic, content: liked },
          getData: !state.getData
        };
      } else if (state.segment === "Trending") {
        const liked = trendingKic.content.map((item) => {
          return action.payload === item.id
            ? { ...item, isFollow: true }
            : item;
        });
        return {
          ...state,
          totalLikes: action.payload.data,
          trendingKicks: { ...trendingKic, content: liked },
          getData: !state.getData
        };
      } else if (state.segment === "Latest") {
        const liked = latestKic.content.map((item) => {
          return action.payload === item.id
            ? { ...item, isFollow: true }
            : item;
        });
        return {
          ...state,
          totalLikes: action.payload.data,
          latestKicks: { ...latestKic, content: liked },
          getData: !state.getData,
        };
      }
    case "KICKS_SEARCH_BY_TEXT":
      return { ...state, kicksVideoList: action.payload.data }
    case "KICKS_SEARCH_BY_TAG":
      return { ...state, kicksTagList: action.payload.data }
    case "GET_PROFILE_LIST":
      return { ...state, profileList: action.payload.data }
    case "COMMENTS_LIST":
      return { ...state, comments: action.payload.data };
    case "COMMENTS_REPLY_LIST":
      return { ...state, reply: action.payload.data };
    case "GET_USER_KICKS":
      return { ...state, userKickList: action.payload.data || [] }
    case "KICKS_SEGMENT":
      return { ...state, segment: action.payload };
    default:
      return state;
  }
};

export default kicksReducer;
