import * as Types from "./../Constants/cat";

const initialState = {
  cat: [],
  subCat: [],
  subSubCat: [],
  isError: false,
  errorMessage: ""
};

const CatReducer = (state = initialState, action) => {
  //switch starts...
  switch (action.type) {
    case Types.LOADINGCATDATAPASS:
      return {
        ...state,
        cat: [...action.payload.cat],
        subCat: [...action.payload.subCat],
        subSubCat: [...action.payload.subSubCat],
        isError: false,
        errorMessage: ""
      };
      break;

    case Types.LOADINGCATDATAFAIL:
      return {
        ...state,
        cat: [],
        subCat: [],
        subSubCat: [],
        isError: true,
        errorMessage: action.payload.errorMessage
      };
      break;

    case Types.ADDCAT:
      //console.log(action.payload.cat);
      return {
        ...state,
        cat: [...action.payload.cat]
      };
      break;
    case Types.ADDSUBCAT:
      return {
        ...state,
        subCat: [...action.payload.subCat]
      };
      break;

    case Types.ADDSUBSUBCAT:
      return {
        ...state,
        subSubCat: [...action.payload.subSubCat]
      };
      break;

    default:
      return state;
  }
  //switch ends.....
}; //............................................

export default CatReducer;
