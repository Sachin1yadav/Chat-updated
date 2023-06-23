const initialState = {
  unionList: [],
  myUnionList: [],
  unionMemberList: [],
  unionInviteeList: [],
};

const unionReducer = (state = initialState, action) => {
    switch(action.type){
        case "UNION_LIST":
            return { ...state, unionList: action.payload.data};
        case "GET_MY_UNION":
            return { ...state, myUnionList: action.payload.data }
        case "GET_UNION_MEMBER":
            return { ...state, unionMemberList: action.payload.data};
        case "GET_INVITEE_LIST":
            return { ...state, unionInviteeList: action.payload.data }
        default:
            return state;
    }
}

export default unionReducer;