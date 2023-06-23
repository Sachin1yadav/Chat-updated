import axios from "axios";

export const addUnion = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://web.uynite.com/friend/api/group/add`,
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

export const getUnionList = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/friend/api/group/partOfGroup/${data}`
    );
    dispatch({
      type: "UNION_LIST",
      payload: response.data,
    });
    return response.data
  } catch (error) {
    throw error;
  }
};

export const getMyUnion = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/friend/api/group/getGroups/${data}`
    );
    dispatch({
      type: "GET_MY_UNION",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const getUnionMembers = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/friend/api/group/getFriends/${data}`
    );
    console.log(response);
    dispatch({
      type: "GET_UNION_MEMBER",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const inviteMember = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://web.uynite.com/friend/api/group/addInGroup`,
      { data }
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

export const removeUserFromUnion = (data) => async (dispatch) => {
  const { groupId, profileId } = data;
  try {
    const response = await axios.delete(
      `https://web.uynite.com/friend/api/group/deleteFromGroup/${groupId}/${profileId}`
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

export const getInviteeList = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/friend/api/group/getInvitedMembers/${data}`
    );
    dispatch({
      type: "GET_INVITEE_LIST",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteUnion = (data) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `https://web.uynite.com/friend/api/group/deleteGroup/${data}`
    );
    dispatch({
      type: "GET_INVITEE_LIST",
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelInvitation = (data) => async (dispatch) => {
  const { groupId, profileId } = data;
  try {
    const response = await axios.get(
      `https://web.uynite.com/friend/api/group/deleteFromGroup/${groupId}/${profileId}`
    );
    dispatch({
      type: "GET_INVITEE_LIST",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};
