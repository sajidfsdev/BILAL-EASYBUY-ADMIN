import * as Types from "../Constants/Auth";

const initialState = {
  token: null,
  isAuth: false,
  fname: "",
  lname: "",
  email: "",
  resolved: false,
  errorMessage: ""
};

const AuthReducer = (state = initialState, action) => {
  //switch starts here......
  switch (action.type) {
    case Types.PERSON_AUTH_TRUE:
      return {
        ...state,
        token: action.payload.token,
        isAuth: true,
        fname: action.payload.fname,
        lname: action.payload.lname,
        email: action.payload.email,
        resolved: true
      };
      break;

    case Types.PERSON_AUTH_FALSE:
      return {
        ...state,
        token: null,
        isAuth: false,
        resolved: true,
        errorMessage: action.payload.errorMessage
      };
      break;

    default:
      return state;
  }
  //switch ends here........
}; //..............................................

export default AuthReducer;
