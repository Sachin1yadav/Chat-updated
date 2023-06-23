import axios from "axios";
import { getUserDataFromLocalStorage } from "../../Components/Utility/utility";

export const getEventData = () => async (dispatch) => {
  try {
    const eventData = await axios.get(
      "https://web.uynite.com/post/api/post/getspost",
      {
        headers: {
          "Accept-Language": "en",
        },
      }
    );
    console.log("Event", eventData.data);
    dispatch({
      type: "RECIVED_EVENT_DATA",
      payload: eventData.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// DEFAULT ROOT SCREEN API CALL
export const defaultRootScreen = () => async (dispatch) => {
  try {
    const getStoredData = await getUserDataFromLocalStorage();
    const defaultRootResult = await axios.get(
      `https://web.uynite.com/post/api/post/getspost`,
      {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${getStoredData?.token}`,
        },
      }
    );

    console.log("Eskdkd", defaultRootResult);
    dispatch({
      type: "DEFAULT_ROOT_SCREEN",
      payload: defaultRootResult?.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// DEFAULT CLICKED ON EVENT SCREEN API CALL
export const defaultEventScreen = (profileid) => async (dispatch) => {
  try {
    const getStoredData = await getUserDataFromLocalStorage();

    const defaultEventResult = await axios.get(
      ` https://web.uynite.com/post/api/post/getpostbypostid/${profileid}`,

      {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${getStoredData?.token}`,
        },
      }
    );
    dispatch({
      type: "DEFAULT_EVENT_SCREEN",
      payload: defaultEventResult?.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// ADD EVENT POST API
export const addEventPost = (data) => async (dispatch) => {
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


// ADD EVENT POST API
export const createSponsoredEvent = (data) => async (dispatch) => {
  try {
    // const getStoredData = await getUserDataFromLocalStorage();

    const eventResult = await axios.post(
      `https://web.uynite.com/event/api/post/add`,
      data,
    );
    dispatch({
      type: "CREATE_EVENT",
    });
    return eventResult?.data;
  } catch (error) {
    console.log(error.message);
  }
};

// GET ALL EVENT  API
export const getAllEventPost = (eventpostid, profileid) => async (dispatch) => {
  try {
    const getStoredData = await getUserDataFromLocalStorage();
    const allEventResult = await axios.get(
      `https://web.uynite.com/post/api/post/getsponser/${eventpostid}/${profileid}`,

      {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${getStoredData?.token}`,
        },
      }
    );
    console.log("allEventResult", allEventResult?.data);
    dispatch({
      type: "GET_ALL_EVENTS_POST_LIST",
      payload: allEventResult?.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// GET ALL TRENDING POST
export const getAllTrendingPost =
  (eventpostid, profileid) => async (dispatch) => {
    try {
      const getStoredData = await getUserDataFromLocalStorage();

      const trendingPostResult = await axios.get(
        `https://web.uynite.com/post/api/post/topgetsponser/${eventpostid}/${profileid}`,

        {
          headers: {
            "Accept-Language": "en",
            Authorization: `Bearer ${getStoredData?.token}`,
          },
        }
      );
      dispatch({
        type: "TRENDING_EVENTS_POST_LIST",
        payload: trendingPostResult?.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

export const imageUploadApi = (image) => async (dispatch) => {
  console.log(image, "[[[[[");
  try {
    const getUploadedResult = await axios.post(
      // `https://web.uynite.com/fileservice/s3/upload`,
      `http://35.183.76.174:9098/s3/upload`,
      image,
      {
        headers: {
          "Accept-Language": "en",
          "Content-Type": "multipart/formdata",
          // Authorization: `Bearer ${getStoredData?.token}`,
        },
      }
    );
    console.log("getUploadedResult", getUploadedResult);
    dispatch({
      type: "GET_IMAGE_UPLOAD",
      payload: getUploadedResult,
    });
    return getUploadedResult;
  } catch (error) {
    console.log(error.message);
    throw error.message;
  }
};

