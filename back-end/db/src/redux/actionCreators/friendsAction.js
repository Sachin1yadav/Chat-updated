import axios from "axios";
import { getQueryParams } from "../../Components/Utility/utility";

export const requestAction = (data, Action) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/friend/api/friend/${data}/${Action}`
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

export const getUserByMail = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/login/api/user/usersbyemail/${data}`
    );
    console.log(
      { data: [response.data.data] },
      "BYYYYYYYY maiiiiiilllllllllllll"
    );
    dispatch({
      type: "GET_USERS",
      payload: { data: [response.data.data] },
    });
    return { data: [response.data.data] };
  } catch (error) {
    throw error;
  }
};

export const getUsers = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/profile/api/profile/search/${data}`
    );
    dispatch({
      type: "GET_USERS",
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findFriends = (data, profileid) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/profile/api/profile/search/${profileid}/${data}`
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

export const addFriend = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://web.uynite.com/friend/api/friend/add`,
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

export const updateRelation = (data) => async (dispatch) => {

  try {
    const response = await axios.post(
      `https://web.uynite.com/friend/api/friend/add`,
      data
    );
    console.log(response);
    dispatch({
      type: "",
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRequest = (data) => async (dispatch) => {
  try {
    const response = await axios.put(
      `https://web.uynite.com/friend/api/delete/${data}`
    );
    console.log(response);
    dispatch({
      type: "",
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getFriendsList = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/friend/api/friend/${data}/Accepted`
    );
    dispatch({
      type: "FRIEND_LIST",
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const getRequestList = (data) => async (dispatch) => {
//   try {
//     const response = await axios.get(
//       `https://web.uynite.com/friend/api/friend/getfriendrequest/${data}/Send`
//     );
//     dispatch({
//       type: "GET_REQUEST_LIST",
//       payload: response.data,
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const getRequestsList = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/friend/api/friend/getprofileidwithdetail/${data}`
    );
    dispatch({
      type: "GET_REQUEST_LIST",
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const acceptFriendRequest = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://web.uynite.com/friend/api/friend/add`,
      data
    );
    dispatch({
      type: "ADD_FRIEND",
      payload: response.data,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};


export const getMutualFriends = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/friend/api/friend/getfriendfriends/${data}`,
      data
    );
    dispatch({
      type: "GET_MUTUAL_FRIEND",
      payload: response.data,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};



export const getSuggestedFriends = (data, params) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/friend/api/friend/test/getfriendfriends/${data}?${getQueryParams(params)}`,
      data
    );
    dispatch({
      type: "GET_MUTUAL_FRIEND",
      payload: response.data,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const removeFriend = (data) => async (dispatch) => {
  const { profileid, friendprofileid } = data;
  try {
    const response = await axios.put(
      `https://web.uynite.com/friend/api/friend/delete/${profileid}/${friendprofileid}`,
      data
    );
    dispatch({
      type: "REMOVE_FRIEND_REQUEST",
      payload: response.data, 
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const unfollow = (data) => async (dispatch) => {
  const { profileid, friendprofileid } = data;
  try {
    const response = await axios.delete(
      `https://web.uynite.com/friend/api/follow/deletefollow/${profileid}/${friendprofileid}`,
      data
    );
    dispatch({
      type: "UNFOLLOW",
      payload: response.data,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const removeFollowers = (data) => async (dispatch) => {
  const { profileid, friendprofileid } = data;
  try {
    const response = await axios.put(
      `https://web.uynite.com/friend/api/friend/delete/${profileid}/${friendprofileid}`,
      data
    );
    dispatch({
      type: "REMOVE_FOLLOWER",
      payload: response.data,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getTypeOfFriends = (profileid) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/friend/api/friend/gettypeoffriends/${profileid}/Friend`
    );
    console.log("GET_TYPE_OF_FRIENDS", response);
    dispatch({
      type: "GET_TYPE_OF_FRIENDS",
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const checkFollow = (userprofile, friendprofile) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/friend/api/follow/followyesno/${userprofile}/${friendprofile}`,
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

export const checkFriends = (userprofile, friendprofile) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/friend/api/friend/chkfriends/${userprofile}/${friendprofile}`,
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