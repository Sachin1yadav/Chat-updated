import axios from "axios";

export const updatePrivacyData = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://web.uynite.com/profile/api/profile/privacy/add`,
      data
    );
    dispatch({
      type: "UPDATE_PRIVACY_DATA",
      payload: response.data,
    });
    console.log("Privacyy DATA", response);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

// current password checking
export const currentPasswordCheck = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://web.uynite.com/api/user/authenticate`,
      data
    );
    dispatch({
      type: "UPDATE_PRIVACY_DATA",
      payload: response?.data,
    });
    console.log("currentPasswordCheck DATA", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// New Password Updates
export const changeNewPassword = (uemail, password) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/login/api/user/changepassword/${uemail}/${password}/${password}`
    );
    dispatch({
      type: "CHANGE_NEW_PASSWORD",
      payload: response?.data,
    });
    console.log("CHANGE_NEW_PASSWORD", response);
  } catch (error) {
    throw error;
  }
};

//  while click on Block List
// GET http://3.233.82.34:8080/friend/api/friend/630dbf9c67ceca0570e4bfc9/Accepted

export const blockedFriendList = (profileId) => async (dispatch) => {
  console.log("profileId", profileId);
  try {
    const response = await axios.get(
      `https://web.uynite.com/friend/api/friend/${profileId}/Accepted`
    );
    dispatch({
      type: "BLOCK_FRIEND_LIST",
      payload: response?.data?.data,
    });
    console.log("BLOCK_FRIEND_LIST", response);
  } catch (error) {
    throw error;
  }
};

//  while click on search in Block list
export const searchBlockedFriend =
  (profileId, userName) => async (dispatch) => {
    try {
      const response = await axios.get(
        `https://web.uynite.com/profile/api/profile/search/${profileId}/${userName}`
      );
      dispatch({
        type: "SEARCH_BLOCK_FRIEND",
        payload: response?.data?.data,
      });
      console.log("SEARCH_BLOCK_FRIEND", response);
    } catch (error) {
      throw error;
    }
  };

//  while click on search in Block list
export const unBlockFriend =
  (profileId, blockedprofileid) => async (dispatch) => {
    try {
      const response = await axios.get(
        `https://web.uynite.com/friend/api/friend/unblock/${profileId}/${blockedprofileid}`
      );
      dispatch({
        type: "UNBLOCK_FRIEND",
        payload: response?.data?.data,
      });
      console.log("UNBLOCK_FRIEND", response);
    } catch (error) {
      throw error;
    }
  };

//  while click on Deactivate
// POST http://3.233.82.34:8080/login/api/user/deactiveuser

export const onDeactivateAccount = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://web.uynite.com/login/api/user/deactiveuser`,
      data
    );
    dispatch({
      type: "DEACTIVATE_ACCOUNT",
      payload: response?.data,
    });
    console.log("DEACTIVATE_ACCOUNT", response);
  } catch (error) {
    throw error;
  }
};

// on click on verification
// GET http://3.233.82.34:8080/profile/api/profile/verify/630dbf9c67ceca0570e4bfc9

export const defaultCallOnVerficationPage = (profileId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/profile/api/profile/verify/${profileId}`
    );
    dispatch({
      type: "DEFAULT_CALL_ON_VERFICATION_PAGE",
      payload: response.data,
    });
    console.log("DEFAULT_CALL_ON_VERFICATION_PAGE", response);
  } catch (error) {
    throw error;
  }
};
export const blockUser = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://web.uynite.com/friend/api/friend/block`,
      data
    );
    dispatch({
      type: "BLOCK",
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Contact Us Form APi
export const contactUsPage = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      ` https://web.uynite.com/profile/api/profile/contact/add`,
      data
    );
    dispatch({
      type: "CONTACT_US",
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};
