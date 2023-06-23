import axios from "axios";
import {
  getQueryParams,
  getUserDataFromLocalStorage,
} from "../../Components/Utility/utility";

export const selectKicksType = (kicksType) => (dispatch) => {
  if (kicksType === "Latest") {
    getLatestKicks(kicksType);
  } else if (kicksType === "Trending") {
  } else if (kicksType === "Following") {
  }
  dispatch({
    type: "SELECT_KICKS_TYPE",
    payload: kicksType,
  });
};
export const addKicks = (data) => async (dispatch) => {
  const getStoredData = await getUserDataFromLocalStorage();

  try {
    const response = await axios.post(
      `https://web.uynite.com/instance/api/instancepost/add`,
      data,
      {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${getStoredData?.token}`,
        },
      }
    );
    dispatch({
      type: "",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const getLatestKicks = (urlParams, data) => async (dispatch) => {
  const getStoredData = await getUserDataFromLocalStorage();
  try {
    const response = await axios.post(
      `https://web.uynite.com/instance/api/fetch/kicks?${getQueryParams(
        urlParams
      )}`,
      data,
      {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${getStoredData?.token}`,
        },
      }
    );
    console.log(response);
    dispatch({
      type: "GET_LATEST_KICKS",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const getFollowingKicks = (urlParams, data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://web.uynite.com/instance/api/fetch/kicks?${getQueryParams(
        urlParams
      )}`,
      data
    );
    console.log(response);
    dispatch({
      type: "GET_FOLLOWING_KICKS",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const getTrendingKicks = (urlParams, data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://web.uynite.com/instance/api/fetch/kicks?${getQueryParams(
        urlParams
      )}`,
      data
    );
    console.log(response);
    dispatch({
      type: "GET_TRENDING_KICKS",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

// https://web.uynite.com/instance/api/instancelike/add
export const addLikes = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://web.uynite.com/instance/api/instancelike/add`,
      data
    );
    dispatch({
      type: "ADD_LIKE",
      payload: response,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCommentsByPostid = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/instance/api/comment/${data}`
    );
    dispatch({
      type: "COMMENTS_LIST",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const getCommentsReplyByPostid = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/instance/api/instancereply/${data}`
    );
    dispatch({
      type: "COMMENTS_REPLY_LIST",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};



export const createKicksPost = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://web.uynite.com/instance/api/instancepost/add`,
      data
    );
    dispatch({
      type: "",
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const addCommentOnKicks = (commentDetails) => async (dispatch) => {
  try {
    // const getStoredData = await getUserDataFromLocalStorage
    const getCommentResult = await axios.post(
      `https://web.uynite.com/instance/api/comment/add`,
      commentDetails,
      {
        headers: {
          "Accept-Language": "en",
          //   Authorization: `Bearer ${getStoredData?.token}`,
        },
      }
    );
    dispatch({
      type: "ADD_COMMENT",
      payload: getCommentResult?.data,
    });
    return getCommentResult?.data;
  } catch (error) {
    throw error;
  }
};

// add reply comments by
export const addCommentReplyOnKicks = (commentReplyDetails) => async (dispatch) => {
  try {
    const getCommentReplyResult = await axios.post(
      `https://web.uynite.com/instance/api/instancereply/add`,
      commentReplyDetails,
      {
        headers: {
          "Accept-Language": "en",
        },
      }
    );
    dispatch({
      type: "",
      payload: getCommentReplyResult?.data,
    });
    return getCommentReplyResult?.data;
  } catch (error) {
    throw error;
  }
};



export const deletePostLike = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://web.uynite.com/instance/api/instancelike/dislike/${data}`,
      data
    );
    dispatch({
      type: "",
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
// https://web.uynite.com/instance/api/instancepost/getpoststag/utag1/utype1
// https://web.uynite.com/instance/api/instancetag/getprofile/utag

export const getCategoryList = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/instance/api/instancepost/getvideocat/${data}`,
    );
    dispatch({
      type: "",
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const getKicksByText = (data, id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/instance/api/instancepost/searchkikstext/${id}/${data}`,
    );
    dispatch({
      type: "KICKS_SEARCH_BY_TEXT",
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getKicksByTag = (data, id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/instance/api/instancetag/searchtags/${data}`,
    );
    dispatch({
      type: "KICKS_SEARCH_BY_TAG",
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getProfileList = (data, id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/profile/api/profile/search/${id}/${data}`,
    );
    dispatch({
      type: "GET_PROFILE_LIST",
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getUserKickList = (frienduserid, userid = "") => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/instance/api/instancepost/getallmyposts/${frienduserid}/${userid}`,
    );
    dispatch({
      type: "GET_USER_KICKS",
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const commentLiked = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://web.uynite.com/instance/api/instancelike/add`, data
    );
    dispatch({
      type: "COMMENT_LIKED",
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const commentPostLiked = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://web.uynite.com/post/api/like/add`, data
    );
    dispatch({
      type: "COMMENT_LIKED",
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};