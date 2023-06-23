const initialState = {
  eventCreateSuccess: false,
  allEvents: [],
  eventDetail: {},
  guestByStateList:[],
  emailList:[],
  allMyEvents: [],
  eventChatMessages: [],
  invitiesAdded: false,
  allInvitedEvents: [],
  isEmailFound: false,
  ugFriends: [],
  pgFriends: [],
  emailSendSuccess: false,
  inviteEmailsUI: null,
  createData: null,
  question: null
};

const umeetReducer = (state = initialState, action) => {
    switch (action.type) {
      case "EVENT_CREATE_SUCCESS":
        return { ...state, eventCreateSuccess: true };
      case "EVENT_CREATE_FAILURE":
        return { ...state, eventCreateSuccess: false };
      case "GET_ALL_EVEVTS":
        return { ...state, allEvents: action.payload.data };
      case "GET_ALL_MYEVEVTS":
        return { ...state, allMyEvents: action.payload.data };
      case "SINGLE_EVEVT_DETAIL":
        return { ...state, eventDetail: action.payload.data };
      case "GET_STATES_BY_COUNTRY":
        return { ...state, guestByStateList: action.payload};
      case "ADD_EMAIL_TO_LIST":
        return { ...state, emailList: [...state.emailList,action.payload] };
      case "EVEVT_CHAT_DETAIL":
        return { ...state, eventChatMessages: action.payload.data }
      case "ADD_INVITIES":
        return { ...state, invitiesAdded: true}
      case "GET_ALL_INVITED_EVENTS":
        return { ...state, allInvitedEvents: action.payload.data}
      case "GET_EMAIL_FOUND":
        if(action.payload.data !== null){
          return { ...state, isEmailFound: true }
        }
        return { ...state, isEmailFound: false}
      case "GET_UG_FRIENDS":
        return { ...state, ugFriends: action.payload.data }
      case "GET_PG_FRIENDS":
        return { ...state, pgFriends: action.payload.data }
      case "SEND_EMAIL_INVITES":
        console.log(action.payload, 'ak is coming')
        if(action.payload.status){
          return { ...state, emailSendSuccess: true}
        }
      case "SEND_INVITE_EMAIL_UI":
        return {...state, inviteEmailsUI: action.payload}
      case "CREATE_DATA_UI":
        return { ...state, createData: action.payload }
      case "CREATE_QUESTION_UI":
        console.log(action.payload)
        return { ...state, question: action.payload }
      default:
        return state;
    }
}

export default umeetReducer;