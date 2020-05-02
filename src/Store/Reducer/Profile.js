import * as Constants from "./../Constants/Profile";
const initialState = {
  loaded: false,
  isError: false,
  errorMessage: "",
  profile: null,
  editBufferring: false,
  isEditError: false,
  editErrorMessage: "",
  openDialogue: false,
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.LOADED_SUCCESS:
      return {
        ...state,
        loaded: true,
        isError: false,
        errorMessage: "",
        profile: action.payload.profile,
      };
      break;

    case Constants.LOADED_FAILED:
      return {
        ...state,
        loaded: true,
        isError: true,
        errorMessage: action.payload.errorMessage,
        profile: null,
      };
      break;

    case Constants.START_BUFFERRING:
      return {
        ...state,
        loaded: false,
      };
      break;

    case Constants.END_BUFFERRING:
      return {
        ...state,
        loaded: true,
      };
      break;

    case Constants.START_EDIT_BUFFERRING:
      return {
        ...state,
        editBufferring: true,
      };
      break;

    case Constants.END_EDIT_BUFFERRING:
      return {
        ...state,
        editBufferring: false,
      };
      break;
    case Constants.EDITING_SUCCESS:
      return {
        ...state,
        editBufferring: false,
        isEditError: false,
        editErrorMessage: "",
      };
      break;

    case Constants.EDITING_FAILED:
      return {
        ...state,
        editBufferring: false,
        isEditError: true,
        editErrorMessage: action.payload.errorMessage,
      };
      break;

    case Constants.OPEN_DIALOGUE:
      return {
        ...state,
        openDialogue: true,
      };
      break;

    case Constants.CLOSE_DIALOGUR:
      return {
        ...state,
        openDialogue: false,
      };
      break;

    case Constants.RESET_EDIT:
      return {
        ...state,

        editBufferring: false,
        isEditError: false,
        editErrorMessage: "",
        openDialogue: false,
      };
      break;

    default:
      return state;
  }
}; //.............................Profile Reducer.

export default ProfileReducer;
