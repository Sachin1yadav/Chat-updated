import axios from "axios";

export const addContactDetails = (data) => async (dispatch) => {
  try {
    const getStoredData = await getUserDataFromLocalStorage();

    const eventResult = await axios.post(
      "https://web.uynite.com/post/api/post/add",
      data,
      {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${getStoredData?.token}`,
        },
      }
    );
    dispatch({
      type: "ADD_EVENT_POST_DATA",
    });
    return eventResult?.data;
  } catch (error) {
    console.log(error.message);
  }
};
