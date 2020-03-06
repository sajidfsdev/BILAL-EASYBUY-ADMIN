import * as Types from "../Constants/App";

const initialState = {
  bufferring: false,
  catBufferring: true,
  catBtnBufferring: false
};

const AppReducer = (state = initialState, action) => {
  //switch starts here.....
  switch (action.type) {
    case Types.STARTAPPBUFFERRING:
      return {
        ...state,
        bufferring: true
      };
      break;

    case Types.STOPAPPBUFFERRING:
      return {
        ...state,
        bufferring: false
      };
      break;
    case Types.STARTCATBUFFERRING:
      return {
        ...state,
        catBufferring: true
      };
      break;

    case Types.STOPCATBUFFERRING:
      return {
        ...state,
        catBufferring: false
      };
      break;

    case Types.STARTCATBTNBUFFERRING:
      return {
        ...state,
        catBtnBufferring: true
      };
      break;

    case Types.STOPCATBTNBUFFERRING:
      return {
        ...state,
        catBtnBufferring: false
      };
      break;

    default:
      return state;
  }
  //switch ends here........
}; //.............................................

export default AppReducer;
