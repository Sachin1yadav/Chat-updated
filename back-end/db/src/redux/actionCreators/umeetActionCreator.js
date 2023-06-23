import axios from "axios";

const token = localStorage.getItem("userCredential")
  ? JSON.parse(localStorage.getItem("userCredential")).token
  : "";

export const createEvent = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://web.uynite.com/event/api/event/createEvent`,
      data
    );
    dispatch({ type: "EVENT_CREATE_SUCCESS", payload: response.data });
    // console.log(response);
    return response?.data;
  } catch (error) {
    dispatch({ type: "EVENT_CREATE_FAILURE", payload: error.message });
    throw error;
  }
};

export const updateEvent = (data) => async (dispatch) => {
  try {
    const response = await axios.put(
      `https://web.uynite.com/event/api/event/updateEvent`,
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

export const deleteEvent = (data) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `https://web.uynite.com/event/api/event/deleteEvent/${data}`
    );
    dispatch({
      type: "",
      payload: response.data,
    });
    console.log(response.data, "deleted");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const cancelEvent = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://web.uynite.com/event/api/event/admin/cancelevent`,
      data
    );
    dispatch({
      type: "",
      payload: response.data,
    });
    console.log(response.data, "deleted event");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// ok
export const getEventDetails = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/event/api/event/geteventbyid/${data}/${Date.now()}`
    );
    console.log(response, "single event details");
    dispatch({
      type: "SINGLE_EVEVT_DETAIL",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

// ok
export const getEventList = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/event/api/event/getEvent`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(response, "getAllEventList");
    dispatch({
      type: "GET_ALL_EVEVTS",
      payload: response.data,
    });
  } catch (error) {
    console.log("err", error);
    throw error;
  }
};

// all events creatd by user by Ajith ok but no data returns
export const getEventByProfileid = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/event/api/event/getmyallevent/${data}/1684318282119`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(response, "myevents by id", data);
    dispatch({
      type: "GET_ALL_MYEVEVTS",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

// get invited events
export const getAllInvitedEvents = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/event/api/invities/getmyevent/${data}/1684318282119`,
      data
    );
    console.log(response.data, "getAllInvitedEvents");
    dispatch({
      type: "GET_ALL_INVITED_EVENTS",
      payload: response.data,
    });
  } catch (error) {
    console.log('jd2')
    throw error;
  }
};

