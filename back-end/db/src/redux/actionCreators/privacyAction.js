import axios from "axios";

export const addProfilePrivacy = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://web.uynite.com/profile/api/profile/privacy/add`,
      data
    );
    console.log("addProfilePrivacy", response);
    dispatch({
      type: "",
      payload: response?.data,
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const getBlockedUser = (data) => async (dispatch) => {
  try {
    const response = axios.post(
      `https://web.uynite.com/friend/api/friend/getblockedlistprofile/${data}`
    );
    dispatch({
      type: "",
      payload: "",
    });
    return response?.data;
  } catch (err) {
    throw err;
  }
};

export const updatePassword = (data) => async (dispatch) => {
  const { uemail, confirmPassword, newPassword } = data;
  try {
    const response = axios.post(
      `https://web.uynite.com/login/api/user/changepassword/${uemail}/${newPassword}/${confirmPassword}`
    );
    dispatch({
      type: "",
      payload: "",
    });
    console.log("sucess______=======",response);
    return response?.data;
  } catch (err) {
    throw err;
  }
};

export const checkOldPassword = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `http://3.233.82.34:8080/api/user/authenticate`,
      data
    );
    dispatch({
      type: "",
      payload: "",
    });
    console.log("suhgiuehieur", response);
    return response?.data;
  } catch (err) {
    throw err;
  }
};