export const getInviteList = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/event/api/invities/getprofiles/${data}/true`
    );
    dispatch({
      type: "",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};


export const getInviteListByFood = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/event/api/invities/getprofilesvegnonveg/${data}/false`
    );
    console.log(response);
    dispatch({
      type: "",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const updateInviteeName = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://web.uynite.com/event/api/invities/add`,
      data
    );
    console.log(response);
    dispatch({
      type: "",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const addInvitee = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://web.uynite.com/event/api/invities/add`,
      data
    );
    console.log(response);
    dispatch({
      type: "",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const getInviteesList = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://3.233.82.34:8080/event/api/invities/getinvitietslist/64638b810fa7dd158fd35a5a`,
      data
    );
    console.log(response);
    dispatch({
      type: "",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const addInvitees = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://web.uynite.com/event/api/invities/addInvities`,
      data
    );
    console.log(response.data, "addInvitees");
    dispatch({
      type: "ADD_INVITIES",
      payload: response.data,
    });
  } catch (error) { 
    throw error;
  }
};

export const createEventTemplate = (data) => async (dispatch) => {
  try {
    // const formData = new FormData();
    // formData.append('image', data);
    // console.log(data, formData)
    const response = await axios.post(
      `https://web.uynite.com/event/api/eventtemp/createtemp`,
      data
    );
    console.log(response, 'ok ji');
    dispatch({
      type: "",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const getTemplateByEventid = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/event/api/eventtemp/12`,
      data
    );
    console.log(response);
    dispatch({
      type: "",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const getAllEvents = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/event/api/invities/getmyevent/${data}`
    );
    console.log(response);
    dispatch({
      type: "",
      payload: response.data,
    });
  } catch (error) {
    console.log('jd')
    throw error;
  }
};

//Add eventmessage by event by anurag
export const addEventMessage = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://web.uynite.com/event/api/eventmessage/add`,
      data
    );
    console.log(response);
    dispatch({
      type: "",
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }

  try {
    const response = await axios.get(
      `https://web.uynite.com/event/api/invities/getmyevent/${data}`
    );
    console.log(response);
    dispatch({
      type: "",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const searchByCountryInUmeet = (country) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/profile/api/profile/searchcountry/${country}`
    );
    console.log(response, "earchByCountryInUmeet");
    dispatch({
      type: "",
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchByStateInUmeet = (coutrycode) => async (dispatch) => {
  console.log("COoooooooooooood", coutrycode);
  try {
    const response = await axios.get(
      `https://web.uynite.com/profile/api/country/getstate/${coutrycode}`
    );
    console.log(response, 'searchByStateInUmeet');
    dispatch({
      type: "ADD_GUEST_BY_STATE",
      payload: response?.data,
    });
  } catch (error) {
    throw error;
  }
};

export const addEmailToList = (emailList) => async (dispatch) => {
  console.log("emailList", emailList);
  try {
    // const response = await axios.get(
    //   `https://web.uynite.com/profile/api/country/getstate/${coutrycode}`
    // );
    // console.log("asdsadasas", response);
    dispatch({
      type: "ADD_EMAIL_TO_LIST",
      payload: emailList,
    });
  } catch (error) {
    throw error;
  }
};

export const allEmailInvites = (emailList) => async (dispatch) => {
  console.log("emailList", emailList);
  try {
    const response = await axios.get(
      `https://web.uynite.com/profile/event/api/user/all/sendemails`,
      emailList
    );
    console.log("allll EMaillll Invited", response);
    dispatch({
      type: "ALL_EMAIL_INVITES",
      //   payload: emailList,
    });
  } catch (error) {
    throw error;
  }
};

export const getAllEventChatMessage = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web.uynite.com/event/api/eventmessage/getallmessage/${data}`
    );
    console.log(response, "eventmessages");
    // dispatch({
    //   type: "EVEVT_CHAT_DETAIL",
    //   payload: response.data,
    // });
  } catch (error) {
    throw error;
  }
};

export const getAllUgFriends = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://web.uynite.com/profile/api/education/getugfriends`,
      data
    );
    console.log(response.data, "getAllUgFriends");
    dispatch({
      type: "GET_UG_FRIENDS",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const getAllPgFriends = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://web.uynite.com/profile/api/education/getpgfriends`,
      data
    );
    console.log(response.data, "getAllPgFriends");
    dispatch({
      type: "GET_PG_FRIENDS",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const getProfileByEmail = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
       `https://web.uynite.com/profile/api/profile/profilebyemail/${data}`,
    );
    console.log(response.data, "getProfileByEmail", data);
    dispatch({
      type: "GET_EMAIL_FOUND",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const sendEmailInvites = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
       `https://web.uynite.com/login/api/user/sendemails`, data
    );
    console.log(response.data, "sendemailinvites", data);
    dispatch({
      type: "SEND_EMAIL_INVITES",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const handleInviteEmailUI = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "SEND_INVITE_EMAIL_UI",
      payload: data,
    })
  } catch (error) {
    console.log(error)
  }
};

export const handleCreateDataUI = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "CREATE_DATA_UI",
      payload: data,
    })
  } catch (error) {
    console.log(error)
  }
};

export const getReunionTemplates = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
       `https://web.uynite.com/event/api/eventtemp/category/Reunion`
    );
    console.log(response.data, "getReunionTemplates");
    dispatch({
      type: "GET_REUNION_TEMPLATES",
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const handleCreateQuestionUI = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "CREATE_QUESTION_UI",
      payload: data,
    })
  } catch (error) {
    console.log(error)
  }
};

export const getStatesByCountry = (countryCode) => async (dispatch) => {
  try {
    const response = await axios.get(
       `https://web.uynite.com/api/user/country/getstate/${countryCode}`
    );
    console.log(response.data, "states dude");
    dispatch({
      type: "GET_STATES_BY_COUNTRY",
      payload: response?.data?.data,
    });
  } catch (error) {
    throw error;
  }
}; 